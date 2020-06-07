const path = require('path')
const webpack = require('webpack')
// const compressionPlugin = require('compression-webpack-plugin')
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

function resolve (dir) {
	return path.join(__dirname, dir)
}

module.exports = {
	publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
	outputDir: '../main/resources/META-INF/resources/hs_project',
	lintOnSave: false,//设置为error将会强制编译失败，设置为true则只在控制台输出eslint错误
	devServer: {
		open: true,
		hot: true,
		host: '0.0.0.0',
		port: 8080,
		proxy: {
			'/':{
				target: 'http://10.143.11.72:12345',
				changeOrigin: true,
				secure: false,
			}
		}
    },
    // css: {
    //     loaderOptions: {
    //       postcss: {
    //         // 这是rem适配的配置  注意： remUnit在这里要根据lib-flexible的规则来配制，如果您的设计稿是750px的，用75就刚刚好。
    //          plugins: [
    //           require("postcss-px2rem")({
    //             remUnit: 14
    //       })
    //     ]
    //   }
    // },
	configureWebpack: config => {
		
		// config.plugins.push(
		// 	new webpack.ProvidePlugin({
		// 		jQuery: 'jquery',
		// 		$: 'jquery'
		// 	})
		// ),
		// config.plugins.push(
		// 	new compressionPlugin({
        //         test: /\.js$|\.html$|\.css$|\.json/,//正则匹配
        //         // minRatio:0.8,//压缩率
        //         algorithm:'gzip',//算法
		// 		threshold:10240,//对10KB以上文件进行压缩
		// 		deleteOriginalAssets:false,//是否删除源文件
		// 	})
        // ),
        // 生产环境移除console.log方法，减少执行时间
        // config.plugins.push(
        //     new UglifyJsPlugin({
        //         uglifyOptions: {
        //             compress: {
        //                 drop_debugger: true,
        //                 dorp_console: true,
        //                 pure_funcs: ['console.log']
        //             },
        //             sourceMap: true,
        //             parallel: true
        //         }
        //     })
        // )
		config.resolve = {
			extensions: ['.js', '.vue', '.json', '.css', '.less'],
			alias: {
				'vue$': 'vue/dist/vue.esm.js',
				'@': resolve('src'),
				'assets': resolve('src/assets'),
				'components': resolve('src/components'),
				'router': resolve('src/router'),
				'public': resolve('public'),
				'store': resolve('src/store'),
				'pages': resolve('src/pages'),
				'util': resolve('src/util'),
			}
		}
	},
	chainWebpack: config => {
		config.entry = ["@babel-polyfill", resolve('src/main.js')]
	},
	transpileDependencies: [
		/\bvue-echarts\b/,
		/\bresize-detector\b/
	]
}