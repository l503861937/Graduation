// Decompiled by Jad v1.5.8g. Copyright 2001 Pavel Kouznetsov.
// Jad home page: http://www.kpdus.com/jad.html
// Decompiler options: packimports(3) 
// Source File Name:   testQuestionsImpl.java

package com.lxd.Graduation.service.impl;

import com.lxd.Graduation.dao.testQuestionsDao;
import com.lxd.Graduation.entity.testQuestions;
import com.lxd.Graduation.service.testQuestionsService;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
@Service
public class testQuestionsImpl implements testQuestionsService{
@Autowired
testQuestionsDao testQuestionsDao;

	
	public  List<testQuestions>  selectQuestionsByType(String type)
    {
        return testQuestionsDao.selectQuestionsByType(type);
    }

	public	List<testQuestions> selectQuestions(){
		return  testQuestionsDao.selectQuestions();
	}



	@Override
	//分页查询
	public List<testQuestions> selectPage(int pageSize,  int startIndex,String type) {
	
		return testQuestionsDao.selectPage(pageSize, startIndex,type);
	}

	@Override
	//总条数查询
	public int selectCount(String type) {
		// TODO Auto-generated method stub
		return testQuestionsDao.selectCount(type);
	}

	@Override
	//删除
	public int deleteQuestion(int id) {
		// TODO Auto-generated method stub
		return testQuestionsDao.deleteQuestion(id);
	}

	@Override
	//批量删除
	public int allDeleteQuestion(int id) {
		// TODO Auto-generated method stub
		return testQuestionsDao.allDeleteQuestion(id);
	}

	//修改
	public  int ChangeInfo(testQuestions questions){
   	    return testQuestionsDao.Change(questions);
	}

	//添加试题
	public int insert(testQuestions testquestions){
			return testQuestionsDao.insert(testquestions);
	};
   
}
