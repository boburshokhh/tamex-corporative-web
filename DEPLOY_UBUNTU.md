# Ubuntu deploy (Vite + Express + PM2 + Nginx)

## 1) Prepare server once

```bash
sudo apt-get update
sudo apt-get install -y git curl
```

## 2) Run deployment script

From your local machine (or directly on the server) run:

```bash
cd /var/www
git clone <YOUR_REPO_URL> tamex-inc-bootstrap
cd tamex-inc-bootstrap
chmod +x deploy/ubuntu-deploy.sh
DOMAIN=<YOUR_DOMAIN> REPO_URL=<YOUR_REPO_URL> ./deploy/ubuntu-deploy.sh
```

Example:

```bash
DOMAIN=tamexgroup.com REPO_URL=git@github.com:ORG/tamex-inc.git ./deploy/ubuntu-deploy.sh
```

## 3) Required `.env`

Create `/var/www/tamex-inc/current/.env` with:

```bash
PORT=3001
FRONTEND_URL=https://<YOUR_DOMAIN>
TELEGRAM_BOT_TOKEN=<YOUR_TELEGRAM_BOT_TOKEN>
TELEGRAM_CHAT_ID=<YOUR_TELEGRAM_CHAT_ID>
VITE_API_URL=/api/contact
```

Then reload app:

```bash
pm2 restart tamex-api
```

## 4) Verify

```bash
curl -I https://<YOUR_DOMAIN>
curl https://<YOUR_DOMAIN>/api/health
pm2 status
sudo systemctl status nginx --no-pager
```

## 5) SSL (Let's Encrypt)

```bash
sudo apt-get install -y certbot python3-certbot-nginx
sudo certbot --nginx -d <YOUR_DOMAIN>
```
