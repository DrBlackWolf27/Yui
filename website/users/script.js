'use strict';

$(function() {

  function next(next, current, winHeight) {

    next.target.css({
      display: 'block'
    });

    next.target.promise().done(function() {
      current.target.animate({
        marginTop: -winHeight,
      }, 500, 'easeInCubic');

      current.target.promise().done(function() {
        $(this).css({
          display: 'none'
        });
        current.current = false;
        current.menuItem.parent().removeClass('active');
        next.current = true;
        next.menuItem.parent().addClass('active');
      });
    });

  } // end-next

  function prev(prev, current) {

    prev.target.css({
      display: 'block'
    });

    prev.target.promise().done(function() {
      $(this).animate({
        marginTop: 0,
      }, 500, 'easeOutCubic');

      $(this).promise().done(function() {
        current.target.css({
          display: 'none'
        });
        current.current = false;
        current.menuItem.parent().removeClass('active');
        prev.current = true;
        prev.menuItem.parent().addClass('active');
      });
    });

  } // end-prev

  function nextSlide(e, slides, winHeight) {

      var currentSlide = slides.filter(function(obj) {
                          return obj.current;
                        })[0],
          animtedSlide = slides.filter(function(obj) {
                          return obj.target.is(':animated');
                        })[0],
          currentSlideIndex = slides.indexOf(currentSlide),
          nextSlide = slides[currentSlideIndex + 1];

      if (currentSlideIndex !== slides.length - 1 && !animtedSlide) {

        if (nextSlide.target.is(':hidden')) {

          next(nextSlide, currentSlide, winHeight);

        }

      } // end-if

  } // end nextSlide

  function prevSlide(e, slides, winHeight) {

      var currentSlide = slides.filter(function(obj) {
                          return obj.current;
                        })[0],
          animtedSlide = slides.filter(function(obj) {
                          return obj.target.is(':animated');
                        })[0],
          currentSlideIndex = slides.indexOf(currentSlide),
          prevSlide = slides[currentSlideIndex - 1];

      if (currentSlideIndex !== 0 && !animtedSlide) {

        if (prevSlide.target.is(':hidden')) {

          prev(prevSlide, currentSlide);

        }

      } // end-else

  } // end prevSlide

  function scrollTo(e, slides) {

    var targetElementId = $(e.target).attr('data-title'),
        targetElement = slides.filter(function(obj) {
                          return obj.id === targetElementId;
                        })[0];

    $body.animate({
      scrollTop: targetElement.target.offset().top
    });

    $body.promise().done(function() {
      targetElement.menuItem.parent().siblings().removeClass('active');
      targetElement.menuItem.parent().addClass('active');
    });

  }

  // DOM
  var $body = $('body');
  var $navBar = $('#nav-bar');
  var $navList = $navBar.find('.nav-list');
  var $navToggle = $navBar.find('.toggle-nav').find('i');
  var slides = [
    {
      id: 'home',
      target: $('#home'),
      menuItem: $navList.find('a[data-title=' + 'home' + ']'),
      current: true
    },
    {
      id: 'about',
      target: $('#about'),
      menuItem: $navList.find('a[data-title=' + 'about' + ']'),
      current: false
    },
    {
      id: 'portfolio',
      target: $('#portfolio'),
      menuItem: $navList.find('a[data-title=' + 'portfolio' + ']'),
      current: false
    },
    {
      id: 'contact',
      target: $('#contact'),
      menuItem: $navList.find('a[data-title=' + 'contact' + ']'),
      current: false
    }
  ];
  var $sections = $('.section');
  var $skillBars = $('.skill-bar');

  // Vars
  var winHeight = $(window).height();

  function portfolio() {

    // Slides mode
    if ($sections.css('position') === 'absolute') {

      // Hide hidden slides
      slides.forEach(function(slide) {
        if (!slide.current) {
          slide.target.css({
            display: 'none'
          });
        }
      });

      // Next slide mousewheel
      $body.on('mousewheel', function(e) {
        if (e.deltaY < 1) {
          nextSlide(e, slides, winHeight);
        }
      });

      // Prev slide mousewheel
      $body.on('mousewheel', function(e) {
        if (e.deltaY === 1) {
          prevSlide(e, slides, winHeight);
        }
      });

    } else {

      $sections.css({
        display: 'block',
        marginTop: 0
      });

    } // end-if-section

    if ($navToggle.is(':hidden')) {

      $navList.css({
        display: 'block'
      });

    } else {

      $navList.css({
        display: 'none'
      });

    } // end-if-nav-toggle

    $skillBars.each(function() {
      $(this).css({
        width: $(this).html()
      });
    });

  } // end-portfolio

  $(document).ready(function() {
    // Run my function
    portfolio();

    // Update winHeight when resizing the window
    $(window).resize(function() {
      winHeight = $(window).height();
      portfolio();
    });
    
    // Fixed Nav
    $navList.on('click', function(e) {
      scrollTo(e, slides);

      if (!$navToggle.is(':hidden') && $navToggle.hasClass('fa-close')) {
        $navList.hide();
        $navToggle.addClass('fa-bars').removeClass('fa-close');
      }
    });

    // Mobile Nav
    $navToggle.on('click', function(e) {
      var self = $(this);
      if (self.hasClass('fa-bars')) {
        self.addClass('fa-close').removeClass('fa-bars');
      } else {
        self.addClass('fa-bars').removeClass('fa-close');
      }
      $navList.toggle();
    });

  });

});