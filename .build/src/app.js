"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
var express_1 = __importDefault(require("express"));
var router_1 = require("./routes/router");
var zod_1 = require("zod");
var env_1 = require("./env");
var app = (0, express_1.default)();
exports.app = app;
app.use(express_1.default.json());
app.use(router_1.router);
app.use(function (err, req, res, next) {
    if (err instanceof zod_1.ZodError) {
        return res.status(400).json({
            message: 'Validation error.',
            error: err.message
        });
    }
    if (env_1.env.NODE_ENV === 'dev') {
        console.error(err);
    }
    else {
        //TODO: colocar um sentry aqui?
    }
    return next.status(500).send({ message: 'Internal server error.' });
});
//# sourceMappingURL=app.js.map