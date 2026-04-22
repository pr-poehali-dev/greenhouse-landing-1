import { useState, useRef } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMG = "https://cdn.poehali.dev/projects/ff76d473-8663-4c8b-bc4b-fb4239d02e4c/files/6b027b56-9c2c-411b-bb3a-5e8a2729824b.jpg";
const INTERIOR_IMG = "https://cdn.poehali.dev/projects/ff76d473-8663-4c8b-bc4b-fb4239d02e4c/files/8d437cab-f7ab-4b0e-b247-350873bd5e4f.jpg";

const NAV_LINKS = [
  { href: "#about", label: "О компании" },
  { href: "#advantages", label: "Преимущества" },
  { href: "#models", label: "Модели" },
  { href: "#process", label: "Заказ" },
  { href: "#reviews", label: "Отзывы" },
  { href: "#faq", label: "FAQ" },
  { href: "#contacts", label: "Контакты" },
];

const CATEGORIES = [
  {
    id: "arch", label: "Арочные",
    img: "https://cdn.poehali.dev/files/7e246f51-79ee-440a-a313-34561984b6b5.jpg",
    desc: "Классическая форма дуги обеспечивает хорошее снегосбрасывание и оптимальное освещение. Самый популярный тип теплицы.",
    models: [
      { name: "Боярская 2.5м", size: "2.5 × 4–12 м, высота 2.1 м", price: "от 17 590 ₽", features: ["Труба 20×20 мм", "2 двери + 2 форточки", "Снег до 227 кг/м²"], popular: false },
      { name: "Боярская Люкс 3м", size: "3 × 4–12 м, высота 2.1 м", price: "от 17 990 ₽", features: ["Труба 40×20 мм", "Поликарбонат UV-400", "Гарантия 15 лет"], popular: true },
      { name: "Боярская Делюкс 3м", size: "3 × 4–12 м, высота 2.1 м", price: "от 25 990 ₽", features: ["Двойная труба", "Краб-система", "Гарантия 15 лет"], popular: false },
      { name: "Дворцовая Люкс 3.5м", size: "3.5 × 4–12 м, высота 2.8 м", price: "от 45 990 ₽", features: ["Высота 2.8 м", "Труба 40×20 мм", "Для высокорослых культур"], popular: false },
    ],
  },
  {
    id: "straight", label: "Прямостенные",
    img: "https://cdn.poehali.dev/files/7438642f-2df7-40cd-921c-36db8e446242.jpg",
    desc: "Вертикальные стены дают максимум пространства у боковых грядок. Удобнее работать у краёв, легче подвешивать шпалеры.",
    models: [
      { name: "Царская Люкс 2.5м", size: "2.5 × 4–12 м, высота 2.1 м", price: "от 27 990 ₽", features: ["Труба 40×20 мм", "Прямые стены", "Гарантия 15 лет"], popular: false },
      { name: "Боярская Премиум 3м", size: "3 × 4–12 м, высота 2.1 м", price: "от 28 990 ₽", features: ["Двойная труба", "Краб-система", "Максимум пространства"], popular: true },
      { name: "Царская Премиум 4м", size: "4 × 4–12 м, высота 2.8 м", price: "от 62 990 ₽", features: ["Ширина 4 м", "Двойная труба 40×20", "Профессиональная"], popular: false },
    ],
  },
  {
    id: "drop", label: "Каплевидные",
    img: "https://cdn.poehali.dev/files/6fa4f067-454e-455f-9e1c-5ec549f7afcb.jpg",
    desc: "Заострённый верх в форме капли — снег не задерживается вовсе. Отличная вентиляция и эстетичный вид на участке.",
    models: [
      { name: "Боярская Капля 3м", size: "3 × 4–12 м, высота 2.1 м", price: "от 20 990 ₽", features: ["Снег сходит сам", "Труба 20×20 мм", "Гарантия 15 лет"], popular: false },
      { name: "Дворцовая Капля 3.5м", size: "3.5 × 4–12 м, высота 2.5 м", price: "от 38 990 ₽", features: ["Труба 40×20 мм", "Отличная вентиляция", "Эстетичный вид"], popular: true },
    ],
  },
  {
    id: "gable", label: "Двускатные",
    img: "https://cdn.poehali.dev/files/92c591ea-f4f7-4b68-99b8-e30cd38ad2c5.jpg",
    desc: "Двускатная крыша как у классического домика. Равномерный прогрев, хорошее освещение, снег легко сходит с двух сторон.",
    models: [
      { name: "Домик Люкс 3м", size: "3 × 4–12 м, высота 2.4 м", price: "от 32 990 ₽", features: ["Двускатная крыша", "Труба 40×20 мм", "Равномерный прогрев"], popular: true },
      { name: "Домик Премиум 3.5м", size: "3.5 × 4–12 м, высота 2.6 м", price: "от 49 990 ₽", features: ["Двойная труба", "Высота 2.6 м", "Гарантия 15 лет"], popular: false },
    ],
  },
  {
    id: "mittlider", label: "По Миттлайдеру",
    img: "https://cdn.poehali.dev/files/f26033dd-47d8-4568-8a55-b01ad0cb49c9.jpg",
    desc: "Особая система вентиляции в коньке крыши. Идеальный микроклимат, равномерный прогрев воздуха — урожай на 20–30% выше.",
    models: [
      { name: "Миттлайдер Люкс 3.5м", size: "3.5 × 4–12 м, высота 2.4 м", price: "от 49 990 ₽", features: ["Вентиляция в коньке", "Труба 40×20 мм", "Идеальный климат"], popular: false },
      { name: "Миттлайдер Премиум 3м", size: "3 × 4–12 м, высота 2.4 м", price: "от 69 990 ₽", features: ["Двойная труба", "Равномерный прогрев", "Гарантия 15 лет"], popular: true },
      { name: "Миттлайдер Премиум 3.5м", size: "3.5 × 4–12 м, высота 2.4 м", price: "от 60 990 ₽", features: ["Двойная труба 40×20", "Оптимальный микроклимат", "Профессиональная"], popular: false },
    ],
  },
  {
    id: "lean", label: "Пристенные",
    img: "https://cdn.poehali.dev/files/7ca5a1f1-f097-439d-b11e-d950d2b571eb.jpg",
    desc: "Крепятся к стене дома или забора. Экономят место на участке, используют тепло дома — идеальны для небольших участков.",
    models: [
      { name: "Пристенная Люкс 2.5м", size: "2.5 × 2–8 м, высота 2.5 м", price: "от 22 990 ₽", features: ["Крепление к стене", "Труба 40×20 мм", "Экономия места"], popular: false },
      { name: "Пристенная Премиум 3м", size: "3 × 2–8 м, высота 2.8 м", price: "от 35 990 ₽", features: ["Двойная труба", "Высота 2.8 м", "Гарантия 15 лет"], popular: true },
    ],
  },
];

