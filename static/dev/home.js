var HomeController = (function ($) {
    return {
        listing: function () {
            HomeController.Listing.init();
        },
        blog: function() {
            HomeController.Blog.init();
        }
    };
}(jQuery));

HomeController.Listing = (function ($) {

    var bindPinUnpinArticle = function(){
        $('.PinArticleBtn').Ajax_pinUnpinArticle({
            onSuccess: function(data, obj){
                var status = $(obj).data('status');
                (status == 1) 
                    ? $(obj).attr('title', 'Un-Pin Article') 
                    : $(obj).attr('title', 'Pin Article');
               (status == 1) 
                    ? $(obj).find('span').first().html('UN-PIN') 
                    : $(obj).find('span').first().html('PIN');
            }
        });
    };
    
    var bindDeleteHideArticle = function(){
        $('.HideBlogArticle').Ajax_deleteArticle({
            onSuccess: function(data, obj){
                $(obj).closest('article').parent('div').remove();
            }
        });
    };
    
    var attachEvents = function () {
        $('#content').on('click', 'div.admin-actions__action--edit', function(e){
            e.stopPropagation();
        });
        
        var bindSocialPostPopup = function(){
            $('#content').on('click', 'a.socialCard', function(e){
                e.preventDefault();
                
                var blogGuid = $(this).data('blog-guid');
                var postGuid = $(this).data('guid');
                
                var csrfToken = $('meta[name="csrf-token"]').attr("content");
                $.ajax({
                    type: 'POST',
                    url: _appJsConfig.appHostName + '/api/social/get-social-post',
                    dataType: 'json',
                    data: {blog_guid: blogGuid, guid: postGuid,  _csrf: csrfToken},
                    success: function(data, textStatus, jqXHR) {
                        data.hasMediaVideo= false;
                        if(data.media['type'] === 'video') {
                            data.hasMediaVideo = true;
                        }
                        data.templatePath = _appJsConfig.templatePath;
                        
                        if(data.source == 'youtube'){
                            var watch = data.media.videoUrl.split("=");
                            data.media.videoUrl = "https://www.youtube.com/embed/" + watch[1];
                        }

                        var articleTemplate = Handlebars.compile(socialPostPopupTemplate);
                        var article = articleTemplate(data);

                        $('.modal .modal-content').html(article);
                        //$('body').modalmanager('loading');
                        setTimeout(function () {
                            $('.modal').modal('show');
                        }, 500);
                    },
                    error: function(jqXHR, textStatus, errorThrown){

                    },
                    beforeSend: function(jqXHR, settings) { 

                    },
                    complete: function(jqXHR, textStatus) {

                    }
                });
            });
        };
        
        bindSocialPostPopup();
        
        if(_appJsConfig.isUserLoggedIn === 1 && _appJsConfig.userHasBlogAccess === 1) {
            //Bind pin/unpin article event
            bindPinUnpinArticle();

            //Bind delete social article & hide system article
            bindDeleteHideArticle();
        }
        
        function initSwap() {
            initDroppable();
            initDraggable();
        }

        function initDraggable() {
            $('.swap').draggable({
                helper: 'clone',
                revert: true,
                zIndex: 100,
                scroll: true,
                scrollSensitivity: 100,
                cursorAt: { left: 150, top: 50 },
                appendTo:'body',
//                containment: false,
                start: function( event, ui ) {
                    ui.helper.attr('class', '');
                    var postImage = $(ui.helper).data('article-image');
                    var postText = $(ui.helper).data('article-text');
                    if(postImage !== "") {
                        $('div.SwappingHelper img.article-image').attr('src', postImage);
                    }
                    else {
                        $('div.SwappingHelper img.article-image').attr('src', 'http://www.placehold.it/100x100/EFEFEF/AAAAAA&amp;text=no+image');
                    }
                    $('div.SwappingHelper p.article-text').html(postText);
                    $(ui.helper).html($('div.SwappingHelper').html());    
                }
            });
        }

        function initDroppable() {
            $('.swap').droppable({
                hoverClass: "ui-state-hover",
                drop: function(event, ui) {
                    var sourceObj = $(ui.draggable);
                    var $this = $(this);
                    //get positions
                    var sourcePosition = sourceObj.data('position');
                    var sourcePostId = parseInt($(sourceObj).data('id'));
                    var sourceIsSocial = parseInt($(sourceObj).data('social'));
                    var destinationPosition = $this.data('position');
                    var destinationPostId = parseInt($($this).data('id'));
                    var destinationIsSocial = parseInt($($this).data('social'));
                    
                    
                    $(this).after(ui.draggable.clone().removeAttr('style'));
                    $(ui.draggable).after($(this).clone());
                    $(ui.helper).remove(); //destroy clone
                    $(ui.draggable).remove();
                    $(this).remove();
                    
                    //swap positions
                    if(sourceIsSocial == 1) {
                        $('.Social'+sourcePostId).attr('data-position', destinationPosition);
                        $('.Social'+sourcePostId).find('.PinArticleBtn').attr('data-position', destinationPosition);
                    }
                    else {
                        $('.Article'+sourcePostId).attr('data-position', destinationPosition);
                        $('.Article'+sourcePostId).find('.PinArticleBtn').attr('data-position', destinationPosition);
                    }

                    if(destinationIsSocial == 1) {
                        $('.Social'+destinationPostId).attr('data-position', sourcePosition);
                        $('.Social'+destinationPostId).find('.PinArticleBtn').attr('data-position', sourcePosition);
                    }
                    else {
                        $('.Article'+destinationPostId).attr('data-position', sourcePosition);
                        $('.Article'+destinationPostId).find('.PinArticleBtn').attr('data-position', sourcePosition);
                    }
                    
                    var csrfToken = $('meta[name="csrf-token"]').attr("content");
                    var postData = {
                        sourcePosition: sourcePosition,
                        sourceArticleId: sourcePostId,
                        sourceIsSocial: sourceIsSocial,
                        
                        destinationPosition: destinationPosition,
                        destinationArticleId: destinationPostId,
                        destinationIsSocial: destinationIsSocial,
                        
                        _csrf: csrfToken
                    };
                    
                    $.ajax({
                        url: _appJsConfig.baseHttpPath + '/home/swap-article',
                        type: 'post',
                        data: postData,
                        dataType: 'json',
                        success: function(data){
                            if(data.success) {
                                $.fn.General_ShowNotification({message: "Articles swapped successfully"});
                            }
                            
                            $(".card p, .card h1").dotdotdot();
                            
                            initSwap();
                                                       
                            //Bind pin/unpin article event
                            bindPinUnpinArticle();

                            //Bind delete social article & hide system article
                            bindDeleteHideArticle();                            
                        },
                        error: function(jqXHR, textStatus, errorThrown){
                            $().General_ShowNotification({message: jqXHR.responseText, type: 'error', timeout: 4000});
                        },
                        beforeSend: function(jqXHR, settings) { 
                        },
                        complete: function(jqXHR, textStatus) {
                        }
                    });

                }
            }); 
        }

        if(_appJsConfig.isUserLoggedIn === 1 && _appJsConfig.userHasBlogAccess === 1) {
            initSwap();
        }
        
        $('.loadMoreArticles').on('click', function(e){
            e.preventDefault();
            var btnObj = $(this);
            $.fn.Ajax_LoadBlogArticles({
                onSuccess: function(data, textStatus, jqXHR){
                    if (data.success == 1) {
                        $('.ajaxArticles').data('existing-nonpinned-count', data.existingNonPinnedCount);

                        if (data.articles.length < 20) {
                            $(btnObj).css('display', 'none');
                        }
                        
                        for (var i in data.articles) { 
                            data.articles[i]['containerClass'] = 'col-third';
                            data.articles[i]['templatePath'] = _appJsConfig.templatePath;
                            data.articles[i]['pinTitle'] = (data.articles[i].isPinned == 1) ? 'Un-Pin Article' : 'Pin Article';
                            data.articles[i]['pinText'] = (data.articles[i].isPinned == 1) ? 'UN-PIN' : 'PIN';
                            data.articles[i]['readingTime']= renderReadingTime(data.articles[i].readingTime);
                            
                            data.articles[i]['blogClass']= '';
                            if(data.articles[i].blog['title'] !== null) {
                               data.articles[i]['blogClass']= data.articles[i].blog['title'].replace(' ', '').toLowerCase();
                            }  
                            
                            var ImageUrl = $.image({media:data.articles[i]['featuredMedia'], mediaOptions:{width: 500 ,height:350, crop: 'limit'} });
                            data.articles[i]['imageUrl'] = ImageUrl;

                            Handlebars.registerHelper('encode', function(options) {
                                return encodeURIComponent(options.fn(this));
                            });
                            
                            Handlebars.registerHelper('trimString', function(passedString,len) {
                                var theString = passedString.substring( 0, len );
                                
                                if(passedString.length > len) {
                                    theString += '...';
                                }
                                return new Handlebars.SafeString(theString)
                            });
                          
                            var articleId = parseInt(data.articles[i].articleId);
                            var articleTemplate;
                            if (isNaN(articleId) || articleId <= 0) {
                                data.articles[i]['hasMediaVideo']= 0;
                                if(data.articles[i]['social']['media']['type'] === 'video') {
                                    data.articles[i]['hasMediaVideo'] = 1;
                                }
                                
                                articleTemplate = Handlebars.compile(socialCardTemplate); 
                            } else {
                                articleTemplate = Handlebars.compile(systemCardTemplate);
                            }
                            var article = articleTemplate(data.articles[i]);
                            $('.ajaxArticles').append(article);
                        }
                        
                        bindSocialShareButton();
                        if (_appJsConfig.isUserLoggedIn === 1 && _appJsConfig.userHasBlogAccess === 1) {
                            //Bind pin/unpin article event
                            bindPinUnpinArticle();
                            //Bind delete social article & hide system article
                            bindDeleteHideArticle();
                            
                            bindSocialUpdatePost();
                            
                            
                            initSwap();
                        }
                    }
                },
                beforeSend: function(jqXHR, settings){
                    $(btnObj).html('<i class="fa fa-spinner fa-spin" aria-hidden="true"></i> Please wait...');
                },
                onComplete: function(jqXHR, textStatus){
                    $(btnObj).html('<i class="fa fa-arrow-down" aria-hidden="true"></i> Load More');
                }
            });
        });
        
        var renderReadingTime = function (time) {
            if (time <= '59') {
                return time + ' min read';
            } else {
                var hr = Math.round(parseInt(time) / 100);
                return hr + ' hour read';
            }
        };
        
        var bindSocialShareButton = function () {
            $(".card__social-share").on("click", function (e) {
                e.preventDefault();
                var elem = $(this);
                if (elem.hasClass('selected')) {
                    $(this).removeClass("selected");
                } else {
                    $(".card__social-share").removeClass('selected');
                    $(this).addClass("selected");
                }
            });
        };
        var bindSocialUpdatePost = function () {
            $('.editSocialPost').on('click', function (e) {
                e.preventDefault();
                e.stopPropagation();
                
                var elem = $(this);
                var url = elem.data('url');
                var popup = window.open(url, '_blank', 'toolbar=no,scrollbars=yes,resizable=false,width=360,height=450');
                popup.focus();

                var intervalId = setInterval(function () {
                    if (popup.closed) {
                        clearInterval(intervalId);
                        var socialId = elem.parents('a').data('id');
                        if ($('#updateSocial' + socialId).data('update') == '1') {
                            $().General_ShowNotification({message: 'Social Post(s) updated successfully.'});
                        }
                    }
                }, 50);

                return;
            });
        };
    };
    return {
        init: function () {
            attachEvents();
        }
    };

}(jQuery));

