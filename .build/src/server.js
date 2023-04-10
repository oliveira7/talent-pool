"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = require("./app");
var serverless_http_1 = __importDefault(require("serverless-http"));
module.exports.handler = (0, serverless_http_1.default)(app_1.app);
//# sourceMappingURL=server.js.map