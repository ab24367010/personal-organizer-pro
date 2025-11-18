# 📦 Installation Guide - Personal Organizer Pro

## Системийн шаардлага

- Node.js >= 20.0.0
- npm >= 8.0.0 эсвэл yarn >= 1.22.0
- Орчин үеийн веб browser (Chrome, Firefox, Safari, Edge)

## Суулгах алхмууд

### 1. Файлуудыг татаж авах

Эхлээд бүх файлуудыг өөрийн компьютер дээр хуулна:

```bash
# Хавтас үүсгэх
mkdir personal-organizer-pro
cd personal-organizer-pro
```

### 2. Шаардлагатай файлууд

Дараах бүтэцтэй байх ёстой:

```
personal-organizer-pro/
├── src/
│   ├── components/
│   │   ├── auth/
│   │   │   ├── Login.jsx
│   │   │   └── Register.jsx
│   │   ├── features/
│   │   │   ├── About.jsx
│   │   │   ├── Badges.jsx
│   │   │   ├── Expenses.jsx
│   │   │   ├── Habits.jsx
│   │   │   ├── Incomes.jsx
│   │   │   ├── Settings.jsx
│   │   │   ├── Statistics.jsx
│   │   │   ├── Timesheet.jsx
│   │   │   └── Todos.jsx
│   │   └── layout/
│   │       └── BurgerMenu.jsx
│   ├── store/
│   │   └── useStore.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── public/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── eslint.config.js
```

### 3. Dependencies суулгах

```bash
# npm ашиглан
npm install

# эсвэл yarn ашиглан
yarn install
```

Энэ нь дараах package-уудыг суулгана:

**Dependencies:**
- react ^19.2.0
- react-dom ^19.2.0
- react-router-dom ^7.9.6
- zustand ^5.0.8
- lucide-react ^0.554.0

**Dev Dependencies:**
- @vitejs/plugin-react ^5.1.0
- tailwindcss ^3.4.18
- autoprefixer ^10.4.22
- postcss ^8.5.6
- vite ^7.2.2
- eslint ^9.39.1

### 4. Development server эхлүүлэх

```bash
# npm
npm run dev

# yarn
yarn dev
```

Browser дээр автоматаар нээгдэх эсвэл `http://localhost:5173` хаягаар нээнэ.

### 5. Production build үүсгэх

```bash
# npm
npm run build

# yarn
yarn build
```

Build хийгдсэний дараа `dist` хавтас үүсч, тэнд бүх файлууд байрлана.

### 6. Production preview

```bash
# npm
npm run preview

# yarn
yarn preview
```

## ⚙️ Configuration

### Tailwind CSS

`tailwind.config.js` файлд дараах тохиргоо байна:

```javascript
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {},
  },
  plugins: [],
}
```

### Vite

`vite.config.js`:

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})
```

## 🐛 Troubleshooting

### Port already in use

Хэрэв 5173 port ашиглагдаж байвал:

```bash
npm run dev -- --port 3000
```

### Node version error

Node version шалгах:

```bash
node --version
```

Хэрэв хуучин байвал шинэчлэх: https://nodejs.org/

### Installation errors

Cache цэвэрлэх:

```bash
rm -rf node_modules
rm package-lock.json
npm cache clean --force
npm install
```

### ESLint errors

ESLint-ийг идэвхгүй болгох (санал болгохгүй):

```bash
npm run dev -- --no-lint
```

## 🚀 Deployment

### Netlify

1. `npm run build` ажиллуулах
2. `dist` хавтсыг Netlify-д drag & drop хийх

### Vercel

```bash
npm install -g vercel
vercel
```

### GitHub Pages

1. `vite.config.js`-д base нэмэх:

```javascript
export default defineConfig({
  plugins: [react()],
  base: '/personal-organizer-pro/'
})
```

2. Build хийж deploy хийх:

```bash
npm run build
```

## 📱 Browser Support

- Chrome >= 90
- Firefox >= 88
- Safari >= 14
- Edge >= 90

## 🔧 VS Code Extensions (санал болгох)

- ESLint
- Prettier
- Tailwind CSS IntelliSense
- ES7+ React/Redux/React-Native snippets

## 🎯 Scripts

```json
{
  "dev": "vite",
  "build": "vite build",
  "lint": "eslint .",
  "preview": "vite preview"
}
```

## 💡 Tips

1. **Hot Module Replacement (HMR)** идэвхтэй тул файл засах үед автоматаар шинэчлэгдэнэ
2. **React Fast Refresh** ашигладаг тул state алдахгүй
3. **Tailwind JIT** mode-оор ажилладаг тул ямар ч utility class ашиглаж болно
4. **Dark mode** нь `class` strategy ашигладаг

## 📖 Additional Resources

- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Zustand](https://github.com/pmndrs/zustand)
- [Lucide Icons](https://lucide.dev/)

## ✅ Verification

Installation амжилттай болсныг шалгах:

1. ✅ `npm run dev` ажиллаж байгаа
2. ✅ Browser дээр application нээгдсэн
3. ✅ Login хуудас харагдаж байгаа
4. ✅ Бүртгүүлж орж чадаж байгаа
5. ✅ Бүх хуудсууд ажиллаж байгаа
6. ✅ Dark mode солигдож байгаа
7. ✅ Data хадгалагдаж байгаа

Амжилттай ажиллаарай! 🎉
