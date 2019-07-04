/**
 * 抽取error_table成绩数据
 */

$(function(){
	 var type=$("#search").val();

		pageNum=1;

		 	$.ajax({
				url:"/Graduation/test/errormsg",
				type:"POST",
				dataType:"json",
				data:{"pageNum":pageNum,"type":type},
				success:function(data){
					if(data.success){
						var len=data.listWrong.length;
						for(var i=0;i<len;i++){
							var item=data.listWrong[i];
							var appendWrong='<tr id="errorInfo"><td><input type="checkbox" name="errorcheckbox" id="errorcheckbox" value="'+item.wrongId+'" /></td>'
								+ '<td>'+item.wrongTitle+'</td>'
								+ '<td>'+item.wrongSubject+'</td>'
								+'<td ><a id="checkMsg" onclick="checkMsg(&#39;'+item.wrongTitle+'&#39;,&#39;'+item.wrongSubject+'&#39;,&#39;'+item.wrongOptionA+'&#39;,&#39;'+item.wrongOptionB+'&#39;,&#39;'+item.wrongOptionC+'&#39;,&#39;'+item.wrongOptionD+'&#39;,&#39;'+item.wrongAnswer+'&#39;,&#39;'+item.wrongOption+'&#39;)" '
								+'href="javascript:;" >查看详情</a>||<a  id="errordelete"  onclick="deleteMsg(this,&#39;'+item.wrongId+'&#39;)" href="javascript:;">删除</a></td></tr>'
							$("#table").append(appendWrong);
						}
						totalPage=data.totalPage;

						for(var j=1;j<=totalPage;j++){
							document.getElementById("errorOption").options.add(new Option(j,j));
//				var op='<option ">'+j+'</option>';
//				$('#itemOption').append(op);
						}
					}else{
						layer.msg('提取数据失败',{
							time:1500,
						})
					}


				}
			});



})

//搜索
function errorSearch(){
	var type=$("#search").val();

	pageNum=1;

	$.ajax({
		url:"/Graduation/test/errormsg",
		type:"POST",
		dataType:"json",
		data:{"pageNum":pageNum,"type":type},
		success:function(data){
			if(data.success){
				var len=data.listWrong.length;
				for(var i=0;i<len;i++){
					var item=data.listWrong[i];
					var appendWrong='<tr id="errorInfo"><td><input type="checkbox" name="errorcheckbox" id="errorcheckbox" value="'+item.wrongId+'" /></td>'
						+ '<td>'+item.wrongTitle+'</td>'
						+ '<td>'+item.wrongSubject+'</td>'
						+'<td ><a id="checkMsg" onclick="checkMsg(&#39;'+item.wrongTitle+'&#39;,&#39;'+item.wrongSubject+'&#39;,&#39;'+item.wrongOptionA+'&#39;,&#39;'+item.wrongOptionB+'&#39;,&#39;'+item.wrongOptionC+'&#39;,&#39;'+item.wrongOptionD+'&#39;,&#39;'+item.wrongAnswer+'&#39;,&#39;'+item.wrongOption+'&#39;)" '
						+'href="javascript:;" >查看详情</a>||<a  id="errordelete"  onclick="deleteMsg(this,&#39;'+item.wrongId+'&#39;)" href="javascript:;">删除</a></td></tr>'
					$("#table").append(appendWrong);
				}
				totalPage=data.totalPage;
				$("#errorOption").find("option")._remove();
				for(var j=1;j<=totalPage;j++){
					document.getElementById("errorOption").options.add(new Option(j,j));
//				var op='<option ">'+j+'</option>';
//				$('#itemOption').append(op);
				}
			}else{
				layer.msg('提取数据失败',{
					time:1500,
				})
			}


		}
	});

}


//查看详情
function checkMsg(wrongTitle,wrongSubject,wrongOptionA,wrongOptionB,wrongOptionC,wrongOptionD,wrongAnswer,wrongOption){
	layer.prompt({
		formType: 2,
		value: wrongTitle,
		title: '详情',
		btn:['退出'],
		offset: ['10px', '500px'],
		area: ['500px', '150px'] //自定义文本域宽高
	}, function(value, index, elem){
		layer.close(index);

	});
	var errorAppend='<br/><div class="layui-form-item layui-form-pane" >' +
		'<label class="layui-form-label" >科目</label>' +
		'<div class="layui-input-block"><input type="text" id="errorTitleType" class="layui-input" ></div>' +
		'</div>'+
		'<div class="layui-form-item layui-form-pane" >' +
		'<label class="layui-form-label" >选项A</label>' +
		'<div class="layui-input-block"><input type="text" id="errorOpA" class="layui-input" ></div>' +
		'</div>'+
		'<div class="layui-form-item layui-form-pane" >' +
		'<label class="layui-form-label" >选项B</label>' +
		'<div class="layui-input-block"><input type="text" id="errorOpB" class="layui-input" ></div>' +
		'</div>'+
		'<div class="layui-form-item layui-form-pane" >' +
		'<label class="layui-form-label" >选项C</label>' +
		'<div class="layui-input-block"><input type="text" id="errorOpC" class="layui-input" ></div>' +
		'</div>'+
		'<div class="layui-form-item layui-form-pane" >' +
		'<label class="layui-form-label" >选项D</label>' +
		'<div class="layui-input-block"><input type="text" id="errorOpD" class="layui-input" ></div>' +
		'</div>'+
		'<div class="layui-form-item layui-form-pane" >' +
		'<label class="layui-form-label" >正确答案</label>' +
		'<div class="layui-input-block"><input type="text" id="errorAnswer" class="layui-input" ></div>' +
		'</div>'+
		'<div class="layui-form-item layui-form-pane" >' +
		'<label class="layui-form-label" >选择答案</label>' +
		'<div class="layui-input-block"><input type="text" id="wrongOption" class="layui-input" ></div>' +
		'</div>'
	$(".layui-layer-content").append(errorAppend);
	$("#errorTitleType").val(wrongSubject);
	$("#errorOpA").val(wrongOptionA);
	$("#errorOpB").val(wrongOptionB);
	$("#errorOpC").val(wrongOptionC);
	$("#errorOpD").val(wrongOptionD);
	$("#errorAnswer").val(wrongAnswer);
	$("#wrongOption").val(wrongOption);
}

