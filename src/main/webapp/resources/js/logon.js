/**
 * 
 */
/**

 * 
 */

function button2(){
	var url="/Graduation/test/GoRegister";
	layer.open({
		type : 2,
		title : '注册',
		maxmin : true,
		offset: ['200px', '500px'],
		area : [ '540px', '500px' ],
		content:url

	});

}


function logon(){
	if($("#zhanghao").val()==""||$("#mima").val()==""){
		layer.msg('用户名或密码不能为空',{
			time:1200,
		})
	}else {
		$.ajax({
			url:"/Graduation/test/logonCheck",
			type:"POST",
			dataType:"json",
			data:{userName:$("#zhanghao").val(),
				passWord:$("#mima").val()
			},
			beforeSend:function(){
				layer.load();
//此处演示关闭
				setTimeout(function(){
					layer.closeAll('loading');
				}, 2000);
			},
			success:function(data){
				if(data.success){

					window.location.href="/Graduation/test/gomaininterface"


				}else{
					layer.msg("输入得账号或密码有误,请重新输入",{
						time:1000,
					});

				}
			},


		});
	}

}