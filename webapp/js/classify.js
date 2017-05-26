require(['config'],function(){
	require(['jquery','baseUrl'],function(){
		$('.foot').load('../html/footer.html');
	//动态加载数据
		$.post(erp.baseUrl +'classify',{},function(response){
				var arr = response;
				var classify1=[];
				var classify2=[];
				var classify3=[];
				var classify4=[];
				// var str = JSON.stringify(arr)
				// console.log(arr);
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


				// collection:'ifo'
				// 名字写入
				// $('.identity .name').text(response[0].nickname)
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
				
//           // dataType: 'json',  
//           success: function (data) {  
//               //字符串拼接  
//              // console.log(pro);
//              // var ifo = eval('('+pro+')');
//              console.log(data);

//               // var htmlNodes = '';  
//               // for(var i = 0; i < {pro}.length; i ++){  
//               //     htmlNodes += '<figcaption><strong>' + {pro}[i].title + '</strong><p>' + {pro}[i].description + '</p></figcaption></figure>';  
//               // }  

//               // $('.classify1').append(htmlNodes);  
//           }  
//           error: function(){
//           	alert("error");
//           }
//  		});  

		// $("input[name='focusIn']").focus();
		// $.post('/classify',{collection:'ifo'},function(response){
		// 	var arr = response;
		// 	var str = JSON.stringify(arr)
		// 	for(i=0;i<arr.length;i++){
		// 		$('.datalist').append('<tr><td><input type="checkbox"></td><td><input type="text" class="content1" value="'+arr[i].id+'"></td><td><input type="text" class="content2" value="'+arr[i].imgurl+'"></td><td><input type="text" class="content3" value="'+arr[i].name+'"></td><td><input type="text" class="content4" value="'+arr[i].produce+'"></td><td><input type="text" class="content5" value="'+arr[i].price+'"></td><td><input type="text" class="content6" value="'+arr[i].specification+'"></td><td><button class="btn_add">添加</button></td><td><button class="btn_del">删除</button></td></tr>');
		// 	}
		// })
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

