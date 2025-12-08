# 🚀 Руководство по развертыванию MVP Finance 2025

Полное руководство по публикации лендинга на Vercel и других платформах.

## 📋 Предварительные требования

- [x] Git аккаунт
- [x] GitHub аккаунт
- [x] Node.js 16+ установлен локально
- [x] Код проекта готов к деплою

---

## 🎯 Вариант 1: Vercel (Рекомендуется)

### Преимущества Vercel:
- ✅ Автоматические деплои при push в Git
- ✅ Бесплатный SSL сертификат
- ✅ Глобальный CDN
- ✅ Мгновенные откаты к предыдущим версиям
- ✅ Preview deployments для каждого PR
- ✅ Автоматическая оптимизация

### Шаг 1: Подготовка репозитория

```bash
# Убедитесь, что все изменения закоммичены
git status

# Если есть незакоммиченные изменения
git add .
git commit -m "chore: prepare for deployment"
git push origin main
```

### Шаг 2: Импорт в Vercel

#### Через Web UI (Самый простой способ):

1. **Перейдите на [vercel.com](https://vercel.com)**
2. **Войдите через GitHub**
3. **Нажмите "Add New..." → "Project"**
4. **Выберите репозиторий `mvpfinance2025`**
5. **Настройки проекта:**
   - Framework Preset: `Vite`
   - Root Directory: `./` (корень)
   - Build Command: `npm run build` (автоматически)
   - Output Directory: `dist` (автоматически)
   - Install Command: `npm install` (автоматически)

6. **Нажмите "Deploy"**

#### Через Vercel CLI:

```bash
# Установить Vercel CLI глобально
npm install -g vercel

# Перейти в директорию проекта
cd mvpfinance2025

# Залогиниться в Vercel
vercel login

# Деплой проекта
vercel

# Для продакшн деплоя
vercel --prod
```

### Шаг 3: Настройка домена (Опционально)

1. В Dashboard Vercel откройте проект
2. Перейдите в **Settings → Domains**
3. Добавьте свой домен
4. Следуйте инструкциям для настройки DNS

**Пример настройки DNS:**
```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

### Шаг 4: Переменные окружения

Если нужно добавить API ключи или другие секреты:

1. **Settings → Environment Variables**
2. Добавьте переменные:
   ```
   VITE_FORM_ENDPOINT=https://formspree.io/f/YOUR_ID
   VITE_GA_ID=G-XXXXXXXXXX
   ```

3. **Обновите код для использования:**
   ```javascript
   const formEndpoint = import.meta.env.VITE_FORM_ENDPOINT;
   ```

---

## 🌐 Вариант 2: Netlify

### Шаг 1: Через Web UI

1. **Перейдите на [netlify.com](https://netlify.com)**
2. **Войдите через GitHub**
3. **"Add new site" → "Import an existing project"**
4. **Выберите GitHub и репозиторий `mvpfinance2025`**
5. **Настройки:**
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Branch: `main`

6. **Deploy site**

### Шаг 2: Через Netlify CLI

```bash
# Установить Netlify CLI
npm install -g netlify-cli

# Залогиниться
netlify login

# Инициализация
netlify init

# Деплой
netlify deploy

# Продакшн деплой
netlify deploy --prod
```

### netlify.toml (уже готов, если нужен)

```toml
[build]
  command = "npm run build"
  publish = "dist"

[build.environment]
  NODE_VERSION = "18"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    X-XSS-Protection = "1; mode=block"

[[headers]]
  for = "/assets/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

---

## 📦 Вариант 3: GitHub Pages

### Настройка для GitHub Pages

1. **Установить gh-pages:**
```bash
npm install --save-dev gh-pages
```

2. **Обновить package.json:**
```json
{
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  },
  "homepage": "https://atrkk2024-beep.github.io/mvpfinance2025"
}
```

3. **Обновить vite.config.js:**
```javascript
export default defineConfig({
  root: 'src',
  base: '/mvpfinance2025/', // Название репозитория
  build: {
    outDir: '../dist',
  }
});
```

4. **Деплой:**
```bash
npm run deploy
```

5. **Настроить GitHub Pages:**
   - Репозиторий → Settings → Pages
   - Source: Deploy from a branch
   - Branch: `gh-pages` / `root`

---

## 🔧 Вариант 4: Собственный VPS/Хостинг

### Используя Nginx

1. **Собрать проект локально:**
```bash
npm run build
```

2. **Загрузить dist/ на сервер:**
```bash
scp -r dist/* user@your-server.com:/var/www/mvpfinance2025/
```

3. **Настроить Nginx:**
```nginx
server {
    listen 80;
    server_name mvpfinance2025.com www.mvpfinance2025.com;
    root /var/www/mvpfinance2025;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Кеширование статических файлов
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Security headers
    add_header X-Frame-Options "DENY";
    add_header X-Content-Type-Options "nosniff";
    add_header X-XSS-Protection "1; mode=block";
}
```

4. **Перезагрузить Nginx:**
```bash
sudo nginx -t
sudo systemctl reload nginx
```

5. **Настроить SSL (Let's Encrypt):**
```bash
sudo certbot --nginx -d mvpfinance2025.com -d www.mvpfinance2025.com
```

---

## ✅ Проверка после деплоя

### 1. Функциональность
- [ ] Все секции отображаются корректно
- [ ] Навигация работает (smooth scroll)
- [ ] Мобильное меню открывается/закрывается
- [ ] Табы переключаются
- [ ] FAQ аккордеон работает
- [ ] Калькулятор считает правильно
- [ ] Формы отправляются (настроить endpoint!)
- [ ] Анимации работают плавно

### 2. Производительность

Проверьте с помощью [PageSpeed Insights](https://pagespeed.web.dev/):

```bash
# Целевые показатели:
✅ Performance: 80+ (Desktop), 70+ (Mobile)
✅ Accessibility: 90+
✅ Best Practices: 85+
✅ SEO: 95+
```

### 3. Responsive Design

Протестируйте на разных устройствах:
- [ ] Desktop (1920x1080, 1440x900)
- [ ] Tablet (768x1024)
- [ ] Mobile (375x667, 414x896)

### 4. Browser Compatibility

- [ ] Chrome (latest)
- [ ] Safari (latest)
- [ ] Firefox (latest)
- [ ] Edge (latest)

### 5. SEO

Проверьте с помощью инструментов:
- [Google Search Console](https://search.google.com/search-console)
- [Rich Results Test](https://search.google.com/test/rich-results)

```bash
# Проверить структурированные данные
curl -s https://your-site.com | grep -A 20 'application/ld+json'
```

---

## 🔄 Continuous Deployment (CI/CD)

### Автоматический деплой с Vercel (уже настроен)

**При каждом push в main:**
1. Vercel автоматически:
   - Устанавливает зависимости
   - Собирает проект
   - Деплоит на production
   - Обновляет домен

**При каждом Pull Request:**
- Создается preview deployment
- Можно протестировать изменения перед мерджем
- Уникальный URL для каждого PR

### GitHub Actions (альтернатива)

Создать `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
```

---

## 🐛 Troubleshooting

### Проблема: "Build failed"

```bash
# Проверить локально
npm run build

# Проверить логи
vercel logs [deployment-url]

# Очистить кеш и пересобрать
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Проблема: "404 при переходе по ссылкам"

Убедитесь, что в `vercel.json` есть:
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

### Проблема: "Формы не отправляются"

1. Проверьте CORS
2. Обновите endpoint в `src/scripts/main.js`:
```javascript
const response = await fetch('https://formspree.io/f/YOUR_REAL_ID', {
  method: 'POST',
  body: formData,
  headers: { 'Accept': 'application/json' }
});
```

### Проблема: "Медленная загрузка"

```bash
# Проверить размер бандла
npm run build
du -sh dist/*

# Оптимизировать изображения
# Использовать WebP формат
# Включить lazy loading
```

---

## 📊 Мониторинг

### Аналитика

**Google Analytics:**
Добавить в `src/index.html` перед `</head>`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

**Yandex Metrika:**
```html
<!-- Yandex.Metrika counter -->
<script type="text/javascript">
   (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
   m[i].l=1*new Date();
   for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
   k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
   (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

   ym(XXXXXXXX, "init", {
        clickmap:true,
        trackLinks:true,
        accurateTrackBounce:true,
        webvisor:true
   });
</script>
```

### Error Tracking

**Sentry:**
```bash
npm install @sentry/browser

# В main.js
import * as Sentry from "@sentry/browser";

Sentry.init({
  dsn: "YOUR_SENTRY_DSN",
  environment: "production"
});
```

---

## 📞 Получение помощи

**Если возникли проблемы:**

1. **Vercel Support:**
   - [Documentation](https://vercel.com/docs)
   - [Community](https://github.com/vercel/vercel/discussions)

2. **Netlify Support:**
   - [Documentation](https://docs.netlify.com/)
   - [Community](https://answers.netlify.com/)

3. **Проект:**
   - Email: hello@mvpfinance2025.com
   - GitHub Issues: https://github.com/atrkk2024-beep/mvpfinance2025/issues

---

## 🎉 Готово!

После успешного деплоя ваш сайт будет доступен по адресу:

- **Vercel:** `https://mvpfinance2025.vercel.app`
- **Custom Domain:** `https://mvpfinance2025.com`

**Следующие шаги:**
1. ✅ Настроить форму с реальным endpoint
2. ✅ Добавить Google Analytics
3. ✅ Настроить кастомный домен
4. ✅ Проверить все функции
5. ✅ Запустить тестовую рекламную кампанию

---

**Built with ❤️ for MVP Finance 2025**
