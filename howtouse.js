#! /usr/bin/env node

var _ = require('lodash');

_.mixin({tmpl: require('./tmpl.js').tmpl});

var templateString = '<div><%= greeting %></div>';

var _Template = _.template(templateString);
var tmplTemplate = _.tmpl(templateString);
var tmplCustomTemplate = _.tmpl(templateString, null, {
    stickitAttribute: 'data-custom'
});

console.log('');
console.log('underscore : ' + _Template({greeting: 'Hello'}));
console.log('tmpl       : ' + tmplTemplate({greeting: 'Hello'}));
console.log('custom     : ' + tmplCustomTemplate({greeting: 'Hello'}));
console.log('');