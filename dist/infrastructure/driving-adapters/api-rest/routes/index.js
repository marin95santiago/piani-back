"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_routes_1 = __importDefault(require("./user.routes"));
const login_routes_1 = __importDefault(require("./login.routes"));
const position_routes_1 = __importDefault(require("./position.routes"));
const provider_routes_1 = __importDefault(require("./provider.routes"));
const UserAlreadyExist_exception_1 = require("../../../../domain/exceptions/user/UserAlreadyExist.exception");
const UserNotFound_exception_1 = require("../../../../domain/exceptions/user/UserNotFound.exception");
const LoginWrongPassword_exception_1 = require("../../../../domain/exceptions/user/LoginWrongPassword.exception");
const PermissionNotAvailable_exception_1 = require("../../../../domain/exceptions/common/PermissionNotAvailable.exception");
const MissingProperty_exception_1 = require("../../../../domain/exceptions/common/MissingProperty.exception");
// import { Exception } from '@domain/exceptions/Exception'
const route = (0, express_1.Router)();
route.use('/api/users', user_routes_1.default);
route.use('/api/login', login_routes_1.default);
route.use('/api/position', position_routes_1.default);
route.use('/api/provider', provider_routes_1.default);
route.use((err, req, res, next) => {
    if (err instanceof UserAlreadyExist_exception_1.UserAlreadyExistException) {
        res.status(400).json({
            message: err.message
        });
    }
    else if (err instanceof UserNotFound_exception_1.UserNotFoundException) {
        res.status(400).json({
            message: err.message
        });
    }
    else if (err instanceof LoginWrongPassword_exception_1.LoginWrongPasswordException) {
        res.status(400).json({
            message: err.message
        });
    }
    else if (err instanceof PermissionNotAvailable_exception_1.PermissionNotAvailableException) {
        res.status(403).json({
            message: err.message
        });
    }
    else if (err instanceof MissingProperty_exception_1.MissingPropertyException) {
        res.status(400).json({
            message: err.message
        });
    }
    else {
        next(err);
    }
});
route.use((err, req, res, next) => {
    console.log(err);
    res.status(500);
    res.json({
        error: err
    });
});
exports.default = route;
