//Favicon change
jQuery("#favicon").attr("href", "/custom/web/images/favicon.ico");
// ************* Universal Analytics *************
var gaPush = document.location.pathname;
if (gaPush.indexOf('search/patronlogin/') < 0 && gaPush.indexOf('/search/placehold/ent') < 0) {
    __gaTracker('create', 'UA-38377956-2', 'auto', 'uTwo');
    __gaTracker('uTwo.send', 'pageview');
} else if (gaPush.indexOf('/search/placehold/ent') > -1) {
    (function(i, s, o, g, r, a, m) {
        i['GoogleAnalyticsObject'] = r;
        i[r] = i[r] || function() {
            (i[r].q = i[r].q || []).push(arguments)
        }, i[r].l = 1 * new Date();
        a = s.createElement(o), m = s.getElementsByTagName(o)[0];
        a.async = 1;
        a.src = g;
        m.parentNode.insertBefore(a, m)
    })(window, document, 'script', '//www.google-analytics.com/analytics.js', '__gaTracker');
    __gaTracker('create', 'UA-38377956-1', 'auto');
    __gaTracker('send', 'pageview');
    __gaTracker('create', 'UA-38377956-2', 'auto', 'uTwo');
    __gaTracker('uTwo.send', 'pageview');
}
// Hotjar
jQuery("head").append("<script type='text/javascript'> (function(h,o,t,j,a,r){h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};h._hjSettings={hjid:75298,hjsv:5};a=o.getElementsByTagName('head')[0];r=o.createElement('script');r.async=1;r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;a.appendChild(r);})(window,document,'//static.hotjar.com/c/hotjar-','.js?sv=');</script>");
// viewpporting for responsive layout
var metaTag = document.createElement('meta');
metaTag.id = "viewPort";
metaTag.name = "viewport";
metaTag.content = "width=device-width, initial-scale=1, maximum-scale=1";
document.getElementsByTagName('head')[0].appendChild(metaTag);

//renew holds fix for apple devices
jQuery(function() {
    jQuery('body').live('click', '#myCheckouts_checkoutslist_checkoutsRenewButton, #myCheckouts_checkoutslist_topCheckoutsRenewButton, .holdsButtons', function() {
        safariFix();
    });
});

function safariFix() {
    jQuery(function() {
        jQuery('.button').blur();
    });
}
// custom GA event Tracking and other script
var GA = {
    p: function(element, cat, action, type) {
        jQuery(element).each(function() {
            var label = type;
            if (label === 'title') {
                label = jQuery(this).attr('title');
            } else if (label === 'value') {
                label = jQuery(this).attr('value');
            } else if (label === 'text') {
                label = this.text;
            }
            jQuery(this).click(function() {
                __gaTracker('send', 'event', cat, action, label);
                __gaTracker('uTwo.send', 'event', cat, action, label);
            });
        });

    },
    x: function() {
        var $ = jQuery;
        $('a').each(function() {
            var href = this.href
            var catEnt = document.location.host
            if (href.indexOf(catEnt) < 0 && href.indexOf('javascript:;') < 0) {
                $(this).click(function() {
                    __gaTracker('send', 'event', 'external Link', href, this.text);
                    __gaTracker('uTwo.send', 'event', 'external Link', href, this.text)
                })
            }
        })

    },
    MNLink: function() {
        var mySearch = document.getElementById('q').value
        mySearch = mySearch.replace(' ', '+')
        document.getElementById('searchResultText').innerHTML = '<div class="mnLink" >Not found here?<br><a href="https://mnlink.on.worldcat.org/search?queryString=' + mySearch + '"  target="_blank" >Search MNLINK</a></div>';
    }
};
// remove searchbutton text

