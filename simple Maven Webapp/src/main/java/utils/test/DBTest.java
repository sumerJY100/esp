package utils.test;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.Statement;

public class DBTest {
	 public static void main(String[] args) 
	 {  
        Connection con = null;
        Statement st;
        try {
        	 Class.forName("com.mysql.jdbc.Driver");
        	 con = DriverManager.getConnection("jdbc:mysql://183.203.194.66:33336/dbadapter", "yqyk", "hyu");
		} catch (Exception e1) {
			e1.printStackTrace();
			 System.out.println("数据库连接失败" + e1.getMessage());
		}
        try {
        	String sql = "INSERT INTO dbadapter.sms_outbox(sismsid,extcode,destaddr,messagecontent,"
            		+ "reqdeliveryreport,msgfmt,sendmethod,requesttime,applicationid)"  
                    + "values(uuid(),'333','13775037967','常州测试！How are you!',1,15,0,now(),'333')";
            st = con.createStatement();    // 创建用于执行静态sql语句的Statement对象   
            int count = st.executeUpdate(sql);  // 执行插入操作的sql语句，并返回插入数据的个数   
            System.out.println("向staff表中插入 " + count + " 条数据"); //输出插入操作的处理结果   
            con.close();
		} catch (Exception e2) {
			e2.printStackTrace();
			System.out.println("插入数据失败" + e2.getMessage());
		}
        
	 }
}
