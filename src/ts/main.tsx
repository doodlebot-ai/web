import WOW from "wow.js";
import $ from "jquery";
import "particles.js";

import 'bootstrap';
import "bootstrap/scss/bootstrap.scss";
import db_logo from "../../assets/images/doodlebot.png";
import "../../assets/css/animate.css";
import "../../assets/css/LineIcons.2.0.css";
import "../../assets/css/default.css";
import "../../assets/css/style.css";


$(function () {

    "use strict";

    //===== Prealoder

    $('.preloader').delay(500).fadeOut(200);


    //===== Sticky

    $(window).on('scroll', function (event) {
        let scroll = $(window).scrollTop();
        if (!scroll) return; 
        if (scroll < 20) {
            $(".navbar-area").removeClass("sticky");
            $(".navbar .navbar-brand img").attr("src", db_logo);
        } else {
            $(".navbar-area").addClass("sticky");
            $(".navbar .navbar-brand img").attr("src", db_logo);
        }
    });



    //===== Section Menu Active

    let scrollLink = $('.page-scroll');
    // Active link switching
    $(window).scroll(function () {
        let scrollbarLocation = $(this).scrollTop();


        scrollLink.each(function () {
            if (!scrollbarLocation) return;
            let sectionOffset = $(this).offset();
            if (sectionOffset){
                if ((sectionOffset.top - 73) <= scrollbarLocation) {
                    $(this).parent().addClass('active');
                    $(this).parent().siblings().removeClass('active');
                }
            }
        });
    });


    //===== close navbar-collapse when a  clicked

    $(".navbar-nav a").on('click', function () {
        $(".navbar-collapse").removeClass("show");
    });

    $(".navbar-toggler").on('click', function () {
        $(this).toggleClass("active");
    });

    $(".navbar-nav a").on('click', function () {
        $(".navbar-toggler").removeClass('active');
    });


    //===== Counter Up

    // $('.counter').counterUp({
    //     delay: 10,
    //     time: 3000
    // });

    //===== Login 
    $.ajaxSetup({
        crossDomain: true,
    });
    $("#loginform")?.on('submit', evt => {
        evt.preventDefault();
        $.ajax({
          url:"https://api.doodlebot.ai/api/auth/login",
          method: "POST",
          data: $("#loginform").serialize()
        }).done(resp => {
          console.log(resp);
          window.location.replace("/app");
        }).fail(resp => {
          $("#err_popup").show();
          if(resp.responseJSON?.msg){
              $("#err_msg").text(resp.responseJSON.msg);
          }
          console.error(resp);
        })
    });

    //===== Register
    $("#registerform")?.on('submit', evt => {
        evt.preventDefault();
        $.ajax({
          url:"https://api.doodlebot.ai/api/auth/register",
          method: "POST",
          data: $("#registerform").serialize()
        }).done(resp => {
          console.log(resp);
          window.location.replace("/login");
        }).fail(resp => {
          $("#err_popup").show();
          console.error(resp);
        })
    });

    //===== Demo register
    $("#demo_register")?.on('submit', evt => {
        evt.preventDefault();
        $.ajax({
          url:"https://api.doodlebot.ai/api/signup",
          method: "POST",
          data: $("#demo_register").serialize()
        }).done(resp => {
          console.log(resp);
          window.location.replace("/demo2");
        }).fail(resp => {
          console.error(resp);
        })
    });

    //===== Back to top

    // Show or hide the sticky footer button
    $(window).on('scroll', function (event) {
        let top = $(this).scrollTop();
        if(top == undefined) return;
        if (top > 600) {
            $('.back-to-top').fadeIn(200);
        } else {
            $('.back-to-top').fadeOut(200);
        }
    });


    //Animate the scroll to yop
    $('.back-to-top').on('click', function (event) {
        event.preventDefault();

        $('html, body').animate({
            scrollTop: 0,
        }, 1500);
    });


    //=====  WOW active

    new WOW().init();


    //=====  particles


    if (document.getElementById("particles-1")) particlesJS("particles-1", {
        "particles": {
            "number": {
                "value": 40,
                "density": {
                    "enable": !0,
                    "value_area": 4000
                }
            },
            "color": {
                "value": ["#FFFFFF", "#FFFFFF", "#FFFFFF"]
            },
            "shape": {
                "type": "circle",
                "stroke": {
                    "width": 0,
                    "color": "#fff"
                },
                "polygon": {
                    "nb_sides": 5
                },
                "image": {
                    "src": "img/github.svg",
                    "width": 33,
                    "height": 33
                }
            },
            "opacity": {
                "value": 0.15,
                "random": !0,
                "anim": {
                    "enable": !0,
                    "speed": 0.2,
                    "opacity_min": 0.15,
                    "sync": !1
                }
            },
            "size": {
                "value": 50,
                "random": !0,
                "anim": {
                    "enable": !0,
                    "speed": 2,
                    "size_min": 5,
                    "sync": !1
                }
            },
            "line_linked": {
                "enable": !1,
                "distance": 150,
                "color": "#ffffff",
                "opacity": 0.4,
                "width": 1
            },
            "move": {
                "enable": !0,
                "speed": 1,
                "direction": "top",
                "random": !0,
                "straight": !1,
                "out_mode": "out",
                "bounce": !1,
                "attract": {
                    "enable": !1,
                    "rotateX": 600,
                    "rotateY": 600
                }
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {
                    "enable": !1,
                    "mode": "bubble"
                },
                "onclick": {
                    "enable": !1,
                    "mode": "repulse"
                },
                "resize": !0
            },
            "modes": {
                "grab": {
                    "distance": 400,
                    "line_linked": {
                        "opacity": 1,
                    }
                },
                "bubble": {
                    "distance": 250,
                    "size": 0,
                    "duration": 2,
                    "opacity": 0,
                    "speed": 3
                },
                "repulse": {
                    "distance": 400,
                    "duration": 0.4
                },
                "push": {
                    "particles_nb": 4
                },
                "remove": {
                    "particles_nb": 2
                }
            }
        },
        "retina_detect": !0
    });

    if (document.getElementById("particles-2")) particlesJS("particles-2", {
        "particles": {
            "number": {
                "value": 40,
                "density": {
                    "enable": !0,
                    "value_area": 4000
                }
            },
            "color": {
                "value": ["#FFFFFF", "#FFFFFF", "#FFFFFF"]
            },
            "shape": {
                "type": "circle",
                "stroke": {
                    "width": 0,
                    "color": "#fff"
                },
                "polygon": {
                    "nb_sides": 5
                },
                "image": {
                    "src": "img/github.svg",
                    "width": 33,
                    "height": 33
                }
            },
            "opacity": {
                "value": 0.15,
                "random": !0,
                "anim": {
                    "enable": !0,
                    "speed": 0.2,
                    "opacity_min": 0.15,
                    "sync": !1
                }
            },
            "size": {
                "value": 50,
                "random": !0,
                "anim": {
                    "enable": !0,
                    "speed": 2,
                    "size_min": 5,
                    "sync": !1
                }
            },
            "line_linked": {
                "enable": !1,
                "distance": 150,
                "color": "#ffffff",
                "opacity": 0.4,
                "width": 1
            },
            "move": {
                "enable": !0,
                "speed": 1,
                "direction": "top",
                "random": !0,
                "straight": !1,
                "out_mode": "out",
                "bounce": !1,
                "attract": {
                    "enable": !1,
                    "rotateX": 600,
                    "rotateY": 600
                }
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {
                    "enable": !1,
                    "mode": "bubble"
                },
                "onclick": {
                    "enable": !1,
                    "mode": "repulse"
                },
                "resize": !0
            },
            "modes": {
                "grab": {
                    "distance": 400,
                    "line_linked": {
                        "opacity": 1,
                    }
                },
                "bubble": {
                    "distance": 250,
                    "size": 0,
                    "duration": 2,
                    "opacity": 0,
                    "speed": 3
                },
                "repulse": {
                    "distance": 400,
                    "duration": 0.4
                },
                "push": {
                    "particles_nb": 4
                },
                "remove": {
                    "particles_nb": 2
                }
            }
        },
        "retina_detect": !0
    });






});
