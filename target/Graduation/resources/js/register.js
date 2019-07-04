
//提交注册功能
function sub() {
       var realName= $("#realName").val();
       var userName= $("#userName").val();
       var passWord= $("#passWord").val();
        var idNumber= $("#idNumber").val();
        var number =$("#number").val();
        var sex=$('input[name=sex]:checked').val();
        console.log(sex);
        if(realName==""||userName==""||passWord==""||idNumber==""||number==""||sex==undefined){
            layer.msg('请将信息填写完整',{
                time:1500,
            })
        }else{
            console.log(idNumber.length)
            if(idNumber.length!=18){
                layer.msg('身份证输入有误，请重新输入',{
                    time:1300,
                })
            }else {
                $.ajax({
                    url:"/Graduation/test/register",
                    type:"POST",
                    dataType:"json",
                    data:{realName:realName,
                        userName:userName,
                        passWord:passWord,
                        idNumber:idNumber,
                        number:number,
                        sex:sex
                    },
                    success:function(data){
                        if(data.success){
                            var index = parent.layer.getFrameIndex(window.name);
                            layer.msg('注册成功', {
                                time: 2000, //20s后自动关闭
                            },function(){
                                parent.layer.close(index)
                            } );

                        }else{
                            layer.msg('注册失败，该用户已存在',{
                                time:1300,
                            })
                        }
                    }
                });
            }
        }


}

//重置功能
function clearInput(){
    console.log(111111);
    $("#realName").val("");
    $("#userName").val("");
    $("#passWord").val("");
    $("#idNumber").val("");
    $("#number").val("");
    $('input[name=sex]:checked').attr("checked",false);

}



