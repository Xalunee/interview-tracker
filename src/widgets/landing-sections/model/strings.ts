export const LANDING_STRINGS = {
  nav: {
    logo: 'Interview Tracker',
    links: [
      { label: 'Возможности', href: '#features' },
      { label: 'Как работает', href: '#how' },
      { label: 'Вопросы', href: '#faq' },
    ],
    signIn: 'Войти',
    cta: 'Начать бесплатно',
  },
  hero: {
    badge: 'Сейчас в бета-версии',
    title: 'Отслеживай каждое интервью.\nПолучи следующий оффер.',
    subtitle:
      'Личный дашборд для поиска работы. Компании, этапы, вопросы, аналитика — всё в одном месте. Создан для senior-разработчиков.',
    primaryCta: 'Начать бесплатно →',
    secondaryCta: 'Смотреть демо',
    disclaimer: 'Без кредитной карты. Настройка за 30 секунд.',
    kanban: {
      title: 'Мой поиск работы — Весна 2025',
      columns: [
        { label: 'Wishlist', stageKey: 'wishlist' },
        { label: 'HR-скрин', stageKey: 'hr-screen' },
        { label: 'Тех. раунд', stageKey: 'tech-round' },
        { label: 'Оффер', stageKey: 'offer' },
      ],
      cards: [
        { company: 'Яндекс', initial: 'Я', role: 'Senior Frontend', salary: '300–500к', column: 0 },
        { company: 'ВК', initial: 'В', role: 'Senior Frontend', salary: '250–400к', column: 0 },
        { company: 'Авито', initial: 'А', role: 'Senior Frontend', salary: '350–600к', column: 1 },
        { company: 'Т-Банк', initial: 'Т', role: 'Senior Frontend', salary: '400–700к', column: 2 },
        { company: 'Озон', initial: 'О', role: 'Senior Frontend', salary: '380–550к', column: 2 },
        { company: 'Сбер', initial: 'С', role: 'Senior Frontend', salary: '450–750к', column: 3 },
      ],
    },
  },
  socialProof: {
    label: 'Разработчики из компаний:',
    companies: ['Т-Банк', 'Яндекс', 'Озон', 'Авито', 'ВК', 'Сбер', 'Wildberries'],
  },
  problem: {
    title: 'Поиск работы — это хаос. Ваш трекер — нет.',
    subtitle: 'Три проблемы, которые знает каждый разработчик.',
    items: [
      {
        icon: 'Layers' as const,
        title: 'Потерялся в табах',
        description:
          '5 таблиц, 3 Notion-страницы, 100 вкладок. Не можете найти контакт HR, когда он нужен.',
      },
      {
        icon: 'BrainCircuit' as const,
        title: 'Забыл свои ответы',
        description:
          'Что вы отвечали на прошлой неделе в Яндексе? Надеетесь, помните — они зададут follow-up вопросы.',
      },
      {
        icon: 'TrendingDown' as const,
        title: 'Воронка? Какая воронка?',
        description:
          'Не знаете, где застряли — на HR-скрине или техническом. Без данных нельзя улучшить результат.',
      },
    ],
  },
  features: {
    title: 'Всё необходимое. Ничего лишнего.',
    subtitle: 'Шесть функций, которые превращают поиск работы из хаоса в систему.',
    main: [
      {
        number: '01',
        title: 'Канбан-доска',
        description: 'Перетаскивайте компании по этапам. От вишлиста до оффера.',
        bullets: [
          'Drag & drop с поддержкой клавиатуры',
          'Автоматическое определение логотипа',
          'Отслеживание зарплатной вилки',
        ],
        mockupType: 'kanban' as const,
        textLeft: true,
      },
      {
        number: '02',
        title: 'Банк вопросов',
        description: 'Каждый вопрос с каждого интервью. Доступен поиск и теги.',
        bullets: [
          'Поиск по всем интервью',
          'Теги по категории и сложности',
          'Отметить как изученный',
        ],
        mockupType: 'questions' as const,
        textLeft: false,
      },
      {
        number: '03',
        title: 'Дашборд аналитики',
        description: 'Реальная воронка конверсии. Среднее время до оффера. Топ вопросов.',
        bullets: [
          'Реальная воронка конверсии',
          'Сравнение со средним по рынку',
          'Отслеживание времени до оффера',
        ],
        mockupType: 'analytics' as const,
        textLeft: true,
      },
    ],
    compact: [
      {
        icon: 'NotebookPen' as const,
        title: 'Заметки к интервью',
        description:
          'Фиксируйте ответы, оценивайте себя, стройте личную базу знаний с каждого раунда.',
      },
      {
        icon: 'Bell' as const,
        title: 'Умные напоминания',
        description: 'Не пропустите follow-up. Чеклисты подготовки из ваших прошлых заметок.',
      },
      {
        icon: 'Command' as const,
        title: 'CMD+K поиск',
        description: 'Найдите любую компанию, вопрос или заметку за миллисекунды.',
      },
    ],
  },
  howItWorks: {
    title: 'Три шага. Без лишних усилий.',
    subtitle: 'От хаоса к ясности менее чем за минуту.',
    steps: [
      {
        number: '01',
        title: 'Добавьте компанию',
        description:
          'Вставьте ссылку на вакансию или заполните вручную. Должность, зарплата и контакты — в одном месте.',
      },
      {
        number: '02',
        title: 'Отслеживайте этапы',
        description:
          'Перемещайте карточки по мере прогресса. Сохраняйте вопросы и заметки после каждого раунда.',
      },
      {
        number: '03',
        title: 'Увидьте паттерны',
        description: 'Наблюдайте, как улучшается воронка. Найдите, что именно вас блокирует.',
      },
    ],
  },
  showcase: {
    title: 'Создан для того, как вы реально работаете.',
    subtitle: 'Реальная аналитика. Реальные паттерны. Реальный прогресс.',
    funnel: {
      title: 'Воронка конверсии',
      stages: [
        { label: 'Подано', count: 47, widthPct: 100, isOffer: false },
        { label: 'HR-скрин', count: 23, widthPct: 49, isOffer: false },
        { label: 'Тех. раунд', count: 12, widthPct: 26, isOffer: false },
        { label: 'Финал', count: 4, widthPct: 9, isOffer: false },
        { label: 'Оффер', count: 2, widthPct: 4, isOffer: true },
      ],
    },
    topQuestions: {
      title: 'Топ вопросов интервью',
      items: [
        { question: 'Расскажите о себе', percent: 89 },
        { question: 'Системное проектирование: масштабирование', percent: 71 },
        { question: 'Главная техническая ошибка', percent: 64 },
        { question: 'Почему уходите?', percent: 58 },
      ],
    },
    kpis: [
      {
        value: '4.3%',
        label: 'Конверсия офферов',
        sub: 'vs 2.1% в среднем по рынку',
      },
      {
        value: '28 дней',
        label: 'Среднее время до оффера',
        sub: 'Отслеживается по 6 воронкам',
      },
      {
        value: '143',
        label: 'Вопросов сохранено',
        sub: 'Из 18 раундов интервью',
      },
    ],
  },
  faq: {
    title: 'Вопросы',
    subtitle: 'Честные ответы. Без маркетинговых обещаний.',
    items: [
      {
        question: 'Мои данные в безопасности?',
        answer:
          'Да. Зарплаты, заметки, ответы на интервью — никогда не передаются третьим лицам. Шифрование в покое и при передаче.',
      },
      {
        question: 'Есть интеграция с LinkedIn или hh.ru?',
        answer:
          'Браузерное расширение в разработке. Пока — вставьте ссылку вручную, 15 секунд, автозаполнение того, что можно.',
      },
      {
        question: 'Могу экспортировать данные?',
        answer: 'В любой момент. JSON или CSV одним кликом. Ваши данные, без привязки.',
      },
      {
        question: 'Почему не Notion или таблицы?',
        answer:
          'Быстрее, красивее, создан именно для этой задачи. Ваш банк вопросов реально растёт.',
      },
      {
        question: 'Есть мобильное приложение?',
        answer: 'PWA скоро. Веб-приложение уже полностью адаптивно.',
      },
    ],
  },
  cta: {
    title: 'Готовы получить следующий оффер?',
    subtitle: 'Присоединяйтесь к разработчикам, которые превратили поиск работы в систему.',
    button: 'Начать бесплатно →',
    disclaimer: 'Без кредитной карты. Без обязательств.',
  },
  footer: {
    logo: 'Interview Tracker',
    tagline: 'Трекер заявок для senior-разработчиков.',
    columns: [
      {
        title: 'ПРОДУКТ',
        links: [
          { label: 'Возможности', href: '#features' },
          { label: 'Changelog', href: '#' },
          { label: 'Roadmap', href: '#' },
        ],
      },
      {
        title: 'РЕСУРСЫ',
        links: [
          { label: 'Документация', href: '#' },
          { label: 'Блог', href: '#' },
          { label: 'Статус', href: '#' },
        ],
      },
      {
        title: 'КОМПАНИЯ',
        links: [
          { label: 'О нас', href: '#' },
          { label: 'Карьера', href: '#' },
          { label: 'Контакты', href: '#' },
        ],
      },
      {
        title: 'ПРАВОВОЕ',
        links: [
          { label: 'Конфиденциальность', href: '#' },
          { label: 'Условия', href: '#' },
          { label: 'Безопасность', href: '#' },
        ],
      },
    ],
    copyright: '© 2025 Interview Tracker',
  },
} as const;
