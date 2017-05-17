/*! =========================================================
 *
 * Material Kit PRO - V1.0.0
 *
 * =========================================================
 *
 * Copyright 2016 Creative Code Srl
 * Available with purchase of license from http://www.creative-tim.com/product/material-kit-pro
 *
 * ========================================================= */

var transparent = true;

var transparentDemo = true;
var fixedTop = false;

var navbar_initialized = false;
var colored_shadows = true;
var window_width = 0;
var isWindows = document.documentMode || /Edge/.test(navigator.userAgent);

// navigator.platform.indexOf('Win') > -1 ? true : false;

$(document).ready(function(){

    // Init Material scripts for buttons ripples, inputs animations etc, more info on the next link https://github.com/FezVrasta/bootstrap-material-design#materialjs
    $.material.init();

    window_width = $(window).width();

    if( window_width < 768 ){
        materialKit.initRightMenu();
    }

    $navbar = $('.navbar[color-on-scroll]');
    scroll_distance = $navbar.attr('color-on-scroll') || 500;

    $navbar_collapse = $('.navbar').find('.navbar-collapse');

    //  Activate the Tooltips
    $('[data-toggle="tooltip"], [rel="tooltip"]').tooltip();


    //    Activate bootstrap-select
    if($(".selectpicker").length != 0){
        $(".selectpicker").selectpicker();
    }

    // Activate Popovers
    $('[data-toggle="popover"]').popover();

    // Active Carousel
	$('.carousel').carousel({
      interval: 3000
    });

    //Activate tags
    //removed class label and label-color from tag span and replaced with data-color
    var tagClass = $('.tagsinput').data('color');

    $('.tagsinput').tagsinput({
        tagClass: ' tag-'+ tagClass +' '
    });

    if($('.navbar-color-on-scroll').length != 0){
        $(window).on('scroll', materialKit.checkScrollForTransparentNavbar)
    }

    if (window_width >= 768){
        big_image = $('.page-header[data-parallax="true"]');
        if(big_image.length != 0){
            $(window).on('scroll', materialKitDemo.checkScrollForParallax);
        }

    }

    initRotateCard();

    if(colored_shadows == true){
        if(!isWindows){
            $('.card:not(.card-rotate):not([data-colored-shadow="false"]) .card-image').each(function(){
                $this = $(this);
                var img_source = $this.find('img').attr('src');
                var shadow_fancy_div = $('<div class="shadow-fancy">');
                $this.css({
                    'box-shadow':'none',
                    'z-index':'1',
                    'overflow':'visible'
                });

                shadow_fancy_div.css('background-image', 'url(' + img_source +')').appendTo($this);
            });
        }
    }

    var nume = [];
    var i = 0;

    $('.card .card-image').each(function(){
        $atv = $(this).find('.atvImg');
        $atv.removeClass('atvImg');
        nume[i] = $(this).height();
        i++;
        $atv.addClass('atvImg');
    });

    atvImg();

    var i = 0;

    $('.card .card-image').each(function(){
        $(this).find('.atvImg').css('height', nume[i] + 'px');
        i++;
    });
});

function initRotateCard(){
    $('.card.card-rotate .card-image > .front').each(function(){
        var img_source_front = $(this).find('img').attr('src');
        var card_image_height = $(this).parent('.card-image').height();
        var card_image_width = $(this).parent('.card-image').width();
        var shadow_fancy_div = $('<div class="shadow-fancy">');
        var color_shadow_image = $(this).parent().parent().parent().data('colored-shadow');

        if(isWindows || color_shadow_image == false ){
            $(this).parent('.card-image').css({
                'box-shadow':'',
                'z-index':'',
                'overflow':'visible'
            });
        } else {
            if(colored_shadows == true  ){
                $(this).parent('.card-image').css({
                    'box-shadow':'none',
                    'z-index':'1',
                    'overflow':'visible'
                });
            } else {
                $(this).parent('.card-image').css({
                    'overflow':'visible'
                });
            }



            if($(this).find('.shadow-fancy').length == 0 && colored_shadows == true && color_shadow_image){
                shadow_fancy_div.css('background-image', 'url(' + img_source_front +')').appendTo($(this));
            }
        }


        $(this).siblings('.back').css({'height': card_image_height + 'px', 'width': card_image_width + 'px', 'display':'block'});

    });

    $('.card.card-rotate .card-image > .back').each(function(){
        if(isWindows || !colored_shadows){
            $(this).css({
                'box-shadow':'none'
            });
        }

        var card_image_height = $(this).parent('.card-image').height();
        var card_image_width = $(this).parent('.card-image').width();

        $(this).css({'height': card_image_height + 'px', 'width': card_image_width + 'px'});

    });
}

