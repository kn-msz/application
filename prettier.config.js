module.exports = {
    // 指定自动换行的行长
    printWidth: 120,
    // tab缩进大小
    tabWidth: 4,
    // 使用tab缩进，默认false
    useTabs: false,
    // 使用单引号, 默认false(在jsx中配置无效, 默认都是双引号)
    singleQuote: true,
    // 使用分号, 默认true
    semi: false,
    // 属性值es5表示在对象或数组最后一个元素后面是否加逗号（在ES5中加尾逗号）
    trailingComma: "none",
    // 对象中的空格 默认true
    // true: { foo: bar }
    // false: {foo: bar}
    bracketSpacing: true,
    // 在jsx中使用单引号代替双引号
    jsxSingleQuote: true,
    // JSX标签闭合位置 默认false
    // false: <div
    //          className=""
    //          style={{}}
    //       >
    // true: <div
    //          className=""
    //          style={{}} >
    jsxBracketSameLine: false,
    //  (x) => {} 箭头函数参数只有一个时是否要有小括号。avoid：省略括号
    arrowParens: "avoid"
}
