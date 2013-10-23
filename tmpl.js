
(function(underscore) {

    var _ = underscore || require('lodash');

    function tmpl( text, data, settings ) {
        var render;
        var escaper = /\\|'|\r|\n|\t|\u2028|\u2029/g;
        var idCounter = 0;
        _.uniqueId = function( prefix ) {
            var id = ++idCounter + '';
            return prefix ? prefix + id : id;
        };

        // By default, Underscore uses ERB-style template delimiters, change the
        // following template settings to use alternative delimiters.
        _.templateSettings = {
            evaluate: /<%([\s\S]+?)%>/g,
            interpolate: /<%=([\s\S]+?)%>/g,
            escape: /<%-([\s\S]+?)%>/g
        };

        // When customizing `templateSettings`, if you don't want to define an
        // interpolation, evaluation or escaping regex, we need one that is
        // guaranteed not to match.
        var noMatch = /(.)^/;

        // Certain characters need to be escaped so that they can be put into a
        // string literal.
        var escapes = {
            "'": "'",
            '\\': '\\',
            '\r': 'r',
            '\n': 'n',
            '\t': 't',
            '\u2028': 'u2028',
            '\u2029': 'u2029'
        };
        settings = _.defaults({}, settings, _.templateSettings);

        // Combine delimiters into one regular expression via alternation.
        var matcher = new RegExp([
            (settings.escape || noMatch).source, (settings.interpolate || noMatch).source, (settings.evaluate || noMatch).source
        ].join('|') + '|$', 'g');

        // Compile the template source, escaping string literals appropriately.
        var index = 0;
        var source = [];
        source.push("__p+='");

        var stickitAttribute = settings.stickitAttribute || 'data-binding';

        text.replace(matcher, function( match, escape, interpolate, evaluate, offset ) {
            var sliced = text.slice(index, offset);

            if( interpolate && sliced.slice(-1) === '>' ) {
                var before = sliced.slice(0, -1);
                sliced = before + ' ' + stickitAttribute + '="' + interpolate.trim() + '"' + '>';
                source.push(sliced.replace(escaper, function( match ) {
                    return '\\' + escapes[match];
                }));
            } else if( interpolate && (sliced.slice(-7) === 'value="') ) {
                var before = sliced.slice(0, -7);
                sliced = before + stickitAttribute + '="' + interpolate.trim() + '" value="';
                source.push(sliced.replace(escaper, function( match ) {
                    return '\\' + escapes[match];
                }));
            } else {
                source.push(sliced.replace(escaper, function( match ) {
                    return '\\' + escapes[match];
                }));
            }

            if( escape ) {
                source.push("'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'");
            }
            if( interpolate ) {
                source.push("'+\n((__t=(typeof " + interpolate + "!== 'undefined' ? " + interpolate + " : ''))==null?'':__t)+\n'");
            }
            if( evaluate ) {
                source.push("';\n" + evaluate + "\n__p+='");
            }
            index = offset + match.length;

            return match;
        });
        source.push("';\n");
        source = source.join('');

        // If a variable is not specified, place data values in local scope.
        if( !settings.variable ) {
            source = 'with(obj||{}){\n' + source + '}\n';
        }

        source = "var __t,__p='',__j=Array.prototype.join," + "print=function(){__p+=__j.call(arguments,'');};\n" + source + "return __p;\n";

        try {
            render = new Function(settings.variable || 'obj', '_', source);
        } catch( e ) {
            e.source = source;
            throw e;
        }

        if( data ) {
            return render(data, _);
        }
        var template = function( data ) {
            return render.call(this, data, _);
        };

        // Provide the compiled function source as a convenience for precompilation.
        template.source = 'function(' + (settings.variable || 'obj') + '){\n' + source + '}';

        return template;
    };

    if( _ && _.mixin ) {
        _.mixin({
            tmpl: tmpl
        })
    } else {
        exports.tmpl = tmpl;
    }

})('undefined' != typeof _ ? _ : null);
