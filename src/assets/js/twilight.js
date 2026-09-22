/* Extracted runtime from supplied HTML. Preserve as the page bootstrap/runtime. */
'use strict';
/* ============================================================
   COOKIES LINO — THEME ENGINE
   البنية: CONFIG → DATA → UTILS → UI MODULES → INIT
============================================================ */

/* ---------- 1) CONFIG + ASSETS (كل الصور قابلة للاستبدال هنا) ---------- */
const LINO_CONFIG = {
  currency: 'ر.س',
  freeShipThreshold: 149,
  whatsapp: 'https://wa.me/966500000000',
  /* في الإنتاج: ضع تاريخًا ثابتًا مثل '2025-12-31T23:59:59' */
  offerEnd: Date.now() + 3 * 24 * 60 * 60 * 1000,
};

const UA = (id, w = 900) =>
  `https://images.unsplash.com/${id}?q=80&w=${w}&auto=format&fit=crop`;

/* نظام الصور المركزي — استبدل القيم بروابط CDN سلة عند النشر */
const LINO_ASSETS = {
  hero:        UA('photo-1499636136210-6f4ee915583e', 1000),
  heroFloat:   UA('photo-1590080875515-8a3a8dc5735e', 200),
  story:       UA('photo-1519915028121-7d3463d20b13', 800),
  categories: {
    classic:   UA('photo-1548907040-4baa42d10919', 300),
    chocolate: UA('photo-1590080875515-8a3a8dc5735e', 300),
    filled:    UA('photo-1558961363-fa8fdf82db35', 300),
    boxes:     UA('photo-1611625618313-68b87aaa0626', 300),
    healthy:   UA('photo-1559561853-08451507cbe7', 300),
    best:      UA('photo-1499636136210-6f4ee915583e', 300),
    offers:    UA('photo-1587080413959-06b859fb107d', 300),
  },
  collection: {
    a: UA('photo-1590080875515-8a3a8dc5735e', 900),
    b: UA('photo-1621939514649-280e2ee23f28', 700),
    c: UA('photo-1558961363-fa8fdf82db35', 700),
    d: UA('photo-1519915028121-7d3463d20b13', 1100),
  },
  instagram: [
    UA('photo-1499636136210-6f4ee915583e', 500),
    UA('photo-1548907040-4baa42d10919', 500),
    UA('photo-1558961363-fa8fdf82db35', 500),
    UA('photo-1519915028121-7d3463d20b13', 500),
    UA('photo-1621939514649-280e2ee23f28', 500),
    UA('photo-1590080875515-8a3a8dc5735e', 500),
  ],
};

/* ---------- 2) DATA (في الإنتاج: من Twig/API سلة) ---------- */
const LINO_CATEGORIES = [
  { id: 'classic',   name: 'كوكيز كلاسيك',  sub: 'الوصفة الأصلية' },
  { id: 'chocolate', name: 'دبل شوكولاتة',  sub: 'لعشاق الكاكاو' },
  { id: 'filled',    name: 'كوكيز محشي',    sub: 'نوتيلا ولوتس' },
  { id: 'boxes',     name: 'بوكسات',        sub: 'للمناسبات' },
  { id: 'healthy',   name: 'صحي وشوفان',    sub: 'بدون سكر مضاف' },
  { id: 'best',      name: 'الأكثر مبيعًا', sub: 'المفضلة لديكم' },
  { id: 'offers',    name: 'عروض',          sub: 'لفترة محدودة' },
];

