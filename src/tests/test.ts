import request from "supertest";
import {register,isAllowed,getPermissionString} from "../";
import express,{Request,Response} from "express";

describe("tests register routes middleware",()=>{

    const app:express.Application=express();
    let allow=false;
    function check(permission:String) {return allow;}
    app.use((req,res,next)=>{isAllowed(req,res,next,check)});

    app.get('/user/',(request:Request,response:Response)=>{
        response.status(200).send({});
    });

    it('should get getPermissionString', function () {
        expect(getPermissionString("/user/:id/")).toBe("_FSLASH_USER_FSLASH_@ID_FSLASH_");
    });

    it('should register', function () {
        // console.log(app._router.stack.route)
        register([app._router],(data)=>{
            expect(data).toEqual({
                route: '/user/',
                method: 'GET',
                permission:'_FSLASH_USER_FSLASH__GET',
            })
        })


    });

    it('should not authorize', function (done) {
        request(app)
            .get('/user/')
            .expect(405,done)
    });

    it('should authorize', function (done) {
        allow=true;
        request(app)
            .get('/user/')
            .expect(200,done)
    });
})