const ADVANTAGES = [
  { icon: "Factory", title: "Завод-изготовитель", desc: "Производим теплицы сами и несём полную ответственность за качество." },
  { icon: "BadgeCheck", title: "Проверенное качество", desc: "Используем только проверенные материалы и комплектующие." },
  { icon: "Layers", title: "Оцинкованный каркас", desc: "Стальная труба 20×20 или 40×20 мм — не боится коррозии." },
  { icon: "Sun", title: "Поликарбонат UV-400", desc: "Усиленный поликарбонат с защитой от ультрафиолета." },
  { icon: "Shield", title: "Надёжная конструкция", desc: "Выдерживает снег, град, ветер и любую непогоду." },
  { icon: "Award", title: "Гарантия до 15 лет", desc: "Все модели соответствуют строгим стандартам качества." },
  { icon: "Truck", title: "Доставка за 48 часов", desc: "По Москве и области — без предоплаты, точно в срок." },
  { icon: "Wrench", title: "Сборка в день доставки", desc: "Специалисты соберут теплицу на вашем участке в тот же день." },
  { icon: "Tag", title: "Низкие цены", desc: "Продаём напрямую — никаких посредников и наценок." },
  { icon: "PackageCheck", title: "Всегда в наличии", desc: "Любую модель изготовим за 24 часа и доставим за 48." },
];

const PROCESS_STEPS = [
  { num: "01", title: "Заявка", desc: "Оставляете форму — мы перезваниваем в течение часа." },
  { num: "02", title: "Консультация", desc: "Подбираем модель и размеры под ваш участок и задачи." },
  { num: "03", title: "Договор", desc: "Фиксируем стоимость и сроки — никаких скрытых доплат." },
  { num: "04", title: "Монтаж", desc: "Мастера приедут в удобное время и соберут теплицу за 1–2 дня." },
];

const REVIEWS = [
  { name: "Наталья Соколова", location: "Подмосковье", model: "Боярская Люкс 3м", text: "Заказала теплицу в марте, к маю уже была собрана. Ребята приехали вовремя, собрали за один день — аккуратно, без мусора. Огурцы и томаты уже с мая!", rating: 5, avatar: "https://cdn.poehali.dev/projects/ff76d473-8663-4c8b-bc4b-fb4239d02e4c/files/e3347290-8720-4e06-b32f-dbee381c94b0.jpg" },
  { name: "Сергей Михайлов", location: "Серпухов", model: "Миттлайдер Премиум 3.5м", text: "Брал для зимнего выращивания зелени. Теплица держит тепло отлично, каркас не поведло даже при −35. Двойная труба — это реально чувствуется.", rating: 5, avatar: "https://cdn.poehali.dev/projects/ff76d473-8663-4c8b-bc4b-fb4239d02e4c/files/8f2df94f-5b9c-440c-ad46-5ea1f2f7e3ff.jpg" },
  { name: "Ирина Воронова", location: "Дмитров", model: "Дворцовая Люкс 3.5м", text: "Очень внимательные менеджеры, помогли выбрать нужный размер. Высота 2.8 м — это просто мечта, работать внутри одно удовольствие.", rating: 5, avatar: "https://cdn.poehali.dev/projects/ff76d473-8663-4c8b-bc4b-fb4239d02e4c/files/e3d81dae-d6c7-403c-9506-2e5bb707bbfd.jpg" },
];

