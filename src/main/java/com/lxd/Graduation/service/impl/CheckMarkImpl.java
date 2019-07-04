package com.lxd.Graduation.service.impl;

import com.lxd.Graduation.dao.CheckMarkDao;
import com.lxd.Graduation.entity.Mark;
import com.lxd.Graduation.service.CheckMarkService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CheckMarkImpl implements CheckMarkService {

    @Autowired
    CheckMarkDao checkMarkDao;
    //查询成绩信息
    public List<Mark> selectMarkInfo(Integer startIndex,String type,String userName){
   return checkMarkDao.selectMarkInfo(startIndex,type,userName);
    }

    //查询中记录数
    public  Integer selectCountByUserName(String userName,String type){
        return checkMarkDao.selectCountByUserName(userName,type);
    }

    //通过学号科目修改成绩
    public int updataMark(String type,String number,String mark){
        return checkMarkDao.updataMark(type,number,mark);


    }
    //通过markId删除信息
    public int delete(String markId){
        return checkMarkDao.delete(markId);
    };


    //添加成绩
    public int insert(Mark mark){
        return checkMarkDao.insert(mark);
    }

    //查询个人成绩
    public Integer selectOne(String userName,String type){
        return checkMarkDao.selectOne(userName,type);
    };
}
