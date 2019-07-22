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


$(function() {
	jQuery.extend(jQuery.validator.messages, {
		required: "Это поле необходимо заполнить.",
		remote: "Пожалуйста, введите правильное значение.",
		email: "Пожалуйста, введите корректный адрес электронной почты.",
		url: "Пожалуйста, введите корректный URL.",
		date: "Пожалуйста, введите корректную дату.",
		dateISO: "Пожалуйста, введите корректную дату в формате ISO.",
		number: "Пожалуйста, введите число.",
		digits: "Пожалуйста, вводите только цифры.",
		creditcard: "Пожалуйста, введите правильный номер кредитной карты.",
		equalTo: "Пожалуйста, введите такое же значение ещё раз.",
		extension: "Пожалуйста, выберите файл с правильным расширением.",
		maxlength: $.validator.format( "Пожалуйста, введите не больше {0} символов." ),
		minlength: $.validator.format( "Пожалуйста, введите не меньше {0} символов." ),
		rangelength: $.validator.format( "Пожалуйста, введите значение длиной от {0} до {1} символов." ),
		range: $.validator.format( "Пожалуйста, введите число от {0} до {1}." ),
		max: $.validator.format( "Пожалуйста, введите число, меньшее или равное {0}." ),
		min: $.validator.format( "Пожалуйста, введите число, большее или равное {0}." )
	});
	$("#addMyModal").validate({
		rules: {
			oplata: {
				required: true
			},
			fio: {
				required: true,
				minlength: 5
			},
			email: {
				required: true,
				minlength: 5
			},
			phone: {
				required: true,
				minlength: 11
			},
			curs: {
				required: true
			}
		},
		messages: {
			oplata: {
				required: "Обязательное поле"
			},
			fio: {
				required: "Обязательное поле",
				minlength: "Минимальная длинна ФИО 5 символов"
			},
			email: {
				required: "Обязательное поле",
				minlength: "Минимальная длинна Email 5 символов"
			},
			phone: {
				required: "Обязательное поле",
				minlength: "Минимальная длинна Телефона 11 символов"
			},
			curs: {
				required: "Обязательное поле"
			}
		},
		submitHandler: function(form){
			var dataBlock = $('form').serializeArray();
			$.ajax({
				url: 'writecsv.php',
				type: 'POST',
				// data: 'name=Andrew&nickname=Aramis',
				data: dataBlock,
				success: function(data){
					// $('#results').html(data);
					alert("result");
					$('form')[0].reset();
				},
				fail: function(data){
					// $('#results').html(data);
					alert("fail");
				},
			});
			}
	});
});
	
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
	this.initialize.apply(this,arguments);
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

			this.elem.innerHTML = timer;

			var tid = setTimeout( function(){
					me.countDown();
				}, 10);

		} else {

			this.elem.innerHTML = this.mes.html;
			this.mes.userAction();
			return;

		}
	},
	addZero: function(num){ 
		return ('0'+num).slice(-2); 
	}
}