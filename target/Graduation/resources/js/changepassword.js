/**
 *
 */
function changeSub() {
    var userNameId=$("#changeUserName").val();

    var newPasswordId = $("#changeNewPad").val();
    var idNumber = $("#changeidNumber").val();
    var number = $("#changeNumber").val();

    var changePassword={
        "userName":userNameId,
        "passWord":newPasswordId,
        "idNumber":idNumber,
        "number":number,


    };
    if(userNameId==("")||newPasswordId==("")||idNumber==("")||number==("")){
       layer.msg("请将信息填完整",{
           time:2000,
        })
    }else(  $.ajax({
        url: "/Graduation/test/changepassword",
        type: "POST",
        dataType: "json",
        contentType :"application/json;charset=utf-8",
        data:JSON.stringify(changePassword),


        success: function (data) {
            if (data.success == true) {
                layer.msg("修改成功",{
                    time:2000,
                });

            }else {
                layer.msg("修改失败，输入信息有误",{
                    time:2000,
                });
            }


        },


    }))


}
