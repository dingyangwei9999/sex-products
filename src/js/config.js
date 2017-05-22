require.config({
	paths : {
		"jquery" : "../lib/jquery-3.1.1",
		"jqueryCookie" : "../lib/jquery.cookie",
		"lazyload" : "../lib/jquery.lazyload"
	},
	shim : {
		"jqueryCookie" : ["jquery"],
		"lazyload" : ["jquery"]
	}
});