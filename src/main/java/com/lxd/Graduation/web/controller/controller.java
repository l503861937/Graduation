

package com.lxd.Graduation.web.controller;

import com.lxd.Graduation.entity.*;
import com.lxd.Graduation.service.*;

import java.util.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/test")

public class controller
{
@Autowired
    private Logon logon;
@Autowired
    private changePassword changepassword;


@Autowired
    private selectErrorMsg selecterrormsg;
@Autowired
    private AuthorizationService authorizationService;


//登录页面挑战
@RequestMapping(value = "/login" )
    public String Logon()
    {   

        return "graduation/logon";
    }


    //退出登录
    @RequestMapping("/signOut")
    public String  signOut(HttpServletRequest request){
    request.getSession().setAttribute("listUser",null);
    System.out.println("**************");
    return "graduation/logon";
    }


//登录验证
@RequestMapping(value="/logonCheck")
@ResponseBody
    public Map<String, Object> logonCheck(HttpServletRequest request)
    {
        System.out.println(request.getSession().getAttributeNames());
        String userName = request.getParameter("userName");
        String passWord = request.getParameter("passWord");
        Map<String, Object> modelMap = new HashMap<>();
        User user = new User();
        user.setUserName(userName);
        user.setPassWord(passWord);
        List<User>  listUser= new ArrayList<User>();
        listUser = logon.checkUsername(user);
        HttpSession session = request.getSession();
        session.setAttribute("listUser",listUser);
        if(listUser.size() > 0)
        {
            modelMap.put("success", true);

        } else
        {
            modelMap.put("success", false);
        }
        return modelMap;
    }

//跳转到主页面
    @RequestMapping (value="/gomaininterface")
    public  String gomaininterface(){
    return "graduation/main";
    }

//主页显示
@RequestMapping (value="/welcome")
public  String welcome(){
    return "graduation/welcome";
}

//查看用户权限
@RequestMapping("/getauthority")
@ResponseBody
    public Map<String,Object> getAuthority(HttpServletRequest request)
    {   Map<String,Object> modeMap=new HashMap<>();
    	List<User> autList = new ArrayList<>();
    	HttpSession session=request.getSession();
        autList =(List)session.getAttribute("listUser");
        modeMap.put("autList",autList);
        return modeMap;
    }
    //跳转修改密码页面
@RequestMapping("/gochangepassword")
    public String goChangePassWord()
    {
        return "graduation/changePassword";
    }


