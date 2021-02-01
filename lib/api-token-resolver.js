"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiTokenResolver = void 0;
var rp = require("request-promise-native");
var ApiTokenResolver = /** @class */ (function () {
    function ApiTokenResolver() {
    }
    ApiTokenResolver.getAccessToken = function (host, apiToken, proxy) {
        var base64ApiToken = Buffer.from('apitoken:' + apiToken).toString('base64');
        var options = {
            url: host + '/services/mtm/v1/oauth2/token',
            headers: { Authorization: 'Basic ' + base64ApiToken },
            form: { grant_type: 'client_credentials' }
        };
        return rp.post(__assign(__assign({}, options), { proxy: proxy })).then(function (response) { return JSON.parse(response)['access_token']; });
    };
    return ApiTokenResolver;
}());
exports.ApiTokenResolver = ApiTokenResolver;