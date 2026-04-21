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
  { icon: "Factory", title: "Мы завод-изготовитель", desc: "Сами изготавливаем теплицы и полностью несём ответственность за качество каждого изделия." },
  { icon: "BadgeCheck", title: "Качественная продукция", desc: "Приобретая теплицу у нас, вы получаете качественное и проверенное временем изделие." },
  { icon: "Layers", title: "Оцинкованный каркас", desc: "Используем оцинкованную внутри и снаружи стальную трубу 20×20 мм или 40×20 мм — каркас не боится коррозии и ржавчины." },
  { icon: "Sun", title: "Поликарбонат UV-400", desc: "Устанавливаем усиленный поликарбонат с защитой от ультрафиолета UV-400 во всех теплицах." },
  { icon: "Shield", title: "Надёжная конструкция", desc: "Теплицы спроектированы так, чтобы выдерживать снег, град, ветер и любую непогоду." },
  { icon: "Award", title: "Гарантия до 15 лет", desc: "Все модели проверены временем и соответствуют строгим стандартам качества. Гарантия до 15 лет." },
  { icon: "Truck", title: "Доставка за 48 часов", desc: "Доставим теплицу в течение 48 часов с момента заказа по Москве и области — без предоплаты." },
  { icon: "Wrench", title: "Сборка в день доставки", desc: "Наши специалисты соберут теплицу на вашем участке прямо в день доставки." },
  { icon: "Tag", title: "Низкие цены", desc: "Мы завод и продаём напрямую — никаких посредников. Именно поэтому у нас одни из самых низких цен." },
  { icon: "PackageCheck", title: "Всегда в наличии", desc: "Любую модель изготовим за 24 часа. Вы получите теплицу в течение 48 часов с момента заказа." },
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
    text: "Заказала теплицу в марте, к маю уже была собрана. Ребята приехали вовремя, собрали за один день — аккуратно, без мусора. Огурцы и томаты уже с мая! Очень довольна покупкой.",
    rating: 5,
    avatar: "https://cdn.poehali.dev/projects/ff76d473-8663-4c8b-bc4b-fb4239d02e4c/files/e3347290-8720-4e06-b32f-dbee381c94b0.jpg",
  },
  {
    name: "Сергей Михайлов",
    location: "Серпухов",
    model: "Миттлайдер Премиум 3.5м",
    text: "Брал для зимнего выращивания зелени. Теплица держит тепло отлично, каркас не поведло даже при −35. Двойная труба — это реально чувствуется. Всем рекомендую!",
    rating: 5,
    avatar: "https://cdn.poehali.dev/projects/ff76d473-8663-4c8b-bc4b-fb4239d02e4c/files/8f2df94f-5b9c-440c-ad46-5ea1f2f7e3ff.jpg",
  },
  {
    name: "Ирина Воронова",
    location: "Дмитров",
    model: "Дворцовая Люкс 3.5м",
    text: "Очень внимательные менеджеры, помогли выбрать нужный размер. Высота 2.8 м — это просто мечта, работать внутри одно удовольствие. Монтажники — молодцы, всё объяснили и показали.",
    rating: 5,
    avatar: "https://cdn.poehali.dev/projects/ff76d473-8663-4c8b-bc4b-fb4239d02e4c/files/e3d81dae-d6c7-403c-9506-2e5bb707bbfd.jpg",
  },
];

const FAQS = [
  {
    q: "Сколько лет служит поликарбонат?",
    a: "Качественный сотовый поликарбонат толщиной 4–8 мм служит 10–15 лет. Мы используем материал с УФ-защитой и даём гарантию 3–5 лет.",
  },
  {
    q: "Нужен ли фундамент под теплицу?",
    a: "Для большинства моделей фундамент не обязателен — достаточно анкерования в грунт. Для зимних теплиц рекомендуем брусовое или ленточное основание.",
  },
  {
    q: "Можно ли заказать нестандартный размер?",
    a: "Да, изготавливаем теплицы по индивидуальным чертежам. Стоимость и сроки уточняются на консультации.",
  },
  {
    q: "Как ухаживать за теплицей?",
    a: "Раз в год промывать поликарбонат мягкой губкой с мыльным раствором, весной проверять крепления. Уход занимает 30 минут.",
  },
  {
    q: "Какая снеговая нагрузка выдерживается?",
    a: "Стандартные модели — до 100 кг/м², усиленные зимние — до 180 кг/м². Этого достаточно для любого региона России.",
  },
];

