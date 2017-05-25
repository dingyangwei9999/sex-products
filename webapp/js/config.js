require.config({
	paths : {
		"jquery" : "../../libs/jquery/jquery-3.1.1",
		"jqueryCookie" : "../../libs/jquery.cookie",
		"lazyload" : "../../libs/jquery.lazyload",
		"swiper" : "../../libs/Swiper-3.4.2/dist/js/swiper.jquery.min"
	},
	shim : {
		"jqueryCookie" : ["jquery"],
		"lazyload" : ["jquery"],
		"swiper" : ["jquery"]
	}
});