const LINO_PRODUCTS = [
  { id: 1,  name: 'كوكيز كلاسيك بشوكولاتة الحليب', cat: 'classic',   price: 39,  old: 0,   rating: 4.9, reviews: 320, badge: 'best',    img: UA('photo-1548907040-4baa42d10919', 600),
    desc: 'الوصفة التي بدأنا بها: عجينة زبدة ذهبية مع قطع سخية من شوكولاتة الحليب البلجيكية. هشّ من الخارج، طري من الداخل.' },
  { id: 2,  name: 'دبل شوكولاتة 54%',              cat: 'chocolate', price: 45,  old: 55,  rating: 5.0, reviews: 412, badge: 'best',    img: UA('photo-1590080875515-8a3a8dc5735e', 600),
    desc: 'لعشاق الشوكولاتة الحقيقيين: عجينة كاكاو داكنة مع قطع شوكولاتة 54% ورشة ملح بحري تُبرز العمق.' },
  { id: 3,  name: 'كوكيز محشي نوتيلا',             cat: 'filled',    price: 49,  old: 0,   rating: 4.8, reviews: 268, badge: 'new',     img: UA('photo-1558961363-fa8fdf82db35', 600),
    desc: 'قلب نوتيلا ذائب داخل عجينة فانيليا فرنسية. يُسخّن 20 ثانية ليصلك القلب متدفقًا.' },
  { id: 4,  name: 'كوكيز زبدة الفول السوداني',     cat: 'classic',   price: 42,  old: 0,   rating: 4.7, reviews: 141, badge: '',        img: UA('photo-1559561853-08451507cbe7', 600),
    desc: 'غني، مالح-حلو، ومقرمش بحواف ذهبية. مصنوع من زبدة فول سوداني محمصة طازجة.' },
  { id: 5,  name: 'ريد فلفت بالجبن الكريمي',       cat: 'filled',    price: 48,  old: 0,   rating: 4.9, reviews: 96,  badge: 'limited', img: UA('photo-1621939514649-280e2ee23f28', 600),
    desc: 'إصدار محدود: كوكيز مخملية حمراء محشوة بجبن كريمي مخفوق. كمية يومية محدودة.' },
  { id: 6,  name: 'شوفان بالتمر والجوز',           cat: 'healthy',   price: 38,  old: 0,   rating: 4.6, reviews: 88,  badge: '',        img: UA('photo-1587080413959-06b859fb107d', 600),
    desc: 'حلاوة التمر الطبيعي بدون سكر مضاف، مع شوفان كامل وجوز محمص. خيارك الصحي اللذيذ.' },
  { id: 7,  name: 'بوكس لينو الملكي — 24 قطعة',    cat: 'boxes',     price: 189, old: 220, rating: 5.0, reviews: 205, badge: 'best',    img: UA('photo-1519915028121-7d3463d20b13', 600),
    desc: 'تشكيلة من 6 نكهات في علبة إهداء فاخرة مع بطاقة مخصصة. الخيار الأمثل للمناسبات الكبيرة.' },
  { id: 8,  name: 'بوكس هدية لينو — 12 قطعة',      cat: 'boxes',     price: 109, old: 0,   rating: 4.9, reviews: 173, badge: 'new',     img: UA('photo-1611625618313-68b87aaa0626', 600),
    desc: 'هدية مثالية: 12 قطعة من أشهر نكهاتنا مع تغليف وشريط ساتان وبطاقة إهداء مجانية.' },
  { id: 9,  name: 'ميني كوكيز للأطفال — 15 قطعة',  cat: 'classic',   price: 32,  old: 0,   rating: 4.8, reviews: 64,  badge: '',        img: UA('photo-1571875257727-a486ad1c124c', 600),
    desc: 'قطع صغيرة بحجم مثالي لأيدي الصغار وحصص المدرسة، بألوان طبيعية مبهجة.' },
  { id: 10, name: 'كوكيز لوتس كرامل',              cat: 'filled',    price: 47,  old: 0,   rating: 4.9, reviews: 152, badge: 'new',     img: UA('photo-1499636136210-6f4ee915583e', 600),
    desc: 'عجينة بسكويت اللوتس مع حشوة كرامل مملح وقطع بسكويت مقرمشة. إدمان من أول قضمة.' },
];

const LINO_REVIEWS = [
  { name: 'سارة العتيبي',  city: 'الرياض', stars: 5, txt: 'أفضل كوكيز جربته في حياتي! وصلني دافي والتغليف فخم جدًا. طلبت بوكس الهدايا لأمي وانبهرت فيه.' },
  { name: 'محمد الشهري',   city: 'جدة',    stars: 5, txt: 'الدبل شوكولاتة شيء ثاني 🔥 واضح إن المكونات فاخرة. صار طلبي الأسبوعي الثابت.' },
  { name: 'نورة القحطاني', city: 'الدمام', stars: 5, txt: 'طلبت بوكس الشركات لاجتماعنا، الجميع سأل عن المصدر. تعامل راقٍ وتوصيل بدقة.' },
  { name: 'عبدالله السالم',city: 'الرياض', stars: 4, txt: 'كوكيز اللوتس خطير! أتمنى فقط توفير شحن أسرع للمناطق البعيدة، غير كذا تجربة ممتازة.' },
  { name: 'ريم الحربي',    city: 'مكة',    stars: 5, txt: 'طلبت ميني كوكيز لحفلة بنتي، الأطفال ما خلوا ولا قطعة 😍 شكرًا على الاهتمام بالتفاصيل.' },
];

const LINO_FAQ = [
  { q: 'كم مدة التوصيل؟', a: 'نوصّل خلال 24 ساعة داخل المدن الرئيسية، و2–4 أيام عمل لبقية مناطق المملكة عبر شحن مبرّد يحافظ على طزاجة الكوكيز.' },
  { q: 'كيف أحافظ على طزاجة الكوكيز؟', a: 'يُحفظ الكوكيز في علبة مغلقة بحرارة الغرفة حتى 5 أيام. للحصول على تجربة "مخبوز للتو"، سخّنه 15–20 ثانية في الميكروويف.' },
  { q: 'هل تتوفر خيارات بدون غلوتين أو سكر؟', a: 'نعم! لدينا خط "صحي وشوفان" بدون سكر مضاف، وخيار بدون غلوتين يتوفر أسبوعيًا — تابع حسابنا لمعرفة أيام توفره.' },
  { q: 'هل يمكن تخصيص بوكسات الهدايا؟', a: 'بالتأكيد. نوفر تخصيصًا كاملًا: اختيار النكهات، بطاقة إهداء باسمك، وشعار شركتك للبوكسات التجارية (حد أدنى 10 بوكسات).' },
  { q: 'ما وسائل الدفع المتاحة؟', a: 'نقبل مدى، فيزا، ماستركارد، Apple Pay، والدفع عند الاستلام، بالإضافة إلى الدفع بالتقسيط عبر تمارا.' },
];

