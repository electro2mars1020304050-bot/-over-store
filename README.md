# OVERSTORE — متجر ألعاب PC (واجهة أمامية)

مشروع بسيط لواجهة متجر ألعاب PC مكتوبة بـ HTML + CSS + JavaScript. يحتوي على:
- أكثر من 60 لعبة مع صور عالية الجودة من Unsplash.
- سلة مشتريات محلية (localStorage).
- تسجيل/تسجيل دخول بسيط باستخدام localStorage.
- صفحة إدارة لإضافة ألعاب جديدة (تخزن في localStorage).
- تصميم داكن عصري مع تأثيرات نيون.

لتشغيل محلياً: افتح `index.html` في متصفحك.

ربط Firebase: هذا المشروع يدعم Firebase (Auth + Firestore) اختياريًا. الخطوات:

1. انشئ مشروع Firebase على console.firebase.google.com وقم بإنشاء Web App.
2. انسخ إعدادات التهيئة للصقها في ملف جديد `firebase-config.js` في جذر المشروع. المثال في `firebase-config.example.js`.
3. افتح `firebase-config.js` وضع:

```
window.FIREBASE_CONFIG = {
	apiKey: "...",
	authDomain: "your-app.firebaseapp.com",
	projectId: "your-app",
	storageBucket: "your-app.appspot.com",
	messagingSenderId: "...",
	appId: "..."
};
```

4. عند وجود `firebase-config.js`، ستقوم صفحات الموقع بتحميل مكتبات Firebase أوتوماتيكياً، وستتحول مصادر الألعاب للتخزين في Firestore، كما سيُستخدم Firebase Auth لتسجيل الدخول. إذا لم تقم بإضافة الملف، فالتطبيق سيعمل بشكل افتراضي عبر `localStorage`.

نقطة ملاحظة: لا تنشر مفاتيحك في مستودعات عامة بدون قيود أمان.
