require(['config'],function(){
	require(['jquery','global'],function(){
		$('.foot').load('../html/footer.html');
		$('.back').click(function(){
		window.history.back(-1);
		})
		$('.zonghe').addClass('active');

		//拿到session的数据生成样式
		var session = window.sessionStorage.getItem('data')
		var arrs = JSON.parse(session)
		console.log(arrs)
		console.log($('.pro_area'))

		var res=`<li class="everypro">
					<a href="http://localhost:888/webapp/detail.html/?_id='+ ${arrs[0]._id} +'">
						<img src="../../upload/listImg/'+ ${arrs[0].listImg[0]} +'" alt="">
					</a>
					<p class="productname">' + ${arrs[0].title} + '</p>
					<p class="productprice">￥' + ${arrs[0].price} + '<span>已售：'+ ${arrs[0].sales} +'</span>
					</p>
				</li>`
		$('.byall').after(res)




		//标签切换
		// var htmlNodes = '';  

		// $.post(erp.baseUrl +'classify_hot',{a:1},function(response){
		// 		var arr = response;
		// 		var str = JSON.stringify(arr)
				
		// 		 // var htmlNodes = '';  
	 //              for(var i = 0; i < arr.length; i ++){  
	                  // htmlNodes += '<li class="everypro"><a href="http://localhost:888/webapp/detail.html/?_id='+arr[i]._id+'"><img src="../../upload/listImg/'+arr[i].listImg+'" alt=""></a><p class="productname">' + arr[i].title + '</p><p class="productprice">￥' + arr[i].price + '<span>已售：'+arr[i].sales+'</span></p></li>';  
	 //              }  

	 //              $('.byall').append(htmlNodes);
	 //              htmlNodes = '';  
		// });
		// //点击价格，则按价格从低到高显示商品
		// $('.jiage').click(function(){
		// 	$('.jiage').addClass('active');
		// 	$('.xiaoliang').removeClass('active');
		// 	$('.zonghe').removeClass('active');
		// 	$('.byprice').show();
		// 	$('.byall').hide();
		// 	$('.bysales').hide();
		// 	$('.pro_area').children().remove();


		// 	$.post(erp.baseUrl +'classify_hot',{a:2},function(response){
		// 		var arr = response;
		// 		var str = JSON.stringify(arr)
				
		// 		 // var htmlNodes = '';  
	 //              for(var i = 0; i < arr.length; i ++){  
	 //                  htmlNodes += '<li class="everypro"><a href="http://localhost:888/webapp/detail.html/?_id='+arr[i]._id+'"><img src="../../upload/listImg/'+arr[i].listImg+'" alt=""></a><p class="productname">' + arr[i].title + '</p><p class="productprice">￥' + arr[i].price + '<span>已售：'+arr[i].sales+'</span></p></li>';  
	 //              }  

	 //              $('.byprice').append(htmlNodes); 
	 //              // console.log(htmlNodes) 

	 //              htmlNodes = ''; 

		// 	});
		// })
		// //点击销量，则按销量从高到低显示商品

		// $('.xiaoliang').click(function(){
		// 	$('.jiage').removeClass('active');
		// 	$('.xiaoliang').addClass('active');
		// 	$('.zonghe').removeClass('active');
		// 	$('.bysales').show();
		// 	$('.byall').hide();
		// 	$('.byprice').hide();
		// 	$('.pro_area').children().remove();

		// 	$.post(erp.baseUrl +'classify_hot',{a:3},function(response){
		// 		var arr = response;
		// 		var str = JSON.stringify(arr)
				
		// 		 // var htmlNodes = '';  
	 //              for(var i = 0; i < arr.length; i ++){  
	 //                  htmlNodes += '<li class="everypro"><a href="http://localhost:888/webapp/detail.html/?_id='+arr[i]._id+'"><img src="../../upload/listImg/'+arr[i].listImg+'" alt=""></a><p class="productname">' + arr[i].title + '</p><p class="productprice">￥' + arr[i].price + '<span>已售：'+arr[i].sales+'</span></p></li>';  
	 //              }  

	 //              $('.bysales').append(htmlNodes); 
	 //              htmlNodes = '';  


		// 	});
		// })
		// //点击销量，则按综合不作排序显示商品
		// $('.zonghe').click(function(){
		// 	$('.jiage').removeClass('active');
		// 	$('.xiaoliang').removeClass('active');
		// 	$('.zonghe').addClass('active');
		// 	$('.byall').show();
		// 	$('.byprice').hide();
		// 	$('.bysales').hide();
		// 	$('.pro_area').children().remove();

		// 	$.post(erp.baseUrl +'classify_hot',{a:1},function(response){
		// 		var arr = response;
		// 		var str = JSON.stringify(arr)
				
		// 		 // var htmlNodes = '';  
	 //              for(var i = 0; i < arr.length; i ++){  
	 //                  htmlNodes += '<li class="everypro"><a href="http://localhost:888/webapp/detail.html/?_id='+arr[i]._id+'"><img src="../../upload/listImg/'+arr[i].listImg+'" alt=""></a><p class="productname">' + arr[i].title + '</p><p class="productprice">￥' + arr[i].price + '<span>已售：'+arr[i].sales+'</span></p></li>';  
	 //              }  
	 //              $('.byall').append(htmlNodes);
	 //              htmlNodes = '';  


		// 	});
		// })
	});
	
});

