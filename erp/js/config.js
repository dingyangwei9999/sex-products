require.config({
	paths : {
		"jquery" : "../../libs/jquery/jquery.min",
		"jqueryCookie" : "../../lib/jquery.cookie",
		"lazyload" : "../../lib/jquery.lazyload",
		"form" : "../../libs/jquery/jquery.form",
		"global" : "../../libs/common/global"
	},
	shim : {
		"jqueryCookie" : ["jquery"],
		"lazyload" : ["jquery"],
		"app" : ['jquery','amazeui.min'],
		"amazeui.min" : ['jquery'],
		"form" : ["jquery"],
		"common" : ["jquery","app"]
	}
});


