package com.lxd.Graduation.dao;

import com.lxd.Graduation.entity.ExaminationTable;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface ExaminationDao {

    public List<ExaminationTable> SelectExaTableInfo(ExaminationTable examinationTable);

    //添加试题
    public int insert(ExaminationTable examinationTable);

    //查询试卷数量
    public Integer selectCountType(@Param("code") String code);

    //分页查询信息
    public List<ExaminationTable> selectPage(@Param("code") String code,@Param("startIndex") int startIndex );

    //单个删除操作
    public int delete(@Param("id") int id);

    //修改数据
    public int update(ExaminationTable examinationTable);
}
