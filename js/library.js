// use this for library website customization

// inject custom css
(function loadcss() {
    var head = document.getElementsByTagName('head')[0];
    var link = document.createElement('link');
    link.type = 'text/css';
    link.rel = 'stylesheet';
    link.href = 'https://wcm.ent.sirsi.net/custom/web/library.css';
    head.appendChild(link);
})();

// add custom favicon- To do: host favicon locally
function changeFavicon() {
    var head = document.getElementsByTagName('head')[0];
    var link = document.createElement('link');
    var oldLink = document.querySelector("link[type='image/x-icon']");
    link.id = 'dynamic-favicon';
    link.rel = 'icon';
    link.href = 'https://wcm.ent.sirsi.net/custom/web/images/favicon.ico';
    if (oldLink) {
        head.removeChild(oldLink);
    }
    head.appendChild(link);
}
setTimeout(changeFavicon, 250);



// custom js and GA event Tracking 
var Lib = {
    p: function(element, cat, action, type) {
        $(element).each(function() {
            var label = type;
            if (label === 'title') {
                label = $(this).attr('title');
            } else if (label === 'value') {
                label = $(this).attr('value');
            } else if (label === 'alt') {
                label = $(this).attr('value');
            } else if (label === 'text') {
                label = this.text;
            }
            $(this).click(function() {
                ga('send', 'event', cat, action, label);
            });
        });

    },
    s: function() {
        $('#searchButton').click(function() {
            ga('send', 'event', 'Search Term', 'Search Catalog', document.getElementById('q').value);
        });
        $('input#searchForm').keypress(function(event) {
            if (event.keyCode == 13) {
                ga('send', 'event', 'Search Term', 'Search Catalog', document.getElementById('q').value);
            }
        });
    },
    x: function() {
        $('a').each(function() {
            var href = this.href
            var wash = document.location.host
            var doc = '/DocumentCenter/View/'
            if (href.indexOf(wash) < 0) {
                $(this).click(function() {
                    ga('send', 'event', 'external Link', this.href, this.text)
                })
            } else if(href.indexOf(doc) > -1 ) {
                $(this).click(function() {
                    ga('send', 'event', 'Document Center', this.href, this.text)
                })
            }
        })
    },
    // add class to rss widget titles
    r: function() {
        var title = document.querySelectorAll('.widgetRSSFeed .widgetHeader, .widgetHeader .rssTitleNone');
        [].forEach.call(title,
            function(t) {
                t.classList.add('rssTitleNone');
            }
        );
    },
    // add <br> on slider title and description for line breaks
    b: function() {
        var addLineBreakTitle = $('.slideshowOptions  .overlay .widgetTitle').each(function() {
            var old = $(this).html()
            var newTxt = old.replace(/&lt;br&gt;/g, '<br>')
            $(this).replaceWith('<h4 class="widgetTitle">' + newTxt + '</h4>')
        })
        var addLineBreakDesc = $('.slideshowOptions  .overlay .widgetDesc').each(function() {
            var old = $(this).html()
            var newTxt = old.replace(/&lt;br&gt;/g, '<br>')
            $(this).replaceWith('<p class="widgetDesc">' + newTxt + '</p')
        })
        $('.slideshowOptions  .overlay').css('display', 'block')
    },
    // JS for login dropdown

    l: function() {
        $('.login-link').click(function() {
            if ($('#signin-dropdown').is(":visible")) {
                $('#signin-dropdown').hide(400);
                $('#session').removeClass('active');
            } else {
                $('#signin-dropdown').slideDown();
                $('#session').addClass('active');
            }
            return false;
        });
        $('#signin-dropdown').click(function(e) {
            e.stopPropagation();
        });
        $(document).click(function() {
            $('#signin-dropdown').slideUp();
            $('#session').removeClass('active');
        });
    },
    rss: function(){
        $('.widgetRSSFeed .widgetViewAll.alignRight').attr('href','https://host6.evanced.info/melsa/washington/eventcalendar.asp?lib=ALL&nd=30')
    }
};

document.addEventListener('DOMContentLoaded', function() {
    Lib.s();
    Lib.r();
    Lib.x();
    Lib.l();
    Lib.rss();
    // add class to rss and calendar higher parent divs
    $('[data-widget-controller-path="/Rss/Widget"]').parent().addClass('rssInner');
    $('#eventstinycal').closest('.inner.col').addClass('calInner');

    // checks to convert slider line breaks
    var checkSliderExist = setInterval(function() {
        if ($('.overlay .widgetTitle').length) {
            Lib.b();
            clearInterval(checkSliderExist);
        }
        setTimeout(function() {
            clearInterval(checkSliderExist)
        }, 2500)

    }, 50);
});