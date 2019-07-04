


$(function (){
	pageNum=$("#checkOption").val();
	if(pageNum==null){
		pageNum=1;
	}

	var type=$("#checkSearch").val();
	$.ajax({
		url: "/Graduation/check/checkMark",
		type: "POST",
		dataType: "json",
		data: {"pageNum": pageNum,"type":type},
		success: function (data) {
			if(data.success){
				idName=data.idName;
				 totalPage=data.totalPage;
				 var len=data.listMarkInfo.length;
				for(var i=0;i<len;i++){
					var item=data.listMarkInfo[i];
					var append='<tr id="checkInfo"><td>'+item.markSubjectType+'</td><td>'+item.markScore+'</td>' +
									'<td>'+item.markDate+'</td><td>'+item.markStudentName+'</td><td>'+item.markStudentNumber+'</td>' +
									'<td><a href="javascript:;" style="color: #1E9FFF" onclick="see(&#39;'+item.markSubjectType+'&#39;,&#39;'+item.markScore+'&#39;,&#39;'+item.markDate+'&#39;,&#39;'+item.markStudentNumber+'&#39;)">查看</a>||<a style="color: red" href="javascript:;" onclick="del(this,&#39;'+item.markId+'&#39;)">删除</a></td>'+
									'</tr>'
					$("#checkTable").append(append);

				}


				for(var j=1;j<=totalPage;j++){
					document.getElementById("checkOption").options.add(new Option(j,j));
//				var op='<option ">'+j+'</option>';
//				$('#itemOption').append(op);
				}
			}
		}
	})
})

//搜索
function checkSearch(){
	pageNum=1;
	var type=$("#checkSearch").val();
	$.ajax({
		url: "/Graduation/check/checkMark",
		type: "POST",
		dataType: "json",
		data: {"pageNum": pageNum,"type":type},
		success: function (data) {
			if(data.success){
				$("#checkTable #checkInfo").remove();
				totalPage=data.totalPage;
				var len=data.listMarkInfo.length;
				for(var i=0;i<len;i++){
					var item=data.listMarkInfo[i];
					var append='<tr id="checkInfo"><td>'+item.markSubjectType+'</td><td>'+item.markScore+'</td>' +
						'<td>'+item.markDate+'</td><td>'+item.markStudentName+'</td><td>'+item.markStudentNumber+'</td>' +
						'<td><a href="javascript:;" style="color: #1E9FFF" onclick="see(&#39;'+item.markSubjectType+'&#39;,&#39;'+item.markScore+'&#39;,&#39;'+item.markDate+'&#39;,&#39;'+item.markStudentNumber+'&#39;)">查看</a>||<a style="color: red" href="javascript:;" onclick="del(this,&#39;'+item.markId+'&#39;)">删除</a></td>'+
						'</tr>'
					$("#checkTable").append(append);

				}

				$("#checkOption").find("option").remove();
				for(var j=1;j<=totalPage;j++){
					document.getElementById("checkOption").options.add(new Option(j,j));
//				var op='<option ">'+j+'</option>';
//				$('#itemOption').append(op);
				}
			}else {
				layer.msg('没有查询到该数据',{
					time:1500,
				})
			}
		}
	})
}

//上一页
function checkPageUp() {
	if(pageNum>1){
		pageNum--;
		var type=$("#checkSearch").val();
		$.ajax({
			url: "/Graduation/check/checkMark",
			type: "POST",
			dataType: "json",
			data: {"pageNum": pageNum,"type":type},
			success: function (data) {
				if(data.success){
					$("#checkOption").val(pageNum);
					$(" #checkInfo").remove();
					totalPage=data.totalPage;
					var len=data.listMarkInfo.length;
					for(var i=0;i<len;i++){
						var item=data.listMarkInfo[i];
						var append='<tr id="checkInfo"><td>'+item.markSubjectType+'</td><td>'+item.markScore+'</td>' +
							'<td>'+item.markDate+'</td><td>'+item.markStudentName+'</td><td>'+item.markStudentNumber+'</td>' +
							'<td><a href="javascript:;" style="color: #1E9FFF" onclick="see(&#39;'+item.markSubjectType+'&#39;,&#39;'+item.markScore+'&#39;,&#39;'+item.markDate+'&#39;,&#39;'+item.markStudentNumber+'&#39;)">查看</a>||<a style="color: red" href="javascript:;" onclick="del(this,&#39;'+item.markId+'&#39;)">删除</a></td>'+
							'</tr>'
						$("#checkTable").append(append);

					}



				}else{
					layer.confirm("请输入正确的科目",{
							btn:["确定"]
						},function () {
							layer.close(layer.index);
						}
					)
				}
			}
		})
	}else{
		pageNum=$("#checkOption").val();
		layer.msg('已经是第一页了',{
			time:1000,
		})
	}


}

