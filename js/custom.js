// JavaScript Document
var portTypes = ['all','poster', 'oilpaint', 'photography', 'food']
$.ajax({
    url: "http://localhost:2582/bbt/portfolio?type=0",
    type: 'GET',
    dataType: 'json',
    success: function(resp) {
        //图片数组的渲染
        console.log("")
        var srcHtml = '';
        var portItemClasses = '';
        $.each(resp.data, function(i, item) {
            srcHtml += '<div class="col-md-4 col-sm-6 ' + portTypes[item.type] +' ">'
                + '<a id="demo'+ i +'" href="#animatedModal" class="portfolio_item"> <img src="'+ item.url +'" alt="image" class="img-responsive" />'
                  +  '<div class="portfolio_item_hover">'
                  +  '    <div class="portfolio-border clearfix">'
                  +  '      <div class="item_info"> <span>'+ item.title +'</span> <em>' + item.desc + '</em> </div>'
                  +  '   </div>'
                  +  '</div>'
            +    '</a>'
            +'</div>'
            if (i != 0){
                 portItemClasses += ',';
            }
            portItemClasses += "#port" + i;
        });
        $(".portfolio_container").append(srcHtml);
         //  isotope
        $('#projects').waitForImages(function () {
            var $container = $('.portfolio_container');
            $container.isotope({
                filter: '*',
            });

            $('.portfolio_filter a').click(function () {
                $('.portfolio_filter .active').removeClass('active');
                $(this).addClass('active');

                var selector = $(this).attr('data-filter');
                $container.isotope({
                    filter: selector,
                    animationOptions: {
                        duration: 500,
                        animationEngine: "jquery"
                    }
                });
                return false;
            });

        });
        $(portItemClasses).animatedModal();
    }
})


$(window).load(function () {
    "use strict";
    // makes sure the whole site is loaded
    $('body').delay(350).css({
        'overflow': 'visible'
    });
})


$(document).ready(function () {
    "use strict";

    // scroll menu
    var sections = $('.section'),
        nav = $('.navbar-fixed-top,footer'),
        nav_height = nav.outerHeight();

    $(window).on('scroll', function () {
        var cur_pos = $(this).scrollTop();

        sections.each(function () {
            var top = $(this).offset().top - nav_height,
                bottom = top + $(this).outerHeight();

            if (cur_pos >= top && cur_pos <= bottom) {
                nav.find('a').removeClass('active');
                sections.removeClass('active');

                $(this).addClass('active');
                nav.find('a[href="#' + $(this).attr('id') + '"]').addClass('active');
            }
        });
    });

    nav.find('a').on('click', function () {
        var $el = $(this),
            id = $el.attr('href');

        $('html, body').animate({
            scrollTop: $(id).offset().top - nav_height + 2
        }, 600);

        return false;
    });


    // Menu opacity
    if ($(window).scrollTop() > 80) {
        $(".navbar-fixed-top").addClass("bg-nav");
    } else {
        $(".navbar-fixed-top").removeClass("bg-nav");
    }
    $(window).scroll(function () {
        if ($(window).scrollTop() > 80) {
            $(".navbar-fixed-top").addClass("bg-nav");
        } else {
            $(".navbar-fixed-top").removeClass("bg-nav");
        }
    });



    // Parallax
    var parallax = function () {
        $(window).stellar();
    };

    $(function () {
        parallax();
    });

    // AOS
    AOS.init({
        duration: 1200,
        once: true,
        disable: 'mobile'
    });



    //animatedModal
//    $("#demo01,#demo02,#demo03,#demo04,#demo05,#demo06,#demo07,#demo08,#demo09").animatedModal();

    // Contact Form 	

    // validate contact form
    $(function () {
        $('#contact-form').validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2
                },
                email: {
                    required: true
                },
                phone: {
                    required: false
                },
                message: {
                    required: true
                }

            },
            messages: {
                name: {
                    required: "This field is required",
                    minlength: "your name must consist of at least 2 characters"
                },
                email: {
                    required: "This field is required"
                },
                message: {
                    required: "This field is required"
                }
            },
            submitHandler: function (form) {
                console.log($(form).serialize());
                $(form).ajaxSubmit({
                    type: "POST",
                    url: "https://formspree.io/xwknaanv",
                    success: function () {
                        $('#contact :input').attr('disabled', 'disabled');
                        $('#contact').fadeTo("slow", 1, function () {
                            $(this).find(':input').attr('disabled', 'disabled');
                            $(this).find('label').css('cursor', 'default');
                            $('#success').fadeIn();
                        });
                    },
                    error: function () {
                        // $('#contact').fadeTo("slow", 1, function () {
                        //     $('#error').fadeIn();
                        // });
                    }
                });
            }
        });

    });
});