export enum SystemStoreUserInfoEnum {
    ID = 'id',
    NAME = 'name',
    USER_NAME = 'username',
    REAL_NAME = 'realName',
    SUPER_ADMIN = 'superAdmin',
    DEPT_NAME = 'deptName',
    DEPT_NAMES = 'deptNames',
    ABBREVIATION = 'abbreviation',
    DEPT_ID = 'deptId',
    UNIT_ID = 'unitId',
    UNIT_NAME = 'unitName',
    IS_USER_SING = 'isUseSign',
    ACCONUNT_SUIT_ID = 'accountSuitId',
    ACCONUNT_SUIT_NAME = 'accountSuitName',
    SIGNATURE_PASSWORD = 'signaturePassword',
    EMAIL = 'email'
}

export enum FetchInfoEnum {
    ACCESS_TOKEN = 'accessToken'
}


export enum GlobalInfoEnum {
    ENCRYPT_ENABLE = 'encryptEnable',
    PROJECT_NAME = 'projectName'
}

export interface UserInfoType {
    [SystemStoreUserInfoEnum.ID]?: string,
    [SystemStoreUserInfoEnum.NAME]?: string,
    [SystemStoreUserInfoEnum.USER_NAME]?: string,
    [SystemStoreUserInfoEnum.REAL_NAME]?: string,
    [SystemStoreUserInfoEnum.SUPER_ADMIN]?: string,
    [SystemStoreUserInfoEnum.DEPT_NAME]?: string,
    [SystemStoreUserInfoEnum.DEPT_NAMES]?: string,
    [SystemStoreUserInfoEnum.ABBREVIATION]?: string,
    [SystemStoreUserInfoEnum.DEPT_ID]?: string,
    [SystemStoreUserInfoEnum.UNIT_ID]?: string,
    [SystemStoreUserInfoEnum.UNIT_NAME]?: string,
    [SystemStoreUserInfoEnum.IS_USER_SING]?: string,
    [SystemStoreUserInfoEnum.ACCONUNT_SUIT_ID]?: string,
    [SystemStoreUserInfoEnum.ACCONUNT_SUIT_NAME]?: string,
    [SystemStoreUserInfoEnum.SIGNATURE_PASSWORD]?: string,
    [SystemStoreUserInfoEnum.EMAIL]?: string,
}

export interface FetchInfoType {
    [FetchInfoEnum.ACCESS_TOKEN]?: string,
}



export interface GlobalInfoType {
    [GlobalInfoEnum.ENCRYPT_ENABLE]?: boolean,
    [GlobalInfoEnum.PROJECT_NAME]?: string,
}

export enum SystemStoreEnum {
    // 用户
    USER_INFO = 'userInfo',
    // 请求
    FETCH_INFO = 'fetchInfo',
    // nocos
    GLOBAL_INFO = 'globalInfo'
}

export interface SystemStoreType {
    [SystemStoreEnum.USER_INFO]: UserInfoType
    [SystemStoreEnum.FETCH_INFO]: FetchInfoType
    [SystemStoreEnum.GLOBAL_INFO]: globalInfoType
}
