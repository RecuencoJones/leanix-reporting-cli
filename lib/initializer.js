"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Initializer = void 0;
var chalk = require("chalk");
var inquirer = require("inquirer");
var process = require("process");
var path_helpers_1 = require("./path.helpers");
var template_extractor_1 = require("./template-extractor");
var Initializer = /** @class */ (function () {
    function Initializer() {
        this.extractor = new template_extractor_1.TemplateExtractor();
    }
    Initializer.prototype.init = function () {
        var _this = this;
        console.log(chalk.green('Initializing new project...'));
        return inquirer.prompt(this.getInquirerQuestions()).then(function (answers) {
            answers.nodeVersion = process.versions.node;
            _this.extractor.extractTemplateFiles(path_helpers_1.getTemplateDirectoryPath(), answers);
            console.log(chalk.green('\u2713 Your project is ready!'));
            console.log(chalk.green('Please run `npm install` to install dependencies and then run `npm start` to start developing!'));
        });
    };
    Initializer.prototype.getInquirerQuestions = function () {
        // The name properties correspond to the variables in the package.json template file
        return [
            {
                type: 'input',
                name: 'name',
                message: 'Name of your project for package.json'
            },
            {
                type: 'input',
                name: 'id',
                message: 'Unique id for this report in Java package notation (e.g. net.leanix.barcharts)'
            },
            {
                type: 'input',
                name: 'author',
                message: 'Who is the author of this report (e.g. LeanIX GmbH <support@leanix.net>)'
            },
            {
                type: 'input',
                name: 'title',
                message: 'A title to be shown in LeanIX when report is installed'
            },
            {
                type: 'input',
                name: 'description',
                message: 'Description of your project'
            },
            {
                type: 'input',
                name: 'licence',
                default: 'UNLICENSED',
                message: 'Which licence do you want to use for this project?'
            },
            {
                type: 'input',
                name: 'host',
                default: 'app.leanix.net',
                message: 'Which host do you want to work with?'
            },
            {
                type: 'input',
                name: 'workspace',
                message: 'Which is the workspace you want to test your report in?'
            },
            {
                type: 'input',
                name: 'apitoken',
                message: 'API-Token for Authentication (see: https://dev.leanix.net/docs/authentication#section-generate-api-tokens)'
            },
            {
                type: 'confirm',
                name: 'behindProxy',
                message: 'Are you behind a proxy?',
                default: false
            },
            {
                when: function (answers) { return answers.behindProxy; },
                type: 'input',
                name: 'proxyURL',
                message: 'Proxy URL?'
            }
        ];
    };
    return Initializer;
}());
exports.Initializer = Initializer;
