# YouSpeak Academy

## تشغيل المشروع محليًا

```bash
npm install
npm run dev
```

هيفتح سيرفر محلي (عادة على `http://localhost:5173`) وبيعمل reload تلقائي أي وقت تعدلي أي ملف.

للبناء النهائي (اللي ترفعيه على الاستضافة):

```bash
npm run build
```

الناتج هيتحط في فولدر `dist/` — ده اللي بترفعيه، مش السورس نفسه.

## هيكل المشروع

```
index.html                 ← الصفحة الأساسية، بتجمع كل الـ partials عن طريق تعليقات <!-- include:xxx.html -->
vite.config.js              ← إعدادات Vite + plugin بسيط بيعمل الـ include ده وقت البناء
src/
  main.js                   ← نقطة الدخول: بيستورد الـ CSS وبينده على init() بتاعة كل ميزة
  partials/                 ← كل قسم من الصفحة في ملف HTML لوحده
    header.html
    hero.html
    booth.html
    pricing.html
    testimonials.html
    contact.html
    footer.html
    checkout-modal.html
  styles/
    main.css                ← بيعمل @import لكل ملفات الأقسام بالترتيب
    base.css                ← متغيرات الألوان، الخطوط، إعدادات عامة
    animations.css
    header.css
    hero.css
    shared.css               ← عناصر مشتركة بين الأقسام (الزخارف، الـ section util، بانر المشكلة)
    booth.css
    pricing.css
    testimonials.css
    final-cta.css
    footer.css
    checkout.css
  scripts/                  ← كل ميزة JS في ملف لوحدها، كل ملف بيصدّر init function
    scroll-progress.js
    nav.js                   ← القائمة على الموبايل + تظليل القسم النشط + ظل الهيدر
    reveal.js                ← أنيميشن الظهور عند التمرير
    pricing-tabs.js           ← التبديل بين شهر/3 شهور + توهج الزرار
    checkout.js               ← المودال + رسائل الواتساب
    sparks.js                 ← الشرر الذهبي في مشهد الباب بالهيرو
public/
  assets/                   ← الصور، بتتنسخ زي ما هي في البناء النهائي وبتتقرأ بمسار /assets/...
```

## إزاي تضيفي قسم جديد للصفحة

1. اعملي ملف جديد في `src/partials/` (مثلًا `faq.html`).
2. ضيفي `<!-- include:faq.html -->` في `index.html` في المكان المناسب.
3. اعملي ملف CSS جديد في `src/styles/` وضيفيه في `src/styles/main.css` بـ `@import`.
4. لو محتاجة سلوك JS، اعملي ملف في `src/scripts/`، صدّري `initX()`، واستورديها ونادي عليها في `src/main.js`.

## ملاحظات مهمة

- **الأزرار في الأسعار بتستخدم واتساب مباشرة** (`openWhatsAppInquiry`)، مش مودال الدفع (`openCheckout`) — المودال موجود وشغال بس مش متوصل بزرار حاليًا. لو عايزة تفعّليه، لازم تحطي `onclick="openCheckout(this)"` على زرار التذكرة في `src/partials/pricing.html`.
- أرقام الدفع (فودافون كاش وInstaPay) لسه placeholder في `src/scripts/checkout.js` — لازم تتحدث بالبيانات الحقيقية قبل ما الموقع ينزل فعليًا.
- الفانكشنز بتاعة الـ checkout متعلقة بـ `window` عشان الـ `onclick="..."` في الـ HTML يشتغل. لو حابة تتطوري لاحقًا لاستخدام `addEventListener` بدل `onclick`، تقدري — بس ده تغيير إضافي مش لازم دلوقتي.
