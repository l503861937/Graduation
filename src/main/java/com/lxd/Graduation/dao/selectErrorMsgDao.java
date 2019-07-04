package com.lxd.Graduation.dao;

import java.util.List;


import com.lxd.Graduation.entity.wrongTable;
import org.apache.ibatis.annotations.Param;

public interface selectErrorMsgDao {
   //查询错题信息
	public List<wrongTable> selecterrormsg(@Param("pageSize" )int pageSize,@Param("startIndex")int startIndex,
										   @Param("type")String type,@Param("userName")String userName);

	//插入错题信息
	public int inserInfo(wrongTable wrongtable);

	//查看总条数
	public int selectCount(@Param("type") String type,@Param("userName")String userName);

	//删除信息
	public int delInfo(@Param("id") int id);

	//通过科目查询
	public List<wrongTable> selectWrongForType(wrongTable wrongTable);
}
