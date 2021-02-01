"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTemplateDirectoryPath = exports.getProjectDirectoryPath = void 0;
var path_1 = require("path");
function getProjectDirectoryPath(path) {
    if (path === void 0) { path = ''; }
    return path_1.resolve(process.cwd(), path);
}
exports.getProjectDirectoryPath = getProjectDirectoryPath;
function getTemplateDirectoryPath() {
    return path_1.join(__dirname, '../template');
}
exports.getTemplateDirectoryPath = getTemplateDirectoryPath;
