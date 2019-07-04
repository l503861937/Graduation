package com.lxd.Graduation.entity;

import java.sql.Date;

public class Mark {
	
	
	private Integer markId;
	
	private Integer markScore;
	
	private String  markSubjectType;
	
	private Date    markDate;
	
	private String  markSubjectTecher;
	
	private String  markStudentName;
	
	private String  markStudentNumber;
	
	private String  markSubjectNumber;
	
	
	
	

	public Mark(Integer markId, Integer markScore, String markSubjectType, Date markDate, String markSubjectTecher,
			String markStudentName, String markStudentNumber, String markSubjectNumber) {
		super();
		this.markId = markId;
		this.markScore = markScore;
		this.markSubjectType = markSubjectType;
		this.markDate = markDate;
		this.markSubjectTecher = markSubjectTecher;
		this.markStudentName = markStudentName;
		this.markStudentNumber = markStudentNumber;
		this.markSubjectNumber = markSubjectNumber;
	}

	public Mark() {
		super();
	}

	public Integer getMarkId() {
		return markId;
	}

	public void setMarkId(Integer markId) {
		this.markId = markId;
	}

	public Integer getMarkScore() {
		return markScore;
	}

	public void setMarkScore(Integer markScore) {
		this.markScore = markScore;
	}

	public String getMarkSubjectType() {
		return markSubjectType;
	}

	public void setMarkSubjectType(String markSubjectType) {
		this.markSubjectType = markSubjectType;
	}

	public Date getMarkDate() {
		return markDate;
	}

	public void setMarkDate(Date markDate) {
		this.markDate = markDate;
	}

	public String getMarkSubjectTecher() {
		return markSubjectTecher;
	}

	public void setMarkSubjectTecher(String markSubjectTecher) {
		this.markSubjectTecher = markSubjectTecher;
	}

	public String getMarkStudentName() {
		return markStudentName;
	}

	public void setMarkStudentName(String markStudentName) {
		this.markStudentName = markStudentName;
	}

	public String getMarkStudentNumber() {
		return markStudentNumber;
	}

	public void setMarkStudentNumber(String markStudentNumber) {
		this.markStudentNumber = markStudentNumber;
	}

	public String getMarkSubjectNumber() {
		return markSubjectNumber;
	}

	public void setMarkSubjectNumber(String markSubjectNumber) {
		this.markSubjectNumber = markSubjectNumber;
	}

	
}
