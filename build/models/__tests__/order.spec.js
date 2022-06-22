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
var database_1 = __importDefault(require("../../database"));
var order_model_1 = __importDefault(require("../order.model"));
var user_model_1 = __importDefault(require("../user.model"));
var product_model_1 = __importDefault(require("../product.model"));
var userModel = new user_model_1.default();
var productModel = new product_model_1.default();
var orderModel = new order_model_1.default();
describe('Order Model', function () {
    describe('Test methods exist', function () {
        it('should have an index method', function () {
            expect(orderModel.index).toBeDefined();
        });
        it('should have a show method', function () {
            expect(orderModel.show).toBeDefined();
        });
        it('should have a create method', function () {
            expect(orderModel.create).toBeDefined();
        });
        it('should have a delete method', function () {
            expect(orderModel.delete).toBeDefined();
        });
    });
    describe('Test Model logic', function () {
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
            price: 20,
            category: 'Electronics.'
        };
        var order = {
            userId: 1,
            status: 'active'
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
                        sql = 'DELETE FROM users;\n ALTER SEQUENCE users_id_seq RESTART WITH 1;\nDELETE FROM products;\n ALTER SEQUENCE products_id_seq RESTART WITH 1;\nDELETE FROM orders;\nALTER SEQUENCE orders_id_seq RESTART WITH 1;';
                        return [4 /*yield*/, connection.query(sql)];
                    case 2:
                        _a.sent();
                        connection.release();
                        return [2 /*return*/];
                }
            });
        }); });
        it('Create method should add an order', function () { return __awaiter(void 0, void 0, void 0, function () {
            var createdOrder;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, orderModel.create(order)];
                    case 1:
                        createdOrder = _a.sent();
                        expect(createdOrder.id).toEqual(1);
                        return [2 /*return*/];
                }
            });
        }); });
        it('Index method should return a list of orders', function () { return __awaiter(void 0, void 0, void 0, function () {
            var orders;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, orderModel.index()];
                    case 1:
                        orders = _a.sent();
                        expect(orders[0].id).toBe(1);
                        return [2 /*return*/];
                }
            });
        }); });
        it('Show method should return the correct order', function () { return __awaiter(void 0, void 0, void 0, function () {
            var returnedOrder;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, orderModel.show(1)];
                    case 1:
                        returnedOrder = _a.sent();
                        expect(returnedOrder.id).toEqual(1);
                        return [2 /*return*/];
                }
            });
        }); });
        it('Edit method should return an order with edited attributes', function () { return __awaiter(void 0, void 0, void 0, function () {
            var returnedOrder;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, orderModel.edit({
                            id: 1,
                            userId: 1,
                            status: 'completed'
                        })];
                    case 1:
                        returnedOrder = _a.sent();
                        expect(returnedOrder.status).toBe('completed');
                        return [2 /*return*/];
                }
            });
        }); });
        it('Delete method should remove the order', function () { return __awaiter(void 0, void 0, void 0, function () {
            var deletedOrder;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, orderModel.delete(1)];
                    case 1:
                        deletedOrder = _a.sent();
                        expect(deletedOrder.id).toBe(1);
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
