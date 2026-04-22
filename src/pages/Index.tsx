import { useState } from "react";
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
    id: "arch",
    label: "Арочные",
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
    id: "straight",
    label: "Прямостенные",
    img: "https://cdn.poehali.dev/files/7438642f-2df7-40cd-921c-36db8e446242.jpg",
    desc: "Вертикальные стены дают максимум пространства у боковых грядок. Удобнее работать у краёв, легче подвешивать шпалеры.",
    models: [
      { name: "Царская Люкс 2.5м", size: "2.5 × 4–12 м, высота 2.1 м", price: "от 27 990 ₽", features: ["Труба 40×20 мм", "Прямые стены", "Гарантия 15 лет"], popular: false },
      { name: "Боярская Премиум 3м", size: "3 × 4–12 м, высота 2.1 м", price: "от 28 990 ₽", features: ["Двойная труба", "Краб-система", "Максимум пространства"], popular: true },
      { name: "Царская Премиум 4м", size: "4 × 4–12 м, высота 2.8 м", price: "от 62 990 ₽", features: ["Ширина 4 м", "Двойная труба 40×20", "Профессиональная"], popular: false },
    ],
  },
  {
    id: "drop",
    label: "Каплевидные",
    img: "https://cdn.poehali.dev/files/6fa4f067-454e-455f-9e1c-5ec549f7afcb.jpg",
    desc: "Заострённый верх в форме капли — снег не задерживается вовсе. Отличная вентиляция и эстетичный вид на участке.",
    models: [
      { name: "Боярская Капля 3м", size: "3 × 4–12 м, высота 2.1 м", price: "от 20 990 ₽", features: ["Снег сходит сам", "Труба 20×20 мм", "Гарантия 15 лет"], popular: false },
      { name: "Дворцовая Капля 3.5м", size: "3.5 × 4–12 м, высота 2.5 м", price: "от 38 990 ₽", features: ["Труба 40×20 мм", "Отличная вентиляция", "Эстетичный вид"], popular: true },
    ],
  },
  {
    id: "gable",
    label: "Двускатные",
    img: "https://cdn.poehali.dev/files/92c591ea-f4f7-4b68-99b8-e30cd38ad2c5.jpg",
    desc: "Двускатная крыша как у классического домика. Равномерный прогрев, хорошее освещение, снег легко сходит с двух сторон.",
    models: [
      { name: "Домик Люкс 3м", size: "3 × 4–12 м, высота 2.4 м", price: "от 32 990 ₽", features: ["Двускатная крыша", "Труба 40×20 мм", "Равномерный прогрев"], popular: true },
      { name: "Домик Премиум 3.5м", size: "3.5 × 4–12 м, высота 2.6 м", price: "от 49 990 ₽", features: ["Двойная труба", "Высота 2.6 м", "Гарантия 15 лет"], popular: false },
    ],
  },
  {
    id: "mittlider",
    label: "По Миттлайдеру",
    img: "https://cdn.poehali.dev/files/f26033dd-47d8-4568-8a55-b01ad0cb49c9.jpg",
    desc: "Особая система вентиляции в коньке крыши. Идеальный микроклимат, равномерный прогрев воздуха — урожай на 20–30% выше.",
    models: [
      { name: "Миттлайдер Люкс 3.5м", size: "3.5 × 4–12 м, высота 2.4 м", price: "от 49 990 ₽", features: ["Вентиляция в коньке", "Труба 40×20 мм", "Идеальный климат"], popular: false },
      { name: "Миттлайдер Премиум 3м", size: "3 × 4–12 м, высота 2.4 м", price: "от 69 990 ₽", features: ["Двойная труба", "Равномерный прогрев", "Гарантия 15 лет"], popular: true },
      { name: "Миттлайдер Премиум 3.5м", size: "3.5 × 4–12 м, высота 2.4 м", price: "от 60 990 ₽", features: ["Двойная труба 40×20", "Оптимальный микроклимат", "Профессиональная"], popular: false },
    ],
  },
  {
    id: "lean",
    label: "Пристенные",
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
  { icon: "Layers", title: "Оцинкованный каркас", desc: "Стальная труба 20×20 или 40×20 мм — не боится коррозии и ржавчины." },
  { icon: "Sun", title: "Поликарбонат UV-400", desc: "Усиленный поликарбонат с защитой от ультрафиолета во всех моделях." },
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
  {
    name: "Наталья Соколова",
    location: "Подмосковье",
    model: "Боярская Люкс 3м",
    text: "Заказала теплицу в марте, к маю уже была собрана. Ребята приехали вовремя, собрали за один день — аккуратно, без мусора. Огурцы и томаты уже с мая!",
    rating: 5,
    avatar: "https://cdn.poehali.dev/projects/ff76d473-8663-4c8b-bc4b-fb4239d02e4c/files/e3347290-8720-4e06-b32f-dbee381c94b0.jpg",
  },
  {
    name: "Сергей Михайлов",
    location: "Серпухов",
    model: "Миттлайдер Премиум 3.5м",
    text: "Брал для зимнего выращивания зелени. Теплица держит тепло отлично, каркас не поведло даже при −35. Двойная труба — это реально чувствуется.",
    rating: 5,
    avatar: "https://cdn.poehali.dev/projects/ff76d473-8663-4c8b-bc4b-fb4239d02e4c/files/8f2df94f-5b9c-440c-ad46-5ea1f2f7e3ff.jpg",
  },
  {
    name: "Ирина Воронова",
    location: "Дмитров",
    model: "Дворцовая Люкс 3.5м",
    text: "Очень внимательные менеджеры, помогли выбрать нужный размер. Высота 2.8 м — это просто мечта, работать внутри одно удовольствие.",
    rating: 5,
    avatar: "https://cdn.poehali.dev/projects/ff76d473-8663-4c8b-bc4b-fb4239d02e4c/files/e3d81dae-d6c7-403c-9506-2e5bb707bbfd.jpg",
  },
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

const BUDGET_OPTIONS = [
  "до 20 000 ₽",
  "20 000 – 40 000 ₽",
  "40 000 – 70 000 ₽",
  "от 70 000 ₽",
  "Готов рассмотреть предложение",
];

const INSTALL_OPTIONS = ["Самостоятельно", "Силами компании"];

type ModalForm = {
  name: string;
  phone: string;
  email: string;
  length: string;
  width: string;
  height: string;
  region: string;
  install: string;
  budget: string;
};

export default function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState("arch");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalStep, setModalStep] = useState(1);
  const [modalDone, setModalDone] = useState(false);
  const [mf, setMf] = useState<ModalForm>({
    name: "", phone: "", email: "",
    length: "", width: "", height: "",
    region: "", install: "", budget: "",
  });
  const [modalError, setModalError] = useState("");

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
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(mf),
        });
      } catch (e) {
        console.error(e);
      }
      setModalDone(true);
    }
  };

  return (
    <div className="min-h-screen bg-white font-body text-ink">

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-line">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-14">
          <a href="#" className="font-display text-xl font-semibold tracking-tight text-ink">
            Солнечный контур
          </a>
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href} className="text-sm text-mid hover:text-ink transition-colors font-body">
                {l.label}
              </a>
            ))}
            <button
              onClick={openModal}
              className="ml-2 bg-ink text-white text-sm px-5 py-2 hover:bg-ink/80 transition-colors font-body"
            >
              Заказать
            </button>
          </div>
          <button className="md:hidden p-2" onClick={() => setMenuOpen(!menuOpen)}>
            <Icon name={menuOpen ? "X" : "Menu"} size={20} />
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden bg-white border-t border-line px-6 py-4 flex flex-col gap-4">
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href} className="text-sm text-mid hover:text-ink py-1" onClick={() => setMenuOpen(false)}>
                {l.label}
              </a>
            ))}
            <button onClick={() => { openModal(); setMenuOpen(false); }} className="bg-ink text-white text-sm px-5 py-2.5 text-left font-body">
              Заказать
            </button>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section className="relative min-h-screen flex items-end pt-14">
        <img src={HERO_IMG} alt="Теплица" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/30 to-transparent" />
        <div className="relative z-10 max-w-6xl mx-auto px-6 pb-20 w-full">
          <div className="max-w-2xl animate-fade-up">
            <p className="text-white/60 text-xs font-body tracking-widest uppercase mb-5">
              Производитель теплиц · Москва и область
            </p>
            <h1 className="font-display text-5xl md:text-7xl font-light text-white leading-[1.05] mb-6">
              Теплицы из<br />поликарбоната
            </h1>
            <p className="text-white/70 text-lg mb-10 font-body max-w-lg leading-relaxed">
              Напрямую от завода. Доставка за 48 часов, монтаж в день доставки, гарантия до 15 лет.
            </p>
            <div className="flex flex-wrap gap-3">
              <button onClick={openModal} className="bg-white text-ink px-8 py-3 text-sm font-body font-medium hover:bg-white/90 transition-colors">
                Выбрать теплицу
              </button>
              <a href="#models" className="border border-white/40 text-white px-8 py-3 text-sm font-body hover:bg-white/10 transition-colors">
                Смотреть модели
              </a>
            </div>
          </div>

          <div className="flex gap-12 mt-16 pt-8 border-t border-white/20">
            {[["2 400+", "довольных клиентов"], ["1 день", "монтаж под ключ"], ["15 лет", "гарантия"]].map(([val, lbl]) => (
              <div key={lbl}>
                <p className="font-display text-3xl text-white font-light">{val}</p>
                <p className="text-white/50 text-xs font-body mt-1">{lbl}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-28 bg-white">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-20 items-center">
          <div>
            <p className="text-mid text-xs tracking-widest uppercase font-body mb-4">О компании</p>
            <h2 className="font-display text-4xl md:text-5xl font-light text-ink leading-tight mb-6">
              Строим теплицы,<br />которые живут долго
            </h2>
            <p className="text-mid text-base mb-8 font-body leading-relaxed">
              Помогаем садоводам по всей России получать богатый урожай независимо от капризов погоды. Используем только проверенные материалы и комплектующие.
            </p>
            <div className="grid grid-cols-2 gap-8">
              {[["2 400+", "проектов"], ["48", "регионов"], ["15 лет", "гарантия"], ["100%", "качество"]].map(([val, lbl]) => (
                <div key={lbl}>
                  <p className="font-display text-3xl font-light text-ink">{val}</p>
                  <p className="text-xs text-mid font-body mt-1">{lbl}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <img src={INTERIOR_IMG} alt="Интерьер теплицы" className="w-full h-[420px] object-cover" />
            <div className="absolute bottom-6 left-6 bg-white px-5 py-4 border border-line">
              <p className="font-display text-2xl font-light text-ink">1 день</p>
              <p className="text-mid text-xs font-body mt-0.5">монтаж под ключ</p>
            </div>
          </div>
        </div>
      </section>

      {/* ADVANTAGES */}
      <section id="advantages" className="py-28 bg-mist">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-16">
            <p className="text-mid text-xs tracking-widest uppercase font-body mb-4">Почему мы</p>
            <h2 className="font-display text-4xl md:text-5xl font-light text-ink">Наши преимущества</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-line">
            {ADVANTAGES.map((adv) => (
              <div key={adv.title} className="bg-white p-8 hover:bg-mist transition-colors">
                <Icon name={adv.icon} size={20} className="text-mid mb-5" fallback="Leaf" />
                <h3 className="font-body font-medium text-ink mb-2 text-base">{adv.title}</h3>
                <p className="text-mid text-sm font-body leading-relaxed">{adv.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MODELS */}
      <section id="models" className="py-28 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-12">
            <p className="text-mid text-xs tracking-widest uppercase font-body mb-4">Каталог</p>
            <h2 className="font-display text-4xl md:text-5xl font-light text-ink">Модели теплиц</h2>
            <p className="text-mid mt-3 font-body text-sm">Стандартные размеры в наличии. Нестандартные — под заказ.</p>
          </div>

          <div className="flex flex-wrap gap-2 mb-10">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 text-sm font-body border transition-colors ${
                  activeCategory === cat.id
                    ? "bg-ink text-white border-ink"
                    : "bg-white text-mid border-line hover:border-ink hover:text-ink"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {CATEGORIES.filter((c) => c.id === activeCategory).map((cat) => (
            <div key={cat.id}>
              <div className="grid md:grid-cols-2 gap-0 mb-10 border border-line overflow-hidden">
                <img src={cat.img} alt={cat.label} className="w-full h-64 md:h-80 object-cover" />
                <div className="p-10 flex flex-col justify-center bg-mist">
                  <h3 className="font-display text-3xl font-light text-ink mb-3">{cat.label} теплицы</h3>
                  <p className="text-mid font-body text-sm leading-relaxed">{cat.desc}</p>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-line">
                {cat.models.map((m) => (
                  <div key={m.name} className={`relative flex flex-col p-8 ${m.popular ? "bg-ink text-white" : "bg-white"}`}>
                    {m.popular && (
                      <span className="text-xs font-body text-white/60 uppercase tracking-widest mb-4">Популярная</span>
                    )}
                    <h3 className={`font-body font-medium text-base mb-1 ${m.popular ? "text-white" : "text-ink"}`}>{m.name}</h3>
                    <p className={`text-xs font-body mb-5 ${m.popular ? "text-white/50" : "text-mid"}`}>{m.size}</p>
                    <ul className="space-y-2 mb-6 flex-1">
                      {m.features.map((f) => (
                        <li key={f} className={`flex items-center gap-2 text-sm font-body ${m.popular ? "text-white/70" : "text-mid"}`}>
                          <span className={`w-1 h-1 rounded-full flex-shrink-0 ${m.popular ? "bg-white/40" : "bg-mid"}`} />
                          {f}
                        </li>
                      ))}
                    </ul>
                    <div className="flex items-center justify-between pt-5 border-t border-current border-opacity-10" style={{ borderColor: m.popular ? "rgba(255,255,255,0.15)" : "#e5e5e5" }}>
                      <span className={`font-display text-xl font-light ${m.popular ? "text-white" : "text-ink"}`}>{m.price}</span>
                      <button
                        onClick={openModal}
                        className={`text-xs px-4 py-2 font-body border transition-colors ${
                          m.popular
                            ? "border-white/40 text-white hover:bg-white hover:text-ink"
                            : "border-ink text-ink hover:bg-ink hover:text-white"
                        }`}
                      >
                        Заказать
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PROCESS */}
      <section id="process" className="py-28 bg-ink text-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-16">
            <p className="text-white/40 text-xs tracking-widest uppercase font-body mb-4">Как это работает</p>
            <h2 className="font-display text-4xl md:text-5xl font-light text-white">Процесс заказа</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12">
            {PROCESS_STEPS.map((s) => (
              <div key={s.num}>
                <span className="font-display text-6xl font-light text-white/15">{s.num}</span>
                <h3 className="font-body font-medium text-white mt-3 mb-2">{s.title}</h3>
                <p className="text-white/50 text-sm font-body leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-16 pt-16 border-t border-white/10">
            <button
              onClick={openModal}
              className="bg-white text-ink px-10 py-4 font-body text-sm font-medium hover:bg-white/90 transition-colors"
            >
              Оставить заявку
            </button>
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" className="py-28 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-16">
            <p className="text-mid text-xs tracking-widest uppercase font-body mb-4">Отзывы</p>
            <h2 className="font-display text-4xl md:text-5xl font-light text-ink">Что говорят клиенты</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-px bg-line">
            {REVIEWS.map((r) => (
              <div key={r.name} className="bg-white p-8 flex flex-col">
                <div className="flex gap-0.5 mb-6">
                  {Array.from({ length: r.rating }).map((_, i) => (
                    <Icon key={i} name="Star" size={14} className="text-ink fill-ink" fallback="Star" />
                  ))}
                </div>
                <p className="text-ink font-body text-sm leading-relaxed flex-1 mb-8">"{r.text}"</p>
                <div className="flex items-center gap-3 pt-6 border-t border-line">
                  <img src={r.avatar} alt={r.name} className="w-9 h-9 rounded-full object-cover" />
                  <div>
                    <p className="font-body font-medium text-ink text-sm">{r.name}</p>
                    <p className="text-mid text-xs font-body">{r.location} · {r.model}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-28 bg-mist">
        <div className="max-w-3xl mx-auto px-6">
          <div className="mb-16">
            <p className="text-mid text-xs tracking-widest uppercase font-body mb-4">Вопросы</p>
            <h2 className="font-display text-4xl md:text-5xl font-light text-ink">Часто спрашивают</h2>
          </div>
          <div className="divide-y divide-line">
            {FAQS.map((faq, i) => (
              <div key={i}>
                <button
                  className="w-full flex items-center justify-between py-6 text-left"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="font-body font-medium text-ink pr-8 text-sm">{faq.q}</span>
                  <Icon
                    name={openFaq === i ? "Minus" : "Plus"}
                    size={16}
                    className="text-mid flex-shrink-0"
                    fallback="Plus"
                  />
                </button>
                {openFaq === i && (
                  <p className="text-mid font-body text-sm leading-relaxed pb-6">{faq.a}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="py-28 bg-white">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-20 items-start">
          <div>
            <p className="text-mid text-xs tracking-widest uppercase font-body mb-4">Контакты</p>
            <h2 className="font-display text-4xl md:text-5xl font-light text-ink leading-tight mb-6">
              Оставьте заявку —<br />перезвоним за час
            </h2>
            <p className="text-mid font-body text-sm mb-10 leading-relaxed">
              Подберём модель, рассчитаем стоимость, ответим на все вопросы. Бесплатно и без обязательств.
            </p>
            <div className="space-y-6 mb-10">
              <div className="flex items-start gap-4">
                <Icon name="Phone" size={16} className="text-mid mt-0.5 flex-shrink-0" fallback="Phone" />
                <div>
                  <a href="tel:+79065170682" className="font-body font-medium text-ink hover:text-mid transition-colors text-sm">
                    +7 (906) 517-06-82
                  </a>
                  <p className="text-mid text-xs font-body mt-0.5">Бесплатно по России</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Icon name="MapPin" size={16} className="text-mid mt-0.5 flex-shrink-0" fallback="MapPin" />
                <div>
                  <p className="font-body font-medium text-ink text-sm">Москва и Московская область</p>
                  <p className="text-mid text-xs font-body mt-0.5">Выезжаем к вам</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={openModal}
                className="flex-1 bg-ink text-white px-6 py-3 font-body text-sm font-medium hover:bg-ink/80 transition-colors"
              >
                Оставить заявку
              </button>
              <button
                onClick={openModal}
                className="flex-1 border border-line text-mid px-6 py-3 font-body text-sm hover:border-ink hover:text-ink transition-colors"
              >
                Получить авторские статьи
              </button>
            </div>
          </div>

          <div className="bg-mist border border-line p-8">
            <p className="text-xs font-body font-medium text-mid uppercase tracking-wide mb-6">
              Авторские статьи в подарок
            </p>
            <ul className="space-y-4">
              {ARTICLES.map((a, i) => (
                <li key={i} className="flex items-start gap-4">
                  <span className="text-xs text-mid font-body w-4 flex-shrink-0 mt-0.5">{i + 1}.</span>
                  <span className="text-sm font-body text-ink leading-snug">{a}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* MODAL */}
      {modalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-ink/50 backdrop-blur-sm" onClick={closeModal} />
          <div className="relative bg-white w-full max-w-md overflow-hidden">
            {!modalDone && (
              <div className="h-0.5 bg-line">
                <div className="h-0.5 bg-ink transition-all duration-500" style={{ width: `${(modalStep / 4) * 100}%` }} />
              </div>
            )}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center hover:bg-mist transition-colors"
            >
              <Icon name="X" size={16} className="text-mid" fallback="X" />
            </button>

            {modalDone ? (
              <div className="p-10 text-center">
                <Icon name="CheckCircle" size={32} className="text-ink mx-auto mb-5" fallback="CheckCircle" />
                <h3 className="font-display text-2xl font-light text-ink mb-3">Спасибо!</h3>
                <p className="text-mid font-body text-sm">Заявка принята. Перезвоним в течение часа.</p>
                <p className="text-mid font-body text-sm mt-1">Статьи отправим на указанный email.</p>
              </div>
            ) : (
              <div className="p-8">
                <p className="text-xs font-body text-mid uppercase tracking-widest mb-3">Шаг {modalStep} из 4</p>

                {modalStep === 1 && (
                  <>
                    <h3 className="font-display text-2xl font-light text-ink mb-1">Ответьте на 4 вопроса</h3>
                    <p className="text-mid font-body text-sm mb-6">и получите 3 авторские статьи в подарок</p>
                    <div className="bg-mist border border-line p-4 mb-6">
                      {ARTICLES.map((a, i) => (
                        <div key={i} className="flex items-start gap-2 mb-2 last:mb-0">
                          <Icon name="BookOpen" size={12} className="text-mid flex-shrink-0 mt-0.5" fallback="BookOpen" />
                          <span className="text-xs font-body text-mid leading-snug">{a}</span>
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
                          <label className="block text-xs font-body text-mid mb-1 uppercase tracking-wide">{label}</label>
                          <input
                            type={type}
                            placeholder={placeholder}
                            className="w-full bg-white border border-line px-4 py-2.5 text-sm font-body text-ink placeholder:text-mid/50 focus:outline-none focus:border-ink transition-colors"
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
                    <h3 className="font-display text-2xl font-light text-ink mb-1">Размеры теплицы</h3>
                    <p className="text-mid font-body text-sm mb-6">Укажите желаемые габариты или оставьте пустым</p>
                    <div className="space-y-3">
                      {[
                        { label: "Длина (м)", key: "length" as const, placeholder: "например, 6" },
                        { label: "Ширина (м)", key: "width" as const, placeholder: "например, 3" },
                        { label: "Высота (м)", key: "height" as const, placeholder: "например, 2.1" },
                      ].map(({ label, key, placeholder }) => (
                        <div key={key}>
                          <label className="block text-xs font-body text-mid mb-1 uppercase tracking-wide">{label}</label>
                          <input
                            type="text"
                            placeholder={placeholder}
                            className="w-full bg-white border border-line px-4 py-2.5 text-sm font-body text-ink placeholder:text-mid/50 focus:outline-none focus:border-ink transition-colors"
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
                    <h3 className="font-display text-2xl font-light text-ink mb-1">Регион и установка</h3>
                    <p className="text-mid font-body text-sm mb-6">Куда доставить и нужен ли монтаж?</p>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-body text-mid mb-1 uppercase tracking-wide">Регион / город</label>
                        <input
                          type="text"
                          placeholder="например, Москва"
                          className="w-full bg-white border border-line px-4 py-2.5 text-sm font-body text-ink placeholder:text-mid/50 focus:outline-none focus:border-ink transition-colors"
                          value={mf.region}
                          onChange={(e) => setMf({ ...mf, region: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-body text-mid mb-2 uppercase tracking-wide">Установка</label>
                        <div className="grid grid-cols-2 gap-2">
                          {INSTALL_OPTIONS.map((opt) => (
                            <button
                              type="button"
                              key={opt}
                              onClick={() => setMf({ ...mf, install: opt })}
                              className={`py-3 px-4 border text-sm font-body transition-colors ${
                                mf.install === opt
                                  ? "border-ink bg-ink text-white"
                                  : "border-line text-mid hover:border-ink hover:text-ink"
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
                    <h3 className="font-display text-2xl font-light text-ink mb-1">Бюджет</h3>
                    <p className="text-mid font-body text-sm mb-6">Выберите удобный диапазон</p>
                    <div className="space-y-2">
                      {BUDGET_OPTIONS.map((opt) => (
                        <button
                          type="button"
                          key={opt}
                          onClick={() => setMf({ ...mf, budget: opt })}
                          className={`w-full py-3 px-4 border text-sm font-body text-left transition-colors flex items-center justify-between ${
                            mf.budget === opt
                              ? "border-ink bg-ink text-white"
                              : "border-line text-mid hover:border-ink hover:text-ink"
                          }`}
                        >
                          {opt}
                          {mf.budget === opt && <Icon name="Check" size={14} className="text-white" fallback="Check" />}
                        </button>
                      ))}
                    </div>
                  </>
                )}

                {modalError && (
                  <p className="mt-4 text-xs font-body text-red-500 border border-red-200 px-4 py-2 bg-red-50">
                    {modalError}
                  </p>
                )}

                <div className="flex gap-2 mt-6">
                  {modalStep > 1 && (
                    <button
                      onClick={() => { setModalStep(modalStep - 1); setModalError(""); }}
                      className="flex-1 border border-line text-mid py-3 font-body text-sm hover:border-ink hover:text-ink transition-colors"
                    >
                      Назад
                    </button>
                  )}
                  <button
                    onClick={handleModalNext}
                    className="flex-1 bg-ink text-white py-3 font-body text-sm font-medium hover:bg-ink/80 transition-colors"
                  >
                    {modalStep < 4 ? "Далее" : "Отправить заявку"}
                  </button>
                </div>
                <p className="text-center text-xs text-mid/60 font-body mt-4">
                  Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="bg-mist border-t border-line py-10">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-display text-lg text-ink">Солнечный контур</span>
          <div className="flex gap-8 text-xs font-body text-mid">
            {NAV_LINKS.slice(0, 4).map((l) => (
              <a key={l.href} href={l.href} className="hover:text-ink transition-colors">{l.label}</a>
            ))}
          </div>
          <p className="text-xs font-body text-mid">© 2024 Все права защищены</p>
        </div>
      </footer>
    </div>
  );
}
