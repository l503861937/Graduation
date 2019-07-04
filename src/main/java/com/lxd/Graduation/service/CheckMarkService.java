package com.lxd.Graduation.service;

import com.lxd.Graduation.entity.Mark;

import java.util.List;

public interface CheckMarkService {

    //查询成绩信息
    public List<Mark> selectMarkInfo( Integer startIndex,String type,String userName);

    //查询中记录数
    public  Integer selectCountByUserName(String userName,String type);

    //通过学号科目修改成绩
    public int updataMark(String type,String number,String mark);

    //通过markId删除信息
    public int delete(String markId);

    //添加成绩
    public int insert(Mark mark);

    //查询个人成绩
    public Integer selectOne(String userName,String type);
}
