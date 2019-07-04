package com.lxd.Graduation.service.impl;

import com.lxd.Graduation.dao.AuthorizationDao;
import com.lxd.Graduation.entity.authority;
import com.lxd.Graduation.service.AuthorizationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class AuthorizationImpl implements AuthorizationService {
@Autowired
    AuthorizationDao authorizationDao;
    //查询权限信息
    public List<authority> SelectAuthInfo(authority authority){
            return authorizationDao.SelectAuthInfo(authority);
    };


    //修改权限信息
    public  int updateInfo(authority authority){
        return authorizationDao.updateInfo(authority);
    };
}
