package com.lxd.Graduation.service;

import java.util.List;
import  com.lxd.Graduation.entity.authority;


import com.lxd.Graduation.entity.User;

public interface Logon {

	List<User> checkUsername(User user);

	//注册账号
	public int inster(User user);

	public int insterAut(authority authority);

	//查看账号是否重复
	public int dupCheck(User user);
}
