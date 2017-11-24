package utils;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;

public class CommonDateUtil {

	public static final String YMD = "YYYY-MM-dd ";
	
	public static String getDate(Date date){
		Calendar c = new GregorianCalendar();
		c.setTime(date);
		StringBuffer buffer = new StringBuffer();
		buffer.append(c.get(Calendar.YEAR));
		buffer.append(c.get(Calendar.MONTH));
		buffer.append(c.get(Calendar.DAY_OF_MONTH));
		buffer.append(c.get(Calendar.HOUR_OF_DAY));
		buffer.append(c.get(Calendar.MINUTE));
		return buffer.toString();
	}
	public static String formatDate(Date date){
		SimpleDateFormat sf = new SimpleDateFormat(YMD);
		if(null == date){
			return "";
		}else{
			return sf.format(date);
		}
	}
}
