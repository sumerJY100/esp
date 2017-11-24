package utils;

import java.lang.reflect.Field;
import java.lang.reflect.Method;

import org.apache.commons.lang3.ArrayUtils;

public class CommonClassUtil {

	
	
	public static void copy(Object o1, Object o2) {
		try {
			Field[] field = o1.getClass().getDeclaredFields();
			Method[] mm = o1.getClass().getDeclaredMethods();

			for (int j = 0; j < field.length; j++) {
				String name = field[j].getName();
				String type = field[j].getGenericType().toString().split(" ")[1];
				Class typeClass = null;
				try {
					typeClass = Class.forName(type);
				} catch (ClassNotFoundException e) {
					// e.printStackTrace();
					continue;
				}
				Method m = null;
				try {
					m = o1.getClass().getMethod("get" + toUpperCaseFirstOne(name));
				} catch (NoSuchMethodException e) {
					m = null;
					continue;
				}
				if (ArrayUtils.contains(mm, m)) {
					Object value = m.invoke(o1);
					Object value2 = m.invoke(o2);
					if (value2 != null) {
						Method setM = null;
						try {
							setM = o1.getClass().getMethod("set" + toUpperCaseFirstOne(name), typeClass);
						} catch (NoSuchMethodException e) {
							setM = null;
							e.printStackTrace();
						}
						if (null != setM) {
							setM.invoke(o1, value2);
						}
					}
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public static String toUpperCaseFirstOne(String str) {
		String top = str.substring(0, 1);
		top = top.toUpperCase();
		return top + str.substring(1);
	}
}
