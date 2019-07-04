/**
 *在线考试
 */

$(function(){

    confirm();

})

function confirm() {
    layer.confirm('<div class="layui-form-item layui-form-pane"><label class="layui-form-label">试卷代码</label><div class="layui-input-inline"><input type="text" id="examinationCode" style="width: 200px;" required lay-verify="required" placeholder="请输入试卷代码" autocomplete="off" class="layui-input"></div>', {
        btn: ['确定','取消'], //按钮

    }, function(){
        var examinationCode=$("#examinationCode").val();
        if(examinationCode==""){
            layer.msg('试题代码不能为空',{
                time:1000,

            },function () {
                confirm();
            })

        }else{


            SelectExaTable(examinationCode);

        }

    }, function(){
        layer.msg('成功取消', {
            time: 1000, //20s后自动关闭

        });
    });

}
function SelectExaTable(examinationCode){

    $.ajax({

        url:"/Graduation/examination/SelectExaTable",
        type:"POST",
        dataType:"json",

        data:{examinationCode:examinationCode},
        success:function(data){
            if(data.msg){
                if (data.success){
                    examType=data.examList[0].examinationType;
                    len = data.examList.length;
                    var examiTable='<tr><td><h2>考试科目:'+examType+'</h2></td></tr>'
                        +'<tr><td>时间：100分钟</td></tr>'
                        +'<tr><td>得分:</td></tr>'
                    var examiHeader='<br/><br/><br/><h1 >一、选择题（每空5分，共20分）</h1><br/>';
                    var examibg='<button class="layui-btn layui-btn-normal" id="examSubmit" onclick="examsubmit()" >提交试卷</button>';
                    $("#examibg").append(examibg);
                    $("#examiHeader").append(examiHeader);
                    $("#examiTable").append(examiTable);
                    listAnswer=new Array();
                    for(var i=0;i<len;i++){
                        var list=data.examList[i];
                        listAnswer[i]=list.examinationAnwser;
                        var radioName = new String("radio_" + i);
                        var questions='<li><p><h3 style="color: #0e9aef">'+list.examinationTitle+'</h3></p><br/><br/>'
                            +'<input  type="radio" value="A" name='+radioName+' >'+list.examinationA+'<br/><br/>'
                            +'<input  type="radio" value="B" name='+radioName+' >'+list.examinationB+'<br/><br/>'
                            +'<input  type="radio" value="C" name='+radioName+'  >'+list.examinationC+'<br/><br/>'
                            +'<input  type="radio" value="D" name='+radioName+'  >'+list.examinationD+'</li><br/>'
                            +'<div id="examiborder"></div><br/><br/>';

                        $('#examiTitle').append(questions);
                    }
                    layer.close(layer.index);
                    layer.msg("考试开始，时间为30分钟",{
                        time:1300,

                    },function () {
                        timer = setInterval("CountDown()", 1000);
                    })
                } else{
                    layer.msg("请输入正确的试卷代码",{
                        time:1000,
                    },function () {
                        confirm();

                    })
                }
            }else {
                layer.msg('你已经参加过该考试了',{
                    time:1200,
                },function () {
                    confirm();

                })
            }


        },
    })



}

//提交试卷
function examsubmit(){
    var exam=true;
    var examAnswer=new Array();


    for(var i=0;i<len;i++){
        var radioName = new String("radio_" + i);
        examAnswer[i] = $('input[name='+radioName+']:checked').val();
        if(examAnswer[i]==undefined){
            layer.msg(i+1+"题还未作答",{
                time:1000,
            })
                exam=false;
                break;      }
    }if(exam){

        var sum=0;
        for (var i=0;i<len;i++) {
            if(listAnswer[i]==examAnswer[i]){
                sum=sum+5;
            }
        }
            $.ajax({
                url:"/Graduation/check/addMark",
                type:"POST",
                dataType:"json",
                data:{"examType":examType,"sum":sum},
                success:function(data){
                    if(data.success){
                        layer.alert('你本次考试分数为：'+sum, {
                            skin: 'layui-layer-molv', //样式类名
                            closeBtn: 0,
                            anim: 4,
                        }, function(){
                            layer.close(layer.index);
                            $("#examibg").remove();
                            $("#timer").remove();
                        });
                    }else{
                        layer.msg('试卷提交过程出错，请联系管理员',{
                            time:2000,
                        })
                    }
                }

            });


    }

}
//时钟倒计时
var maxtime = 30* 60; //
function CountDown() {
    var sum=0;
    if (maxtime >= 0) {
        minutes = Math.floor(maxtime / 60);
        seconds = Math.floor(maxtime % 60);
        msg = "距离考试结束还有" + minutes + "分" + seconds + "秒";
        document.getElementById("timer").innerHTML = msg;
        --maxtime;

    } else{
        var examAnswer=new Array();
        for(var i=0;i<len;i++) {
            var radioName = new String("radio_" + i);
            examAnswer[i] = $('input[name=' + radioName + ']:checked').val();
        }
        for (var i=0;i<len;i++) {
            if(listAnswer[i]==examAnswer[i]){
                sum=sum+2;
            }
        }

        $.ajax({
            url:"/Graduation/check/addMark",
            type:"POST",
            dataType:"json",
            data:{"examType":examType,"sum":sum},
            success:function(data){
                if(data.success){
                    layer.alert('你本次考试分数为：'+sum, {
                        skin: 'layui-layer-molv', //样式类名
                        closeBtn: 0,
                        anim: 4,
                    }, function(){
                        layer.close(layer.index);
                        $("#examibg").remove();
                        $("#timer").remove();
                    });
                }else{
                    layer.msg('试卷提交过程出错，请联系管理员',{
                        time:2000,
                    })
                }
            }

        });
        clearInterval(timer);
        layer.msg("考试已结束",{
            time:1300,
        });



    }

}

