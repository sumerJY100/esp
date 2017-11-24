package com.dao;

import java.util.List;
import org.springframework.stereotype.Repository;

import com.pojo.Ep;

import base.dao.BaseDaoForAnnotation;

@Repository
public class EPDao extends BaseDaoForAnnotation<Ep, Integer> {

	public List<Ep> findAllOrderByLocation() {
		// TODO Auto-generated method stub
		String hql = " from Ep ep order by ep.ordinalPosition asc";
		return this.find(hql);
	}

	public Ep findMaxEpLocation() {
		String hql = " from Ep ep where ep.ordinalPosition = (select max(e.ordinalPosition) from Ep e)";
		List<Ep> epList = this.find(hql	);
		if(null == epList || epList.size() == 0)
			return null;
		return epList.get(0);
	}

	public List<Ep> findEpListByLocationMoreThanEp(Integer ordinalPosition) {
		String hql = " from Ep ep where ep.ordinalPosition > ? order by ep.ordinalPosition asc";
		if(null == ordinalPosition)
			return null;
		else{
			return this.find(hql, ordinalPosition);
		}
			
	}

	public Ep findByLocation(Integer location) {
		if(null != location){
			List<Ep> epList = this.findByProperty("ordinalPosition", location);
			if(null == epList || epList.size() == 0 ){
				return null;
			}else{
				return epList.get(0);
			}
		}else{
			return null;
		}
	}

	
}
