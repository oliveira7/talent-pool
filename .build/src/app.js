"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
var express_1 = __importDefault(require("express"));
var router_1 = require("./routes/router");
var app = (0, express_1.default)();
exports.app = app;
app.use(express_1.default.json());
app.use(router_1.router);
//# sourceMappingURL=app.js.map