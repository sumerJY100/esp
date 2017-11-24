package base.dao;

import java.io.Serializable;
import java.lang.reflect.ParameterizedType;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;
import org.hibernate.type.Type;
import org.springframework.orm.hibernate3.support.HibernateDaoSupport;

import base.pojo.BasePojo;

public abstract class BaseDao<T, PK extends Serializable> extends HibernateDaoSupport {
	public static String QUERY_CONNECT_AND = "and";
	public static String QUERY_CONNECT_OR = "or";
	
	public static String QUERY_ASC = " asc";
	public static String QUERY_DESC = "desc";

	// public static Configuration cfg = new Configuration().configure();

	// public static SessionFactory factory = cfg.buildSessionFactory();

	public abstract void setMySessionFactory(SessionFactory sessionFactory);

	public static SessionFactory factory;

	private Class<T> entityClass;

	private String className;

	@SuppressWarnings("unchecked")
	public BaseDao() {

		// 提供过泛型反射，取得子类中定义的entityClass
		this.entityClass = (Class<T>) ((ParameterizedType) getClass().getGenericSuperclass()).getActualTypeArguments()[0];
		className = entityClass.getSimpleName();
	}

	public BaseDao(Class<T> class1, SessionFactory sessionFactory) {

		this.entityClass = class1;
		className = entityClass.getSimpleName();
	}

	/**
	 * 保存对象到数据库
	 * 
	 * @param entity
	 *            需要持久化实体
	 * @return
	 */
	public void save(T entity) {
		if (factory == null) {
			factory = this.getHibernateTemplate().getSessionFactory();
		}
		Session session = null;
		try {
			session = factory.openSession();
			session.beginTransaction();
			session.save(entity);
			session.getTransaction().commit();
		} catch (Exception e) {
			session.getTransaction().rollback();
			e.printStackTrace();
		} finally {
			if (session != null)
				if (session.isOpen())
					session.close();
		}
	}

	/**
	 * 批量保存
	 * 
	 * @param list
	 */
	public void saveBatch(List<T> list) {
		if (list == null || list.size() == 0) {
			return;
		}
		if (factory == null) {
			factory = this.getHibernateTemplate().getSessionFactory();
		}
		Session session = null;
		try {
			session = factory.openSession();
			session.beginTransaction();
			for (int i = 0; i < list.size(); i++) {
				session.save(list.get(i));
				if (i % 10 == 0) {
					session.flush();
					session.clear();
				}
			}
			session.getTransaction().commit();
		} catch (Exception e) {
			session.getTransaction().rollback();
			e.printStackTrace();
		} finally {
			if (session != null)
				if (session.isOpen())
					session.close();
		}
	}

	/**
	 * 
	 * @author 夏江勇
	 * @version 创建时间：2011-11-17 上午11:37:56
	 * @param entity
	 *            需要修改实体
	 */
	public void update(T entity) {
		if (factory == null) {
			factory = this.getHibernateTemplate().getSessionFactory();
		}
		Session session = null;
		try {
			session = factory.openSession();
			session.beginTransaction();
			session.update(entity);
			session.getTransaction().commit();
		} catch (Exception e) {
			session.getTransaction().rollback();
			e.printStackTrace();
		} finally {
			if (session != null)
				if (session.isOpen())
					session.close();
		}
	}
	public void updateProperty(T entity,PK id){
		this.getHibernateTemplate().get(entity.getClass(), id);
//		this.getHibernateTemplate().get
		
	}
	public void saveOrUpdate(T entity){
		if(null != entity){
			if(entity instanceof BasePojo){
				BasePojo basePojo = (BasePojo) entity;
				if(null != basePojo.getId()){
					this.update(entity);
				}else{
					this.save(entity);
				}
			}
		}
	}
	public void updateBath(List<T> list) {
		if (list == null || list.size() == 0) {
			return;
		}
		if (factory == null) {
			factory = this.getHibernateTemplate().getSessionFactory();
		}
		Session session = null;
		try {
			session = factory.openSession();
			session.beginTransaction();
			for (int i = 0; i < list.size(); i++) {
				session.update(list.get(i));
				if (i % 10 == 0) {
					session.flush();
					session.clear();
				}
			}
			session.getTransaction().commit();
		} catch (Exception e) {
			session.getTransaction().rollback();
			e.printStackTrace();
		} finally {
			if (session != null)
				if (session.isOpen())
					session.close();
		}
	}

