'use strict';

var generators = require('yeoman-generator');


module.exports = generators.Base.extend({

    constructor: function () {
        generators.Base.apply(this, arguments);
    },

    initializing: {
    },

    prompting: {        
    },

    configuring: {        
    },

    writing: {
        this.fs.copyTpl('microus-base', 'microus-user', {});
    },

    end: {       
    }
});
