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
exports.getAllPositions = void 0;
const DynamoDBPositionRepository_1 = require("../../../../implementations/AWS/dynamo-db/DynamoDBPositionRepository");
const PositionGetter_1 = require("../../../../../application/useCases/PositionGetter");
const getAllPositions = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const dynamoDBPositionRepo = new DynamoDBPositionRepository_1.DynamoDBPositionRepository();
    const positionGetterUseCase = new PositionGetter_1.PositionGetterUseCase(dynamoDBPositionRepo);
    try {
        const users = yield positionGetterUseCase.run();
        res.json(users);
        return;
    }
    catch (e) {
        return next(e);
    }
});
exports.getAllPositions = getAllPositions;
