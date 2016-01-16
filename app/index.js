'use strict';

var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var Helper = require('yo-java-helper');
var path = require('path');
var crypto = require("crypto");

module.exports = yeoman.generators.Base.extend({

    constructor: function () {
        yeoman.generators.Base.apply(this, arguments);
        this.helper = new Helper(this, require('../package.json'));
    },

    initializing: {
        greeting: function () {
            this.log(this.yeoman);
            this.log(chalk.yellow(this.helper.readBanner('banner.txt')));
        },

        setupVars : function () {
            this.baseName = this.config.get('baseName');
            this.groupName = this.config.get('groupName');
            this.versionName = this.config.get('versionName');
        }
    },

    prompting: { 

        askVars: function () {
            var done = this.async();
            var prompts = [
                {
                  type    : 'input',
                  name    : 'baseName',
                  message : 'Your project name',
                  default : this.appname // Default to current folder name,
                },
                {
                  type    : 'input',
                  name    : 'groupName',
                  message : 'Your group name',
                  default : 'org.microus.samples'
                },
                {
                  type    : 'input',
                  name    : 'versionName',
                  message : 'Initial version',
                  default : '0.1.0'
                }
            ];
            this.prompt(prompts, function (props) {
                this.props = props;
                done();
            }.bind(this));
        }
    },

    configuring: {
        saveConfig: function () {
            this.config.set('baseName', this.baseName);
            this.config.set('groupName', this.groupName);
            this.config.set('versionName', this.versionName);
        }      
    },

    writing: function () {
        this.fs.copyTpl(
            this.templatePath('microus-base'), 
            this.destinationPath('microus-user'), 
            this);
    },

    end: function () {       
    }
});
