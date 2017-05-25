require.config({
	paths : {
		"jquery" : "../../libs/jquery-3.1.1",
		"jqueryCookie" : "../../libs/jquery.cookie",
		"lazyload" : "../../libs/jquery.lazyload",
		"baseUrl" : "../../libs/common/global"
	},
	shim : {
		"jqueryCookie" : ["jquery"],
		"lazyload" : ["jquery"]
	}
});