function rotateCard(btn){
    var $rotating_card_container = $(btn).closest('.rotating-card-container');

    if($rotating_card_container.hasClass('hover')){
        $rotating_card_container.removeClass('hover');
    } else {
        $rotating_card_container.addClass('hover');
    }
}

$(window).resize(function(){
    if( $(window).width() < 768 ){
        materialKit.initRightMenu();
    }

    initRotateCard();
});

materialKit = {
    misc:{
        navbar_menu_visible: 0
    },

    initRightMenu: function(){

         if(!navbar_initialized){
            $toggle = $('.navbar-toggle');

            $toggle.click(function (){

                if(materialKit.misc.navbar_menu_visible == 1) {
                    $('html').removeClass('nav-open');
                    materialKit.misc.navbar_menu_visible = 0;
                    $('#bodyClick').remove();
                     setTimeout(function(){
                        $toggle.removeClass('toggled');
                     }, 550);

                } else {
                    setTimeout(function(){
                        $toggle.addClass('toggled');
                    }, 580);


                    div = '<div id="bodyClick"></div>';
                    $(div).appendTo("body").click(function() {
                        $('html').removeClass('nav-open');
                        materialKit.misc.navbar_menu_visible = 0;
                        $('#bodyClick').remove();
                         setTimeout(function(){
                            $toggle.removeClass('toggled');
                         }, 550);
                    });

                    $('html').addClass('nav-open');
                    materialKit.misc.navbar_menu_visible = 1;

                }
            });

            navbar_initialized = true;
        }
    },

    checkScrollForTransparentNavbar: debounce(function() {
            if($(document).scrollTop() > scroll_distance ) {
                if(transparent) {
                    transparent = false;
                    $('.navbar-color-on-scroll').removeClass('navbar-transparent');
                }
            } else {
                if( !transparent ) {
                    transparent = true;
                    $('.navbar-color-on-scroll').addClass('navbar-transparent');
                }
            }
    }, 17),

    initFormExtendedDatetimepickers: function(){
        $('.datetimepicker').datetimepicker({
            icons: {
                time: "fa fa-clock-o",
                date: "fa fa-calendar",
                up: "fa fa-chevron-up",
                down: "fa fa-chevron-down",
                previous: 'fa fa-chevron-left',
                next: 'fa fa-chevron-right',
                today: 'fa fa-screenshot',
                clear: 'fa fa-trash',
                close: 'fa fa-remove',
                inline: true
            }
         });

         $('.datepicker').datetimepicker({
            format: 'MM/DD/YYYY',
            icons: {
                time: "fa fa-clock-o",
                date: "fa fa-calendar",
                up: "fa fa-chevron-up",
                down: "fa fa-chevron-down",
                previous: 'fa fa-chevron-left',
                next: 'fa fa-chevron-right',
                today: 'fa fa-screenshot',
                clear: 'fa fa-trash',
                close: 'fa fa-remove',
                inline: true
            }
         });

         $('.timepicker').datetimepicker({
//          format: 'H:mm',    // use this format if you want the 24hours timepicker
            format: 'h:mm A',    //use this format if you want the 12hours timpiecker with AM/PM toggle
            icons: {
                time: "fa fa-clock-o",
                date: "fa fa-calendar",
                up: "fa fa-chevron-up",
                down: "fa fa-chevron-down",
                previous: 'fa fa-chevron-left',
                next: 'fa fa-chevron-right',
                today: 'fa fa-screenshot',
                clear: 'fa fa-trash',
                close: 'fa fa-remove',
                inline: true

            }
         });
    },

    initSliders: function(){
        // Sliders for demo purpose
        var slider = document.getElementById('sliderRegular');

        noUiSlider.create(slider, {
            start: 40,
            connect: [true,false],
            range: {
                min: 0,
                max: 100
            }
        });

        var slider2 = document.getElementById('sliderDouble');

        noUiSlider.create(slider2, {
            start: [ 20, 60 ],
            connect: true,
            range: {
                min:  0,
                max:  100
            }
        });
    }
}


var big_image;

