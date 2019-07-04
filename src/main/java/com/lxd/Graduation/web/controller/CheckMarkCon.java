package com.lxd.Graduation.web.controller;


import com.lxd.Graduation.entity.Mark;
import com.lxd.Graduation.entity.User;
import com.lxd.Graduation.service.CheckMarkService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.sql.Date;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/check")
public class CheckMarkCon {
@Autowired
    CheckMarkService checkMarkService;


//提取成绩信息
    @RequestMapping("/checkMark")
    @ResponseBody
    public Map<String,Object> checkMark(@RequestParam(value ="pageNum",required = false) Integer pageNum,
                                        @RequestParam(value ="type",required =true) String type, HttpServletRequest request){

        Map<String,Object> modeMap=new HashMap<>();
        List<User> listMark=new ArrayList<>();
        List<Mark> listMarkInfo=new ArrayList<>();
        listMark= (List)request.getSession().getAttribute("listUser");
        String userName="";
       String idName= listMark.get(0).getAuthority().getAuthorityName();
       if(idName.equals("student")){
           userName =listMark.get(0).getAuthority().getAuthorityNumber();
       }
       if(idName.equals("teacher")){
            userName=null;
        }
        if(type.equals("")){
            type=null;
        }
        int pageSize = 10;
        int startIndex = (pageNum-1)*pageSize;
        int totalCount=checkMarkService.selectCountByUserName(userName,type);
        int totalPage = (totalCount-1)/pageSize+1;

        listMarkInfo=  checkMarkService.selectMarkInfo(startIndex,type,userName);
        if(listMarkInfo.size()>0){
            modeMap.put("success",true);
            modeMap.put("totalPage",totalPage);
            modeMap.put("listMarkInfo",listMarkInfo);
            modeMap.put("idName",idName);
        }else {
            modeMap.put("success",false);
        }
        return modeMap;
    }
//修改成绩信息
    @RequestMapping("/updata")
    @ResponseBody
    public Map<String,Object> updata(@RequestParam(value ="type",required = true) String type,
                                     @RequestParam(value ="number",required =true) String number,
                                     @RequestParam(value="mark",required = true)String mark){
        Map<String,Object> modeMap=new HashMap<>();
        int i=0;
        i=checkMarkService.updataMark(type,number,mark);
        if(i>0){
            modeMap.put("success",true);
        }else {
            modeMap.put("success",false);
        }
        return  modeMap;
    }
//删除成绩信息
    @RequestMapping("/delete")
    @ResponseBody
    public Map<String,Object> delete(@RequestParam(value ="mariId",required = true) String mariId){
        Map<String,Object> modeMap=new HashMap<>();
        int i=0;
        i=checkMarkService.delete(mariId);
        if(i>0){
            modeMap.put("success",true);
        }else {
            modeMap.put("success",false);
        }
        return  modeMap;
    }

    //添加考试成绩
    @RequestMapping("/addMark")
    @ResponseBody
    public  Map<String, Object> addMark(@RequestParam(value ="examType",required = true) String examType,
                                        @RequestParam(value ="sum",required =true) Integer sum,Mark mark,
                                        HttpServletRequest request){
        Map<String,Object> modelMap=new ModelMap();
        List<User> listUser=new ArrayList<>();
        java.util.Date date2 =new java.util.Date();
        Date date = new Date(date2.getTime());
        listUser= (List)request.getSession().getAttribute("listUser");
        String userName=listUser.get(0).getUserName();
        String relName=listUser.get(0).getRealName();
        mark.setMarkDate(date);
        mark.setMarkSubjectType(examType);
        mark.setMarkScore(sum);
        mark.setMarkStudentNumber(userName);
        mark.setMarkStudentName(relName);
        int i=0;
        i=checkMarkService.insert(mark);
        if(i>0){
            modelMap.put("success",true);

        }else {
            modelMap.put("suceess",false);
        }
        return modelMap;
    }

}
