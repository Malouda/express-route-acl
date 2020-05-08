import {Router, Request, Response, NextFunction} from "express";


export function getPermissionString(route:String){
    return String(String(route)).replace(/\//g,"_fslash_")
        .replace(/:/g,"@")
        .toUpperCase();
}

export function isAllowed(request:Request, response:Response, next:NextFunction,callBack:(permission:String)=>boolean){

    let permission=getPermissionString(request.originalUrl);

    if(callBack(permission)){
        next();
    }else {
        response.status(405).send("Not Allowed")
    }

}

function getMethod(method:{get:String,post:String,put:String,delete:String,patch:String}){
    return method.get ? "GET" : method.post ? "POST" : method.put ? "PUT" : method.delete ? "DELETE" : method.patch ? "PATCH" : ""
}


export function register(routes:Array<Router>,callBack:({route,method,permission})=>void ) {

    for (let i=0; i<routes.length; i++) {
        routes[i].stack.map((data) => {
            if (data.route != undefined) {
                let method = data.route?.methods;
                let permission=`${getPermissionString(data.route.path)}_${getMethod(method)}`;
                callBack({
                    route: String(data.route?.path),
                    method: getMethod(method),
                    permission,
                })
            }
        });
    }

}