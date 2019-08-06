$(document).ready(function() {

// mobile menu
	let mobileMenu = document.querySelector("#mobile-menu");

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
	}


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
		var endTimer 	 = Date.now() + (60 * 60 * 3 * 1000) + (60 * 42 * 1000); // 3:42
		var cookieName	 = "endTimer";
		var checkCookie  = getCookie(cookieName);
		if(!checkCookie)   setCookie(cookieName, endTimer, 30);
		var cookie		 = getCookie(cookieName);

		var timerConfig = {
			el: 'countdown',
			el2: 'countdown2',
			endTimer: cookie,
			message: '<span class="number-wrapper end"><div class="line"></div><span class="number end">00:00:00</span></span>'
		};

		if( cookie > Date.now() ){
			var timer = new CountdownTimer( timerConfig.el, timerConfig.endTimer, timerConfig.message );
			var timer2 = new CountdownTimer( timerConfig.el2, timerConfig.endTimer, timerConfig.message );
		} else {
			setCookie(cookieName, endTimer, 30);
			timerConfig.endTimer = getCookie(cookieName);
			var timer = new CountdownTimer( timerConfig.el, timerConfig.endTimer, timerConfig.message );
			var timer2 = new CountdownTimer( timerConfig.el2, timerConfig.endTimer, timerConfig.message );
		}	
		timer.countDown();
		// timer2.countDown();



// slider
	/*  $("#one").owlCarousel({
			loop: true,
			margin: 0,
			nav: true,
			navText:["<img src=\"img/left-arrow2.png\" >","Следующий день <img src=\"img/right-arrow.png\" >"],
			responsive:{
			0:{
				items:1
			},
			600:{
				items:1
			},
			1000:{
				items:1
			}
			}
		});
		var owl = $('#owl_slider');
		$('.customPrevBtn').click(function() {
			owl.trigger('prev.owl.carousel', [250]);
		});
	*/


//end ready
});

// function declarations:
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

	// class countDownTimer
	function CountdownTimer(elm, tl, mes){
		this.initialize.apply(this, arguments);
	}
	CountdownTimer.prototype = {
		initialize: function(elm, tl, mes) {
			this.elem 	= document.getElementById(elm);
			this.tl 	= tl;
			this.mes 	= mes;
		},
		countDown: function(){
			var timer = '';
			var today = new Date();
			var day   = Math.floor((this.tl-today)/(24*60*60*1000));
			var hour  = Math.floor(((this.tl-today)%(24*60*60*1000))/(60*60*1000));
			var min   = Math.floor(((this.tl-today)%(24*60*60*1000))/(60*1000))%60;
			var sec   = Math.floor(((this.tl-today)%(24*60*60*1000))/1000)%60%60;
			var me    = this;
	
			if( ( this.tl - today ) > 0 ){
	
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
	
				console.log("ok");
				this.elem.innerHTML = timer;
				
				var tid = setTimeout( function(){
					me.countDown();
				}, 10);
				
			} else {
				this.elem.innerHTML = this.mes;
				return;
			}
		},
		addZero: function(num){ 
			return ('0'+num).slice(-2); 
		}
	}