export enum RouterEnums {
    MENUS = 'menus',
    PERMISSIONS = 'permissions',
    DICTS = 'dicts',
    ROUTER = 'router',
    ROUTERMERE = 'routeMeta',
    ROUTERLIST = 'routeList'

}

export interface RouterStoreType {
    [RouterEnums.MENUS]: object[]
    [RouterEnums.PERMISSIONS]: object[]
    [RouterEnums.DICTS]: object[]
    [RouterEnums.ROUTER]: object[]
    [RouterEnums.ROUTERMERE]: object
    [RouterEnums.ROUTERLIST]: object[]

}
