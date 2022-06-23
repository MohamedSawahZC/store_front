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
/* eslint-disable class-methods-use-this */
/* eslint-disable camelcase */
var database_1 = __importDefault(require("../database"));
var OrderProductModel = /** @class */ (function () {
    function OrderProductModel() {
    }
    OrderProductModel.prototype.formatOrderProduct = function (oP) {
        return {
            id: oP.id,
            quantity: oP.quantity,
            orderId: +oP.order_id,
            productId: +oP.product_id,
            products: Array.isArray(oP.products) &&
                oP.products.length > 0 &&
                oP.products[0].name
                ? oP.products
                : [],
        };
    };
    OrderProductModel.prototype.create = function (oP) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, sql, result, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        connection = _a.sent();
                        sql = "INSERT INTO order_products (quantity, order_id, product_id) values ($1, $2, $3) RETURNING *";
                        return [4 /*yield*/, connection.query(sql, [
                                oP.quantity,
                                oP.orderId,
                                oP.productId,
                            ])];
                    case 2:
                        result = _a.sent();
                        connection.release();
                        return [2 /*return*/, this.formatOrderProduct(result.rows[0])];
                    case 3:
                        err_1 = _a.sent();
                        throw new Error("Could not create product: ".concat(oP.productId, " to order: ").concat(oP.orderId, ": ").concat(err_1));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    OrderProductModel.prototype.index = function (orderId) {
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
                        sql = "SELECT o.id AS id, op.order_id, op.product_id, JSON_AGG(JSONB_BUILD_OBJECT('productId', p.id, 'name', p.name, 'description', p.description,'category', p.category, 'price', p.price, 'quantity', op.quantity)) AS products FROM orders AS o LEFT JOIN order_products AS op ON o.id = op.order_id LEFT JOIN products AS p ON op.product_id = p.id WHERE o.id=$1 GROUP BY o.id, op.order_id, op.product_id";
                        return [4 /*yield*/, connection.query(sql, [orderId])];
                    case 2:
                        result = _a.sent();
                        connection.release();
                        return [2 /*return*/, result.rows.map(function (o) { return _this.formatOrderProduct(o); })];
                    case 3:
                        err_2 = _a.sent();
                        throw new Error("Error at retrieving products in order: ".concat(orderId, " ").concat(err_2));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    OrderProductModel.prototype.show = function (orderId, productId) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, sql, result, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        connection = _a.sent();
                        sql = 'SELECT op.order_id::INTEGER AS id, op.order_id::INTEGER AS "orderId", op.product_id::INTEGER AS "productId", op.quantity, p.name, p.description, p.category, p.price::INTEGER FROM order_products AS op JOIN products AS p ON p.id=op.product_id WHERE order_id=$1 AND product_id=$2';
                        return [4 /*yield*/, connection.query(sql, [orderId, productId])];
                    case 2:
                        result = _a.sent();
                        connection.release();
                        return [2 /*return*/, result.rows[0]];
                    case 3:
                        err_3 = _a.sent();
                        throw new Error("Error at retrieving product:".concat(productId, " in order: ").concat(orderId, " ").concat(err_3));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    OrderProductModel.prototype.edit = function (oP) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, sql, result, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        connection = _a.sent();
                        sql = "UPDATE order_products SET quantity=$1, order_id=$2,  product_id=$3 WHERE id=$4 RETURNING *";
                        return [4 /*yield*/, connection.query(sql, [
                                oP.quantity,
                                oP.orderId,
                                oP.productId,
                                oP.id,
                            ])];
                    case 2:
                        result = _a.sent();
                        connection.release();
                        return [2 /*return*/, this.formatOrderProduct(result.rows[0])];
                    case 3:
                        err_4 = _a.sent();
                        throw new Error("Could not update product: ".concat(oP.productId, " in order ").concat(oP.orderId, ". Error: ").concat(err_4));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    OrderProductModel.prototype.delete = function (orderId, productId) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, sql, result, err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        connection = _a.sent();
                        sql = "DELETE FROM order_products WHERE order_id=($1) and product_id=($2) RETURNING *";
                        return [4 /*yield*/, connection.query(sql, [orderId, productId])];
                    case 2:
                        result = _a.sent();
                        connection.release();
                        return [2 /*return*/, this.formatOrderProduct(result.rows[0])];
                    case 3:
                        err_5 = _a.sent();
                        throw new Error("Could not delete product: ".concat(productId, " in order ").concat(orderId, ". Error: ").concat(err_5));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return OrderProductModel;
}());
exports.default = OrderProductModel;
