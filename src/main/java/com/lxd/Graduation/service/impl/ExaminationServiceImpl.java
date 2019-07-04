package com.lxd.Graduation.service.impl;

import com.lxd.Graduation.dao.ExaminationDao;
import com.lxd.Graduation.entity.ExaminationTable;
import com.lxd.Graduation.service.ExaminationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class ExaminationServiceImpl implements ExaminationService {
    @Autowired
    ExaminationDao examinationDao;


    //查询examinationTable信息
    public List<ExaminationTable> SelectExaTableInfo(ExaminationTable examinationTable){
        return examinationDao.SelectExaTableInfo(examinationTable);
    }

    //添加试题
    public int insert(ExaminationTable examinationTable){
        return examinationDao.insert(examinationTable);
    };

    //查询试卷数量
    public Integer selectCountType(String code){
        return examinationDao.selectCountType(code);
    }
    //分页查询信息
    public List<ExaminationTable> selectPage(String code, int startIndex ){
        return examinationDao.selectPage(code,startIndex);
    }

    //单个删除操作
    public int delete(int id){
        return examinationDao.delete(id);
    }

    //修改数据
    public int update(ExaminationTable examinationTable){
        return  examinationDao.update(examinationTable);
    }
}
