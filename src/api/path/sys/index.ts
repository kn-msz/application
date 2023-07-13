// * 登录
import { http } from "@/api/http";
import { RequestHttpEnum } from "@/enums/httpEnum";
import { httpErrorHandle } from "@/utils";


import { getByUser, getUserInfo , getGlobalParamsConfig } from "@/api/path/sys/index.d";


// 获取个人信息
export const userInfo = async () => {
    try {
        const res = await http(RequestHttpEnum.GET)(getUserInfo)
        return res
    } catch (err) {
        httpErrorHandle()
    }
}

// 获取个人信息
export const globalParamsConfig = async () => {
    try {
        const res = await http(RequestHttpEnum.GET)(getGlobalParamsConfig)
        return res
    } catch (err) {
        httpErrorHandle()
    }
}


// 获取个人信息
export const byUser = async () => {
    try {
        const res = await http(RequestHttpEnum.GET)(getByUser)
        return res
    } catch (err) {
        httpErrorHandle()
    }
}
