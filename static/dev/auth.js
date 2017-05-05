var AuthController = (function ($) {
    return {
        loginOrSignup: function () {
            AuthController.LoginOrSignup.init();
        },
        socialSignup: function () {
            AuthController.SocialSignup.init();
        },
        forgotPassword: function () {
            AuthController.ForgotPassword.init();
        },
        resetPassword: function () {
            AuthController.ResetPassword.init();
        }
    };
}(jQuery));

AuthController.LoginOrSignup = (function ($) {

    var attachEvents = function () {
        $("#loginForm").validateLoginForm();
        $("#signupForm").validateSignupForm();
        
        $('.signupBtn').on('click', function () {
            $('.loginTab, #Login').removeClass('active');
            $('.signupTab, #SignUp').addClass('active');
        });
        $('.loginBtn').on('click',function () {
            $('.loginTab, #Login').addClass('active');
            $('.signupTab, #SignUp').removeClass('active');
        });
    };

    return {
        init: function () {
            attachEvents();
        }
    };

}(jQuery));
AuthController.SocialSignup = (function ($) {

    var attachEvents = function () {
        $("#signupForm").validateSocialSignupForm();
    };

    return {
        init: function () {
            attachEvents();
        }
    };

}(jQuery));

AuthController.ForgotPassword = (function ($) {

    var attachEvents = function () {
        $("#forgotPasswordForm").validate({
            rules: {
                email: {
                    required: true
                }
            },
            messages: {
                email: "Email or username cannot be blank."
            }
        });

    };

    return {
        init: function () {
            attachEvents();
        }
    };

}(jQuery));

AuthController.ResetPassword = (function ($) {

    var attachEvents = function () {
        $('.forgotten-password-modal__container').addClass('active');
        $('.forgotten-password-modal__content--change-password').addClass('active');
        
        function getParameterByName(name, url) {
            if (!url) {
              url = window.location.href;
            }
            name = name.replace(/[\[\]]/g, "\\$&");
            var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
                results = regex.exec(url);
            if (!results) return null;
            if (!results[2]) return '';
            return decodeURIComponent(results[2].replace(/\+/g, " "));
        }

        var token = getParameterByName('token');
        $('#reset-token').val(token);
    };

    return {
        init: function () {
            attachEvents();
        }
    };

}(jQuery));