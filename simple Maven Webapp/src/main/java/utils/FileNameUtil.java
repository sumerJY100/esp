package utils;

import java.text.SimpleDateFormat;
import java.util.Date;

public class FileNameUtil {
	public static String randFileName() {
		String result = "";
		Date date = new Date();
		SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmss");
		result += sdf.format(date);
		Double rand = Math.random() * 10000;
		if (rand < 10)
			result += "000" + rand.toString().substring(0, 1);
		else if (rand < 100)
			result += "00" + rand.toString().substring(0, 2);
		else if (rand < 1000)
			result += "0" + rand.toString().substring(0, 3);
		else
			result += rand.toString().substring(0, 4);

		return result;
	}

	public static boolean judge2Office(String suffix) {
		return judge2FileType(suffix, ReadProperties.officeFileType);
	}

	public static boolean judge2JPG(String suffix) {
		return judge2FileType(suffix, ReadProperties.jpgFileType);
	}

	public static boolean judge2FileType(String suffix, String fileTypes) {
		String types = ReadProperties.getPropertie(fileTypes);
		String[] typeArr = types.split(",");
		for (int i = 0; i < typeArr.length; i++) {
			if (typeArr[i].trim().equals(suffix)) {
				return true;
			}
		}
		return false;
	}
}
