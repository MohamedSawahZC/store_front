"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var bcrypt_1 = __importDefault(require("bcrypt"));
var config_1 = __importDefault(require("../config"));
var hashPassword = function (password) {
    var salt = parseInt(config_1["default"].salt, 10);
    return bcrypt_1["default"].hashSync("".concat(password).concat(config_1["default"].pepper), salt);
};
exports["default"] = hashPassword;
