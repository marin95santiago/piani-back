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
exports.DynamoDBUserRepository = void 0;
const path_1 = __importDefault(require("path"));
const dotenv = __importStar(require("dotenv"));
const client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
const util_dynamodb_1 = require("@aws-sdk/util-dynamodb");
dotenv.config({
    path: path_1.default.resolve(__dirname, '../../../../../.env')
});
class DynamoDBUserRepository {
    constructor() {
        var _a, _b;
        this.client = new client_dynamodb_1.DynamoDBClient({ region: 'us-east-1' });
        this._environment = (_a = process.env.ENVIRONMENT) !== null && _a !== void 0 ? _a : '';
        this._project = (_b = process.env.PROJECT) !== null && _b !== void 0 ? _b : '';
        this._table = 'Users';
    }
    save(user) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q;
        return __awaiter(this, void 0, void 0, function* () {
            const params = {
                TableName: `${this._project}-${this._environment}-${this._table}`,
                Item: (0, util_dynamodb_1.marshall)({
                    id: (_a = user.id) !== null && _a !== void 0 ? _a : '',
                    username: (_b = user.username) !== null && _b !== void 0 ? _b : '',
                    password: (_c = user.password) !== null && _c !== void 0 ? _c : '',
                    name: (_d = user.name) !== null && _d !== void 0 ? _d : '',
                    lastname: (_e = user.lastname) !== null && _e !== void 0 ? _e : '',
                    dni: (_f = user.dni) !== null && _f !== void 0 ? _f : 0,
                    cuil: (_g = user.cuil) !== null && _g !== void 0 ? _g : '',
                    birthday: (_h = user.birthday) !== null && _h !== void 0 ? _h : null,
                    address: (_j = user.address) !== null && _j !== void 0 ? _j : null,
                    position: (_k = user.position) !== null && _k !== void 0 ? _k : '',
                    startDate: (_l = user.startDate) !== null && _l !== void 0 ? _l : '',
                    phone: (_m = user.phone) !== null && _m !== void 0 ? _m : null,
                    email: (_o = user.email) !== null && _o !== void 0 ? _o : null,
                    state: (_p = user.state) !== null && _p !== void 0 ? _p : '',
                    permissions: (_q = user.permissions) !== null && _q !== void 0 ? _q : ['']
                })
            };
            yield this.client.send(new client_dynamodb_1.PutItemCommand(params));
            return user;
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const params = {
                TableName: `${this._project}-${this._environment}-${this._table}`
            };
            const response = yield this.client.send(new client_dynamodb_1.ScanCommand(params));
            const items = (response.Items !== undefined) ? response.Items : [];
            const users = items.map((item) => {
                var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15, _16, _17, _18;
                return {
                    id: (_a = item.id.S) !== null && _a !== void 0 ? _a : '',
                    name: (_b = item.name.S) !== null && _b !== void 0 ? _b : '',
                    username: (_c = item.username.S) !== null && _c !== void 0 ? _c : '',
                    lastname: (_d = item.lastname.S) !== null && _d !== void 0 ? _d : '',
                    dni: (_e = Number(item.dni.N)) !== null && _e !== void 0 ? _e : 0,
                    cuil: (_f = item.cuil.S) !== null && _f !== void 0 ? _f : '',
                    birthday: (_h = (_g = item.birthday) === null || _g === void 0 ? void 0 : _g.S) !== null && _h !== void 0 ? _h : undefined,
                    address: {
                        street: (_k = (_j = item.address) === null || _j === void 0 ? void 0 : _j.M) === null || _k === void 0 ? void 0 : _k.street.S,
                        number: (_o = Number((_m = (_l = item.address) === null || _l === void 0 ? void 0 : _l.M) === null || _m === void 0 ? void 0 : _m.number.N)) !== null && _o !== void 0 ? _o : 0,
                        floor: (_q = (_p = item.address) === null || _p === void 0 ? void 0 : _p.M) === null || _q === void 0 ? void 0 : _q.floor.S,
                        department: (_s = (_r = item.address) === null || _r === void 0 ? void 0 : _r.M) === null || _s === void 0 ? void 0 : _s.department.S,
                        province: {
                            code: ((_w = (_v = (_u = (_t = item.address) === null || _t === void 0 ? void 0 : _t.M) === null || _u === void 0 ? void 0 : _u.province) === null || _v === void 0 ? void 0 : _v.M) === null || _w === void 0 ? void 0 : _w.code.S) !== undefined ? item.address.M.province.M.code.S : '',
                            description: ((_0 = (_z = (_y = (_x = item.address) === null || _x === void 0 ? void 0 : _x.M) === null || _y === void 0 ? void 0 : _y.province) === null || _z === void 0 ? void 0 : _z.M) === null || _0 === void 0 ? void 0 : _0.description.S) !== undefined ? item.address.M.province.M.description.S : ''
                        },
                        country: {
                            code: ((_4 = (_3 = (_2 = (_1 = item.address) === null || _1 === void 0 ? void 0 : _1.M) === null || _2 === void 0 ? void 0 : _2.country) === null || _3 === void 0 ? void 0 : _3.M) === null || _4 === void 0 ? void 0 : _4.code.S) !== undefined ? item.address.M.country.M.code.S : '',
                            description: ((_8 = (_7 = (_6 = (_5 = item.address) === null || _5 === void 0 ? void 0 : _5.M) === null || _6 === void 0 ? void 0 : _6.country) === null || _7 === void 0 ? void 0 : _7.M) === null || _8 === void 0 ? void 0 : _8.description.S) !== undefined ? item.address.M.country.M.description.S : ''
                        }
                    },
                    position: {
                        code: ((_10 = (_9 = item.position) === null || _9 === void 0 ? void 0 : _9.M) === null || _10 === void 0 ? void 0 : _10.code.S) !== undefined ? item.position.M.code.S : '',
                        description: ((_12 = (_11 = item.position) === null || _11 === void 0 ? void 0 : _11.M) === null || _12 === void 0 ? void 0 : _12.description.S) !== undefined ? item.position.M.description.S : ''
                    },
                    startDate: (_13 = item.startDate.S) !== null && _13 !== void 0 ? _13 : '',
                    phone: (((_14 = item.phone) === null || _14 === void 0 ? void 0 : _14.N) !== undefined) ? Number(item.phone.N) : undefined,
                    email: (_16 = (_15 = item.email) === null || _15 === void 0 ? void 0 : _15.S) !== null && _16 !== void 0 ? _16 : undefined,
                    state: {
                        code: ((_17 = item.state.M) === null || _17 === void 0 ? void 0 : _17.code.S) !== undefined ? item.state.M.code.S : '',
                        description: ((_18 = item.state.M) === null || _18 === void 0 ? void 0 : _18.description.S) !== undefined ? item.state.M.description.S : ''
                    },
                    permissions: item.permissions.L !== undefined
                        ? item.permissions.L.map((permission) => {
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
            return users;
        });
    }
    getById(id) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15, _16, _17, _18, _19;
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
            const user = {
                id: (_a = item.id.S) !== null && _a !== void 0 ? _a : '',
                name: (_b = item.name.S) !== null && _b !== void 0 ? _b : '',
                username: (_c = item.username.S) !== null && _c !== void 0 ? _c : '',
                lastname: (_d = item.lastname.S) !== null && _d !== void 0 ? _d : '',
                dni: (_e = Number(item.dni.N)) !== null && _e !== void 0 ? _e : 0,
                cuil: (_f = item.cuil.S) !== null && _f !== void 0 ? _f : '',
                birthday: (_h = (_g = item.birthday) === null || _g === void 0 ? void 0 : _g.S) !== null && _h !== void 0 ? _h : undefined,
                address: {
                    street: (_k = (_j = item.address) === null || _j === void 0 ? void 0 : _j.M) === null || _k === void 0 ? void 0 : _k.street.S,
                    number: (_o = Number((_m = (_l = item.address) === null || _l === void 0 ? void 0 : _l.M) === null || _m === void 0 ? void 0 : _m.number.N)) !== null && _o !== void 0 ? _o : 0,
                    floor: (_q = (_p = item.address) === null || _p === void 0 ? void 0 : _p.M) === null || _q === void 0 ? void 0 : _q.floor.S,
                    department: (_s = (_r = item.address) === null || _r === void 0 ? void 0 : _r.M) === null || _s === void 0 ? void 0 : _s.department.S,
                    province: {
                        code: ((_w = (_v = (_u = (_t = item.address) === null || _t === void 0 ? void 0 : _t.M) === null || _u === void 0 ? void 0 : _u.province) === null || _v === void 0 ? void 0 : _v.M) === null || _w === void 0 ? void 0 : _w.code.S) !== undefined ? item.address.M.province.M.code.S : '',
                        description: ((_0 = (_z = (_y = (_x = item.address) === null || _x === void 0 ? void 0 : _x.M) === null || _y === void 0 ? void 0 : _y.province) === null || _z === void 0 ? void 0 : _z.M) === null || _0 === void 0 ? void 0 : _0.description.S) !== undefined ? item.address.M.province.M.description.S : ''
                    },
                    country: {
                        code: ((_4 = (_3 = (_2 = (_1 = item.address) === null || _1 === void 0 ? void 0 : _1.M) === null || _2 === void 0 ? void 0 : _2.country) === null || _3 === void 0 ? void 0 : _3.M) === null || _4 === void 0 ? void 0 : _4.code.S) !== undefined ? item.address.M.country.M.code.S : '',
                        description: ((_8 = (_7 = (_6 = (_5 = item.address) === null || _5 === void 0 ? void 0 : _5.M) === null || _6 === void 0 ? void 0 : _6.country) === null || _7 === void 0 ? void 0 : _7.M) === null || _8 === void 0 ? void 0 : _8.description.S) !== undefined ? item.address.M.country.M.description.S : ''
                    }
                },
                position: {
                    code: ((_10 = (_9 = item.position) === null || _9 === void 0 ? void 0 : _9.M) === null || _10 === void 0 ? void 0 : _10.code.S) !== undefined ? item.position.M.code.S : '',
                    description: ((_12 = (_11 = item.position) === null || _11 === void 0 ? void 0 : _11.M) === null || _12 === void 0 ? void 0 : _12.description.S) !== undefined ? item.position.M.description.S : ''
                },
                startDate: (_14 = (_13 = item.startDate) === null || _13 === void 0 ? void 0 : _13.S) !== null && _14 !== void 0 ? _14 : '',
                phone: (((_15 = item.phone) === null || _15 === void 0 ? void 0 : _15.N) !== undefined) ? Number(item.phone.N) : undefined,
                email: (_17 = (_16 = item.email) === null || _16 === void 0 ? void 0 : _16.S) !== null && _17 !== void 0 ? _17 : undefined,
                state: {
                    code: ((_18 = item.state.M) === null || _18 === void 0 ? void 0 : _18.code.S) !== undefined ? item.state.M.code.S : '',
                    description: ((_19 = item.state.M) === null || _19 === void 0 ? void 0 : _19.description.S) !== undefined ? item.state.M.description.S : ''
                },
                permissions: item.permissions.L !== undefined
                    ? item.permissions.L.map(permission => {
                        if (permission.S !== undefined) {
                            return permission.S;
                        }
                        else {
                            return '';
                        }
                    })
                    : ['']
            };
            return user;
        });
    }
    getByUserName(username) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15, _16, _17, _18, _19, _20;
        return __awaiter(this, void 0, void 0, function* () {
            const params = {
                TableName: `${this._project}-${this._environment}-${this._table}`,
                FilterExpression: 'username = :username',
                ExpressionAttributeValues: (0, util_dynamodb_1.marshall)({
                    ':username': username
                })
            };
            const response = yield this.client.send(new client_dynamodb_1.ScanCommand(params));
            const item = (response.Items !== undefined && response.Items.length > 0) ? response.Items[0] : null;
            if (item === null)
                return null;
            const user = {
                id: (_a = item.id.S) !== null && _a !== void 0 ? _a : '',
                name: (_b = item.name.S) !== null && _b !== void 0 ? _b : '',
                username: (_c = item.username.S) !== null && _c !== void 0 ? _c : '',
                password: (_e = (_d = item.password) === null || _d === void 0 ? void 0 : _d.S) !== null && _e !== void 0 ? _e : '',
                lastname: (_f = item.lastname.S) !== null && _f !== void 0 ? _f : '',
                dni: (_g = Number(item.dni.N)) !== null && _g !== void 0 ? _g : 0,
                cuil: (_h = item.cuil.S) !== null && _h !== void 0 ? _h : '',
                birthday: (_k = (_j = item.birthday) === null || _j === void 0 ? void 0 : _j.S) !== null && _k !== void 0 ? _k : undefined,
                address: {
                    street: (_m = (_l = item.address) === null || _l === void 0 ? void 0 : _l.M) === null || _m === void 0 ? void 0 : _m.street.S,
                    number: (_q = Number((_p = (_o = item.address) === null || _o === void 0 ? void 0 : _o.M) === null || _p === void 0 ? void 0 : _p.number.N)) !== null && _q !== void 0 ? _q : 0,
                    floor: (_s = (_r = item.address) === null || _r === void 0 ? void 0 : _r.M) === null || _s === void 0 ? void 0 : _s.floor.S,
                    department: (_u = (_t = item.address) === null || _t === void 0 ? void 0 : _t.M) === null || _u === void 0 ? void 0 : _u.department.S,
                    province: {
                        code: ((_y = (_x = (_w = (_v = item.address) === null || _v === void 0 ? void 0 : _v.M) === null || _w === void 0 ? void 0 : _w.province) === null || _x === void 0 ? void 0 : _x.M) === null || _y === void 0 ? void 0 : _y.code.S) !== undefined ? item.address.M.province.M.code.S : '',
                        description: ((_2 = (_1 = (_0 = (_z = item.address) === null || _z === void 0 ? void 0 : _z.M) === null || _0 === void 0 ? void 0 : _0.province) === null || _1 === void 0 ? void 0 : _1.M) === null || _2 === void 0 ? void 0 : _2.description.S) !== undefined ? item.address.M.province.M.description.S : ''
                    },
                    country: {
                        code: ((_6 = (_5 = (_4 = (_3 = item.address) === null || _3 === void 0 ? void 0 : _3.M) === null || _4 === void 0 ? void 0 : _4.country) === null || _5 === void 0 ? void 0 : _5.M) === null || _6 === void 0 ? void 0 : _6.code.S) !== undefined ? item.address.M.country.M.code.S : '',
                        description: ((_10 = (_9 = (_8 = (_7 = item.address) === null || _7 === void 0 ? void 0 : _7.M) === null || _8 === void 0 ? void 0 : _8.country) === null || _9 === void 0 ? void 0 : _9.M) === null || _10 === void 0 ? void 0 : _10.description.S) !== undefined ? item.address.M.country.M.description.S : ''
                    }
                },
                position: {
                    code: ((_12 = (_11 = item.position) === null || _11 === void 0 ? void 0 : _11.M) === null || _12 === void 0 ? void 0 : _12.code.S) !== undefined ? item.position.M.code.S : '',
                    description: ((_14 = (_13 = item.position) === null || _13 === void 0 ? void 0 : _13.M) === null || _14 === void 0 ? void 0 : _14.description.S) !== undefined ? item.position.M.description.S : ''
                },
                startDate: (_15 = item.startDate.S) !== null && _15 !== void 0 ? _15 : '',
                phone: (((_16 = item.phone) === null || _16 === void 0 ? void 0 : _16.N) !== undefined) ? Number(item.phone.N) : undefined,
                email: (_18 = (_17 = item.email) === null || _17 === void 0 ? void 0 : _17.S) !== null && _18 !== void 0 ? _18 : undefined,
                state: {
                    code: ((_19 = item.state.M) === null || _19 === void 0 ? void 0 : _19.code.S) !== undefined ? item.state.M.code.S : '',
                    description: ((_20 = item.state.M) === null || _20 === void 0 ? void 0 : _20.description.S) !== undefined ? item.state.M.description.S : ''
                },
                permissions: item.permissions.L !== undefined
                    ? item.permissions.L.map(permission => {
                        if (permission.S !== undefined) {
                            return permission.S;
                        }
                        else {
                            return '';
                        }
                    })
                    : ['']
            };
            return user;
        });
    }
    update(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const params = {
                TableName: `${this._project}-${this._environment}-${this._table}`,
                Item: (0, util_dynamodb_1.marshall)({
                    id: user.id,
                    name: user.name,
                    username: user.username,
                    lastname: user.lastname,
                    dni: user.dni,
                    cuil: user.cuil,
                    birthday: user.birthday,
                    address: user.address,
                    position: user.position,
                    startDate: user.startDate,
                    phone: user.phone,
                    email: user.email,
                    state: user.state,
                    permissions: user.permissions
                }, {
                    removeUndefinedValues: true
                })
            };
            yield this.client.send(new client_dynamodb_1.PutItemCommand(params));
            return user;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const params = {
                TableName: `${this._project}-${this._environment}-${this._table}`,
                Key: (0, util_dynamodb_1.marshall)({
                    id
                })
            };
            yield this.client.send(new client_dynamodb_1.DeleteItemCommand(params));
        });
    }
}
exports.DynamoDBUserRepository = DynamoDBUserRepository;
