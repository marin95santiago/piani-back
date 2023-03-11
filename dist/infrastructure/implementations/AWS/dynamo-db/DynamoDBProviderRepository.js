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
exports.DynamoDBProviderRepository = void 0;
const path_1 = __importDefault(require("path"));
const dotenv = __importStar(require("dotenv"));
const client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
const util_dynamodb_1 = require("@aws-sdk/util-dynamodb");
dotenv.config({
    path: path_1.default.resolve(__dirname, '../../../../../.env')
});
class DynamoDBProviderRepository {
    constructor() {
        var _a, _b;
        this.client = new client_dynamodb_1.DynamoDBClient({ region: 'us-east-1' });
        this._environment = (_a = process.env.ENVIRONMENT) !== null && _a !== void 0 ? _a : '';
        this._project = (_b = process.env.PROJECT) !== null && _b !== void 0 ? _b : '';
        this._table = 'Providers';
    }
    save(provider) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        return __awaiter(this, void 0, void 0, function* () {
            const params = {
                TableName: `${this._project}-${this._environment}-${this._table}`,
                Item: (0, util_dynamodb_1.marshall)({
                    id: (_a = provider.id) !== null && _a !== void 0 ? _a : '',
                    businessName: (_b = provider.businessName) !== null && _b !== void 0 ? _b : '',
                    name: (_c = provider.name) !== null && _c !== void 0 ? _c : '',
                    cuit: (_d = provider.cuit) !== null && _d !== void 0 ? _d : '',
                    phone: (_e = provider.phone) !== null && _e !== void 0 ? _e : '',
                    email: (_f = provider.email) !== null && _f !== void 0 ? _f : null,
                    wayPay: (_g = provider.wayPay) !== null && _g !== void 0 ? _g : null,
                    observations: (_h = provider.observations) !== null && _h !== void 0 ? _h : null,
                    products: (_j = provider.products) !== null && _j !== void 0 ? _j : null,
                    accounts: (_k = provider.accounts) !== null && _k !== void 0 ? _k : null
                })
            };
            yield this.client.send(new client_dynamodb_1.PutItemCommand(params));
            return provider;
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const params = {
                TableName: `${this._project}-${this._environment}-${this._table}`
            };
            const response = yield this.client.send(new client_dynamodb_1.ScanCommand(params));
            const items = (response.Items !== undefined) ? response.Items : [];
            const providers = items.map((item) => {
                var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
                return {
                    id: (_a = item.id.S) !== null && _a !== void 0 ? _a : '',
                    businessName: (_b = item.businessName.S) !== null && _b !== void 0 ? _b : '',
                    name: (_c = item.name.S) !== null && _c !== void 0 ? _c : '',
                    cuit: (_d = item.cuit.S) !== null && _d !== void 0 ? _d : '',
                    phone: (_e = item.phone.S) !== null && _e !== void 0 ? _e : '',
                    email: (_f = item.email.S) !== null && _f !== void 0 ? _f : undefined,
                    wayPay: item.wayPay.M !== undefined
                        ? {
                            code: (_j = (_h = (_g = item.wayPay) === null || _g === void 0 ? void 0 : _g.M) === null || _h === void 0 ? void 0 : _h.code.S) !== null && _j !== void 0 ? _j : '',
                            description: (_m = (_l = (_k = item.wayPay) === null || _k === void 0 ? void 0 : _k.M) === null || _l === void 0 ? void 0 : _l.description.S) !== null && _m !== void 0 ? _m : ''
                        }
                        : undefined,
                    observations: (_o = item.observations.S) !== null && _o !== void 0 ? _o : undefined,
                    products: item.products.L !== undefined
                        ? item.products.L.map((product) => {
                            if (product.S !== undefined) {
                                return product.S;
                            }
                            else {
                                return '';
                            }
                        })
                        : undefined,
                    accounts: item.accounts.L !== undefined
                        ? item.accounts.L.map((account) => {
                            var _a, _b, _c, _d, _e;
                            if (account.M !== undefined) {
                                return {
                                    bank: {
                                        code: (_a = account.M.bank.M.code.S) !== null && _a !== void 0 ? _a : '',
                                        description: (_b = account.M.bank.M.description.S) !== null && _b !== void 0 ? _b : ''
                                    },
                                    number: (_c = account.M.number.S) !== null && _c !== void 0 ? _c : '',
                                    cvu: (_d = account.M.cvu.S) !== null && _d !== void 0 ? _d : '',
                                    alias: (_e = account.M.alias.S) !== null && _e !== void 0 ? _e : ''
                                };
                            }
                            else {
                                return '';
                            }
                        })
                        : undefined
                };
            });
            return providers;
        });
    }
    getById(id) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
        return __awaiter(this, void 0, void 0, function* () {
            const params = {
                TableName: `${this._project}-${this._environment}-${this._table}`,
                Key: (0, util_dynamodb_1.marshall)({
                    id
                })
            };
            const response = yield this.client.send(new client_dynamodb_1.GetItemCommand(params));
            const item = (response.Item !== undefined) ? response.Item : null;
            if (item === null)
                return null;
            const provider = {
                id: (_a = item.id.S) !== null && _a !== void 0 ? _a : '',
                businessName: (_b = item.businessName.S) !== null && _b !== void 0 ? _b : '',
                name: (_c = item.name.S) !== null && _c !== void 0 ? _c : '',
                cuit: (_d = item.cuit.S) !== null && _d !== void 0 ? _d : '',
                phone: (_e = item.phone.S) !== null && _e !== void 0 ? _e : '',
                email: (_f = item.email.S) !== null && _f !== void 0 ? _f : undefined,
                wayPay: item.wayPay.M !== undefined
                    ? {
                        code: (_j = (_h = (_g = item.wayPay) === null || _g === void 0 ? void 0 : _g.M) === null || _h === void 0 ? void 0 : _h.code.S) !== null && _j !== void 0 ? _j : '',
                        description: (_m = (_l = (_k = item.wayPay) === null || _k === void 0 ? void 0 : _k.M) === null || _l === void 0 ? void 0 : _l.description.S) !== null && _m !== void 0 ? _m : ''
                    }
                    : undefined,
                observations: (_o = item.observations.S) !== null && _o !== void 0 ? _o : undefined,
                products: item.products.L !== undefined
                    ? item.products.L.map(product => {
                        if (product.S !== undefined) {
                            return product.S;
                        }
                        else {
                            return '';
                        }
                    })
                    : undefined,
                accounts: item.accounts.L !== undefined
                    ? item.accounts.L.map(account => {
                        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
                        return {
                            bank: {
                                code: (_c = (_b = (_a = account.M) === null || _a === void 0 ? void 0 : _a.bank.M) === null || _b === void 0 ? void 0 : _b.code.S) !== null && _c !== void 0 ? _c : '',
                                description: (_f = (_e = (_d = account.M) === null || _d === void 0 ? void 0 : _d.bank.M) === null || _e === void 0 ? void 0 : _e.description.S) !== null && _f !== void 0 ? _f : ''
                            },
                            number: (_h = (_g = account.M) === null || _g === void 0 ? void 0 : _g.number.S) !== null && _h !== void 0 ? _h : '',
                            cvu: (_k = (_j = account.M) === null || _j === void 0 ? void 0 : _j.cvu.S) !== null && _k !== void 0 ? _k : '',
                            alias: (_m = (_l = account.M) === null || _l === void 0 ? void 0 : _l.alias.S) !== null && _m !== void 0 ? _m : ''
                        };
                    })
                    : undefined
            };
            return provider;
        });
    }
    update(provider) {
        return __awaiter(this, void 0, void 0, function* () {
            const params = {
                TableName: 'users',
                Item: (0, util_dynamodb_1.marshall)({
                    id: provider.id,
                    businessName: provider.businessName,
                    name: provider.name,
                    cuit: provider.cuit,
                    phone: provider.phone,
                    email: provider.email,
                    wayPay: provider.wayPay,
                    observations: provider.observations,
                    products: provider.products,
                    accounts: provider.accounts
                }, {
                    removeUndefinedValues: true
                })
            };
            yield this.client.send(new client_dynamodb_1.PutItemCommand(params));
            return provider;
        });
    }
}
exports.DynamoDBProviderRepository = DynamoDBProviderRepository;
