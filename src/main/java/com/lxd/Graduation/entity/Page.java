package com.lxd.Graduation.entity;

public class Page {

	private int pageSize;  //分页大小
	private int totalCount; //总条数
	private int pageNum;  //页数
	private int startIndex; //分页下标
	private int totalPage;  //总页数 
	

	public Page(int pageSize, int totalCount, int pageNum,int startIndex,int totalPage) {
		super();
		this.pageSize = pageSize;
		this.totalCount = totalCount;
		this.pageNum = pageNum;
		this.startIndex=(pageNum-1)*pageSize;
		this.totalPage=(totalCount-1)/pageSize+1;
	}
	public int getPageSize() {
		return pageSize;
	}
	public void setPageSize(int pageSize) {
		this.pageSize = pageSize;
	}
	public int getTotalCount() {
		return totalCount;
	}
	public void setTotalCount(int totalCount) {
		this.totalCount = totalCount;
	}
	public int getPageNum() {
		return pageNum;
	}
	public void setPageNum(int pageNum) {
		this.pageNum = pageNum;
	}
	public int getStartIndex() {
		return startIndex;
	}
	public void setStartIndex(int startIndex) {
		this.startIndex = startIndex;
	}
	public int getTotalPage() {
		return totalPage;
	}
	public void setTotalPage(int totalPage) {
		this.totalPage = totalPage;
	}
	
	
	
	
	
	
	
}
