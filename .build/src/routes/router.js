"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
var express_1 = require("express");
var TalentsController_1 = require("../http/controllers/TalentsController");
var TalentsRepository_1 = require("../repositories/TalentsRepository");
var TalentsService_1 = require("../services/TalentsService");
var talentsController = new TalentsController_1.TalentsController(new TalentsService_1.TalentsService(new TalentsRepository_1.TalentsRepository()));
var router = (0, express_1.Router)();
exports.router = router;
router.get('/talents', talentsController.index);
router.get('/talents/:id', talentsController.show);
router.post('/talents', talentsController.store);
//# sourceMappingURL=router.js.map