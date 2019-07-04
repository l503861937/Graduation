/**
 * 在线测试
 */
       
        	$(function(){
        		$.ajax({
					url:"/Graduation/question/online",
					type:"POST",
					dataType:"json",
					success:function(data){
						if(data.success){
						var len=data.listQuestions.length;
						var append;
						for(var i=0;i<len;i++){
							append+='<option>'+data.listQuestions[i].type+'</option>';
						}
							var ui='<select class="layui-select" id="onlineOption" style="width: 300px">' +append+ '</select>'
							layer.confirm(ui, {
								area: ['500px', '300x'],
								btn: ['确定', '取消'], //按钮
								btn1:function () {
									getQuestionsInfo($("#onlineOption").val());
									console.log($("#onlineOption").val(),  $("#onlineOption").find("option:selected").text())
									layer.msg('测试开始',{
										time:1200,
									})
								},
								btn2:function () {
									layer.close(layer.index);
									layer.msg('成功取消',{
										time:1300,
									})
								}
							})
						}
					}
				})


        	})
function getQuestionsInfo(type){

		$.ajax({
			url:"/Graduation/question/testquestions",
			type:"POST",
			dataType:"json",
			data:{type:type},
			success:function(data){

				len = data.listQuestions.length;
				var onlineTable='<tr><td><h2>考试科目:'+type+'</h2></td></tr>'
					+'<tr><td>时间：30分钟</td></tr>'

				var onlineHeader='<br/><br/><br/><h1 >一、选择题（每空5分，共20分）</h1><br/>';
				 var onlinebg='<button class="layui-btn layui-btn-normal" id="submitText" onclick="submit()" >提交试卷</button>';
				 $("#onlinebg").append(onlinebg);
				$("#onlineHeader").append(onlineHeader);
				$("#onlineTable").append(onlineTable);
				for(var i=0;i<len;i++){
					var list=data.listQuestions[i];
					var radio_name = new String("radio_" + i);
					var questions='<li><p ><h3 style="color: #0e9aef">'+list.title+'</h3></p><br/><br/>'
						+'<input  type="radio" value="A" name='+radio_name+' >'+list.optionA+'<br/><br/>'
						+'<input  type="radio" value="B" name='+radio_name+' >'+list.optionB+'<br/><br/>'
						+'<input  type="radio" value="C" name='+radio_name+'  >'+list.optionC+'<br/><br/>'
						+'<input  type="radio" value="D" name='+radio_name+'  >'+list.optionD+'</li><br/>'
						+'<div id="Interborder"></div><br/><br/>';

					$('#testtest').append(questions);
				}
			},
		})



}
        	
        	
        	function submit(){
        		var onlineAnswer=new Array();
        		var su=true;
        		for(var i=0;i<len;i++){
        			var radio_name = new String("radio_" + i);
					onlineAnswer[i] = $('input[name='+radio_name+']:checked').val();
            		if(onlineAnswer[i]==undefined){
            			layer.msg(i+1+'题:未作答',{
            				time:1000,
						});
            			su=false;
						break;
					}
        		}

        		if(su){
					$.ajax({
						url:"/Graduation/question/checkanswer",
						type:"POST",
						dataType:"json",
						contentType : "application/json",
						data:JSON.stringify(onlineAnswer),
						success:function(data){
							layer.confirm("你本次成绩为："+data.sum,{
								btn:["确定"],
								btn1:function () {
									layer.close(layer.index);
								}
							});
							$("#onlinebg").remove();

						},


					});
				}

        	}


