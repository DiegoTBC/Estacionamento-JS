const {series, parallel} = require('gulp')
const gulp = require('gulp')

const {monitorarArquivos, servidor} = require('./gulpTasks/server')
const {appHtml, appCSS, appIMG, appJS} = require('./gulpTasks/app')

module.exports.default = series(
    parallel(
        series(appHtml, appCSS, appJS, appIMG)
    ),
    servidor,
    monitorarArquivos
)