	public void updateByHql(String hql, Object... values) {
		if (factory == null) {
			factory = this.getHibernateTemplate().getSessionFactory();
		}
		Session session = null;
		try {
			session = factory.openSession();
			session.beginTransaction();
			Query q = session.createQuery(hql);
			for (int i = 0; i < values.length; i++) {
				q.setParameter(i, values[i]);
			}
			q.executeUpdate();
			session.getTransaction().commit();
		} catch (Exception e) {
			session.getTransaction().rollback();
			e.printStackTrace();
		} finally {
			if (session != null)
				if (session.isOpen())
					session.close();
		}
	}

	/**
	 * 从数据库删除
	 * 
	 * @param entity
	 *            需要持久化实体
	 * @return
	 * 
	 */
	public void delete(T entity) {
		if (factory == null) {
			factory = this.getHibernateTemplate().getSessionFactory();
		}
		Session session = null;
		try {
			session = factory.openSession();
			session.beginTransaction();
			session.delete(entity);
			session.getTransaction().commit();
		} catch (Exception e) {
			session.getTransaction().rollback();
			e.printStackTrace();
		} finally {
			if (session != null)
				if (session.isOpen())
					session.close();
		}
	}

	/**
	 * 删除所有数据
	 */
	public void deleteAll() {
		if (factory == null) {
			factory = this.getHibernateTemplate().getSessionFactory();
		}
		Session session = null;
		try {
			session = factory.openSession();
			session.beginTransaction();
			String hql = "delete from " + this.entityClass.getSimpleName() + " o where o.id>-1";
			Query q = session.createQuery(hql);
			q.executeUpdate();
			session.getTransaction().commit();
		} catch (Exception e) {
			session.getTransaction().rollback();
			e.printStackTrace();
		} finally {
			if (session != null)
				if (session.isOpen())
					session.close();
		}

	}

	public void delete(String hql, Object... values) {
		if (factory == null) {
			factory = this.getHibernateTemplate().getSessionFactory();
		}
		Session session = null;
		try {
			session = factory.openSession();
			session.beginTransaction();
			Query q = session.createQuery(hql);
			for (int i = 0; i < values.length; i++) {
				q.setParameter(i, values[i]);
			}
			q.executeUpdate();
			session.getTransaction().commit();
		} catch (Exception e) {
			session.getTransaction().rollback();
			e.printStackTrace();
		} finally {
			if (session != null)
				if (session.isOpen())
					session.close();
		}
	}

	/**
	 * 从数据库删除
	 * 
	 * @param entity
	 *            需要持久化实体
	 * @return
	 * 
	 */
	public void deleteById(PK id) {
		if (factory == null) {
			factory = this.getHibernateTemplate().getSessionFactory();
		}
		Session session = null;
		try {
			session = factory.openSession();
			session.beginTransaction();
			session.delete(session.load(entityClass, id));
			session.getTransaction().commit();
		} catch (Exception e) {
			session.getTransaction().rollback();
			e.printStackTrace();
		} finally {
			if (session != null)
				if (session.isOpen())
					session.close();
		}
	}

