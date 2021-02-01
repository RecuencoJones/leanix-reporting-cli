"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.version = void 0;
var path_1 = require("path");
var file_helpers_1 = require("./file.helpers");
var packageJson = file_helpers_1.readJsonFile(path_1.join(__dirname, '../package.json'));
exports.version = packageJson['version'];
