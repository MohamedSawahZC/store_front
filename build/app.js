"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var morgan_1 = __importDefault(require("morgan"));
var cors_1 = __importDefault(require("cors"));
var helmet_1 = __importDefault(require("helmet"));
var routes_1 = __importDefault(require("./routes"));
var error_middleware_1 = __importDefault(require("./middleware/error.middleware"));
var app = (0, express_1["default"])();
app.use(express_1["default"].json());
// HTTP request logger middleware
app.use((0, morgan_1["default"])('dev'));
app.use((0, cors_1["default"])());
// HTTP security middleware headers
app.use((0, helmet_1["default"])());
// add routing for /api path
app.use('/api', routes_1["default"]);
// error handler middleware
app.use(error_middleware_1["default"]);
exports["default"] = app;
