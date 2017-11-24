package utils;

import java.io.InputStream;
import java.util.Properties;

public class ReadProperties {
	public static final String saveFilePath = "saveFilePath";
	public static final String swfSaveFilePath = "swfSaveFilePath";
	public static final String OpenOffice_HOME = "OpenOffice_HOME";
	public static final String SWFTools_HOME = "SWFTools_HOME";
	public static final String officeFileType = "officeFileType";
	public static final String jpgFileType = "jpgFileType";

	public static String getPropertie(String type) {
		String result = null;
		Properties pop = new Properties();
		try {
			InputStream is = ReadProperties.class.getClassLoader()
					.getResourceAsStream("cofig.properties");
			pop.load(is);
			result = pop.getProperty(type);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return result;
	}
}
