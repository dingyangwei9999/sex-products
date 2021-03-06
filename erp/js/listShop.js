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
			$.ajax({
				url: erp.baseUrl + 'getProducts',
				type: 'post',
				dataType: 'json',
				success:function(response){
					addProducts(response);
				}
			});

			//表格中产生的事件
			$('#tbody')
			//点击删除按钮事件
			.on('click','#btn_del',function(){
				var $tr = $(this).closest('tr');
				var _id = $tr.attr('data-_id');
				$('.popup').show();
				//根据点击的商品请求数据
				$.ajax({
					url: erp.baseUrl + 'getProductsById',
					type: 'post',
					data: {'_id':_id},
					dataType: 'json',
					success: function(response){
						console.log(response)
						var $target = $('.editShopTip');
						$target.attr("data-_id",response._id);
						$target.html(`
							<div class="img" style="background-image:url(${erp.uploadUrl + response.preview})"></div>
    <div class="priceSundry">
      <p class="_id">商品名ID：${response._id}</p>
      <p class="t_del"><button class="js_delShop am-btn-default am-btn-xs am-text-danger am-round" id="btn_del"><i class="am-icon-trash-o">点击删除该商品</i></button></p>
      <p class="title">商品名称：<input type="text" name="" value="${response.title}" id="resetSty" disabled=true><button class="am-btn am-btn-default am-btn-xs am-text-secondary am-round" data-am-modal="{target: '#my-popups'}" title="修改商品名称"><span class="am-icon-pencil-square-o">修改</span></button></p>
      <p class="price">价格：<input type="text" name="" class="numtype" value="${response.price}" id="resetSty" disabled=true><button class="am-btn am-btn-default am-btn-xs am-text-secondary am-round" data-am-modal="{target: '#my-popups'}" title="修改商品价格"><span class="am-icon-pencil-square-o">修改</span></button></p>
      <p class="ori_price">原&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;价：<input type="text" name="" class="numtype" value="${response.ori_price}" id="resetSty" disabled=true><button class="am-btn am-btn-default am-btn-xs am-text-secondary am-round" data-am-modal="{target: '#my-popups'}" title="修改商品原价"><span class="am-icon-pencil-square-o">修改</span></button></p>
      <p class="repertory">库存：<input type="text" name="" class="numtype" value="${response.repertory}" id="resetSty" disabled=true><button class="am-btn am-btn-default am-btn-xs am-text-secondary am-round" data-am-modal="{target: '#my-popups'}" title="修改商品库存"><span class="am-icon-pencil-square-o">修改</span></button></p>
      <p class="sales">销&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;量：<input type="text" name="" class="numtype" value="${response.sales}" id="resetSty" disabled=true><button class="am-btn am-btn-default am-btn-xs am-text-secondary am-round" data-am-modal="{target: '#my-popups'}" title="修改商品销量"><span class="am-icon-pencil-square-o">修改</span></button></p>
      <p class="freight">运费：<input type="text" name="" class="numtype" value="${response.freight}" id="resetSty" disabled=true><button class="am-btn am-btn-default am-btn-xs am-text-secondary am-round" data-am-modal="{target: '#my-popups'}" title="修改商品运费"><span class="am-icon-pencil-square-o">修改</span></button></p>
    </div>
    <div class="details">              
      <p class="classify">分&nbsp;&nbsp;&nbsp;&nbsp;类(多个用空格或逗号分隔)：<input type="text" name="" value="${response.classify}" id="resetSty" disabled=true><button class="am-btn am-btn-default am-btn-xs am-text-secondary am-round" data-am-modal="{target: '#my-popups'}" title="修改商品所属分类"><span class="am-icon-pencil-square-o">修改</span></button></p>
      <p class="keyword">关键字(多个用空格或逗号分隔)：<input type="text" name="" value="${response.keyword}" id="resetSty" disabled=true><button class="am-btn am-btn-default am-btn-xs am-text-secondary am-round" data-am-modal="{target: '#my-popups'}" title="修改商品搜索关键字"><span class="am-icon-pencil-square-o">修改</span></button></p>
       <p class="prefecture">专&nbsp;&nbsp;&nbsp;&nbsp;区(多个用空格或逗号分隔)：<input type="text" name="" value="${response.prefecture}" id="resetSty" disabled=true><button class="am-btn am-btn-default am-btn-xs am-text-secondary am-round" data-am-modal="{target: '#my-popups'}" title="修改商品所属专区"><span class="am-icon-pencil-square-o">修改</span></button></p>
    </div>
						`);
					}
				});
				//发送删除商品请求
				// $.ajax({
				// 	url: erp.baseUrl + 'delProducts',
				// 	type: 'post',
				// 	data: {"_id":_id},
				// 	dataType: 'json',
				// 	success:function(response){
				// 		console.log(response);
				// 		//数据库删除成功后移除DOM节点
				// 		if(response.status){
				// 			$tr.remove();
				// 		}
				// 	}
				// });
			})
			//input失去焦点修改数据库 （弃用）
			.on('blur','input',function(){
				// console.log(this)
				// $self = $(this);
				// var $val;
				// //将价格类转为number类型
				// if($self.hasClass('numtype')){
				// 	$val = Number($self.val());
				// }else{
				// 	$val = $self.val();
				// }
				// var $key = $self.closest('td').attr('class');
				// var $tr = $self.closest('tr');
				// var _id = $tr.attr('data-_id');
				// if($key === 'keyword' || $key === 'classify' || $key === 'prefecture'){
				// 	$val = $val.split(/，|,|\s+/);
				// }
				// console.log($key,$val,typeof $val);
				// $.ajax({
				// 	url: erp.baseUrl + 'updataProducts',
				// 	type: 'post',
				// 	data: {"_id":_id,"data":JSON.stringify({[$key]:$val})},
				// 	dataType: 'json',
				// 	success:function(response){
				// 		console.log(response);
				// 	}
				// });				
			});
			//通过数据查找商品(用于keyword,classify)
			// $.ajax({
			// 	url: erp.baseUrl + 'getProductsByArr',
			// 	type: 'post',
			// 	data: {"classify":'紫'},
			// 	dataType: 'json',
			// 	success:function(response){
			// 		console.log(response);
			// 	}
			// });
			
			//修改商品关闭弹窗事件
			$('.popup').on('click','.closeWindow',function(){
				$('.popup').hide();
				location.reload();
			});

			//商品弹窗修改信息事件
			$('.editShopTip')
			//修改商品信息后发送请求
			.on('click', '.am-btn', function() {
				var $self = $(this);
				var $ifont = $self.find('span');
				var $input = $self.prev();
				var flat = !$input.attr('disabled');
				$input.attr('disabled',flat);
				if(!flat){
					$ifont.text('确定');
					
				}else{
					$ifont.text('修改');
					var $val;
					//将价格类转为number类型
					if($input.hasClass('numtype')){
						$val = Number($input.val());
					}else{
						$val = $input.val();
					}
					var $key = $input.closest('p').attr('class');
					var _id = $self.closest('.editShopTip').attr('data-_id');
					if($key === 'keyword' || $key === 'classify' || $key === 'prefecture'){
						$val = $val.split(/，|,|\s+/);
					}
					console.log($key,$val,typeof $val);
					$.ajax({
						url: erp.baseUrl + 'updataProducts',
						type: 'post',
						data: {"_id":_id,"data":JSON.stringify({[$key]:$val})},
						dataType: 'json',
						success:function(response){
							console.log(response);
						}
					});	
				}
			})
			//删除商品请求
			.on('click','.js_delShop',function(){
				var _id = $(this).closest('.editShopTip').attr('data-_id');
				$.ajax({
					url: erp.baseUrl + 'delProducts',
					type: 'post',
					data: {"_id":_id},
					dataType: 'json',
					success:function(response){
						console.log(response);
						//数据库删除成功后关闭弹窗
						if(response.status){
							$('.popup').hide();
							location.reload();
						}
					}
				});

			});

			//搜索功能
			$('.js_search').on('click',function(){
				var keyword = $('input.js_keyword').val();
				//获取select选择的option
				var searchKey = $('#select').val();
				//设置ajax请求发送的路由,默认不搜商品id
				var router = 'getProductsByArr';
				//设置是否开启全局搜索,默认取消
				var fuzzy = false;

				if(searchKey === "_id"){
					router = 'getProductsById';
				}else if(searchKey === "searchAll"){
					fuzzy = true;
				}
				console.log(keyword,searchKey,router,fuzzy);
				$.ajax({
					url: erp.baseUrl + router,
					type: 'post',
					data: {[searchKey]:keyword,"fuzzy":fuzzy},
					dataType: 'json',
					success:function(response){
						console.log(response);
						//成功请求后先清空页面内容再插入元素
						$('#tbody').empty();
						addProducts(response);
					}
				});
			});

			//向表体插入数据
			function addProducts(data){
				//判断data是否为数组，如果搜索的是商品ID，data类型为对象，为对象时push进arr,不为对象，引用给arr,arr肯定是数组，进行遍历
				var arr = [];
				if(data instanceof Array){
					arr = data;
				}else{
					//查找商品ID时如果没找到则不push
					if(data._id){
						arr.push(data);
					}
				}
				$('#tbody').append(
					arr.map(function(elem, index) {
						return `
						<tr data-_id="${elem._id}">
                 <td id="t_preview" class="preview"><img src="../upload/${elem.preview}"></td>
                <td class="_id"><a title="${elem._id}">${elem._id}</a></td>
                <td class="title"><input type="text" name="" value="${elem.title}" id="resetSty"></td>
                <td class="price"><input type="text" name="" class="numtype" value="${elem.price}" id="resetSty"></td>
                <td class="ori_price"><input type="text" name="" class="numtype" value="${elem.ori_price}" id="resetSty"></td>
                <td class="repertory"><input type="text" name="" class="numtype" value="${elem.repertory}" id="resetSty"></td>
                <td class="sales"><input type="text" name="" class="numtype" value="${elem.sales}" id="resetSty"></td>
                <td class="freight"><input type="text" name="" class="numtype" value="${elem.freight}" id="resetSty"></td>
                <td class="classify"><input type="text" name="" value="${elem.classify}" id="resetSty"></td>
                <td class="t_del"><span class="am-btn am-btn-default am-btn-xs am-text-secondary am-round" id="btn_del"><i class="am-icon-pencil-square-o"></i></span></td>
              </tr>
						`;
					})
				);
			}
		});
	});
});