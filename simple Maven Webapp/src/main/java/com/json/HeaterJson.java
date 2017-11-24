package com.json;

import java.util.List;

import com.pojo.Heater;
import com.pojo.HeaterTemprator;

public class HeaterJson {

	private Integer heaterTempratorId;
	private HeaterTemprator heaterTemprator;
	
	private List<Heater> heaterList;

	public Integer getHeaterTempratorId() {
		return heaterTempratorId;
	}

	public void setHeaterTempratorId(Integer heaterTempratorId) {
		this.heaterTempratorId = heaterTempratorId;
	}

	public HeaterTemprator getHeaterTemprator() {
		return heaterTemprator;
	}

	public void setHeaterTemprator(HeaterTemprator heaterTemprator) {
		this.heaterTemprator = heaterTemprator;
	}

	public List<Heater> getHeaterList() {
		return heaterList;
	}

	public void setHeaterList(List<Heater> heaterList) {
		this.heaterList = heaterList;
	}
	
	
}