//下一页
function checkPageDown(){
	if(totalPage>pageNum){
		pageNum++;
		var type=$("#checkSearch").val();

		$.ajax({
			url: "/Graduation/check/checkMark",
			type: "POST",
			dataType: "json",
			data: {"pageNum": pageNum,"type":type},
			success: function (data) {
				if(data.success){
					$("#checkOption").val(pageNum);
					$(" #checkInfo").remove();
					totalPage=data.totalPage;
					var len=data.listMarkInfo.length;
					for(var i=0;i<len;i++){
						var item=data.listMarkInfo[i];
						var append='<tr id="checkInfo"><td>'+item.markSubjectType+'</td><td>'+item.markScore+'</td>' +
							'<td>'+item.markDate+'</td><td>'+item.markStudentName+'</td><td>'+item.markStudentNumber+'</td>' +
							'<td><a href="javascript:;" style="color: #1E9FFF" onclick="see(&#39;'+item.markSubjectType+'&#39;,&#39;'+item.markScore+'&#39;,&#39;'+item.markDate+'&#39;,&#39;'+item.markStudentNumber+'&#39;)">查看</a>||<a style="color: red" href="javascript:;"onclick="del(this,&#39;'+item.markId+'&#39;)">删除</a></td>'+
							'</tr>'
						$("#checkTable").append(append);

					}



				}else{
					layer.confirm("请输入正确的科目",{
							btn:["确定"]
						},function () {
							layer.close(layer.index);
						}
					)
				}
			}
		})
	}else{
		pageNum=$("#checkOption").val();
		layer.msg('已经是最后一页',{
			time:1000,
		})
	}

}

//下拉改变事件
$("#checkOption").change(function(){
	pageNum=$("#checkOption").val();
	var type=$("#checkSearch").val();
	$.ajax({
		url: "/Graduation/check/checkMark",
		type: "POST",
		dataType: "json",
		data: {"pageNum": pageNum,"type":type},
		success: function (data) {
			if(data.success){
				$("#checkOption").val(pageNum);
				$(" #checkInfo").remove();
				totalPage=data.totalPage;
				var len=data.listMarkInfo.length;
				for(var i=0;i<len;i++){
					var item=data.listMarkInfo[i];
					var append='<tr id="checkInfo"><td>'+item.markSubjectType+'</td><td>'+item.markScore+'</td>' +
						'<td>'+item.markDate+'</td><td>'+item.markStudentName+'</td><td>'+item.markStudentNumber+'</td>' +
						'<td><a href="javascript:;" style="color: #1E9FFF" onclick="see(&#39;'+item.markSubjectType+'&#39;,&#39;'+item.markScore+'&#39;,&#39;'+item.markDate+'&#39;,&#39;'+item.markStudentNumber+'&#39;)">查看</a>||<a style="color: red" href="javascript:;"onclick="del(this,&#39;'+item.markId+'&#39;)">删除</a></td>'+
						'</tr>'
					$("#checkTable").append(append);

				}



			}else{
				layer.confirm("请输入正确的科目",{
						btn:["确定"]
					},function () {
						layer.close(layer.index);
					}
				)
			}
		}
	})
})


function see(type,mark,date,number){
	console.log(type);
	var ui= '<div class="layui-form-item layui-form-pane" ><label class="layui-form-label" >科目名</label>' +
		'<div class="layui-input-block"><input type="text"value="'+type+'" id="type" class="layui-input"  ></div></div>'+
		'<div class="layui-form-item layui-form-pane"  ><label class="layui-form-label" >成绩</label>' +
		'<div class="layui-input-block"><input type="text" value="'+mark+'" id="mark" class="layui-input"  ></div></div>'+
		'<div class="layui-form-item layui-form-pane" ><label class="layui-form-label" >考试时间</label>' +
		'<div class="layui-input-block"><input type="text" value="'+date+'" id="date" class="layui-input"  ></div></div>'+
		'<div class="layui-form-item layui-form-pane" ><label class="layui-form-label" >学生学号</label>' +
		'<div class="layui-input-block"><input type="text" value="'+number+'"id="number" class="layui-input"  ></div></div>'

	layer.open({
		type: 1,
		skin: 'layui-layer-rim', //加上边框
		btn:['修改','取消'],
		title:'详情',
		area: ['500px', '300x'], //宽高
		content:ui,

		btn1:function () {
			if(idName=="student"){
				layer.msg('对不起，您未拥有该修改权限',{
					time:1000,
				})
			}else {
				if(type==$("#type").val()&&mark==$("#mark").val()&&date==$("#date").val()&&number==$("#number").val()){
					layer.confirm('并改动任何信息', {
						btn: ['确定'] //按钮
					}, function(){
						layer.close(layer.index);
					});

				}else{mark=$("#mark").val();
					$.ajax({
						url: "/Graduation/check/updata",
						type: "POST",
						dataType: "json",
						data: {"type": type,"number":number,"mark":mark},
						success: function (data) {
							if(data.success){
								layer.msg('修改成功',{
									time:1500,
								},layer.close(layer.index));
							}
						}
					})}
			}



		}
	});


}
//删除
function del(obj,markId) {
	if (idName=="student"){
		layer.msg('对不起，您并未拥有该删除权限',{
			time:2000,
		})
	} else {
		layer.confirm('是否确定删除', {
			btn: ['确定','取消'] //按钮
		},function(){
			$.ajax({
				url: "/Graduation/check/delete",
				type: "POST",
				dataType: "json",
				data: {"mariId": markId},
				success: function (data) {
					if(data.success){
						$(obj).parents("tr").remove();
						layer.msg('删除成功',{
							time:1500,
						});
					}
				}
			})
		},function () {
			layer.close(layer.index);
		})
	}

}
