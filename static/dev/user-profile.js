(function ($) {
    

//    $('.FollowUnfollowBlog').followBlog({
//        onSuccess: function (data, obj) {
//            var status = $(obj).data('status');
//            (status == 'unfollow') ? $(obj).html('Unfollow') : $(obj).html('Follow');
//            (status == 'unfollow') ? $(obj).addClass('active') : $(obj).removeClass('active');
//            var message = (status === 'follow') ? 'Blog unfollowed successfully' : 'Blog followed successfully';
//            $.fn.General_ShowNotification({message: message});
//        },
//        beforeSend: function (obj) {
//            //$(obj).find('.fa').addClass('fa-spin fa-spinner');
//        },
//        onError: function (obj, errorMessage) {
//            $.fn.General_ShowNotification({message: errorMessage, type: 'error', timeout: 4000});
//        },
//        onComplete: function (obj) {
//            //$(obj).find('.fa').removeClass('fa-spin fa-spinner');
//        }
//    });
    
    //
    // // profile user and writers
//    $('.FollowProfileUser').followUser({
//        onSuccess: function (data, obj) {
//            var status = $(obj).data('status');
//            $(obj).get(0).lastChild.nodeValue = " " + status.substr(0,1).toUpperCase()+status.substr(1);
//            var message = ($(obj).data('status') === 'follow') ? 'User unfollowed successfully' : 'User followed successfully';
//            $.fn.General_ShowNotification({message: message});
//        },
//        beforeSend: function (obj) {
//            $(obj).find('.fa').addClass('fa-spin fa-spinner');
//        },
//        onError: function (obj, errorMessage) {
//            $.fn.General_ShowNotification({message: errorMessage, type: 'error', timeout: 4000});
//        },
//        onComplete: function (obj) {
//            $(obj).find('.fa').removeClass('fa-spin fa-spinner');
//        }
//    });
    //
    //
    // /**
    //  * Follow Writer
    //  */
//    $('.followWriter, .followUser, .FollowUnfollowWriter').followUser({
//        onSuccess: function (data, obj) {
//            var status = $(obj).data('status');
//            if($(obj).hasClass('hasStar')) {
//                (status == 'unfollow') ? $(obj).addClass('selected') : $(obj).removeClass('selected');
//            }
//            (status == 'unfollow') ? $(obj).html('Unfollow') : $(obj).html('Follow');
//            (status == 'unfollow') ? $(obj).addClass('active') : $(obj).removeClass('active');
//            var message = (status === 'follow') ? 'User unfollowed successfully' : 'User followed successfully';
//            $.fn.General_ShowNotification({message: message});
//        },
//        onError: function (obj, errorMessage) {
//            $.fn.General_ShowNotification({message: errorMessage, type: 'error', timeout: 4000});
//        },
//        beforeSend: function (obj) {
//            $(obj).find('.fa').addClass('fa-spin fa-spinner');
//        },
//        onComplete: function (obj) {
//            $(obj).find('.fa').removeClass('fa-spin fa-spinner');
//        }
//    });
    

}(jQuery));


    


