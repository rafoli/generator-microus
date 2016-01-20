'use strict';

var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var Helper = require('yo-java-helper');
var path = require('path');
var crypto = require("crypto");
var _ = require("lodash");


module.exports = yeoman.generators.Base.extend({

    constructor: function () {
        yeoman.generators.Base.apply(this, arguments);
        this.helper = new Helper(this, require('../package.json'));
    },

    initializing: {
        greeting: function () {
            this.log(chalk.blue(this.helper.readBanner('banner.txt')));
        },

        setupVars : function () {
            this.baseName = this.config.get('baseName');
            this.packageName = this.config.get('packageName');
            this.versionName = this.config.get('versionName');
        }
    },

    prompting: { 

        askVars: function () {
            var done = this.async();

            // total questions
            var questions = 4;

            // list of questions
            var prompts = [

                // Project name
                {
                  type    : 'input',
                  name    : 'baseName',
                  message : '(1/' + questions + ') Your project name',
                  default : this.appname // Default to current folder name,
                },
                // Package name
                {
                  type    : 'input',
                  name    : 'packageName',
                  message : '(2/' + questions + ') Your package name',
                  default : 'org.microus.samples'
                },
                // Project version
                {
                  type    : 'input',
                  name    : 'versionName',
                  message : '(3/' + questions + ') Initial version',
                  default : '0.1.0'
                },
                // Eureka config
                {
                  type: 'checkbox',
                  name: 'microserviceType',
                  message: '(4/' + questions + ') Choose microservice type:',
                  choices: [
                    {
                      name: 'Todo App (backend)',
                      value: 'todoBackend'
                    },
                    {
                      name: 'Todo App (frontend)',
                      value: 'todoFrontend'
                    },
                    {
                      name: 'Eureka Client (discovery server)',                            
                      value: 'eurekaClient'
                    },
                    {
                      name: 'Eureka Server (discovery server)',                            
                      value: 'eurekaServer'
                    },
                    {
                      name: 'Spring Admin (dashboard)',
                      value: 'springAdmin'
                    },
                    {
                      name: 'ConfigServer (externalized configuration)',
                      value: 'configServer'
                    },
                    {
                      name: 'Zuul and Ribbon (routing and load balancer)',
                      value: 'zuulRibbon'
                    }
                  ],
                  default: 'eurekaClient'
                }

            ];
            this.prompt(prompts, function (props) {

                this.props = props;
                done();
            }.bind(this));
        }
    },

    configuring: {

        configureGlobal: function () {
            this.props.appName = _.capitalize(this.props.baseName);
            this.props.context = this.props.baseName.toLowerCase();
            this.props.packageFolder = this.props.packageName.replace(/\./g, '/');
            this.props.javaDir = 'src/main/java/' + this.props.packageFolder + '/';
            this.props.resourcesDir = 'src/main/resources/';
            this.log(this.props.microserviceType);
        },
        saveConfig: function () {
            this.config.set('baseName', this.baseName);
            this.config.set('packageName', this.packageName);
            this.config.set('versionName', this.versionName);
        }      
    },

    writing: function () {
        var javaDir = this.props.javaDir;
        var javaDirTpl = 'src/main/java/package/';
        var resourcesDir = this.props.resourcesDir;
        var resourcesDirTpl = this.props.resourcesDir;        

        //-------------------//
        // Create Java files //
        //-------------------//

        // Application.java
        this.fs.copyTpl(
            this.templatePath(javaDirTpl + '_Application.java'), 
            this.destinationPath(javaDir + this.props.appName + 'Application.java'), 
            this);

        //------------------------//
        // Create Resources files //
        //------------------------//

        // application.yml
        this.fs.copyTpl(
            this.templatePath(resourcesDirTpl + '_application.yml'), 
            this.destinationPath(resourcesDir + 'application.yml'), 
            this); 

        // bootstrap.yml
        this.fs.copyTpl(
            this.templatePath(resourcesDirTpl + '_bootstrap.yml'), 
            this.destinationPath(resourcesDir + 'bootstrap.yml'), 
            this);    

        // logback.xml
        this.fs.copyTpl(
            this.templatePath(resourcesDirTpl + '_logback.xml'), 
            this.destinationPath(resourcesDir + 'logback.xml'), 
            this);                            

        //--------------------//
        // Create build files //
        //--------------------//   
         this.fs.copyTpl(
            this.templatePath('_build.gradle'), 
            this.destinationPath('build.gradle'), 
            this);           
    },

    end: function () {       
    }
});
