/**
 * Handlebar Article templates for listing
 */

var systemCardTemplate = '<div class="{{containerClass}}">'+
    '<article class="swap card--article {{#unless hasMedia}} card__no-image {{/unless}} {{blogClass}} Article{{articleId}}"  data-id="{{articleId}}" data-position="{{position}}" data-social="0" data-article-image="{{imageUrl}}" data-article-text="{{title}}">'+
        '<a  itemscope itemtype="http://schema.org/NewsArticle"  itemprop="url" href="{{url}}" class="card card--technology link"  data-id="{{articleId}}" data-position="{{position}}" data-social="0" data-article-image="{{imageUrl}}" data-article-text="{{title}}" {{#if hasMedia}}  style="background-image:url({{imageUrl}})" {{/if}}>'+
        '<meta itemscope itemprop="mainEntityOfPage"  itemType="https://schema.org/WebPage" itemid="{{url}}"/>'+
	'{{#if hasMedia}}  '+
        '<div itemprop="image" itemscope itemtype="https://schema.org/ImageObject">'+
            '<meta itemprop="url" content="{{featuredMedia.media.url}}"/>'+
            '<meta itemprop="width" content="{{featuredMedia.media.width}}"/>'+
            '<meta itemprop="height" content="{{featuredMedia.media.height}}"/>'+
        '</div>'+
        '{{/if}}'+
        '{{#if publisher.url}}  '+
        '<div itemprop="publisher" itemscope itemtype="https://schema.org/Organization">'+
            '<meta itemprop="name" content="{{publisher.name}}"/>'+
            '<div itemprop="logo" itemscope itemtype="https://schema.org/ImageObject">'+
                '<meta itemprop="url" content="{{publisher.url}}"/>'+
                '<meta itemprop="width" content="{{publisher.width}}"/>'+
                '<meta itemprop="height" content="{{publisher.height}}"/>'+
            '</div>'+
        '</div>'+
        '{{/if}}'+
        '<div itemprop="author" itemscope itemtype="https://schema.org/Person">'+
            '<meta itemprop="name" content="{{createdBy.displayName}}"/>'+
        '</div>'+
        '<meta itemprop="datePublished" content="{{metaPublishDate}}"/>'+
	'<meta itemprop="dateModified" content="{{metaUpdateDate}}"/>'+
            '<div class="card__overlay">'+
                '<div class="card__content_wrap">'+
                    '{{#if userHasBlogAccess}}'+
                    '<div class="admin-actions">'+
                        '<div class="admin-actions__action admin-actions__action--hide HideBlogArticle" data-guid="{{guid}}" data-social="0">'+
                            '<span>HIDE</span>'+
                            '<img src="{{templatePath}}/static/images/icons/editor/hide.svg" alt="Hides">'+
                        '</div>'+
                            
                        '<div class="admin-actions__action admin-actions__action--pin PinArticleBtn {{pinCls}}" data-position="{{position}}" data-social="0" data-id="{{articleId}}" title="{{pinTitle}}" data-status="{{isPinned}}">'+
                            '<span>{{pinText}}</span>'+
                            '<img src="{{templatePath}}/static/images/icons/editor/pin.svg" alt="Pin-Unpin">'+
                        '</div>'+
                        '{{#if userHasEditArticleAccess}}'+
                            '<div class="admin-actions__action admin-actions__action--edit" onclick="window.location =\'{{{editUrl}}}\'; return false;">'+
                                '<span>EDIT</span>'+
                                '<img src="{{templatePath}}/static/images/icons/editor/edit.svg" alt="Edit">'+
                            '</div>'+
                        '{{/if}}'+
                    '</div>'+		
                    '{{/if}}'+
                    '<div class="card__content">'+
                        '<div class="card__channel-wrap">'+
                            '<h5 class="card__channel">{{label}}</h5>'+
                        '</div>'+
                        '<h3 itemprop="headline" class="card__headline">{{{title}}}</h3>'+
                        '<p class="card__text">{{{excerpt}}}</p>'+
                        '<div class="card__read-time_wrap">'+
                            '<p class="card__read-time"><span class="card__paragraph-icon"></span>{{readingTime}}</p>'+
                        '</div>'+
                    '</div>'+
                '</div>'+
            '</div>'+
        '</a>'+
    '</article>'+
'</div>';
                                                