//下拉触发事件
$('#errorOption').change(function(){
	var type=$("#search").val();
	pageNum=$("#errorOption").val();
	$.ajax({
		url:"/Graduation/test/errormsg",
		type:"POST",
		dataType:"json",
		data:{"pageNum":pageNum,"type":type},
		success:function(data){
			if(data.success){
				$("#table #errorInfo").remove();
				var len=data.listWrong.length;
				for(var i=0;i<len;i++){
					var item=data.listWrong[i];
					var appendWrong='<tr id="errorInfo"><td><input type="checkbox" name="errorcheckbox" id="errorcheckbox" value="'+item.wrongId+'" /></td>'
						+ '<td>'+item.wrongTitle+'</td>'
						+ '<td>'+item.wrongSubject+'</td>'
						+'<td ><a id="checkMsg" onclick="checkMsg(&#39;'+item.wrongTitle+'&#39;,&#39;'+item.wrongSubject+'&#39;,&#39;'+item.wrongOptionA+'&#39;,&#39;'+item.wrongOptionB+'&#39;,&#39;'+item.wrongOptionC+'&#39;,&#39;'+item.wrongOptionD+'&#39;,&#39;'+item.wrongAnswer+'&#39;,&#39;'+item.wrongOption+'&#39;)" '
						+'href="javascript:;" >查看详情</a>||<a  id="errordelete"  onclick="deleteMsg(this,&#39;'+item.wrongId+'&#39;)" href="javascript:;">删除</a></td>'
					$("#table").append(appendWrong);
				}

			}else {
				layer.msg('提取数据失败',{
					time:1500,
				})
			}

		}
	});
})

//搜索
function errorSearch(){
	var type=$("#search").val();
	pageNum=1;
	$.ajax({

		url:"/Graduation/test/errormsg",
		type:"POST",
		dataType:"json",
		data:{"pageNum":pageNum,"type":type},
		success:function(data){
			if(data.success){
				$("#table #errorInfo").remove();
				var len=data.listWrong.length;
				for(var i=0;i<len;i++){
					var item=data.listWrong[i];
					var appendWrong='<tr id="errorInfo"><td><input type="checkbox" name="errorcheckbox" id="errorcheckbox" value="'+item.wrongId+'" /></td>'
						+ '<td>'+item.wrongTitle+'</td>'
						+ '<td>'+item.wrongSubject+'</td>'
						+'<td ><a id="checkMsg" onclick="checkMsg(&#39;'+item.wrongTitle+'&#39;,&#39;'+item.wrongSubject+'&#39;,&#39;'+item.wrongOptionA+'&#39;,&#39;'+item.wrongOptionB+'&#39;,&#39;'+item.wrongOptionC+'&#39;,&#39;'+item.wrongOptionD+'&#39;,&#39;'+item.wrongAnswer+'&#39;,&#39;'+item.wrongOption+'&#39;)" '
						+'href="javascript:;" >查看详情</a>||<a  id="errordelete"  onclick="deleteMsg(this,&#39;'+item.wrongId+'&#39;)" href="javascript:;">删除</a></td>'
					$("#table").append(appendWrong);
				}
				totalPage=data.totalPage;
				$("#errorOption").find("option").remove();
				for(var j=1;j<=totalPage;j++){
					document.getElementById("errorOption").options.add(new Option(j,j));
//				var op='<option ">'+j+'</option>';
//				$('#itemOption').append(op);
				}
			}else {
				layer.msg('并没有查询到该科目数据',{
					time:1500,
				})
			}

		}
	});
}


//全选
check=true;
function errorAllChenck(){
	// var listCheck=$("#errorcheckbox");
	//     listCheck.querySelectorAll('input[name="errorcheckbox"]:checked');

			if (check) {
				$('input[name="errorcheckbox"]').prop("checked",true);
				check=false;
			}else {
				$('input[name="errorcheckbox"]').prop("checked",false);
				check=true;
			}




}


