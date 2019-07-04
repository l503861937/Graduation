function tree(){
   tree=$("#using_json").jstree({
        "core": {
            "data": [{
                "id":1,
                "text": "用户名",
                "state": {
                    "opened": true
                },
                "children": [{
                    "id":2,
                    "text": "权限管理",
                    "children": [{
                        "id":3,
                        "text": "在线考试",


                    },
                        {
                            "id":4,
                            "text": "自主考试",

                        },
                        {
                            "id":5,
                            "text": "查看成绩",

                        },
                        {
                            "id":6,
                            "text": "错题管理",

                        },
                        {
                            "id":7,
                            "text": "试题管理",




                        },
                        {
                            "id":10,
                            "text": "试卷管理",




                        },
                        {
                            "id":9,
                            "text": "试题添加",


                        },
                        {
                            "id":8,
                            "text": "权限控制",

                        }],
                    "state": {
                        "opened": true,

                    }
                },

                ]
            },
            ]
        },
        "checkbox" : {
            "keep_selected_style" : false
        },
        "plugins" : [  "checkbox" ]
    })
   }






function checkSub(){

    var userName=$("#authUserName").val();
    if(userName==""){
        layer.msg('请填写用户名',{
            time:1000,
        })
    }else {
        nodes=new Array();
        $.ajax({
            url:"/Graduation/test/selectAuth",
            type:"POST",
            dataType:"json",
            data:{userName:userName},
            success:function(data){

                if(data.success){
                    var authList=data.authList[0];
                    $('#using_json').jstree("destroy");
                    $('#using_json').data('jstree', false);//这个是关键，如果不清空实例，jstree不会重新生成
                    tree();

                    layer.msg("查询成功",{
                        time:2000,
                    })

                    $("#using_json").bind('ready.jstree',function (obj, e) {

                        if(authList.authorityZxks=="1"){

                            $("#using_json").jstree(true).select_node(3);


                        }
                        if (authList.authorityZzks=="1"){

                            $("#using_json").jstree(true).select_node(4);


                        }
                        if (authList.authorityCkcj=="1"){

                            $("#using_json").jstree(true).select_node(5);

                        }
                        if (authList.authorityCtgl=="1"){

                            $("#using_json").jstree(true).select_node(6);

                        }
                        if (authList.authorityStgl=="1"){

                            $("#using_json").jstree(true).select_node(7);

                        }
                        if(authList.authoritySjgl=="1"){
                            $("#using_json").jstree(true).select_node(10);
                        }
                        if (authList.authorityQxgl=="1"){

                            $("#using_json").jstree(true).select_node(8);

                        }
                        if (authList.authoritySttj=="1"){

                            $("#using_json").jstree(true).select_node(9);

                        }
                        lnode3 = $('#using_json').jstree("get_node", 3).state.selected;
                        lnode4 = $('#using_json').jstree("get_node", 4).state.selected;
                        lnode5 = $('#using_json').jstree("get_node", 5).state.selected;
                        lnode6 = $('#using_json').jstree("get_node", 6).state.selected;
                        lnode7 = $('#using_json').jstree("get_node", 7).state.selected;
                        lnode8 = $('#using_json').jstree("get_node", 8).state.selected;
                        lnode9 = $('#using_json').jstree("get_node", 9).state.selected;
                        lnode10= $('#using_json').jstree("get_node", 10).state.selected;

                    })

                }else{
                    layer.msg('并未查询到该用户',{
                        time:1200,
                    })
                }
            }

        });


    }

}




function authSub(){
    var node3 = $('#using_json').jstree("get_node", 3).state.selected;
    var node4 = $('#using_json').jstree("get_node", 4).state.selected;
    var node5 = $('#using_json').jstree("get_node", 5).state.selected;
    var node6 = $('#using_json').jstree("get_node", 6).state.selected;
    var node7 = $('#using_json').jstree("get_node", 7).state.selected;
    var node8 = $('#using_json').jstree("get_node", 8).state.selected;
    var node9 = $('#using_json').jstree("get_node", 9).state.selected;
    var node10= $('#using_json').jstree("get_node", 10).state.selected;
    console.log(lnode3,node3)
    if(lnode3==node3&&lnode4==node4&&lnode5==node5&&lnode6==node6&&lnode7==node7&&lnode8==node8&&lnode9==node9&&lnode10==node10){
        layer.msg('并未做任何的权限修改',{
            time:1000,
        })
    }else {
        var authUserName=$("#authUserName").val();
        if(node3){var Zxks="1"}else {Zxks="0"};
        if(node4){var Zzks="1"}else {Zzks="0"};
        if(node5){var Ckcj="1"} else{Ckcj="0"};
        if(node6){var Ctgl="1"} else{Ctgl="0"};
        if(node7){var Stgl="1"} else{Stgl="0"};
        if(node8){var Qxgl="1"} else{Qxgl="0"};
        if(node9){var Sttj="1"} else{Sttj="0"};
        if(node10){var Sjgl="1"} else{Sjgl="0"};
        nodes.push(Zxks,Zzks,Ckcj,Ctgl,Stgl,Qxgl,Sttj,authUserName,Sjgl);
        $.ajax({
            url:"/Graduation/test/updateAut",
            type:"POST",
            dataType:"json",
            contentType : "application/json",
            data:JSON.stringify(nodes),
            success:function(data){
                if(data.success){
                    layer.confirm("修改成功",{
                            btn:["确定"]
                        },function () {
                            location.reload("/Graduation/examination/goAddTestQuestions");
                        }

                    )
                }

            }

        });
    }



}