package com.json;

import java.util.List;

import com.pojo.EpHistory;

public class EpHistoryReportJson {

	private String name;
	private Integer epId;
	private List<EpHistory> epHistoryList;
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public List<EpHistory> getEpHistoryList() {
		return epHistoryList;
	}
	public void setEpHistoryList(List<EpHistory> epHistoryList) {
		this.epHistoryList = epHistoryList;
	}
	public Integer getEpId() {
		return epId;
	}
	public void setEpId(Integer epId) {
		this.epId = epId;
	}
	
	
	
}