/* ---------- 3) I18N (عربي/إنجليزي) ---------- */
const LINO_I18N = {
  ar: {}, /* الافتراضي = النصوص الموجودة في HTML */
  en: {
    loading: 'Baking your page…', shipMsg: 'Same-day delivery in city', currency: 'SAR',
    brandName: 'Cookies Lino', navHome: 'Home', navCookies: 'Cookies', navGifts: 'Gift Boxes',
    navOffers: 'Offers', navStory: 'Our Story', navFaq: 'FAQ', navShop: 'Shop',
    heroChip: '🍪 Baked fresh daily', heroTitle: 'Artisan luxury cookies,<br>with <em>real</em> chocolate',
    heroLead: 'At Cookies Lino every piece is hand-baked each morning: French butter, 54% Belgian chocolate, and recipes perfected over years.',
    heroCta1: 'Shop Now', heroCta2: 'Explore Boxes', heroTrust: '4.9/5 — 12,000+ happy customers',
    catKicker: 'Categories', catTitle: 'Pick your flavor', catSub: 'From golden classic to stuffed luxury — a cookie for every mood.',
    bestKicker: 'Best Sellers', bestTitle: 'Everyone loves these',
    collKicker: 'The Collection', collTitle: 'Pieces worth trying', collSub: 'Curated edits from our bakery — browse it like a magazine.',
    storyKicker: 'Our Story', storyTitle: 'From our oven to your table',
    shopKicker: 'Shop', shopTitle: 'Shop by taste', tabAll: 'All', tabNew: 'New In', tabBest: 'Best Sellers', tabSale: 'Offers',
    giftKicker: 'Gift Boxes', giftTitle: 'Gift a sweet moment', giftSub: 'Boxes designed for occasions & corporate, with luxury wrapping.',
    offerChip: 'Weekend Offer', offerTitle: '20% off all gift boxes', offerSub: 'Use code <b>LINO20</b> at checkout — while stock lasts.',
    offerCta: 'Order your box', days: 'Days', hours: 'Hours', mins: 'Min', secs: 'Sec',
    revKicker: 'Reviews', revTitle: 'What they say about Lino',
    igKicker: 'Follow us', igTitle: '@cookies.lino', igSub: 'Share your sweet moment with #CookiesLino to be featured.',
    faqKicker: 'Help', faqTitle: 'Got a question? Answers below 👇',
    nlTitle: 'Subscribe & get 10% off your first order 🎁', nlSub: 'Exclusive offers and new flavors first — no spam, promise.',
    nlBtn: 'Subscribe', nlPh: 'Your email address', nlLabel: 'Email address',
    nlOk: '🎉 Welcome to the Lino family! Check your inbox.', nlErr: 'Please enter a valid email address.',
    fLinks: 'Quick Links', fCats: 'Categories', fContact: 'Contact Us', fHours: 'Sat–Thu: 8 AM – 11 PM',
    cartTitle: 'Shopping Cart', subtotal: 'Subtotal', total: 'Total (incl. VAT)', checkout: 'Checkout',
    contShop: 'Continue shopping', shipNote: '🚚 Free shipping over 149 SAR', openCart: 'Open Cart', login: 'Login',
    addToCart: 'Add to Cart', fresh: 'Baked today', ship24: '24h delivery', giftable: 'Giftable',
    searchPh: 'Search cookies, boxes, flavors…', searchHint: 'Try: “chocolate”, “stuffed”, “box”…',
    bHome: 'Home', bCats: 'Browse', bWish: 'Wishlist', bCart: 'Cart', bMe: 'Me',
    emptyCart: 'Your cart is empty', emptyCartSub: 'Let’s fix that — our ovens are ready!', browse: 'Browse cookies',
    noResults: 'No results found', added: 'Added to cart', wishOn: 'Added to wishlist', wishOff: 'Removed from wishlist',
    pieces: 'pieces', view: 'Quick view',
  },
};

