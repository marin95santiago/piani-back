"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DynamoDBPositionRepository = void 0;
const path_1 = __importDefault(require("path"));
const dotenv = __importStar(require("dotenv"));
const client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
dotenv.config({
    path: path_1.default.resolve(__dirname, '../../../../../.env')
});
class DynamoDBPositionRepository {
    constructor() {
        var _a, _b;
        this.client = new client_dynamodb_1.DynamoDBClient({ region: 'us-east-1' });
        this._environment = (_a = process.env.ENVIRONMENT) !== null && _a !== void 0 ? _a : '';
        this._project = (_b = process.env.PROJECT) !== null && _b !== void 0 ? _b : '';
        this._table = 'Positions';
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const params = {
                TableName: `${this._project}-${this._environment}-${this._table}`
            };
            const response = yield this.client.send(new client_dynamodb_1.ScanCommand(params));
            const items = (response.Items !== undefined) ? response.Items : [];
            const positions = items.map((item) => {
                var _a, _b;
                return {
                    code: (_a = item.code.S) !== null && _a !== void 0 ? _a : '',
                    description: (_b = item.description.S) !== null && _b !== void 0 ? _b : '',
                    permissionsAvailable: item.permissionsAvailable.L !== undefined
                        ? item.permissionsAvailable.L.map((permission) => {
                            if (permission.S !== undefined) {
                                return permission.S;
                            }
                            else {
                                return '';
                            }
                        })
                        : ['']
                };
            });
            return positions;
        });
    }
}
exports.DynamoDBPositionRepository = DynamoDBPositionRepository;