var socialCardTemplate = 
        '<div class="{{containerClass}}">'+
        '<article class="card--social swap {{social.media.type}} Social{{socialId}}" data-source="{{social.source}}" data-id="{{socialId}}" data-position="{{position}}" data-social="1" data-article-image="{{social.media.path}}" data-article-text="{{ social.content}}">'+
            '<a href="{{ social.url }}" class="card card--lifestyle linkcard__{{social.source}} {{#unless social.hasMedia}} card__no-image {{/unless}} socialCard" data-blog-guid="{{social.blog.guid}}" data-guid="{{social.guid}}" {{#if social.hasMedia}} style="background-image:url({{social.media.path}})"{{/if}} target="_blank">'+
                '<div class="card__overlay">'+
                    '<div class="card__content_wrap">'+
                        '{{#if userHasBlogAccess}}'+
                            '<div class="admin-actions socialMenu">'+
                                '<div class="admin-actions__action admin-actions__action--hide HideBlogArticle" data-guid="{{social.guid}}" data-social="1">'+
                                        '<span>HIDE</span>'+
                                        '<img src="{{templatePath}}/static/images/icons/editor/hide.svg" alt="Hide">'+
                                    '</div>'+
                                    '<div class="admin-actions__action admin-actions__action--pin PinArticleBtn {{#if isPinned}} selected {{/if}}" data-status="{{isPinned}}" data-position="{{position}}" data-social="1" data-id="{{socialId}}" title="{{pinTitle}}">'+
                                        '<span>{{pinText}}</span>'+
                                        '<img src="{{templatePath}}/static/images/icons/editor/pin.svg" alt="Pin-Unpin">'+
                                    '</div>'+
                                    '<div class="admin-actions__action admin-actions__action--edit editSocialPost" data-social="1" data-url ="/admin/social-funnel/update-social?guid={{social.blog.guid}}&socialguid={{social.guid}}"'+
                                        '<span>EDIT</span>'+
                                        '<img src="{{templatePath}}/static/images/icons/editor/edit.svg" alt="Edit">'+
                                    '</div>'+
                                '</div>'+
                        '{{/if}}'+
                        '<div class="card__content">'+
                            '<div class="card__channel-wrap">'+
                                '<h5 class="card__channel">{{social.blog.title}}</h5>'+
                            '</div>'+
                            '{{#if hasMediaVideo}}'+
                                '<div class="card__text-wrap">'+
                                    '<img class="card__play-button video-player" data-source="{{social.source}}" data-url="{{social.media.videoUrl}}" data-poster="{{social.media.path}}" src="{{templatePath}}/static/images/icons/play-white.svg" alt="Play">'+
                                    '<p class="card__text description" id="updateSocial{{socialId}}" data-update="0">{{{trimString social.content 50}}}</p>'+
                               '</div>'+
                               '<p class="card__author"><i class="card__network-icon fa fa-{{social.source}}-play"></i> @{{social.user.name}}</p>'+
                            '{{/if}}'+
                            '{{#unless hasMediaVideo}}'+
                                '<p class="card__text description" id="updateSocial{{socialId}}" data-update="0">{{{trimString social.content 50}}}</p>'+
                                '<p class="card__author"><i class="card__network-icon fa fa-{{social.source}}"></i>{{social.user.name}}</p>'+
                            '{{/unless}}'+
                        '</div>'+
                    '</div>'+
                '</div>'+
            '</a>'+
        '</article>'+
    '</div>';
    
    
var socialPostPopupTemplate = '<button type="button" class="close close__lg-modal" data-dismiss="modal" aria-label="Close">'+
        '<span aria-hidden="true">'+
            '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Close</title><g stroke="#6395AA" stroke-width="3" fill="" fill-rule="evenodd" stroke-linecap="round"><path d="M17.803 2L2 17.803M2.08 2.08l15.803 15.803"/></g></svg>'+
            '<div class="close__text">esc</div>'+
        '</span>'+
    '</button>'+
    '<div class="social-modal__content {{#unless hasMedia}} no_image {{/unless}}">'+
            '<button type="button" class="close close__sm-modal" data-dismiss="modal" aria-label="Close">'+
                    '<span aria-hidden="true">'+
                            '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Close</title><g stroke="#FFF" stroke-width="3" fill="" fill-rule="evenodd" stroke-linecap="round"><path d="M17.803 2L2 17.803M2.08 2.08l15.803 15.803"/></g></svg>'+
                    '</span>'+
            '</button>'+
            '<div class="social-modal__channel social-modal__channel--technology">{{blog.title}}</div>'+
            '<div class="social-modal__overflow">'+
                '<a href="{{url}}" target="_blank"><div class="social-modal__text">{{content}}</div></a>'+
            '</div>'+
            '<div class="article__profile">'+
                '<span class="profile__user_image" style="background-image: url(\'{{user.media.path}}\'); height: 56px; width: 56px; background-size: cover; display: inline-block; border-radius: 50%;"></span>'+
                '<div class="profile__author_wrap">'+
                    '<span class="article__author">By {{user.name}}</span>'+
                    '<div class="profile__button-wrap">'+
                        '<div class="button button__share">Share'+
                            '<div class = "share-popup" >'+
                                '<div class = "share-popup__title-wrap" >'+
                                    '<span class = "share-popup__title" > Share: </span>'+
                                    '<img class = "share-popup__close" src = "{{templatePath}}/static/images/icons/close-small.svg" alt = "" >'+
                                '</div>'+
                                '<input name="share-link" value="{{url}}" readonly = "" class = "share-popup__share-link share-link" type = "text" >'+
                                '<div class = "share-popup__social-wrap" >'+
                                    '<div class = "social-icon_wrap--colored" >'+
                                        '<a href="https://plus.google.com/share?url={{url}}" target="_blank"><i class="fa fa-google-plus"></i></a>'+
                                        '<a href="http://www.facebook.com/sharer/sharer.php?u={{url}}" target="_blank" ><i class="fa fa-facebook"></i></a>'+
                                        '<a href="http://twitter.com/intent/tweet?status={{url}}" target="_blank"><i class="fa fa-twitter"></i></a>'+
                                    '</div>'+
                                    '<span class = "share-popup__copy-text" > Copy Link </span>'+
                                '</div>'+
                            '</div> '+           
                        '</div>'+
                    '</div>'+
                '</div>'+
            '</div>'+
        '</div>'+
    '{{#if hasMedia}}'+
        '<div class="social-modal__image_container">'+
            '<div class="social-modal__image_wrap">'+
                '{{#if hasMediaVideo}}'+
                    '<div class="social-modal__video-wrap">'+
                        '<div>'+
                            '<iframe src="{{media.videoUrl}}" frameborder="0" allowfullscreen></iframe>'+
                        '</div>'+
                    '</div>'+
                '{{else}}'+
                    '<div class="social-modal__image" >'+
                        '<img class="social-modal__image_image" src="{{media.path}}" alt="" />'+
                    '</div>'+
                '{{/if}}'+
            '</div>'+
        '</div>'+
        '{{/if}}';
