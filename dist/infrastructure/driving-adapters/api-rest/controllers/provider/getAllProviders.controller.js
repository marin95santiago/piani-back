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
exports.getAllProviders = void 0;
const utils_1 = require("../../utils");
const permission_json_1 = __importDefault(require("../../permission.json"));
const PermissionNotAvailable_exception_1 = require("../../../../../domain/exceptions/common/PermissionNotAvailable.exception");
const DynamoDBProviderRepository_1 = require("../../../../implementations/AWS/dynamo-db/DynamoDBProviderRepository");
const ProviderGetter_1 = require("../../../../../application/useCases/ProviderGetter");
const getAllProviders = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { sessionUser } = req.params;
    const dynamoDBProviderRepo = new DynamoDBProviderRepository_1.DynamoDBProviderRepository();
    const providerGetterUseCase = new ProviderGetter_1.ProviderGetterUseCase(dynamoDBProviderRepo);
    try {
        const session = JSON.parse(sessionUser);
        const doesSuperAdminHavePermission = true;
        const havePermission = (0, utils_1.validatePermission)(permission_json_1.default.provider.provider_view, session.data.permissions, doesSuperAdminHavePermission);
        if (!havePermission)
            throw new PermissionNotAvailable_exception_1.PermissionNotAvailableException();
        const providers = yield providerGetterUseCase.run();
        res.json(providers);
        return;
    }
    catch (e) {
        return next(e);
    }
});
exports.getAllProviders = getAllProviders;
