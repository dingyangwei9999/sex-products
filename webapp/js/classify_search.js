require(['config'],function(){
	require(['jquery','global'],function(){
		$('.foot').load('../html/footer.html');
		$('.back').click(function(){
			window.history.back(-1);
		})
		$(".homepage").attr('href',erp.webappUrl + 'index.html');
		$(".buycar").attr('href',erp.htmlUrl + 'shoppingCart.html');
		$('.zonghe').addClass('active');


		var _keyword = location.search.substring(9);
		_keyword=decodeURI(_keyword);
		console.log(_keyword);

		var h3='<h3>抱歉，没有找到与您搜索输入相匹配的商品！</h3>'

		$.ajax({
			url: erp.baseUrl + 'getProductsAdvanced',
			type: 'post',
			data: {"keyword":_keyword},
			// ,"sort":JSON.stringify({price:1})
			dataType: 'json',
			success:function(response){
				var classify1=response;
				console.log(classify1)

				console.log(classify1.length)
				// var pro_area='<div class="proarea"><p><a class="morepro">全部&nbsp;&gt;&gt;</a></p>';
				// </div>
				var htmlNode1 = '';
				for(var i = 0; i < classify1.length; i ++){
		       		htmlNode1 += '<li class="everypro"><a href="detail.html?_id='+classify1[i]._id+'"><img src="../../upload/'+classify1[i].preview+'" alt=""></a><p class="productname">' + classify1[i].title + '</p><p class="productprice">￥' + classify1[i].price + '<span>已售：' + classify1[i].sales + '</span>&nbsp;</p></li>';  
		        }
		        $('.pro_area').append(htmlNode1);
		        if (classify1.length==0) {
		        	$('.pro_area').append(h3);
		        }
			}
		});
		$('.btn').click(function(){
			$('.btn').removeClass('active');
			$(this).addClass('active');
		})

		var flag1=0;
		$('.jiage').click(function(){
			flag1++;
			if (flag1%2===1) {
				$('.pro_area').children().remove();
				$.ajax({
					url: erp.baseUrl + 'getProductsAdvanced',
					type: 'post',
					data: {"keyword":_keyword,"sort":JSON.stringify({price:1})},
					// ,"sort":JSON.stringify({price:1})
					dataType: 'json',
					success:function(response){
						var classify1=response;
						console.log(classify1)
						// var pro_area='<div class="proarea"><p><a class="morepro">全部&nbsp;&gt;&gt;</a></p>';
						// </div>
						var htmlNode1 = '';
						for(var i = 0; i < classify1.length; i ++){
				       		htmlNode1 += '<li class="everypro"><a href="detail.html?_id='+classify1[i]._id+'"><img src="../../upload/'+classify1[i].preview+'" alt=""></a><p class="productname">' + classify1[i].title + '</p><p class="productprice">￥' + classify1[i].price + '<span>已售：' + classify1[i].sales + '</span>&nbsp;</p></li>';  
				        }
				        $('.pro_area').append(htmlNode1);
						}
				});
			}
			if (flag1%2===0){
				$('.pro_area').children().remove();
				$.ajax({
					url: erp.baseUrl + 'getProductsAdvanced',
					type: 'post',
					data: {"keyword":_keyword,"sort":JSON.stringify({price:-1})},
					// ,"sort":JSON.stringify({price:1})
					dataType: 'json',
					success:function(response){
						var classify1=response;
						console.log(classify1)
						// var pro_area='<div class="proarea"><p><a class="morepro">全部&nbsp;&gt;&gt;</a></p>';
						// </div>
						var htmlNode1 = '';
						for(var i = 0; i < classify1.length; i ++){
				       		htmlNode1 += '<li class="everypro"><a href="detail.html?_id='+classify1[i]._id+'"><img src="../../upload/'+classify1[i].preview+'" alt=""></a><p class="productname">' + classify1[i].title + '</p><p class="productprice">￥' + classify1[i].price + '<span>已售：' + classify1[i].sales + '</span>&nbsp;</p></li>';  
				        }
				        $('.pro_area').append(htmlNode1);
						}
				});
			}
		})
		var flag2=0;
		$('.xiaoliang').click(function(){
			flag2++;
			if (flag2%2===1) {
				$('.pro_area').children().remove();
				$.ajax({
					url: erp.baseUrl + 'getProductsAdvanced',
					type: 'post',
					data: {"keyword":_keyword,"sort":JSON.stringify({sales:1})},
					// ,"sort":JSON.stringify({price:1})
					dataType: 'json',
					success:function(response){
						var classify1=response;
						console.log(classify1)
						// var pro_area='<div class="proarea"><p><a class="morepro">全部&nbsp;&gt;&gt;</a></p>';
						// </div>
						var htmlNode1 = '';
						for(var i = 0; i < classify1.length; i ++){
				       		htmlNode1 += '<li class="everypro"><a href="detail.html?_id='+classify1[i]._id+'"><img src="../../upload/'+classify1[i].preview+'" alt=""></a><p class="productname">' + classify1[i].title + '</p><p class="productprice">￥' + classify1[i].price + '<span>已售：' + classify1[i].sales + '</span>&nbsp;</p></li>';  
				        }
				        $('.pro_area').append(htmlNode1);
						}
				});
			}
			if (flag2%2===0){
				$('.pro_area').children().remove();
				$.ajax({
					url: erp.baseUrl + 'getProductsAdvanced',
					type: 'post',
					data: {"keyword":_keyword,"sort":JSON.stringify({sales:-1})},
					// ,"sort":JSON.stringify({price:1})
					dataType: 'json',
					success:function(response){
						var classify1=response;
						console.log(classify1)
						// var pro_area='<div class="proarea"><p><a class="morepro">全部&nbsp;&gt;&gt;</a></p>';
						// </div>
						var htmlNode1 = '';
						for(var i = 0; i < classify1.length; i ++){
				       		htmlNode1 += '<li class="everypro"><a href="detail.html?_id='+classify1[i]._id+'"><img src="../../upload/'+classify1[i].preview+'" alt=""></a><p class="productname">' + classify1[i].title + '</p><p class="productprice">￥' + classify1[i].price + '<span>已售：' + classify1[i].sales + '</span>&nbsp;</p></li>';  
				        }
				        $('.pro_area').append(htmlNode1);
						}
				});
			}
		})
		$('.zonghe').click(function(){
			$('.pro_area').children().remove();
			$.ajax({
			url: erp.baseUrl + 'getProductsAdvanced',
			type: 'post',
			data: {"keyword":_keyword},
			// ,"sort":JSON.stringify({price:1})
			dataType: 'json',
			success:function(response){
				var classify1=response;
				console.log(classify1)
				// var pro_area='<div class="proarea"><p><a class="morepro">全部&nbsp;&gt;&gt;</a></p>';
				// </div>
				var htmlNode1 = '';
				for(var i = 0; i < classify1.length; i ++){
		       		htmlNode1 += '<li class="everypro"><a href="detail.html?_id='+classify1[i]._id+'"><img src="../../upload/'+classify1[i].preview+'" alt=""></a><p class="productname">' + classify1[i].title + '</p><p class="productprice">￥' + classify1[i].price + '<span>已售：' + classify1[i].sales + '</span>&nbsp;</p></li>';  
		        }
		        $('.pro_area').append(htmlNode1);
			}
		});
		})




	});
	
});

