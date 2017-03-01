var SearchController = (function ($) {
    return {
        listing: function () {
            SearchController.Listing.init();
        }
    };
}(jQuery));

SearchController.Listing = (function ($) {

    var attachEvents = function () {
        
        var renderReadingTime = function (time) {
            if (time <= '59') {
                return time + ' min read';
            } else {
                var hr = Math.round(parseInt(time) / 100);
                return hr + ' hour read';
            }
        };
        
        $('.loadMoreArticles').on('click', function(e){
            e.preventDefault();
            var btnObj = $(this);
            $.fn.Ajax_LoadSearchArticles({
                'search': $('input.header__search-text').val(),
                onSuccess: function(data, textStatus, jqXHR){
                    if (data.success == 1) {
                         
                         if(data.articles.length < 20) {
                            $(btnObj).css('display', 'none');
                         }
                         
                         for (var i in data.articles) { 
                            data.articles[i]['containerClass'] = 'col-third';
                            data.articles[i]['templatePath'] = _appJsConfig.templatePath;
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
                          
                            var articleTemplate = Handlebars.compile(systemCardTemplate);
                            var article = articleTemplate(data.articles[i]);
                            $('.ajaxArticles').append(article);
                        }

                     }
                },
                beforeSend: function(jqXHR, settings){
                    $(btnObj).html("Please wait...");
                },
                onComplete: function(jqXHR, textStatus){
                    $(btnObj).html("Load More");
                }
            });
        });

    };
    return {
        init: function () {
            attachEvents();
        }
    };

}(jQuery));