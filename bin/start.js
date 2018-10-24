let app = require('../entry/server')


let start = options =>{  //作为应用，options不应该直接读取某个文件，最佳实践是传参
  let {port = 3000 } = options || {}

  app.listen(port, ()=>{console.log(`app listen on port : ${port}`)})
}



start()

module.exports = start