package com.lxd.Graduation.service.impl;

import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.lxd.Graduation.dao.selectErrorMsgDao;
import com.lxd.Graduation.entity.wrongTable;
@Service
public class selectErrorMsgImpl implements com.lxd.Graduation.service.selectErrorMsg{

	@Autowired
	selectErrorMsgDao selecterrormsgDao;
	@Override
	//查询错题信息
	public List<wrongTable> selecterrormsg(int pageSize, int startIndex,String type,String userName) {
		
		return selecterrormsgDao.selecterrormsg(pageSize, startIndex,type,userName);
	}

	//插入错题信息
	public  int inserInfo(wrongTable wrongtable){

		return selecterrormsgDao.inserInfo(wrongtable);
	}

	//查看总条数
	public int selectCount(String type,String userName){

		return  selecterrormsgDao.selectCount(type,userName);
	};

	//删除信息
	public int delInfo(int id){

		return selecterrormsgDao.delInfo(id);
	};

	//通过科目查询
	public List<wrongTable> selectWrongForType(wrongTable wrongTable){
		return selecterrormsgDao.selectWrongForType(wrongTable);
	};

}