/* ---------- 4) UTILS ---------- */
const $  = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => [...c.querySelectorAll(s)];
const store = {
  get(k, fb) { try { return JSON.parse(localStorage.getItem(k)) ?? fb; } catch { return fb; } },
  set(k, v)  { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} },
};
const money = n => `${Number(n).toLocaleString('en-US')} ${LINO_CONFIG.currency}`;
const offPct = p => p.old > p.price ? Math.round((1 - p.price / p.old) * 100) : 0;
const starsOf = r => '★'.repeat(Math.round(r)) + '☆'.repeat(5 - Math.round(r));
const esc = s => String(s).replace(/[&<>"]/g, m => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;' }[m]));
const findProduct = id => LINO_PRODUCTS.find(p => p.id === +id);
const isRTL = () => document.documentElement.dir === 'rtl';

/* جسر تكامل سلة: يستخدم أحداث المنصة عند توفرها */
const SallaBridge = {
  ready: () => !!window.salla?.event?.dispatch,
  dispatch(evt) { if (this.ready()) { try { salla.event.dispatch(evt); } catch {} return true; } return false; },
};

/* Toast */
const Toast = {
  show(msg, type = 'ok') {
    const box = $('#toasts');
    const el = document.createElement('div');
    el.className = `toast toast--${type}`;
    el.innerHTML = `<span>${type === 'ok' ? '✅' : '⚠️'}</span><span>${esc(msg)}</span>`;
    box.appendChild(el);
    setTimeout(() => { el.style.opacity = '0'; el.style.transition = 'opacity .4s'; setTimeout(() => el.remove(), 400); }, 2600);
  },
};

/* Lazy images */
const LazyImg = {
  io: null,
  init() {
    this.io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        const el = e.target;
        if (el.dataset.lz) { el.src = el.dataset.lz; el.removeAttribute('data-lz'); }
        this.io.unobserve(el);
      });
    }, { rootMargin: '220px' });
    $$('[data-lz]').forEach(el => this.io.observe(el));
  },
  watch(el) { if (el.dataset.lz && this.io) this.io.observe(el); },
};

/* ---------- 5) WISHLIST ---------- */
const Wishlist = {
  items: new Set(store.get('lino_wish', [])),
  toggle(id) {
    id = +id;
    if (this.items.has(id)) { this.items.delete(id); Toast.show(t('wishOff')); }
    else { this.items.add(id); Toast.show(t('wishOn')); }
    store.set('lino_wish', [...this.items]);
    this.render();
  },
  has(id) { return this.items.has(+id); },
  render() {
    const n = this.items.size || '';
    $('#wishCount').textContent = n;
    $$('[data-wish-count]').forEach(el => el.textContent = n);
    $$('.pcard__wish').forEach(b => b.classList.toggle('is-on', this.has(b.dataset.id)));
  },
};

/* ---------- 6) CART ---------- */
const Cart = {
  items: store.get('lino_cart', []),
  save() { store.set('lino_cart', this.items); },
  count() { return this.items.reduce((s, i) => s + i.qty, 0); },
  subtotal() { return this.items.reduce((s, i) => s + findProduct(i.id).price * i.qty, 0); },
  add(id, qty = 1) {
    const line = this.items.find(i => i.id === +id);
    line ? line.qty += qty : this.items.push({ id: +id, qty });
    this.save(); this.render(); this.open();
    Toast.show(t('added'));
  },
  setQty(id, qty) {
    const line = this.items.find(i => i.id === +id);
    if (!line) return;
    line.qty = qty;
    if (line.qty < 1) this.items = this.items.filter(i => i !== line);
    this.save(); this.render();
  },
  remove(id) { this.items = this.items.filter(i => i.id !== +id); this.save(); this.render(); },
  open() {
    $('#cartDrawer').classList.add('is-open');
    $('#cartScrim').classList.add('is-open');
    document.body.style.overflow = 'hidden';
  },
  close() {
    $('#cartDrawer').classList.remove('is-open');
    $('#cartScrim').classList.remove('is-open');
    document.body.style.overflow = '';
  },
  render() {
    const n = this.count();
    $('#cartCount').textContent = n || '';
    $$('[data-cart-count]').forEach(el => el.textContent = n || '');
    $('#cartHeadCount').textContent = n || '';

    const body = $('#cartBody');
    if (!this.items.length) {
      body.innerHTML = `
        <div class="cart-empty">
          <span>🍪</span>
          <b>${esc(t('emptyCart'))}</b>
          <p style="margin-block:.4rem 1.2rem">${esc(t('emptyCartSub'))}</p>
          <a class="btn btn--primary" href="#bestSellers" data-close-cart>${esc(t('browse'))}</a>
        </div>`;
      $('#cartFoot').style.display = 'none';
      return;
    }
    $('#cartFoot').style.display = '';
    body.innerHTML = this.items.map(i => {
      const p = findProduct(i.id);
      return `
      <div class="ci" data-ci="${p.id}">
        <img src="${p.img}" alt="${esc(p.name)}" loading="lazy">
        <div class="ci__info">
          <b>${esc(p.name)}</b>
          <span class="ci__price">${money(p.price)}</span>
          <div class="ci__qty">
            <button type="button" data-cq="-" aria-label="تقليل"><svg width="12" height="12"><use href="#i-minus"/></svg></button>
            <span>${i.qty}</span>
            <button type="button" data-cq="+" aria-label="زيادة"><svg width="12" height="12"><use href="#i-plus"/></svg></button>
          </div>
        </div>
        <button class="ci__rm" type="button" data-crm aria-label="حذف"><svg><use href="#i-trash"/></svg></button>
      </div>`;
    }).join('');

    const sub = this.subtotal();
    $('#cartSubtotal').textContent = money(sub);
    $('#cartTotal').textContent = money(sub);
  },
};

