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
exports.TalentsRepository = void 0;
var client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
var lib_dynamodb_1 = require("@aws-sdk/lib-dynamodb");
var DynamoDBClient_1 = require("../dynamodb/DynamoDBClient");
var TalentAlreadyExists_1 = require("../http/errors/TalentAlreadyExists");
var env_1 = require("../env");
var TalentsRepository = /** @class */ (function () {
    function TalentsRepository() {
        this.client = new DynamoDBClient_1.DynamoDBClient().getClient();
    }
    TalentsRepository.prototype.retrieveAll = function (queries) {
        return __awaiter(this, void 0, void 0, function () {
            var position, salary, params;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        position = queries.position, salary = queries.salary;
                        params = {
                            TableName: env_1.env.TABLE_NAME,
                            IndexName: 'PositionSalaryIndex',
                            KeyConditionExpression: '#position = :position AND salary > :salary',
                            ExpressionAttributeNames: {
                                '#position': 'position',
                            },
                            ExpressionAttributeValues: {
                                ':position': { S: position },
                                ':salary': { N: salary }
                            },
                            Select: 'ALL_ATTRIBUTES'
                        };
                        return [4 /*yield*/, this.client.send(new client_dynamodb_1.QueryCommand(params))];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    TalentsRepository.prototype.persist = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.verifyByEmail(params.email)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.client.send(new lib_dynamodb_1.PutCommand({
                                TableName: env_1.env.TABLE_NAME,
                                Item: params
                            }))];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    TalentsRepository.prototype.verifyByEmail = function (email) {
        return __awaiter(this, void 0, void 0, function () {
            var resource;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.send(new client_dynamodb_1.ScanCommand({
                            TableName: env_1.env.TABLE_NAME,
                            IndexName: 'EmailIndex',
                            FilterExpression: 'email = :email',
                            ExpressionAttributeValues: {
                                ':email': { S: email },
                            },
                            Select: 'COUNT',
                        }))];
                    case 1:
                        resource = _a.sent();
                        if (resource.Count > 0) {
                            throw new TalentAlreadyExists_1.TalentAlreadyExists();
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    return TalentsRepository;
}());
exports.TalentsRepository = TalentsRepository;
//# sourceMappingURL=TalentsRepository.js.map