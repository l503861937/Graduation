/**
 * 
 */



$(function(){
	var type=$("#itemsearch").val();
	pageNum=1;
	$.ajax({
		url:"/Graduation/question/page",
		type:"POST",
		dataType:"json",
		data:{"pageNum":pageNum,"type":type},
		success:function(data){
			len = data.listQuestionsPage.length;
			for(var i=0;i<len;i++){
			var list=data.listQuestionsPage[i];
			var radio_name = new String("radio_" + i);
			var questions='<tr id="appendInfo"><td><input type="checkbox" name="ietemcheckbox" id="ietemcheckbox" value="'+list.iD+'" /></td>'      
				         +'<td>'+list.title+'</td>'
			             +'<td>'+list.type+'</td>'
			             +'<td ><a id="itemcheckMsg" onclick="checkInfo(&#39;'+list.iD+'&#39;,&#39;'+list.title+'&#39;,&#39;'+list.type+'&#39;,&#39;'+list.optionA+'&#39;,&#39;'+list.optionB+'&#39;,&#39;'+list.optionC+'&#39;,&#39;'+list.optionD+'&#39;,&#39;'+list.answer+'&#39;)" '
			             +' href="javascript:;">查看详情</a>|<a  id="itemdelete" onclick="itemdelete(this,&#39;'+list.iD+'&#39;)" href="javascript:void(0)">删除</a></td></tr>'
			              
			
			$('#itemtable').append(questions);
			};
			totalPage=data.totalPage;
			
			for(var j=1;j<=totalPage;j++){
				document.getElementById("itemOption").options.add(new Option(j,j));
//				var op='<option ">'+j+'</option>';
//				$('#itemOption').append(op);
			}
			
		}
	});
})

//搜索
function ietemCheck(){
	var type=$("#itemsearch").val();
	pageNum=1;
	$.ajax({
		url:"/Graduation/question/page",
		type:"POST",
		dataType:"json",
		data:{"pageNum":pageNum,"type":type},
		success:function(data){
			if(data.success){
				$("#itemtable #appendInfo").remove();
				len = data.listQuestionsPage.length;
				for(var i=0;i<len;i++){
					var list=data.listQuestionsPage[i];
					var radio_name = new String("radio_" + i);
					var questions='<tr id="appendInfo"><td><input type="checkbox" name="ietemcheckbox" id="ietemcheckbox" value="'+list.iD+'" /></td>'
						+'<td>'+list.title+'</td>'
						+'<td>'+list.type+'</td>'
						+'<td ><a id="itemcheckMsg" onclick="checkInfo(&#39;'+list.iD+'&#39;,&#39;'+list.title+'&#39;,&#39;'+list.type+'&#39;,&#39;'+list.optionA+'&#39;,&#39;'+list.optionB+'&#39;,&#39;'+list.optionC+'&#39;,&#39;'+list.optionD+'&#39;,&#39;'+list.answer+'&#39;)" '
						+' href="javascript:;">查看详情</a>|<a  id="itemdelete" onclick="itemdelete(this,&#39;'+list.iD+'&#39;)" href="javascript:void(0)">删除</a></td></tr>'


					$('#itemtable').append(questions);
				};
				totalPage=data.totalPage;
				$("#itemOption").find("option").remove();
				for(var j=1;j<=totalPage;j++){
					document.getElementById("itemOption").options.add(new Option(j,j));
//				var op='<option ">'+j+'</option>';
//				$('#itemOption').append(op);
				}
			}else {
				layer.msg('未查询到该科目信息',{
					time:1500,
				})
			}


		}
	});
}

