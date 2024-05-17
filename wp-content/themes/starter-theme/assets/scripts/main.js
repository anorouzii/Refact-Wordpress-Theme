"use strict";

/* eslint-env browser */
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    // Active menu items with scrolling
    var header = document.querySelector('.header');
    var sections = document.querySelectorAll('section[id]');
    var navItems = document.querySelectorAll('.nav__item');
    function onScroll() {
      var scrollPosition = window.scrollY;
      var stickyClass = 'sticky';
      var desktopVersion = window.innerWidth >= 992;
      if (scrollPosition > 60 && desktopVersion) {
        header.classList.add(stickyClass);
      } else {
        header.classList.remove(stickyClass);
      }
      sections.forEach(function (section) {
        var sectionTop = section.offsetTop - header.offsetHeight;
        var sectionHeight = section.offsetHeight;
        var sectionId = section.getAttribute('id');
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          navItems.forEach(function (item) {
            item.classList.remove('active');
          });
          document.querySelector(".nav__link[href=\"#".concat(sectionId, "\"]")).parentNode.classList.add('active');
        }
      });
    }
    window.addEventListener('scroll', onScroll);
    window.dispatchEvent(new Event('scroll'));

    // Toggle mobile navigation
    var toggleButton = document.querySelector('.nav__toggle');
    var navList = document.querySelector('.nav__list');
    toggleButton.addEventListener('click', function () {
      navList.classList.toggle('show');
      toggleButton.classList.toggle('active');
      document.body.classList.toggle('no-scroll');
    });

    // Close menu when a nav item is clicked
    navItems.forEach(function (item) {
      item.addEventListener('click', function () {
        navList.classList.remove('show');
        toggleButton.classList.remove('active');
        document.body.classList.remove('no-scroll');
      });
    });
    // Menu tabs
    var tabs = document.querySelectorAll('.menu__tab');
    var tabContents = document.querySelectorAll('.menu__content');
    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        var tabId = tab.getAttribute('data-tab');
        tabContents.forEach(function (content) {
          content.classList.remove('active');
        });
        tabs.forEach(function (t) {
          t.classList.remove('active');
        });
        document.getElementById(tabId).classList.add('active');
        tab.classList.add('active');
      });
    });

    // Popular Dished Carousel
    var elem = document.querySelector('.popular-dishes__carousel');
    var flkty = new Flickity(elem, {
      fullscreen: true,
      prevNextButtons: false,
      pageDots: false,
      lazyLoad: true
    });

    // Navigation buttons
    var prevButton = document.querySelector('.popular-dishes__navigation-prev');
    var nextButton = document.querySelector('.popular-dishes__navigation-next');
    prevButton.addEventListener('click', function () {
      flkty.previous();
    });
    nextButton.addEventListener('click', function () {
      flkty.next();
    });

    // Slide counter

    var sliderCounter = document.querySelector('.popular-dishes__navigation-counter');
    var totalSlides = flkty.slides.length;
    sliderCounter.innerHTML = "<span>1</span> / ".concat(totalSlides);
    flkty.on('change', function (index) {
      sliderCounter.innerHTML = "<span>".concat(index + 1, "</span> / ").concat(totalSlides);
      // Disable navigation buttons on first and last slide
      if (index === 0) {
        prevButton.disabled = true;
      } else {
        prevButton.disabled = false;
      }
      if (index === totalSlides - 1) {
        nextButton.disabled = true;
      } else {
        nextButton.disabled = false;
      }
    });

    // Copyright text
    var currentYear = new Date().getFullYear();
    document.querySelector('.copyright__year').innerText = currentYear;
  });
})();