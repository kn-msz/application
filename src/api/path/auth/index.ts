// * 登录
import {http} from "@/api/http";
import { RequestHttpEnum } from "@/enums/httpEnum";
import { httpErrorHandle } from "@/utils";


import { getToken , getCaptcha , getLogout , getBackGround } from "@/api/path/auth/index.d";

// 登录
export const loginApi = async (data: object) => {
    try {
        const res = await http(RequestHttpEnum.POST)(getToken, data,
            {
            'content-type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic cmVucmVuaW86cmVucmVuaW8='
            }
        )
        return res
    } catch (err) {
        httpErrorHandle()
    }
}

// 获取验证码
export const captcha = async (data:string) => {
    try {
        const res = await http(RequestHttpEnum.GET)(getCaptcha + data)
        return res
    } catch (err) {
        httpErrorHandle()
    }
}

// 获取登录背景

// 获取验证码
export const backGroundImg = async () => {
    try {
        const res = await http(RequestHttpEnum.GET)(getBackGround)
        return res
    } catch (err) {
        httpErrorHandle()
    }
}



// 登出
export const logoutApi = async () => {
    try {
        const res = await http(RequestHttpEnum.POST)(getLogout)
        return res
    } catch (err) {
        httpErrorHandle()
    }
}
