require(['config'],function(){
	require(['jquery','global'],function(){
	$('.foot').load(erp.htmlUrl+'footer.html');

	$.ajax({
		url: erp.baseUrl + 'getBaseInfo',
		type: 'post',
		dataType: 'json',
		success: function(response){
		    //得到数据库中所有商品的专区，并将专区的数据放在左侧tab栏显示出来
			var classfyArr = response[0].classify;
			console.log(classfyArr);
			var htmlNode1 = '';
			for(var i = 0; i < classfyArr.length; i ++){ 
	            htmlNode1 += '<li class="title">'+classfyArr[i]+'</li>'
			}
			$('.classfyul').append(htmlNode1);
			$('.title').first().addClass('active');
			//刷新页面默认显示热门专区的商品信息↓
			$.ajax({
					url: erp.baseUrl + 'getProductsByArr',
					type: 'post',
					data: {"classify":"热门专区"},
					dataType: 'json',
					// async:false,
					success:function(response){
						// console.log(response)
						var classify1=response;
						var pro_area='<div class="proarea"><p><a class="morepro">全部&nbsp;&gt;&gt;</a></p>';
						// </div>
						var htmlNode1 = '';
						for(var k = 0; k < classify1.length; k ++){
				       		htmlNode1 += '<div class="everypro"><a href="detail.html?_id='+classify1[k]._id+'"><img src="../../upload/'+classify1[k].preview+'" alt=""></a><p class="productname">' + classify1[k].title + '</p><p class="productprice"><span>售价：</span>￥' + classify1[k].price + '&nbsp;</p></div>';  
				        }
				        pro_area=pro_area+htmlNode1+'</div>';
				        $('.pro_show').append(pro_area); 
						$('.morepro').attr('href','classify_type.html?_type=热门专区');

					}
			})

			//点击左侧分类栏时，显示左侧标签切换效果，并将对应商品显示出来↓
			$('.title').click(function(){
				$(this).addClass('active').siblings().removeClass('active');
				$('.pro_show').children().remove();
				var idx = $(this).index();
				titlename=$(this).text();
				console.log(titlename)
				
				$.ajax({
					url: erp.baseUrl + 'getProductsByArr',
					type: 'post',
					data: {"classify":titlename},
					dataType: 'json',
					// async:false,
					success:function(response){
						console.log(response)
						var classify1=response;
						var pro_area='<div class="proarea"><p><a class="morepro">全部&nbsp;&gt;&gt;</a></p>';
						// </div>
						var htmlNode1 = '';
						for(var k = 0; k < classify1.length; k ++){
				       		htmlNode1 += '<div class="everypro"><a href="detail.html?_id='+classify1[k]._id+'"><img src="../../upload/'+classify1[k].preview+'" alt=""></a><p class="productname">' + classify1[k].title + '</p><p class="productprice"><span>售价：</span>￥' + classify1[k].price + '&nbsp;</p></div>';  
				        }
				        pro_area=pro_area+htmlNode1+'</div>';
				        $('.pro_show').append(pro_area); 
						$('.morepro').attr('href','classify_type.html?_type='+titlename+'');

					}
				})
			})


		}
	});



















				






	$('.back').click(function(){
		window.history.back(-1);
	})
	// $(".homepage").attr('href',erp.webappUrl + 'index.html');
	// $(".buycar").attr('href',erp.htmlUrl + 'shoppingCart.html');
	// $('.classify1').find('.morepro').click(function(){
	// 		window.location.href=erp.htmlUrl+"classify_hot.html";
	// })
	// $('.classify2').find('.morepro').click(function(){
	// 		window.location.href=erp.htmlUrl+"classify_condom.html";
	// })

	// $('.classify3').find('.morepro').click(function(){
	// 		window.location.href=erp.htmlUrl+"classify_male.html";
	// })

	// $('.classify4').find('.morepro').click(function(){
	// 		window.location.href=erp.htmlUrl+"classify_female.html";
	// })




	});
});

