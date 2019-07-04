
package com.lxd.Graduation.entity;


public class testQuestions
{

    public testQuestions()
    {
    }

    public testQuestions(Integer iD, String type, String title, String answer, String optionA, String optionB, String optionC, 
            String optionD, String number)
    {
        this.iD = iD;
        Type = type;
        Title = title;
        Answer = answer;
        OptionA = optionA;
        OptionB = optionB;
        OptionC = optionC;
        OptionD = optionD;
        Number = number;
    }

    public Integer getiD()
    {
        return iD;
    }

    public void setiD(Integer iD)
    {
        this.iD = iD;
    }

    public String getType()
    {
        return Type;
    }

    public void setType(String type)
    {
        Type = type;
    }

    public String getTitle()
    {
        return Title;
    }

    public void setTitle(String title)
    {
        Title = title;
    }

    public String getAnswer()
    {
        return Answer;
    }

    public void setAnswer(String answer)
    {
        Answer = answer;
    }

    public String getOptionA()
    {
        return OptionA;
    }

    public void setOptionA(String optionA)
    {
        OptionA = optionA;
    }

    public String getOptionB()
    {
        return OptionB;
    }

    public void setOptionB(String optionB)
    {
        OptionB = optionB;
    }

    public String getOptionC()
    {
        return OptionC;
    }

    public void setOptionC(String optionC)
    {
        OptionC = optionC;
    }

    public String getOptionD()
    {
        return OptionD;
    }

    public void setOptionD(String optionD)
    {
        OptionD = optionD;
    }

    public String getNumber()
    {
        return Number;
    }

    public void setNumber(String number)
    {
        Number = number;
    }

    private Integer iD;
    private String Type;
    private String Title;
    private String Answer;
    private String OptionA;
    private String OptionB;
    private String OptionC;
    private String OptionD;
    private String Number;
}
