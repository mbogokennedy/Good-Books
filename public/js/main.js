(($) => {
  /*--------------------------
  preloader
  ---------------------------- */
  $(window).on('load', () => {
    const preLoader = $('#preloader');
    preLoader.fadeOut('slow', () => {
      $(this).remove();
    });
  });

  /*---------------------
   TOP Menu Stick
  --------------------- */
  const s = $('#sticker');
  const pos = s.position();
  $(window).on('scroll', () => {
    const windowpos = $(window).scrollTop() > 300;
    if (windowpos > pos.top) {
      s.addClass('stick');
    } else {
      s.removeClass('stick');
    }
  });

  /*----------------------------
   Navbar nav
  ------------------------------ */
  const mainMenu = $('.main-menu ul.navbar-nav li ');
  mainMenu.on('click', () => {
    mainMenu.removeClass('active');
    $(this).addClass('active');
  });

  /*----------------------------
   wow js active
  ------------------------------ */
  new WOW().init();

  $('.navbar-collapse a:not(.dropdown-toggle)').on('click', () => {
    $('.navbar-collapse.collapse').removeClass('in');
  });

  //---------------------------------------------
  // Nivo slider
  //---------------------------------------------
  $('#ensign-nivoslider').nivoSlider({
    effect: 'random',
    slices: 15,
    boxCols: 12,
    boxRows: 8,
    animSpeed: 500,
    pauseTime: 5000,
    startSlide: 0,
    directionNav: true,
    controlNavThumbs: false,
    pauseOnHover: true,
    manualAdvance: false,
  });

  /*----------------------------
   Scrollspy js
  ------------------------------ */
  const Body = $('body');
  Body.scrollspy({
    target: '.navbar-collapse',
    offset: 80
  });

  /*---------------------
    Venobox
  --------------------- */
  const venoBox = $('.venobox');
  venoBox.venobox();

  /*----------------------------
  Page Scroll
  ------------------------------ */
  const pageScroll = $('a.page-scroll');
  pageScroll.on('click', (event) => {
    const $anchor = $(this);
    $('html, body').stop().animate({
      scrollTop: $($anchor.attr('href')).offset().top - 55
    }, 1500, 'easeInOutExpo');
    event.preventDefault();
  });

  /*--------------------------
    Back to top button
  ---------------------------- */
  $(window).scroll(() => {
    if ($(this).scrollTop() > 100) {
      $('.back-to-top').fadeIn('slow');
    } else {
      $('.back-to-top').fadeOut('slow');
    }
  });

  $('.back-to-top').click(() => {
    $('html, body').animate({ scrollTop: 0 }, 1500, 'easeInOutExpo');
    return false;
  });

  /*----------------------------
   Parallax
  ------------------------------ */
  const wellLax = $('.wellcome-area');
  wellLax.parallax('50%', 0.4);
  const wellText = $('.wellcome-text');
  wellText.parallax('50%', 0.6);

  /*--------------------------
   collapse
  ---------------------------- */
  const panelTest = $('.panel-heading a');
  panelTest.on('click', () => {
    panelTest.removeClass('active');
    $(this).addClass('active');
  });

  /*---------------------
   Testimonial carousel
  ---------------------*/
  const testCarousel = $('.testimonial-carousel');
  testCarousel.owlCarousel({
    loop: true,
    nav: false,
    dots: true,
    autoplay: true,
    responsive: {
      0: {
        items: 1
      },
      768: {
        items: 1
      },
      1000: {
        items: 1
      }
    }
  });
  /*----------------------------
   isotope active
  ------------------------------ */
  // portfolio start
  $(window).on('load', () => {
    const $container = $('.awesome-project-content');
    $container.isotope({
      filter: '*',
      animationOptions: {
        duration: 750,
        easing: 'linear',
        queue: false
      }
    });
    const proMenu = $('.project-menu li a');
    proMenu.on('click', () => {
      const proMenuActive = $('.project-menu li a.active');
      proMenuActive.removeClass('active');
      $(this).addClass('active');
      const selector = $(this).attr('data-filter');
      $container.isotope({
        filter: selector,
        animationOptions: {
          duration: 750,
          easing: 'linear',
          queue: false
        }
      });
      return false;
    });
  });
})(jQuery);
