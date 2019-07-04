package com.lxd.Graduation.dao;

import com.lxd.Graduation.entity.Mark;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface CheckMarkDao {
    //查询成绩信息
    public List<Mark> selectMarkInfo(@Param("startIndex")Integer startIndex,@Param("type")String type,@Param("userName")String userName);

    //查询中记录数
    public  Integer selectCountByUserName(@Param("userName") String userName,@Param("type") String type);

    //通过学号科目修改成绩
    public int updataMark(@Param("type") String type,@Param("number") String number,@Param("mark")String mark);

    //通过markId删除信息
    public int delete(@Param("markId") String markId);

    //添加成绩
    public int insert(Mark mark);


    //查询个人成绩
    public Integer selectOne(@Param("userName")String userName,@Param("type")String type);

}
