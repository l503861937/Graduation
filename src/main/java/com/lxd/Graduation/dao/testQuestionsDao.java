package com.lxd.Graduation.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.lxd.Graduation.entity.testQuestions;

public interface testQuestionsDao {
	//通过科目查询
	public List<testQuestions> selectQuestionsByType(@Param("type")String type);

   //查询试题信息
	public List<testQuestions> selectQuestions();

	
	//分页查询
	
	public List<testQuestions> selectPage(@Param("pageSize") int pageSize,@Param("startIndex") int startIndex,@Param("type")String type);
	
	//查询总条数
	public int selectCount(@Param("type")String type);
	
	//删除
	public int deleteQuestion(int id);
	
	//批量删除
	public int allDeleteQuestion(int id);

	//修改
	public int Change(testQuestions questions);


	//添加试题
	public int insert(testQuestions testquestions);
	
}


  