const cursor = document.querySelector('.cursor');

// Функция для включения/выключения кастомного курсора
function toggleCustomCursor(enable) {
    if (enable) {
        document.body.style.cursor = 'none'; // Скрываем стандартный курсор
        cursor.style.display = 'block'; // Показываем кастомный курсор
    } else {
        document.body.style.cursor = 'auto'; // Восстанавливаем стандартный курсор
        cursor.style.display = 'none'; // Скрываем кастомный курсор
    }
}

// Переменная для хранения состояния инструментов разработчика
let devToolsOpen = false;

// Функция для проверки, открыты ли инструменты разработчика
function checkDevTools() {
    const widthThreshold = window.outerWidth - window.innerWidth > 160; // Порог для определения открытия инструментов
    const heightThreshold = window.outerHeight - window.innerHeight > 160; // Порог для определения открытия инструментов

    if (widthThreshold || heightThreshold) {
        if (!devToolsOpen) {
            devToolsOpen = true;
            toggleCustomCursor(false); // Отключаем кастомный курсор
        }
    } else {
        if (devToolsOpen) {
            devToolsOpen = false;
            toggleCustomCursor(true); // Включаем кастомный курсор
        }
    }
}

// Отслеживаем изменение размеров окна
window.addEventListener('resize', checkDevTools);

// Инициализация кастомного курсора
toggleCustomCursor(true);

// Движение кастомного курсора
document.addEventListener('mousemove', (e) => {
    cursor.style.left = `${e.pageX}px`;
    cursor.style.top = `${e.pageY}px`;
});

// Изменение размера курсора при нажатии мыши
document.addEventListener('mousedown', () => {
    cursor.style.width = '40px';
    cursor.style.height = '40px';
});

document.addEventListener('mouseup', () => {
    cursor.style.width = '40px';
    cursor.style.height = '40px';
});

// Анимация курсора при наведении на элементы с data-pointer
document.addEventListener('mouseover', (e) => {
    if (e.target.hasAttribute('data-pointer')) {
        cursor.classList.remove('shrink'); 
        cursor.classList.add('expand'); 
    }
});

document.addEventListener('mouseout', (e) => {
    if (e.target.hasAttribute('data-pointer')) {
        cursor.classList.remove('expand'); 
        cursor.classList.add('shrink'); 
    }
});

// Анимация появления блоков
const siteContainers = document.querySelectorAll('.site-container');
const appearOptions = { threshold: 0.6 };

const appearOnScroll = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        const block = entry.target.querySelector('.block');
        if (entry.isIntersecting) {
            block.style.opacity = '1';
            block.style.transform = `translateX(0)`;
        } else {
            if (!entry.isIntersecting) {
                if (entry.target.classList.contains('sites__site1-wrap') ||
                    entry.target.classList.contains('sites__site3-wrap') ||
                    entry.target.classList.contains('sites__site5-wrap')) {
                    block.style.transform = `translateX(-100%)`;
                } else {
                    block.style.transform = `translateX(100%)`;
                }
                block.style.opacity = '0';
            }
        }
    });
}, appearOptions);

siteContainers.forEach(container => {
    appearOnScroll.observe(container);
});