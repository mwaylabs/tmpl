_.mixin({
    tmpl: function( text, data, settings ) {
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

        //------ begin modifying the template function from underscore
        //source is now an array that get joined at the end of the modification
        var source = [];
        //every source += is now a push call
        source.push("__p+='");

        //provide an api for setting the stickit attribute
        //default data-binding
        var stickitAttribute = settings.stickitAttribute || 'data-binding';

        text.replace(matcher, function( match, escape, interpolate, evaluate, offset ) {

            //split the underscore functionality into its single parts
            var sliced = text.slice(index, offset);
            //if there is an attribute and the sliced part has an closing html tag '>' start the modification
            if( interpolate && sliced.search(/>/gi) > -1 ) {
                var qt = '>';
                //the dom element could have attributes. so separate them from the closing '>'
                var before = sliced.split(qt);
                //add the stickit attribute to the dom element
                //first add the stuff that was in front of the closing '>'
                //then add the stickit attribute with the attribute key defined in the template string <%= interpolate %>
                //finally close the tag '>'
                sliced = before.join('') + ' ' + stickitAttribute + '="' + interpolate.trim() + '"' + qt;
                //do underscore stuff again
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
                source.push("'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'");
            }
            if( evaluate ) {
                source.push("';\n" + evaluate + "\n__p+='");
            }
            index = offset + match.length;

            return match;
        });
        source.push("';\n");
        //source should be a string like in underscore
        source = source.join('');

        //------ end modifying

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
    }
});