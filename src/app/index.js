// 引入koa
const koa = require('koa')
const app = new koa()
const path = require('path')
// 引入路由
const koaRouter = require('@koa/router')
// 引入静态部署
const serve = require('koa-static')
// 配置静态资源 路径得用path连接起来 不然没得访问
app.use(serve(path.resolve(__dirname, '../assets/commodity')))
// 解析parser数据
const bodyParser = require('koa-bodyparser')
// 设置app的错误中间件
app.on("error", (error, ctx) => {
    let code = 0
    let message = ''
    switch (error) {
        case "没有传递手机号给我":
            code = 201
            message = "没有传递手机号给我"
            break;
        case "手机号的格式不正确":
            code = 201
            message = "手机号的格式不正确"
            break;
        default:
            code = 999
            message = "这个是未知位置"
    }
    ctx.body = {
        code,
        msg: message
    }
})
// 引入路由
// const userRouter = require('../router/user.router')
const registerRouter = require('../router')
// 解析xxx-formData数据
app.use(bodyParser())
app.use(async (ctx, next) => {
    ctx.set("Access-COntrol-Allow-Origin", "*")
    await next()
})
registerRouter(app)
module.exports = app