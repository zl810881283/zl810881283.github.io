jQuery(function(t){"use strict";t('a[href^="#"]').click(function(o){o.preventDefault(),o.stopPropagation();var a=t(this).attr("href");history.pushState?history.pushState(null,null,a):location.hash=a,t("body, html").animate({scrollTop:t(a).offset().top-80},600)}),location.hash&&setTimeout(function(){t("body, html").animate({scrollTop:t(location.hash).offset().top-80},600)},500)});