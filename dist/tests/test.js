"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var supertest_1 = __importDefault(require("supertest"));
var __1 = require("../");
var express_1 = __importDefault(require("express"));
describe("tests register routes middleware", function () {
    var app = express_1.default();
    var allow = false;
    function check(permission) { return allow; }
    app.use(function (req, res, next) { __1.isAllowed(req, res, next, check); });
    app.get('/user/', function (request, response) {
        response.status(200).send({});
    });
    it('should get getPermissionString', function () {
        expect(__1.getPermissionString("/user/:id/")).toBe("_FSLASH_USER_FSLASH_@ID_FSLASH_");
    });
    it('should register', function () {
        // console.log(app._router.stack.route)
        __1.register([app._router], function (data) {
            expect(data).toEqual({
                route: '/user/',
                method: 'GET',
                permission: '_FSLASH_USER_FSLASH__GET',
            });
        });
    });
    it('should not authorize', function (done) {
        supertest_1.default(app)
            .get('/user/')
            .expect(405, done);
    });
    it('should authorize', function (done) {
        allow = true;
        supertest_1.default(app)
            .get('/user/')
            .expect(200, done);
    });
});
//# sourceMappingURL=test.js.map