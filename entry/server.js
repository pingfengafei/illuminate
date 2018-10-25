const Koa = require('koa')
const router = require('../middleware/router')



const app = new Koa()

let routerConfig = []

setRouterConfig()
router.setRoutes(routerConfig)

app.use(router.routes())
  .use(router.allowedMethods())


module.exports = app

function setRouterConfig(){
  routerConfig.push(
    {
      method: 'get',
      path : '/',
      callback: (ctx)=>{ctx.body = 'hello world'}
    }
  )

  routerConfig.push(
    {
      method: 'get',
      path : '/react',
      callback: (ctx)=>{ctx.body = 'hello react'}
    }
  )
}