	/**
	 * 按照主键查询
	 * 
	 * @param PK
	 *            需要实体主键
	 * @return entity 返回实体类型
	 * 
	 */
	@SuppressWarnings("unchecked")
	public T findById(final PK id) {
		if (factory == null) {
			factory = this.getHibernateTemplate().getSessionFactory();
		}
		Session session = null;
		T entity = null;
		try {
			session = factory.openSession();
			session.beginTransaction();
			entity = (T) session.get(entityClass, id);
			session.getTransaction().commit();
		} catch (Exception e) {
			session.getTransaction().rollback();
			e.printStackTrace();
		} finally {
			if (session != null) {
				if (session.isOpen()) {
					session.close();
				}
			}
		}
		return entity;

	}

	/**
	 * 按照属性查询
	 * 
	 * @param String
	 *            所需属性名称
	 * 
	 * @param Object
	 *            所需属性得值
	 * 
	 * @return List 返回结果列表
	 */
	@SuppressWarnings("unchecked")
	public List<T> findByProperty(String propertyName, final Object value) {
		if (factory == null) {
			factory = this.getHibernateTemplate().getSessionFactory();
		}
		Session session = null;
		List<T> TList = null;
		try {
			session = factory.openSession();
			session.beginTransaction();
			if ((value == null) || ("".equals(value))) {
				TList = session.createCriteria(entityClass).list();
			} else {
				TList = session.createCriteria(entityClass).add(Restrictions.eq(propertyName, value)).list();
			}
			session.getTransaction().commit();
		} catch (Exception e) {
			session.getTransaction().rollback();
			e.printStackTrace();
		} finally {
			if (session != null) {
				if (session.isOpen()) {
					session.close();
				}
			}
		}
		return TList;
		// return entity;
		// return getHibernateTemplate()
		// .findByCriteria(
		// queryTool.createCriteria(Restrictions
		// .isNull(propertyName)));
		// else
		// return getHibernateTemplate().findByCriteria(
		// queryTool.createCriteria(Restrictions.eq(propertyName,
		// value)));
	}

	/**
	 * 按照属性查询
	 * 
	 * @param String
	 *            [] 所需属性名称
	 * 
	 * @param Object
	 *            [] 所需属性得值
	 * 
	 * @param boolean 是否精确查询
	 * 
	 * @param String
	 * 
	 *            and或者or查询
	 * 
	 * @return List 返回结果列表
	 */
	@SuppressWarnings("unchecked")
	public List<T> findByPropertys(String[] propertyNames, final Object[] values, boolean isPrecise, String connType) {
		if (factory == null) {
			factory = this.getHibernateTemplate().getSessionFactory();
		}
		Session session = null;
		List<T> TList = null;
		try {
			session = factory.openSession();
			session.beginTransaction();
			Criteria criteria = session.createCriteria(entityClass);
			for (int i = 0; i < propertyNames.length; i++) {
				Object value = values[i];
				String propertyName = propertyNames[i];
				if ((value == null) || ("".equals(value))) {

				} else {
					// 是否是精确查询
					if (isPrecise) {
						if (connType.equals(BaseDao.QUERY_CONNECT_AND))
							criteria.add(Restrictions.eq(propertyName, value));
						else if (connType.equals(BaseDao.QUERY_CONNECT_OR))
							criteria.add(Restrictions.or(Restrictions.eq(propertyName, value), Restrictions.isNull(propertyName)));
					} else {
						// 如果是模糊查询，则判断是否是String类型
						if (value.getClass().getSimpleName().equals("String")) {
							if (connType.equals(BaseDao.QUERY_CONNECT_AND))
								criteria.add(Restrictions.like(propertyName, "%" + (String) value + "%"));
							else if (connType.equals(BaseDao.QUERY_CONNECT_OR))
								criteria.add(Restrictions.or(Restrictions.like(propertyName, "%" + (String) value + "%"), Restrictions.isNull(propertyName)));
						}
					}
				}
			}
			TList = criteria.list();
			session.getTransaction().commit();
		} catch (Exception e) {
			session.getTransaction().rollback();
			e.printStackTrace();
		} finally {
			if (session != null) {
				if (session.isOpen()) {
					session.close();
				}
			}
		}
		return TList;
	}

