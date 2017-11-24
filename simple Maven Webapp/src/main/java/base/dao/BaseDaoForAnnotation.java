package base.dao;

import java.io.Serializable;
import javax.annotation.Resource;

import org.hibernate.SessionFactory;

public abstract class BaseDaoForAnnotation<T, PK extends Serializable> extends
		BaseDao<T, PK> {

	@Override
	@Resource(name = "sessionFactory")
	public void setMySessionFactory(SessionFactory sessionFactory) {
		super.setSessionFactory(sessionFactory);
	}

}
