
package com.lxd.Graduation.web;

import com.lxd.Graduation.entity.*;
import com.lxd.Graduation.service.ExaminationService;
import com.lxd.Graduation.service.testQuestionsService;
import com.lxd.Graduation.service.selectErrorMsg;

import java.awt.event.ItemEvent;
import java.sql.Date;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import com.mysql.cj.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.converter.json.Jackson2ObjectMapperBuilder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.ResponseBodyEmitterReturnValueHandler;


@Controller
@RequestMapping("/question")
public class testQuestionsCon {
	
	@Autowired
	testQuestionsService testquestionsservice;
    @Autowired
	selectErrorMsg selecterrormsg;

    //存储答案
	List<String> listAnswer =new ArrayList<String>();

	List<testQuestions> listId= new ArrayList<>();


	//自主考试，提取测试题
	@RequestMapping("/testquestions")
	@ResponseBody
	public Map<String, Object> testquestions(HttpServletRequest request) {
		String type=request.getParameter("type");
		Map<String, Object> modelMap = new HashMap<>();
		List<testQuestions> listQuestions = new ArrayList<testQuestions>();
		listQuestions = testquestionsservice.selectQuestionsByType(type);

	    for (int i=0;i<listQuestions.size();i++){
	    	listAnswer.add(listQuestions.get(i).getAnswer());


		}
		listId=listQuestions;

		modelMap.put("listQuestions", listQuestions);
		return modelMap;
	}
	//跳转到自主考试页面
	@RequestMapping("/gotestquestions")
	public String goTestQuestions() {
		return "graduation/onlineExamination";
	}

	//跳转试题管理页面
	@RequestMapping("/goitem")
	public String gotiem() {

		return "graduation/item2";
	}

//获取数据中question表中科目种类
	@RequestMapping("/online")
	@ResponseBody
	public Map<String, Object> item() {
		Map<String, Object> modelMap = new HashMap<>();
		List<testQuestions> listQuestions = new ArrayList<testQuestions>();
		listQuestions = testquestionsservice.selectQuestions();
		if(listQuestions.size()>0){
			modelMap.put("listQuestions", listQuestions);
			modelMap.put("success",true);
		}else {
			modelMap.put("success",false);

		}

		return modelMap;
	}

//试题管理页面
	@RequestMapping(value = "/page")
	@ResponseBody
	public Map<String, Object> page(@RequestParam(value = "pageNum",required = true) Integer pageNum,@RequestParam(value = "type",required = false)String type,HttpServletRequest request) {
		Map<String, Object> modelMap = new HashMap<>();
		List<testQuestions> listQuestionsPage = new ArrayList<testQuestions>();
		if(type.equals("")){
			type=null;
		}
		Integer totalCount = testquestionsservice.selectCount(type);
		int pageSize = 10;
		int startIndex = (pageNum-1)*pageSize;
		int totalPage = (totalCount-1)/pageSize+1;
		Page page = new Page(pageSize, totalCount, pageNum, startIndex, totalPage);
		listQuestionsPage = testquestionsservice.selectPage(pageSize, startIndex,type);
		if(listQuestionsPage.size()>0){
			modelMap.put("listQuestionsPage", listQuestionsPage);
			modelMap.put("totalPage", totalPage);
			modelMap.put("success",true);
		}else {
			modelMap.put("success",false);
		}

		return modelMap;
	}


   //检测自我测试答案，将错题存入数据库
	@RequestMapping(value = "/checkanswer", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
	@ResponseBody
	public Map<String, Object> checkAnswer(@RequestBody String[] onlineAnswer, HttpServletRequest request) {
		List<User> listName= new ArrayList<>();
		HttpSession session =request.getSession();
		listName=(List)session.getAttribute("listUser");
        String name=listName.get(0).getUserName();
		wrongTable wrongtable = new wrongTable();
		wrongtable.setWrongSubjectStudent(listName.get(0).getRealName());
		java.util.Date date2 =new java.util.Date();
		Date date = new Date(date2.getTime());

		int sum=0;
		for (int i = 0; i < onlineAnswer.length; i++) {
			if (listAnswer.get(i).equals(onlineAnswer[i])){
				sum+=5;
			}else{
				System.out.println(listId.get(i).getiD());
				wrongtable.setWrongTitle(listId.get(i).getTitle());
				wrongtable.setWrongSubject(listId.get(i).getType());
				wrongtable.setWrongSubjectNumber(listId.get(i).getNumber());
				wrongtable.setWrongSubjectStudent(name);
				wrongtable.setWrongOptionA(listId.get(i).getOptionA());
				wrongtable.setWrongOptionB(listId.get(i).getOptionB());
				wrongtable.setWrongOptionC(listId.get(i).getOptionC());
				wrongtable.setWrongOptionD(listId.get(i).getOptionD());
				wrongtable.setWrongAnswer(listId.get(i).getAnswer());
				wrongtable.setWrongOption(onlineAnswer[i]);
				wrongtable.setWrongDate(date);
				int b = selecterrormsg.inserInfo(wrongtable);
			}
//			System.out.println(sum);
		}

		Map<String, Object> modeAnswer = new HashMap<>();
		modeAnswer.put("succes", true);
		modeAnswer.put("sum",sum);
		return modeAnswer;
	}


	//删除单个测试题目信息
	@RequestMapping(value=("/delete"),  method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
	@ResponseBody
	public Map<String, Object> delete(@RequestBody int id){
		Map<String, Object> modeMap = new HashMap<>();
		int i=0;
		i=testquestionsservice.deleteQuestion(id);
		if(i>0) {
			modeMap.put("success", true);
		}else{
			modeMap.put("success", false);
		}
		return modeMap;
	}


	//批量删除测试题目信息
	@RequestMapping(value=("/alldelete"),  method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
	@ResponseBody
	public Map<String, Object> alldelete(@RequestBody int[] checked){
		Map<String, Object> modeMap = new HashMap<>();
		int i=0;
		int id;
		for(int j=0;j<checked.length;j++) {
			 id= checked[j];
				i=testquestionsservice.deleteQuestion(id);
				// TODO: handle exception
			}
		if(i>0){
			modeMap.put("success", true);
		}else {
			modeMap.put("success", false);
		}

		return modeMap;
		}

		//修改测试题目信息
	@RequestMapping(value=("/update"), produces = "application/json;charset=UTF-8")
	@ResponseBody
	public Map<String,Object> Update( @RequestBody testQuestions questions, HttpServletRequest request){
		Map<String, Object> modeMap = new HashMap<String,Object>();
		int i=-1;
		i=testquestionsservice.ChangeInfo(questions);
		if (i>0){
			modeMap.put("success",true);
		}

		return modeMap;
	}
//添加试题到测试库
	@RequestMapping(value = "/addTextInfo",method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
	@ResponseBody
	public Map<String, Object> addTextInfo(@RequestBody List<String> [] allList, testQuestions testquestions){
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
		for (int i=0;i<listTitle.size();i++){
			testquestions.setTitle( listTitle.get(i));
			testquestions.setOptionA(listOpA.get(i));
			testquestions.setOptionB(listOpB.get(i));
			testquestions.setOptionC(listOpC.get(i));
			testquestions.setOptionD(listOpD.get(i));
			testquestions.setAnswer(listAnswer.get(i));
			testquestions.setType(addExaminationCode.get(1));
			j=testquestionsservice.insert(testquestions);
		}
		if(j>0){
			list.put("success",true);
		}

		return list;
	}




}


