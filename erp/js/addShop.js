require(['config'],function(){
	require(['jquery','global','app','amazeui.min','form','common'],function($){
		$(function(){
			//按钮:发布并继续发布
			$('.am-btn-secondary').click(function(){
				var newShop = {};
				newShop.title = $('#title').val();
				newShop.price = $('#price').val();
				newShop.ori_price = $('#ori_price').val();
				newShop.freight = $('#freight').val();
				newShop.sales = $('#sales').val();
				newShop.repertory = $('#repertory').val();
				var keyword = $('#keyword').val();
				var classify = $('#classify').val();
				keyword = keyword.split(/，|,|\s+/);
				classify = classify.split(/，|,|\s+/);
				console.log(keyword)
				newShop.keyword = keyword;
				newShop.classify = classify;
				newShop.description = $('#description').val();
				newShop = JSON.stringify(newShop);
				// sessionStorage.setItem('shop',newShop);

				//提交商品图片
				// $('.am-form').ajaxSubmit({
				// 	type : 'post',
				// 	url : erp.baseUrl + 'upload',
				// 	success : function(data){
				// 		console.log(data);
				// 	},
				// 	error : function(XmlHttpRequest,textStatus,errorThrown){
				// 		console.log(XmlHttpRequest);
    //                     console.log(textStatus);
    //                     console.log(errorThrown);
				// 	}
				// });
				
				// 提交商品信息
				// $.post(erp.baseUrl + 'upload',{'newShop':newShop},
				//  	function(response) {
				// 		console.log(response);
				// },'json');

				$('form').ajaxSubmit({
					type: 'post',
					data: {'newShop':newShop},
					dataType: 'json',
					url: erp.baseUrl + 'upload',
					success:function(data){
                        console.log(data);
                    },
                    error:function(XmlHttpRequest,textStatus,errorThrown){
                        console.log(XmlHttpRequest);
                        console.log(textStatus);
                        console.log(errorThrown);
                    }
				});	
			});

			console.log(erp);

			// //左栏鼠标滑动动态效果
			// $(".sideMenu").slide({
			// 	titCell:"h3", //鼠标触发对象
			// 	targetCell:"ul", //与titCell一一对应，第n个titCell控制第n个targetCell的显示隐藏
			// 	effect:"slideDown", //targetCell下拉效果
			// 	delayTime:300 , //效果时间
			// 	triggerTime:150, //鼠标延迟触发时间（默认150）
			// 	defaultPlay:true,//默认是否执行效果（默认true）
			// 	returnDefault:true //鼠标从.sideMen移走后返回默认状态（默认false）
			// });
		});
	});
});
