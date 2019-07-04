package com.lxd.Graduation.dao;

import com.lxd.Graduation.entity.authority;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface AuthorizationDao {

    public List<authority> SelectAuthInfo(authority authority);

    //修改权限信息
    public  int updateInfo(authority authority);
}
