package com.lxd.Graduation.service;

import java.util.List;

import com.lxd.Graduation.entity.wrongTable;

public interface selectErrorMsg {
	//查询错题信息
	public List<wrongTable> selecterrormsg(int pageSize, int startIndex,String type,String userName);

	//插入错题信息
	public int inserInfo(wrongTable wrongtable);

	//查看总条数
	public int selectCount(String type,String userName);

	//删除信息
	public int delInfo(int id);

	//通过科目查询
	public List<wrongTable> selectWrongForType(wrongTable wrongTable);

}
