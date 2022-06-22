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
var supertest_1 = __importDefault(require("supertest"));
var database_1 = __importDefault(require("../../database"));
var app_1 = __importDefault(require("../../app"));
var user_model_1 = __importDefault(require("../../models/user.model"));
var product_model_1 = __importDefault(require("../../models/product.model"));
var order_model_1 = __importDefault(require("../../models/order.model"));
var userModel = new user_model_1.default();
var productModel = new product_model_1.default();
var orderModel = new order_model_1.default();
var request = (0, supertest_1.default)(app_1.default);
var token = '';
describe('Order Product API Endpoints', function () {
    var user = {
        email: 'test@test.com',
        userName: 'testUser',
        firstName: 'Test',
        lastName: 'User',
        password: 'test123'
    };
    var product = {
        name: 'product name',
        description: 'product description',
        price: 9.99,
        category: 'Electronics.'
    };
    var order = {
        userId: 1,
        status: 'active'
    };
    var orderProduct = {
        quantity: 1,
        orderId: 1,
        productId: 1
    };
    beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: 
                // setup user/product to test with
                return [4 /*yield*/, userModel.create(user)];
                case 1:
                    // setup user/product to test with
                    _a.sent();
                    return [4 /*yield*/, productModel.create(product)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, orderModel.create(order)];
                case 3:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    afterAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        var connection, sql;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, database_1.default.connect()];
                case 1:
                    connection = _a.sent();
                    sql = 'DELETE FROM order_products;\nALTER SEQUENCE order_products_id_seq RESTART WITH 1;\nDELETE FROM orders;\nALTER SEQUENCE orders_id_seq RESTART WITH 1;\nDELETE FROM products;\nALTER SEQUENCE products_id_seq RESTART WITH 1;\nDELETE FROM users;\nALTER SEQUENCE users_id_seq RESTART WITH 1';
                    return [4 /*yield*/, connection.query(sql)];
                case 2:
                    _a.sent();
                    connection.release();
                    return [2 /*return*/];
            }
        });
    }); });
    describe('Test Authenticate method', function () {
        it('should be able to authenticate to get token', function () { return __awaiter(void 0, void 0, void 0, function () {
            var res, _a, id, email, userToken;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, request
                            .post('/api/users/authenticate')
                            .set('Content-type', 'application/json')
                            .send({
                            userName: 'testUser',
                            password: 'test123'
                        })];
                    case 1:
                        res = _b.sent();
                        expect(res.status).toBe(200);
                        _a = res.body.data, id = _a.id, email = _a.email, userToken = _a.token;
                        expect(id).toBe(1);
                        expect(email).toBe('test@test.com');
                        token = userToken;
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('Test CRUD API methods', function () {
        it('should create new order product', function () { return __awaiter(void 0, void 0, void 0, function () {
            var res, _a, id, quantity, orderId, productId;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, request
                            .post('/api/order-products/1')
                            .set('Content-type', 'application/json')
                            .set('Authorization', "Bearer ".concat(token))
                            .send(orderProduct)];
                    case 1:
                        res = _b.sent();
                        expect(res.status).toBe(200);
                        _a = res.body.data, id = _a.id, quantity = _a.quantity, orderId = _a.orderId, productId = _a.productId;
                        expect(id).toBe(1);
                        expect(quantity).toBe(1);
                        expect(orderId).toBe(1);
                        expect(productId).toBe(1);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should get list of order products', function () { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, request
                            .get('/api/order-products/1/products')
                            .set('Content-type', 'application/json')
                            .set('Authorization', "Bearer ".concat(token))];
                    case 1:
                        res = _a.sent();
                        expect(res.status).toBe(200);
                        expect(res.body.data.orderProducts.length).toBe(1);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should get order product info', function () { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, request
                            .get('/api/order-products/1/products/1')
                            .set('Content-type', 'application/json')
                            .set('Authorization', "Bearer ".concat(token))];
                    case 1:
                        res = _a.sent();
                        expect(res.status).toBe(200);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should update order product info', function () { return __awaiter(void 0, void 0, void 0, function () {
            var res, _a, id, productId, orderId, quantity;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, request
                            .get('/api/order-products/1/products/1')
                            .set('Content-type', 'application/json')
                            .set('Authorization', "Bearer ".concat(token))
                            .send({
                            id: 1,
                            productId: 1,
                            orderId: 1,
                            quantity: 2
                        })];
                    case 1:
                        res = _b.sent();
                        _a = res.body.data.orderProduct, id = _a.id, productId = _a.productId, orderId = _a.orderId, quantity = _a.quantity;
                        expect(res.status).toBe(200);
                        expect(id).toBe(1);
                        expect(productId).toBe(1);
                        expect(orderId).toBe(1);
                        expect(quantity).toBe(1);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should delete order', function () { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, request
                            .delete('/api/order-products/1/products/1')
                            .set('Content-type', 'application/json')
                            .set('Authorization', "Bearer ".concat(token))
                            .send({
                            productId: 1,
                            orderId: 1
                        })];
                    case 1:
                        res = _a.sent();
                        expect(res.status).toBe(200);
                        expect(res.body.data.orderProduct.id).toBe(1);
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