//删除
	function  deleteMsg(obj,id){
		layer.confirm('是否确定删除', {
			btn: ['确定','取消'] //按钮
		}, function(){

			$.ajax({
				url:"/Graduation/test/deleteWrong",
				type:"POST",
				dataType:"json",
				contentType : "application/json",
				data:JSON.stringify(id),
				success:function(data){
					if(data.success){
						$(obj).parents("tr").remove();
						layer.msg('删除成功', {icon: 1});
					}else {
						layer.msg('提取数据失败',{
							time:1500,
						})
					}
				}
			});

		}, function(){
			layer.msg('取消成功', {
				time: 2000, //20s后自动关闭

			});
		});
	}





//上一页
function errorUp(){
	var type=$("#search").val();
	pageNum=$("#errorOption").val();
	if(pageNum>1){

		pageNum--;
		$.ajax({
			url:"/Graduation/test/errormsg",
			type:"POST",
			dataType:"json",

			data:{"pageNum":pageNum,"type":type},
			success:function(data){
				if(data.success){
					$("#table #errorInfo").remove();
					$("#errorOption").val(pageNum);
					var len=data.listWrong.length;
					for(var i=0;i<len;i++){
						var item=data.listWrong[i];
						var appendWrong='<tr id="errorInfo"><td><input type="checkbox" name="errorcheckbox" id="errorcheckbox" value="'+item.wrongId+'" /></td>'
							+ '<td>'+item.wrongTitle+'</td>'
							+ '<td>'+item.wrongSubject+'</td>'
							+'<td ><a id="checkMsg" onclick="checkMsg(&#39;'+item.wrongTitle+'&#39;,&#39;'+item.wrongSubject+'&#39;,&#39;'+item.wrongOptionA+'&#39;,&#39;'+item.wrongOptionB+'&#39;,&#39;'+item.wrongOptionC+'&#39;,&#39;'+item.wrongOptionD+'&#39;,&#39;'+item.wrongAnswer+'&#39;,&#39;'+item.wrongOption+'&#39;)" '
							+'href="javascript:;" >查看详情</a>||<a  id="errordelete"  onclick="deleteMsg(this,&#39;'+item.wrongId+'&#39;)" href="javascript:;">删除</a></td>'
						$("#table").append(appendWrong);
					}
				}else {
					layer.msg('提取数据失败',{
						time:1500,
					})
				}




			}
		});
	}else{
		pageNum=$("#errorOption").val();
		layer.msg('已经是第一页了喔',{
			time:2000,
		})
	}



}

//下一页
function errorDown(){
	var type=$("#search").val();
	pageNum=$("#errorOption").val();
	if(totalPage>pageNum){

		pageNum++;
		$('#errorOption').val(pageNum);

		$.ajax({
			url:"/Graduation/test/errormsg",
			type:"POST",
			dataType:"json",
			data:{"pageNum":pageNum,"type":type},
			success:function(data){
				if(data.success){
					$("#table #errorInfo").remove();
					var len=data.listWrong.length;
					for(var i=0;i<len;i++){
						var item=data.listWrong[i];
						var appendWrong='<tr id="errorInfo"><td><input type="checkbox" name="errorcheckbox" id="errorcheckbox" value="'+item.wrongId+'" /></td>'
							+ '<td>'+item.wrongTitle+'</td>'
							+ '<td>'+item.wrongSubject+'</td>'
							+'<td ><a id="checkMsg" onclick="checkMsg(&#39;'+item.wrongTitle+'&#39;,&#39;'+item.wrongSubject+'&#39;,&#39;'+item.wrongOptionA+'&#39;,&#39;'+item.wrongOptionB+'&#39;,&#39;'+item.wrongOptionC+'&#39;,&#39;'+item.wrongOptionD+'&#39;,&#39;'+item.wrongAnswer+'&#39;,&#39;'+item.wrongOption+'&#39;)" '
							+'href="javascript:;" >查看详情</a>||<a  id="errordelete"  onclick="deleteMsg(this,&#39;'+item.wrongId+'&#39;)" href="javascript:;">删除</a></td>'
						$("#table").append(appendWrong);
					}
				}else{
					layer.msg('提取数据失败',{
						time:1500,
					})
				}




			}
		});
	}else{
		pageNum=$("#errorOption").val();
		layer.msg('已经是最后一页了',{
			time:1500,
		})
	}

}

//批量删除
	function errorAllDel(){
		var checked = new Array();
		$("input[name='errorcheckbox']:checked").each(function(){
			checked.push($(this).val());
		});
		if (checked.length<1){
			layer.msg("请选择要删除的信息",{
				time:2000,
			})
		} else {
			$.ajax({
				url:"/Graduation/test/deletAll",
				type:"POST",
				dataType:"json",
				contentType : "application/json",
				data:JSON.stringify(checked),
				success:function(data){
					if(data.success){
						$("input[name='errorcheckbox']:checked").each(function(){
							$(this).parents("tr").remove();
						});
						layer.msg("删除成功",{
							time:2000,
						})
					}

				}
			})
		}

	}