"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var authentication_middleware_1 = __importDefault(require("../middleware/authentication.middleware"));
var users_1 = __importDefault(require("./api/users"));
var products_1 = __importDefault(require("./api/products"));
var orders_1 = __importDefault(require("./api/orders"));
var order_products_1 = __importDefault(require("./api/order-products"));
var routes = express_1["default"].Router();
routes.use('/users', users_1["default"]);
routes.use('/products', authentication_middleware_1["default"], products_1["default"]);
routes.use('/orders', authentication_middleware_1["default"], orders_1["default"]);
routes.use('/order-products', authentication_middleware_1["default"], order_products_1["default"]);
exports["default"] = routes;