const PRIORITIES = [
  "Большой урожай",
  "Круглогодичное использование",
  "Красивый внешний вид",
  "Доступная цена",
  "Лёгкий монтаж",
  "Долговечность",
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
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    model: "",
    priorities: [] as string[],
  });
  const [submitted, setSubmitted] = useState(false);
  const [activeCategory, setActiveCategory] = useState("arch");

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [modalStep, setModalStep] = useState(1);
  const [modalDone, setModalDone] = useState(false);
  const [mf, setMf] = useState<ModalForm>({
    name: "", phone: "", email: "",
    length: "", width: "", height: "",
    region: "", install: "",
    budget: "",
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

  const togglePriority = (p: string) => {
    setForm((f) => ({
      ...f,
      priorities: f.priorities.includes(p)
        ? f.priorities.filter((x) => x !== p)
        : [...f.priorities, p],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-cream font-body">
      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-cream/90 backdrop-blur-sm border-b border-sand">
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-16">
          <a href="#" className="font-display text-2xl font-semibold text-moss tracking-wide">
            ЭкоТеплица
          </a>
          <div className="hidden md:flex items-center gap-6">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm text-foreground/70 hover:text-moss transition-colors font-body"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#contacts"
              className="ml-2 bg-moss text-cream text-sm px-4 py-2 rounded-md hover:bg-leaf transition-colors font-body"
            >
              Заказать
            </a>
          </div>
          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Icon name={menuOpen ? "X" : "Menu"} size={22} />
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden bg-cream border-t border-sand px-4 py-4 flex flex-col gap-3">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm text-foreground/70 hover:text-moss py-1"
                onClick={() => setMenuOpen(false)}
              >
                {l.label}
              </a>
            ))}
          </div>
        )}
      </nav>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center pt-16">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${HERO_IMG})` }}
        />
        <div className="absolute inset-0 bg-bark/55" />
        <div className="relative z-10 max-w-6xl mx-auto px-4 py-24 grid md:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-up">
            <span className="inline-block text-sand text-sm font-body tracking-widest uppercase mb-4">
              Экологичные теплицы
            </span>
            <h1 className="font-display text-5xl md:text-7xl font-light text-cream leading-tight mb-6">
              Вырастите больше,<br />
              <em className="italic text-sand">естественным путём</em>
            </h1>
            <p className="text-cream/80 text-lg mb-8 font-body max-w-md">
              Теплицы из поликарбоната для вашего участка. Доставка, монтаж и гарантия включены.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="#contacts"
                className="bg-moss text-cream px-8 py-3 rounded-md font-body font-medium hover:bg-leaf transition-colors"
              >
                Выбрать теплицу
              </a>
              <a
                href="#models"
                className="border border-cream/60 text-cream px-8 py-3 rounded-md font-body hover:bg-cream/10 transition-colors"
              >
                Смотреть модели
              </a>
            </div>
          </div>
          <div className="hidden md:flex gap-4 justify-end">
            <div className="bg-cream/10 backdrop-blur-sm border border-cream/20 rounded-xl p-6 max-w-xs">
              <p className="font-display text-5xl text-cream font-semibold">2 400+</p>
              <p className="text-cream/70 mt-1 font-body text-sm">довольных клиентов</p>
              <div className="mt-4 pt-4 border-t border-cream/20">
                <p className="font-display text-5xl text-cream font-semibold">1 день</p>
                <p className="text-cream/70 mt-1 font-body text-sm">монтаж под ключ</p>
              </div>
              <div className="mt-4 pt-4 border-t border-cream/20">
                <p className="font-display text-5xl text-cream font-semibold">15 лет</p>
                <p className="text-cream/70 mt-1 font-body text-sm">гарантия на теплицы</p>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-cream to-transparent" />
      </section>

      {/* ABOUT */}
      <section id="about" className="py-24 bg-cream">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-moss text-sm tracking-widest uppercase font-body">О компании</span>
            <h2 className="font-display text-4xl md:text-5xl font-light mt-3 mb-6 text-bark leading-snug">
              Мы строим теплицы,<br />
              <em className="italic">которые живут долго</em>
            </h2>
            <p className="text-foreground/70 text-lg mb-5 font-body">Помогаем садоводам по всей России получать богатый урожай независимо от капризов погоды. Используем только проверенные материалы и комплектующие.</p>
            <p className="text-foreground/70 text-lg mb-8 font-body">
              Каждая теплица — это результат разговора с клиентом: мы учитываем размер участка,
              климат региона, задачи и бюджет.
            </p>
            <div className="flex flex-wrap gap-6">
              {[["2 400+", "проектов"], ["48", "регионов"], ["15 лет", "гарантия"], ["100%", "качество"]].map(([val, lbl]) => (
                <div key={lbl} className="text-center">
                  <p className="font-display text-3xl font-semibold text-moss">{val}</p>
                  <p className="text-sm text-foreground/60 font-body mt-0.5">{lbl}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <img
              src={INTERIOR_IMG}
              alt="Интерьер теплицы"
              className="rounded-2xl shadow-xl w-full object-cover h-96"
            />
            <div className="absolute -bottom-4 -left-4 bg-moss text-cream rounded-xl p-4 shadow-lg">
              <p className="font-display text-2xl font-semibold">1 день</p>
              <p className="text-cream/80 text-xs font-body">монтаж под ключ</p>
            </div>
          </div>
        </div>
      </section>

      {/* ADVANTAGES */}
      <section id="advantages" className="py-24" style={{ backgroundColor: "hsl(42,20%,92%)" }}>
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-14">
            <span className="text-moss text-sm tracking-widest uppercase font-body">Почему мы</span>
            <h2 className="font-display text-4xl md:text-5xl font-light mt-3 text-bark">
              Наши преимущества
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {ADVANTAGES.map((adv) => (
              <div
                key={adv.title}
                className="bg-cream rounded-xl p-6 border border-sand hover:border-sage transition-colors group"
              >
                <div className="w-10 h-10 rounded-lg bg-moss/10 flex items-center justify-center mb-4 group-hover:bg-moss/20 transition-colors">
                  <Icon name={adv.icon} size={20} className="text-moss" fallback="Leaf" />
                </div>
                <h3 className="font-display text-xl font-semibold text-bark mb-2">{adv.title}</h3>
                <p className="text-foreground/65 text-sm font-body leading-relaxed">{adv.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MODELS */}
      <section id="models" className="py-24 bg-cream">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-10">
            <span className="text-moss text-sm tracking-widest uppercase font-body">Каталог</span>
            <h2 className="font-display text-4xl md:text-5xl font-light mt-3 text-bark">Модели теплиц</h2>
            <p className="text-foreground/60 mt-3 font-body">
              Стандартные размеры в наличии. Нестандартные — под заказ.
            </p>
          </div>

          {/* Category tabs */}
          <div className="flex flex-wrap gap-2 justify-center mb-10">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-sm font-body transition-colors border ${
                  activeCategory === cat.id
                    ? "bg-moss text-cream border-moss"
                    : "bg-cream text-foreground/65 border-sand hover:border-sage"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Active category */}
          {CATEGORIES.filter((c) => c.id === activeCategory).map((cat) => (
            <div key={cat.id}>
              {/* Category hero */}
              <div className="grid md:grid-cols-2 gap-8 mb-10 rounded-2xl overflow-hidden border border-sand">
                <img
                  src={cat.img}
                  alt={cat.label}
                  className="w-full h-56 md:h-72 object-cover"
                />
                <div className="p-8 flex flex-col justify-center">
                  <h3 className="font-display text-3xl font-semibold text-bark mb-3">{cat.label} теплицы</h3>
                  <p className="text-foreground/65 font-body leading-relaxed">{cat.desc}</p>
                </div>
              </div>

              {/* Models grid */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {cat.models.map((m) => (
                  <div
                    key={m.name}
                    className={`relative rounded-xl border overflow-hidden flex flex-col ${
                      m.popular ? "border-moss shadow-md" : "border-sand bg-cream"
                    }`}
                  >
                    {m.popular && (
                      <span className="absolute top-3 left-3 z-10 bg-moss text-cream text-xs px-3 py-1 rounded-full font-body font-medium">
                        Популярная
                      </span>
                    )}
                    <div className="p-5 flex flex-col flex-1">
                      <h3 className="font-display text-lg font-semibold text-bark mb-1">{m.name}</h3>
                      <p className="text-moss text-xs font-body mb-3">{m.size}</p>
                      <ul className="space-y-1.5 mb-4 flex-1">
                        {m.features.map((f) => (
                          <li key={f} className="flex items-center gap-2 text-sm font-body text-foreground/70">
                            <Icon name="Check" size={13} className="text-moss flex-shrink-0" fallback="Check" />
                            {f}
                          </li>
                        ))}
                      </ul>
                      <div className="flex items-center justify-between pt-3 border-t border-sand">
                        <span className="font-display text-xl font-semibold text-bark">{m.price}</span>
                        <button
                          onClick={openModal}
                          className={`text-sm px-4 py-2 rounded-md font-body transition-colors ${
                            m.popular
                              ? "bg-moss text-cream hover:bg-leaf"
                              : "border border-moss text-moss hover:bg-moss hover:text-cream"
                          }`}
                        >
                          Заказать
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PROCESS */}
      <section id="process" className="py-24 bg-bark text-cream">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-14">
            <span className="text-sand text-sm tracking-widest uppercase font-body">Как это работает</span>
            <h2 className="font-display text-4xl md:text-5xl font-light mt-3 text-cream">
              Процесс заказа
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {PROCESS_STEPS.map((s) => (
              <div key={s.num}>
                <span className="font-display text-5xl font-light text-cream/20">{s.num}</span>
                <h3 className="font-display text-xl font-semibold mt-2 mb-2 text-cream">{s.title}</h3>
                <p className="text-cream/65 text-sm font-body leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-14 text-center">
            <a
              href="#contacts"
              className="inline-block bg-sand text-bark px-10 py-4 rounded-md font-body font-medium hover:bg-cream transition-colors text-lg"
            >
              Оставить заявку
            </a>
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" className="py-24 bg-cream">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-14">
            <span className="text-moss text-sm tracking-widest uppercase font-body">Отзывы</span>
            <h2 className="font-display text-4xl md:text-5xl font-light mt-3 text-bark">
              Что говорят клиенты
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {REVIEWS.map((r) => (
              <div
                key={r.name}
                className="rounded-2xl border border-sand overflow-hidden flex flex-col"
                style={{ backgroundColor: "hsl(42,20%,93%)" }}
              >
                <div className="px-7 pt-7 pb-5 flex-1">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex gap-0.5">
                      {Array.from({ length: r.rating }).map((_, i) => (
                        <span key={i} className="text-amber-500 text-sm">★</span>
                      ))}
                    </div>
                    <span className="text-xs font-body text-moss bg-moss/10 px-2 py-1 rounded-full">
                      {r.model}
                    </span>
                  </div>
                  <p className="text-foreground/75 font-body text-sm leading-relaxed italic">
                    «{r.text}»
                  </p>
                </div>
                <div className="flex items-center gap-3 px-7 py-4 border-t border-sand/60">
                  <img
                    src={r.avatar}
                    alt={r.name}
                    className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                  />
                  <div>
                    <p className="font-body font-medium text-bark text-sm">{r.name}</p>
                    <p className="text-foreground/50 text-xs font-body">{r.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACTS / FORM */}
      <section id="contacts" className="py-24 bg-cream">
        <div className="max-w-4xl mx-auto px-4">
          <div>
            <span className="text-moss text-sm tracking-widest uppercase font-body">Контакты</span>
            <h2 className="font-display text-4xl md:text-5xl font-light mt-3 mb-5 text-bark">
              Оставьте заявку —<br />
              <em className="italic">перезвоним за час</em>
            </h2>
            <p className="text-foreground/65 font-body mb-8">
              Подберём модель, рассчитаем стоимость, ответим на все вопросы. Бесплатно и без обязательств.
            </p>
            <div className="space-y-4 mb-10">
              {[
                { icon: "Phone", text: "+7 (800) 000-00-00", sub: "Бесплатно по России" },
                { icon: "MapPin", text: "Москва и Московская область", sub: "Выезжаем к вам" },
              ].map((c) => (
                <div key={c.text} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-moss/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon name={c.icon} size={18} className="text-moss" fallback="Phone" />
                  </div>
                  <div>
                    <p className="font-body font-medium text-bark">{c.text}</p>
                    <p className="text-foreground/55 text-xs font-body">{c.sub}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA кнопки */}
            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <button
                onClick={openModal}
                className="flex-1 bg-moss text-cream px-6 py-3 rounded-md font-body font-medium hover:bg-leaf transition-colors text-sm text-center"
              >
                Оставить заявку
              </button>
              <button
                onClick={openModal}
                className="flex-1 border border-moss text-moss px-6 py-3 rounded-md font-body font-medium hover:bg-moss hover:text-cream transition-colors text-sm text-center"
              >
                Получить авторские статьи
              </button>
            </div>

            {/* Список статей */}
            <div className="rounded-xl border border-sand p-5" style={{ backgroundColor: "hsl(42,20%,93%)" }}>
              <p className="text-xs font-body font-medium text-bark/60 uppercase tracking-wide mb-3">
                Авторские статьи в подарок
              </p>
              <ul className="space-y-2.5">
                {ARTICLES.map((a, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-moss/15 text-moss text-xs flex items-center justify-center flex-shrink-0 mt-0.5 font-body font-medium">
                      {i + 1}
                    </span>
                    <span className="text-sm font-body text-foreground/75 leading-snug">{a}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24" style={{ backgroundColor: "hsl(42,20%,92%)" }}>
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-14">
            <span className="text-moss text-sm tracking-widest uppercase font-body">Вопросы</span>
            <h2 className="font-display text-4xl md:text-5xl font-light mt-3 text-bark">
              Часто спрашивают
            </h2>
          </div>
          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <div key={i} className="bg-cream rounded-xl border border-sand overflow-hidden">
                <button
                  className="w-full flex items-center justify-between px-6 py-5 text-left"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="font-body font-medium text-bark pr-4">{faq.q}</span>
                  <Icon
                    name={openFaq === i ? "ChevronUp" : "ChevronDown"}
                    size={18}
                    className="text-moss flex-shrink-0"
                    fallback="ChevronDown"
                  />
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5">
                    <p className="text-foreground/65 font-body text-sm leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MODAL */}
      {modalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-bark/60 backdrop-blur-sm" onClick={closeModal} />
          <div className="relative bg-cream rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
            {/* Progress bar */}
            {!modalDone && (
              <div className="h-1 bg-sand">
                <div
                  className="h-1 bg-moss transition-all duration-500"
                  style={{ width: `${(modalStep / 4) * 100}%` }}
                />
              </div>
            )}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-sand/60 flex items-center justify-center hover:bg-sand transition-colors"
            >
              <Icon name="X" size={16} className="text-bark" fallback="X" />
            </button>

            {modalDone ? (
              <div className="p-8 text-center">
                <div className="w-16 h-16 bg-moss/15 rounded-full flex items-center justify-center mx-auto mb-5">
                  <Icon name="CheckCircle" size={32} className="text-moss" fallback="CheckCircle" />
                </div>
                <h3 className="font-display text-2xl font-semibold text-bark mb-3">Спасибо!</h3>
                <p className="text-foreground/65 font-body text-sm mb-2">Заявка принята. Перезвоним в течение часа.</p>
                <p className="text-foreground/65 font-body text-sm">Статьи отправим на указанный email.</p>
              </div>
            ) : (
              <div className="p-8">
                {/* Step indicator */}
                <p className="text-xs font-body text-moss uppercase tracking-widest mb-2">Шаг {modalStep} из 4</p>

                {modalStep === 1 && (
                  <>
                    <h3 className="font-display text-2xl font-semibold text-bark mb-1">
                      Ответьте на 4 вопроса
                    </h3>
                    <p className="text-foreground/60 font-body text-sm mb-6">
                      и получите 3 авторские статьи в подарок
                    </p>
                    {/* Articles preview */}
                    <div className="rounded-xl border border-sand p-4 mb-6" style={{ backgroundColor: "hsl(42,20%,93%)" }}>
                      {ARTICLES.map((a, i) => (
                        <div key={i} className="flex items-start gap-2 mb-2 last:mb-0">
                          <Icon name="BookOpen" size={14} className="text-moss flex-shrink-0 mt-0.5" fallback="BookOpen" />
                          <span className="text-xs font-body text-foreground/70 leading-snug">{a}</span>
                        </div>
                      ))}
                    </div>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-xs font-body font-medium text-bark/70 mb-1 uppercase tracking-wide">Имя *</label>
                        <input
                          type="text"
                          required
                          placeholder="Иван Петров"
                          className="w-full bg-white border border-sand rounded-md px-4 py-2.5 text-sm font-body text-foreground placeholder:text-foreground/35 focus:outline-none focus:border-moss transition-colors"
                          value={mf.name}
                          onChange={(e) => setMf({ ...mf, name: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-body font-medium text-bark/70 mb-1 uppercase tracking-wide">Телефон *</label>
                        <input
                          type="tel"
                          placeholder="+7 (___) ___-__-__"
                          className="w-full bg-white border border-sand rounded-md px-4 py-2.5 text-sm font-body text-foreground placeholder:text-foreground/35 focus:outline-none focus:border-moss transition-colors"
                          value={mf.phone}
                          onChange={(e) => setMf({ ...mf, phone: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-body font-medium text-bark/70 mb-1 uppercase tracking-wide">Email *</label>
                        <input
                          type="email"
                          placeholder="ivan@mail.ru"
                          className="w-full bg-white border border-sand rounded-md px-4 py-2.5 text-sm font-body text-foreground placeholder:text-foreground/35 focus:outline-none focus:border-moss transition-colors"
                          value={mf.email}
                          onChange={(e) => setMf({ ...mf, email: e.target.value })}
                        />
                      </div>
                    </div>
                  </>
                )}

                {modalStep === 2 && (
                  <>
                    <h3 className="font-display text-2xl font-semibold text-bark mb-1">Размеры теплицы</h3>
                    <p className="text-foreground/60 font-body text-sm mb-6">Укажите желаемые габариты или оставьте пустым</p>
                    <div className="space-y-3">
                      {[
                        { label: "Длина (м)", key: "length" as const, placeholder: "например, 6" },
                        { label: "Ширина (м)", key: "width" as const, placeholder: "например, 3" },
                        { label: "Высота (м)", key: "height" as const, placeholder: "например, 2.1" },
                      ].map(({ label, key, placeholder }) => (
                        <div key={key}>
                          <label className="block text-xs font-body font-medium text-bark/70 mb-1 uppercase tracking-wide">{label}</label>
                          <input
                            type="text"
                            placeholder={placeholder}
                            className="w-full bg-white border border-sand rounded-md px-4 py-2.5 text-sm font-body text-foreground placeholder:text-foreground/35 focus:outline-none focus:border-moss transition-colors"
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
                    <h3 className="font-display text-2xl font-semibold text-bark mb-1">Регион и установка</h3>
                    <p className="text-foreground/60 font-body text-sm mb-6">Куда доставить и нужен ли монтаж?</p>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-body font-medium text-bark/70 mb-1 uppercase tracking-wide">Регион / город</label>
                        <input
                          type="text"
                          placeholder="например, Москва"
                          className="w-full bg-white border border-sand rounded-md px-4 py-2.5 text-sm font-body text-foreground placeholder:text-foreground/35 focus:outline-none focus:border-moss transition-colors"
                          value={mf.region}
                          onChange={(e) => setMf({ ...mf, region: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-body font-medium text-bark/70 mb-2 uppercase tracking-wide">Установка</label>
                        <div className="grid grid-cols-2 gap-3">
                          {INSTALL_OPTIONS.map((opt) => (
                            <button
                              type="button"
                              key={opt}
                              onClick={() => setMf({ ...mf, install: opt })}
                              className={`py-3 px-4 rounded-xl border text-sm font-body transition-colors ${
                                mf.install === opt
                                  ? "border-moss bg-moss/10 text-moss font-medium"
                                  : "border-sand bg-white text-foreground/65 hover:border-sage"
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
                    <h3 className="font-display text-2xl font-semibold text-bark mb-1">Бюджет</h3>
                    <p className="text-foreground/60 font-body text-sm mb-6">Выберите удобный диапазон или отметьте готовность к предложению</p>
                    <div className="space-y-2">
                      {BUDGET_OPTIONS.map((opt) => (
                        <button
                          type="button"
                          key={opt}
                          onClick={() => setMf({ ...mf, budget: opt })}
                          className={`w-full py-3 px-5 rounded-xl border text-sm font-body text-left transition-colors flex items-center justify-between ${
                            mf.budget === opt
                              ? "border-moss bg-moss/10 text-moss font-medium"
                              : "border-sand bg-white text-foreground/65 hover:border-sage"
                          }`}
                        >
                          {opt}
                          {mf.budget === opt && <Icon name="Check" size={16} className="text-moss" fallback="Check" />}
                        </button>
                      ))}
                    </div>
                  </>
                )}

                {/* Navigation */}
                {modalError && (
                  <p className="mt-4 text-sm font-body text-red-500 bg-red-50 border border-red-200 rounded-md px-4 py-2">
                    {modalError}
                  </p>
                )}
                <div className="flex gap-3 mt-4">
                  {modalStep > 1 && (
                    <button
                      onClick={() => { setModalStep(modalStep - 1); setModalError(""); }}
                      className="flex-1 border border-sand text-foreground/65 py-3 rounded-md font-body text-sm hover:border-moss transition-colors"
                    >
                      Назад
                    </button>
                  )}
                  <button
                    onClick={handleModalNext}
                    className="flex-1 bg-moss text-cream py-3 rounded-md font-body font-medium hover:bg-leaf transition-colors text-sm"
                  >
                    {modalStep < 4 ? "Готово →" : "Отправить заявку"}
                  </button>
                </div>
                <p className="text-center text-xs text-foreground/35 font-body mt-3">
                  Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="bg-bark text-cream/70 py-10">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-display text-xl text-cream">ЭкоТеплица</span>
          <div className="flex gap-6 text-sm font-body">
            {NAV_LINKS.slice(0, 4).map((l) => (
              <a key={l.href} href={l.href} className="hover:text-cream transition-colors">
                {l.label}
              </a>
            ))}
          </div>
          <p className="text-xs font-body">© 2024 ЭкоТеплица. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
}