materialKitDemo = {

    checkScrollForParallax: debounce(function(){
        if(isElementInViewport(big_image)){
            var current_scroll = $(this).scrollTop();

            oVal = ($(window).scrollTop() / 3);
            big_image.css({
                'transform':'translate3d(0,' + oVal +'px,0)',
                '-webkit-transform':'translate3d(0,' + oVal +'px,0)',
                '-ms-transform':'translate3d(0,' + oVal +'px,0)',
                '-o-transform':'translate3d(0,' + oVal +'px,0)'
            });
        }
    }, 4),

    initContactUsMap: function(){
        var myLatlng = new google.maps.LatLng(44.433530, 26.093928);
        var mapOptions = {
          zoom: 14,
          center: myLatlng,
          styles:
[{"featureType":"water","stylers":[{"saturation":43},{"lightness":-11},{"hue":"#0088ff"}]},{"featureType":"road","elementType":"geometry.fill","stylers":[{"hue":"#ff0000"},{"saturation":-100},{"lightness":99}]},{"featureType":"road","elementType":"geometry.stroke","stylers":[{"color":"#808080"},{"lightness":54}]},{"featureType":"landscape.man_made","elementType":"geometry.fill","stylers":[{"color":"#ece2d9"}]},{"featureType":"poi.park","elementType":"geometry.fill","stylers":[{"color":"#ccdca1"}]},{"featureType":"road","elementType":"labels.text.fill","stylers":[{"color":"#767676"}]},{"featureType":"road","elementType":"labels.text.stroke","stylers":[{"color":"#ffffff"}]},{"featureType":"poi","stylers":[{"visibility":"off"}]},{"featureType":"landscape.natural","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#b8cb93"}]},{"featureType":"poi.park","stylers":[{"visibility":"on"}]},{"featureType":"poi.sports_complex","stylers":[{"visibility":"on"}]},{"featureType":"poi.medical","stylers":[{"visibility":"on"}]},{"featureType":"poi.business","stylers":[{"visibility":"simplified"}]}],
          scrollwheel: false, //we disable de scroll over the map, it is a really annoing when you scroll through page
        }
        var map = new google.maps.Map(document.getElementById("contactUsMap"), mapOptions);

        var marker = new google.maps.Marker({
            position: myLatlng,
            title:"Hello World!"
        });
        marker.setMap(map);
    },

    initContactUs2Map: function(){
        var lat = 44.433530;
        var long = 26.093928;

        var centerLong = long - 0.025;

        var myLatlng = new google.maps.LatLng(lat,long);
        var centerPosition = new google.maps.LatLng(lat, centerLong);

        var mapOptions = {
          zoom: 14,
          center: centerPosition,
          styles:
[{"featureType":"water","stylers":[{"saturation":43},{"lightness":-11},{"hue":"#0088ff"}]},{"featureType":"road","elementType":"geometry.fill","stylers":[{"hue":"#ff0000"},{"saturation":-100},{"lightness":99}]},{"featureType":"road","elementType":"geometry.stroke","stylers":[{"color":"#808080"},{"lightness":54}]},{"featureType":"landscape.man_made","elementType":"geometry.fill","stylers":[{"color":"#ece2d9"}]},{"featureType":"poi.park","elementType":"geometry.fill","stylers":[{"color":"#ccdca1"}]},{"featureType":"road","elementType":"labels.text.fill","stylers":[{"color":"#767676"}]},{"featureType":"road","elementType":"labels.text.stroke","stylers":[{"color":"#ffffff"}]},{"featureType":"poi","stylers":[{"visibility":"off"}]},{"featureType":"landscape.natural","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#b8cb93"}]},{"featureType":"poi.park","stylers":[{"visibility":"on"}]},{"featureType":"poi.sports_complex","stylers":[{"visibility":"on"}]},{"featureType":"poi.medical","stylers":[{"visibility":"on"}]},{"featureType":"poi.business","stylers":[{"visibility":"simplified"}]}],
          scrollwheel: false, //we disable de scroll over the map, it is a really annoing when you scroll through page
        }
        var map = new google.maps.Map(document.getElementById("contactUs2Map"), mapOptions);

        var marker = new google.maps.Marker({
            position: myLatlng,
            title:"Hello World!"
        });
        marker.setMap(map);
    }

}
// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.

function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		clearTimeout(timeout);
		timeout = setTimeout(function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		}, wait);
		if (immediate && !timeout) func.apply(context, args);
	};
};


function isElementInViewport(elem) {
    var $elem = $(elem);

    // Get the scroll position of the page.
    var scrollElem = ((navigator.userAgent.toLowerCase().indexOf('webkit') != -1) ? 'body' : 'html');
    var viewportTop = $(scrollElem).scrollTop();
    var viewportBottom = viewportTop + $(window).height();

    // Get the position of the element on the page.
    var elemTop = Math.round( $elem.offset().top );
    var elemBottom = elemTop + $elem.height();

    return ((elemTop < viewportBottom) && (elemBottom > viewportTop));
}
