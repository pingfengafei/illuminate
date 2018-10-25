const Router = require('koa-router')

Router.prototype.setRoutes = function(routes){
  routes.map(route=>{
    let {method = 'get', path =- '/', callback = ()=>{}} = route

    this[method](path, callback)
  })
}

let router = new Router()


module.exports = router


