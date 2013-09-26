var obj = {
    f1: 'value_f1',
    f2: 'value_f2'
}

var test = [
    '<div></div>',
    '<div class="a"></div>',
    '<div><%= f1 %></div>',
    '<div class="a"><%= f1 %></div>',
    '<div class="<%= f1 %>"><%= f1 %></div>',
    '<div class="<%= f1 %>"><%= f2 %></div>',
    '<div class="<%= f1 %>"><%= f1 %><%= f2 %></div>',
    '<div class="<% if(f1){ %>a<% } %>"><%= f1 %></div>',
    '<div id="<%= f1 %>" class="<%= f2 %>"></div>',
    '<div id="<%= f1 %>" class="<%= f1 %><%= f2 %>"></div>',
    '<div><div id="<%= f1 %>" class="<%= f1 %><%= f2 %>"></div></div>',
    '<div><div id="<%= f1 %>" class="<%= f1 %><%= f2 %>"><div><%= f1 %></div></div></div>',
    '<div><div class="<%= f1 %>" contenteditable="true"><%= f1 %></div><div contenteditable="true"><%= f2 %></div></div>',
    '<input type="text" name="input" value="<%= f1 %>" />',
    '<input placeholder="<%= f1 %>" type="text" name="input" value="<%= f1 %>" />'
];

var results = [
    '<div></div>',
    '<div class="a"></div>',
    '<div data-binding="f1">value_f1</div>',
    '<div class="a" data-binding="f1">value_f1</div>',
    '<div class="value_f1" data-binding="f1">value_f1</div>',
    '<div class="value_f1" data-binding="f2">value_f2</div>',
    '<div class="value_f1" data-binding="f1">value_f1value_f2</div>',
    '<div class="a" data-binding="f1">value_f1</div>',
    '<div id="value_f1" class="value_f2"></div>',
    '<div id="value_f1" class="value_f1value_f2"></div>',
    '<div><div id="value_f1" class="value_f1value_f2"></div></div>',
    '<div><div id="value_f1" class="value_f1value_f2"><div data-binding="f1">value_f1</div></div></div>',
    '<div><div class="value_f1" contenteditable="true" data-binding="f1">value_f1</div><div contenteditable="true" data-binding="f2">value_f2</div></div>',
    '<input type="text" name="input" data-binding="f1" value="value_f1" />',
    '<input placeholder="value_f1" type="text" name="input" data-binding="f1" value="value_f1" />'
]


_.each(test, function(value, ind){
    var func = _.tmpl(test[ind], null, {stickitAttribute: 'data-binding'});
    var res = func(obj);
    if(results[ind] === res){

        console.log('%c' + ind + ' was successfull', 'color: green;' );
    } else {
        console.log('%c' + ind + ' error', 'color: red;' );
        console.log(res);
        console.log(results[ind]);
        console.log('');
    }
});

_.each(test, function(value, ind){
    var func = _.tmpl(test[ind]);
    var res = func(obj);
    if(results[ind] === res){

        console.log('%c' + ind + ' was successfull', 'color: green;' );
    } else {
        console.log('%c' + ind + ' error', 'color: red;' );
        console.log(res);
        console.log(results[ind]);
        console.log('');
    }
});