/* ---------- 7) PRODUCT RENDERERS ---------- */
const Cards = {
  badgeLabel: { best: 'الأكثر مبيعًا', new: 'جديد', limited: 'إصدار محدود', sale: 'خصم' },
  html(p) {
    const off = offPct(p);
    return `
    <article class="pcard" data-pid="${p.id}">
      <div class="pcard__media">
        ${p.badge ? `<span class="badge badge--${p.badge === 'sale' && off ? 'sale' : p.badge}">${this.badgeLabel[p.badge] || ''}${off ? ` ${off}%` : ''}</span>` : ''}
        <button class="pcard__wish" type="button" data-id="${p.id}" aria-label="أضف للمفضلة"><svg><use href="#i-heart"/></svg></button>
        <img data-lz="${p.img}" alt="${esc(p.name)}" loading="lazy" width="600" height="630">
        <div class="pcard__hover">
          <button type="button" data-qv="${p.id}">👁 ${esc(t('view'))}</button>
          <button type="button" data-add="${p.id}">+ ${esc(t('addToCart'))}</button>
        </div>
      </div>
      <div class="pcard__body">
        <div class="pcard__rate"><span class="stars">${starsOf(p.rating)}</span> ${p.rating} (${p.reviews})</div>
        <h3 class="pcard__name"><a href="#product-${p.id}" data-qv="${p.id}">${esc(p.name)}</a></h3>
        <div class="pcard__price">
          <b>${money(p.price)}</b>
          ${p.old ? `<s>${money(p.old)}</s><span class="off">-${off}%</span>` : ''}
        </div>
        <button class="pcard__add" type="button" data-add="${p.id}">
          <svg><use href="#i-bag"/></svg> ${esc(t('addToCart'))}
        </button>
      </div>
    </article>`;
  },
  into(container, list) {
    container.innerHTML = list.length
      ? list.map(p => this.html(p)).join('')
      : `<div class="grid-empty">🍪 ${esc(t('noResults'))}</div>`;
    $$('img[data-lz]', container).forEach(el => LazyImg.watch(el));
    Wishlist.render();
  },
};

/* ---------- 8) QUICK VIEW ---------- */
const QuickView = {
  current: null, qty: 1,
  open(id) {
    const p = findProduct(id);
    if (!p) return;
    this.current = p; this.qty = 1;
    $('#qvImg').src = p.img; $('#qvImg').alt = p.name;
    $('#qvCat').textContent = LINO_CATEGORIES.find(c => c.id === p.cat)?.name || '';
    $('#qvName').textContent = p.name;
    $('#qvStars').textContent = starsOf(p.rating);
    $('#qvRate').textContent = `${p.rating} (${p.reviews})`;
    $('#qvPrice').textContent = money(p.price);
    $('#qvOld').textContent = p.old ? money(p.old) : '';
    const off = offPct(p);
    $('#qvOff').textContent = off ? `-${off}%` : '';
    $('#qvOff').style.display = off ? '' : 'none';
    $('#qvDesc').textContent = p.desc;
    $('#qvQty').textContent = this.qty;
    $('#qvScrim').classList.add('is-open');
    document.body.style.overflow = 'hidden';
    $('#qvClose').focus();
  },
  close() {
    $('#qvScrim').classList.remove('is-open');
    document.body.style.overflow = '';
  },
};

/* ---------- 9) SEARCH ---------- */
const Search = {
  open() {
    if (SallaBridge.dispatch('search::open')) return; /* وضع سلة */
    $('#searchOv').classList.add('is-open');
    document.body.style.overflow = 'hidden';
    setTimeout(() => $('#searchInput').focus(), 250);
  },
  close() {
    $('#searchOv').classList.remove('is-open');
    document.body.style.overflow = '';
    $('#searchInput').value = ''; $('#searchResults').innerHTML = '';
  },
  run(q) {
    q = q.trim();
    const box = $('#searchResults');
    if (!q) { box.innerHTML = ''; return; }
    const hits = LINO_PRODUCTS.filter(p => p.name.includes(q) || p.desc.includes(q));
    box.innerHTML = hits.length
      ? hits.map(p => `
        <div class="sr-item" role="button" tabindex="0" data-qv="${p.id}">
          <img src="${p.img}" alt="" loading="lazy">
          <div><b>${esc(p.name)}</b><small>${money(p.price)}</small></div>
        </div>`).join('')
      : `<div class="grid-empty" style="margin-block-start:1rem">🍪 ${esc(t('noResults'))}</div>`;
  },
};

/* ---------- 10) SLIDERS / TABS / FAQ / COUNTDOWN / MENU / THEME / I18N ---------- */
function initSliders() {
  $$('[data-slide]').forEach(btn => {
    btn.addEventListener('click', () => {
      const vp = $('#' + btn.dataset.target);
      if (!vp) return;
      const item = vp.firstElementChild;
      const step = (item?.offsetWidth || 260) + 18;
      const dir = btn.dataset.slide === 'next' ? 1 : -1;
      vp.scrollBy({ left: (isRTL() ? -1 : 1) * dir * step * 2, behavior: 'smooth' });
    });
  });
}

