#!/usr/bin/env bash
set -euo pipefail

# Usage:
#   DOMAIN=tamexgroup.com REPO_URL=git@github.com:ORG/REPO.git ./deploy/ubuntu-deploy.sh
# Optional:
#   APP_DIR=/var/www/tamex-inc

DOMAIN="${DOMAIN:-}"
REPO_URL="${REPO_URL:-}"
APP_DIR="${APP_DIR:-/var/www/tamex-inc}"
APP_CURRENT="${APP_DIR}/current"
NGINX_CONF_NAME="tamex-inc"

if [[ -z "${DOMAIN}" || -z "${REPO_URL}" ]]; then
  echo "ERROR: DOMAIN and REPO_URL are required."
  echo "Example:"
  echo "  DOMAIN=tamexgroup.com REPO_URL=git@github.com:ORG/REPO.git ./deploy/ubuntu-deploy.sh"
  exit 1
fi

echo "==> Installing base packages"
sudo apt-get update
sudo apt-get install -y nginx curl git

if ! command -v node >/dev/null 2>&1; then
  echo "==> Installing Node.js 20.x"
  curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
  sudo apt-get install -y nodejs
fi

echo "==> Installing PM2 globally"
sudo npm install -g pm2

echo "==> Preparing app directory: ${APP_CURRENT}"
sudo mkdir -p "${APP_DIR}"
sudo chown -R "$USER":"$USER" "${APP_DIR}"

if [[ ! -d "${APP_CURRENT}/.git" ]]; then
  echo "==> Cloning repository"
  git clone "${REPO_URL}" "${APP_CURRENT}"
else
  echo "==> Pulling latest changes"
  git -C "${APP_CURRENT}" fetch --all --prune
  git -C "${APP_CURRENT}" checkout main
  git -C "${APP_CURRENT}" pull --ff-only
fi

echo "==> Installing dependencies and building frontend"
npm --prefix "${APP_CURRENT}" ci
npm --prefix "${APP_CURRENT}" run build

if [[ ! -f "${APP_CURRENT}/.env" ]]; then
  cat <<'EOF'
WARNING: .env not found.
Create /var/www/tamex-inc/current/.env with at least:
PORT=3001
FRONTEND_URL=https://<your-domain>
TELEGRAM_BOT_TOKEN=<bot-token>
TELEGRAM_CHAT_ID=<chat-id>
VITE_API_URL=/api/contact
EOF
  exit 1
fi

echo "==> Starting API via PM2"
pm2 startOrReload "${APP_CURRENT}/deploy/ecosystem.config.cjs"
pm2 save
sudo env PATH="$PATH" pm2 startup systemd -u "$USER" --hp "$HOME" >/dev/null || true

echo "==> Configuring Nginx"
TMP_CONF="$(mktemp)"
sed "s/__DOMAIN__/${DOMAIN}/g" "${APP_CURRENT}/deploy/nginx.tamex.conf" > "${TMP_CONF}"
sudo cp "${TMP_CONF}" "/etc/nginx/sites-available/${NGINX_CONF_NAME}"
rm -f "${TMP_CONF}"
sudo ln -sf "/etc/nginx/sites-available/${NGINX_CONF_NAME}" "/etc/nginx/sites-enabled/${NGINX_CONF_NAME}"
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl reload nginx

echo "==> Deployment complete"
echo "Frontend: http://${DOMAIN}"
echo "Health check: http://${DOMAIN}/api/health"
echo ""
echo "Next (recommended):"
echo "  sudo apt-get install -y certbot python3-certbot-nginx"
echo "  sudo certbot --nginx -d ${DOMAIN}"