	/**
	 * 列出所有得实体
	 * 
	 * @param
	 * @return List<T> 返回T类型了列表
	 * 
	 */
	@SuppressWarnings("unchecked")
	public List<T> findAll() {
		if (factory == null) {
			factory = this.getHibernateTemplate().getSessionFactory();
		}
		Session session = null;
		List<T> TList = null;
		try {
			session = factory.openSession();
			session.beginTransaction();
			TList = session.createQuery(" from " + this.entityClass.getSimpleName()).list();
			session.getTransaction().commit();
		} catch (Exception e) {
			session.getTransaction().rollback();
			e.printStackTrace();
		} finally {
			if (session != null) {
				if (session.isOpen()) {
					session.close();
				}
			}
		}
		return TList;
	}
	public Map<PK,T>  findAllToMap() {
		List<T> list = this.findAll();
		Map<PK,T> map = new HashMap<PK,T>();
		
		for(T t:list){
			if(null != t && t instanceof BasePojo){
				BasePojo basePojo = (BasePojo) t;
				if(null != basePojo.getId()){
					map.put((PK) basePojo.getId(), t);
				}
			}
		}
		return map;
	}
	public List<T> findAllOrderByProperty(String propertyName , String ascOrDesc){
		String hql = " from " + this.entityClass.getSimpleName() + " e Order by e." + propertyName  + " " + ascOrDesc;
		return this.find(hql);
	}
	public Long findCounts() {
		Long resultLong = null;
		if (factory == null) {
			factory = this.getHibernateTemplate().getSessionFactory();
		}
		Session session = null;
		try {
			session = factory.openSession();
			session.beginTransaction();
			Query query = session.createQuery("select count(*) from " + this.entityClass.getSimpleName());
			Iterator iterate = query.iterate();

			while (iterate.hasNext()) {
				resultLong = (Long) iterate.next();
			}
			session.getTransaction().commit();
		} catch (Exception e) {
			session.getTransaction().rollback();
			e.printStackTrace();
		} finally {
			if (session != null) {
				if (session.isOpen()) {
					session.close();
				}
			}
		}
		return resultLong == null ? 0l : resultLong;
	}

	/**
	 * 历史数据，增减一个排序功能
	 * 
	 * @return
	 */
	public List<T> findAllHistoryData() {
		if (factory == null) {
			factory = this.getHibernateTemplate().getSessionFactory();
		}
		Session session = null;
		List<T> TList = null;
		try {
			session = factory.openSession();
			session.beginTransaction();
			TList = session.createQuery(" from " + this.entityClass.getSimpleName() + " c order by c.time asc").list();
			session.getTransaction().commit();
		} catch (Exception e) {
			session.getTransaction().rollback();
			e.printStackTrace();
		} finally {
			if (session != null) {
				if (session.isOpen()) {
					session.close();
				}
			}
		}
		return TList;
	}

	/**
	 * 直接用hql创建一个精确查询Query对象
	 * 
	 * @param String
	 *            需要创建得hql语句
	 * @param Object
	 *            需要得条件
	 * 
	 * @return Query 返回Query对象
	 */
	@SuppressWarnings("unchecked")
	public Query createPreciseQuery(String hql, Object... values) {

		Session session = null;
		Query query = null;
		try {
			session = factory.openSession();
			session.beginTransaction();
			query = session.createQuery(hql);
			for (int i = 0; i < values.length; i++) {
				query.setParameter(i, values[i]);
			}
			session.getTransaction().commit();
		} catch (Exception e) {
			session.getTransaction().rollback();
			e.printStackTrace();
		} finally {
			if (session != null) {
				if (session.isOpen()) {
					session.close();
				}
			}
		}
		return query;
	}