    //修改密码
@RequestMapping(value = "/changepassword",method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
@ResponseBody
    public Map<String, Object> changepassword(@RequestBody User user)
    {
        int row = -1;

        row = changepassword.update(user);
        Map<String, Object> modelMap = new HashMap<>();
        if(row >0)
            modelMap.put("success", true);
        else
            modelMap.put("success",false);
        return modelMap;
    }

    //跳转注册页面
    @RequestMapping("/GoRegister")
    public String GoRegister(){
        return  "graduation/register";
    }


    //注册用户信息，分配用户权限
@RequestMapping("/register")
@ResponseBody

public Map<String, Object> register(User user,authority aut,HttpServletRequest request)
    {
        Map<String, Object> modelMap = new HashMap<>();
       user.setRealName(request.getParameter("realName"));
        user.setUserName(request.getParameter("userName"));
        user.setPassWord(request.getParameter("passWord"));
        user.setIdNumber(request.getParameter("idNumber"));
        user.setNumber(request.getParameter("number"));
        String sex=request.getParameter("sex");
        if (sex.equals("student")){
            aut.setAuthorityNumber(request.getParameter("userName"));
            aut.setAuthorityName(sex);
            aut.setAuthorityZxks("1");
            aut.setAuthorityZzks("1");
            aut.setAuthorityCkcj("1");
            aut.setAuthorityCtgl("1");
            aut.setAuthorityStgl("0");
            aut.setAuthorityQxgl("0");
            aut.setAuthoritySttj("0");
            aut.setAuthoritySjgl("0");

        }else{
            if (sex.equals("teacher")){
                aut.setAuthorityNumber(request.getParameter("userName"));
                aut.setAuthorityName(sex);
                aut.setAuthorityZxks("0");
                aut.setAuthorityZzks("0");
                aut.setAuthorityCkcj("1");
                aut.setAuthorityCtgl("0");
                aut.setAuthorityStgl("1");
                aut.setAuthorityQxgl("0");
                aut.setAuthoritySttj("1");
                aut.setAuthoritySjgl("1");
            }
        }
        Integer j=logon.dupCheck(user);
        if(j>0){
            modelMap.put("success", false);
        }else {

            int i=logon.inster(user);
            i=logon.insterAut(aut);
            if(i>0){
                modelMap.put("success", true);
            }else {
                modelMap.put("success", false);
            }
        }

        return modelMap;
    }

//跳转查看成绩页面
@RequestMapping("/gomarkscore")
public String goMarkScore() {
	return "graduation/checkMark";
}


//跳转错题页面
@RequestMapping(value = "/goerrormsg")
    public String goErrorMsg() {
	return "graduation/errormsg";
}


//查询错题信息
@RequestMapping(value = "/errormsg" ,method = RequestMethod.POST)
@ResponseBody
    public Map<String , Object> errormsg(@RequestParam(value ="pageNum",required = false) Integer pageNum,
                                         @RequestParam(value ="type",required =true) String type,HttpServletRequest request){
	Map<String, Object> modeMap=new HashMap<>();
	List<wrongTable> listWrong=new ArrayList<>();
	HttpSession session=request.getSession();
    List<User> listuser= new ArrayList<User>();
    listuser=(List)session.getAttribute("listUser");
    String userName=listuser.get(0).getUserName();
	if(type==""){
	    type=null;
    }
    Integer totalCount=selecterrormsg.selectCount(type,userName);
    int pageSize=10;
    int startIndex = (pageNum-1)*pageSize;
    int totalPage = (totalCount-1)/pageSize+1;
	listWrong=selecterrormsg.selecterrormsg(pageSize, startIndex,type,userName);
	if(listWrong.size()>0){
        modeMap.put("totalCount",totalCount);
        modeMap.put("totalPage", totalPage);
        modeMap.put("listWrong",listWrong);
        modeMap.put("success",true);
    }else {
	    modeMap.put("success",false);
    }

	return modeMap;
	
}
//删除单个错题信息
    @RequestMapping(value = "/deleteWrong",method=RequestMethod.POST,produces = "application/json;charset=UTF-8")
    @ResponseBody
    public Map<String,Object> deleteWrong(@RequestBody int id,HttpServletRequest request ){
        Map<String,Object> modeMap=new HashMap<>();
           int i=selecterrormsg.delInfo(id);
        if(i>0){
            modeMap.put("success",true);
        }else {
            modeMap.put("success",false);
        }
        return  modeMap;
    }

    //批量删除错题信息
    @RequestMapping(value = "/deletAll",method=RequestMethod.POST,produces = "application/json;charset=UTF-8")
    @ResponseBody
    public Map<String,Object> deletAll(@RequestBody int [] idd,HttpServletRequest request ){
        Map<String,Object> modeMap=new HashMap<>();
        int j=0;
        for (int i =0;i<idd.length;i++){
            int id=idd[i];
            j=selecterrormsg.delInfo(id);
        }


        if(j>0){
            modeMap.put("success",true);
        }
        return  modeMap;
    }


//跳转权限管理页面
@RequestMapping( "/authorization")
    public String Authorization(){

    return "graduation/authorization";
}

//查询用户权限
@RequestMapping(value = "/selectAuth",method=RequestMethod.POST)
@ResponseBody
    public Map<String,Object> SelectAuth(authority authority,HttpServletRequest request ){
    Map<String,Object> modeMap=new HashMap<>();
    List<authority> authList = new ArrayList<>();
    authority.setAuthorityNumber(request.getParameter("userName"));
    authList=authorizationService.SelectAuthInfo(authority);
    if (authList.size()>0){
        modeMap.put("success",true);
        modeMap.put("authList",authList);
    }else{
        modeMap.put("success",false);
    }
    return  modeMap;
}

//修改权限
    @RequestMapping(value = "/updateAut",method=RequestMethod.POST,produces = "application/json;charset=UTF-8")
    @ResponseBody
   public Map<String,Object> upDataAut(@RequestBody String [] nodes,authority authority,HttpServletRequest request){
    Map<String,Object> modeMap= new HashMap<>();
    int i=0;
        if (nodes[0].equals("1")){authority.setAuthorityZxks("1"); }else{authority.setAuthorityZxks("0");}
        if (nodes[1].equals("1")){authority.setAuthorityZzks("1"); }else{authority.setAuthorityZzks("0");}
        if (nodes[2].equals("1")){authority.setAuthorityCkcj("1"); }else{authority.setAuthorityCkcj("0");}
        if (nodes[3].equals("1")){authority.setAuthorityCtgl("1"); }else{authority.setAuthorityCtgl("0");}
        if (nodes[4].equals("1")){authority.setAuthorityStgl("1"); }else{authority.setAuthorityStgl("0");}
        if (nodes[5].equals("1")){authority.setAuthorityQxgl("1"); }else{authority.setAuthorityQxgl("0");}
        if (nodes[6].equals("1")){authority.setAuthoritySttj("1"); }else{authority.setAuthoritySttj("0");}
        if (nodes[8].equals("1")){authority.setAuthoritySjgl("1"); }else{authority.setAuthoritySjgl("0");}
        authority.setAuthorityNumber(nodes[7]);
        i=authorizationService.updateInfo(authority);
        if (i>0){
            modeMap.put("success",true);
        }else {
            modeMap.put("success",false);
        }

    return modeMap;
    }


}
