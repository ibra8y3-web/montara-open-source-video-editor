# MONTARA

**محرر فيديو مفتوح المصدر، محلي أولًا، وبدون رفع للوسائط.**

> هذه أول شريحة تنفيذية حقيقية: استيراد، معاينة، خط زمني، قص، تقسيم، نص، كتم، حفظ محلي، وتصدير WebM.

## التشغيل

```bash
npm install
npm run check
npm run build
npm run dev
```

ثم افتح العنوان الذي يظهره Vite.

## البناء عبر GitHub

كل `push` إلى `main` أو Pull Request يشغّل `.github/workflows/build.yml`، الذي ينفذ `npm ci` ثم فحص TypeScript وبناء `dist/` ويرفعه كـ artifact باسم `montara-web-dist`.

## الوضع الحالي

- **REAL:** استيراد ومعاينة الفيديو عبر Web APIs.
- **REAL:** تصدير WebM عبر `MediaRecorder` من مسار الفيديو والـ canvas.
- **REAL:** حفظ metadata المشروع في IndexedDB.
- **PARTIAL:** التخزين الدائم للملفات نفسها، MP4، وميزات التحرير المتقدمة.
- **BLOCKED:** التغليف الأصلي لكل Android/iOS/Windows/Linux إلى أن يُحسم runtime المستهدف.

راجع `PLATFORM-ROADMAP.md` لخطة Tauri/Capacitor ومحرك FFmpeg الأصلي.

## الترخيص

MIT — أضف ملف `LICENSE` قبل أول نشر عام.
