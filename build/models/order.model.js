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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable camelcase */
/* eslint-disable class-methods-use-this */
var database_1 = __importDefault(require("../database"));
var OrderModel = /** @class */ (function () {
    function OrderModel() {
    }
    OrderModel.prototype.formatOrder = function (order) {
        var _a;
        return {
            id: order.id,
            status: order.status,
            userId: +order.user_id,
            userName: order.user_name,
            products: Array.isArray(order.products) &&
                order.products.length > 0 &&
                ((_a = order.products[0]) === null || _a === void 0 ? void 0 : _a.quantity)
                ? order.products
                : [],
        };
    };
    OrderModel.prototype.create = function (o) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, sql, result, order, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        connection = _a.sent();
                        sql = "INSERT INTO orders (user_id, status) values ($1, $2) RETURNING *";
                        return [4 /*yield*/, connection.query(sql, [o.userId, o.status])];
                    case 2:
                        result = _a.sent();
                        order = result.rows[0];
                        connection.release();
                        return [2 /*return*/, {
                                id: order.id,
                                status: order.status,
                                userId: +order.user_id,
                            }];
                    case 3:
                        err_1 = _a.sent();
                        throw new Error("Could not create order ".concat(err_1));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    OrderModel.prototype.index = function () {
        return __awaiter(this, void 0, void 0, function () {
            var connection, sql, result, err_2;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        connection = _a.sent();
                        sql = "SELECT o.id AS id, u.user_name, o.user_id, JSON_AGG(JSONB_BUILD_OBJECT('productId', p.id, 'name', p.name, 'description', p.description,'category', p.category, 'price', p.price, 'quantity', op.quantity)) AS products, o.status AS status FROM orders AS o LEFT JOIN order_products AS op ON o.id = op.order_id LEFT JOIN products AS p ON op.product_id = p.id LEFT JOIN users AS u ON u.id = o.user_id GROUP BY o.id, u.user_name, o.status";
                        return [4 /*yield*/, connection.query(sql)];
                    case 2:
                        result = _a.sent();
                        connection.release();
                        return [2 /*return*/, result.rows.map(function (o) { return _this.formatOrder(o); })];
                    case 3:
                        err_2 = _a.sent();
                        throw new Error("Error at retrieving products ".concat(err_2));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    OrderModel.prototype.edit = function (o) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, sql, result, order, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        connection = _a.sent();
                        sql = "UPDATE orders SET user_id=$1, status=$2 WHERE id=$3 RETURNING *";
                        return [4 /*yield*/, connection.query(sql, [o.userId, o.status, o.id])];
                    case 2:
                        result = _a.sent();
                        order = result.rows[0];
                        connection.release();
                        return [2 /*return*/, {
                                id: order.id,
                                status: order.status,
                                userId: +order.user_id,
                            }];
                    case 3:
                        err_3 = _a.sent();
                        throw new Error("Could not update product ".concat(o.id, ". ").concat(err_3));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    OrderModel.prototype.delete = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, sql, result, order, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        connection = _a.sent();
                        sql = "DELETE FROM orders WHERE id=($1) RETURNING *";
                        return [4 /*yield*/, connection.query(sql, [id])];
                    case 2:
                        result = _a.sent();
                        order = result.rows[0];
                        connection.release();
                        return [2 /*return*/, {
                                id: order.id,
                                status: order.status,
                                userId: +order.user_id,
                            }];
                    case 3:
                        err_4 = _a.sent();
                        throw new Error("Could not delete order ".concat(id, ". ").concat(err_4));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    OrderModel.prototype.show = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, connection, result, err_5, error;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        sql = "SELECT o.id AS id, u.user_name, o.user_id, JSON_AGG(JSONB_BUILD_OBJECT('productId', p.id, 'name', p.name, 'description', p.description,'category', p.category, 'price', p.price, 'quantity', op.quantity)) AS products, o.status AS status FROM orders AS o LEFT JOIN order_products AS op ON o.id = op.order_id LEFT JOIN products AS p ON op.product_id = p.id LEFT JOIN users AS u ON u.id = o.user_id WHERE o.id = $1 GROUP BY o.id, u.user_name, o.status, o.user_id";
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        connection = _a.sent();
                        return [4 /*yield*/, connection.query(sql, [id])];
                    case 2:
                        result = _a.sent();
                        connection.release();
                        return [2 /*return*/, this.formatOrder(result.rows[0])];
                    case 3:
                        err_5 = _a.sent();
                        error = new Error("Could not find order with ".concat(id, ". Error: ").concat(err_5));
                        error.status = 404;
                        throw error;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    OrderModel.prototype.getOrderByUserId = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, connection, result, err_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        sql = "SELECT o.id AS id, u.user_name, o.user_id, JSON_AGG(JSONB_BUILD_OBJECT('productId', p.id, 'name', p.name, 'description', p.description,'category', p.category, 'price', p.price, 'quantity', op.quantity)) AS products, o.status AS status FROM orders AS o LEFT JOIN order_products AS op ON o.id = op.order_id LEFT JOIN products AS p ON op.product_id = p.id LEFT JOIN users AS u ON u.id = o.user_id WHERE o.user_id = $1 AND o.status = 'active' GROUP BY o.id, u.user_name, o.status, o.user_id";
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        connection = _a.sent();
                        return [4 /*yield*/, connection.query(sql, [userId])];
                    case 2:
                        result = _a.sent();
                        connection.release();
                        return [2 /*return*/, this.formatOrder(result.rows[0])];
                    case 3:
                        err_6 = _a.sent();
                        throw new Error("Could not find order for userId ".concat(userId, ". ").concat(err_6));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return OrderModel;
}());
exports.default = OrderModel;
