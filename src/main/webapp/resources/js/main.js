$(function(){
    getauthority();

})

//退出
function signOut(){
   var url="/Graduation/test/signOut";
    window.location.href=url;

}


function getauthority(){
    $.getJSON('/Graduation/test/getauthority',function(data){
        var code=data.autList[0].authority;
        $("#perpsion").text(code.authorityName);
        $("#userName").text(code.authorityNumber);

        var questions="";
        if(code.authorityZxks==1){questions+='<li class="menu-item"><a href="/Graduation/examination/GoExamination"><i class="icon-pencil2"></i><span>在线考试</span></a></li>';
        }
        if(code.authorityZzks==1){
            questions+='<li class="menu-item"><a href="/Graduation/question/gotestquestions"><i class="icon-quill"></i><span>自主考试</span></a></li>';
        }
        if (code.authorityCkcj==1) {
            questions+='<li class="menu-item"><a href="/Graduation/test/gomarkscore"><i class="icon-search"></i><span>查看成绩</span></a></li>';
        }
        if(code.authorityCtgl==1){
            questions+='<li class="menu-item"><a href="/Graduation/test/goerrormsg"><i class="icon-cross"></i><span>错题管理</span></a></li>';
        }
        if(code.authorityStgl==1){
            questions+='<li class="menu-item"><a href="/Graduation/question/goitem"><i class="icon-attachment"></i><span>试题管理</span></a></li>';
        }
        if(code.authoritySjgl==1){
            questions+='<li class="menu-item"><a href="/Graduation/examination/goExaminationMag"><i class="icon-files-empty"></i><span>试卷管理</span></a></li>';

        }
        if(code.authoritySttj==1){
            questions+='<li class="menu-item"><a href="/Graduation/examination/goAddTestQuestions"><i class="icon-file-text"></i><span>试题添加</span></a></li>';
        }


        questions+='<li class="menu-item"><a href="/Graduation/test/gochangepassword"><i class="icon-wrench"></i><span>修改密码</span></a></li>';
        if(code.authorityQxgl==1){
            questions+='<li class="menu-item"><a href="/Graduation/test/authorization"><i class="icon-key"></i><span>权限控制</span></a></li>';
        }

        $('.side-menu').append(questions);
    });
}