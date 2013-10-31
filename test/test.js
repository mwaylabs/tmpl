var _ = require('lodash');
var assert = require('assert');
_.mixin({tmpl: require('../tmpl.js').tmpl});

describe('tmpl', function () {

  var tmplData, tmplOptions;

  before(function () {
    tmplData = {f1: 'value_f1', f2: 'value_f2'};
  });

  it('basic', function () {
    assert.equal(_.tmpl('<div></div>', null, tmplOptions)(tmplData), '<div></div>');
    assert.equal(_.tmpl('<div class="a"></div>', null, tmplOptions)(tmplData), '<div class="a"></div>');
    assert.equal(_.tmpl('<div><%= f1 %></div>', null, tmplOptions)(tmplData), '<div data-binding="f1">value_f1</div>');
    assert.equal(_.tmpl('<div class="a"><%= f1 %></div>', null, tmplOptions)(tmplData), '<div class="a" data-binding="f1">value_f1</div>');
    assert.equal(_.tmpl('<div class="<%= f1 %>"><%= f1 %></div>', null, tmplOptions)(tmplData), '<div class="value_f1" data-binding="f1">value_f1</div>');
    assert.equal(_.tmpl('<div class="<%= f1 %>"><%= f2 %></div>', null, tmplOptions)(tmplData), '<div class="value_f1" data-binding="f2">value_f2</div>');
    assert.equal(_.tmpl('<div class="<%= f1 %>"><%= f1 %><%= f2 %></div>', null, tmplOptions)(tmplData), '<div class="value_f1" data-binding="f1">value_f1value_f2</div>');
    assert.equal(_.tmpl('<div class="<% if(f1){ %>a<% } %>"><%= f1 %></div>', null, tmplOptions)(tmplData), '<div class="a" data-binding="f1">value_f1</div>');
    assert.equal(_.tmpl('<div id="<%= f1 %>" class="<%= f2 %>"></div>', null, tmplOptions)(tmplData), '<div id="value_f1" class="value_f2"></div>');
    assert.equal(_.tmpl('<div id="<%= f1 %>" class="<%= f1 %><%= f2 %>"></div>', null, tmplOptions)(tmplData), '<div id="value_f1" class="value_f1value_f2"></div>');
    assert.equal(_.tmpl('<div><div id="<%= f1 %>" class="<%= f1 %><%= f2 %>"></div></div>', null, tmplOptions)(tmplData), '<div><div id="value_f1" class="value_f1value_f2"></div></div>');
    assert.equal(_.tmpl('<div><div id="<%= f1 %>" class="<%= f1 %><%= f2 %>"><div><%= f1 %></div></div></div>', null, tmplOptions)(tmplData), '<div><div id="value_f1" class="value_f1value_f2"><div data-binding="f1">value_f1</div></div></div>');
    assert.equal(_.tmpl('<div><div class="<%= f1 %>" contenteditable="true"><%= f1 %></div><div contenteditable="true"><%= f2 %></div></div>', null, tmplOptions)(tmplData), '<div><div class="value_f1" contenteditable="true" data-binding="f1">value_f1</div><div contenteditable="true" data-binding="f2">value_f2</div></div>');
    assert.equal(_.tmpl('<input type="text" name="input" value="<%= f1 %>" />', null, tmplOptions)(tmplData), '<input type="text" name="input" data-binding="f1" value="value_f1" />');
    assert.equal(_.tmpl('<input placeholder="<%= f1 %>" type="text" name="input" value="<%= f1 %>" />', null, tmplOptions)(tmplData), '<input placeholder="value_f1" type="text" name="input" data-binding="f1" value="value_f1" />');
  });

  it('use custom stickit attribute', function () {

    tmplOptions = {stickitAttribute: 'data-mystickit'};

    assert.equal(_.tmpl('<div></div>', null, tmplOptions)(tmplData), '<div></div>');
    assert.equal(_.tmpl('<div class="a"></div>', null, tmplOptions)(tmplData), '<div class="a"></div>');
    assert.equal(_.tmpl('<div><%= f1 %></div>', null, tmplOptions)(tmplData), '<div data-mystickit="f1">value_f1</div>');
    assert.equal(_.tmpl('<div class="a"><%= f1 %></div>', null, tmplOptions)(tmplData), '<div class="a" data-mystickit="f1">value_f1</div>');
    assert.equal(_.tmpl('<div class="<%= f1 %>"><%= f1 %></div>', null, tmplOptions)(tmplData), '<div class="value_f1" data-mystickit="f1">value_f1</div>');
    assert.equal(_.tmpl('<div class="<%= f1 %>"><%= f2 %></div>', null, tmplOptions)(tmplData), '<div class="value_f1" data-mystickit="f2">value_f2</div>');
    assert.equal(_.tmpl('<div class="<%= f1 %>"><%= f1 %><%= f2 %></div>', null, tmplOptions)(tmplData), '<div class="value_f1" data-mystickit="f1">value_f1value_f2</div>');
    assert.equal(_.tmpl('<div class="<% if(f1){ %>a<% } %>"><%= f1 %></div>', null, tmplOptions)(tmplData), '<div class="a" data-mystickit="f1">value_f1</div>');
    assert.equal(_.tmpl('<div id="<%= f1 %>" class="<%= f2 %>"></div>', null, tmplOptions)(tmplData), '<div id="value_f1" class="value_f2"></div>');
    assert.equal(_.tmpl('<div id="<%= f1 %>" class="<%= f1 %><%= f2 %>"></div>', null, tmplOptions)(tmplData), '<div id="value_f1" class="value_f1value_f2"></div>');
    assert.equal(_.tmpl('<div><div id="<%= f1 %>" class="<%= f1 %><%= f2 %>"></div></div>', null, tmplOptions)(tmplData), '<div><div id="value_f1" class="value_f1value_f2"></div></div>');
    assert.equal(_.tmpl('<div><div id="<%= f1 %>" class="<%= f1 %><%= f2 %>"><div><%= f1 %></div></div></div>', null, tmplOptions)(tmplData), '<div><div id="value_f1" class="value_f1value_f2"><div data-mystickit="f1">value_f1</div></div></div>');
    assert.equal(_.tmpl('<div><div class="<%= f1 %>" contenteditable="true"><%= f1 %></div><div contenteditable="true"><%= f2 %></div></div>', null, tmplOptions)(tmplData), '<div><div class="value_f1" contenteditable="true" data-mystickit="f1">value_f1</div><div contenteditable="true" data-mystickit="f2">value_f2</div></div>');
    assert.equal(_.tmpl('<input type="text" name="input" value="<%= f1 %>" />', null, tmplOptions)(tmplData), '<input type="text" name="input" data-mystickit="f1" value="value_f1" />');
    assert.equal(_.tmpl('<input placeholder="<%= f1 %>" type="text" name="input" value="<%= f1 %>" />', null, tmplOptions)(tmplData), '<input placeholder="value_f1" type="text" name="input" data-mystickit="f1" value="value_f1" />');
  });

  it('switch between default and custom stickit attribute', function () {

    tmplOptions = {stickitAttribute: 'data-mystickit'};

    assert.equal(_.tmpl('<div></div>', null, tmplOptions)(tmplData), '<div></div>');
    assert.equal(_.tmpl('<div></div>', null, null)(tmplData), '<div></div>');
    assert.equal(_.tmpl('<div class="a"></div>', null, tmplOptions)(tmplData), '<div class="a"></div>');
    assert.equal(_.tmpl('<div class="a"></div>', null, null)(tmplData), '<div class="a"></div>');
    assert.equal(_.tmpl('<div><%= f1 %></div>', null, tmplOptions)(tmplData), '<div data-mystickit="f1">value_f1</div>');
    assert.equal(_.tmpl('<div><%= f1 %></div>', null, null)(tmplData), '<div data-binding="f1">value_f1</div>');
    assert.equal(_.tmpl('<div class="a"><%= f1 %></div>', null, tmplOptions)(tmplData), '<div class="a" data-mystickit="f1">value_f1</div>');
    assert.equal(_.tmpl('<div class="a"><%= f1 %></div>', null, null)(tmplData), '<div class="a" data-binding="f1">value_f1</div>');
    assert.equal(_.tmpl('<div class="<%= f1 %>"><%= f1 %></div>', null, tmplOptions)(tmplData), '<div class="value_f1" data-mystickit="f1">value_f1</div>');
    assert.equal(_.tmpl('<div class="<%= f1 %>"><%= f1 %></div>', null, null)(tmplData), '<div class="value_f1" data-binding="f1">value_f1</div>');
    assert.equal(_.tmpl('<div class="<%= f1 %>"><%= f2 %></div>', null, tmplOptions)(tmplData), '<div class="value_f1" data-mystickit="f2">value_f2</div>');
    assert.equal(_.tmpl('<div class="<%= f1 %>"><%= f2 %></div>', null, null)(tmplData), '<div class="value_f1" data-binding="f2">value_f2</div>');
    assert.equal(_.tmpl('<div class="<%= f1 %>"><%= f1 %><%= f2 %></div>', null, tmplOptions)(tmplData), '<div class="value_f1" data-mystickit="f1">value_f1value_f2</div>');
    assert.equal(_.tmpl('<div class="<%= f1 %>"><%= f1 %><%= f2 %></div>', null, null)(tmplData), '<div class="value_f1" data-binding="f1">value_f1value_f2</div>');
    assert.equal(_.tmpl('<div class="<% if(f1){ %>a<% } %>"><%= f1 %></div>', null, tmplOptions)(tmplData), '<div class="a" data-mystickit="f1">value_f1</div>');
    assert.equal(_.tmpl('<div class="<% if(f1){ %>a<% } %>"><%= f1 %></div>', null, null)(tmplData), '<div class="a" data-binding="f1">value_f1</div>');
    assert.equal(_.tmpl('<div id="<%= f1 %>" class="<%= f2 %>"></div>', null, tmplOptions)(tmplData), '<div id="value_f1" class="value_f2"></div>');
    assert.equal(_.tmpl('<div id="<%= f1 %>" class="<%= f2 %>"></div>', null, null)(tmplData), '<div id="value_f1" class="value_f2"></div>');
    assert.equal(_.tmpl('<div id="<%= f1 %>" class="<%= f1 %><%= f2 %>"></div>', null, tmplOptions)(tmplData), '<div id="value_f1" class="value_f1value_f2"></div>');
    assert.equal(_.tmpl('<div id="<%= f1 %>" class="<%= f1 %><%= f2 %>"></div>', null, null)(tmplData), '<div id="value_f1" class="value_f1value_f2"></div>');
    assert.equal(_.tmpl('<div><div id="<%= f1 %>" class="<%= f1 %><%= f2 %>"></div></div>', null, tmplOptions)(tmplData), '<div><div id="value_f1" class="value_f1value_f2"></div></div>');
    assert.equal(_.tmpl('<div><div id="<%= f1 %>" class="<%= f1 %><%= f2 %>"></div></div>', null, null)(tmplData), '<div><div id="value_f1" class="value_f1value_f2"></div></div>');
    assert.equal(_.tmpl('<div><div id="<%= f1 %>" class="<%= f1 %><%= f2 %>"><div><%= f1 %></div></div></div>', null, tmplOptions)(tmplData), '<div><div id="value_f1" class="value_f1value_f2"><div data-mystickit="f1">value_f1</div></div></div>');
    assert.equal(_.tmpl('<div><div id="<%= f1 %>" class="<%= f1 %><%= f2 %>"><div><%= f1 %></div></div></div>', null, null)(tmplData), '<div><div id="value_f1" class="value_f1value_f2"><div data-binding="f1">value_f1</div></div></div>');
    assert.equal(_.tmpl('<div><div class="<%= f1 %>" contenteditable="true"><%= f1 %></div><div contenteditable="true"><%= f2 %></div></div>', null, tmplOptions)(tmplData), '<div><div class="value_f1" contenteditable="true" data-mystickit="f1">value_f1</div><div contenteditable="true" data-mystickit="f2">value_f2</div></div>');
    assert.equal(_.tmpl('<div><div class="<%= f1 %>" contenteditable="true"><%= f1 %></div><div contenteditable="true"><%= f2 %></div></div>', null, null)(tmplData), '<div><div class="value_f1" contenteditable="true" data-binding="f1">value_f1</div><div contenteditable="true" data-binding="f2">value_f2</div></div>');
    assert.equal(_.tmpl('<input type="text" name="input" value="<%= f1 %>" />', null, tmplOptions)(tmplData), '<input type="text" name="input" data-mystickit="f1" value="value_f1" />');
    assert.equal(_.tmpl('<input type="text" name="input" value="<%= f1 %>" />', null, null)(tmplData), '<input type="text" name="input" data-binding="f1" value="value_f1" />');
    assert.equal(_.tmpl('<input placeholder="<%= f1 %>" type="text" name="input" value="<%= f1 %>" />', null, tmplOptions)(tmplData), '<input placeholder="value_f1" type="text" name="input" data-mystickit="f1" value="value_f1" />');
    assert.equal(_.tmpl('<input placeholder="<%= f1 %>" type="text" name="input" value="<%= f1 %>" />', null, null)(tmplData), '<input placeholder="value_f1" type="text" name="input" data-binding="f1" value="value_f1" />');
  });

  it('Send corrupted datas', function () {

    tmplOptions = null;
    tmplData = {f1: 'value_f1'};

    assert.equal(_.tmpl('<div></div>', null, tmplOptions)(tmplData), '<div></div>');
    assert.equal(_.tmpl('<div class="a"></div>', null, tmplOptions)(tmplData), '<div class="a"></div>');
    assert.equal(_.tmpl('<div><%= f1 %></div>', null, tmplOptions)(tmplData), '<div data-binding="f1">value_f1</div>');
    assert.equal(_.tmpl('<div class="a"><%= f1 %></div>', null, tmplOptions)(tmplData), '<div class="a" data-binding="f1">value_f1</div>');
    assert.equal(_.tmpl('<div class="<%= f1 %>"><%= f1 %></div>', null, tmplOptions)(tmplData), '<div class="value_f1" data-binding="f1">value_f1</div>');
    assert.equal(_.tmpl('<div class="<%= f1 %>"><%= f2 %></div>', null, tmplOptions)(tmplData), '<div class="value_f1" data-binding="f2"></div>');
    assert.equal(_.tmpl('<div class="<%= f1 %>"><%= f1 %><%= f2 %></div>', null, tmplOptions)(tmplData), '<div class="value_f1" data-binding="f1">value_f1</div>');
    assert.equal(_.tmpl('<div class="<% if(f1){ %>a<% } %>"><%= f1 %></div>', null, tmplOptions)(tmplData), '<div class="a" data-binding="f1">value_f1</div>');
    assert.equal(_.tmpl('<div id="<%= f1 %>" class="<%= f2 %>"></div>', null, tmplOptions)(tmplData), '<div id="value_f1" class=""></div>');
    assert.equal(_.tmpl('<div id="<%= f1 %>" class="<%= f1 %><%= f2 %>"></div>', null, tmplOptions)(tmplData), '<div id="value_f1" class="value_f1"></div>');
    assert.equal(_.tmpl('<div><div id="<%= f1 %>" class="<%= f1 %><%= f2 %>"></div></div>', null, tmplOptions)(tmplData), '<div><div id="value_f1" class="value_f1"></div></div>');
    assert.equal(_.tmpl('<div><div id="<%= f1 %>" class="<%= f1 %><%= f2 %>"><div><%= f1 %></div></div></div>', null, tmplOptions)(tmplData), '<div><div id="value_f1" class="value_f1"><div data-binding="f1">value_f1</div></div></div>');
    assert.equal(_.tmpl('<div><div class="<%= f1 %>" contenteditable="true"><%= f1 %></div><div contenteditable="true"><%= f2 %></div></div>', null, tmplOptions)(tmplData), '<div><div class="value_f1" contenteditable="true" data-binding="f1">value_f1</div><div contenteditable="true" data-binding="f2"></div></div>');
    assert.equal(_.tmpl('<input type="text" name="input" value="<%= f1 %>" />', null, tmplOptions)(tmplData), '<input type="text" name="input" data-binding="f1" value="value_f1" />');
    assert.equal(_.tmpl('<input placeholder="<%= f1 %>" type="text" name="input" value="<%= f1 %>" />', null, tmplOptions)(tmplData), '<input placeholder="value_f1" type="text" name="input" data-binding="f1" value="value_f1" />');

  });

});
