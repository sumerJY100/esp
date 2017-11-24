package com.json;

import java.util.List;

import com.pojo.Ep;
import com.pojo.Hopper;

public class HopperJson {

	private Integer epId;
	private Ep ep;
	private List<Hopper> hopperList;
	public Integer getEpId() {
		return epId;
	}
	public void setEpId(Integer epId) {
		this.epId = epId;
	}
	public Ep getEp() {
		return ep;
	}
	public void setEp(Ep ep) {
		this.ep = ep;
	}
	public List<Hopper> getHopperList() {
		return hopperList;
	}
	public void setHopperList(List<Hopper> hopperList) {
		this.hopperList = hopperList;
	}
}
