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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = void 0;
const DynamoDBUserRepository_1 = require("../../../../implementations/AWS/dynamo-db/DynamoDBUserRepository");
const UserCreator_1 = require("../../../../../application/useCases/UserCreator");
const utils_1 = require("../../utils");
const permission_json_1 = __importDefault(require("../../permission.json"));
const PermissionNotAvailable_exception_1 = require("../../../../../domain/exceptions/common/PermissionNotAvailable.exception");
const uuid_1 = require("uuid");
const createUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password, name, birthday, lastname, dni, cuil, address, position, startDate, state, permissions, email, phone } = req.body;
    const { sessionUser } = req.params;
    const dynamoDBUserRepo = new DynamoDBUserRepository_1.DynamoDBUserRepository();
    const userCreatorUseCase = new UserCreator_1.UserCreatorUseCase(dynamoDBUserRepo);
    try {
        const session = JSON.parse(sessionUser);
        const doesSuperAdminHavePermission = true;
        const havePermission = (0, utils_1.validatePermission)(permission_json_1.default.user.user_create, session.data.permissions, doesSuperAdminHavePermission);
        if (!havePermission)
            throw new PermissionNotAvailable_exception_1.PermissionNotAvailableException();
        const userCreated = yield userCreatorUseCase.run({
            id: (0, uuid_1.v4)(),
            username,
            password,
            name,
            lastname,
            dni: Number(dni),
            cuil,
            birthday,
            email,
            phone,
            address: {
                street: address.street,
                number: Number(address.number),
                floor: address.floor,
                department: address.department,
                province: {
                    code: address.province.code,
                    description: address.province.description
                },
                country: {
                    code: address.country.code,
                    description: address.country.description
                }
            },
            position: {
                code: position.code,
                description: position.description
            },
            startDate,
            state: {
                code: state.code,
                description: state.description
            },
            permissions
        });
        res.json(userCreated);
        return;
    }
    catch (error) {
        return next(error);
    }
});
exports.createUser = createUser;
