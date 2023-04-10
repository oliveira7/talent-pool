"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
var express_1 = require("express");
var TalentsController_1 = __importDefault(require("../http/controllers/TalentsController"));
var router = (0, express_1.Router)();
exports.router = router;
router.get('/talents', TalentsController_1.default.index);
router.get('/talents/:id', TalentsController_1.default.show);
router.post('/talents', TalentsController_1.default.store);
//# sourceMappingURL=router.js.map