const FAQS = [
  { q: "Сколько лет служит поликарбонат?", a: "Качественный сотовый поликарбонат толщиной 4–8 мм служит 10–15 лет. Мы используем материал с УФ-защитой и даём гарантию 3–5 лет." },
  { q: "Нужен ли фундамент под теплицу?", a: "Для большинства моделей фундамент не обязателен — достаточно анкерования в грунт. Для зимних теплиц рекомендуем брусовое или ленточное основание." },
  { q: "Можно ли заказать нестандартный размер?", a: "Да, изготавливаем теплицы по индивидуальным чертежам. Стоимость и сроки уточняются на консультации." },
  { q: "Как ухаживать за теплицей?", a: "Раз в год промывать поликарбонат мягкой губкой с мыльным раствором, весной проверять крепления. Уход занимает 30 минут." },
  { q: "Какая снеговая нагрузка выдерживается?", a: "Стандартные модели — до 100 кг/м², усиленные зимние — до 180 кг/м². Этого достаточно для любого региона России." },
];

const ARTICLES = [
  "Тепличный бизнес: что выгодно выращивать в теплицах из поликарбоната",
  "Как выбрать теплицу из поликарбоната: советы по покупке от специалистов",
  "Организация правильного полива в теплице: какая вода нужна растениям",
];

const BUDGET_OPTIONS = ["до 20 000 ₽", "20 000 – 40 000 ₽", "40 000 – 70 000 ₽", "от 70 000 ₽", "Готов рассмотреть предложение"];
const INSTALL_OPTIONS = ["Самостоятельно", "Силами компании"];

const MARQUEE_ITEMS = ["Завод-изготовитель", "Гарантия 15 лет", "Доставка 48 часов", "2400+ клиентов", "Монтаж в день доставки", "UV-400 поликарбонат", "Цены от 17 590 ₽", "48 регионов России"];

type ModalForm = { name: string; phone: string; email: string; length: string; width: string; height: string; region: string; install: string; budget: string; };

