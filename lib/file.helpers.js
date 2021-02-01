"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadCliConfig = exports.loadPackageJson = exports.loadLxrConfig = exports.readJsonFile = void 0;
var fs_1 = require("fs");
var path_helpers_1 = require("./path.helpers");
function readJsonFile(path) {
    var buffer = fs_1.readFileSync(path);
    return JSON.parse(buffer.toString('utf-8'));
}
exports.readJsonFile = readJsonFile;
function loadLxrConfig(configPath) {
    if (configPath === void 0) { configPath = 'lxr.json'; }
    var lxrConfigPath = path_helpers_1.getProjectDirectoryPath(configPath);
    return readJsonFile(lxrConfigPath);
}
exports.loadLxrConfig = loadLxrConfig;
function loadPackageJson() {
    var packageJsonPath = path_helpers_1.getProjectDirectoryPath('package.json');
    return readJsonFile(packageJsonPath);
}
exports.loadPackageJson = loadPackageJson;
function loadCliConfig(packageJson) {
    var _a, _b;
    if (packageJson === void 0) { packageJson = loadPackageJson(); }
    var leanixReportingCli = packageJson.leanixReportingCli || {};
    return {
        distPath: (_a = leanixReportingCli.distPath) !== null && _a !== void 0 ? _a : './dist',
        buildCommand: (_b = leanixReportingCli.buildCommand) !== null && _b !== void 0 ? _b : './node_modules/.bin/webpack'
    };
}
exports.loadCliConfig = loadCliConfig;
