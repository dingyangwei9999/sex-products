require(['config'],function(){
	require(['jquery','global','app','amazeui.min','form','common'],function($){
		$(function(){
			console.log(erp.baseUrl);
			// //根据id查找商品
			// $.ajax({
			// 	url: erp.baseUrl + 'getProductsById',
			// 	type: 'post',
			// 	data: {'_id':'592653fa929b510c502acc42'},
			// 	dataType: 'json',
			// 	success:function(response){
			// 		console.log(response);
			// 	}
			// });
			// //查找所有商品
			// $.ajax({
			// 	url: erp.baseUrl + 'getProducts',
			// 	type: 'post',
			// 	dataType: 'json',
			// 	success:function(response){
			// 		console.log(response);
			// 	}
			// });
			//通过数据查找商品(用于keyword,classify)
			$.ajax({
				url: erp.baseUrl + 'getProductsByArr',
				type: 'post',
				data: {"classify":'8'},
				dataType: 'json',
				success:function(response){
					console.log(response);
				}
			});
		});
	});
});