function initTabs() {
  $$('.tab-btn').forEach(btn => btn.addEventListener('click', () => {
    $$('.tab-btn').forEach(b => { b.classList.remove('is-active'); b.setAttribute('aria-selected', 'false'); });
    btn.classList.add('is-active'); btn.setAttribute('aria-selected', 'true');
    $$('.tab-panel').forEach(p => p.classList.toggle('is-active', p.dataset.panel === btn.dataset.tab));
  }));
}

function initFaq() {
  $('#faqList').innerHTML = LINO_FAQ.map((f, i) => `
    <div class="faq__item">
      <button class="faq__q" type="button" aria-expanded="false" aria-controls="faqA${i}">
        <span>${esc(f.q)}</span>
        <svg><use href="#i-plus"/></svg>
      </button>
      <div class="faq__a" id="faqA${i}" role="region"><p>${esc(f.a)}</p></div>
    </div>`).join('');
  $$('.faq__q').forEach(q => q.addEventListener('click', () => {
    const item = q.parentElement, a = item.querySelector('.faq__a');
    const open = item.classList.toggle('is-open');
    q.setAttribute('aria-expanded', open);
    a.style.maxHeight = open ? a.scrollHeight + 'px' : '0';
  }));
}

function initCountdown() {
  const els = { d: $('[data-cd="d"]'), h: $('[data-cd="h"]'), m: $('[data-cd="m"]'), s: $('[data-cd="s"]') };
  const pad = n => String(n).padStart(2, '0');
  const tick = () => {
    let diff = Math.max(0, LINO_CONFIG.offerEnd - Date.now());
    const d = Math.floor(diff / 864e5); diff -= d * 864e5;
    const h = Math.floor(diff / 36e5);  diff -= h * 36e5;
    const m = Math.floor(diff / 6e4);   diff -= m * 6e4;
    const s = Math.floor(diff / 1e3);
    els.d.textContent = pad(d); els.h.textContent = pad(h);
    els.m.textContent = pad(m); els.s.textContent = pad(s);
  };
  tick(); setInterval(tick, 1000);
}

const MobileMenu = {
  open() {
    $('#mobileMenu').classList.add('is-open');
    $('#menuScrim').classList.add('is-open');
    document.body.style.overflow = 'hidden';
  },
  close() {
    $('#mobileMenu').classList.remove('is-open');
    $('#menuScrim').classList.remove('is-open');
    document.body.style.overflow = '';
  },
};

function initThemeToggle() {
  const btn = $('#themeToggle');
  const saved = store.get('lino_theme', 'light');
  setTheme(saved);
  btn.addEventListener('click', () => {
    const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    setTheme(next); store.set('lino_theme', next);
  });
  function setTheme(mode) {
    document.documentElement.dataset.theme = mode;
    btn.innerHTML = mode === 'dark'
      ? '<svg><use href="#i-sun"/></svg>'
      : '<svg><use href="#i-moon"/></svg>';
    btn.setAttribute('aria-label', mode === 'dark' ? 'الوضع النهاري' : 'الوضع الليلي');
  }
}

/* تبديل اللغة (RTL ↔ LTR) */
let curLang = store.get('lino_lang', 'ar');
function t(key) {
  if (curLang === 'ar') {
    const el = document.querySelector(`[data-i18n="${key}"]`);
    return (el?.textContent?.trim()) || LINO_I18N.en[key] || key;
  }
  return LINO_I18N.en[key] || key;
}
function applyLang(lang) {
  curLang = lang; store.set('lino_lang', lang);
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  $('#langLabel').textContent = lang === 'ar' ? 'EN' : 'عربي';
  if (lang === 'ar') return; /* العربي هو الأصل في الـ HTML */
  $$('[data-i18n]').forEach(el => {
    const v = LINO_I18N.en[el.dataset.i18n];
    if (v) el.textContent = v;
  });
  $$('[data-i18n-html]').forEach(el => {
    const v = LINO_I18N.en[el.dataset.i18nHtml];
    if (v) el.innerHTML = v;
  });
  $$('[data-i18n-ph]').forEach(el => {
    const v = LINO_I18N.en[el.dataset.i18nPh];
    if (v) el.placeholder = v;
  });
}

