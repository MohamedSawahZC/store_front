"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var config_1 = __importDefault(require("../config"));
var handleUnauthorizedError = function (next) {
    var error = new Error('Login Error, Please login again');
    error.status = 401;
    next(error);
};
var validateTokenMiddleware = function (req, _res, next) {
    try {
        var authHeader = req.get('Authorization');
        if (authHeader) {
            var bearer = authHeader.split(' ')[0].toLowerCase();
            var token = authHeader.split(' ')[1];
            if (token && bearer === 'bearer') {
                var decoded = jsonwebtoken_1["default"].verify(token, config_1["default"].tokenSecret);
                if (decoded) {
                    next();
                }
                else {
                    handleUnauthorizedError(next);
                }
            }
            else {
                handleUnauthorizedError(next);
            }
        }
        else {
            handleUnauthorizedError(next);
        }
    }
    catch (err) {
        handleUnauthorizedError(next);
    }
};
exports["default"] = validateTokenMiddleware;
