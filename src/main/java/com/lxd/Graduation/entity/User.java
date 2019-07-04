// Decompiled by Jad v1.5.8g. Copyright 2001 Pavel Kouznetsov.
// Jad home page: http://www.kpdus.com/jad.html
// Decompiler options: packimports(3) 
// Source File Name:   User.java

package com.lxd.Graduation.entity;


// Referenced classes of package com.lxd.testsysytem.entity:
//            authority

public class User
{
	
    private Integer userId;
    private String userName;
    private String realName;
    private String passWord;
    private String grade;
    private String idNumber;
    private String number;
    private authority authority;

    public User(Integer userId, String userName,String realName, String passWord, String grade, String idNumber, String number, authority authority)
    {
        this.userId = userId;
        this.userName = userName;
        this.realName = realName;
        this.passWord = passWord;
        this.grade = grade;
        this.idNumber = idNumber;
        this.number = number;
        this.authority = authority;
    }

    public User()
    {
    }

    public Integer getUserId()
    {
        return userId;
    }

    public void setUserId(Integer userId)
    {
        this.userId = userId;
    }

    public String getUserName()
    {
        return userName;
    }

    public void setUserName(String userName)
    {
        this.userName = userName;
    }

    public String getPassWord()
    {
        return passWord;
    }

    public void setPassWord(String passWord)
    {
        this.passWord = passWord;
    }

    public String getGrade()
    {
        return grade;
    }

    public void setGrade(String grade)
    {
        this.grade = grade;
    }

    public String getIdNumber()
    {
        return idNumber;
    }

    public void setIdNumber(String idNumber)
    {
        this.idNumber = idNumber;
    }

    public String getNumber()
    {
        return number;
    }

    public void setNumber(String number)
    {
        this.number = number;
    }

    public authority getAuthority()
    {
        return authority;
    }

    public void setAuthority(authority authority)
    {
        this.authority = authority;
    }

    public String getRealName() {
        return realName;
    }

    public void setRealName(String realName) {
        this.realName = realName;
    }


}
