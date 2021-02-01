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
exports.DevStarter = void 0;
var chalk = require("chalk");
var cross_spawn_1 = require("cross-spawn");
var jwtDecode = require("jwt-decode");
var _ = require("lodash");
var opn = require("opn");
var api_token_resolver_1 = require("./api-token-resolver");
var file_helpers_1 = require("./file.helpers");
var DevStarter = /** @class */ (function () {
    function DevStarter() {
    }
    DevStarter.prototype.start = function (configPath) {
        return __awaiter(this, void 0, void 0, function () {
            var config;
            var _this = this;
            return __generator(this, function (_a) {
                config = file_helpers_1.loadLxrConfig(configPath);
                return [2 /*return*/, this.getAccessToken(config)
                        .then(function (accessToken) { return _this.startLocalServer(config, accessToken); })
                        .then(function (result) {
                        if (result) {
                            _this.openUrlInBrowser(result.launchUrl);
                            console.log(chalk.green("Open the following url to test your report:\n" + result.launchUrl) + '\n');
                            console.log(chalk.yellow("If your report is not being loaded, please check if it opens outside of LeanIX via this url:\n" + result.localhostUrl));
                        }
                    })];
            });
        });
    };
    DevStarter.prototype.startLocalServer = function (config, accessToken) {
        var port = config.localPort || 8080;
        var localhostUrl = "https://localhost:" + port;
        var urlEncoded = encodeURIComponent(localhostUrl);
        var host = 'https://' + config.host;
        var accessTokenHash = accessToken ? "#access_token=" + accessToken : '';
        var workspace = accessToken ? this.getWorkspaceFromAccesToken(accessToken) : config.workspace;
        if (_.isEmpty(workspace)) {
            console.error(chalk.red("Workspace not specified. The local server can't be started."));
            return new Promise(null);
        }
        console.log(chalk.green("Your workspace is " + workspace));
        var baseLaunchUrl = host + "/" + workspace + "/reports/dev?url=" + urlEncoded;
        var launchUrl = baseLaunchUrl + accessTokenHash;
        console.log(chalk.green('Starting development server and launching with url: ' + baseLaunchUrl));
        var args = ['--https', '--port', '' + port];
        if (config.ssl && config.ssl.cert && config.ssl.key) {
            args.push('--cert=' + config.ssl.cert);
            args.push('--key=' + config.ssl.key);
        }
        console.log('' + args.join(' '));
        var serverProcess = cross_spawn_1.spawn('node_modules/.bin/webpack-dev-server', args);
        serverProcess.stdout.on('data', function (data) {
            console.log(data.toString());
        });
        // output errors from webpack
        serverProcess.stderr.on('data', function (data) {
            console.error(chalk.red(data.toString()));
        });
        return new Promise(function (resolve) {
            var projectRunning = false;
            serverProcess.on('error', function (err) {
                console.error(err);
            });
            serverProcess.stdout.on('data', function (data) {
                var output = data.toString();
                if (output.indexOf('Project is running') >= 0) {
                    projectRunning = true;
                }
                if (projectRunning && output.indexOf('Compiled successfully') >= 0) {
                    resolve({ launchUrl: launchUrl, localhostUrl: localhostUrl });
                }
            });
        });
    };
    DevStarter.prototype.getWorkspaceFromAccesToken = function (accessToken) {
        var claims = jwtDecode(accessToken);
        return claims.principal.permission.workspaceName;
    };
    DevStarter.prototype.getAccessToken = function (config) {
        if (!_.isEmpty(config.apitoken)) {
            return api_token_resolver_1.ApiTokenResolver.getAccessToken('https://' + config.host, config.apitoken, config.proxyURL);
        }
        else {
            return Promise.resolve(null);
        }
    };
    DevStarter.prototype.openUrlInBrowser = function (url) {
        try {
            opn(url);
        }
        catch (err) {
            console.error('Unable to open your browser: ' + err);
        }
    };
    return DevStarter;
}());
exports.DevStarter = DevStarter;