export default function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState("arch");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalStep, setModalStep] = useState(1);
  const [modalDone, setModalDone] = useState(false);
  const [mf, setMf] = useState<ModalForm>({ name: "", phone: "", email: "", length: "", width: "", height: "", region: "", install: "", budget: "" });
  const [modalError, setModalError] = useState("");
  const catalogRef = useRef<HTMLDivElement>(null);

  const openModal = () => { setModalOpen(true); setModalStep(1); setModalDone(false); setModalError(""); };
  const closeModal = () => setModalOpen(false);

  const handleModalNext = async () => {
    setModalError("");
    if (modalStep === 1) {
      if (!mf.name.trim()) { setModalError("Пожалуйста, введите имя"); return; }
      if (!mf.phone.trim()) { setModalError("Пожалуйста, введите телефон"); return; }
      if (!mf.email.trim()) { setModalError("Пожалуйста, введите email"); return; }
    }
    if (modalStep < 4) {
      setModalStep(modalStep + 1);
    } else {
      try {
        await fetch("https://functions.poehali.dev/f31f9d9d-e2e5-4ff5-9591-dac6cb507aa7", {
          method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(mf),
        });
      } catch (e) { console.error(e); }
      setModalDone(true);
    }
  };

  const activeCat = CATEGORIES.find((c) => c.id === activeCategory)!;

  return (
    <div className="min-h-screen bg-night font-body text-snow overflow-x-hidden">

      {/* ── NAV ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-stroke" style={{ background: "hsla(220,16%,8%,0.85)", backdropFilter: "blur(12px)" }}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
          <a href="#" className="font-display text-2xl font-semibold text-snow tracking-tight">
            Солнечный <span className="text-emerald">контур</span>
          </a>
          <div className="hidden lg:flex items-center gap-7">
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href} className="text-xs text-ghost hover:text-snow transition-colors font-body tracking-wide uppercase">
                {l.label}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <a href="tel:+79065170682" className="hidden md:flex items-center gap-2 text-xs text-ghost hover:text-snow transition-colors font-body">
              <Icon name="Phone" size={13} className="text-emerald" fallback="Phone" />
              +7 (906) 517-06-82
            </a>
            <button onClick={openModal} className="bg-emerald text-night text-xs px-5 py-2.5 font-body font-semibold hover:opacity-90 transition-opacity tracking-wide">
              ЗАКАЗАТЬ
            </button>
            <button className="lg:hidden p-2 text-ghost" onClick={() => setMenuOpen(!menuOpen)}>
              <Icon name={menuOpen ? "X" : "Menu"} size={20} />
            </button>
          </div>
        </div>
        {menuOpen && (
          <div className="lg:hidden bg-deep border-t border-stroke px-6 py-5 flex flex-col gap-4">
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href} className="text-sm text-ghost hover:text-snow py-1 tracking-wide" onClick={() => setMenuOpen(false)}>
                {l.label}
              </a>
            ))}
          </div>
        )}
      </nav>

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex flex-col justify-end pt-16 noise-overlay">
        <div className="absolute inset-0 z-0">
          <img src={HERO_IMG} alt="Теплица" className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to top, hsl(220,16%,8%) 0%, hsla(220,16%,8%,0.65) 50%, hsla(220,16%,8%,0.2) 100%)" }} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-20 w-full">
          <div className="max-w-3xl animate-fade-up">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-px bg-emerald" />
              <span className="text-emerald text-xs font-body tracking-[0.25em] uppercase">Производитель теплиц · Москва</span>
            </div>
            <h1 className="font-display font-light text-snow leading-[0.95] mb-8" style={{ fontSize: "clamp(3.5rem, 9vw, 8rem)" }}>
              Теплицы из<br />поликарбо<em className="text-emerald not-italic">ната</em>
            </h1>
            <p className="text-soft text-lg font-body leading-relaxed mb-10 max-w-xl">
              Напрямую от завода. Доставка за 48 часов, монтаж в день доставки, гарантия до 15 лет.
            </p>
            <div className="flex flex-wrap gap-3">
              <button onClick={openModal} className="bg-emerald text-night px-8 py-4 font-body font-semibold text-sm tracking-wide hover:opacity-90 transition-opacity">
                ВЫБРАТЬ ТЕПЛИЦУ
              </button>
              <a href="#models" className="border border-stroke text-soft px-8 py-4 font-body text-sm tracking-wide hover:border-emerald hover:text-snow transition-all">
                СМОТРЕТЬ МОДЕЛИ
              </a>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-0 mt-20 border border-stroke max-w-lg" style={{ background: "hsla(220,14%,11%,0.7)", backdropFilter: "blur(8px)" }}>
            {[["2 400+", "клиентов"], ["1 день", "монтаж"], ["15 лет", "гарантия"]].map(([val, lbl], i) => (
              <div key={lbl} className={`px-6 py-5 ${i < 2 ? "border-r border-stroke" : ""}`}>
                <p className="font-display text-3xl text-snow font-light">{val}</p>
                <p className="text-ghost text-xs font-body mt-1 tracking-wide">{lbl}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 z-10 pointer-events-none h-24"
          style={{ background: "linear-gradient(to top, hsl(220,16%,8%), transparent)" }} />
      </section>

      {/* ── MARQUEE TICKER ── */}
      <div className="border-y border-stroke bg-deep py-4 overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap gap-0" style={{ width: "max-content" }}>
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span key={i} className="inline-flex items-center gap-4 px-8 text-xs font-body tracking-[0.2em] uppercase text-ghost">
              {item}
              <span className="text-emerald text-base">·</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── ABOUT ── */}
      <section id="about" className="py-32 bg-night">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-0 border border-stroke">
            <div className="p-12 lg:p-16 border-b lg:border-b-0 lg:border-r border-stroke">
              <span className="tag mb-6 block">О компании</span>
              <h2 className="font-display font-light text-snow leading-tight mb-8" style={{ fontSize: "clamp(2.2rem, 4vw, 3.5rem)" }}>
                Строим теплицы,<br />которые живут долго
              </h2>
              <p className="text-ghost font-body leading-relaxed mb-10">
                Помогаем садоводам по всей России получать богатый урожай независимо от капризов погоды. Используем только проверенные материалы и комплектующие собственного производства.
              </p>
              <div className="grid grid-cols-2 gap-px bg-stroke">
                {[["2 400+", "проектов"], ["48", "регионов"], ["15 лет", "гарантия"], ["100%", "качество"]].map(([val, lbl]) => (
                  <div key={lbl} className="bg-night p-6">
                    <p className="font-display text-3xl text-emerald font-light">{val}</p>
                    <p className="text-ghost text-xs font-body mt-1 tracking-wide uppercase">{lbl}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative min-h-[400px] lg:min-h-0">
              <img src={INTERIOR_IMG} alt="Интерьер теплицы" className="w-full h-full object-cover" />
              <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, hsla(220,16%,8%,0.4) 0%, transparent 60%)" }} />
              <div className="absolute bottom-8 left-8 border border-emerald px-6 py-4" style={{ background: "hsla(220,16%,8%,0.9)" }}>
                <p className="font-display text-2xl text-snow font-light">1 день</p>
                <p className="text-emerald text-xs font-body mt-1 tracking-wide">монтаж под ключ</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── ADVANTAGES ── */}
      <section id="advantages" className="py-32 bg-deep">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16">
            <div>
              <span className="tag mb-4 block">Почему мы</span>
              <h2 className="font-display font-light text-snow" style={{ fontSize: "clamp(2.2rem, 4vw, 3.5rem)" }}>
                Наши преимущества
              </h2>
            </div>
            <p className="text-ghost font-body text-sm max-w-sm lg:text-right leading-relaxed">
              Прямой производитель без посредников — экономия для вас, контроль качества для нас.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-px bg-stroke">
            {ADVANTAGES.map((adv, i) => (
              <div key={adv.title} className={`bg-deep p-7 card-hover border border-transparent group ${i === 0 ? "lg:col-span-2" : ""}`}>
                <div className="w-9 h-9 border border-stroke flex items-center justify-center mb-5 group-hover:border-emerald transition-colors">
                  <Icon name={adv.icon} size={16} className="text-ghost group-hover:text-emerald transition-colors" fallback="Leaf" />
                </div>
                <h3 className="font-body font-semibold text-soft text-sm mb-2">{adv.title}</h3>
                <p className="text-ghost text-xs font-body leading-relaxed">{adv.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MODELS ── */}
      <section id="models" className="py-32 bg-night">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-12">
            <span className="tag mb-4 block">Каталог</span>
            <h2 className="font-display font-light text-snow mb-3" style={{ fontSize: "clamp(2.2rem, 4vw, 3.5rem)" }}>
              Модели теплиц
            </h2>
            <p className="text-ghost font-body text-sm">Стандартные размеры в наличии. Нестандартные — под заказ.</p>
          </div>

          {/* Category selector — horizontal scroll */}
          <div ref={catalogRef} className="flex gap-2 overflow-x-auto pb-4 mb-10 scrollbar-hide" style={{ scrollbarWidth: "none" }}>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex-shrink-0 px-5 py-2.5 text-xs font-body tracking-widest uppercase border transition-all ${
                  activeCategory === cat.id
                    ? "bg-emerald text-night border-emerald font-semibold"
                    : "bg-transparent text-ghost border-stroke hover:border-emerald hover:text-snow"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Active category */}
          <div>
            <div className="grid lg:grid-cols-5 gap-0 border border-stroke mb-1">
              <div className="lg:col-span-2 relative overflow-hidden min-h-[280px]">
                <img src={activeCat.img} alt={activeCat.label} className="w-full h-full object-cover absolute inset-0" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to right, hsla(220,16%,8%,0.5) 0%, transparent 60%)" }} />
                <div className="absolute bottom-6 left-6">
                  <span className="text-emerald text-xs font-body tracking-widest uppercase">{activeCat.label}</span>
                </div>
              </div>
              <div className="lg:col-span-3 p-8 lg:p-10 border-t lg:border-t-0 lg:border-l border-stroke bg-deep flex flex-col justify-center">
                <h3 className="font-display text-2xl text-snow font-light mb-3">{activeCat.label} теплицы</h3>
                <p className="text-ghost font-body text-sm leading-relaxed">{activeCat.desc}</p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-px bg-stroke">
              {activeCat.models.map((m) => (
                <div
                  key={m.name}
                  className={`flex flex-col p-7 card-hover border border-transparent relative ${m.popular ? "bg-emerald" : "bg-deep"}`}
                >
                  {m.popular && (
                    <div className="absolute top-0 right-0 bg-night px-3 py-1">
                      <span className="text-emerald text-[10px] font-body tracking-widest uppercase">Топ</span>
                    </div>
                  )}
                  <h3 className={`font-body font-semibold text-sm mb-1 ${m.popular ? "text-night" : "text-soft"}`}>{m.name}</h3>
                  <p className={`text-xs font-body mb-5 ${m.popular ? "text-night/60" : "text-ghost"}`}>{m.size}</p>
                  <ul className="space-y-2 mb-6 flex-1">
                    {m.features.map((f) => (
                      <li key={f} className={`flex items-center gap-2 text-xs font-body ${m.popular ? "text-night/70" : "text-ghost"}`}>
                        <Icon name="Check" size={11} className={m.popular ? "text-night" : "text-emerald"} fallback="Check" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <div className={`flex items-center justify-between pt-5 border-t ${m.popular ? "border-night/20" : "border-stroke"}`}>
                    <span className={`font-display text-xl font-light ${m.popular ? "text-night" : "text-snow"}`}>{m.price}</span>
                    <button
                      onClick={openModal}
                      className={`text-[10px] px-4 py-2 font-body font-semibold tracking-widest border transition-all ${
                        m.popular
                          ? "border-night text-night hover:bg-night hover:text-emerald"
                          : "border-emerald text-emerald hover:bg-emerald hover:text-night"
                      }`}
                    >
                      ЗАКАЗАТЬ
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section id="process" className="py-32 bg-deep">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <span className="tag mb-4 block">Как это работает</span>
            <h2 className="font-display font-light text-snow" style={{ fontSize: "clamp(2.2rem, 4vw, 3.5rem)" }}>
              Процесс заказа
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-stroke">
            {PROCESS_STEPS.map((s, i) => (
              <div key={s.num} className="bg-deep p-8 relative group hover:bg-surface transition-colors">
                <div className="flex items-start justify-between mb-6">
                  <span className="font-display text-5xl font-light text-emerald/20 group-hover:text-emerald/40 transition-colors leading-none">{s.num}</span>
                  {i < PROCESS_STEPS.length - 1 && (
                    <Icon name="ArrowRight" size={16} className="text-stroke hidden lg:block mt-2" fallback="ArrowRight" />
                  )}
                </div>
                <h3 className="font-body font-semibold text-soft mb-2">{s.title}</h3>
                <p className="text-ghost text-xs font-body leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-2 border-x border-b border-stroke bg-deep p-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-ghost font-body text-sm">Готовы начать? Оставьте заявку и мы перезвоним за час.</p>
            <button onClick={openModal} className="bg-emerald text-night px-8 py-3.5 font-body font-semibold text-xs tracking-widest hover:opacity-90 transition-opacity flex-shrink-0">
              ОСТАВИТЬ ЗАЯВКУ
            </button>
          </div>
        </div>
      </section>

      {/* ── REVIEWS ── */}
      <section id="reviews" className="py-32 bg-night">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row justify-between gap-6 mb-16 lg:items-end">
            <div>
              <span className="tag mb-4 block">Отзывы</span>
              <h2 className="font-display font-light text-snow" style={{ fontSize: "clamp(2.2rem, 4vw, 3.5rem)" }}>
                Что говорят клиенты
              </h2>
            </div>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((s) => (
                <Icon key={s} name="Star" size={16} className="text-amber" fallback="Star" />
              ))}
              <span className="text-ghost text-xs font-body ml-2">4.9 из 5 · 2400+ оценок</span>
            </div>
          </div>
          <div className="grid lg:grid-cols-3 gap-px bg-stroke">
            {REVIEWS.map((r, i) => (
              <div key={r.name} className={`p-8 ${i === 1 ? "bg-surface" : "bg-deep"} flex flex-col`}>
                <div className="flex gap-1 mb-6">
                  {Array.from({ length: r.rating }).map((_, j) => (
                    <Icon key={j} name="Star" size={12} className="text-amber" fallback="Star" />
                  ))}
                </div>
                <p className="text-soft font-body text-sm leading-relaxed flex-1 mb-8">
                  «{r.text}»
                </p>
                <div className="flex items-center gap-4 pt-6 border-t border-stroke">
                  <img src={r.avatar} alt={r.name} className="w-10 h-10 object-cover" style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }} />
                  <div>
                    <p className="font-body font-semibold text-snow text-sm">{r.name}</p>
                    <p className="text-emerald text-xs font-body tracking-wide">{r.location} · {r.model}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className="py-32 bg-deep">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-5 gap-16 lg:gap-20">
          <div className="lg:col-span-2">
            <span className="tag mb-4 block">Вопросы</span>
            <h2 className="font-display font-light text-snow mb-6" style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)" }}>
              Часто спрашивают
            </h2>
            <p className="text-ghost font-body text-sm leading-relaxed mb-8">
              Не нашли ответа? Позвоните нам или оставьте заявку — ответим на все вопросы бесплатно.
            </p>
            <button onClick={openModal} className="border border-emerald text-emerald px-6 py-3 text-xs font-body tracking-widest hover:bg-emerald hover:text-night transition-all">
              ЗАДАТЬ ВОПРОС
            </button>
          </div>
          <div className="lg:col-span-3 divide-y divide-stroke">
            {FAQS.map((faq, i) => (
              <div key={i}>
                <button
                  className="w-full flex items-start justify-between py-6 text-left gap-4"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="font-body font-medium text-soft text-sm leading-snug">{faq.q}</span>
                  <div className={`w-6 h-6 border flex items-center justify-center flex-shrink-0 transition-colors ${openFaq === i ? "border-emerald bg-emerald" : "border-stroke"}`}>
                    <Icon name={openFaq === i ? "Minus" : "Plus"} size={12} className={openFaq === i ? "text-night" : "text-ghost"} fallback="Plus" />
                  </div>
                </button>
                {openFaq === i && (
                  <p className="text-ghost font-body text-sm leading-relaxed pb-6 animate-fade-in">{faq.a}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACTS ── */}
      <section id="contacts" className="py-32 bg-night">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-0 border border-stroke">
            {/* Left */}
            <div className="p-10 lg:p-14 border-b lg:border-b-0 lg:border-r border-stroke">
              <span className="tag mb-6 block">Контакты</span>
              <h2 className="font-display font-light text-snow leading-tight mb-6" style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)" }}>
                Оставьте заявку —<br />перезвоним за час
              </h2>
              <p className="text-ghost font-body text-sm mb-10 leading-relaxed">
                Подберём модель, рассчитаем стоимость, ответим на все вопросы. Бесплатно и без обязательств.
              </p>
              <div className="space-y-5 mb-10">
                <a href="tel:+79065170682" className="flex items-center gap-4 group">
                  <div className="w-10 h-10 border border-stroke group-hover:border-emerald flex items-center justify-center transition-colors">
                    <Icon name="Phone" size={15} className="text-ghost group-hover:text-emerald transition-colors" fallback="Phone" />
                  </div>
                  <div>
                    <p className="font-body font-semibold text-soft text-sm group-hover:text-snow transition-colors">+7 (906) 517-06-82</p>
                    <p className="text-ghost text-xs font-body">Бесплатно по России</p>
                  </div>
                </a>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 border border-stroke flex items-center justify-center">
                    <Icon name="MapPin" size={15} className="text-ghost" fallback="MapPin" />
                  </div>
                  <div>
                    <p className="font-body font-semibold text-soft text-sm">Москва и Московская область</p>
                    <p className="text-ghost text-xs font-body">Выезжаем к вам</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <button onClick={openModal} className="flex-1 bg-emerald text-night px-6 py-3.5 font-body font-semibold text-xs tracking-widest hover:opacity-90 transition-opacity">
                  ОСТАВИТЬ ЗАЯВКУ
                </button>
                <button onClick={openModal} className="flex-1 border border-stroke text-ghost px-6 py-3.5 font-body text-xs tracking-widest hover:border-emerald hover:text-snow transition-all">
                  ПОЛУЧИТЬ СТАТЬИ
                </button>
              </div>
            </div>
            {/* Right — articles */}
            <div className="p-10 lg:p-14 bg-deep">
              <p className="text-ghost text-xs font-body tracking-[0.2em] uppercase mb-8">Авторские статьи в подарок</p>
              <div className="space-y-0 divide-y divide-stroke">
                {ARTICLES.map((a, i) => (
                  <div key={i} className="flex items-start gap-5 py-6">
                    <span className="font-display text-3xl font-light text-emerald/30 leading-none flex-shrink-0">{String(i + 1).padStart(2, "0")}</span>
                    <p className="text-soft font-body text-sm leading-snug">{a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── MODAL ── */}
      {modalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-night/80 backdrop-blur-md" onClick={closeModal} />
          <div className="relative bg-deep border border-stroke w-full max-w-md overflow-hidden animate-fade-up">
            {!modalDone && (
              <div className="h-px bg-stroke">
                <div className="h-px bg-emerald transition-all duration-500" style={{ width: `${(modalStep / 4) * 100}%` }} />
              </div>
            )}
            <button onClick={closeModal} className="absolute top-4 right-4 w-8 h-8 border border-stroke flex items-center justify-center hover:border-emerald transition-colors">
              <Icon name="X" size={14} className="text-ghost" fallback="X" />
            </button>

            {modalDone ? (
              <div className="p-10 text-center">
                <div className="w-14 h-14 border border-emerald flex items-center justify-center mx-auto mb-6">
                  <Icon name="Check" size={24} className="text-emerald" fallback="Check" />
                </div>
                <h3 className="font-display text-2xl font-light text-snow mb-3">Спасибо!</h3>
                <p className="text-ghost font-body text-sm">Заявка принята. Перезвоним в течение часа.</p>
                <p className="text-ghost font-body text-sm mt-1">Статьи отправим на указанный email.</p>
              </div>
            ) : (
              <div className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-emerald text-xs font-body tracking-widest uppercase">Шаг {modalStep} / 4</span>
                  <div className="flex-1 h-px bg-stroke" />
                </div>

                {modalStep === 1 && (
                  <>
                    <h3 className="font-display text-2xl font-light text-snow mb-1">Ответьте на 4 вопроса</h3>
                    <p className="text-ghost font-body text-sm mb-6">и получите 3 авторские статьи в подарок</p>
                    <div className="border border-stroke p-4 mb-6 space-y-2">
                      {ARTICLES.map((a, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <Icon name="BookOpen" size={12} className="text-emerald flex-shrink-0 mt-0.5" fallback="BookOpen" />
                          <span className="text-xs font-body text-ghost leading-snug">{a}</span>
                        </div>
                      ))}
                    </div>
                    <div className="space-y-3">
                      {[
                        { label: "Имя *", key: "name" as const, type: "text", placeholder: "Иван Петров" },
                        { label: "Телефон *", key: "phone" as const, type: "tel", placeholder: "+7 (___) ___-__-__" },
                        { label: "Email *", key: "email" as const, type: "email", placeholder: "ivan@mail.ru" },
                      ].map(({ label, key, type, placeholder }) => (
                        <div key={key}>
                          <label className="block text-[10px] font-body text-ghost mb-1.5 uppercase tracking-widest">{label}</label>
                          <input
                            type={type}
                            placeholder={placeholder}
                            className="w-full bg-surface border border-stroke px-4 py-3 text-sm font-body text-snow placeholder:text-ghost/40 focus:outline-none focus:border-emerald transition-colors"
                            value={mf[key]}
                            onChange={(e) => setMf({ ...mf, [key]: e.target.value })}
                          />
                        </div>
                      ))}
                    </div>
                  </>
                )}

                {modalStep === 2 && (
                  <>
                    <h3 className="font-display text-2xl font-light text-snow mb-1">Размеры теплицы</h3>
                    <p className="text-ghost font-body text-sm mb-6">Укажите желаемые габариты или оставьте пустым</p>
                    <div className="space-y-3">
                      {[
                        { label: "Длина (м)", key: "length" as const, placeholder: "например, 6" },
                        { label: "Ширина (м)", key: "width" as const, placeholder: "например, 3" },
                        { label: "Высота (м)", key: "height" as const, placeholder: "например, 2.1" },
                      ].map(({ label, key, placeholder }) => (
                        <div key={key}>
                          <label className="block text-[10px] font-body text-ghost mb-1.5 uppercase tracking-widest">{label}</label>
                          <input
                            type="text"
                            placeholder={placeholder}
                            className="w-full bg-surface border border-stroke px-4 py-3 text-sm font-body text-snow placeholder:text-ghost/40 focus:outline-none focus:border-emerald transition-colors"
                            value={mf[key]}
                            onChange={(e) => setMf({ ...mf, [key]: e.target.value })}
                          />
                        </div>
                      ))}
                    </div>
                  </>
                )}

                {modalStep === 3 && (
                  <>
                    <h3 className="font-display text-2xl font-light text-snow mb-1">Регион и установка</h3>
                    <p className="text-ghost font-body text-sm mb-6">Куда доставить и нужен ли монтаж?</p>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-[10px] font-body text-ghost mb-1.5 uppercase tracking-widest">Регион / город</label>
                        <input
                          type="text"
                          placeholder="например, Москва"
                          className="w-full bg-surface border border-stroke px-4 py-3 text-sm font-body text-snow placeholder:text-ghost/40 focus:outline-none focus:border-emerald transition-colors"
                          value={mf.region}
                          onChange={(e) => setMf({ ...mf, region: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-body text-ghost mb-2 uppercase tracking-widest">Установка</label>
                        <div className="grid grid-cols-2 gap-2">
                          {INSTALL_OPTIONS.map((opt) => (
                            <button
                              type="button"
                              key={opt}
                              onClick={() => setMf({ ...mf, install: opt })}
                              className={`py-3 px-4 border text-xs font-body tracking-wide transition-all ${
                                mf.install === opt ? "border-emerald bg-emerald text-night font-semibold" : "border-stroke text-ghost hover:border-emerald hover:text-snow"
                              }`}
                            >
                              {opt}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {modalStep === 4 && (
                  <>
                    <h3 className="font-display text-2xl font-light text-snow mb-1">Бюджет</h3>
                    <p className="text-ghost font-body text-sm mb-6">Выберите удобный диапазон</p>
                    <div className="space-y-2">
                      {BUDGET_OPTIONS.map((opt) => (
                        <button
                          type="button"
                          key={opt}
                          onClick={() => setMf({ ...mf, budget: opt })}
                          className={`w-full py-3 px-4 border text-xs font-body tracking-wide text-left transition-all flex items-center justify-between ${
                            mf.budget === opt ? "border-emerald bg-emerald text-night font-semibold" : "border-stroke text-ghost hover:border-emerald hover:text-snow"
                          }`}
                        >
                          {opt}
                          {mf.budget === opt && <Icon name="Check" size={13} className="text-night" fallback="Check" />}
                        </button>
                      ))}
                    </div>
                  </>
                )}

                {modalError && (
                  <p className="mt-4 text-xs font-body text-red-400 border border-red-400/30 bg-red-400/10 px-4 py-2">
                    {modalError}
                  </p>
                )}

                <div className="flex gap-2 mt-6">
                  {modalStep > 1 && (
                    <button
                      onClick={() => { setModalStep(modalStep - 1); setModalError(""); }}
                      className="flex-1 border border-stroke text-ghost py-3 font-body text-xs tracking-widest hover:border-emerald hover:text-snow transition-all"
                    >
                      НАЗАД
                    </button>
                  )}
                  <button
                    onClick={handleModalNext}
                    className="flex-1 bg-emerald text-night py-3 font-body font-semibold text-xs tracking-widest hover:opacity-90 transition-opacity"
                  >
                    {modalStep < 4 ? "ДАЛЕЕ" : "ОТПРАВИТЬ"}
                  </button>
                </div>
                <p className="text-center text-[10px] text-ghost/50 font-body mt-4">
                  Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── FOOTER ── */}
      <footer className="border-t border-stroke bg-deep">
        <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-display text-xl text-snow">Солнечный <span className="text-emerald">контур</span></span>
          <div className="flex flex-wrap gap-6 justify-center">
            {NAV_LINKS.slice(0, 5).map((l) => (
              <a key={l.href} href={l.href} className="text-xs font-body text-ghost hover:text-snow transition-colors tracking-wide uppercase">
                {l.label}
              </a>
            ))}
          </div>
          <p className="text-xs font-body text-ghost/50">© 2024 Все права защищены</p>
        </div>
      </footer>
    </div>
  );
}
