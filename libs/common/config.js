require.config({
	paths : {
		"jquery" : "../lib/jquery-3.1.1",
		"jqueryCookie" : "../lib/jquery.cookie",
		"jqueryUI" : "../lib/jquery-ui-1.12.1.custom/jquery-ui",
		"lazyload" : "../lib/jquery.lazyload"
	},
	shim : {
		"common" : ["jquery"],
		"jqueryUI" : ["jquery"],
		"jqueryCookie" : ["jquery"],
		"lazyload" : ["jquery"],
		"base" : ["jquery","jqueryCookie"]
	}
});