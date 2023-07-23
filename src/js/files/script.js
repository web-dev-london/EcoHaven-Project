// Подключение функционала "Чертогов Фрилансера"
import { isMobile } from './functions.js';
// Подключение списка активных модулей
import { flsModules } from './modules.js';

// import Swiper bundle with all modules installed
import Swiper, { Navigation } from 'swiper';

// import styles bundle
import 'swiper/css/bundle';

// init Swiper:
const swiper = new Swiper('.swiper', {
  modules: [Navigation],

  slidesPerView: 1,
  spaceBetween: 20,

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  breakpoints: {
    640: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    1024: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
  },
});

/* Reuseable functions */

const addEventOnElem = function (elem, type, callback) {
  if (elem.length > 1) {
    for (let i = 0; i < elem.length; i++) {
      elem[i].addEventListener(type, callback);
    }
  } else {
    elem.addEventListener(type, callback);
  }
};

const iconToggle = document.querySelector(
  '[data-toggler]',
);
const navbar = document.querySelector('[data-navbar]');

const toggleNav = function () {
  iconToggle.classList.toggle('active');
  navbar.classList.toggle('active');
};
addEventOnElem(iconToggle, 'click', toggleNav);

// Tabs

const tabButtons = document.querySelectorAll(
  '.explore__tab-btn',
);
const tabContents = document.querySelectorAll(
  '.explore__tab-content',
);

tabButtons.forEach((button) => {
  button.addEventListener('click', () => {
    // Remove active class from all buttons and contents
    tabButtons.forEach((btn) =>
      btn.classList.remove('active'),
    );
    tabContents.forEach((content) =>
      content.classList.remove('active'),
    );

    // Add active class to clicked button and corresponding content
    button.classList.add('active');
    const targetTab = button.getAttribute('data-tab');
    document
      .getElementById(targetTab)
      .classList.add('active');
  });
});

// Tabs
function accordion() {
  const items = document.querySelectorAll(
    '.questions__item-trigger',
  );
  items.forEach((item) => {
    item.addEventListener('click', () => {
      const parent = item.parentNode;
      if (
        parent.classList.contains(
          'accordion__item-active',
        )
      ) {
        parent.classList.remove('accordion__item-active');
      } else {
        document
          .querySelectorAll('.questions__accordion-item')
          .forEach((child) =>
            child.classList.remove(
              'accordion__item-active',
            ),
          );
        parent.classList.add('accordion__item-active');
      }
    });
  });
}
accordion();

/* Collapsible Toggler */

const collapsible = document.querySelectorAll(
  '.footer__toggler',
);

function toggleCollapsible() {
  collapsible.forEach((element) => {
    element.addEventListener('click', function () {
      this.classList.toggle('active');
      let content = this.nextElementSibling;
      if (content.style.display === 'block') {
        content.style.display = 'none';
      } else {
        content.style.display = 'block';
      }
    });
  });
}
toggleCollapsible(collapsible);

/* Toggled Heart Buttons */

const heartBtn = document.querySelectorAll('.fa-heart');

const toggleHeart = (elem) => {
  elem.forEach((item) => {
    item.addEventListener('click', () => {
      if (item.classList.contains('fa-regular')) {
        item.classList.remove('fa-regular');
        item.classList.add('fa-solid');
      } else {
        item.classList.add('fa-regular');
        item.classList.remove('fa-solid');
      }
    });
  });
};
toggleHeart(heartBtn);

/* Image slider */

function setUpCarousel(carousel) {
  const carouselContent = carousel.querySelector(
    '[data-slider__content]',
  );

  const btnPreview = carousel.querySelector(
    '[data-btn__left]',
  );
  const btnNext = carousel.querySelector(
    '[data-btn__right]',
  );

  let sliderPosition = 0;
  const numSlides = carouselContent.children.length;

  function handleNext() {
    sliderPosition++;
    carousel.style.setProperty(
      '--current-slide',
      sliderPosition,
    );

    sliderEnd();
  }

  function handlePrev() {
    sliderPosition--;
    carousel.style.setProperty(
      '--current-slide',
      sliderPosition,
    );
    sliderEnd();
  }

  function sliderEnd() {
    if (sliderPosition >= numSlides - 1) {
      btnNext.classList.add('disabled');
    } else {
      btnNext.classList.remove('disabled');
    }

    if (sliderPosition <= 0) {
      btnPreview.classList.add('disabled');
    } else {
      btnPreview.classList.remove('disabled');
    }
  }

  sliderEnd();

  btnNext.addEventListener('click', handleNext);
  btnPreview.addEventListener('click', handlePrev);
}

const carousel = document.querySelectorAll(
  '[data-slider__wrapper]',
);

carousel.forEach(setUpCarousel);
