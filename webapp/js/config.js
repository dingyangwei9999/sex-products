require.config({
	paths : {
		"jquery" : "../../libs/jquery/jquery-3.1.1",
		"jqueryCookie" : "../../libs/jquery/jquery.cookie",
		"lazyload" : "../../libs/jquery/jquery.lazyload",
		"baseUrl" : "../../libs/common/global"
	},
	shim : {
		"jqueryCookie" : ["jquery"],
		"lazyload" : ["jquery"]
	}
});