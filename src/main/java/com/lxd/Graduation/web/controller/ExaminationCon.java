package com.lxd.Graduation.web.controller;


import com.lxd.Graduation.entity.ExaminationTable;
import com.lxd.Graduation.entity.User;
import com.lxd.Graduation.entity.testQuestions;
import com.lxd.Graduation.service.CheckMarkService;
import com.lxd.Graduation.service.impl.ExaminationServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;
import com.lxd.Graduation.service.ExaminationService;

import javax.servlet.http.HttpServletRequest;
import java.sql.Date;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;



@Controller
@RequestMapping("/examination")
public class ExaminationCon {
    @Autowired
 private    ExaminationService examinationService;
    @Autowired
    private CheckMarkService checkMarkService;

    @RequestMapping("/GoExamination")
    public String GoExamination(){
        return "graduation/examination";
    }
    //提取试卷
    @RequestMapping("/SelectExaTable")
    @ResponseBody
    public Map<String, Object> SelectExaTable(ExaminationTable examinationTable,HttpServletRequest request){
        Map<String,Object> listExam=new ModelMap();

        List<ExaminationTable> examList= new ArrayList<ExaminationTable>();
        List<User> user= new ArrayList<>();
        String examinatiCode=request.getParameter("examinationCode");
        examinationTable.setExaminationCode(examinatiCode);
        examList=examinationService.SelectExaTableInfo(examinationTable);
        user=(List)request.getSession().getAttribute("listUser");
        String userName=user.get(0).getUserName();


        if(examList.size()>0){
            String type=examList.get(0).getExaminationType();
            Integer a=checkMarkService.selectOne(userName,type);
            if(a>0){
                listExam.put("msg",false);
            }else {
                listExam.put("msg",true);
            }
            listExam.put("examList",examList);
            listExam.put("success",true);
        }else {
            listExam.put("success",false);
            listExam.put("msg",true);
        }

        return listExam;
    }



    @RequestMapping("goAddTestQuestions")
    public  String goAddTestQuestions(){
        return "graduation/addTestQuestions";
    }


// 添加题目到试卷
    @RequestMapping(value = "/addTextInfo",method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public Map<String, Object> addTextInfo(@RequestBody List<String> [] allList,ExaminationTable examinationTable){
        Map<String,Object> list=new ModelMap();
        int j=0;

        List<String>listTitle=new ArrayList<>();
        List<String>listOpA=new ArrayList<>();
        List<String>listOpB=new ArrayList<>();
        List<String>listOpC=new ArrayList<>();
        List<String>listOpD=new ArrayList<>();
        List<String>listAnswer=new ArrayList<>();
      List<String>addExaminationCode=new ArrayList<>();

        listTitle = allList[0];
        listOpA=allList[1];
        listOpB=allList[2];
        listOpC=allList[3];
        listOpD=allList[4];
        listAnswer=allList[5];
        addExaminationCode=allList[6];
        System.out.println(addExaminationCode.get(0));
        for (int i=0;i<listTitle.size();i++){
         examinationTable.setExaminationTitle(listTitle.get(i));
         examinationTable.setExaminationA(listOpA.get(i));
         examinationTable.setExaminationB(listOpB.get(i));
         examinationTable.setExaminationC(listOpC.get(i));
         examinationTable.setExaminationD(listOpD.get(i));
         examinationTable.setExaminationAnswer(listAnswer.get(i));
        examinationTable.setExaminationCode(addExaminationCode.get(0));
        examinationTable.setExaminationType(addExaminationCode.get(1));
         j=examinationService.insert(examinationTable);
        }
        if(j>0){
            list.put("success",true);
        }else{
            list.put("success",false);
        }

        return list;
        }


  @RequestMapping("/goExaminationMag")
  public  String   goExaminationMag(){
        return "graduation/examinationMag";
  }

  //分页查询试卷
  @RequestMapping("/examinationMag")
    @ResponseBody
    public Map<String,Object> examinationMag(@RequestParam(value = "pageNum",required = true) Integer pageNum,@RequestParam(value = "code",required = false)String code){
        Map<String,Object> modeMap=new HashMap<>();
        List<ExaminationTable> listExam=new ArrayList<>();
        if(code.equals("")){
            code=null;
        }
        Integer totalCount=examinationService.selectCountType(code);
      int pageSize = 10;
      int startIndex = (pageNum-1)*pageSize;
      int totalPage = (totalCount-1)/pageSize+1;
      if(totalCount>0){
          listExam=examinationService.selectPage(code,startIndex);
      }
         if(listExam.size()>0){
             modeMap.put("success",true);
             modeMap.put("totalPage",totalPage);
             modeMap.put("listExam",listExam);
         }else {
             modeMap.put("success",false);
         }
        return modeMap;
  }
//修改操作
  @RequestMapping(value = "update" ,produces = "application/json;charset=UTF-8")
    @ResponseBody
    public Map<String,Object> update (@RequestBody ExaminationTable examinationTable){
      Map<String,Object> modeMap=new HashMap<>();
      int i=examinationService.update(examinationTable);
      if(i>0){
          modeMap.put("success",true);
      }else {
          modeMap.put("success",false);
      }
      return  modeMap;
  }
  //单个删除操作
  @RequestMapping("/delete")
    @ResponseBody
    public Map<String,Object> delete(@RequestParam(value = "id",required = true) int id  ){
      Map<String,Object> modeMap=new HashMap<>();
      int i=examinationService.delete(id);
      if(i>0){
          modeMap.put("success",true);
      }else {
          modeMap.put("success",false);
      }

      return  modeMap;
  }


    //批量删除操作
    @RequestMapping(value = "/allDelete",produces = "application/json;charset=UTF-8")
    @ResponseBody
    public Map<String,Object> allDelete(@RequestBody int[]id  ){
        Map<String,Object> modeMap=new HashMap<>();
        int i=0;
        for (int j=0;j<id.length;j++){
           i =examinationService.delete(id[j]);
            if(i>0){
                System.out.println("删除id:"+id[j]+"成功");
            }else{
                System.out.println("删除id:"+id[j]+"失败");
                break;
            }

        }

        if(i>0){
            modeMap.put("success",true);
        }else {
            modeMap.put("success",false);
        }

        return  modeMap;
    }

}



