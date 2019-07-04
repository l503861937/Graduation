package com.lxd.Graduation.entity;

public class ExaminationTable {

    private int examinationId;

    private String examinationTitle;

    private String examinationA;

    private String examinationB;

    private String examinationC;

    private String examinationD;

    private String examinationAnswer;

    private String examinationCode;

    private String examinationType;



    public ExaminationTable() {
        super();
    }

    public ExaminationTable(int examinationId, String examinationTitle, String examinationA,
                            String examinationB, String examinationC, String examinationD,
                            String examinationAnswer, String examinationCode, String examinationType) {
        this.examinationId = examinationId;
        this.examinationTitle = examinationTitle;
        this.examinationA = examinationA;
        this.examinationB = examinationB;
        this.examinationC = examinationC;
        this.examinationD = examinationD;
        this.examinationAnswer = examinationAnswer;
        this.examinationCode = examinationCode;
        this.examinationType=examinationType;
    }

    public int getExaminationId() {
        return examinationId;
    }

    public void setExaminationId(int examinationId) {
        this.examinationId = examinationId;
    }

    public String getExaminationTitle() {
        return examinationTitle;
    }

    public void setExaminationTitle(String examinationTitle) {
        this.examinationTitle = examinationTitle;
    }

    public String getExaminationA() {
        return examinationA;
    }

    public void setExaminationA(String examinationA) {
        this.examinationA = examinationA;
    }

    public String getExaminationB() {
        return examinationB;
    }

    public void setExaminationB(String examinationB) {
        this.examinationB = examinationB;
    }

    public String getExaminationC() {
        return examinationC;
    }

    public void setExaminationC(String examinationC) {
        this.examinationC = examinationC;
    }

    public String getExaminationD() {
        return examinationD;
    }

    public void setExaminationD(String examinationD) {
        this.examinationD = examinationD;
    }

    public String getExaminationAnwser() {
        return examinationAnswer;
    }

    public void setExaminationAnswer(String examinationAnswer) {
        this.examinationAnswer = examinationAnswer;
    }

    public String getExaminationCode() {
        return examinationCode;
    }

    public void setExaminationCode(String examinationCode) {
        this.examinationCode = examinationCode;
    }
    public String getExaminationType() {
        return examinationType;
    }

    public void setExaminationType(String examinationType) {
        this.examinationType = examinationType;
    }
}
