package com.lxd.Graduation.service;

import com.lxd.Graduation.entity.ExaminationTable;

import java.util.List;

public interface ExaminationService {
    //查询信息
    public List<ExaminationTable> SelectExaTableInfo(ExaminationTable examinationTable);

 //添加试题
    public int insert(ExaminationTable examinationTable);

    //查询试卷数量
    public Integer selectCountType(String code);

    //分页查询信息
    public List<ExaminationTable> selectPage(String code,int startIndex );

    //单个删除操作
    public int delete(int id);

    //修改数据
    public int update(ExaminationTable examinationTable);
}
