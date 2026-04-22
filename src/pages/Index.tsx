import { useState } from "react";
import Icon from "@/components/ui/icon";

/* ─── Images ─────────────────────────────────────────── */
const HERO_IMG     = "https://cdn.poehali.dev/projects/ff76d473-8663-4c8b-bc4b-fb4239d02e4c/files/6b027b56-9c2c-411b-bb3a-5e8a2729824b.jpg";
const INTERIOR_IMG = "https://cdn.poehali.dev/projects/ff76d473-8663-4c8b-bc4b-fb4239d02e4c/files/8d437cab-f7ab-4b0e-b247-350873bd5e4f.jpg";

/* ─── Nav ─────────────────────────────────────────────── */
const NAV_LINKS = [
  { href: "#about",      label: "О компании" },
  { href: "#advantages", label: "Преимущества" },
  { href: "#models",     label: "Модели" },
  { href: "#process",    label: "Заказ" },
  { href: "#reviews",    label: "Отзывы" },
  { href: "#faq",        label: "FAQ" },
  { href: "#contacts",   label: "Контакты" },
];

/* ─── Catalog ─────────────────────────────────────────── */
const CATEGORIES = [
  {
    id: "arch", label: "Арочные",
    img: "https://cdn.poehali.dev/files/7e246f51-79ee-440a-a313-34561984b6b5.jpg",
    desc: "Классическая форма дуги обеспечивает хорошее снегосбрасывание и оптимальное освещение. Самый популярный тип теплицы.",
    models: [
      { name: "Боярская 2.5м",      size: "2.5 × 4–12 м, высота 2.1 м", price: "от 17 590 ₽", features: ["Труба 20×20 мм", "2 двери + 2 форточки", "Снег до 227 кг/м²"], popular: false },
      { name: "Боярская Люкс 3м",   size: "3 × 4–12 м, высота 2.1 м",   price: "от 17 990 ₽", features: ["Труба 40×20 мм", "Поликарбонат UV-400", "Гарантия 15 лет"],   popular: true },
      { name: "Боярская Делюкс 3м", size: "3 × 4–12 м, высота 2.1 м",   price: "от 25 990 ₽", features: ["Двойная труба", "Краб-система", "Гарантия 15 лет"],          popular: false },
      { name: "Дворцовая Люкс 3.5м",size: "3.5 × 4–12 м, высота 2.8 м", price: "от 45 990 ₽", features: ["Высота 2.8 м", "Труба 40×20 мм", "Для высокорослых культур"],popular: false },
    ],
  },
  {
    id: "straight", label: "Прямостенные",
    img: "https://cdn.poehali.dev/files/7438642f-2df7-40cd-921c-36db8e446242.jpg",
    desc: "Вертикальные стены дают максимум пространства у боковых грядок. Удобнее работать у краёв, легче подвешивать шпалеры.",
    models: [
      { name: "Царская Люкс 2.5м",   size: "2.5 × 4–12 м, высота 2.1 м", price: "от 27 990 ₽", features: ["Труба 40×20 мм", "Прямые стены", "Гарантия 15 лет"],        popular: false },
      { name: "Боярская Премиум 3м", size: "3 × 4–12 м, высота 2.1 м",   price: "от 28 990 ₽", features: ["Двойная труба", "Краб-система", "Максимум пространства"],    popular: true },
      { name: "Царская Премиум 4м",  size: "4 × 4–12 м, высота 2.8 м",   price: "от 62 990 ₽", features: ["Ширина 4 м", "Двойная труба 40×20", "Профессиональная"],     popular: false },
    ],
  },
  {
    id: "drop", label: "Каплевидные",
    img: "https://cdn.poehali.dev/files/6fa4f067-454e-455f-9e1c-5ec549f7afcb.jpg",
    desc: "Заострённый верх в форме капли — снег не задерживается вовсе. Отличная вентиляция и эстетичный вид на участке.",
    models: [
      { name: "Боярская Капля 3м",   size: "3 × 4–12 м, высота 2.1 м",   price: "от 20 990 ₽", features: ["Снег сходит сам", "Труба 20×20 мм", "Гарантия 15 лет"],     popular: false },
      { name: "Дворцовая Капля 3.5м",size: "3.5 × 4–12 м, высота 2.5 м", price: "от 38 990 ₽", features: ["Труба 40×20 мм", "Отличная вентиляция", "Эстетичный вид"], popular: true },
    ],
  },
  {
    id: "gable", label: "Двускатные",
    img: "https://cdn.poehali.dev/files/92c591ea-f4f7-4b68-99b8-e30cd38ad2c5.jpg",
    desc: "Двускатная крыша как у классического домика. Равномерный прогрев, хорошее освещение, снег легко сходит с двух сторон.",
    models: [
      { name: "Домик Люкс 3м",    size: "3 × 4–12 м, высота 2.4 м",   price: "от 32 990 ₽", features: ["Двускатная крыша", "Труба 40×20 мм", "Равномерный прогрев"], popular: true },
      { name: "Домик Премиум 3.5м",size: "3.5 × 4–12 м, высота 2.6 м", price: "от 49 990 ₽", features: ["Двойная труба", "Высота 2.6 м", "Гарантия 15 лет"],       popular: false },
    ],
  },
  {
    id: "mittlider", label: "По Миттлайдеру",
    img: "https://cdn.poehali.dev/files/f26033dd-47d8-4568-8a55-b01ad0cb49c9.jpg",
    desc: "Особая система вентиляции в коньке крыши. Идеальный микроклимат, равномерный прогрев воздуха — урожай на 20–30% выше.",
    models: [
      { name: "Миттлайдер Люкс 3.5м",   size: "3.5 × 4–12 м, высота 2.4 м", price: "от 49 990 ₽", features: ["Вентиляция в коньке", "Труба 40×20 мм", "Идеальный климат"],    popular: false },
      { name: "Миттлайдер Премиум 3м",   size: "3 × 4–12 м, высота 2.4 м",   price: "от 69 990 ₽", features: ["Двойная труба", "Равномерный прогрев", "Гарантия 15 лет"],     popular: true },
      { name: "Миттлайдер Премиум 3.5м", size: "3.5 × 4–12 м, высота 2.4 м", price: "от 60 990 ₽", features: ["Двойная труба 40×20", "Оптимальный микроклимат", "Профессиональная"], popular: false },
    ],
  },
  {
    id: "lean", label: "Пристенные",
    img: "https://cdn.poehali.dev/files/7ca5a1f1-f097-439d-b11e-d950d2b571eb.jpg",
    desc: "Крепятся к стене дома или забора. Экономят место на участке, используют тепло дома — идеальны для небольших участков.",
    models: [
      { name: "Пристенная Люкс 2.5м", size: "2.5 × 2–8 м, высота 2.5 м", price: "от 22 990 ₽", features: ["Крепление к стене", "Труба 40×20 мм", "Экономия места"], popular: false },
      { name: "Пристенная Премиум 3м",size: "3 × 2–8 м, высота 2.8 м",   price: "от 35 990 ₽", features: ["Двойная труба", "Высота 2.8 м", "Гарантия 15 лет"],     popular: true },
    ],
  },
];

