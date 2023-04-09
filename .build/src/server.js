"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = require("./app");
var serverless = require('serverless-http');
module.exports.handler = serverless(app_1.app);
//# sourceMappingURL=server.js.map