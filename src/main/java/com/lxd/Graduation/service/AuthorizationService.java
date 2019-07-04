package com.lxd.Graduation.service;

import java.util.List;
import com.lxd.Graduation.entity.authority;
public interface AuthorizationService {

    //查询权限信息
    public List<authority> SelectAuthInfo(authority authority);

    //修改权限信息
    public  int updateInfo(authority authority);
}
