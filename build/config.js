"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var _a = process.env, NODE_ENV = _a.NODE_ENV, DB_HOST = _a.DB_HOST, DB_PORT = _a.DB_PORT, DB_DATABASE = _a.DB_DATABASE, DB_DATABASE_TEST = _a.DB_DATABASE_TEST, DB_USER = _a.DB_USER, DB_PASS = _a.DB_PASS, PORT = _a.PORT, BCRYPT_PASSWORD = _a.BCRYPT_PASSWORD, SALT_ROUNDS = _a.SALT_ROUNDS, TOKEN_SECRET = _a.TOKEN_SECRET;
exports.default = {
    port: PORT,
    host: DB_HOST,
    dbPort: DB_PORT,
    database: NODE_ENV === 'development' ? DB_DATABASE : DB_DATABASE_TEST,
    user: DB_USER,
    password: DB_PASS,
    pepper: BCRYPT_PASSWORD,
    salt: SALT_ROUNDS,
    tokenSecret: TOKEN_SECRET
};
