2024-4-21 12:26:47 配置了.env文件, 注意在配置文件中定义自定义变量时, 一定要以 'VUE_APP_'开头, 否则Vue无法读取此变量

2024-4-21 15:36:28 有的时候你可能有一些不应该提交到代码仓库中的变量, 尤其是当你的项目托管在公共仓库时. 这种情况下你应该使用一个 .env.local 文件取而代之. 本地环境文件默认会被忽略, 且出现在 .gitignore 中. .local 也可以加在指定模式的环境文件上, 比如 .env.development.local 将会在 development 模式下被载入, 且被 git 忽略.

2024-5-10 15:26:19 实现了记账的种类选择与金额输入功能, 但是金额输入功能的双向绑定还没太搞明白.

2024-5-19 13:01:07 基本完成了记账功能

2024-5-22 20:02:42 实现了按钮选中后改变样式的功能, 判断当前选中的值, 并设置对应的`v-bind:class`

2024-5-24 20:41:14 尝试解决控制台报`WebSocket connection to 'ws://xxx.xxx.x.xxx:8080/ws' failed:`的问题, 参考[WebSocket connection to ‘ws://x.x.x.x:8080/ws‘ failed:报错_websocket connection to ws failed-CSDN博客](https://blog.csdn.net/weixin_62328829/article/details/126995531), 原本采用的是设置`webSocketURL`的方法, 但是感觉不太好, 而且会有ws和wss的问题, 见[http/https与websocket的ws/wss的关系](https://blog.csdn.net/Garrettzxd/article/details/81674251), 想了一下感觉用不到websocket, 所以最后采用`ws: false`的方法, 全面禁止websocket.

2024-5-25 15:53:51 解决了发出网络请求后异步获取返回值错误的问题, 错误代码:
```js
function myRequestPostWithHandler(path, params) {
    // 返回值为true/false
    let ret = false
    this.myRequestPost(path, params)
        .then((result) => {
            if (result.data === 'success') {
                ret = true
            }
        })
        .catch((error) => {
            console.log(error)
        })
    return ret
}
```
在主函数中, 我直接使用了此函数的返回值, 但是由于`myRequestPost`是异步函数, 所以`ret`的值并没有被正确赋值. 尝试各种解决方案, 如果直接在`this.myRequestPost`前面加上await, 但似乎还是不对, 我也不知道是什么原因, 最后采用了直接return整个promise, 在then和catch中返回true和false的方法, 代码如下:
```js
function myRequestPostWithHandler(path, params) {
    // 返回值为Promise true/false
    return this.myRequestPost(path, params)
        .then((result) => {
            if (result.data === 'success') {
                ret = true
            } else {
                ret = false
            }
        })
        .catch((error) => {
            console.log(error)
            return false
        })
}
```