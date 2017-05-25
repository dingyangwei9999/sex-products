require.config({
	paths : {
		"jquery" : "../../libs/jquery/jquery-3.1.1",
		"jqueryCookie" : "../../libs/jquery/jquery.cookie",
		"lazyload" : "../../libs/jquery/jquery.lazyload",
		"sideshow" : "../../libs/Swiper-3.4.2/dist/js/swiper.min",
		"swiper" : "../../libs/Swiper-3.4.2/dist/js/swiper.jquery.min",
		"baseUrl" : "../../libs/common/global"
	},
	shim : {
		"jqueryCookie" : ["jquery"],
		"lazyload" : ["jquery"],
		"sideshow" : ["jquery"],
		"swiper" : ["jquery"]
	}
});