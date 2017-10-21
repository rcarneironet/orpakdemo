'use strict';

let gulp = require('gulp');
var webpack = require("webpack");
var browserSync = require('browser-sync');
var watch = require('gulp-watch');


gulp.task("webpack", (callback) => {
    webpack(require('./webpack.config.js'), function (err, stats) {
        if (err)
            throw new gutil.PluginError("webpack", err);
        callback();
    });
});

gulp.task('browser-sync', ['webpack'], () => {
    let options = {
        port: 8089,
        host: 'localhost',
        server: {
            baseDir: './'
        },
        ui: {
            port: 8080
        }
    }
    browserSync(['app/**/*.html', 'css/*.css', 'assets/**/*.*', 'js/**/*.*'], options);
})

gulp.task('webpack:watch', () => {
    gulp.watch(['./app/**/*.js', './assets/**/*.*'], ['webpack']);
});

gulp.task('default', ['sass-all', 'webpack']);