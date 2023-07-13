[TOC]

# 2.0 产品

## 介绍

vue3.0 + vite

## 技术栈

- [node.js]([nodejs.org](https://nodejs.org/))
- [vue](https://cn.vuejs.org/)
- [es6]([es6.ruanyifeng.com](http://es6.ruanyifeng.com/))
- [vite](https://cn.vitejs.dev/)
- [typescript](https://www.typescriptlang.org/)
- [sass](https://www.sass.hk/)
- [pinia](https://pinia.vuejs.org/)
- [vue-router](https://router.vuejs.org/zh/)
- [vue-i18n](https://kazupon.github.io/vue-i18n/)
- [axios](http://axios.p2hp.com/)
- [vxe-table](https://vxetable.cn/)
- [echarts](https://echarts.apache.org/)

```
"private": true,
"type": "module",
{
    "compilerOptions": {
        "target": "ESNext",
        "useDefineForClassFields": true,
        "module": "ESNext",
        "moduleResolution": "Node",
        "strict": true,
        "jsx": "preserve",
        "baseUrl": ".",
        "sourceMap": true,
        "resolveJsonModule": true,
        "isolatedModules": true,
        "esModuleInterop": true,
        "lib": ["es6","ESNext", "DOM"],
        "types": ["vite/client"],
        "paths": {
            "@/*": ["src/*"],
            "/#/*": ["types/*"]
        },
        "skipLibCheck": true,
        "noEmit": true,
        "noImplicitAny": true, //不允许使用any
        // "strictNullChecks": true, //不允许使用null
        "noImplicitThis": true, //不允许往this上面挂属性
    },
    "include": ["src/**/*.ts", "src/**/*.d.ts", "src/**/*.tsx", "src/**/*.vue","types/**/*"],
    "exclude": ["node_modules", "dist", "**/*.js"],
}
```

## git commit规范
* feat: 新功能（feature）
* fix: 修补bug
* docs: 文档（documentation）
* style: 格式（不影响代码运行的变动）
* refactor: 重构（即不是新增功能，也不是修改bug的代码变动）
* chore: 构建过程或辅助工具的变动
* revert: 撤销，版本回退
* perf: 性能优化
* test：测试
* improvement: 改进
* build: 打包
* ci: 持续集成
* update:更新
