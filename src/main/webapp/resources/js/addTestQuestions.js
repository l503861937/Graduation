

    function addTest    (){
        var TestAppend='<br/><br/><br/><div class="layui-form-item layui-form-pane" >'+
            '<label class="layui-form-label" >题目</label>'+
            '<div class="layui-input-block">'+
            '<input type="text" id="addTextTitle" style="width: 600px;" required  lay-verify="required" placeholder="" autocomplete="off" class="layui-input">'+
            '</div>'+
            '</div>'+
            '<div class="layui-form-item layui-form-pane">'+
            '<label class="layui-form-label">A选项</label>'+
            '<div class="layui-input-inline">'+
            '<input type="text" id="addOpA" style="width: 600px;" required lay-verify="required" placeholder="" autocomplete="off" class="layui-input">'+
            '</div>'+
            '</div>'+
            '<div class="layui-form-item layui-form-pane">'+
            '<label class="layui-form-label">B选项</label>'+
            '<div class="layui-input-inline">'+
            '<input type="text" id="addOpB" style="width: 600px;" required lay-verify="required" placeholder="" autocomplete="off" class="layui-input">'+
            '</div>'+
            '</div>\n' +
            '<div class="layui-form-item layui-form-pane">'+
            '<label class="layui-form-label">C选项</label>'+
            '<div class="layui-input-inline">'+
            '<input type="text" id="addOpC" style="width: 600px;" required lay-verify="required" placeholder="" autocomplete="off" class="layui-input">'+
            '</div>'+
            '</div>'+
            '<div class="layui-form-item layui-form-pane">'+
            '<label class="layui-form-label">D选项</label>'+
            '<div class="layui-input-inline">'+
            '<input type="text" id="addOpD" style="width: 600px;" required lay-verify="required" placeholder="" autocomplete="off" class="layui-input">'+
            '</div>'+
            '</div>'+
            '<div class="layui-form-item layui-form-pane">'+
            '<label class="layui-form-label">正确答案</label>'+
            '<div class="layui-input-inline">'+
            '<input type="text" id="addAnswer" style="width: 600px;" required lay-verify="required" placeholder="" autocomplete="off" class="layui-input">'+
            '</div>'+
            '</div>';
            $("#add").append(TestAppend);
    }

    function info() {
        allList=new Array();
        addExaminationCode=new Array();
         titleList= new Array();
         opAList= new Array();
         opBList= new Array();
         opCList= new Array();
        opDList= new Array();
         answerList= new Array();
        $(" input[id=addTextTitle]").each(function () {
            titleList.push(this.value);
        })

        $(" input[id=addOpA]").each(function () {
            opAList.push(this.value);
        })

        $(" input[id=addOpB]").each(function () {
            opBList.push(this.value);
        })

        $(" input[id=addOpC]").each(function () {
            opCList.push(this.value);
        })

        $(" input[id=addOpD]").each(function () {
            opDList.push(this.value);
        })

        $(" input[id=addAnswer]").each(function () {
            answerList.push(this.value);
        })


    }
    function addSub() {
        info();
        var success=true;
        for(var i=0;i<titleList.length;i++){
            if(titleList[i]==""||opAList[i]==""||opBList[i]==""||opCList[i]==""||opDList[i]==""||answerList[i]==""){
                success=false;
            }
        }
        if(success){
            var append='<div class="layui-form-item layui-form-pane"><label class="layui-form-label">试卷代码</label><div class="layui-input-inline"><input type="text" id="addExaminationCode" style="width: 200px;" required lay-verify="required" placeholder="请输入试卷代码" autocomplete="off" class="layui-input"></div>' +
                '<br/><br/><div class="layui-form-item layui-form-pane"><label class="layui-form-label">科目名称</label><div class="layui-input-inline"><input type="text" id="addExaminationType" style="width: 200px;" required lay-verify="required" placeholder="请输入科目名称" autocomplete="off" class="layui-input"></div>';
            var addurl="/Graduation/examination/addTextInfo";
            addconfirm(addurl,append);
            allList.push(titleList,opAList,opBList,opCList,opDList,answerList,addExaminationCode);
        }else {
            layer.msg('请将题目信息填完整',{
                time:1500,
            })        }


    }
    function addtoTest() {
        info();
        var success=true;
        for(var i=0;i<titleList.length;i++){
            if(titleList[i]==""||opAList[i]==""||opBList[i]==""||opCList[i]==""||opDList[i]==""||answerList[i]==""){
                success=false;
            }
        }
        if(success){
            var append= '<br/><br/><div class="layui-form-item layui-form-pane"><label class="layui-form-label">科目名称</label><div class="layui-input-inline"><input type="text" id="addExaminationType" style="width: 200px;" required lay-verify="required" placeholder="请输入科目名称" autocomplete="off" class="layui-input"></div>';
            var addurl="/Graduation/question/addTextInfo";
            addconfirm(addurl,append);
            allList.push(titleList,opAList,opBList,opCList,opDList,answerList,addExaminationCode);
        }else {
            layer.msg('请将题目信息填完整',{
                time:1500,
            })
        }

    }
    
    function addconfirm(addurl,append){
        layer.confirm(append, {
            btn: ['确定','取消'] //按钮
        }, function(){
           var addExam=$("#addExaminationCode").val();
           var addType=$("#addExaminationType").val();
            addExaminationCode.push(addExam,addType);
            console.log(addExaminationCode);
            if(addExam==""||addType==""){
                layer.msg('信息不能为空',{
                    time:1000,

                },function () {
                    addconfirm(addurl,append);
                })

            }else{
                $.ajax({
                    url:addurl,
                    type:"POST",
                    dataType:"json",
                    contentType : "application/json",
                    data:JSON.stringify(allList),
                    success:function(data){
                        if(data.success){

                            layer.confirm("添加试题成功",{
                                    btn:["确定"]
                                },function () {
                                location.reload("/Graduation/examination/goAddTestQuestions");
                                }

                            )
                        }else {
                            layer.msg('添加试题失败',{
                                time:1500,
                            })
                        }

                    }

                });
            }

        }, function(){
            layer.msg('成功取消', {
                time: 1000, //20s后自动关闭

            });
        });


    }