/* ─── Advantages ──────────────────────────────────────── */
const ADVANTAGES = [
  { icon: "Factory",      title: "Завод-изготовитель",   desc: "Производим теплицы сами и полностью отвечаем за качество каждого изделия." },
  { icon: "BadgeCheck",   title: "Проверенное качество", desc: "Только проверенные материалы и комплектующие, прошедшие испытания временем." },
  { icon: "Layers",       title: "Оцинкованный каркас",  desc: "Труба 20×20 или 40×20 мм — не боится коррозии, служит десятилетиями." },
  { icon: "Sun",          title: "Поликарбонат UV-400",  desc: "Усиленный поликарбонат с защитой от ультрафиолета во всех моделях." },
  { icon: "Shield",       title: "Любая непогода",       desc: "Снег, град, ветер — конструкция выдерживает любые нагрузки." },
  { icon: "Award",        title: "Гарантия до 15 лет",   desc: "Все модели соответствуют строгим стандартам. Гарантия до 15 лет." },
  { icon: "Truck",        title: "Доставка за 48 ч",     desc: "По Москве и области — без предоплаты, точно в срок." },
  { icon: "Wrench",       title: "Монтаж в день доставки", desc: "Специалисты соберут теплицу прямо в день приезда." },
  { icon: "Tag",          title: "Цены без посредников", desc: "Продаём напрямую с завода — никаких наценок." },
  { icon: "PackageCheck", title: "Всегда в наличии",     desc: "Любую модель изготовим за 24 ч и доставим за 48." },
];

/* ─── Process ─────────────────────────────────────────── */
const PROCESS_STEPS = [
  { num: "01", title: "Заявка",       desc: "Оставляете форму — перезваниваем в течение часа." },
  { num: "02", title: "Консультация", desc: "Подбираем модель и размер под ваш участок и задачи." },
  { num: "03", title: "Договор",      desc: "Фиксируем стоимость и сроки — никаких скрытых доплат." },
  { num: "04", title: "Монтаж",       desc: "Мастера приедут и соберут теплицу за 1–2 дня." },
];

/* ─── Reviews ─────────────────────────────────────────── */
const REVIEWS = [
  { name: "Наталья Соколова", location: "Подмосковье", model: "Боярская Люкс 3м",        rating: 5, text: "Заказала в марте, к маю уже собрана. Ребята приехали вовремя, аккуратно, без мусора. Огурцы и томаты уже с мая!", avatar: "https://cdn.poehali.dev/projects/ff76d473-8663-4c8b-bc4b-fb4239d02e4c/files/e3347290-8720-4e06-b32f-dbee381c94b0.jpg" },
  { name: "Сергей Михайлов",  location: "Серпухов",    model: "Миттлайдер Премиум 3.5м", rating: 5, text: "Брал для зимнего выращивания зелени. Держит тепло отлично, каркас не поведло даже при −35. Рекомендую!", avatar: "https://cdn.poehali.dev/projects/ff76d473-8663-4c8b-bc4b-fb4239d02e4c/files/8f2df94f-5b9c-440c-ad46-5ea1f2f7e3ff.jpg" },
  { name: "Ирина Воронова",   location: "Дмитров",     model: "Дворцовая Люкс 3.5м",     rating: 5, text: "Менеджеры помогли выбрать нужный размер. Высота 2.8 м — мечта, работать внутри одно удовольствие!", avatar: "https://cdn.poehali.dev/projects/ff76d473-8663-4c8b-bc4b-fb4239d02e4c/files/e3d81dae-d6c7-403c-9506-2e5bb707bbfd.jpg" },
];

