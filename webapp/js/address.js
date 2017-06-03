require(['config'],function(){
	require(['jquery','global'],function(){
		$(function(){
			var quondamID;
			$.post(erp.baseUrl +  'getaddress',{'phone':sessionStorage.getItem('phone')},function(response){
				
				// 生成 存储的地址信息记录
				if( response[0] != null){
					console.log(response)
					var res=response.map(function(item,index){
						console.log(item)
						var cname = 'adressRecord'+index;
						
						return `<div class="adressRecord ${cname}">
								    <div class="moren clearfix"><p style="color:${item.default}" class="${item.classname}">${item.has}</p><i class="iconfont icon-shouhuodizhiguanli" style="color:${item.default}"></i></div>
								    <div>
								        <div class="inner">
								           <div>${item.address}</div>
								           <div><span>${item.name}</span><span>${item.phoneNum}</span></div>
								        </div>
								    </div>
								    <div class="btn">
								        <div class="remove"><i class="iconfont icon-cha"></i></div>
								        <div class="edit"><i class="iconfont icon-shezhi"></i></div>
								    </div>
								</div>`

					}).join('');
					$('.page_top').after(res);
				} 

				// 点击收货地址右边的X  实现DOM节点移除，同时，删除相应的数据库信息
				$('.remove').click(function(){
					// 删除对应dom节点
					$(this).parents('.adressRecord').remove();
					// 获取删除的节点对应在response中的下标
					var idx=$(this).parents('.adressRecord')[0].className.substr(-1,1)
					var shamResponse=response.splice(idx,1)
					// 把对应的数据在数据库中删除
					$.post(erp.baseUrl + 'deladdress',shamResponse[0])		
				})

				// 点击收货地址右边的'设置'图标  
				$('.edit').click(function(){
						alter();
						// console.log(response)
						
						var idx=$(this).parents('.adressRecord')[0].className.substr(-1,1)
						quondamID=response[idx]._id;
						$('#addressAlter').val(response[idx]['address']),
						$('#nameAlter').val(response[idx]['name']),
						$('#mobileAlter').val(response[idx]['phoneNum']),
						// $('#shiAlter option:selected').text(response[idx]['shi']),
						// $('#quAlter option:selected').text(response[idx]['qu']),
						$('#shi').val(response[idx]['shi']),
						$('#qu').val(response[idx]['qu']),
						$('#sel-provanceAlter option:selected').text(response[idx]['city'])

						
				})


				// 点击图标变换默认地址
				// console.log($('.moren'))
				$('.moren').on('touchstart',function(){
					console.log(1)
					var idx=$(this).parents('.adressRecord')[0].className.substr(-1,1)
					quondam2ID=response[idx]._id;

					var other_id=[];
					response.forEach(function(item){
						if(item._id==quondam2ID){
							return false;
						}
						other_id.push(item._id)
					})

					$('.adressRecord').find('i').css({color:'#ccc'})
					$(this).children('i').css({color:'#72CB62'})
					$('.adressRecord').find('p').text('设为默认').css({color:'#ccc'})
					$(this).children('p').text('默认').css({color:'#72CB62'})
					$('.adressRecord').find('p').toggleClass().addClass('has')
					$(this).children('p').toggleClass().addClass('has2')


					$.post(erp.baseUrl+'Alteraddress',{
							"_id":quondam2ID,
							"data":JSON.stringify({
							default:'#72CB62',
							has:'默认',
							classname:'has2'
						})
					},function(response){
						// console.log(response)
						// location.reload();
					})

					other_id.forEach(function(id){
						$.post(erp.baseUrl+'Alteraddress',{
								"_id":id,
								"data":JSON.stringify({
								default:'#ccc',
								has:'设为默认',
								classname:'has'
							})
						},function(response){
							// console.log(response)
							// location.reload();
						})
					})	
				})



			});

			// 点击左上角 <  返回历史列表中 上一个url
			$('.back').click(function(){
				// history.back();
				if(this.className=='back back2'){
					history.back();
				}else{
					backAddress();
				}

			});

			

			// 点击 新增收货地址
			$('.new_address').click(function(){
				addAddress();
				
			})

			//确认按钮生成一个div以及所有信息
			$('.address_btn1').click(function(){
				// 收集信息，存到数据库
				if($('#mobile').val()!=''){
					$.post(erp.baseUrl+'address',{
						phone:sessionStorage.getItem('phone'),
						address:$('#address').val(),
						name:$('#name').val(),
						phoneNum:$('#mobile').val(),
						// shi:$('#shi option:selected').text(),
						// qu:$('#qu option:selected').text(),
						shi:$('#shi').val(),
						qu:$('#qu').val(),
						city:$('#sel-provance option:selected').text(),
						default:'#ccc',
						has:'设为默认',
						classname:'has'

					},function(response){
						// alert(response.message);
						location.reload();
					})
				}

				if($('#mobileAlter').val()!=''){

					$.post(erp.baseUrl+'Alteraddress',{
							"_id":quondamID,"data":JSON.stringify({
							address:$('#addressAlter').val(),
							name:$('#nameAlter').val(),
							phoneNum:$('#mobileAlter').val(),
							// shi:$('#shiAlter option:selected').text(),
							// qu:$('#quAlter option:selected').text(),
							shi:$('#shi').val(),
							qu:$('#qu').val(),
							city:$('#sel-provanceAlter option:selected').text()
						})
					},function(response){
						alert(response.message)
						// console.log(response)
					})
					
				}

				backAddress();
				location.reload();
			})

			//取消按钮
			$('.address_btn2').click(function(){
				backAddress();
				$('#address').val(''),
				$('#name').val(''),
				$('#mobile').val(''),
				// $('#shi option:selected').text(''),
				// $('#qu option:selected').text(''),
				$('#shi').val(''),
				$('#qu').val(''),
				$('#sel-provance option:selected').text('北京市')
			});

			// 收货地址管理界面变换的函数方法
			function backAddress(){
				$('.new_address').show();
				$('.adressRecord').show();
				$('.address_main').hide();
				$('.address_mainAlter').hide();
				$('.address_btn1').hide();
				$('.address_btn2').hide();
				$('.title').text('收货地址管理')
				// 添加 左上角的 back2类名
				$('.page_top a').addClass('back2');
			}

			function addAddress(){
				$('.new_address').hide();
				$('.adressRecord').hide();
				$('.address_main').show();
				$('.address_mainAlter').hide();
				$('.address_btn1').show();
				$('.address_btn2').show();
				$('.title').text('添加收货地址');
				// 取消掉左上角的 back2类名
				$('.page_top a').removeClass('back2');
			}

			function alter(){
				$('.new_address').hide();
				$('.adressRecord').hide();
				$('.address_main').hide();
				$('.address_mainAlter').show();
				$('.address_btn1').show();
				$('.address_btn2').show();
				$('.title').text('修改收货地址');
			}
		});
	});
});