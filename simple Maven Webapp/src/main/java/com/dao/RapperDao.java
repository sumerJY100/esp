package com.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import base.dao.BaseDao;
import base.dao.BaseDaoForAnnotation;

import com.pojo.Rapper;

@Repository
public class RapperDao extends BaseDaoForAnnotation<Rapper, Integer> {

	public Rapper findAnodeRapperByEp(Integer epId) {
		Rapper rapper = findRapperByEp(epId,0);
		return rapper;
	}
	public Rapper findCathodeRapperByEp(Integer epId){
		Rapper rapper = findRapperByEp(epId,1);
		return rapper;
	}
	/**
	 * 
	 * @param epId
	 * @param rapperType	0为阳极、1为阴极
	 * @return
	 */
	public Rapper findRapperByEp(Integer epId,Integer rapperType){
		Rapper rapper = null;
		List<Rapper> list = this.findByPropertys(new String[]{"epId","rapperType"}, new Object[]{epId,rapperType}, true, BaseDao.QUERY_CONNECT_AND);
		if(null != list && list.size() > 0)
			return list.get(0);
		return rapper;
	}
}
