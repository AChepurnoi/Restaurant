let express = require('express');  
let request = require('request');

let app = express();  


let webpack = require('webpack')
let webpackDevMiddleware = require('webpack-dev-middleware')
let webpackHotMiddleware = require('webpack-hot-middleware')
let config = require('./webpack.config')
config.devtool = '#eval-source-map'

let compiler = webpack(config)
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }))
app.use(webpackHotMiddleware(compiler))

app.use(express.static('output'))

app.use('/', function(req, res) {  
  let url = "http://localhost:8080/" + req.url;
  req.pipe(request(url)).pipe(res);
});

app.get("/*", function(req, res) {
    res.sendFile(__dirname + '/output/index.html')
})

app.listen(process.env.PORT || 3000);  