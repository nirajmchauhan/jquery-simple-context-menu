/*
 * jQuery Simple Context Menu
 * Original author: Niraj Chauhan
 * Further changes, comments: @nirajmchauhan
 */;
(function ($, window, document, undefined) {
    var simpleContextMenu = 'simpleContextMenu',
        defaults = {
            options: {
                'Home': 'http://webstutorial.com/',
                'About Us': 'http://www.webstutorial.com/work-with-us',
                'Contact Us': 'http://www.webstutorial.com/work-with-us'
            }
        },
        elementClass = '.SimpleContextMenu';
    var multiElements = {};

    function Plugin(element, options) {
        this.element = element;
        this.options = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = simpleContextMenu;
        elementID = $(element).attr('id');
        elementValue = $(element).attr('id') + Math.floor((Math.random() * 10) + 1);
        multiElements[elementID] = elementValue;
        this.init();
    }
    Plugin.prototype = {
        init: function () {
            var menu = '<div id="' + multiElements[$(this.element).attr('id')] + '" class="SimpleContextMenu">';
            this.simpleContextMenuTrigger('#' + multiElements[$(this.element).attr('id')]);
            if (this.options.html != undefined) {
                menu += this.options.html;
            } else {
                menu += '<ul>';
                $.each(this.options.options, function (text, link) {
                    menu += Plugin.prototype.renderMenu(link, text);
                });
                menu += '</ul>';
            }
            menu += '</div>';
            $('body').append(menu);
        },
        renderMenu: function (link, text) {
            return '<li class="' + text.replace(/\s+/, "") + '"><a href="' + link + '">' + text + '</a></li>';
        },
        simpleContextMenuTrigger: function (currentElement) {
            $(this.element).bind('contextmenu', function (e) {
                e.preventDefault();
                $('.SimpleContextMenu').hide();
                yPosition = ((e.pageY + $(currentElement).height()) > $(window).height()) ? e.pageY - $(currentElement).height() : e.pageY;
                xPosition = ((e.pageX + $(currentElement).width()) > $(window).width()) ? e.pageX - $(currentElement).width() : e.pageX;

                $(currentElement).show();
                $(currentElement).css({
                    left: xPosition,
                    top: yPosition
                });
            });

            $('*').bind('click', function (e) {
                $(currentElement).hide();
            });

            $('.SimpleContextMenu').bind('contextmenu', function (e) {
                $(this).hide();
            });
        }
    };
    $.fn[simpleContextMenu] = function (options) {
        return this.each(function () {
            if (!$.data(this, 'plugin_' + simpleContextMenu)) {
                $.data(this, 'plugin_' + simpleContextMenu,
                new Plugin(this, options));
            }
        });
    }
})(jQuery, window, document);