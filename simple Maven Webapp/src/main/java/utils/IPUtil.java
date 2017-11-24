package utils;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.net.URL;
import java.net.URLConnection;

import javax.servlet.http.HttpServletRequest;

public class IPUtil {
	public static String getRemortIP(HttpServletRequest request) {
		if (request.getHeader("x-forwarded-for") == null) {
			return request.getRemoteAddr();
		}
		return request.getHeader("x-forwarded-for");
	}
	public static String getIpAddr(HttpServletRequest request) {
	    String ip = request.getHeader("x-forwarded-for");
	    if(null == ip || 0 == ip.length() || "unknown".equalsIgnoreCase(ip)) {
	        ip = request.getHeader("Proxy-Client-IP");
	    }
	    if(null == ip || 0 == ip.length() || "unknown".equalsIgnoreCase(ip)) {
	        ip = request.getHeader("WL-Proxy-Client-IP");
	    }
	    if(null == ip || 0 == ip.length() || "unknown".equalsIgnoreCase(ip)) {
	        ip = request.getHeader("X-Real-IP");
	    }
	    if(null == ip || 0 == ip.length() || "unknown".equalsIgnoreCase(ip)) {
	        ip = request.getRemoteAddr();
	    }
	    return ip;
	}
	
	public static String callUrlByGet(String callurl,String charset){  
        
        StringBuilder result = new StringBuilder();  
        try {  
            URL url = new URL(callurl);  
             URLConnection connection = url.openConnection();  
            connection.connect();  
              
            BufferedReader reader = new BufferedReader(new InputStreamReader(connection.getInputStream(),charset));  
            String line;  
            while((line = reader.readLine())!= null){  
                result.append(line); 
            }  
              
        } catch (Exception e) {  
            e.printStackTrace();  
            return "";  
        }  
        return result.toString();  
    }
	
	public static void main(String[] args){
//		String url = "http://ip.taobao.com/service/getIpInfo.php?ip=" + "222.131.1.112";
		String url = "http://192.168.1.3:8080/ESP/home.do";
		String result = callUrlByGet(url,"UTF-8");
//		System.out.println(result);
		String a = new String("\u4e2d\u56fd");
		String b = null;
		try {
			b = new String(a.getBytes(),"UTF-8");
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
//		System.out.println(b);
	}
}
