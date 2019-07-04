package com.lxd.Graduation.service.impl;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.lxd.Graduation.dao.changePasswordDao;
import com.lxd.Graduation.entity.User;
import com.lxd.Graduation.service.changePassword;
@Service
public class changePasswordImpl implements changePassword {

	@Autowired 
	changePasswordDao changepasswordDao;
	public int update(User user) {
	             
		return   changepasswordDao.update(user);
	       
	}

}
