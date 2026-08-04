export type Language = 'ro' | 'ru';

export const translations = {
  ro: {
    // Header
    adminPanel: 'Admin Panel',
    realty: 'Imobiliare Strășeni',
    logout: 'Delogare',
    back: '← Înapoi la site',

    // Login
    email: 'Email',
    password: 'Parolă',
    loginButton: 'Intru în Admin',
    invalidCredentials: 'Email sau parolă incorectă',
    authError: 'Eroare la autentificare',

    // Properties
    properties: 'Proprietăți',
    manageProperties: 'Gestionare Proprietăți',
    total: 'Total',
    available: 'disponibile',
    addProperty: '+ Adaug proprietate',
    cancel: '✕ Anulează',
    editProperty: 'Editare proprietate',
    addNewProperty: 'Adaug proprietate nouă',
    save: '✓ Salvează',
    delete: '🗑️ Șterge',
    edit: '✏️ Editează',
    sold: 'SOLD',
    available_btn: 'Disponibil',
    markAsSold: 'Marchează ca SOLD',
    uploadImages: 'Încarcă imagini',
    deleteConfirm: 'Sigur dorești să ștergi această proprietate?',
    propertyAdded: '✓ Proprietate adăugată',
    propertyUpdated: '✓ Proprietate actualizată',
    propertyDeleted: '✓ Proprietate ștearsă',
    deleteError: 'Eroare la ștergere',
    timeout: 'Timeout - serverul nu a răspuns. Încearcă din nou.',
    video: 'Video',
    views: 'vizualizări',

    // Leads
    leads: 'Leads',
    noLeads: 'Nici un lead în așteptare',
    property: 'Proprietate',
    contact: 'Contact',
    location: 'Locație',
    approve: '✓ Aprobă',
    reject: '✕ Respinge',
    leadApproved: '✓ Lead aprobat și proprietate adăugată',
    leadRejected: '✓ Lead respins',
    leadError: 'Eroare la aprobare',

    // Form fields
    title: 'Titlu proprietate',
    type: 'Tip',
    house: 'Casă',
    apartment: 'Apartament',
    land: 'Teren',
    commercial: 'Spațiu comercial',
    address: 'Adresă',
    locality: 'Localitate',
    price: 'Preț (EUR)',
    area: 'Suprafață (mp)',
    description: 'Descriere',
    videoUrl: 'URL Video (optional)',
    rooms: 'Camere',
    landArea: 'Suprafață teren (mp)',
    year: 'An construcție',
    condition: 'Stare',
    heating: 'Încălzire',
    roadAccess: 'Acces drum',
    emailPlaceholder: 'your@email.com',
    conditionGood: 'Bună',
    conditionVeryGood: 'Foarte bună',
    conditionNew: 'Nouă',
    conditionRenovation: 'De renovat',

    // Filters
    filters: 'Filtre',
    filterByType: 'Tip',
    filterByLocation: 'Localitate',
    filterByPrice: 'Preț',
    showSold: 'Arată SOLD',
    showAvailable: 'Arată Disponibile',
    reset: 'Resetează',

    // Validation
    fillRequired: 'Completează toate câmpurile obligatorii',
    error: 'Eroare',

    // Dashboard
    dashboard: 'Dashboard',
    soldUnavailable: 'Vândut/Indisponibil',
    awaitingReview: 'În curs de examinare',
    acrossAllProperties: 'Peste toate proprietățile',
    pending: 'În așteptare',
    topPropertiesByViews: 'Proprietăți cele mai vizionate',
    totalViews: 'Total vizualizări',
  },

  ru: {
    // Header
    adminPanel: 'Панель администратора',
    realty: 'Недвижимость Штрэсены',
    logout: 'Выход',
    back: '← Вернуться на сайт',

    // Login
    email: 'Email',
    password: 'Пароль',
    loginButton: 'Войти в админ',
    invalidCredentials: 'Неверный email или пароль',
    authError: 'Ошибка аутентификации',

    // Properties
    properties: 'Объекты недвижимости',
    manageProperties: 'Управление объектами',
    total: 'Всего',
    available: 'доступных',
    addProperty: '+ Добавить объект',
    cancel: '✕ Отмена',
    editProperty: 'Редактирование объекта',
    addNewProperty: 'Добавить новый объект',
    save: '✓ Сохранить',
    delete: '🗑️ Удалить',
    edit: '✏️ Редактировать',
    sold: 'ПРОДАНО',
    available_btn: 'Доступно',
    markAsSold: 'Отметить как ПРОДАНО',
    uploadImages: 'Загрузить изображения',
    deleteConfirm: 'Вы уверены, что хотите удалить этот объект?',
    propertyAdded: '✓ Объект добавлен',
    propertyUpdated: '✓ Объект обновлен',
    propertyDeleted: '✓ Объект удален',
    deleteError: 'Ошибка удаления',
    timeout: 'Timeout - сервер не ответил. Попробуйте еще раз.',
    video: 'Видео',
    views: 'просмотров',

    // Leads
    leads: 'Заявки',
    noLeads: 'Нет ожидающих заявок',
    property: 'Объект',
    contact: 'Контакт',
    location: 'Местоположение',
    approve: '✓ Одобрить',
    reject: '✕ Отклонить',
    leadApproved: '✓ Заявка одобрена и объект добавлен',
    leadRejected: '✓ Заявка отклонена',
    leadError: 'Ошибка одобрения',

    // Form fields
    title: 'Название объекта',
    type: 'Тип',
    house: 'Дом',
    apartment: 'Квартира',
    land: 'Земля',
    commercial: 'Коммерческое помещение',
    address: 'Адрес',
    locality: 'Местоположение',
    price: 'Цена (EUR)',
    area: 'Площадь (м²)',
    description: 'Описание',
    videoUrl: 'Ссылка видео (опционально)',
    rooms: 'Комнаты',
    landArea: 'Площадь земли (м²)',
    year: 'Год постройки',
    condition: 'Состояние',
    heating: 'Отопление',
    roadAccess: 'Доступ на дорогу',
    emailPlaceholder: 'your@email.com',
    conditionGood: 'Хорошее',
    conditionVeryGood: 'Очень хорошее',
    conditionNew: 'Новое',
    conditionRenovation: 'Требует ремонта',

    // Filters
    filters: 'Фильтры',
    filterByType: 'Тип',
    filterByLocation: 'Местоположение',
    filterByPrice: 'Цена',
    showSold: 'Показать ПРОДАНО',
    showAvailable: 'Показать Доступные',
    reset: 'Сброс',

    // Validation
    fillRequired: 'Заполните все необходимые поля',
    error: 'Ошибка',

    // Dashboard
    dashboard: 'Панель управления',
    soldUnavailable: 'Продано/Недоступно',
    awaitingReview: 'Ожидание проверки',
    acrossAllProperties: 'Во всех объектах',
    pending: 'Ожидание',
    topPropertiesByViews: 'Топ объектов по просмотрам',
    totalViews: 'Всего просмотров',
  }
};

export const getTranslation = (lang: Language, key: keyof typeof translations.ro): string => {
  return translations[lang][key] || key;
};
