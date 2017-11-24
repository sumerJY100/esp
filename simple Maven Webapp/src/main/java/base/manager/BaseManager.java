package base.manager;

import java.io.Serializable;
import java.util.List;

import base.dao.BaseDao;
import base.pojo.BasePojo;

public abstract class BaseManager<T> {

	@SuppressWarnings("unchecked")
	private BaseDao baseDao;

	public abstract BaseDao getBaseDao();

	public void save(T pojo) {
		this.getBaseDao().save(pojo);
	}

	public void saveOrUpdate(T pojo) {
		this.getBaseDao().saveOrUpdate(pojo);
	}

	public T updatePojoSetNullValueFromDb(T pojo) {
		T result = null;
		if (null != pojo) {
			if (pojo instanceof BasePojo) {
				BasePojo bp = (BasePojo) pojo;
				if (null != bp.getId()) {
					Object oldObj = this.getBaseDao().findById(bp.getId());
					if (null != oldObj) {
						if (oldObj instanceof BasePojo) {
							BasePojo.setNotNullPropertyToAnotherPojo((BasePojo) oldObj, bp);
							this.getBaseDao().update(bp);
							result = (T) bp;
							// pojo = (T) bp;
						}
					}
				}
			}
		}
		return result;
	}

	public List<T> findAllSortByProperty(String property, String ascOrDesc) {
		return this.getBaseDao().findAllOrderByProperty(property, ascOrDesc);
	}

	public void update(T pojo) {
		// TODO Auto-generated method stub
		this.getBaseDao().update(pojo);
	}

	// public void updateProperty(T pojo){
	// this.getBaseDao().updateProperty(pojo);
	// }
	public void delById(Object pk) {
		this.getBaseDao().deleteById((Serializable) pk);
	}

	public List<T> findAll() {
		return this.getBaseDao().findAll();
	}

	public T findById(Object pk) {
		return (T) this.getBaseDao().findById((Serializable) pk);
	}

	public Long findAllCount() {
		return this.getBaseDao().findCounts();
	}

	public void bathUpdate(List<T> list) {
		if (null != list && list.size() > 0) {
			this.getBaseDao().updateBath(list);
		}
		
	}
}