/* ─── FAQ ─────────────────────────────────────────────── */
const FAQS = [
  { q: "Сколько лет служит поликарбонат?",       a: "Качественный поликарбонат 4–8 мм служит 10–15 лет. Мы используем материал с УФ-защитой и даём гарантию 3–5 лет." },
  { q: "Нужен ли фундамент?",                    a: "Для большинства моделей не обязателен — достаточно анкерования в грунт. Для зимних теплиц рекомендуем брусовое или ленточное основание." },
  { q: "Можно ли заказать нестандартный размер?",a: "Да, изготавливаем по индивидуальным чертежам. Стоимость и сроки уточняются на консультации." },
  { q: "Как ухаживать за теплицей?",             a: "Раз в год промывать поликарбонат мягкой губкой с мыльным раствором, весной проверять крепления — 30 минут в год." },
  { q: "Какая снеговая нагрузка выдерживается?", a: "Стандарт — до 100 кг/м², усиленные зимние — до 180 кг/м². Достаточно для любого региона России." },
];

/* ─── Articles ────────────────────────────────────────── */
const ARTICLES = [
  "Тепличный бизнес: что выгодно выращивать в теплицах из поликарбоната",
  "Как выбрать теплицу из поликарбоната: советы от специалистов",
  "Организация правильного полива в теплице: какая вода нужна растениям",
];

const BUDGET_OPTIONS  = ["до 20 000 ₽", "20 000 – 40 000 ₽", "40 000 – 70 000 ₽", "от 70 000 ₽", "Готов рассмотреть предложение"];
const INSTALL_OPTIONS = ["Самостоятельно", "Силами компании"];

const TICKER = ["Завод-изготовитель", "Гарантия 15 лет", "Доставка 48 часов", "2 400+ клиентов", "Монтаж в день доставки", "Поликарбонат UV-400", "Цены от 17 590 ₽", "48 регионов России"];

/* ─── Types ───────────────────────────────────────────── */
type MF = { name: string; phone: string; email: string; length: string; width: string; height: string; region: string; install: string; budget: string };
const MF0: MF = { name: "", phone: "", email: "", length: "", width: "", height: "", region: "", install: "", budget: "" };

