import { Router, Request, Response, NextFunction } from "express";
export declare function getPermissionString(route: String): string;
export declare function isAllowed(request: Request, response: Response, next: NextFunction, callBack: (permission: String) => boolean): void;
export declare function register(routes: Array<Router>, callBack: (arrayRoutes: Array<{}>) => void): void;
//# sourceMappingURL=index.d.ts.map