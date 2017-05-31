require(['config'],function(){
	require(['jquery','baseUrl'],function(){
		$('.foot').load('../html/footer.html');
	//动态加载数据
		$.post(erp.baseUrl +'classify',{},function(response){
				var arr = response;
				console.log(arr)
				var classify1=[];
				var classify2=[];
				var classify3=[];
				var classify4=[];
				// var str = JSON.stringify(arr)
				console.log(arr);
				// console.log(arr[0].classify);
				for(var i = 0; i < arr.length; i ++){ 
					if($.inArray("热门专区", arr[i].classify)>-1){
						classify1.push(arr[i]);
					}
					if($.inArray("套套专区", arr[i].classify)>-1){
						classify2.push(arr[i]);
					}
					if($.inArray("男性专区", arr[i].classify)>-1){
						classify3.push(arr[i]);
					}
					if($.inArray("女性专区", arr[i].classify)>-1){
						classify4.push(arr[i]);
					}
				}
				// console.log(classify1);
				// console.log(classify2);
				// console.log(classify3);
				// console.log(classify4);
				 var htmlNode1 = '';  
				 var htmlNode2 = '';  
				 var htmlNode3 = '';  
				 var htmlNode4 = '';  
	              for(var i = 0; i < classify1.length; i ++){  
	                  htmlNode1 += '<div class="everypro"><a href="http://localhost:888/webapp/detail.html/?_id='+classify1[i]._id+'"><img src="../../upload/'+classify1[i].listImg+'" alt=""></a><p class="productname">' + classify1[i].title + '</p><p class="productprice"><span>售价：</span>￥' + classify1[i].price + '&nbsp;</p></div>';  
	              }  
	              for(var i = 0; i < classify2.length; i ++){  
	                  htmlNode2 += '<div class="everypro"><a href="http://localhost:888/webapp/detail.html/?_id='+classify2[i]._id+'"><img src="../../upload/'+classify2[i].listImg+'" alt=""></a><p class="productname">' + classify2[i].title + '</p><p class="productprice"><span>售价：</span>￥' + classify2[i].price + '&nbsp;</p></div>';  
	              }  
	              for(var i = 0; i < classify3.length; i ++){  
	                  htmlNode3 += '<div class="everypro"><a href="http://localhost:888/webapp/detail.html/?_id='+classify3[i]._id+'"><img src="../../upload/'+classify3[i].listImg+'" alt=""></a><p class="productname">' + classify3[i].title + '</p><p class="productprice"><span>售价：</span>￥' + classify3[i].price + '&nbsp;</p></div>';  
	              }  
	              for(var i = 0; i < classify4.length; i ++){  
	                  htmlNode4 += '<div class="everypro"><a href="http://localhost:888/webapp/detail.html/?_id='+classify4[i]._id+'"><img src="../../upload/'+classify4[i].listImg+'" alt=""></a><p class="productname">' + classify4[i].title + '</p><p class="productprice"><span>售价：</span>￥' + classify4[i].price + '&nbsp;</p></div>';  
	              }  

	              $('.classify1').append(htmlNode1); 
	              $('.classify2').append(htmlNode2); 
	              $('.classify3').append(htmlNode3); 
	              $('.classify4').append(htmlNode4); 

		});
				

	$('.back').click(function(){
		window.history.back(-1);
	})


	$('.title').first().addClass('active');
	//左侧tab标签切换
	$('.title').click(function(){
		$(this).addClass('active').siblings().removeClass('active');
		var idx = $(this).index();
		$('.pro_show').children().hide();
		$('.proarea').eq(idx).show();
	})

	});
});

