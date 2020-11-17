/**
* version 1.1.0
* upgrades 
* - fade animation on open and close
* - open method. can open modal without binding link
* - possible to open modal with "POST". nessecary when need to send large amount of data to modal
*/

(function (jQuery) {

    jQuery.modalLinkDefaults = {
            height: 600,
            width: 900,
            showTitle: true,
            showClose: true,
            overlayOpacity: 0.6,
            method: "GET", // GET, POST, REF, CLONE
            disableScroll: true,
            onHideScroll: function () { },
            onShowScroll: function () { }
    };

    function hideBodyScroll(cb) {
        var w = jQuery("body").outerWidth();
        jQuery("body").css({ overflow: "hidden" });
        var w2 = jQuery("body").outerWidth();
        jQuery("body").css({ width: w });

        if (typeof cb == "function") {
            var scrollbarWidth = w2 - w;
            cb(scrollbarWidth);
        }
    }

    function showBodyScroll(cb) {
        var jQuerybody = jQuery("body");
        var w = jQuerybody.outerWidth();
        jQuerybody.css({ width: '', overflow: '' });
        var w2 = jQuerybody.outerWidth();

        if (typeof cb == "function") {
            var scrollbarWidth = w - w2; 
            cb(scrollbarWidth);
        }
    }

    /**
     * Helper method for appending parameter to url
     */
    function addUrlParam(url, name, value) {
        return appendUrl(url, name + "=" + value);
    }

    /**
     * Hepler method for appending querystring to url
     */
    function appendUrl(url, data) {
        return url + (url.indexOf("?") < 0 ? "?" : "&") + data;
    }

    function buildOptions(option) {
        
    }
    
    function resolveBooleanValue(jQuerylink) {
        
        for (var i = 1; i < arguments.length; i++) {
            var val = arguments[i];
            
            if (typeof val == "boolean") {
                return val;
            }
            
            if (typeof val == "string") {
                var attrValue = jQuerylink.attr(val);
                if (attrValue) {
                    if (attrValue.toLowerCase() === "true") {
                        return true;
                    }
                    if (attrValue.toLowerCase() === "false") {
                        return false;
                    }
                }
            }
        }
    }

    var methods = {
        init: function (options) {
            
            var settings = jQuery.extend({}, jQuery.modalLinkDefaults);
            jQuery.extend(settings, options);

            return this.each(function () {
                var jQuerylink = jQuery(this);
                
                // already bound
                if (jQuerylink.hasClass("sparkling-modal-link"))
                    return;
                
                // mark as bound
                jQuerylink.addClass("sparkling-modal-link");

                jQuerylink.click(function (e) {
                    e.preventDefault();
                    methods.open(jQuerylink, settings);
                    return false;
                });
            });
        },
        
        close: function (cb) {

            var jQuerycontainer = jQuery(".sparkling-modal-container");

            var jQuerylink = jQuerycontainer.data("modallink");

            if (!jQuerylink) {
                return;
            }

            jQuerylink.trigger("modallink.close");

            var jQueryoverlay = jQuerycontainer.find(".sparkling-modal-overlay");
            var jQuerycontent = jQuerycontainer.find(".sparkling-modal-frame");

            jQueryoverlay.fadeTo("fast", 0);
            jQuerycontent.fadeTo("fast", 0, function () {
                jQuerycontainer.remove();
                showBodyScroll(cb);

                if (typeof cb == "function") {
                    cb();
                }
            });
        },
        
        open: function (jQuerylink, options) {

            options = options || {};
            var url, title, showTitle, showClose, disableScroll;

            url = options.url || jQuerylink.attr("href");
            title = options.title 
                || jQuerylink.attr("data-ml-title")
                || jQuerylink.attr("title")
                || jQuerylink.text();
                        
            showTitle = resolveBooleanValue(jQuerylink, 
                options.showTitle, 
                "data-ml-show-title", 
                jQuery.modalLinkDefaults.showTitle);
                           
            showClose = resolveBooleanValue(jQuerylink,
                options.showClose,
                "data-ml-show-close",
                jQuery.modalLinkDefaults.showClose);
                           
            disableScroll = resolveBooleanValue(jQuerylink,
                options.disableScroll,
                "data-ml-disable-scroll",
                jQuery.modalLinkDefaults.disableScroll);
            
            var settings = jQuery.extend({}, jQuery.modalLinkDefaults);
            jQuery.extend(settings, options);

            var dataWidth = jQuerylink.attr("data-ml-width");
            if (dataWidth) {
                settings.width = parseInt(dataWidth);
            }
            var dataHeight = jQuerylink.attr("data-ml-height");
            if (dataHeight) {
                settings.height = parseInt(dataHeight);
            }

            if (settings.method !== "CLONE" && url.length > 0 && url[0] === "#") {
                settings.method = "REF";
            }

            if (settings.method == "GET" || settings.method == "POST") {
                url = addUrlParam(url, "__inmodal", "true");
            }

            var data = {};

            if (typeof settings.data != 'undefined') {
                if (typeof settings.data == "function") {
                    data = settings.data();
                }
                else {
                    data = settings.data;
                }
            }

            var jQuerycontainer = jQuery("<div class=\"sparkling-modal-container\"></div>");
            jQuerycontainer.data("modallink", jQuerylink);

            var jQueryoverlay = jQuery("<div class=\"sparkling-modal-overlay\"></div>");
            jQueryoverlay.css({ position: 'fixed', top: 0, left: 0, opacity: 0, width: '100%', height: '100%', zIndex: 999 });
            jQueryoverlay.appendTo(jQuerycontainer);

            var jQuerycontent = jQuery("<div class=\"sparkling-modal-frame\"></div>")
                .css("opacity", 0)
                .css({ zIndex: 1000, position: 'fixed', display: 'inline-block' })
                .css({ left: '50%', marginLeft: -settings.width / 2 })
                .css({ top: '50%', marginTop: -settings.height / 2 })
                .appendTo(jQuerycontainer);

            jQuery("body").append(jQuerycontainer);

            if (showTitle) {
                
                var jQuerytitle = jQuery("<div class=\"sparkling-modal-title\"></div>");
                jQuerytitle.appendTo(jQuerycontent);
                jQuerytitle.append(jQuery("<span></span>").html(title));

                if (showClose) {
                    var jQuerycloseButton = jQuery("<div class=\"sparkling-modal-close\"><div class='i-close'><div class='i-close-h' /><div class='i-close-v' /></div></div>");
                    jQuerycloseButton.appendTo(jQuerytitle);
                    jQuerycloseButton.click(methods.close);
                }
                
                jQuerytitle.append("<div style=\"clear: both;\"></div>");
            }
            var jQueryiframeContainer = jQuery("<div class=\"sparkling-modal-content\"></div>");
            jQueryiframeContainer.appendTo(jQuerycontent);

            var jQueryiframe;
            if (settings.method == "REF") {
                jQueryiframe = jQuery("<div />");
                jQueryiframe.css("overflow", "auto");

                var jQueryref = jQuery(url);
                var id = "ref_" + new Date().getTime();
                var jQueryph = jQuery("<div id='" + id + "' />");
                jQueryph.insertAfter(jQueryref);

                jQueryref.appendTo(jQueryiframe);

                jQuerylink.on("modallink.close", function() {
                    jQueryph.replaceWith(jQueryref);
                });

            } else {
                jQueryiframe = jQuery("<iframe frameborder=0 id='modal-frame' name='modal-frame'></iframe>");
            }

            jQueryiframe.appendTo(jQueryiframeContainer);
            jQueryiframe.css({ width: settings.width, height: settings.height });

            if (settings.method == "CLONE") {
                console.log(url);
                var jQueryinlineContent = jQuery(url);
                console.log(jQueryinlineContent);

                var iFrameDoc = jQueryiframe[0].contentDocument || jQueryiframe[0].contentWindow.document;
                iFrameDoc.write(jQueryinlineContent.html());
                iFrameDoc.close();
            }
            else if (settings.method == "GET") {
                if (typeof data == "object") {
                    for (var i in data) {
                        if (data.hasOwnProperty(i)) {
                            url = addUrlParam(url, i, data[i]);
                        }
                    }
                } else if (typeof data != "undefined") {
                    url = appendUrl(url, data);
                }
                
                jQueryiframe.attr("src", url);
            }

            jQuerycontent.css({ marginTop: -(jQuerycontent.outerHeight(false) / 2) });

            jQueryoverlay.fadeTo("fast", settings.overlayOpacity);
            jQuerycontent.fadeTo("fast", 1);

            if (settings.method == "POST") {
                
                var jQueryform = settings.jQueryform;
                if (jQueryform && jQueryform instanceof jQuery)
                {
                    var originalTarget = jQueryform.attr("target"); 
                    jQueryform
                        .attr("target", "modal-frame")
                        .data("submitted-from-modallink", true)
                        .submit()
                }
                else
                {
                    jQueryform = jQuery("<form />")
                        .attr("action", url)
                        .attr("method", "POST")
                        .attr("target", "modal-frame")
                        .css({ display: 'none'});

                    jQuery("<input />").attr({ type: "hidden", name: "__sparklingModalInit", value: 1 }).appendTo(jQueryform);

                    if (jQuery.isArray(data)) {
                        for (var i in data) {
                            jQuery("<input />").attr({ type: "hidden", name: data[i].name, value: data[i].value }).appendTo(jQueryform);
                        }
                    }
                    else
                    {
                        for (var i in data) {
                            jQuery("<input />").attr({ type: "hidden", name: i, value: data[i] }).appendTo(jQueryform);
                        }
                    }

                    jQueryform
                        .appendTo("body")
                        .submit();

                    jQueryform.remove();
                }
            }

            if (disableScroll) {
                hideBodyScroll(settings.onHideScroll);
            }
        }
    };

    jQuery.fn.modalLink = function(method) {
        // Method calling logic
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            jQuery.error('Method ' + method + ' does not exist on jQuery.modalLink');
            return this;
        }
    };
    
    jQuery.modalLink = function(method) {
        // Method calling logic
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            jQuery.error('Method ' + method + ' does not exist on jQuery.modalLink');
            return this;
        }
    };

    jQuery.modalLink.open = function(url, options) {
        options = jQuery.extend({}, options);
        options.url = url;
        methods["open"].call(this, jQuery("<a />"), options);
    };

})(jQuery);


jQuery(document).keyup(function(e) {

    if (e.keyCode == 27) {
        jQuery.modalLink("close");
    }   
});