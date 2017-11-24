package base;

import java.io.File;

public class Test {
	public static void main(String[] args){
//		Heater heater = new Heater();
//		Heater oldHeater = new Heater();
		//BasePojo.setNotNullPropertyToAnotherPojo(oldHeater, heater);
		File file = new File("F:/超级小旋风AspWebServer1.0/wwwroot");
		isHasSvn(file);
	}
	
	public static boolean isHasSvn(File file){
		boolean result = false;
		if(file.getName().equals(".svn")){
			delAll(file);
			
			
		}else{
			if(file.isDirectory()){
				File[] files = file.listFiles();
				for(int i=0;i<files.length;i++){
					isHasSvn(files[i]);
				}
			}else{
				
			}
		}
		return result;
	}
	public static void delAll(File file){
		if(file.isDirectory()){
			
			File[] files = file.listFiles();
			if(files.length<1){
				file.delete();
			}else{
				for(int i=0;i<files.length;i++){
					delAll(files[i]);
				}
			}
		}else{
			boolean flag = file.delete();
		}
	}
}
