"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TemplateExtractor = void 0;
var chalk = require("chalk");
var ejs_1 = require("ejs");
var mkdirp_1 = require("mkdirp");
var fs = require("fs");
var path = require("path");
var path_helpers_1 = require("./path.helpers");
var TemplateExtractor = /** @class */ (function () {
    function TemplateExtractor() {
    }
    TemplateExtractor.prototype.extractTemplateFiles = function (baseTemplateDir, answers) {
        console.log(chalk.green('Extracting template files...'));
        this.extractTemplateDir(baseTemplateDir, baseTemplateDir, answers);
    };
    TemplateExtractor.prototype.extractTemplateDir = function (templateDir, baseTemplateDir, answers) {
        var _this = this;
        fs.readdirSync(templateDir).forEach(function (file) {
            var filePath = path.resolve(templateDir, file);
            var isDir = fs.lstatSync(filePath).isDirectory();
            if (isDir) {
                _this.extractTemplateDir(filePath, baseTemplateDir, answers);
            }
            else {
                _this.extractTemplateFile(filePath, baseTemplateDir, answers);
            }
        });
    };
    TemplateExtractor.prototype.extractTemplateFile = function (sourcePath, baseTemplateDir, answers) {
        var destPath = sourcePath.replace(baseTemplateDir, path_helpers_1.getProjectDirectoryPath()).replace(/\.ejs$/, '');
        console.log(sourcePath, destPath);
        var template = fs.readFileSync(sourcePath).toString('utf-8');
        var result = ejs_1.render(template, answers);
        mkdirp_1.sync(path.dirname(destPath));
        fs.writeFileSync(destPath, result);
    };
    return TemplateExtractor;
}());
exports.TemplateExtractor = TemplateExtractor;