	/**
	 * 直接用hql创建一个模糊查询Query对象
	 * 
	 * @param String
	 *            需要创建得hql语句
	 * @param Object
	 *            需要得条件
	 * 
	 * @return Query 返回Query对象
	 */
	@SuppressWarnings("unchecked")
	public Query createFuzzyQuery(String hql, Object... values) {
		Session session = null;
		Query query = null;
		try {
			session = factory.openSession();
			session.beginTransaction();
			query = session.createQuery(hql);
			for (int i = 0; i < values.length; i++) {
				query.setParameter(i, "%" + values[i] + "%");
			}
			session.getTransaction().commit();
		} catch (Exception e) {
			session.getTransaction().rollback();
			e.printStackTrace();
		} finally {
			if (session != null) {
				if (session.isOpen()) {
					session.close();
				}
			}
		}
		return query;
	}

	/**
	 * 直接调用find方法查询
	 * 
	 * @param String
	 *            所需hql语句
	 * 
	 * @param Object
	 *            所需hql得值
	 * 
	 * @return List 返回所需类型列表
	 */
	@SuppressWarnings("unchecked")
	public List<T> find(String hql, Object... values) {
		Session session = null;
		List<T> TList = null;
		if (factory == null) {
			factory = this.getHibernateTemplate().getSessionFactory();
		}
		try {
			session = factory.openSession();

			session.beginTransaction();
			Query query = session.createQuery(hql);
			for (int i = 0; i < values.length; i++) {
				query.setParameter(i, values[i]);
			}
			TList = query.list();
			session.getTransaction().commit();
		} catch (Exception e) {
			System.out.println("出现异常…………");
			// System.out.println("session:" + session);
			// session.getTransaction().rollback();
			e.printStackTrace();
		} finally {
			if (session != null) {
				if (session.isOpen()) {
					session.close();
				}
			}
		}
		return TList;
	}

	@SuppressWarnings("unchecked")
	public List<T> getListForPage(String hql, final int offset, final int length, Object... values) {
		List<T> list = null;
		if (factory == null) {
			factory = this.getHibernateTemplate().getSessionFactory();
		}
		Session session = null;
		try {
			session = factory.openSession();
			// session.beginTransaction();
			Query query = session.createQuery(hql);
			Criteria criteria = session.createCriteria(this.getEntityClass());
			// criteria.
			// query.
			for (int i = 0; i < values.length; i++) {
				query.setParameter(i, values[i]);
			}
			query.setFirstResult(offset);
			query.setMaxResults(length);
			list = query.list();
			// session.getTransaction().commit();
		} catch (Exception e) {
			// session.getTransaction().rollback();
			e.printStackTrace();
		} finally {
			if (session != null)
				if (session.isOpen())
					session.close();
		}
		return list;
	}

	/**
	 * 根据HQL语句查询
	 * */
	public List findHqlList(String hql) {
		Session session = null;
		List TList = null;
		if (factory == null) {
			factory = this.getHibernateTemplate().getSessionFactory();
		}
		try {
			session = factory.openSession();
			session.beginTransaction();
			Query query = session.createQuery(hql);
			TList = query.list();
			session.getTransaction().commit();
		} catch (Exception e) {
			session.getTransaction().rollback();
			e.printStackTrace();
		} finally {
			if (session != null) {
				if (session.isOpen()) {
					session.close();
				}
			}
		}
		return TList;
	}

	@SuppressWarnings("unchecked")
	public List<Object> findValues(String hql, Object... values) {
		Session session = null;
		List<Object> list = null;
		if (factory == null) {
			factory = this.getHibernateTemplate().getSessionFactory();
		}
		try {
			session = factory.openSession();
			session.beginTransaction();
			Query query = session.createQuery(hql);
			for (int i = 0; i < values.length; i++) {
				query.setParameter(i, values[i]);
			}
			Type[] typeArr = query.getReturnTypes();
			list = query.list();
			// System.out.println("query.type:" + typeArr + ",length:" +
			// typeArr.length);
			// System.out.println("list:" + list + ",list.size:" + list.size()
			// );
			// System.out.println(list.get(0).getClass().toString());
			// System.out.println(Double);
			session.getTransaction().commit();
		} catch (Exception e) {
			session.getTransaction().rollback();
			e.printStackTrace();
		} finally {
			if (session != null) {
				if (session.isOpen()) {
					session.close();
				}
			}
		}
		return list;
	}

