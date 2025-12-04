# ⚡ Быстрый старт: Публикация на Vercel

Пошаговое руководство для публикации MVP Finance 2025 на Vercel за 5 минут.

---

## 🎯 Вариант 1: Через Web UI (Рекомендуется)

### Шаг 1: Подготовка GitHub репозитория

```bash
# Убедитесь, что вы находитесь в main ветке
git checkout main

# Слейте изменения с feature ветки (если нужно)
git merge claude/claude-md-mir8zy0h5muuakzb-01SgHSwm4YbZ3724vseewh2V

# Запушьте в main
git push origin main
```

### Шаг 2: Импорт в Vercel

1. **Откройте [vercel.com](https://vercel.com)**

2. **Нажмите "Add New..." → "Project"**

3. **Импорт Git репозитория:**
   - Выберите GitHub
   - Найдите `mvpfinance2025`
   - Нажмите "Import"

4. **Настройки проекта** (автоматически определятся):
   ```
   Framework Preset: Vite
   Root Directory: ./
   Build Command: npm run build
   Output Directory: dist
   Install Command: npm install
   ```

5. **Нажмите "Deploy"** ✨

### Шаг 3: Готово!

Через 1-2 минуты ваш сайт будет доступен по адресу:
```
https://mvpfinance2025.vercel.app
```

---

## 🚀 Вариант 2: Через Vercel CLI

### Установка CLI

```bash
# Установить Vercel CLI глобально
npm install -g vercel

# Войти в аккаунт
vercel login
```

### Деплой

```bash
# Перейти в директорию проекта
cd mvpfinance2025

# Первый деплой (инициализация)
vercel

# Следуйте подсказкам:
# - Set up and deploy? Yes
# - Which scope? [Выберите ваш аккаунт]
# - Link to existing project? No
# - Project name? mvpfinance2025
# - In which directory? ./
# - Override settings? No

# Деплой в production
vercel --prod
```

### Результат

```bash
✅ Production: https://mvpfinance2025.vercel.app
```

---

## 🔧 Настройка Custom Domain

### В Vercel Dashboard:

1. **Откройте ваш проект**
2. **Settings → Domains**
3. **Add Domain**
4. **Введите ваш домен:**
   ```
   mvpfinance2025.com
   www.mvpfinance2025.com
   ```

### Настройка DNS у регистратора:

**Вариант A: A Records (рекомендуется)**
```
Type: A
Name: @
Value: 76.76.21.21

Type: A
Name: www
Value: 76.76.21.21
```

**Вариант B: CNAME**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

### Ожидание DNS propagation:

Обычно 5-30 минут, максимум 24-48 часов.

Проверить статус:
```bash
dig mvpfinance2025.com
```

---

## ⚙️ Environment Variables (если нужно)

### Добавление через Dashboard:

1. **Settings → Environment Variables**
2. **Add New:**

```
Name: VITE_FORM_ENDPOINT
Value: https://formspree.io/f/YOUR_FORM_ID
Environment: Production, Preview, Development
```

### Использование в коде:

```javascript
// src/scripts/main.js
const formEndpoint = import.meta.env.VITE_FORM_ENDPOINT || 'https://formspree.io/f/YOUR_ID';
```

### Redeploy после добавления:

```bash
vercel --prod
```

---

## 🔄 Автоматические деплои

### Vercel автоматически деплоит:

✅ **Production:** При каждом push в `main`
```
git push origin main
→ https://mvpfinance2025.com
```

✅ **Preview:** При каждом Pull Request
```
Создает уникальный URL для тестирования
→ https://mvpfinance2025-git-feature-xxx.vercel.app
```

### Настройка Git интеграции:

1. **Settings → Git**
2. **Production Branch:** `main`
3. **Auto-deploy:** ✅ Enabled

---

## ✅ Чеклист после деплоя

### Проверьте функциональность:

```bash
# Откройте сайт
open https://mvpfinance2025.vercel.app

# Проверьте:
□ Все секции загружаются
□ Навигация работает
□ Мобильное меню открывается
□ Формы отправляются (настройте endpoint!)
□ Калькулятор считает
□ FAQ аккордеон работает
□ Табы переключаются
□ Анимации плавные
```

### Проверьте производительность:

```bash
# Google PageSpeed Insights
open "https://pagespeed.web.dev/analysis?url=https://mvpfinance2025.vercel.app"

# Целевые показатели:
✅ Performance: 80+ (Desktop), 70+ (Mobile)
✅ Accessibility: 90+
✅ Best Practices: 85+
✅ SEO: 95+
```

### Настройте аналитику:

1. **Google Analytics**
   - Создайте property
   - Добавьте tracking code в `index.html`
   - Redeploy

2. **Vercel Analytics** (встроенная)
   - Settings → Analytics
   - Enable Web Analytics
   - Включает автоматический мониторинг

---

## 🐛 Решение проблем

### Проблема: Build Failed

```bash
# Проверьте локально
npm run build

# Если успешно, проверьте логи Vercel
vercel logs [deployment-url]

# Переустановите зависимости
rm -rf node_modules package-lock.json
npm install
```

### Проблема: 404 ошибки

Убедитесь, что `vercel.json` содержит:
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

### Проблема: Формы не работают

1. Обновите endpoint в `src/scripts/main.js`:
```javascript
const response = await fetch('https://formspree.io/f/YOUR_REAL_ID', {
  method: 'POST',
  body: formData,
  headers: { 'Accept': 'application/json' }
});
```

2. Проверьте CORS настройки на бэкенде

3. Redeploy:
```bash
vercel --prod
```

---

## 📊 Мониторинг

### Vercel Analytics Dashboard:

```
https://vercel.com/[your-username]/mvpfinance2025/analytics
```

Показывает:
- Page views
- Visitors
- Top pages
- Referrers
- Devices
- Countries

### Real-time Logs:

```bash
# Следить за логами в реальном времени
vercel logs --follow

# Логи конкретного деплоя
vercel logs [deployment-url]
```

---

## 🎉 Готово!

Ваш сайт опубликован и доступен 24/7 по всему миру через Vercel CDN!

**Следующие шаги:**

1. ✅ Настроить формы с реальным endpoint
2. ✅ Добавить Google Analytics
3. ✅ Настроить custom domain
4. ✅ Запустить тестовую рекламную кампанию
5. ✅ Собирать лиды!

---

**Полная документация:** [DEPLOYMENT.md](./DEPLOYMENT.md)

**Техническая поддержка:**
- Email: hello@mvpfinance2025.com
- Vercel Docs: https://vercel.com/docs

---

Built with ❤️ for MVP Finance 2025
