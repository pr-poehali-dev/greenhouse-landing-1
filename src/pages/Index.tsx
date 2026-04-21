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

const MODELS = [
  {
    name: "«Дачница»",
    size: "3 × 4 м",
    price: "от 28 000 ₽",
    desc: "Компактная теплица для небольшого участка. Поликарбонат 4 мм, оцинкованный каркас.",
    icon: "Sprout",
    features: ["Форточка для проветривания", "Двойная дверь", "Монтаж за 1 день"],
    popular: false,
  },
  {
    name: "«Усадьба»",
    size: "3 × 6 м",
    price: "от 48 000 ₽",
    desc: "Оптимальный выбор для семьи. Поликарбонат 6 мм, усиленный каркас, автополив.",
    icon: "TreePine",
    features: ["Автоматические форточки", "Система капельного полива", "Доп. секция"],
    popular: true,
  },
  {
    name: "«Фермер»",
    size: "4 × 8 м",
    price: "от 82 000 ₽",
    desc: "Профессиональная теплица для больших урожаев. Поликарбонат 8 мм, зимний вариант.",
    icon: "Warehouse",
    features: ["Зимний обогрев", "Стеллажи в комплекте", "Гарантия 5 лет"],
    popular: false,
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
    name: "Наталья К.",
    location: "Подмосковье",
    text: "Заказала «Усадьбу» в прошлом году. Собрали за один день, всё аккуратно и без мусора. Огурцы и томаты уже с мая!",
    rating: 5,
  },
  {
    name: "Сергей М.",
    location: "Серпухов",
    text: "Брал «Фермер» для зимнего выращивания зелени. Теплица держит тепло отлично, каркас не поведло даже при −35. Рекомендую.",
    rating: 5,
  },
  {
    name: "Ирина В.",
    location: "Дмитров",
    text: "Очень внимательные менеджеры, помогли выбрать размер. Монтажники — молодцы, всё объяснили. Теплица стоит как влитая.",
    rating: 5,
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
              <p className="font-display text-5xl text-cream font-semibold">12+</p>
              <p className="text-cream/70 mt-1 font-body text-sm">лет на рынке</p>
              <div className="mt-4 pt-4 border-t border-cream/20">
                <p className="font-display text-5xl text-cream font-semibold">2 400+</p>
                <p className="text-cream/70 mt-1 font-body text-sm">довольных клиентов</p>
              </div>
              <div className="mt-4 pt-4 border-t border-cream/20">
                <p className="font-display text-5xl text-cream font-semibold">1 день</p>
                <p className="text-cream/70 mt-1 font-body text-sm">монтаж под ключ</p>
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
            <p className="text-foreground/70 text-lg mb-5 font-body">
              С 2012 года помогаем садоводам по всей России получать богатый урожай независимо от
              капризов погоды. Используем только проверенные материалы и комплектующие.
            </p>
            <p className="text-foreground/70 text-lg mb-8 font-body">
              Каждая теплица — это результат разговора с клиентом: мы учитываем размер участка,
              климат региона, задачи и бюджет.
            </p>
            <div className="flex flex-wrap gap-6">
              {[["12+", "лет опыта"], ["2 400+", "проектов"], ["48", "регионов"], ["100%", "гарантия"]].map(([val, lbl]) => (
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
          <div className="text-center mb-14">
            <span className="text-moss text-sm tracking-widest uppercase font-body">Каталог</span>
            <h2 className="font-display text-4xl md:text-5xl font-light mt-3 text-bark">
              Модели теплиц
            </h2>
            <p className="text-foreground/60 mt-3 font-body">
              Стандартные размеры в наличии. Нестандартные — под заказ.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {MODELS.map((m) => (
              <div
                key={m.name}
                className={`relative rounded-2xl border p-7 flex flex-col ${
                  m.popular
                    ? "border-moss bg-moss/5 shadow-lg"
                    : "border-sand bg-cream"
                }`}
              >
                {m.popular && (
                  <span className="absolute -top-3 left-6 bg-moss text-cream text-xs px-3 py-1 rounded-full font-body font-medium">
                    Популярная
                  </span>
                )}
                <div className="w-12 h-12 rounded-xl bg-moss/10 flex items-center justify-center mb-5">
                  <Icon name={m.icon} size={24} className="text-moss" fallback="Leaf" />
                </div>
                <h3 className="font-display text-2xl font-semibold text-bark mb-1">{m.name}</h3>
                <p className="text-moss text-sm font-body mb-3">{m.size}</p>
                <p className="text-foreground/65 text-sm font-body mb-5 flex-1">{m.desc}</p>
                <ul className="space-y-2 mb-6">
                  {m.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm font-body text-foreground/70">
                      <Icon name="Check" size={14} className="text-moss flex-shrink-0" fallback="Check" />
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="flex items-center justify-between">
                  <span className="font-display text-2xl font-semibold text-bark">{m.price}</span>
                  <a
                    href="#contacts"
                    className={`text-sm px-4 py-2 rounded-md font-body transition-colors ${
                      m.popular
                        ? "bg-moss text-cream hover:bg-leaf"
                        : "border border-moss text-moss hover:bg-moss hover:text-cream"
                    }`}
                  >
                    Заказать
                  </a>
                </div>
              </div>
            ))}
          </div>
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
                className="rounded-2xl p-7 border border-sand"
                style={{ backgroundColor: "hsl(42,20%,93%)" }}
              >
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: r.rating }).map((_, i) => (
                    <span key={i} className="text-amber-500 text-sm">★</span>
                  ))}
                </div>
                <p className="text-foreground/75 font-body text-sm leading-relaxed mb-5 italic">
                  «{r.text}»
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-moss/20 flex items-center justify-center">
                    <Icon name="User" size={16} className="text-moss" fallback="User" />
                  </div>
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

      {/* CONTACTS / FORM */}
      <section id="contacts" className="py-24 bg-cream">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-16 items-start">
          <div>
            <span className="text-moss text-sm tracking-widest uppercase font-body">Заявка</span>
            <h2 className="font-display text-4xl md:text-5xl font-light mt-3 mb-5 text-bark">
              Оставьте заявку —<br />
              <em className="italic">перезвоним за час</em>
            </h2>
            <p className="text-foreground/65 font-body mb-8">
              Подберём модель, рассчитаем стоимость, ответим на все вопросы. Бесплатно и без обязательств.
            </p>
            <div className="space-y-5">
              {[
                { icon: "Phone", text: "+7 (800) 000-00-00", sub: "Бесплатно по России" },
                { icon: "Mail", text: "info@ecoteplitsa.ru", sub: "Отвечаем в течение часа" },
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
          </div>

          <div
            className="rounded-2xl border border-sand p-8"
            style={{ backgroundColor: "hsl(42,20%,93%)" }}
          >
            {submitted ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-moss/15 rounded-full flex items-center justify-center mx-auto mb-5">
                  <Icon name="CheckCircle" size={32} className="text-moss" fallback="CheckCircle" />
                </div>
                <h3 className="font-display text-2xl font-semibold text-bark mb-3">Заявка принята!</h3>
                <p className="text-foreground/65 font-body">
                  Мы перезвоним вам в течение часа в рабочее время.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-body font-medium text-bark/70 mb-1.5 uppercase tracking-wide">
                      Имя *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Иван Петров"
                      className="w-full bg-cream border border-sand rounded-md px-4 py-2.5 text-sm font-body text-foreground placeholder:text-foreground/35 focus:outline-none focus:border-moss transition-colors"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-body font-medium text-bark/70 mb-1.5 uppercase tracking-wide">
                      Телефон *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+7 (___) ___-__-__"
                      className="w-full bg-cream border border-sand rounded-md px-4 py-2.5 text-sm font-body text-foreground placeholder:text-foreground/35 focus:outline-none focus:border-moss transition-colors"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-body font-medium text-bark/70 mb-1.5 uppercase tracking-wide">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="ivan@mail.ru"
                    className="w-full bg-cream border border-sand rounded-md px-4 py-2.5 text-sm font-body text-foreground placeholder:text-foreground/35 focus:outline-none focus:border-moss transition-colors"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-xs font-body font-medium text-bark/70 mb-1.5 uppercase tracking-wide">
                    Модель теплицы
                  </label>
                  <select
                    className="w-full bg-cream border border-sand rounded-md px-4 py-2.5 text-sm font-body text-foreground focus:outline-none focus:border-moss transition-colors"
                    value={form.model}
                    onChange={(e) => setForm({ ...form, model: e.target.value })}
                  >
                    <option value="">Выберите модель...</option>
                    <option>«Дачница» 3 × 4 м</option>
                    <option>«Усадьба» 3 × 6 м</option>
                    <option>«Фермер» 4 × 8 м</option>
                    <option>Нестандартный размер</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-body font-medium text-bark/70 mb-2 uppercase tracking-wide">
                    Что для вас важно?{" "}
                    <span className="normal-case text-foreground/40">(выберите несколько)</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {PRIORITIES.map((p) => (
                      <button
                        type="button"
                        key={p}
                        onClick={() => togglePriority(p)}
                        className={`text-xs font-body px-3 py-1.5 rounded-full border transition-colors ${
                          form.priorities.includes(p)
                            ? "bg-moss text-cream border-moss"
                            : "bg-cream text-foreground/65 border-sand hover:border-sage"
                        }`}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full bg-moss text-cream py-3 rounded-md font-body font-medium hover:bg-leaf transition-colors mt-2"
                >
                  Отправить заявку
                </button>
                <p className="text-center text-xs text-foreground/40 font-body">
                  Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

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