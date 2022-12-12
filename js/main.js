'use strict';

// ------------------------- Swipers --------------------------

let swiper1 = new Swiper(".mySwiperTarifs", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    coverflowEffect: {
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
});

let swiper2 = new Swiper(".mySwiperTest", {
    effect: "flip",
    grabCursor: true,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
});

let swiper3 = new Swiper(".mySwiperSteps", {
    slidesPerView: 3,
    spaceBetween: 0,
    slidesPerGroup: 1,
    loop: false,
    loopFillGroupWithBlank: true,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    breakpoints: {
        320: {
            slidesPerView: 1,
            grabCursor: true,
        },
        586: {
            slidesPerView: 2,
        },
        868: {
            slidesPerView: 3,
            grabCursor: false,
        },
    },
});

// ----------------------- Plane --------------------------

plane.onclick = function () {

    this.onclick = null;
    let times = 1;

    function go() {
        if (times % 2) {
            plane.classList.remove('back');
            plane.style.marginLeft = 10 * times + 200 + 'px';
        } else {
            plane.classList.add('back');
            plane.style.marginLeft = 10 * times - 200 + 'px';
        }
    }

    go();

    plane.addEventListener('transitionend', function () {
        times++;
        go();
    });
}

// ------------ Animation Scroll ----------

const animeItems = document.querySelectorAll('.anime');

if (animeItems.length > 0) {
    window.addEventListener('scroll', animeOnScroll);

    function animeOnScroll() {
        for (let i = 0; i < animeItems.length; i++) {
            const animeItem = animeItems[i];
            const animeItemHeight = animeItem.offsetHeight;
            const animeItemOffset = offset(animeItem).top;
            const animeStart = 4;

            let animeItemPoint = window.innerHeight - animeItemHeight / animeStart;
            if (animeItemHeight > window.innerHeight) {
                animeItemPoint = window.innerHeight - window.innerHeight / animeStart;
            }

            if ((scrollY > animeItemOffset - animeItemPoint) && scrollY < (animeItemOffset + animeItemHeight)) {
                animeItem.classList.add('active');
            } else {
                if (!animeItem.classList.contains('anime_no_hide')) {
                    animeItem.classList.remove('active');
                }
            }
        }
    }

    function offset(el) {
        const rect = el.getBoundingClientRect(),
            scrollLeft = window.scrollX || document.documentElement.scrollLeft,
            scrollTop = window.scrollY || document.documentElement.scrollTop;
        return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
    }

    setTimeout(() => {
        animeOnScroll();
    }, 300);
}

// ------------------------ Dark Theme ---------------------------

let changeThemeButtons = document.querySelectorAll('.changeTheme');

changeThemeButtons.forEach(button => {
    button.addEventListener('click', function () {
        let theme = this.dataset.theme;
        applyTheme(theme);
    });
});

function applyTheme(themeName) {
    document.querySelector('[title="theme"]').setAttribute('href', `css/theme-${themeName}.css`);
    changeThemeButtons.forEach(button => {
        button.style.display = 'block';
    });
    document.querySelector(`[data-theme="${themeName}"]`).style.display = 'none';
    localStorage.setItem('theme', themeName);
}

let activeTheme = localStorage.getItem('theme');

if (activeTheme === null || activeTheme === 'light') {
    applyTheme('light');
} else if (activeTheme === 'dark') {
    applyTheme('dark');
}

// ----------------------- Popup --------------------

let popupBgSign = document.querySelector('.popup__bg_sign');
let popupSign = document.querySelector('.popup_sign');
let popupBgReg = document.querySelector('.popup__bg_reg');
let popupReg = document.querySelector('.popup_reg');
let openPopupSignButton = document.querySelector('.menu__sign');
let openPopupRegButton = document.querySelector('.menu__join');
let closePopupSignButton = document.querySelector('.popup__close_sign');
let closePopupRegButton = document.querySelector('.popup__close_reg');

openPopupSignButton.addEventListener('click',(el) => {
    el.preventDefault();
    popupBgSign.classList.add('active');
    popupSign.classList.add('active');
});

openPopupRegButton.addEventListener('click',(el) => {
    el.preventDefault();
    popupBgReg.classList.add('active');
    popupReg.classList.add('active');
});

closePopupSignButton.addEventListener('click',() => {
    popupBgSign.classList.remove('active');
    popupSign.classList.remove('active');
});

closePopupRegButton.addEventListener('click',() => {
    popupBgReg.classList.remove('active');
    popupReg.classList.remove('active');
});

document.addEventListener('click', (el) => {
    if (el.target === popupBgSign || el.target === popupBgReg) {
        popupBgSign.classList.remove('active');
        popupSign.classList.remove('active');
        popupBgReg.classList.remove('active');
        popupReg.classList.remove('active');
    }
});