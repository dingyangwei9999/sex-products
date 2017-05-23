require.config({
	paths : {
		"jquery" : "../../libs/jquery-3.1.1",
		"jqueryCookie" : "../../libs/jquery.cookie",
		"lazyload" : "../../libs/jquery.lazyload"
	},
	shim : {
		"jqueryCookie" : ["jquery"],
		"lazyload" : ["jquery"]
	}
});