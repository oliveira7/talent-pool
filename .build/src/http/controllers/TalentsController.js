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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
exports.TalentsController = void 0;
var TalentAlreadyExists_1 = require("../errors/TalentAlreadyExists");
var zod_1 = require("zod");
var TalentsController = /** @class */ (function () {
    function TalentsController(talentsService) {
        this.talentsService = talentsService;
        this.talentsService = talentsService;
    }
    TalentsController.prototype.index = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var talents, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.talentsService.index(req.query)];
                    case 1:
                        talents = _a.sent();
                        return [2 /*return*/, res.status(200).send({ data: talents })];
                    case 2:
                        err_1 = _a.sent();
                        return [2 /*return*/, res.status(500).send({ error: err_1.message })];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    TalentsController.prototype.store = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var talentSchema, params, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        talentSchema = zod_1.z.object({
                            position: zod_1.z.enum(['fullstack', 'frontend', 'backend']),
                            salary: zod_1.z.number(),
                            yearsExperience: zod_1.z.number(),
                            technologies: zod_1.z.array(zod_1.z.string()),
                            region: zod_1.z.string(),
                            availability: zod_1.z.enum(['fulltime', 'parttime', 'freelance']),
                            name: zod_1.z.string(),
                            email: zod_1.z.string().email(),
                            education: zod_1.z.string(),
                            languages: zod_1.z.array(zod_1.z.string()),
                            contact: zod_1.z.string().regex(/^(\d{2})(\d{2})9(\d{4})(\d{4})$/),
                            occupation: zod_1.z.string()
                        });
                        talentSchema.safeParse(req.body);
                        params = this.talentsService.getParams(req.body);
                        return [4 /*yield*/, this.talentsService.create(params)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, res.status(201).send({ message: 'Talent created successfully!' })];
                    case 2:
                        err_2 = _a.sent();
                        if (err_2 instanceof TalentAlreadyExists_1.TalentAlreadyExists) {
                            return [2 /*return*/, res.status(409).send({ message: err_2.message })];
                        }
                        if (err_2 instanceof zod_1.ZodError) {
                            return [2 /*return*/, res.status(400).json({
                                    message: 'Validation error.',
                                    error: err_2.format()
                                })];
                        }
                        return [2 /*return*/, res.status(500).send({ error: err_2.message })];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return TalentsController;
}());
exports.TalentsController = TalentsController;
//# sourceMappingURL=TalentsController.js.map