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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserUpdaterUseCase = void 0;
const GetUserById_service_1 = require("../../../domain/services/user/GetUserById.service");
const UserNotFound_exception_1 = require("../../../domain/exceptions/user/UserNotFound.exception");
class UserUpdaterUseCase {
    constructor(userRepository) {
        this._userRepository = userRepository;
        this._getUserByIdService = new GetUserById_service_1.GetUserByIdService(userRepository);
    }
    run(body) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5;
        return __awaiter(this, void 0, void 0, function* () {
            const userToUpdate = yield this._getUserByIdService.run(body === null || body === void 0 ? void 0 : body.id);
            if (userToUpdate === null)
                throw new UserNotFound_exception_1.UserNotFoundException();
            userToUpdate.name = (_a = body.name) !== null && _a !== void 0 ? _a : userToUpdate.name;
            userToUpdate.username = (_b = body.username) !== null && _b !== void 0 ? _b : userToUpdate.username;
            userToUpdate.lastname = (_c = body.lastname) !== null && _c !== void 0 ? _c : userToUpdate.lastname;
            userToUpdate.dni = (_d = body.dni) !== null && _d !== void 0 ? _d : userToUpdate.dni;
            userToUpdate.cuil = (_e = body.cuil) !== null && _e !== void 0 ? _e : userToUpdate.cuil;
            userToUpdate.birthday = (_f = body.birthday) !== null && _f !== void 0 ? _f : userToUpdate.birthday;
            userToUpdate.address = {
                street: (_h = (_g = body.address) === null || _g === void 0 ? void 0 : _g.street) !== null && _h !== void 0 ? _h : (_j = userToUpdate.address) === null || _j === void 0 ? void 0 : _j.street,
                number: (_l = (_k = body.address) === null || _k === void 0 ? void 0 : _k.number) !== null && _l !== void 0 ? _l : (_m = userToUpdate.address) === null || _m === void 0 ? void 0 : _m.number,
                floor: (_p = (_o = body.address) === null || _o === void 0 ? void 0 : _o.floor) !== null && _p !== void 0 ? _p : (_q = userToUpdate.address) === null || _q === void 0 ? void 0 : _q.floor,
                department: (_s = (_r = body.address) === null || _r === void 0 ? void 0 : _r.department) !== null && _s !== void 0 ? _s : (_t = userToUpdate.address) === null || _t === void 0 ? void 0 : _t.department,
                province: (_v = (_u = body.address) === null || _u === void 0 ? void 0 : _u.province) !== null && _v !== void 0 ? _v : (_w = userToUpdate.address) === null || _w === void 0 ? void 0 : _w.province,
                country: (_y = (_x = body.address) === null || _x === void 0 ? void 0 : _x.country) !== null && _y !== void 0 ? _y : (_z = userToUpdate.address) === null || _z === void 0 ? void 0 : _z.country
            };
            userToUpdate.position = (_0 = body.position) !== null && _0 !== void 0 ? _0 : userToUpdate.position;
            userToUpdate.startDate = (_1 = body.startDate) !== null && _1 !== void 0 ? _1 : userToUpdate.startDate;
            userToUpdate.phone = (_2 = body.phone) !== null && _2 !== void 0 ? _2 : userToUpdate.phone;
            userToUpdate.email = (_3 = body.email) !== null && _3 !== void 0 ? _3 : userToUpdate.email;
            userToUpdate.state = (_4 = body.state) !== null && _4 !== void 0 ? _4 : userToUpdate.state;
            userToUpdate.permissions = (_5 = body.permissions) !== null && _5 !== void 0 ? _5 : userToUpdate.permissions;
            const userUpdated = yield this._userRepository.update(userToUpdate);
            return userUpdated;
        });
    }
}
exports.UserUpdaterUseCase = UserUpdaterUseCase;
