(function ($) {

    //$('.video-player').videoPlayer();

    $(document).ready(function () {
        $('.is-arrow-down a').click(function (e) {
            if ($(this).parents(".is-section").nextAll('div:not(.is-hidden)').html()) { /* .hidden class can be used as an exception */
                $('html,body').animate({
                    scrollTop: $(this).parents(".is-section").nextAll('div:not(.is-hidden)').offset().top - parseInt($('.is-wrapper').css('padding-top')) /* + 1 Adjustment due to topbar height*/
                }, 800);
            }
            e.preventDefault();
            e.stopImmediatePropagation();
            return false;
        });
        

        $('.article img').each(function () {
            if (!$(this).hasClass('share-popup__close')) {
                //$(this).attr('data-action', 'zoom');
            }
        });

        //$('.playVideo').videoPlayer({});
    });

    $(document).on('click', '.forceLoginModal', function (e) {
        e.preventDefault();
        e.stopPropagation();
        $('.account-modal__container').addClass('active');
    });

    function draggable() {
        if ($(".banner__container").width() > $(".banner").width()) {
            $(".banner__container").draggable({
                cursor: "move",
                containment: "banner",
                axis: 'x',
                drag: function (event, ui) {
                    ui.position.left = Math.min(0,
                            ($(".banner").width() - $(".banner__container").width()) < ui.position.left ?
                            ui.position.left : ($(".banner").width() - $(".banner__container").width())
                            );
                }
            });
        }
    }
    draggable();




    $(window).resize(function () {
        if ($('.side-navigation').is(':visible')) {
            var currentWidth = $('.side-navigation').width();
            var windowWidth = $(window).width();
            if (currentWidth > windowWidth && windowWidth > 300) {
                var newWidth = windowWidth - 20;
                $('.side-navigation').css('width', newWidth + 'px');
            }
        }
        draggable();
    });


    /*    $('.card--social.video  .video-player').on('click', function (e) {
     e.preventDefault();
     e.stopPropagation();
     
     var data = [];
     var dataObj = $(this).closest('.card--social.video');
     data['label'] = $(dataObj).data('label');
     data['content'] = $(dataObj).data('article-text');
     data['username'] = $(dataObj).data('user-name');
     data['user_image'] = $(dataObj).data('user-image');
     data['source'] = $(dataObj).data('source');
     data['url'] =       $(this).data('url');
     data['share_url'] = $(dataObj).find('.card').attr('href');
     data['templatePath'] = _appJsConfig.templatePath;
     
     if(data['source'] == 'youtube'){
     var watch = data['url'].split("="); 
     data['url'] = "https://www.youtube.com/embed/"+watch[1];
     }
     
     var articleTemplate = Handlebars.compile(socialVideoTemplate);
     var article = articleTemplate(data);
     
     $('.modal .modal-content').html(article);
     //$('body').modalmanager('loading');
     setTimeout(function () {
     $('.modal').modal('show');
     }, 500);
     });
     */

    $('.modal').on('hidden.bs.modal', function () {
        $('.modal .modal-content *').remove();
    });


    $(document).on('click', '.social-modal__image_container', function (e) {
        $('.modal').modal('hide');
    });

    $(document).on('click', '.social-modal__video_wrap', function (e) {
        e.stopPropagation();
    });

    $(document).on('click', '.social-modal__image_image', function (e) {
        e.stopPropagation();
    });

    $(document).on('click', '.button__share, .header_actions__share', function (e) {
        $('.share-popup').addClass('active');
        $(document).one('click', '.modal, .share-popup__close, .article', function (e) {
            e.preventDefault();
            $('.share-popup.active').removeClass('active');
        });
        return false;
    });

    $(document).on('click', '.share-popup', function (e) {
        e.stopPropagation();
    });

    $(document).on("focus", '.share-link', function () {
        $(this).select();
    });
    $(document).on("mouseup", '.share-link', function (e) {
        e.preventDefault();
    });

    $(document).on("click", '.share-popup__copy-text', function (e) {
        e.preventDefault();
        var shareLinkBox = $('.share-popup__share-link');
        shareLinkBox.select();
        try {
            var successful = document.execCommand('copy');
            noty({
                type: "success",
                text: "Link copied successfully",
                layout: 'topRight',
                timeout: 2000,
                dismissQueue: true,
                animation: {
                    open: 'animated bounceInRight', // jQuery animate function property object
                    close: 'animated bounceOutRight', // jQuery animate function property object
                    easing: 'swing', // easing
                    speed: 500 // opening & closing animation speed
                }
            });
        } catch (err) {
            console.log('Oops, unable to copy');
        }
    });


    if ($('.dropdown-toggle')) {
        $('.dropdown-toggle').dropdown()
    }
    ;

    //
    // /*
    //  * Follow Blog on article page
    //  */
//    $('.followArticleBtn').followUser({
//        onSuccess: function (data, obj) {
//            ($(obj).data('status') === 'follow') ? $(obj).html("Follow") : $(obj).html("Unfollow");
//            var message = ($(obj).data('status') === 'follow') ? 'Writer unfollowed successfully' : 'Writer followed successfully';
//            $.fn.General_ShowNotification({message: message});
//        },
//        onError: function (obj, errorMessage) {
//            $.fn.General_ShowNotification({message: errorMessage, type: 'error', timeout: 4000});
//            ($(obj).data('status') === 'follow') ? $(obj).html("Follow") : $(obj).html("Unfollow");
//        },
//        beforeSend: function (obj) {
//            $(obj).html('Wait...');
//        }
//    });



    $("#owl-thumbnails").owlCarousel({
        items: 2,
        itemsDesktop: [1199, 2],
        itemsDesktopSmall: [980, 1],
        itemsTablet: [768, 1],
        itemsMobile: [600, 1],
        pagination: true,
        navigation: true,
        loop: true,
        autoplay: true,
        autoplayTimeout: 1000,
        navigationText: [
            "<i class='fa fa-angle-left fa-2x'></i>",
            "<i class='fa fa-angle-right fa-2x'></i>"
        ]
    });

    //Contact form validation
    $('#contactForm').validate({
        rules: {
            name: "required",
            email: "required email",
            message: "required"
        },
        // errorElement: "span",
        messages: {
            name: "Name cannot be blank.",
            email: {
                required: "Email cannot be blank",
                email: "Please enter a valid email address"
            },
            message: "Message cannot be blank."
        }
    });



    /************************************************************************************
     *                  USER EDIT PROFILE PAGE JS
     ************************************************************************************/

//    $('.uploadFileBtn').uploadFile({
//        onSuccess: function (data, obj) {
//            var resultJsonStr = JSON.stringify(data);
//
//            var imgClass = $(obj).data('imgcls');
//            $('.' + imgClass).css('background-image', 'url(' + data.url + ')');
//
//            var fieldId = $(obj).data('id');
//            $('#' + fieldId).val(resultJsonStr);
//
//            $().General_ShowNotification({message: 'Image added successfully'});
//        },
//        onError: function (obj, errorMessage) {
//            $().General_ShowNotification({message: errorMessage, type: 'error', timeout: 4000});
//        }
//    });

    $('.searchArticle').on('click', function (e) {
        var searchTerm = $('#searchArticleForm').find('input').val().trim();
        $('#searchArticleForm').find('input').val(searchTerm);
        if (!searchTerm) {
            return false;
        }
    });

    $(document).ready(function () {
        var $back, $navigation, $nextItem;
        $navigation = '.responsive-navigation';
        $nextItem = '<span class="next-item"><i class="fa fa-angle-right"></i></span>';
        $back = '<li class="back"><a href="javascript:;"><i class="fa fa-chevron-left"></i>Back</a></li>';
        $(".responsive-navigation .responsive-navigation__list li:has(ul)").prepend($nextItem);
        $(".responsive-navigation .responsive-navigation__list .sub-menu").prepend($back);

        //$('.header__navigation-list').children().clone().appendTo('.responsive-navigation');

        $('#header-responsive').on('click', function () {
            $('body').addClass('no-scroll');
            $('.responsive-navigation').addClass('navigation-active');
        });

        $('.responsive-navigation .next-item').on('click', function (e) {
            e.preventDefault();
            $(this).nextAll('.sub-menu').addClass('navigation-active');
        });

        $('.responsive-navigation .back').on('click', function (e) {
            e.preventDefault();
            $(this).parent('.sub-menu').removeClass('navigation-active');
        });

        $('.close-menu').on('click', function () {
            $('.responsive-navigation').removeClass('navigation-active');
            $('body').removeClass('no-scroll');
        });

        $('.menu-overlay').on('click', function () {
            $('.responsive-navigation').removeClass('navigation-active');
            $('body').removeClass('no-scroll');
        });

        $(".header__navigation-list li:has(ul)").addClass("menu-item-has-children");
        $(".header__navigation-list li:has(ul) > a").addClass("has-child");
    });
    
    // Side nav dropdown
    $('.side-navigation__item--dropdown').on('click', function (e) {
      if ($(e.target).hasClass('side-navigation__link')) {
        $(this).find('.side-navigation__dropdown').first().toggleClass('active');
        console.log('dream');
      }
    });

    $('.side-navigation__dropdown_item--dropdown').on('click', function () {
      $(this).find('.side-navigation__dropdown').first().toggleClass('active');
      console.log('seconf');
    });

    $('.side-navigation').on('click', function (e) {
      if ($(e.target).hasClass('.side-navigation__item--dropdown') || !$(e.target).closest('.side-navigation__item--dropdown').length) {
          $('.side-navigation__dropdown').removeClass('active');
          console.log(!$(e.target).hasClass('.side-navigation__item--dropdown'));
      }
    });

    // Header link active state
    $('.header__navigation-item').on('click', function () {
      if (!$(this).hasClass('dropdown')) {
        $(this).addClass('active');
      }
    });


    $('.account-modal__buttons_signup--social').on('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var elem = $(this);
        $('.account-modal__content_section--signup_social').find('.account-modal__input').each(function () {
            if ($(this).val().length === 0) {
                $(this).closest('.account-modal__input-container').addClass('error');
            }
        });
        var verifyPass = $('.account-modal__content_section--signup_social').find('.account-modal__input--password').val() === $('.account-modal__content_section--signup_social').find('.account-modal__input--verifypassword').val();
        var verifyInputs = !$('.account-modal__content_section--signup_social').find('.account-modal__input-container').hasClass('error');
        if (verifyInputs && verifyPass) { // Add in condition for signup
            $(elem).prev().removeClass('active');
            $('#socialSignupForm').submit();
        } else {
            if (!verifyPass) {
                $('.account-modal__content_section--signup').find('.account-modal__input--verify-password').closest('.account-modal__input-container').addClass('error').removeClass('answered');
            }
            $(elem).prev().addClass('active');
        }
    });

}(jQuery));