HomeController.Blog = (function ($) {
    
    var attachEvents = function () {
       
       $('.followSection').followBlog({
            'onSuccess': function(data, obj){
                var msg = ($(obj).data('status') === 'follow') ? 'Section un-followed successfully.' : 'Section followed successfully.';
                $().General_ShowNotification({message: msg});
            },
            'beforeSend': function(obj){
                $(obj).html('Please wait...');
            },
            'onComplete': function(obj){
                ($(obj).data('status') === 'follow') ? $(obj).html('Follow') : $(obj).html('Following');
            }
        });
       
        //attach follow blog
        $('.followBlog').followBlog({
            'onSuccess': function(data, obj){
                var msg = ($(obj).data('status') === 'follow') ? 'Blog un-followed successfully.' : 'Blog followed successfully.';
                $().General_ShowNotification({message: msg});
            },
            'beforeSend': function(obj){
                $(obj).html('<span class="button button__blog-follow">Please wait...</span>');
            },
            'onComplete': function(obj){
                ($(obj).data('status') === 'follow') ? $(obj).html('<span class="button button__blog-follow">Follow</span>') : $(obj).html('<span class="button button__blog-follow">Following</span>');
            }
        });
        
        //attach follow user
        $('.followUser').followUser({
            'onSuccess': function(data, obj){
                var msg = ($(obj).data('status') === 'follow') ? 'User un-followed successfully.' : 'User followed successfully.';
                $().General_ShowNotification({message: msg});
            },
            'beforeSend': function(obj){
                $(obj).html("Please wait...");
            },
            'onComplete': function(obj){
                ($(obj).data('status') === 'follow') ? $(obj).html("Follow +") : $(obj).html("Following -");
            },
            'onError': function(data, msg){
                //var msg = ($(obj).data('status') === 'follow') ? 'User un-followed successfully.' : 'User followed successfully.';
                $().General_ShowNotification({message: msg, type: 'error', timeout: 4000});
            },
        });
        
    };
    
    return {
        init: function () {
            attachEvents();
        }
    };

}(jQuery));