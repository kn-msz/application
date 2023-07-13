interface Window {
    $loading: any
    $message: any
    $dialog: any
    $notification: any
    // 语言
    $t: any
    $vue: any
    // 键盘按键记录
    $KeyboardActive?: { [T: string]: boolean }
    onKeySpacePressHold?: Function
    // 编辑 JSON 的存储对象
    opener: any
    // 全局变量
    SITE_CONFIG: any
}

interface IObject<T = any> {
    [key: string]: T;
}
interface IServerMenus {
    createDate: string;
    icon: string | boolean;
    id: string;
    name: string;
    parentName: string;
    permissions: string;
    pid: string;
    sort: number;
    type: number;
    url: string;
    openStyle: number;
    redirect?: object;
    children?: IServerMenus[];
}


interface IViewHooks extends IViewHooksOptions, IObject {



}


declare type Recordable<T = any> = Record<string, T>