/* ═══════════════════════════════════════════════════════ */
export default function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("arch");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [modalOpen, setModalOpen]   = useState(false);
  const [modalStep, setModalStep]   = useState(1);
  const [modalDone, setModalDone]   = useState(false);
  const [mf, setMf]                 = useState<MF>(MF0);
  const [modalError, setModalError] = useState("");

  const openModal = () => { setModalOpen(true); setModalStep(1); setModalDone(false); setModalError(""); setMf(MF0); };

  const handleNext = async () => {
    setModalError("");
    if (modalStep === 1) {
      if (!mf.name.trim())  { setModalError("Введите имя");    return; }
      if (!mf.phone.trim()) { setModalError("Введите телефон");return; }
      if (!mf.email.trim()) { setModalError("Введите email");  return; }
    }
    if (modalStep < 4) { setModalStep(s => s + 1); return; }
    try {
      await fetch("https://functions.poehali.dev/f31f9d9d-e2e5-4ff5-9591-dac6cb507aa7", {
        method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(mf),
      });
    } catch (e) { console.error(e); }
    setModalDone(true);
  };

  const activeCat = CATEGORIES.find(c => c.id === activeCategory)!;

  return (
    <div className="min-h-screen bg-cream text-bark overflow-x-hidden">

      {/* ══ NAV ══════════════════════════════════════════ */}
      <header className="fixed top-0 inset-x-0 z-50" style={{ background: "hsla(42,30%,97%,0.92)", backdropFilter: "blur(14px)", borderBottom: "1px solid hsl(35,18%,85%)" }}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-[68px]">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5">
            <span className="w-7 h-7 rounded-full bg-moss flex items-center justify-center">
              <Icon name="Sprout" size={14} className="text-cream" fallback="Leaf" />
            </span>
            <span className="font-display text-xl text-bark tracking-tight">
              Солнечный контур
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map(l => (
              <a key={l.href} href={l.href} className="text-stone hover:text-moss transition-colors text-sm font-body">
                {l.label}
              </a>
            ))}
          </nav>

          {/* CTA */}
          <div className="flex items-center gap-3">
            <a href="tel:+79065170682" className="hidden md:flex items-center gap-2 text-sm text-stone hover:text-moss transition-colors">
              <Icon name="Phone" size={14} className="text-moss" fallback="Phone" />
              +7 (906) 517-06-82
            </a>
            <button onClick={openModal}
              className="bg-moss text-cream text-sm px-5 py-2.5 rounded-sm font-body hover:opacity-90 transition-opacity">
              Заказать
            </button>
            <button className="lg:hidden text-stone p-1" onClick={() => setMenuOpen(v => !v)}>
              <Icon name={menuOpen ? "X" : "Menu"} size={22} fallback="Menu" />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="lg:hidden bg-cream border-t border-sand px-6 py-5 flex flex-col gap-4">
            {NAV_LINKS.map(l => (
              <a key={l.href} href={l.href} className="text-earth text-sm py-1 font-body" onClick={() => setMenuOpen(false)}>
                {l.label}
              </a>
            ))}
          </div>
        )}
      </header>

      {/* ══ HERO ═════════════════════════════════════════ */}
      <section className="relative min-h-screen flex flex-col justify-end pt-[68px] overflow-hidden">
        {/* Full-bleed image */}
        <div className="absolute inset-0">
          <img src={HERO_IMG} alt="Теплица" className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{
            background: "linear-gradient(to top, hsla(25,20%,10%,0.82) 0%, hsla(25,20%,10%,0.45) 55%, hsla(25,20%,10%,0.1) 100%)"
          }} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-24 w-full">
          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-6 anim-up delay-1">
            <span className="divider" style={{ background: "hsl(138,38%,60%)" }} />
            <span className="text-xs font-body tracking-widest uppercase" style={{ color: "hsl(138,38%,70%)" }}>
              Производитель теплиц · Москва и область
            </span>
          </div>

          {/* Heading */}
          <h1 className="font-display text-cream leading-none mb-6 anim-up delay-2"
            style={{ fontSize: "clamp(3.2rem, 8.5vw, 7.5rem)", fontWeight: 300 }}>
            Теплицы из<br />
            <em className="not-italic" style={{ color: "hsl(138,38%,60%)" }}>поликарбоната</em><br />
            от завода
          </h1>

          <p className="text-base font-body mb-10 max-w-lg leading-relaxed anim-up delay-3"
            style={{ color: "hsla(42,30%,97%,0.75)" }}>
            Доставка за 48 часов, монтаж в день доставки, гарантия до 15 лет. Без посредников — напрямую с производства.
          </p>

          <div className="flex flex-wrap gap-3 anim-up delay-4">
            <button onClick={openModal}
              className="bg-moss text-cream px-8 py-4 rounded-sm font-body text-sm hover:opacity-90 transition-opacity">
              Выбрать теплицу
            </button>
            <a href="#models"
              className="border border-cream/40 text-cream px-8 py-4 rounded-sm font-body text-sm hover:border-cream/80 transition-colors">
              Смотреть модели
            </a>
          </div>

          {/* Stats row */}
          <div className="flex flex-wrap gap-px mt-16 anim-up delay-4">
            {[["2 400+", "клиентов"], ["48 ч", "доставка"], ["15 лет", "гарантия"], ["1 день", "монтаж"]].map(([val, lbl]) => (
              <div key={lbl} className="flex flex-col px-7 py-5 first:pl-0"
                style={{ borderRight: "1px solid hsla(42,30%,97%,0.15)" }}>
                <span className="font-display text-3xl text-cream" style={{ fontWeight: 300 }}>{val}</span>
                <span className="text-xs font-body mt-1 tracking-widest uppercase" style={{ color: "hsla(42,30%,97%,0.5)" }}>{lbl}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ TICKER ═══════════════════════════════════════ */}
      <div className="bg-moss py-3.5 overflow-hidden">
        <div className="flex anim-marq whitespace-nowrap" style={{ width: "max-content" }}>
          {[...TICKER, ...TICKER].map((item, i) => (
            <span key={i} className="inline-flex items-center gap-5 px-6 text-xs font-body text-cream/80 tracking-widest uppercase">
              {item}
              <span className="text-leaf text-lg opacity-60">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* ══ ABOUT ════════════════════════════════════════ */}
      <section id="about" className="py-28 bg-cream">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left */}
            <div>
              <span className="label mb-4 block">О компании</span>
              <h2 className="font-display text-bark mb-6 leading-tight"
                style={{ fontSize: "clamp(2rem,4vw,3.4rem)", fontWeight: 300 }}>
                Строим теплицы, которые работают десятилетиями
              </h2>
              <p className="text-stone font-body text-sm leading-relaxed mb-8 max-w-lg">
                Мы — завод полного цикла. Разрабатываем, производим и устанавливаем теплицы из поликарбоната по всей России. Без посредников, без скрытых доплат — только качество и честная цена.
              </p>

              {/* Grid stats */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  ["2 400+", "проектов завершено"],
                  ["48",     "регионов России"],
                  ["15 лет", "максимальная гарантия"],
                  ["24 ч",   "изготовление модели"],
                ].map(([val, lbl]) => (
                  <div key={lbl} className="bg-parchment rounded-sm px-6 py-5 border border-sand">
                    <span className="font-display text-3xl text-moss block mb-1" style={{ fontWeight: 300 }}>{val}</span>
                    <span className="text-xs font-body text-stone">{lbl}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — image with badge */}
            <div className="relative rounded-sm overflow-hidden">
              <img src={INTERIOR_IMG} alt="Внутри теплицы" className="w-full h-[500px] object-cover" />
              {/* Badge */}
              <div className="absolute bottom-6 left-6 bg-moss text-cream rounded-sm px-6 py-4">
                <p className="font-display text-2xl" style={{ fontWeight: 300 }}>1 день</p>
                <p className="text-xs font-body opacity-80 mt-0.5 tracking-wide">монтаж под ключ</p>
              </div>
              {/* Decorative corner */}
              <div className="absolute top-4 right-4 w-10 h-10 border-2 border-cream/30 rounded-sm" />
            </div>
          </div>
        </div>
      </section>

      {/* ══ ADVANTAGES ═══════════════════════════════════ */}
      <section id="advantages" className="py-28 bg-parchment">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
            <div>
              <span className="label mb-3 block">Почему выбирают нас</span>
              <h2 className="font-display text-bark" style={{ fontSize: "clamp(2rem,4vw,3.4rem)", fontWeight: 300 }}>
                Наши преимущества
              </h2>
            </div>
            <p className="text-stone text-sm font-body max-w-xs leading-relaxed sm:text-right">
              Прямой производитель — экономия для вас, контроль качества для нас
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {ADVANTAGES.map((adv, i) => (
              <div key={adv.title}
                className={`bg-cream border border-sand rounded-sm p-6 group hover:border-moss transition-colors ${i === 0 ? "lg:col-span-2" : ""}`}>
                <div className="w-10 h-10 rounded-sm bg-parchment flex items-center justify-center mb-4 group-hover:bg-moss transition-colors">
                  <Icon name={adv.icon} size={18} className="text-moss group-hover:text-cream transition-colors" fallback="Leaf" />
                </div>
                <h3 className="font-body font-semibold text-bark text-sm mb-2">{adv.title}</h3>
                <p className="text-stone text-xs font-body leading-relaxed">{adv.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ MODELS ═══════════════════════════════════════ */}
      <section id="models" className="py-28 bg-cream">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-10">
            <span className="label mb-3 block">Каталог</span>
            <h2 className="font-display text-bark mb-2" style={{ fontSize: "clamp(2rem,4vw,3.4rem)", fontWeight: 300 }}>
              Модели теплиц
            </h2>
            <p className="text-stone text-sm font-body">Стандартные размеры — в наличии. Нестандартные — под заказ.</p>
          </div>

          {/* Category tabs */}
          <div className="flex flex-wrap gap-2 mb-8">
            {CATEGORIES.map(cat => (
              <button key={cat.id} onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 text-xs font-body rounded-sm border transition-all ${
                  activeCategory === cat.id
                    ? "bg-moss text-cream border-moss"
                    : "bg-cream text-stone border-sand hover:border-moss hover:text-moss"
                }`}>
                {cat.label}
              </button>
            ))}
          </div>

          {/* Category header */}
          <div className="grid lg:grid-cols-5 gap-0 border border-sand rounded-sm overflow-hidden mb-4">
            <div className="lg:col-span-2 relative min-h-[220px]">
              <img src={activeCat.img} alt={activeCat.label} className="absolute inset-0 w-full h-full object-cover" />
            </div>
            <div className="lg:col-span-3 p-8 bg-parchment border-t lg:border-t-0 lg:border-l border-sand flex flex-col justify-center">
              <h3 className="font-display text-2xl text-bark mb-3" style={{ fontWeight: 300 }}>{activeCat.label}</h3>
              <p className="text-stone text-sm font-body leading-relaxed">{activeCat.desc}</p>
            </div>
          </div>

          {/* Model cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {activeCat.models.map(m => (
              <div key={m.name}
                className={`relative flex flex-col border rounded-sm p-6 transition-colors ${
                  m.popular ? "bg-moss border-moss" : "bg-cream border-sand hover:border-moss"
                }`}>
                {m.popular && (
                  <span className="absolute top-3 right-3 bg-cream text-moss text-[10px] font-body px-2 py-0.5 rounded-sm tracking-wide">
                    Хит продаж
                  </span>
                )}
                <h3 className={`font-body font-semibold text-sm mb-1 ${m.popular ? "text-cream" : "text-bark"}`}>
                  {m.name}
                </h3>
                <p className={`text-xs font-body mb-5 ${m.popular ? "text-cream/70" : "text-stone"}`}>{m.size}</p>
                <ul className="space-y-2 mb-6 flex-1">
                  {m.features.map(f => (
                    <li key={f} className={`flex items-center gap-2 text-xs font-body ${m.popular ? "text-cream/80" : "text-stone"}`}>
                      <Icon name="Check" size={11} className={m.popular ? "text-leaf" : "text-moss"} fallback="Check" />
                      {f}
                    </li>
                  ))}
                </ul>
                <div className={`pt-4 border-t flex items-center justify-between ${m.popular ? "border-cream/20" : "border-sand"}`}>
                  <span className={`font-display text-xl ${m.popular ? "text-cream" : "text-bark"}`} style={{ fontWeight: 300 }}>
                    {m.price}
                  </span>
                  <button onClick={openModal}
                    className={`text-xs px-4 py-2 rounded-sm border font-body transition-all ${
                      m.popular
                        ? "border-cream text-cream hover:bg-cream hover:text-moss"
                        : "border-moss text-moss hover:bg-moss hover:text-cream"
                    }`}>
                    Заказать
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ PROCESS ══════════════════════════════════════ */}
      <section id="process" className="py-28 bg-bark text-cream">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-14">
            <span className="text-leaf text-xs font-body tracking-widest uppercase block mb-3">Как это работает</span>
            <h2 className="font-display text-cream" style={{ fontSize: "clamp(2rem,4vw,3.4rem)", fontWeight: 300 }}>
              Процесс заказа
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-cream/10 rounded-sm overflow-hidden">
            {PROCESS_STEPS.map((s, i) => (
              <div key={s.num} className="bg-bark p-8 relative group hover:bg-earth transition-colors">
                <span className="font-display text-6xl text-moss/20 group-hover:text-moss/40 transition-colors leading-none block mb-6"
                  style={{ fontWeight: 300 }}>
                  {s.num}
                </span>
                <h3 className="font-body font-semibold text-cream text-sm mb-2">{s.title}</h3>
                <p className="text-cream/50 text-xs font-body leading-relaxed">{s.desc}</p>
                {i < PROCESS_STEPS.length - 1 && (
                  <Icon name="ChevronRight" size={14} className="hidden lg:block absolute top-8 -right-3 text-cream/20 z-10" fallback="ChevronRight" />
                )}
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 border border-cream/10 rounded-sm p-8">
            <div>
              <p className="font-body text-cream text-sm font-semibold mb-1">Готовы начать?</p>
              <p className="text-cream/50 text-xs font-body">Оставьте заявку — перезвоним за 1 час</p>
            </div>
            <button onClick={openModal}
              className="bg-moss text-cream px-8 py-3.5 rounded-sm font-body text-sm hover:opacity-90 transition-opacity whitespace-nowrap">
              Оставить заявку
            </button>
          </div>
        </div>
      </section>

      {/* ══ REVIEWS ══════════════════════════════════════ */}
      <section id="reviews" className="py-28 bg-parchment">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
            <div>
              <span className="label mb-3 block">Отзывы</span>
              <h2 className="font-display text-bark" style={{ fontSize: "clamp(2rem,4vw,3.4rem)", fontWeight: 300 }}>
                Что говорят клиенты
              </h2>
            </div>
            <div className="flex items-center gap-1.5">
              {[1,2,3,4,5].map(s => <Icon key={s} name="Star" size={14} className="text-terra" fallback="Star" />)}
              <span className="text-stone text-xs font-body ml-2">4.9 / 5 · 2 400+ оценок</span>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {REVIEWS.map((r, i) => (
              <div key={r.name}
                className={`flex flex-col rounded-sm p-7 border ${i === 1 ? "bg-moss border-moss" : "bg-cream border-sand"}`}>
                {/* Stars */}
                <div className="flex gap-1 mb-5">
                  {Array.from({ length: r.rating }).map((_, j) => (
                    <Icon key={j} name="Star" size={12} className={i === 1 ? "text-leaf" : "text-terra"} fallback="Star" />
                  ))}
                </div>
                <p className={`text-sm font-body leading-relaxed flex-1 mb-6 ${i === 1 ? "text-cream/90" : "text-earth"}`}>
                  «{r.text}»
                </p>
                <div className={`flex items-center gap-3 pt-5 border-t ${i === 1 ? "border-cream/20" : "border-sand"}`}>
                  <img src={r.avatar} alt={r.name} className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <p className={`font-body font-semibold text-sm ${i === 1 ? "text-cream" : "text-bark"}`}>{r.name}</p>
                    <p className={`text-xs font-body ${i === 1 ? "text-leaf" : "text-moss"}`}>{r.location} · {r.model}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ FAQ ══════════════════════════════════════════ */}
      <section id="faq" className="py-28 bg-cream">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-5 gap-16 items-start">
          {/* Left */}
          <div className="lg:col-span-2">
            <span className="label mb-3 block">Вопросы</span>
            <h2 className="font-display text-bark mb-5" style={{ fontSize: "clamp(2rem,3.5vw,2.8rem)", fontWeight: 300 }}>
              Часто спрашивают
            </h2>
            <p className="text-stone text-sm font-body leading-relaxed mb-8">
              Не нашли ответа? Позвоните или оставьте заявку — ответим бесплатно.
            </p>
            <button onClick={openModal}
              className="border border-moss text-moss px-6 py-3 rounded-sm text-sm font-body hover:bg-moss hover:text-cream transition-all">
              Задать вопрос
            </button>
          </div>

          {/* Right */}
          <div className="lg:col-span-3 divide-y divide-sand">
            {FAQS.map((faq, i) => (
              <div key={i}>
                <button
                  className="w-full flex items-start justify-between py-5 text-left gap-4"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <span className="font-body font-medium text-bark text-sm leading-snug">{faq.q}</span>
                  <span className={`w-6 h-6 rounded-sm flex items-center justify-center flex-shrink-0 transition-colors mt-0.5 ${
                    openFaq === i ? "bg-moss" : "bg-parchment"
                  }`}>
                    <Icon name={openFaq === i ? "Minus" : "Plus"} size={12}
                      className={openFaq === i ? "text-cream" : "text-stone"} fallback="Plus" />
                  </span>
                </button>
                {openFaq === i && (
                  <p className="text-stone text-sm font-body leading-relaxed pb-5 anim-in">{faq.a}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CONTACTS ═════════════════════════════════════ */}
      <section id="contacts" className="py-28 bg-parchment">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-0 border border-sand rounded-sm overflow-hidden">
            {/* Left */}
            <div className="p-10 lg:p-14">
              <span className="label mb-4 block">Контакты</span>
              <h2 className="font-display text-bark mb-5 leading-tight"
                style={{ fontSize: "clamp(1.8rem,3.5vw,2.8rem)", fontWeight: 300 }}>
                Оставьте заявку —<br />перезвоним за час
              </h2>
              <p className="text-stone text-sm font-body leading-relaxed mb-10 max-w-sm">
                Подберём модель, рассчитаем стоимость, ответим на все вопросы. Бесплатно, без обязательств.
              </p>

              <div className="space-y-4 mb-10">
                <a href="tel:+79065170682" className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-sm bg-moss/10 group-hover:bg-moss flex items-center justify-center transition-colors">
                    <Icon name="Phone" size={16} className="text-moss group-hover:text-cream transition-colors" fallback="Phone" />
                  </div>
                  <div>
                    <p className="font-body font-semibold text-bark text-sm group-hover:text-moss transition-colors">+7 (906) 517-06-82</p>
                    <p className="text-stone text-xs font-body">Бесплатно по России</p>
                  </div>
                </a>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-sm bg-moss/10 flex items-center justify-center">
                    <Icon name="MapPin" size={16} className="text-moss" fallback="MapPin" />
                  </div>
                  <div>
                    <p className="font-body font-semibold text-bark text-sm">Москва и Московская область</p>
                    <p className="text-stone text-xs font-body">Выезжаем к вам</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button onClick={openModal}
                  className="flex-1 bg-moss text-cream py-3.5 px-6 rounded-sm font-body text-sm hover:opacity-90 transition-opacity">
                  Оставить заявку
                </button>
                <button onClick={openModal}
                  className="flex-1 border border-sand text-stone py-3.5 px-6 rounded-sm font-body text-sm hover:border-moss hover:text-moss transition-all">
                  Получить статьи
                </button>
              </div>
            </div>

            {/* Right — articles */}
            <div className="p-10 lg:p-14 bg-cream border-t lg:border-t-0 lg:border-l border-sand">
              <p className="text-stone text-xs font-body tracking-widest uppercase mb-8">3 авторские статьи в подарок</p>
              <div className="space-y-0 divide-y divide-sand">
                {ARTICLES.map((a, i) => (
                  <div key={i} className="flex items-start gap-5 py-6">
                    <span className="font-display text-4xl text-moss/20 leading-none flex-shrink-0"
                      style={{ fontWeight: 300 }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <p className="text-bark text-sm font-body leading-snug mb-2">{a}</p>
                      <span className="text-xs font-body text-moss">Читать →</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ FOOTER ═══════════════════════════════════════ */}
      <footer className="bg-bark text-cream/60 border-t border-cream/10">
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-display text-xl text-cream">Солнечный контур</span>
          <div className="flex flex-wrap justify-center gap-6">
            {NAV_LINKS.slice(0, 5).map(l => (
              <a key={l.href} href={l.href} className="text-xs font-body text-cream/50 hover:text-cream transition-colors">
                {l.label}
              </a>
            ))}
          </div>
          <p className="text-xs font-body text-cream/30">© 2024 Все права защищены</p>
        </div>
      </footer>

      {/* ══ MODAL ════════════════════════════════════════ */}
      {modalOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-bark/60 backdrop-blur-sm" onClick={() => setModalOpen(false)} />
          <div className="relative bg-cream rounded-sm w-full max-w-md shadow-2xl overflow-hidden anim-up">
            {/* Progress */}
            {!modalDone && (
              <div className="h-0.5 bg-sand">
                <div className="h-0.5 bg-moss transition-all duration-500" style={{ width: `${(modalStep / 4) * 100}%` }} />
              </div>
            )}

            {/* Close */}
            <button onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-sm bg-parchment flex items-center justify-center hover:bg-sand transition-colors">
              <Icon name="X" size={14} className="text-stone" fallback="X" />
            </button>

            {modalDone ? (
              <div className="p-10 text-center">
                <div className="w-16 h-16 rounded-full bg-moss/10 flex items-center justify-center mx-auto mb-5">
                  <Icon name="CheckCircle" size={32} className="text-moss" fallback="Check" />
                </div>
                <h3 className="font-display text-2xl text-bark mb-2" style={{ fontWeight: 300 }}>Заявка принята!</h3>
                <p className="text-stone text-sm font-body">Перезвоним в течение часа. Статьи отправим на email.</p>
              </div>
            ) : (
              <div className="p-8">
                <div className="flex items-center gap-2 mb-6">
                  <span className="text-moss text-xs font-body tracking-wide">Шаг {modalStep} из 4</span>
                  <span className="text-sand text-xs">·</span>
                  <span className="text-stone text-xs font-body">
                    {["Контакты", "Размеры", "Регион и монтаж", "Бюджет"][modalStep - 1]}
                  </span>
                </div>

                {/* Step 1 */}
                {modalStep === 1 && (
                  <>
                    <h3 className="font-display text-2xl text-bark mb-1" style={{ fontWeight: 300 }}>
                      Ответьте на 4 вопроса
                    </h3>
                    <p className="text-stone text-sm font-body mb-6">и получите 3 авторские статьи бесплатно</p>
                    <div className="bg-parchment border border-sand rounded-sm p-4 mb-6 space-y-2">
                      {ARTICLES.map((a, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <Icon name="FileText" size={12} className="text-moss flex-shrink-0 mt-0.5" fallback="FileText" />
                          <span className="text-xs font-body text-stone leading-snug">{a}</span>
                        </div>
                      ))}
                    </div>
                    <div className="space-y-3">
                      {[
                        { label: "Имя *",     key: "name"  as const, type: "text",  ph: "Иван Петров" },
                        { label: "Телефон *", key: "phone" as const, type: "tel",   ph: "+7 (___) ___-__-__" },
                        { label: "Email *",   key: "email" as const, type: "email", ph: "ivan@mail.ru" },
                      ].map(({ label, key, type, ph }) => (
                        <div key={key}>
                          <label className="block text-xs font-body text-stone mb-1.5">{label}</label>
                          <input type={type} placeholder={ph} value={mf[key]}
                            onChange={e => setMf({ ...mf, [key]: e.target.value })}
                            className="w-full bg-parchment border border-sand rounded-sm px-4 py-3 text-sm font-body text-bark placeholder:text-stone/40 focus:outline-none focus:border-moss transition-colors" />
                        </div>
                      ))}
                    </div>
                  </>
                )}

                {/* Step 2 */}
                {modalStep === 2 && (
                  <>
                    <h3 className="font-display text-2xl text-bark mb-1" style={{ fontWeight: 300 }}>Размеры теплицы</h3>
                    <p className="text-stone text-sm font-body mb-6">Укажите желаемые габариты или оставьте пустым</p>
                    <div className="space-y-3">
                      {[
                        { label: "Длина (м)", key: "length" as const, ph: "например, 6" },
                        { label: "Ширина (м)",key: "width"  as const, ph: "например, 3" },
                        { label: "Высота (м)",key: "height" as const, ph: "например, 2.1" },
                      ].map(({ label, key, ph }) => (
                        <div key={key}>
                          <label className="block text-xs font-body text-stone mb-1.5">{label}</label>
                          <input type="text" placeholder={ph} value={mf[key]}
                            onChange={e => setMf({ ...mf, [key]: e.target.value })}
                            className="w-full bg-parchment border border-sand rounded-sm px-4 py-3 text-sm font-body text-bark placeholder:text-stone/40 focus:outline-none focus:border-moss transition-colors" />
                        </div>
                      ))}
                    </div>
                  </>
                )}

                {/* Step 3 */}
                {modalStep === 3 && (
                  <>
                    <h3 className="font-display text-2xl text-bark mb-1" style={{ fontWeight: 300 }}>Регион и монтаж</h3>
                    <p className="text-stone text-sm font-body mb-6">Куда доставить и нужен ли монтаж?</p>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-body text-stone mb-1.5">Регион / город</label>
                        <input type="text" placeholder="например, Москва" value={mf.region}
                          onChange={e => setMf({ ...mf, region: e.target.value })}
                          className="w-full bg-parchment border border-sand rounded-sm px-4 py-3 text-sm font-body text-bark placeholder:text-stone/40 focus:outline-none focus:border-moss transition-colors" />
                      </div>
                      <div>
                        <label className="block text-xs font-body text-stone mb-2">Установка</label>
                        <div className="grid grid-cols-2 gap-2">
                          {INSTALL_OPTIONS.map(opt => (
                            <button key={opt} type="button" onClick={() => setMf({ ...mf, install: opt })}
                              className={`py-3 px-4 rounded-sm border text-sm font-body transition-all ${
                                mf.install === opt
                                  ? "border-moss bg-moss text-cream"
                                  : "border-sand bg-parchment text-stone hover:border-moss"
                              }`}>
                              {opt}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {/* Step 4 */}
                {modalStep === 4 && (
                  <>
                    <h3 className="font-display text-2xl text-bark mb-1" style={{ fontWeight: 300 }}>Бюджет</h3>
                    <p className="text-stone text-sm font-body mb-6">Выберите удобный диапазон</p>
                    <div className="space-y-2">
                      {BUDGET_OPTIONS.map(opt => (
                        <button key={opt} type="button" onClick={() => setMf({ ...mf, budget: opt })}
                          className={`w-full py-3 px-4 rounded-sm border text-sm font-body text-left flex items-center justify-between transition-all ${
                            mf.budget === opt
                              ? "border-moss bg-moss text-cream"
                              : "border-sand bg-parchment text-stone hover:border-moss"
                          }`}>
                          {opt}
                          {mf.budget === opt && <Icon name="Check" size={14} className="text-cream" fallback="Check" />}
                        </button>
                      ))}
                    </div>
                  </>
                )}

                {modalError && (
                  <p className="mt-4 text-xs font-body text-terra bg-terra/10 border border-terra/30 rounded-sm px-4 py-2">
                    {modalError}
                  </p>
                )}

                <div className="flex gap-2 mt-6">
                  {modalStep > 1 && (
                    <button onClick={() => { setModalStep(s => s - 1); setModalError(""); }}
                      className="flex-1 border border-sand text-stone py-3 rounded-sm font-body text-sm hover:border-moss hover:text-moss transition-all">
                      Назад
                    </button>
                  )}
                  <button onClick={handleNext}
                    className="flex-1 bg-moss text-cream py-3 rounded-sm font-body text-sm hover:opacity-90 transition-opacity">
                    {modalStep < 4 ? "Далее" : "Отправить"}
                  </button>
                </div>
                <p className="text-center text-[10px] text-stone/50 font-body mt-4">
                  Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}