/* ---------- 11) STATIC BUILDERS ---------- */
function buildAll() {
  /* Categories */
  $('#catsGrid').innerHTML = LINO_CATEGORIES.map(c => `
    <a class="cat" href="#shop" aria-label="${esc(c.name)}">
      <img class="cat__img" data-lz="${LINO_ASSETS.categories[c.id]}" alt="${esc(c.name)}" loading="lazy" width="96" height="96">
      <span class="cat__name">${esc(c.name)}</span>
      <span class="cat__sub">${esc(c.sub)}</span>
    </a>`).join('');

  /* Hero images */
  $('.hero__img').dataset.lz = LINO_ASSETS.hero;
  $('.hero__float img').dataset.lz = LINO_ASSETS.heroFloat;
  $('.story__img').dataset.lz = LINO_ASSETS.story;

  /* Best sellers slider */
  const best = LINO_PRODUCTS.filter(p => p.badge === 'best' || p.rating >= 4.8);
  $('#bestSlider').innerHTML = best.map(p => Cards.html(p)).join('');

  /* Editorial collection */
  const collData = [
    { cls: 'coll__tile--a', img: LINO_ASSETS.collection.a, tag: 'الأكثر مبيعًا', title: 'دبل شوكولاتة 54%', sub: 'لعشاق الكاكاو الحقيقي', pid: 2 },
    { cls: 'coll__tile--b', img: LINO_ASSETS.collection.b, tag: 'إصدار محدود',   title: 'ريد فلفت بالجبن',   sub: 'كمية يومية محدودة',   pid: 5 },
    { cls: 'coll__tile--c', img: LINO_ASSETS.collection.c, tag: 'جديد',           title: 'محشي نوتيلا',       sub: 'قلب ذائب',            pid: 3 },
    { cls: 'coll__tile--d', img: LINO_ASSETS.collection.d, tag: 'بوكسات',         title: 'بوكس لينو الملكي',  sub: '24 قطعة · 6 نكهات',   pid: 7 },
  ];
  $('#collGrid').innerHTML = collData.map(c => `
    <a class="coll__tile ${c.cls}" href="#product-${c.pid}" data-qv="${c.pid}">
      <img data-lz="${c.img}" alt="${esc(c.title)}" loading="lazy">
      <span class="coll__tag">${esc(c.tag)}</span>
      <div class="coll__cap">
        <h3>${esc(c.title)}</h3>
        <p>${esc(c.sub)}</p>
        <span class="coll__link">${esc(t('view'))} <svg><use href="#i-arrow"/></svg></span>
      </div>
    </a>`).join('');

  /* Tabs grids */
  const filterMap = {
    all: LINO_PRODUCTS,
    new: LINO_PRODUCTS.filter(p => p.badge === 'new'),
    best: LINO_PRODUCTS.filter(p => p.badge === 'best'),
    sale: LINO_PRODUCTS.filter(p => p.old > p.price),
  };
  $$('[data-grid]').forEach(g => Cards.into(g, filterMap[g.dataset.grid]));

  /* Gifts */
  $('#giftGrid').innerHTML = LINO_PRODUCTS.filter(p => p.cat === 'boxes').map(p => `
    <article class="gift-card">
      <img class="gift-card__img" data-lz="${p.img}" alt="${esc(p.name)}" loading="lazy">
      <div class="gift-card__body">
        <div class="gift-card__meta">
          <span>🎁 ${esc(p.name.split('—')[1] || '')}</span>
          <span class="stars" style="color:var(--butter)">${starsOf(p.rating)}</span>
        </div>
        <h3>${esc(p.name)}</h3>
        <p style="font-size:.8rem;color:#D8C3A5;line-height:1.8">${esc(p.desc)}</p>
        <div class="gift-card__price">
          <b>${money(p.price)}</b>
          ${p.old ? `<s>${money(p.old)}</s>` : ''}
        </div>
        <button class="btn btn--cream btn--sm" type="button" data-add="${p.id}">
          <svg><use href="#i-bag"/></svg> ${esc(t('addToCart'))}
        </button>
      </div>
    </article>`).join('');

  /* Reviews */
  $('#revSlider').innerHTML = LINO_REVIEWS.map(r => `
    <article class="rcard">
      <span class="rcard__stars" aria-label="${r.stars} من 5">${'★'.repeat(r.stars)}${'☆'.repeat(5 - r.stars)}</span>
      <p class="rcard__txt">“${esc(r.txt)}”</p>
      <div class="rcard__who">
        <span class="rcard__avatar">${esc(r.name[0])}</span>
        <div><b>${esc(r.name)}</b><small>${esc(r.city)} · عميل موثّق</small></div>
        <span class="rcard__quote">❝</span>
      </div>
    </article>`).join('');

  /* Instagram */
  $('#igGrid').innerHTML = LINO_ASSETS.instagram.map((src, i) => `
    <a class="ig-tile" href="https://instagram.com" target="_blank" rel="noopener" aria-label="منشور انستقرام ${i + 1}">
      <img data-lz="${src}" alt="" loading="lazy" width="500" height="500">
    </a>`).join('');

  /* Footer categories */
  $('#footerCats').innerHTML = LINO_CATEGORIES.map(c =>
    `<li><a href="#shop">🍪 ${esc(c.name)}</a></li>`).join('');

  $$('img[data-lz]').forEach(el => LazyImg.watch(el));
}

