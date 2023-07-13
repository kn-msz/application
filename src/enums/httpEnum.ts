// 请求结果集
export enum ResultEnum {
    DATA_SUCCESS = 0,
    SUCCESS = 0,
    SERVER_ERROR = 500,
    SERVER_FORBIDDEN = 403,
    NOT_FOUND = 404,
    TOKEN_OVERDUE = 501,
    TIMEOUT = 60000,
}

// 头部
export enum RequestHttpHeaderEnum {
    TOKEN = 'Token',
    COOKIE = 'Cookie'
}

// 请求方法
export enum RequestHttpEnum {
    GET = 'get',
    POST = 'post',
    PATCH = 'patch',
    PUT = 'put',
    DELETE = 'delete'
}
