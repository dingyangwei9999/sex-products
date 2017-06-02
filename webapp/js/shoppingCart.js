require(['config'],function(){
	require(['jquery','global'],function(){
		$('.shoppCart_menber').click(function(){
			location.href = erp.htmlUrl + "memberCenter.html"
		})
		$('.shoppCart_index').click(function(){
			location.href = erp.webappUrl + "index.html"
		})

		// 获取session
		var  ObjArr =[];
		var goods = window.sessionStorage.getItem('goods');
		goods = goods ? JSON.parse(goods) : [];
		console.log(goods);
			if (goods[0]) {
				$('.no_shop').hide();
			}else{
				$('.no_shop').show();
			}
		
		//写入数据到页面
		goods.forEach(function(item){
			var _id = item._id;
			$.ajax({
				url: erp.baseUrl + 'getProductsById',
				type: 'post',
				data: {'_id':_id},
				dataType: 'json',
				success:function(response){
					// console.log(response);
					$('main ul').append(
						`
					<li _id=${response._id}>
							<div class="pic_cart">
								<i class="checkon"></i>
							</div>		
							<div>
								<img src="${erp.baseUrl}upload/${response.preview}">
								<h2>${response.title}</h2>
								<div class="ctrl">
									<p class="price">${Number(response.price).toFixed(2)}</p>
									<p class="freight">${Number(response.ori_price).toFixed(2)}</p>
									<div class="num">
										<span class="sub">-</span>
										<input type="text" value="${item.count}" class="num_text">
										<span class="plus">+</span>
									</div>
								</div>
							</div>
						</li>
						`
					);	
					calcResult();
					// 把数据写入session传到我的订单
					var indentObj={
						qty:$itemCount,
						orderNum:20170601023943,
						ourderstatus:'待付款',
						img:response.preview,
						price:$('.total').text(),
						name: response.title
					};
					ObjArr.push(indentObj);	
					console.log(ObjArr)	
					sessionStorage.setItem('indent',JSON.stringify(ObjArr));
					

				}
			});
		});
		// 返回上一级按钮
		$('.icon-jinlingyingcaiicon01').click(function(){
			window.history.back(-1);
		})
		// 删除按钮
		$('.del').click(function(){
			$('.dialog').fadeIn(500);
		});
		// 删除按钮里面的取消
		$('.quxiao').click(function(){
			$('.dialog').hide();
		});
		// 删除按钮里面的确认
		$('.confim_ok').click(function(){
			$('.dialog').hide();
			var $unCheck = $('.pic_cart i.check').closest('li[_id]');
			$unCheck.remove();
			calcResult();
			writeSession();
			kong();
		});
		console.log($('li[_id]'))
		//商品列表中的所有事件
		$('ul').on('click','.pic_cart i',function(){
			var $self = $(this);
			//左边勾选
			if($self.hasClass("check")){  
		      	$self.removeClass().addClass('checkon');
	        }else{ 
		       	$self.removeClass().addClass('check');
	    	}
	    	calcResult();
		})
		//减
		.on('click','.sub',function(){
			$(this).next('input').val(function(){
				//避免商品个数为0
				--this.value<1 ? this.value=1 : this.value;
				//返回变更的value值
				return this.value;
			});
			calcResult();
			writeSession()
		})
		//加
		.on('click','.plus',function(){
			$(this).prev('input').val(function(){
				console.log(this.value)
				return ++this.value;
			});
			calcResult();
			writeSession();
		});
		//全选按钮
		$('.check_all').click(function() {
			var allCheckBtn = $('.pic_cart i');
			allCheckBtn.each(function(index,item){
				$(item).removeClass('check').addClass('checkon');
			});
			calcResult();
		});

		//计算各种结果
		var $liGather;
		var $itemCount;
		var totalShop;
		var totlaPrice
		function calcResult(){
			//获取被选中状态下的li
			$liGather = $('.pic_cart i.checkon').closest('li[_id]');

			//总价
			var totlaPrice = 0;
			//商品个数
			var totalShop = 0;
			//计算价格
			$liGather.each(function(index,item){
				var $self = $(item);
				var $itemPrice = Number($self.find('.price').text());
				var $itemCount = Number($self.find('.num_text').val());
				// console.log($itemCount)
				totlaPrice += ($itemPrice*$itemCount);
				totalShop += $itemCount;
				// console.log(totlaPrice)
			});
			$('span.total').text(totlaPrice.toFixed(2));
			$('.clearing span').text(totalShop);
			$('.top_car').text(totalShop);
			//判断商品是否全选
			var allCheck = $('.pic_cart i').length;
			var allCheckOn = $('.pic_cart i.checkon').length;
			if(allCheck === allCheckOn){
				$('.check_all i').removeClass('check').addClass('checkon');
			}else{
				$('.check_all i').removeClass('checkon').addClass('check');
			}
		}
		// 结算清空购物车
		$('.clearing span').click(function(){
			if($liGather){
				var $unCheck = $('.pic_cart i.checkon').closest('li[_id]').remove();
				$('.pic_cart i').removeClass('checkon');
				// $('.clearing span').text(totalShop);
				// $('.top_car').text(totalShop);
				alert("结算成功了，亲！")
				sessionStorage.setItem('indent',JSON.stringify(ObjArr));
				writeSession();
				calcResult()
			}
			kong();
		})
		// 购物车清空
		function kong(){
			if($('li[_id]').length===0){
				$('.no_shop').show();
			}else{
				$('.no_shop').hide();
			}
		}

		//重写sessionStorage
		function writeSession(){
			var goods = [];
			$li = $('li[_id]');
			console.log($li)
			$li.each(function(index,item){
				var shop = {};
				shop._id = $(item).attr('_id');
				shop.count = $(item).find('.num_text').val();
				goods.push(shop);
			});	
			sessionStorage.setItem('goods',JSON.stringify(goods));
		}


		console.log(window.sessionStorage.getItem('indent'));
	});
});