function clearSearhBox() {
    jQuery('#searchButton').attr('value', '')
}
var checkSearchButtonExist = setInterval(function() {
    if (jQuery('#searchButton').length) {
        clearSearhBox()
        clearInterval(checkSearchButtonExist);
    }
    setTimeout(function() {
        clearInterval(checkSearchButtonExist)
    }, 2500)

}, 50);
jQuery(function() {

    // add nav items to Enterprise menu
    jQuery('.NavEntDiv').insertBefore('#libInfoContainer').removeClass('noShow');
    // catalog searchbox placeholder with some added IE support 9-10+?
    jQuery('#q').attr('placeholder', 'Search library catalog').focus();
    // Google Searchbox for catalog
    jQuery('.searchform .searchfieldG').blur(function() {
        tmpval = jQuery(this).val();
        if (tmpval === '') {
            jQuery(this).addClass('empty');
            jQuery(this).removeClass('not-empty');
        } else {
            jQuery(this).addClass('not-empty');
            jQuery(this).removeClass('empty');
        }
    });
    jQuery('#q').focus(function() {
        var input = jQuery(this);
        if (input.val() == input.attr('placeholder')) {
            input.val('');
            input.removeClass('placeholder');
        }
    }).blur(function() {
        var input = jQuery(this);
        if (input.val() === '' || input.val() === input.attr('placeholder')) {
            input.addClass('placeholder');
            input.val(input.attr('placeholder'));
        }
    }).blur().parents('form').submit(function() {
        jQuery(this).find('[placeholder]').each(function() {
            var input = jQuery(this);
            if (input.val() == input.attr('placeholder')) {
                input.val('');
            }
        });
    });

    function catSearchFormSubmit() {
        document.getElementById("searchForm").submit();
    }


    // Footer dropdown menus
    var urlmenus = document.getElementById('chooseLib');
    urlmenus.onchange = function() {
        window.open(this.options[this.selectedIndex].value);
    };

    var urlmenu = document.getElementById('chooseLibLoc');
    urlmenu.onchange = function() {
        window.open(this.options[this.selectedIndex].value);
    };

    GA.x();
    // header area
    GA.p('#adaModeDiv a', 'Main Menu', 'Click Link', 'title');
    GA.p('.loginLink a, .menuLink a, .patron_help, #adaModeDiv img', 'Main Menu', 'Click Link', 'text');
    GA.p('.displayDetailLink a', 'View Title', 'Title Click', 'text');
    GA.p('.listItem.detailClick img, .no_image_text', 'View Book', 'Bookcover Click', 'title');
    GA.p('.holdSpan .button, .textit', 'Search Results', 'Click Button', 'value');
    // ************** Column buttons and links ****************
    GA.p('a.btn-Column', 'Button', 'Click button', 'text');
    GA.p('.wcm-help-guides a', 'Help Guides', 'Click Link', 'text');
    GA.p('.wcm-features a', 'eCollections', 'Click Image', 'text');
    // ************** Footer links ****************
    GA.p('.FootCol a', 'footer', 'Footer Click', 'text');
    // ************* My Account ***************
    GA.p('#accountTabs .ui-state-default a', 'My Account', 'Click', 'text');
    GA.p('.holdsButtons .button, .checkoutsButtons .button', 'My Account', 'Click', 'value');
    // ************* Evanced Events ***************
    GA.p('#eventtitle a', 'Calendar', 'Click Link', 'text');
    // ************* Catalog Searchbox   ***************
    GA.p('#searchBoxHomeLink a img, .searchLimitDropDown, .restrictionDropDown, #searchButton', 'Search', 'Click in Searchwrapper', 'text');
    GA.p('#q', 'Search Term', 'click in searchbox', 'value');
    GA.p('#searchBoxAdvancedLink a', 'Advanced Search', 'click', 'text');
    // ************* My Lists  ***************
    GA.p('a.myListLink, #lists_addList, #lists_removeLists, #libInfoContainer div a:contains("My Lists")', 'My Lists', 'Click Link', 'text');
    GA.p('.myListLink', 'My Lists', 'Click List', 'Click list in My Lists');
    GA.p('.sortHandle', 'My Lists', 'Click Button', 'grab item or list to sort in My Lists');
    // ************* Search Results and My Lists ***************
    GA.p('.holdSpan .button, .textit', 'Search Results', 'Click Button', 'value');
    GA.p('.ercDownloadButton, .ercPreviewButton .button', 'Search Results', 'Click Button', 'text');
    GA.p('.mnLink', 'No Search Results', 'Click Link', 'text');

    // Custom pieces
    jQuery('.results_img[title*="Cover image for Images of Stillwater"]').attr('src', '/custom/web/images/tbrewitzStillwater.jpg');

    // ************* BEGIN BOOKLENS CUSTOM ADDITIONS ***************		
    try {
        if (window.self === window.top) {
            // only load the BL widgets if we're in the top-level container
            // and not iframes as used in Enterprise's login popup
            var head = document.getElementsByTagName('head')[0];
            var script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = 'https://wcl-booklens.ramsey.lib.mn.us/js/injectWashington.js';
            script.async = true;
            head.appendChild(script);
        }
    } catch (e) {
        // we're in an iframe and same origin policy blocked us, doesn't matter ignore
        // since we don't want to load anyways
    }
GA.MNLink()
    // jQuery('#searchResultText').html('<div class="mnLink" >Not found here?<br><a href="https://www.mnlinkgateway.org/">Search MnLink</a></div>');
});
var addCustomPieces = function() {
    //Custom help image//
    jQuery('#patronHelp img').attr("src", "/custom/web/wcm_helpicon.png");
    //add note for eAudiobook items//
    jQuery('.formatTypeIcon-E_SOUNDREC').append('<span style="color: #009445;;font-weight: bold;font-stretch: expanded;letter-spacing: 0.5px;">eAudiobook</span>');
    //add note for eBook items//
    jQuery('.formatTypeIcon-E_BOOK').append('<span style="color: #009445;font-weight: bold;font-stretch: expanded;letter-spacing: 0.5px;">eBook</span>');
    GA.p('.mnLink', 'No Search Results', 'Click Link', 'No Results - Search MNLink');

};
setTimeout(addCustomPieces, 1000);
var addMoreDelayedPieces = function() {
    // Changes Hold Place in queue from 0 to NA. This occurs for titles on order//
    jQuery('.holdsRank').filter(function() {
        return jQuery(this).text() === '0';
    }).text('N/A').attr('title', 'Place in Queue unavailable for titles on order');
    // Adds titles to hold suspension options//
    jQuery('#myHolds_holdslist_suspendButton, #myHolds_holdslist_topSuspendButton').attr('title', 'Suspend so your hold item is not fulfilled when you are away');
    jQuery('#myHolds_holdslist_cancelSuspendButton, #myHolds_holdslist_topCancelSuspendButton').attr('title', 'Reactivate your hold items');
    jQuery('.availableDiv.holdsCountSection').append('<br><span class="extraInfoLoc" style="color: #009445;font-weight: bold;font-stretch: expanded;letter-spacing: 0.5px; font-style: italic;">Click Title for Item Location</span>');

};
setTimeout(addMoreDelayedPieces, 3000);
var gaDelayedPieces = function() {
    //Book River on catalog Home Page //
    GA.p('.nytimes_coverart', 'Book River', 'Click Book', 'Book River Click on Display Book');
    GA.p('#nytimes_play_pause', 'Book River', 'Click Pause', 'Book River Pause');
    GA.p('.nytimes_check_lib_div', 'Book River', 'Click Button', 'Book River Find in My library');
    GA.p('.nytimes_thumb_img', 'Book River', 'Click Book', 'Book River Click Thumbnail Book on');
    GA.p('.jscarousal-right', 'Book River', 'Click Right', 'Book River Click Right');
};
setTimeout(gaDelayedPieces, 5000);