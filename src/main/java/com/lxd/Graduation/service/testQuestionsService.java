package com.lxd.Graduation.service;

import java.util.List;

import com.lxd.Graduation.entity.testQuestions;

public interface testQuestionsService {
     //通过科目查询
      public	List<testQuestions> selectQuestionsByType(String type);


      //查询试题
      public	List<testQuestions> selectQuestions();


      
      
      //分页查询
      
      public List<testQuestions> selectPage(int pageSize,int startIndex,String type);
     
      
      //查询总条数
      public int selectCount(String type);
      
      
      //删除
      public int deleteQuestion(int id);
      
      //批量删除
      public int allDeleteQuestion(int id);

      //修改
      public int ChangeInfo(testQuestions questions);

    //添加试题
      public int insert(testQuestions testquestions);
      
}