//上一页事件
function pageUp(){
	if(pageNum>1){
		pageNum=$("#itemOption").val();
		pageNum--;
		var type=$("#itemsearch").val();
			$.ajax({
				url:"/Graduation/question/page",
				type:"POST",
				dataType:"json",
				data:{"pageNum":pageNum,"type":type},
				success:function(data){
					if(data.success){
						len = data.listQuestionsPage.length;
						$('#itemOption').val(pageNum);
						$("#itemtable #appendInfo").remove();
						for(var i=0;i<len;i++){
							var list=data.listQuestionsPage[i];

							var questions='<tr id="appendInfo"><td><input type="checkbox" name="ietemcheckbox" id="ietemcheckbox" value="'+list.iD+'" /></td>'
								+'<td>'+list.title+'</td>'
								+'<td>'+list.type+'</td>'
								+'<td ><a id="itemcheckMsg" onclick="checkInfo(&#39;'+list.iD+'&#39;,&#39;'+list.title+'&#39;,&#39;'+list.type+'&#39;,&#39;'+list.optionA+'&#39;,&#39;'+list.optionB+'&#39;,&#39;'+list.optionC+'&#39;,&#39;'+list.optionD+'&#39;,&#39;'+list.answer+'&#39;)" href="javascript:;">查看详情</a>|<a value="'+list.iD+'" id="itemdelete" onclick="itemdelete(this,&#39;'+list.iD+'&#39;,&#39;'+list.title+'&#39;,&#39;'+list.type+'&#39;,&#39;'+list.optionA+'&#39;,&#39;'+list.optionB+'&#39;,&#39;'+list.optionC+'&#39;,&#39;'+list.optionD+'&#39;)" href="javascript:;">删除</a></td></tr>'


							$('#itemtable').append(questions);
						};
					}else {
						layer.msg('提取数据失败',{
							time:1000,
						})
					}

				}
			});
	}else{
		pageNum=$("#itemOption").val();
		layer.msg('已经是第一页了',{
			time:1000,
		})
	}

	
}


//下一页事件
function pageDown(){
	if(totalPage>pageNum){
		pageNum=$("#itemOption").val();
		pageNum++;
		var type=$("#itemsearch").val();
		$.ajax({
			url:"/Graduation/question/page",
			type:"POST",
			dataType:"json",
			data:{"pageNum":pageNum,"type":type},
			success:function(data){
				if(data.success){
					$('#itemOption').val(pageNum);
					$("#itemtable #appendInfo").remove(),
						len = data.listQuestionsPage.length;
					for(var i=0;i<len;i++){
						var list=data.listQuestionsPage[i];

						var questions='<tr id="appendInfo"><td><input type="checkbox" name="ietemcheckbox" id="ietemcheckbox" value="'+list.iD+'" /></td>'
							+'<td>'+list.title+'</td>'
							+'<td>'+list.type+'</td>'
							+'<td ><a id="itemcheckMsg" onclick="checkInfo(&#39;'+list.iD+'&#39;,&#39;'+list.title+'&#39;,&#39;'+list.type+'&#39;,&#39;'+list.optionA+'&#39;,&#39;'+list.optionB+'&#39;,&#39;'+list.optionC+'&#39;,&#39;'+list.optionD+'&#39;,&#39;'+list.answer+'&#39;)" href="javascript:;">查看详情</a>|<a value="'+list.iD+'" id="itemdelete" onclick="itemdelete(this,&#39;'+list.iD+'&#39;)" href="javascript:;">删除</a></td></tr>'


						$('#itemtable').append(questions);
					};
				}else {
					layer.msg('获取数据失败',{
						time:1000,
					})
				}

			}
		});
		
	}else{
		pageNum=$("#itemOption").val();
		layer.msg('已经是最后一页了',{
			time:1000,
		})
	}

}

//查看详情事件
	function checkInfo(id,title,titleType,opA,opB,opC,opD,answer){

	layer.prompt({
		formType: 2,
		value: '初始值',
		title: '详情',
		btn:['修改','取消'],
		offset: ['10px', '500px'],
		area: ['500px', '150px'] //自定义文本域宽高
	}, function(value, index, elem){
		var Title=$('textarea').val();
		var Type=$('#titleType').val();
		var OptionA=$('#opA').val();
		var OptionB=$('#opB').val();
		var OptionC=$('#opC').val();
		var OptionD=$('#opD').val();
		var Answer=$('#answer').val();
		var questions={
			"title":Title,
			"type":Type,
			"optionA":OptionA,
			"optionB":OptionB,
			"optionC":OptionC,
			"optionD":OptionD,
			"answer":Answer,
			"iD":ID,
		};
		
		$.ajax({
			url:"/Graduation/question/update",
			type:"POST",
			dataType:"json",
			contentType :"application/json;charset=utf-8",
			data:JSON.stringify(questions),
			success:function(data){
				if(data.success){
					layer.msg("修改成功",{
						time:2000,
					})
				}
			}

		});


	});
	var item2Append='<br/><div class="layui-form-item layui-form-pane" >' +
					'<label class="layui-form-label" >科目</label>' +
					'<div class="layui-input-block"><input type="text" id="titleType" class="layui-input" ></div>' +
					'</div>'+
					'<div class="layui-form-item layui-form-pane" >' +
					'<label class="layui-form-label" >选项A</label>' +
					'<div class="layui-input-block"><input type="text" id="opA" class="layui-input" ></div>' +
					'</div>'+
					'<div class="layui-form-item layui-form-pane" >' +
					'<label class="layui-form-label" >选项B</label>' +
					'<div class="layui-input-block"><input type="text" id="opB" class="layui-input" ></div>' +
					'</div>'+
					'<div class="layui-form-item layui-form-pane" >' +
					'<label class="layui-form-label" >选项C</label>' +
					'<div class="layui-input-block"><input type="text" id="opC" class="layui-input" ></div>' +
					'</div>'+
					'<div class="layui-form-item layui-form-pane" >' +
					'<label class="layui-form-label" >选项D</label>' +
					'<div class="layui-input-block"><input type="text" id="opD" class="layui-input" ></div>' +
					'</div>'+
					'<br/><div class="layui-form-item layui-form-pane" >' +
					'<label class="layui-form-label" >正确答案</label>' +
					'<div class="layui-input-block"><input type="text" id="answer" class="layui-input" ></div>' +
					'</div>';
	$(".layui-layer-content").append(item2Append);
	$('textarea').val(title);
	$('#titleType').val(titleType);
	$('#opA').val(opA);
	$('#opB').val(opB);
	$('#opC').val(opC);
	$('#opD').val(opD);
	$('#titleId').val(id);
	$('#answer').val(answer);
	ID=id;




//	var abcd=document.getElementById("textarea");
//	var abcd = $('textarea').val();

	/*var ele=document.getElementById("itemtextarea");
	console.log(info);
	ele.value="haha";*/
	
}

