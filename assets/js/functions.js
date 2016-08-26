$(function() {
    checkScroll();
    smoothScroll(300);
    checkMobileNav();
    $('.blurb').fitText(1.2, { minFontSize: '16px', maxFontSize: '32px' });
});

function checkMobileNav() {
  $('.mobile-nav-toggle').click(function(){
    $('.mobile-nav').toggleClass('is-open');
    $('.mobile-nav-toggle > span').toggleClass('teal');
  });
}

function smoothScroll (duration) {
  $('a[href^="#"]').on('click', function (event) {
      $('.mobile-nav').toggleClass('is-open');
      $('.mobile-nav-toggle > span').toggleClass('teal');
      var target = $( $(this).attr('href') );

      if( target.length ) {
          event.preventDefault();
          $('html, body').animate({
              scrollTop: target.offset().top
          }, duration);
      }
  });
}

function checkScroll()
{
    // Hide Header on scroll down
    var didScroll;
    var lastScrollTop = 0;
    var delta = 10;
    var navbarHeight = $('header').outerHeight();
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