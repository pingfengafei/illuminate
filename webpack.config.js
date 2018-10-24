module.exports = {
  entry:{

  },

  output:{

  },

  module:{
    rules:[
      {
        test: /(.js$|.jsx$)+/,
        exculde: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
}