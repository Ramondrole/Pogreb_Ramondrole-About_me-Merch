const merchTranslations = {
    ru: {
        title: "Купить мерч:",
        pronikTitle: "Мерч Проника:",
        disclaimer: "*то, что мерч вылазит за рамки на мобильных устройствах - это задумка автора*",
        about: "Обо мне",
        games: "Наши игры",
        functions: "Полезные функции"
    },
    en: {
        title: "Buy merch:",
        pronikTitle: "Pronik's merch:",
        disclaimer: "*the fact that the merch goes beyond the frame on mobile devices is the author's idea*",
        about: "About me",
        games: "Our games",
        functions: "Useful functions"
    },
    de: {
        title: "Merch kaufen:",
        pronikTitle: "Proniks Merch:",
        disclaimer: "*dass der Merch auf mobilen Geräten über den Rahmen hinausragt, ist die Idee des Autors*",
        about: "Über mich",
        games: "Unsere Spiele",
        functions: "Nützliche Funktionen"
    }
};

let currentLang = localStorage.getItem('merch_language') || 'ru';

function t(key) {
    return merchTranslations[currentLang]?.[key] || merchTranslations.ru[key];
}

function updateMerchUILanguage() {
    const elements = ['title', 'pronikTitle', 'disclaimer'];
    elements.forEach(key => {
        const el = document.getElementById(key === 'title' ? 'pageTitle' : key === 'pronikTitle' ? 'pronikTitle' : null);
        if (key === 'title') {
            const titleEl = document.getElementById('pageTitle');
            if (titleEl) titleEl.textContent = t(key);
        } else if (key === 'pronikTitle') {
            const pronikEl = document.getElementById('pronikTitle');
            if (pronikEl) pronikEl.textContent = t(key);
        } else if (key === 'disclaimer') {
            const disclaimerEl = document.querySelector('.disclaimer');
            if (disclaimerEl) disclaimerEl.textContent = t(key);
        }
    });
    
    const langBtn = document.getElementById('langBtn');
    if (langBtn) {
        const flags = { ru: '🌐 RU', en: '🌐 EN', de: '🌐 DE' };
        langBtn.innerHTML = flags[currentLang];
    }
    
    document.querySelectorAll('.nav-links a').forEach((link, idx) => {
        const keys = ['about', 'games', 'functions'];
        if (idx < keys.length) link.textContent = t(keys[idx]);
    });
    
    document.querySelectorAll('.merch-hover').forEach(el => {
        el.textContent = currentLang === 'ru' ? 'КУПИТЬ →' : currentLang === 'en' ? 'BUY →' : 'KAUFEN →';
    });
}

function changeLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('merch_language', lang);
    updateMerchUILanguage();
}

document.querySelectorAll('.lang-dropdown a').forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        const lang = item.getAttribute('data-lang');
        if (lang) changeLanguage(lang);
    });
});

updateMerchUILanguage();