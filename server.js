const express = require('express')
const path = require('path')
const webpackMiddleware = require('webpack-dev-middleware')
const config = require('./webpack.config.js')
const webpack = require('webpack')
const compiler = webpack(config)

const PORT = process.env.PORT || 8080

const app = express()
app.use(webpackMiddleware(compiler, {
  publicPath: '/dist/',
}))

app.get('/', (_, res) => {
  res.sendFile(path.resolve(__dirname, 'public/index.html'))
})

app.listen(PORT, () => {
	console.info(`Server started on port: ${PORT}`)
})