/* ---------- 12) GLOBAL EVENT DELEGATION ---------- */
function bindEvents() {
  document.addEventListener('click', e => {
    const add = e.target.closest('[data-add]');
    if (add) { Cart.add(add.dataset.add); return; }

    const wish = e.target.closest('.pcard__wish');
    if (wish) { Wishlist.toggle(wish.dataset.id); return; }

    const qv = e.target.closest('[data-qv]');
    if (qv) { e.preventDefault(); QuickView.open(qv.dataset.qv); return; }

    const cq = e.target.closest('[data-cq]');
    if (cq) {
      const id = cq.closest('[data-ci]').dataset.ci;
      const line = Cart.items.find(i => i.id === +id);
      Cart.setQty(id, line.qty + (cq.dataset.cq === '+' ? 1 : -1));
      return;
    }
    if (e.target.closest('[data-crm]')) {
      Cart.remove(e.target.closest('[data-ci]').dataset.ci);
      return;
    }

    const action = e.target.closest('[data-action]');
    if (action) {
      const act = action.dataset.action;
      if (act === 'cart') { MobileMenu.close(); Cart.open(); }
      else if (act === 'search') Search.open();
      else if (act === 'account') {
        if (!SallaBridge.dispatch('login::open')) Toast.show(curLang === 'ar' ? 'تسجيل الدخول متاح عبر حساب سلة' : 'Login via Salla account', 'err');
      }
      else if (act === 'wishlist') Toast.show(curLang === 'ar'
        ? `في المفضلة ${Wishlist.items.size} منتج ❤️`
        : `${Wishlist.items.size} items in wishlist ❤️`);
      else if (act === 'currency') Toast.show(curLang === 'ar' ? 'العملة: ريال سعودي 🇸🇦' : 'Currency: SAR 🇸🇦');
      else if (act === 'contact') window.location.href = 'tel:920000000';
      return;
    }

    if (e.target.closest('[data-close-cart]')) { Cart.close(); return; }
    if (e.target.closest('[data-close-menu]')) { MobileMenu.close(); return; }

    const subToggle = e.target.closest('[data-msub-toggle]');
    if (subToggle) { $('#' + subToggle.dataset.msubToggle).classList.toggle('is-open'); return; }
  });

  /* Menus */
  $('#menuOpen').addEventListener('click', MobileMenu.open);
  $('#menuClose').addEventListener('click', MobileMenu.close);
  $('#menuScrim').addEventListener('click', MobileMenu.close);
  $('#bnavCats').addEventListener('click', MobileMenu.open);

  /* Cart */
  $('#cartScrim').addEventListener('click', Cart.close);
  $('#checkoutBtn').addEventListener('click', () => {
    if (SallaBridge.ready()) { window.location.href = '/checkout'; }
    else Toast.show(curLang === 'ar' ? 'سيتم توجيهك لإتمام الطلب عبر سلة ✨' : 'Redirecting to Salla checkout ✨');
  });

  /* Quick view */
  $('#qvClose').addEventListener('click', QuickView.close);
  $('#qvScrim').addEventListener('click', e => { if (e.target === $('#qvScrim')) QuickView.close(); });
  $('#qvPlus').addEventListener('click', () => { QuickView.qty++; $('#qvQty').textContent = QuickView.qty; });
  $('#qvMinus').addEventListener('click', () => { if (QuickView.qty > 1) QuickView.qty--; $('#qvQty').textContent = QuickView.qty; });
  $('#qvAdd').addEventListener('click', () => { Cart.add(QuickView.current.id, QuickView.qty); QuickView.close(); });

  /* Search */
  $('[data-action="search"]')?.addEventListener('click', Search.open);
  $('#searchClose').addEventListener('click', Search.close);
  $('#searchInput').addEventListener('input', e => Search.run(e.target.value));
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') { Search.close(); QuickView.close(); Cart.close(); MobileMenu.close(); }
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); Search.open(); }
  });

  /* Newsletter */
  $('#nlForm').addEventListener('submit', e => {
    e.preventDefault();
    const email = $('#nlEmail').value.trim();
    const msg = $('#nlMsg');
    const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    msg.textContent = ok ? t('nlOk') : t('nlErr');
    msg.className = 'nl__msg ' + (ok ? 'nl__msg--ok' : 'nl__msg--err');
    if (ok) e.target.reset();
  });

  /* Language */
  $('#langToggle').addEventListener('click', () => applyLang(curLang === 'ar' ? 'en' : 'ar'));

  /* Header sticky state + back-to-top */
  const header = $('#siteHeader'), fabTop = $('#fabTop');
  const onScroll = () => {
    header.classList.toggle('is-stuck', window.scrollY > 8);
    fabTop.classList.toggle('is-visible', window.scrollY > 600);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  fabTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  /* Scroll reveal */
  const revIO = new IntersectionObserver(es => es.forEach(en => {
    if (en.isIntersecting) { en.target.classList.add('is-in'); revIO.unobserve(en.target); }
  }), { threshold: .12 });
  $$('.reveal').forEach(el => revIO.observe(el));
}

/* ---------- 13) MARQUEE DUPLICATION (seamless loop) ---------- */
function buildMarquees() {
  ['anncTrack', 'valuesTrack'].forEach(id => {
    const track = $('#' + id);
    const group = track.firstElementChild;
    const clone = group.cloneNode(true);
    clone.setAttribute('aria-hidden', 'true');
    track.appendChild(clone);
  });
}

/* ---------- 14) INIT ---------- */
document.addEventListener('DOMContentLoaded', () => {
  applyLang(curLang);
  LazyImg.init();
  buildMarquees();
  buildAll();
  initSliders();
  initTabs();
  initFaq();
  initCountdown();
  initThemeToggle();
  bindEvents();
  Cart.render();
  Wishlist.render();
});