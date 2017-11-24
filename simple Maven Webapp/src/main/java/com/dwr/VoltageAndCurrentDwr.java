package com.dwr;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.annotation.Resource;

import net.sf.json.JSONArray;

import org.springframework.stereotype.Component;

import com.manager.EpHistoryManager;
import com.manager.EpManager;
import com.pojo.Ep;

@Component
public class VoltageAndCurrentDwr {
	@Resource
	private EpManager epManager;
	@Resource
	private EpHistoryManager epHistoryManager;

	/**
	 * 获取当前的一、二次电压与电流
	 * 
	 * @return
	 */
	public String getCurrentVoltageAndCurrent() {
		Map<String, List<Float>> map = null;
		boolean flag = false;
		if (flag) {
			map = new HashMap<String, List<Float>>();
			map.put("firstVoltage", this.getCurrentFirstVoltage());
			map.put("firstCurrent", this.getCurrentFirstCurrent());
			map.put("secondVoltage", this.getCurrentSecondVoltage());
			map.put("secondCurrent", this.getCurrentSecondCurrent());
		} else {
			map = getCurrentVoltageAndCurrentMap();
		}
		JSONArray json = JSONArray.fromObject(map);
		return json.toString();
	}

	private Map<String, List<Float>> getCurrentVoltageAndCurrentMap() {
		Map<String, List<Float>> map = new HashMap<String, List<Float>>();
		List<Ep> epList = epManager.findAll();
		List<Float> firstVoltageList = new ArrayList<Float>();
		List<Float> firstCurrentList = new ArrayList<Float>();
		List<Float> secondVoltageList = new ArrayList<Float>();
		List<Float> secondCurrentList = new ArrayList<Float>();
		for (Ep ep : epList) {
			firstVoltageList.add(null== ep.getPrimaryVoltageReading()?0f:ep.getPrimaryVoltageReading());
			firstCurrentList.add(null==ep.getPrimaryCurrentReading()?0f:ep.getPrimaryCurrentReading());
			secondVoltageList.add(null==ep.getSecondVoltageReading()?0f:ep.getSecondVoltageReading());
			secondCurrentList.add(null==ep.getSecondCurrentReading()?0f:ep.getSecondCurrentReading());
		}
		map.put("firstVoltage", firstVoltageList);
		map.put("firstCurrent", firstCurrentList);
		map.put("secondVoltage", secondVoltageList);
		map.put("secondCurrent", secondCurrentList);
		return map;
	}

	/**
	 * 获取二次电流数据
	 * 
	 * @return
	 */
	private List<Float> getCurrentSecondCurrent() {
		List<Float> list = new ArrayList<Float>();
		for (int i = 0; i < 16; i++) {
			list.add((float) (Math.random() * 20 + 80));
		}
		return list;
	}

	/**
	 * 获取二次电压数据
	 * 
	 * @return
	 */
	private List<Float> getCurrentSecondVoltage() {
		List<Float> list = new ArrayList<Float>();
		for (int i = 0; i < 16; i++) {
			list.add((float) (Math.random() * 20 + 80));
		}
		return list;
	}

	/**
	 * 获取一次电流数据
	 * 
	 * @return
	 */
	private List<Float> getCurrentFirstCurrent() {
		List<Float> list = new ArrayList<Float>();
		for (int i = 0; i < 16; i++) {
			list.add((float) (Math.random() * 5 + 80));
		}
		return list;
	}

	/**
	 * 获取一次电压数据
	 * 
	 * @return
	 */
	private List<Float> getCurrentFirstVoltage() {
		List<Float> list = new ArrayList<Float>();
		for (int i = 0; i < 16; i++) {
			list.add((float) (Math.random() * 20 + 80));
		}
		return list;
	}
}
