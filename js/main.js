$(document).ready(function () {
	
	AOS.init({disable: 'mobile'});

	var $slider = $('.banner-wrap');
	var $progressBar = $('.progress');
	var currentSlide;
	var slidesCount;
  	var sliderCounter = $('.slider-count');
	
	var updateSliderCounter = function(slick, currentIndex) {
		currentSlide = slick.slickCurrentSlide() + 1;
		slidesCount = slick.slideCount;
		$(sliderCounter).text('SLIDE ' + currentSlide + '/' +slidesCount)
	};

	$slider.on('init', function(event, slick) {
		updateSliderCounter(slick);
	});

	$slider.on('afterChange', function(event, slick, currentSlide) {
		updateSliderCounter(slick, currentSlide);
	});
	
	$slider.on('beforeChange', function(event, slick, currentSlide, nextSlide) {   
		var calc = ( (nextSlide) / (slick.slideCount-1) ) * 100;
		
		$progressBar
		.css('background-size', calc + '% 100%')
		.attr('aria-valuenow', calc );
	});

	$slider.slick({
		infinite: true,
		speed: 1,
		fade: true,
		autplay: true,
		cssEase: 'linear',
		prevArrow:"<button type='button' class='slick-prev pull-left'><i class='fas fa-arrow-left' aria-hidden='true'></i></button>",
		nextArrow:"<button type='button' class='slick-next pull-right'><i class='fas fa-arrow-right' aria-hidden='true'></i></button>"
	});

	// var swiper = new Swiper('.swiper-container', {
	// 	scrollbar: {
	// 	  el: '.swiper-scrollbar',
	// 	  hide: true,
	// 	  onInit: function(swiper){
	// 		var offer = document.querySelector('#numberSlides');
	// 		offer.innerHTML = (swiper.activeIndex +  1) + '/' + swiper.slides.length + 'Offers';
	// 	  },
	// 	  onSlideChangeEnd: function(swiper){
	// 		var offer = document.querySelector('#numberSlides');
	// 		offer.innerHTML = (swiper.activeIndex +  1) + '/' + swiper.slides.length + 'Offers';
	// 	  }
	// 	},
	//   });

	var swiper = new Swiper('.box-slider', {
		slidesPerView: 'auto',
      	spaceBetween: 30,
		navigation: {
		  nextEl: '.swiper-button-next',
		  prevEl: '.swiper-button-prev',
		},
	  });

	
    menuOpen();
	$(window).resize(function(){
	    menuOpen();
	});


	$(window).scroll( function(){

		//get scroll position
		var topWindow = $(window).scrollTop();
		//multipl by 1.5 so the arrow will become transparent half-way up the page
		var topWindow = topWindow * 1.5;
		
		//get height of window
		var windowHeight = $(window).height();
			
		//set position as percentage of how far the user has scrolled 
		var position = topWindow / windowHeight;
		//invert the percentage
		position = 1 - position;

		//define arrow opacity as based on how far up the page the user has scrolled
		//no scrolling = 1, half-way up the page = 0
		$('.contact_us_down').css('opacity', position);

	});

		

	$('body a[href*="#"]')
	// Remove links that don't actually link to anything
	.not('[href="#"]')
	.not('[href="#0"]')
	.click(function(event) {
		// On-page links
		if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
		// Figure out element to scroll to
		var target = $(this.hash);
		target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
		// Does a scroll target exist?
		if (target.length) {
			// Only prevent default if animation is actually gonna happen
			event.preventDefault();
			$('html, body').animate({
			scrollTop: target.offset().top
			}, 1000, function() {
			// Callback after animation
			// Must change focus!
			var $target = $(target);
			$target.focus();
			if ($target.is(":focus")) { // Checking if the target was focused
				return false;
			} else {
				$target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
				$target.focus(); // Set focus again
			};
			});
		}
		}
	});

	setTimeout(function() { 
		$("body").removeClass('start');
	}, 1000);

	$(".scroll-to-top").click(function() {
		$("html, body").animate({ scrollTop: 0 }, "slow");
		return false;
	});

	// Video
    videoPlay();

	if ($('.popup-youtube').length) {
		$('.popup-youtube').magnificPopup({
			disableOn: 700,
			type: 'iframe',
			mainClass: 'mfp-fade',
			removalDelay: 160,
			preloader: false,
			
			fixedContentPos: false,
			// open: function() {
			// 	$("body").addClass('no-scroll');
			// },
			close: function() {
				console.log('Popup removal initiated (after removalDelay timer finished)');
			  },
		});

		// $(".popup-youtube").click(function() {
		// 	$("body").addClass('no-scroll');
		// 	return false;
		// });

		// $(".mfp-close").click(function() {
		// 	$("body").removeClass('no-scroll');
		// 	return false;
		// });

		// $(document).on('keyup',function(evt) {
		// 	if (evt.keyCode == 27) {
		// 		$("body").removeClass('no-scroll');
		// 		return false;
		// 	}
		// });
	}

});

function menuOpen() {
   if ($(window).width() < 992) {  

          	$('.span_right').on('click', function() {
				$(this).parent().toggleClass('open');
			});
		}  
       else{
	       	$('li.dropdown').hover(function() {
			  $(this).find('>.dropdown-menu:eq(0)').stop(true, true).delay(200).fadeIn(500);
			  $(this).addClass('open');
			}, function() {
			  $(this).find('>.dropdown-menu:eq(0)').stop(true, true).delay(200).fadeOut(500);
			  $(this).removeClass('open')
			});
          
       }  
}

function videoPlay() {
    if ($(".videoLink").length > 0) {
       $('.videoLink').click(function(){ 
           var video = '';
           var vUrl = $(this).attr('data-video');
           var _videow = $(".embed-responsive").width();
           var _videoh = $(".embed-responsive").height();
           var vType = $(this).attr('data-type');

           if(vType == 'vimeo'){
               video += '<div class="embed-responsive embed-responsive-16by9"><iframe id="modal-video" class="embed-responsive-item" src="https://player.vimeo.com/video/'+vUrl+'" height="'+_videoh+'" width="'+_videow+'" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowfullscreen></iframe></div>';    
           }else{
               video = '<div class="embed-responsive embed-responsive-16by9"><iframe height="'+_videoh+'" class="embed-responsive-item" width="'+_videow+'" src="https://www.youtube.com/embed/'+vUrl+'?autoplay=1&showinfo=0&rel=0&controls=0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" webkitAllowFullScreen mozallowfullscreen allowfullscreen></iframe></div>';
           }
           
           $(this).parent('.embed-responsive').replaceWith(video);
       });
   }      
}
