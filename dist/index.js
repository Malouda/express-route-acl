"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getPermissionString(route) {
    return String(String(route)).replace(/\//g, "_fslash_")
        .replace(/:/g, "@")
        .toUpperCase();
}
exports.getPermissionString = getPermissionString;
function isAllowed(request, response, next, callBack) {
    var permission = getPermissionString(request.originalUrl);
    if (callBack(permission)) {
        next();
    }
    else {
        response.status(405).send("Not Allowed");
    }
}
exports.isAllowed = isAllowed;
function getMethod(method) {
    return method.get ? "GET" : method.post ? "POST" : method.put ? "PUT" : method.delete ? "DELETE" : method.patch ? "PATCH" : "";
}
function register(routes, callBack) {
    for (var i = 0; i < routes.length; i++) {
        routes[i].stack.map(function (data) {
            var _a, _b;
            if (data.route != undefined) {
                var method = (_a = data.route) === null || _a === void 0 ? void 0 : _a.methods;
                var permission = getPermissionString(data.route.path) + "_" + getMethod(method);
                callBack({
                    route: String((_b = data.route) === null || _b === void 0 ? void 0 : _b.path),
                    method: getMethod(method),
                    permission: permission,
                });
            }
        });
    }
}
exports.register = register;
//# sourceMappingURL=index.js.map