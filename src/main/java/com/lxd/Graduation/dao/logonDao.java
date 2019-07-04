package com.lxd.Graduation.dao;

import java.util.List;

import com.lxd.Graduation.entity.User;

public interface logonDao {

	List<User> checkUsername(User user);


	//住粗账户
	public int inster(User user);


	//查看账号是否重复
	public int dupCheck(User user);
}