	public Object findUniqueValue(String hql, Object... values) {
		Session session = null;
		Object obj = null;
		if (factory == null) {
			factory = this.getHibernateTemplate().getSessionFactory();
		}
		try {
			session = factory.openSession();
			session.beginTransaction();
			Query query = session.createQuery(hql);
			for (int i = 0; i < values.length; i++) {
				query.setParameter(i, values[i]);
			}
			obj = query.uniqueResult();
			// System.out.println(Double);
			session.getTransaction().commit();
		} catch (Exception e) {
			session.getTransaction().rollback();
			e.printStackTrace();
		} finally {
			if (session != null) {
				if (session.isOpen()) {
					session.close();
				}
			}
		}
		return obj;
	}

	public T findLatestEntity() {
		Session session = null;
		T obj = null;
		if (factory == null) {
			factory = this.getHibernateTemplate().getSessionFactory();
		}
		try {
			session = factory.openSession();
			session.beginTransaction();
			String hql = " from " + this.entityClass.getSimpleName() + " where id = (select max(id) from " + this.entityClass.getSimpleName() + ")";
			Query query = session.createQuery(hql);
			List list = query.list();
			if (list.size() > 0)
				obj = (T) list.get(0);
			// System.out.println(Double);
			// session.getTransaction().commit();
		} catch (Exception e) {
			session.getTransaction().rollback();
			e.printStackTrace();
		} finally {
			if (session != null) {
				if (session.isOpen()) {
					session.close();
				}
			}
		}
		return obj;
	}

	public List<Object> findSingleAttrData(String hql, Object... values) {
		// TODO Auto-generated method stub
		Session session = null;
		List list = null;
		if (factory == null) {
			factory = this.getHibernateTemplate().getSessionFactory();
		}
		try {
			session = factory.openSession();
			session.beginTransaction();
			Query query = session.createQuery(hql);
			for (int i = 0; i < values.length; i++) {
				query.setParameter(i, values[i]);
			}
			list = query.list();
			// System.out.println(Double);
			session.getTransaction().commit();
		} catch (Exception e) {
			session.getTransaction().rollback();
			e.printStackTrace();
		} finally {
			if (session != null) {
				if (session.isOpen()) {
					session.close();
				}
			}
		}
		return list;
	}

	public List<T> findAllIn(Map<String, List> map) {
		// TODO Auto-generated method stub
		Session session = null;
		List list = null;
		if (factory == null) {
			factory = this.getHibernateTemplate().getSessionFactory();
		}
		try {
			session = factory.openSession();
			session.beginTransaction();
			String hql = "from " + this.entityClass.getSimpleName() + " e where ";
			Set<String> keys = map.keySet();
			int index = 0;
			for (String key : keys) {
				if (index != 0)
					hql += " and ";
				hql += "e." + key + " in (:" + key + ")";
				index++;
			}
			Query query = session.createQuery(hql);
			for (String key : keys) {
				query.setParameterList(key, map.get(key));
			}
			list = query.list();
		} catch (Exception e) {
			session.getTransaction().rollback();
			e.printStackTrace();
		} finally {
			if (session != null) {
				if (session.isOpen()) {
					session.close();
				}
			}
		}
		return list;
	}

	public Class<T> getEntityClass() {
		return entityClass;
	}

	public void setEntityClass(Class<T> entityClass) {
		this.entityClass = entityClass;
	}

	public String getClassName() {
		return className;
	}

	public void setClassName(String className) {
		this.className = className;
	}

}
