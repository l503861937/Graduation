package com.lxd.Graduation.service.impl;
import  com.lxd.Graduation.entity.authority;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.lxd.Graduation.dao.logonDao;
import com.lxd.Graduation.entity.User;
import com.lxd.Graduation.service.Logon;
import com.lxd.Graduation.dao.registerAutDao;
@Service
public  class logonimpl implements Logon {
@Autowired 
logonDao logonDao;

@Autowired
registerAutDao registerAutdao;


	public List<User> checkUsername(User user) {
		// TODO Auto-generated method stub
		return logonDao.checkUsername(user);
	}

	//注册账号
	public int inster(User user){
		return  logonDao.inster(user);
	}

	public  int insterAut(authority authority){
      return registerAutdao.insterAut(authority);
	}

	//查看账号是否重复
	public int dupCheck(User user) {
	 return logonDao.dupCheck(user);
	}
}
