define(['jquery', 'handlebars'], function($, handlebars) {
    var render = function(source, target, data, isHtml) {
        var tpl = $(source).html();

        var template = handlebars.compile(tpl);

        var html = template(data);

        handlebars.registerHelper("first", function(index) {
            console.log(index)
            return index === 0
        })
        handlebars.registerHelper("addInd", function(index) {
            return index + 1
        })

        handlebars.registerHelper("limit", function(index, options) {
            if (index < 5) {
                return options.fn(this)
            } else {
                return options.inverse(this);
            }
        })

        if (isHtml) {
            $(target).html(html);
        } else {
            $(target).append(html);
        }

    }
    return render
})