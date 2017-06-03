require(['config'],function(){
	require(['jquery','global'],function(){
		$(function(){
			$('footer').load('footer.html');
			// 点击左上角 <  返回历史列表中 上一个url
			$('.back').click(function(){
				history.back();
			});

			// tab标签切换
			var $tab = $('.tab');
			var $content = $('.main')
			var $title = $('section');

			// 显示某一张
			var tabIdx = window.location.search;
			tabIdx=tabIdx.substr(-1,1)

			$content.eq(tabIdx).show();
			// 高亮第一个tab
			$title.find('a').eq(tabIdx).addClass('active');

			// 绑定点击事件
			$title.on('click','a',function(){
				// 获取索引值
				var idx = $(this).parent().index();
				// tab高亮
				$title.find('a').removeClass('active')
				$(this).addClass('active');

				// 图片切换
				// $content.children().hide().eq(idx).show();
				// $content.children().hide().eq(idx).fadeIn(600);
				$content.hide().eq(idx).slideDown();
			});


			var all_arr={};
			// var daifukuan_arr = [{
			// 		orderNum:'订单号：SH201705241948110212',
			// 		orderStatus:'待付款',
			// 		img:'../imgs/1.jpg',
			// 		name:'博士男根',
			// 		price:'38.00',
			// 		qty:'1',
			// 	}];
			var daifukuan_arr = JSON.parse(sessionStorage.getItem('indent'));
			all_arr['daifukuan_arr']=daifukuan_arr;
			// console.log(all_arr)

			//如果调取的数据不为空，则隐藏 当前界面的nothing
			// var arr=[
			// 	{
			// 		orderNum:'订单号：SH201705241948110212',
			// 		orderStatus:'待付款',
			// 		img:'../imgs/1.jpg',
			// 		name:'博士男根',
			// 		price:'38.00',
			// 		qty:'1',
			// 	},
			// 	{
			// 		orderNum:'订单号：SH201705241948110213',
			// 		orderStatus:'待付款',
			// 		img:'../imgs/2.jpg',
			// 		name:'情趣内衣',
			// 		price:'181.00',
			// 		qty:'2',
			// 	},
			// 	{
			// 		orderNum:'订单号：SH201705241948110212',
			// 		orderStatus:'待付款',
			// 		img:'../imgs/1.jpg',
			// 		name:'博士男根',
			// 		price:'38.00',
			// 		qty:'1',
			// 	},
			// 	{
			// 		orderNum:'订单号：SH201705241948110213',
			// 		orderStatus:'待付款',
			// 		img:'../imgs/2.jpg',
			// 		name:'情趣内衣',
			// 		price:'181.00',
			// 		qty:'2',
			// 	}

			// ]
			// 是五个界面的调取数据之一

			if( all_arr['daifukuan_arr'].length){
				// console.log(2111)
				// $('.all .nothing').css({display:'none'});
				var res=all_arr['daifukuan_arr'].map(function(item){
					var totalPrice=item.qty*item.price;
					return `<div class="order_main">
						        <div class="title">${item.orderNum}<span>${item.orderStatus}</span></div>
						        <div class="goods">
						            <div>
						            	<img src="${item.img}">
						            </div>
						            <div>
						                <div class="inner">
						                       <div class="name">${item.name}</div>   
						                </div>
						            </div>
						            <div class="price">
						                <div class="pnum">
						                	<span>￥${item.price}</span>
						                </div>
						                <div class="pnum">
						                	<span>×${item.qty}</span>
						                </div>
						            </div>
						        </div>     
						        <div class="total">
						        	共 ${item.qty} 件商品&nbsp;实付：<span>￥${totalPrice}</span>
						        </div>
						        <div class="sub">
						            <div class="sub1">付款</div>
									<div class="sub2">
						                <span>取消订单</span>
						                <select>
						                    <option value="">不取消了</option>
						                    <option value="我不想买了">我不想买了</option>
						                    <option value="信息填写错误，重新拍">信息填写错误，重新拍</option>
						                    <option value="同城见面交易">同城见面交易</option>
						                    <option value="其他原因">其他原因</option>
						                </select>
						            </div>
						         	<div class="sub1">订单详情</div>
				        		</div>
							</div>`
				}).join('');
				$('.all').html(res);
				$('.daifukuan').html(res);
			} 
			
		})
	})
})