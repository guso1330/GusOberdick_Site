$(function() {
    checkScroll();
    // smoothScroll(100);
    checkMobileNav();
    checkNavBackground();
    $('.blurb').fitText(1.2, { minFontSize: '14px', maxFontSize: '32px' });
    animateOnScroll($('.skill-wrapper'));
    clickAboutMeBtn();
});

function checkMobileNav() {
  $('.mobile-nav-toggle').click(function(){
    $('.mobile-nav').toggleClass('is-open');
    $('.mobile-nav-toggle > span').toggleClass('teal');
  });
}

function smoothScroll (click_element, target, target_position, duration) {
  console.log(target_position);
  // grabbing the scrolled target
  if( target.length ) {
      $('html, body').animate({
          scrollTop: target_position
      }, duration);
  }
}

function checkScroll()
{
    // Hide Header on scroll down
    var didScroll;
    var lastScrollTop = 0;
    var navbarHeight = $('header').outerHeight();
    var delta = navbarHeight;
    var mobileNavHeight = $('.mobile-nav').outerHeight();

    $(window).scroll(function(event){
        didScroll = true;
    });

    setInterval(function() {
        if (didScroll) {
            hasScrolled();
            didScroll = false;
        }
    }, 250);

    function hasScrolled() {
        var st = $(this).scrollTop();
        
        // Make sure they scroll more than delta
        if(Math.abs(lastScrollTop - st) <= delta)
            return;
        
        // If they scrolled down and are past the navbar, add class .nav-up.
        // This is necessary so you never see what is "behind" the navbar.
        if (st > lastScrollTop && st > navbarHeight){
            // Scroll Down
            $('header').removeClass('head-down').addClass('head-up');
            $('.mobile-nav').removeClass('mobile-down').addClass('mobile-up');

        } else {
            // Scroll Up
            if(st + $(window).height() < $(document).height()) {
                $('header').removeClass('head-up').addClass('head-down');
                $('.mobile-nav').removeClass('mobile-up').addClass('mobile-down');
            }
        }
        
        lastScrollTop = st;
    }
}

function checkNavBackground() {
  var $header = $('header');
  var didScroll;
  $(window).scroll(function(event){
      didScroll = true;
  });

  setInterval(function() {
      if (didScroll) {
          hasScrolled();
          didScroll = false;
      }
  }, 250);

  function hasScrolled() {    
    var st = $(this).scrollTop();
    console.log(st);
    if($header.offset().top <= 100) {
      $header.removeClass('darkBg');
      $header.removeClass('head-down');
    }
    else {
      $header.addClass('darkBg');
    }
  }
}


function animateOnScroll(element) {
  $(window).scroll( function (event) {
    var scroll = $(window).scrollTop(),
        elementOffset = element.offset().top,
        offsetDistance = (elementOffset - scroll);

    if(scroll >= offsetDistance)
      element.addClass('animate');
  });
}

function animateElement(element) {
  element.toggleClass('animate');
}

// ** Need to make these classes
function clickAboutMeBtn() {
  var $about = $('.about'),
      $about_btn = $('.about-btn');

  $about_btn.click( function (event) {
    if(!$about.hasClass('show-about'))
      showAboutMe();
    else {
      closeAboutMe();
    }
  });
}

function showAboutMe() {
  var $about = $('.about'),
      $about_btn = $('.about-btn');

  $about.toggleClass('show-about');
  $about_btn.html("<h3>Hide about me</h3>");
  
  // add animation
  animateElement($about);
  smoothScroll($about_btn, $about, $about.offset().top, 1000);
}

function closeAboutMe() {
  var $about = $('.about'),
      $about_btn = $('.about-btn');
  setTimeout( function () {
                smoothScroll($about_btn, $about_btn, $about_btn.offset().top - 50, 1000);
              },
              100);
  $about_btn.html("<h3>About me...</h3>");

  // add animation
  animateElement($about);
  $about.toggleClass('show-about');
}

/*!
* FitText.js 1.2
*
* Copyright 2011, Dave Rupert http://daverupert.com
* Released under the WTFPL license
* http://sam.zoy.org/wtfpl/
*
* Date: Thu May 05 14:23:00 2011 -0600
*/

(function($) {

  $.fn.fitText = function( kompressor, options ) {

    // Setup options
    var compressor = kompressor || 1,
        settings = $.extend({
          'minFontSize' : Number.NEGATIVE_INFINITY,
          'maxFontSize' : Number.POSITIVE_INFINITY
        }, options);

    return this.each(function(){

      // Store the object
      var $this = $(this);

      // Resizer() resizes items based on the object width divided by the compressor * 10
      var resizer = function () {
        $this.css('font-size', Math.max(Math.min($this.width() / (compressor*10), parseFloat(settings.maxFontSize)), parseFloat(settings.minFontSize)));
      };

      // Call once to set.
      resizer();

      // Call on resize. Opera debounces their resize by default.
      $(window).on('resize.fittext orientationchange.fittext', resizer);

    });

  };

})( jQuery );