package base.pojo;

import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public abstract class BasePojo {

	public static final SimpleDateFormat YYYYMMDDHHmmss = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	
	public abstract Integer getId();

	/**
	 * 将pojo中属性值为null的字段，从oldPojo中寻找出来并赋值
	 * 
	 * @param oldPojo
	 * @param pojo
	 */
	public static BasePojo setNotNullPropertyToAnotherPojo(BasePojo oldPojo, BasePojo pojo) {
		BasePojo basePojo = null;
		if (null != oldPojo && null != pojo && oldPojo.getClass().equals(pojo.getClass()) ) {
			Class c = pojo.getClass();
			Field[] fieldArr = c.getDeclaredFields();
			List<String> fieldList = new ArrayList<String>();
			Map<String,Method> getMethodMap = new HashMap<String,Method>();
			Map<String,Method> setMethodMap = new HashMap<String,Method>();
			for (int i = 0; i < fieldArr.length; i++) {
				String fieldName = fieldArr[i].getName();
				String getMethodName = "get" + setFirstCharacterUppercase(fieldName);
				String setMethodName = "set" + setFirstCharacterUppercase(fieldName);
				Method getMethod = null;
				Method setMethod = null;
				try {
					getMethod = c.getMethod(getMethodName);
					if(null != getMethod )
						setMethod = c.getMethod(setMethodName,getMethod.getReturnType());
				} catch (NoSuchMethodException e) {
					//e.printStackTrace();
				} catch (SecurityException e) {
					e.printStackTrace();
				} finally {
					if(null != getMethod && null != setMethod){
						getMethodMap.put(fieldName, getMethod);
						setMethodMap.put(fieldName, setMethod);
						fieldList.add(fieldName);
					}
				}
			}
			for(String attr:fieldList){
				Method getMethod = getMethodMap.get(attr);
				try {
					Object getReturnValue = getMethod.invoke(pojo);
//					System.out.println(getReturnValue + "," + getMethod.getName());
					if(null == getReturnValue){
						Object getOldPojoReturnValue = getMethod.invoke(oldPojo);
						if(null != getOldPojoReturnValue){
							Method setMethod = setMethodMap.get(attr);
							setMethod.invoke(pojo, getOldPojoReturnValue);
						}
					}
				} catch (IllegalAccessException e) {
					e.printStackTrace();
				} catch (IllegalArgumentException e) {
					e.printStackTrace();
				} catch (InvocationTargetException e) {
					e.printStackTrace();
				}
			}
//			Ep ep = (Ep) pojo;
			basePojo = pojo;
		}
		return basePojo;
	}

	/**
	 * 首字母大写
	 * 
	 * @param str
	 * @return
	 */
	public static String setFirstCharacterUppercase(String str) {
		StringBuffer buffer = new StringBuffer();
		buffer.append(str.substring(0, 1).toUpperCase());
		buffer.append(str.substring(1));
		return buffer.toString();
	}
}
