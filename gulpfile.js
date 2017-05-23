//引入gulp模块
var gulp = require('gulp');
var sass = require('gulp-sass');

//创建gulp任务 以编译sass文件
gulp.task('compileSass',function(){
	gulp.src('webapp/sass/*.scss')
	//通过pipe方法导入到插件中实现编译sass
	.pipe(sass({outputStyle:'extended'}).on('error',sass.logError))
	//把编译的文件输出
	.pipe(gulp.dest('webapp/css/'));
});

//监听文件 自动执行任务
gulp.task('listenerSass',function(){
	gulp.watch('webapp/sass/*.scss',['compileSass']);
});

//浏览器同步任务
var browserSync = require('browser-sync');
gulp.task('autoRefresh',function(){
	browserSync({
		//server:'src',
		//代理服务器
		proxy:'http://localhost/sex-products/',
		//port:8080,//自定义端口
		//监听文件修改，自动刷新浏览器
		files:['webapp/html/*.html','webapp/index.html','src/js/*.js']
	});

	//监听sass文件修改，执行编译sass文件任务
	gulp.watch('webapp/sass/*.scss',['compileSass']);
});

// 用于js文件的压缩
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
gulp.task('compressJS',function(){
	gulp.src('webapp/js/*.js')

	// 合并
	.pipe(concat('page.js'))

	// 输入合并后但未压缩的版本
	.pipe(gulp.dest('dist/js/'))

	// 压缩
	.pipe(uglify({
		mangle:false,
		compress:false
	}))

	// 重命名
	.pipe(rename({
		suffix:'.min'
	}))

	// 输出
	.pipe(gulp.dest('dist/js/'))
});