$(document).ready(function() {

// mobile menu
/* 	let mobileMenu = document.querySelector("#mobile-menu");
	if( mobileMenu != null ){
		var TouchMenu = TouchMenuLA({
			target: mobileMenu,
			width: 300,
			onOpen: function(){
				console.log(this.isVisible);
			}
		});

		$('#menu_btn').on('click', function(){
			TouchMenu.toggle();
		});

		$('#menu_close').on('click', function(){
			TouchMenu.toggle();	
		});

		$('.items-menu').on('click', function(){
			TouchMenu.toggle();	
		});
	} */

$(".phone-mask").mask("099-999-99-99");

//scroll add .scroll to buttons for slowly move to anchor
	$('.scroll').bind('click.smoothscroll',function (e) {
		e.preventDefault();
		
		var target = this.hash,
		$target = $(target);
		
		$('html, body').stop().animate({
			'scrollTop': $target.offset().top
		}, 900, 'swing', function () {
			window.location.hash = target;
		});
	});

// countdown
	var endTimer      = Date.now() + (60 * 60 * 3 * 1000) + (60 * 42 * 1000); // 3:42
	var cookieName    = "endTimer";
	var checkCookie   = getCookie(cookieName);
	if(!checkCookie) setCookie(cookieName, endTimer, 30);
	var cookie        = getCookie(cookieName);

	var timerConfig = {
		el: '.countdown',
		endTimer: cookie
	};

	if( cookie > Date.now() ){
		var timer = new CountdownTimer( timerConfig.el, timerConfig.endTimer);
	} else {
		setCookie(cookieName, endTimer, 30);
		timerConfig.endTimer = getCookie(cookieName);
		var timer = new CountdownTimer( timerConfig.el, timerConfig.endTimer);
	}	
	timer.countDown();
	
// sliders
	var owl = $('#owl_slider');
	owl.owlCarousel({
		loop: true,
		nav: true,
		autoplay: true,
		autoplayHoverPause: true,
		autoplayTimeout: 3000,
		margin: 5,
		dots: false,
		responsiveClass: true,
		responsive: {
			0:{
				items: 1
			},
			600:{
				items: 2
			},
			1000:{
				items: 3
			}
		}
	});
	$('.customPrevBtn').click(function() {
		owl.trigger('prev.owl.carousel', [250]);
	});
	$('.customNextBtn').click(function() {
		owl.trigger('next.owl.carousel', [250]);
	});

//end ready
});












// FUNCTION DECLARATIONS:
	// cookie
	function setCookie(cname, cvalue, exdays) {
		var d = new Date();
		d.setTime(d.getTime() + (exdays*24*60*60*1000));
		var expires = "expires="+d.toUTCString();
		document.cookie = cname + "=" + cvalue + "; " + expires;
	}

	function getCookie(cname) {
		var name = cname + "=";
		var ca = document.cookie.split(';');
		for(var i = 0; i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == ' ') {
			c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {
			return c.substring(name.length, c.length);
		}
		}
		return ;
	}

	function checkCookie() {
		var user = getCookie("username");
		if (user != "") {
		alert("Welcome again " + user);
		} else {
		user = prompt("Please enter your name:", "");
		if (user != "" && user != null) {
			setCookie("username", user, 365);
		}
		}
	}


	/* How use class countDownTimer
		new CountdownTimer({
			".countdown",
			Date.now() + 30000,
			"time is end"
		});
	 */
	function CountdownTimer(elem, time, message){
		this.initialize.apply(this, arguments);
	}

	CountdownTimer.prototype = {

		initialize: function(elem, time, message) {
			this.elems = document.querySelectorAll(elem);
			this.endTime 	= time;
			message = message || "00:00:00";
			this.message 	= '<span class="number-wrapper end">\
				<div class="line"></div>\
				<span class="number end">'+ message +'</span>\
			</span>';
		},

		countDown: function(){
			var today = new Date();
			var resultDate = this.endTime - today;
			var day   = Math.floor( resultDate / (24*60*60*1000));
			var hour  = Math.floor(( resultDate % (24*60*60*1000)) / (60*60*1000));
			var min   = Math.floor(( resultDate % (24*60*60*1000)) / (60*1000)) % 60;
			var sec   = Math.floor(( resultDate % (24*60*60*1000)) / 1000) % 60 % 60;
			var timer = '';
			var self  = this;

			if( resultDate > 0 ){
				// if you need 'day' just copy and paste html below in variable timer
				timer = '<div class="number-wrapper">\
								<div class="line">	</div>\
								<span class="number">'+this.addZero(hour)+'</span>\
								<div class="caption">час</div>\
							</div>';
				timer += '<div class="number-wrapper">\
								<div class="line">	</div>\
								<span class="number">'+this.addZero(min)+'</span>\
								<div class="caption">мин</div>\
							</div>';
				timer += '<div class="number-wrapper last">\
								<div class="line">	</div>\
								<span class="number">'+this.addZero(sec)+'</span>\
								<div class="caption">сек</div>\
							</div>';

				for (var i = 0; i < this.elems.length; i++) {
					this.elems[i].innerHTML = timer;
				}

				var id = setTimeout( function(){
					self.countDown();
				}, 10);
				
			} else {

				for (var i = 0; i < this.elems.length; i++) {
					this.elems[i].innerHTML = this.message;
				}

			}
			
		},
		addZero: function(num){
			return ('0'+num).slice(-2);
		}
	}