//删除事件
function itemdelete(obj,id){
	layer.confirm('是否确定删除', {
		btn: ['确定','取消'] //按钮
	}, function(){
		$(obj).parents("tr").remove();
		$.ajax({
			url:"/Graduation/question/delete",
			type:"POST",
			dataType:"json",
			contentType : "application/json",
			data:JSON.stringify(id),
			success:function(data){
				if(data.success){
					layer.msg('删除成功', {icon: 1});
				}
			}
		});

	}, function(){
		layer.msg('取消成功', {
			time: 2000, //20s后自动关闭

		});
	});


}


//下拉框数值改变事件
$('#itemOption').change(function(){
	pageNum=$("#itemOption").val();
	$("#itemtable #appendInfo").remove();
	var type=$("#itemsearch").val();
	$.ajax({
		url:"/Graduation/question/page",
		type:"POST",
		dataType:"json",
		data:{"pageNum":pageNum,"type":type},
		success:function(data){
			len = data.listQuestionsPage.length;
			for(var i=0;i<len;i++){
			var list=data.listQuestionsPage[i];
	
			var questions='<tr id="appendInfo"><td><input type="checkbox" name="ietemcheckbox" id="ietemcheckbox" value="'+list.iD+'" /></td>'      
				         +'<td>'+list.title+'</td>'
			             +'<td>'+list.type+'</td>'
			             +'<td ><a id="itemcheckMsg" onclick="checkInfo(&#39;'+list.iD+'&#39;,&#39;'+list.title+'&#39;,&#39;'+list.type+'&#39;,&#39;'+list.optionA+'&#39;,&#39;'+list.optionB+'&#39;,&#39;'+list.optionC+'&#39;,&#39;'+list.optionD+'&#39;,&#39;'+list.answer+'&#39;)" href="javascript:;">查看详情</a>|<a id="itemdelete" onclick="itemdelete(this,&#39;'+list.iD+'&#39;)" href="javascript:;">删除</a></td></tr>'
			              
			
			$('#itemtable').append(questions);
			};
		}
	});
})
	
//全选事件
   itemAllCheck =true;
    function itemAllChenck(){
				if(itemAllCheck){
					$('input[name="ietemcheckbox"]').prop("checked",true);
					itemAllCheck=false;

				}else{
					$('input[name="ietemcheckbox"]:checked').prop("checked",false);
					itemAllCheck=true;

				}
	}

//批量删除
function allDel(){
	   var checked = new Array();
	$("input[name='ietemcheckbox']:checked").each(function(){
	checked.push($(this).val());
	});
	   if(checked.length<1){
		   layer.msg("请选择要删除的信息",{
		   	time:2000,
		   });
	   }else{
		   $.ajax({
			   url:"/Graduation/question/alldelete",
			   type:"POST",
			   dataType:"json",
			   contentType :"application/json",
			   data:JSON.stringify(checked),
			   success:function(data){
				   if(data.success){
					   $("input[name='ietemcheckbox']:checked").each(function(){
						   $(this).parents("tr").remove();
					   });
					   layer.msg("删除成功",{
					   	time:2000,
					   })
				   }
			   }


		   });

	    }

	    


	    

}




