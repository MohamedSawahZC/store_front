"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var app_1 = __importDefault(require("./app"));
var config_1 = __importDefault(require("./config"));
var PORT = config_1["default"].port || 3000;
var address = "0.0.0.0:".concat(PORT);
app_1["default"].listen(PORT, function () {
    console.log("starting app on  ".concat(address));
});
