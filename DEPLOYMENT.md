# Deployment to Vercel (Vite)

## Settings
- Framework preset: **Vite**
- Build command: `npm run build`
- Output directory: `dist`
- Node version: 18+
- Install command: `npm install`

## SPA routing
Файл `vercel.json` добавлен. Он:
- указывает `@vercel/static-build` с `dist` как выходную папку;
- делает SPA-роутинг: все пути переписываются на `/` (index.html).

## Частые проблемы (и решения)
1) **Чёрный экран, пустая страница**
   - Откройте DevTools → Console: если `react-router-dom` не найден, сделайте `npm install` и заново деплойте.
   - Проверьте, что сборка прошла без ошибок (Vercel → Build Logs).
   - Убедитесь, что проект деплоится из **этой** версии кода, а не из старой.

2) **Открываются прямые ссылки (например, /login) — 404**
   - На статическом хостинге нужен SPA fallback. В `vercel.json` уже настроено правило `routes`.

3) **Белый/чёрный экран после обновления страницы**
   - Аналогично: проблема маршрутизации. Включён SPA rewrite на `/`.

## Команды
```bash
npm install
npm run build
# локально
npm run dev
```

После этого задеплойте проект на Vercel заново.
