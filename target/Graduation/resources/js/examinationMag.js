
var allPage;
$(function () {
    var code=$("#itemsearch").val();
    var  pageNum=1;
    var as=false;
    var totalPage=ajax(pageNum,code,as);
    allPage=totalPage;
    console.log(totalPage);
    for(var j=1;j<=totalPage;j++){
        document.getElementById("magOption").options.add(new Option(j,j));
//				var op='<option ">'+j+'</option>';
//				$('#itemOption').append(op);
    }

})

//搜索功能
function magCheck(){
    var code=$("#itemsearch").val();
    var  pageNum=1;
    var as=false;

    var totalPage=ajax(pageNum,code,as);
    if(totalPage>0){
        allPage=totalPage;
        $("#magOption").find("option").remove();
        for(var j=1;j<=totalPage;j++) {
            document.getElementById("magOption").options.add(new Option(j, j));
        }
    }

}



//单个删除操作
function itemdelete(obj,id) {
    layer.confirm('是否确定删除', {
        btn: ['确定','取消'] //按钮
    }, function(){

        $.ajax({
            url:"/Graduation/examination/delete",
            type:"POST",
            dataType:"json",
            data:{"id":id},
            success:function(data){
                if(data.success){
                    layer.msg('删除成功', {time:1000,});
                    $(obj).parents("tr").remove();
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
function magPageUp() {
    var code=$("#itemsearch").val();
    var pageNum=$("#magOption").val();
    var as=true;
    if(pageNum==1){
        layer.msg('已经是第一页了喔',{
            time:1200,
        })

    }else {
        pageNum--;
        ajax(pageNum,code,as);

    }

}

//全选事件

function itemAllChenck(){
   var itemAllCheck =true;
    if(itemAllCheck){
        $('input[name="magCheckbox"]').prop("checked",true);
        itemAllCheck=false;

    }else{
        $('input[name="magCheckbox"]:checked').prop("checked",false);
        itemAllCheck=true;

    }
}

//批量删除
function magAllDel() {
    var checked = new Array();
    $("input[name='magCheckbox']:checked").each(function () {
        checked.push($(this).val());
    });
    if (checked.length < 1) {
        layer.msg("请选择要删除的信息", {
            time: 2000,
        });
    } else {
        layer.confirm('是否确定删除', {
            btn: ['确定','取消'] //按钮
        }, function(){

            $.ajax({
                url: "/Graduation/examination/allDelete",
                type: "POST",
                dataType: "json",
                contentType: "application/json",
                data: JSON.stringify(checked),
                success: function (data) {
                    if (data.success) {
                        $("input[name='magCheckbox']:checked").each(function () {
                            $(this).parents("tr").remove();
                        });
                        layer.msg("删除成功", {
                            time: 2000,
                        })
                    }else {
                        layer.msg('删除失败',{
                            time:1200,
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
}


//下拉触发事件
$('#magOption').change(function(){
    var code=$("#itemsearch").val();
    var pageNum=$("#magOption").val();
    var as=true;
    $("#magTable #appendInfo").remove();
    ajax(pageNum,code,as);
})

//下一页
function magPageDown() {
    var code=$("#itemsearch").val();
    var  pageNum=$("#magOption").val();
    var as=true;
    console.log(allPage);
    if(allPage>pageNum){
        pageNum++;

        ajax(pageNum,code,as);



    }else {
        layer.msg('已经是最后一页了喔',{
            time:1200,
        })
    }
}


//查看详情事件
function magCheckInfo(code,id,title,titleType,opA,opB,opC,opD,answer){

    layer.prompt({
        formType: 2,
        value: '初始值',
        title: '请输入值',
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
        var Code=$("#code").val();
        var examinationTable={
            "examinationTitle":Title,
            "examinationType":Type,
            "examinationA":OptionA,
            "examinationB":OptionB,
            "examinationC":OptionC,
            "examinationD":OptionD,
            "examinationAnswer":Answer,
            "examinationId":id,
            "examinationCode":code
        };
            if(code==$("#code").val()&&title==$('textarea').val()&&titleType&&$('#titleType').val()&&opA==$('#opA').val()&&opB==$('#opB').val()&&opC==$('#opC').val()&&opD==$('#opD').val()&&answer==$('#answer').val()){
                layer.msg('未修该任何数据',{
                    time:1000,
                })
            }else {
                $.ajax({
                    url:"/Graduation/examination/update",
                    type:"POST",
                    dataType:"json",
                    contentType :"application/json;charset=utf-8",
                    data:JSON.stringify(examinationTable),
                    success:function(data){
                        if(data.success){
                            layer.msg("修改成功",{
                                time:2000,
                            })
                        }else {
                            layer.msg("修改失败",{
                                time:1000,
                            })
                        }
                    }

                });
            }



    });
    var item2Append='<br/><div class="layui-form-item layui-form-pane" >' +
        '<label class="layui-form-label" >隶属试卷</label>' +
        '<div class="layui-input-block"><input type="text" id="code" class="layui-input" ></div>' +
        '</div><div class="layui-form-item layui-form-pane" >' +
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
        '<div class="layui-form-item layui-form-pane" >' +
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
    $("#code").val(code);


}



function ajax(pageNum,code,as){
   var  Page=0;
    $.ajax({
        url:"/Graduation/examination/examinationMag",
        type:"POST",
        dataType:"json",
        async: as,
        data:{"pageNum":pageNum,"code":code},
        success:function(data) {
           if(data.success){
               $("#magTable #appendInfo").remove();
               $("#magOption").val(pageNum);
               len = data.listExam.length;
               Page=data.totalPage;
               console.log(Page);
               for (var i = 0; i < len; i++) {
                   var list = data.listExam[i];

                   var questions = '<tr id="appendInfo"><td><input type="checkbox" name="magCheckbox" id="magCheckbox" value="' + list.examinationId + '" /></td>'
                       + '<td>' + list.examinationTitle + '</td>'
                       + '<td>' + list.examinationType + '</td>'
                       + '<td>' + list.examinationCode + '</td>'
                       + '<td ><a id="itemcheckMsg" onclick="magCheckInfo(&#39;' + list.examinationCode  + '&#39;,&#39;' + list.examinationId + '&#39;,&#39;' + list.examinationTitle + '&#39;,&#39;' + list.examinationType + '&#39;,&#39;' + list.examinationA + '&#39;,&#39;' + list.examinationB + '&#39;,&#39;' + list.examinationC + '&#39;,&#39;' + list.examinationD + '&#39;,&#39;' + list.examinationAnwser + '&#39;)" '
                       + ' href="javascript:;" style="color: #1E9FFF;">查看详情</a>|<a style="color: red" id="itemdelete" onclick="itemdelete(this,&#39;' + list.examinationId + '&#39;)" href="javascript:void(0)">删除</a></td></tr>'


                   $('#magTable').append(questions);
               }
           }else {
               layer.msg("提取数据失败或者没有该试卷",{
                   time:2000,
               })
           }
       }
    })
    return Page

}