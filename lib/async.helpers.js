"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rimrafAsync = exports.writeFileAsync = exports.execAsync = void 0;
var rimraf = require("rimraf");
var child_process_1 = require("child_process");
var fs_1 = require("fs");
var util_1 = require("util");
exports.execAsync = util_1.promisify(child_process_1.exec);
exports.writeFileAsync = util_1.promisify(fs_1.writeFile);
exports.rimrafAsync = util_1.promisify(rimraf);