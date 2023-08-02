$(function () {
  const burger = document.querySelector('.burger');
  const menu = document.querySelector('.menu__list');
  const body = document.querySelector('.body')

  function burgerMenu() {
    burger.classList.toggle("burger--active");
    menu.classList.toggle("menu__list--active");
    body.classList.toggle("lock");
  }

  burger.addEventListener('click', burgerMenu);

  $(".menu__link").on('click', burgerMenu)

  $(".menu__link, .logo, .menu__contacts-link--apartment").on("click", function (event) {
    event.preventDefault();
    var id = $(this).attr('href'),
      top = $(id).offset().top;
    $('body,html').animate({ scrollTop: top }, 1000);
  });

  $(window).on('scroll', function () {
    $('.header').toggleClass('scroll', $(window).scrollTop() > 0);
  });


  // CALCULATOR LOGIC

  var $realEstateRange = $(".calculator__form-input");
  var $realEstateInput = $(".calculator__input--real");

  var $depositRange = $(".calculator__input-deposit");
  var $depositInput = $(".calculator__input--deposit");

  var monthlyDeposit = $(".calculator__deposit-input");

  $realEstateRange.ionRangeSlider({
    skin: "round",
    type: "single",
    postfix: " ₴",
    grid: true,
    step: 50000,

    onStart: function (data) {
      $realEstateInput.prop("value", data.from.toLocaleString() + " ₴");
      updateMonthlyDeposit();
    },
    onChange: function (data) {
      $realEstateInput.prop("value", data.from.toLocaleString() + " ₴");
      updateMonthlyDeposit();
    }
  });

  $depositRange.ionRangeSlider({
    skin: "round",
    type: "single",
    postfix: " ₴",
    grid: true,
    step: 50000,

    onStart: function (data) {
      $depositInput.prop("value", data.from.toLocaleString() + " ₴");
      $(".calculator__deposit-input").prop("value", "400 000" + " ₴");
      updateMonthlyDeposit();
    },
    onChange: function (data) {
      $depositInput.prop("value", data.from.toLocaleString() + " ₴");
      updateMonthlyDeposit();
    }
  });

  function updateMonthlyDeposit() {
    var realEstateValue = parseInt($realEstateRange.prop("value").replace(/\D/g, ''));
    var initialDepositValue = parseInt($depositRange.prop("value").replace(/\D/g, ''));

    var monthlyDepositValue = (realEstateValue + initialDepositValue) / 30;

    monthlyDeposit.prop("value", Math.trunc(monthlyDepositValue).toLocaleString() + " ₴");
  }

  // SLIDER MOBILE
  $(window).on("load resize", function () {
    if ($(window).width() < 820) {
      $(".apartaments__content:not(.slick-initialized)").slick({
        arrows: false,
        dots: true,
        infinite: true,
        speed: 100,
        slidesToShow: 1
      });
    } else {
      $(".apartaments__content.slick-initialized").slick("unslick");
    }
  });
});

new Swiper('.events__content', {
  loop: true,

  pagination: {
    el: '.pagination',
    clickable: true,
    bulletElement: 'button',
  },
  navigation: {
    prevEl: '.events__arrow--prev',
    nextEl: '.events__arrow--next',
  },
  keyboard: {
    enabled: true,
    onlyInViewport: false,
  },
  mousewheel: {
    invert: true,
  },
  breakpoints: {
    1200: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
    992: {
      slidesPerView: 2,
      spaceBetween: 15,
    },
    768: {
      slidesPerView: 2,
    },
    576: {
      slidesPerView: 1,
    },
    300: {
      slidesPerView: 1,
    }
  }
});



