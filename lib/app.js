"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var chalk = require("chalk");
var program = require("commander");
var builder_1 = require("./builder");
var bundler_1 = require("./bundler");
var dev_starter_1 = require("./dev-starter");
var file_helpers_1 = require("./file.helpers");
var initializer_1 = require("./initializer");
var uploader_1 = require("./uploader");
var version_1 = require("./version");
program.version(version_1.version);
program
    .command('init')
    .description('Initializes a new project')
    .action(function () {
    new initializer_1.Initializer().init().catch(handleError);
});
program
    .command('start')
    .description('Start developing and testing your report')
    .option('-c, --config <path>', 'Path to lxr.json config', 'lxr.json')
    .action(function (options) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        new dev_starter_1.DevStarter().start(options.config).catch(handleError);
        return [2 /*return*/];
    });
}); });
program
    .command('build')
    .description("Builds the report")
    .on('--help', function () {
    console.log("\nBy default, the report will be built by running \"node_modules/.bin/webpack\".\nBefore the build, the dist folder (\"dist\" by default) will be deleted to\nensure a clean build.\n\nThese defaults can be changed by setting \"distPath\" and \"buildCommand\" in the\n\"leanixReportingCli\" section of package.json:\n\n{\n  \"leanixReportingCli\": {\n    \"distPath\": \"output\",\n    \"buildCommand\": \"make\"\n  }\n}\n\nPlease note that the value provided for \"distPath\" needs to be aligned with\nconfiguration of the given build command. E.g., in the example above, \"make\"\nwould need to configured in a way that it writes the report artefacts to the\n\"output\" folder.");
})
    .action(function () { return __awaiter(void 0, void 0, void 0, function () {
    var cliConfig, builder, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                cliConfig = file_helpers_1.loadCliConfig();
                builder = new builder_1.Builder(console);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, builder.build(cliConfig.distPath, cliConfig.buildCommand)];
            case 2:
                _a.sent();
                return [3 /*break*/, 4];
            case 3:
                error_1 = _a.sent();
                console.error(chalk.red(error_1));
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
program
    .command('upload')
    .description('Uploads the report to the configured workspace')
    .option('-c, --config <path>', 'Path to lxr.json config', 'lxr.json')
    .on('--help', function () {
    console.log("\nBefore uploading, the report will be built \u2013 see \"lxr help build\" for details.\n\nThe report will be uploaded to the workspace associated with the \"apitoken\" on\nthe \"host\" given in lxr.json.");
})
    .action(function (options) { return __awaiter(void 0, void 0, void 0, function () {
    var cliConfig, lxrConfig, url, builder, bundler, uploader, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                cliConfig = file_helpers_1.loadCliConfig();
                lxrConfig = file_helpers_1.loadLxrConfig(options.config);
                url = "https://" + lxrConfig.host + "/services/pathfinder/v1/reports/upload";
                builder = new builder_1.Builder(console);
                bundler = new bundler_1.Bundler();
                uploader = new uploader_1.Uploader();
                console.log(chalk.yellow(chalk.italic('Bundling and uploading your project...')));
                _a.label = 1;
            case 1:
                _a.trys.push([1, 5, , 6]);
                return [4 /*yield*/, builder.build(cliConfig.distPath, cliConfig.buildCommand)];
            case 2:
                _a.sent();
                return [4 /*yield*/, bundler.bundle(cliConfig.distPath)];
            case 3:
                _a.sent();
                return [4 /*yield*/, uploader.upload(url, lxrConfig.apitoken, lxrConfig.host, lxrConfig.proxyURL)];
            case 4:
                _a.sent();
                return [3 /*break*/, 6];
            case 5:
                error_2 = _a.sent();
                handleError(error_2);
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); });
program
    .command('store-upload <id> <apitoken>')
    .description('Uploads the report to the LeanIX Store')
    .option('--host <host>', 'Which store to use (default: store.leanix.net)')
    .option('--tokenhost <tokenhost>', 'Where to resolve the apitoken (default: app.leanix.net)')
    .action(function (id, apitoken, options) { return __awaiter(void 0, void 0, void 0, function () {
    var cliConfig, host, tokenhost, url, builder, bundler, uploader, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                cliConfig = file_helpers_1.loadCliConfig();
                host = options.host || 'store.leanix.net';
                tokenhost = options.tokenhost || 'app.leanix.net';
                url = "https://" + host + "/services/torg/v1/assetversions/" + id + "/payload";
                builder = new builder_1.Builder(console);
                bundler = new bundler_1.Bundler();
                uploader = new uploader_1.Uploader();
                console.log(chalk.yellow(chalk.italic("Bundling and uploading your project to the LeanIX Store (" + host + ")...")));
                _a.label = 1;
            case 1:
                _a.trys.push([1, 5, , 6]);
                return [4 /*yield*/, builder.build(cliConfig.distPath, cliConfig.buildCommand)];
            case 2:
                _a.sent();
                return [4 /*yield*/, bundler.bundle(cliConfig.distPath)];
            case 3:
                _a.sent();
                return [4 /*yield*/, uploader.upload(url, apitoken, tokenhost)];
            case 4:
                _a.sent();
                return [3 /*break*/, 6];
            case 5:
                error_3 = _a.sent();
                handleError(error_3);
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); });
program.parse(process.argv);
// no commands specified
if (process.argv.length === 2) {
    console.log(chalk.cyan('  LeanIX Reporting CLI'));
    console.log(chalk.cyan('  ===================='));
    console.log('');
    console.log(chalk.cyan('  version: ' + version_1.version));
    console.log(chalk.cyan('  github: https://github.com/leanix/leanix-reporting-cli'));
    console.log('');
    program.outputHelp();
}
function handleError(err) {
    console.error(chalk.red(err.message));
}
