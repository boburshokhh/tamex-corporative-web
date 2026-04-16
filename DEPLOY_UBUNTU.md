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

## 5) SSL — Let's Encrypt через Certbot

### Установка Certbot

```bash
sudo apt-get install -y certbot python3-certbot-nginx
```

### Получение сертификата (+ автонастройка Nginx)

```bash
# Замените tamexgroup.com на ваш домен
sudo certbot --nginx -d tamexgroup.com -d www.tamexgroup.com
```

Certbot сам:
- запросит email (для уведомлений об истечении)
- согласится с ToS (выберите `Y`)
- добавит `listen 443 ssl`, `ssl_certificate`, `ssl_certificate_key` в nginx-конфиг
- настроит редирект HTTP → HTTPS

### Проверка автопродления

Certbot добавляет systemd-таймер, который обновляет сертификат раз в 60 дней.
Проверить:

```bash
sudo systemctl status certbot.timer
sudo certbot renew --dry-run
```

### Проверка после получения сертификата

```bash
curl -I https://tamexgroup.com
curl https://tamexgroup.com/api/health
```

### Важно: DNS должен быть настроен ДО запуска certbot

До запуска Certbot убедитесь, что A-запись домена указывает на IP сервера:

```bash
# Проверить DNS (с любого компьютера)
nslookup tamexgroup.com
# или
dig tamexgroup.com +short
```
