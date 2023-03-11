"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DynamoDB = void 0;
const aws_1 = __importDefault(require("../aws"));
class DynamoDB {
    static getInstance(options) {
        if (this._INSTANCE === undefined) {
            this._INSTANCE = new aws_1.default.DynamoDB(options);
        }
        return this._INSTANCE;
    }
}
exports.DynamoDB = DynamoDB;
DynamoDB.TABLE_NAME = 'users';
