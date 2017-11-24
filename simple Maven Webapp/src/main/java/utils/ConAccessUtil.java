package utils;

import java.io.UnsupportedEncodingException;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;

import java.sql.DriverManager;

import java.sql.SQLException;

public class ConAccessUtil {

	// 获得路径

	String path = this.getClass().getClassLoader().getResource("db/test.mdb")
			.getPath().substring(1);

	private Connection con = null;

	public void getConn() {

		try {

//			System.out.println(path);

			Class.forName("sun.jdbc.odbc.JdbcOdbcDriver");

			String url = "jdbc:odbc:Driver={Microsoft Access Driver (*.mdb)};DBQ="
					+ path + ";useUnicode=false;characterEncoding=gbk";

			this.con = DriverManager.getConnection(url, "", "");

//			System.out.println("连接成功!");

			Statement st = this.con.createStatement();

			ResultSet rs = st
					.executeQuery("select * from shop_news where newsid=36");

			while (rs.next()) {
				try {
					System.out.println((new String(rs.getBytes("newscontent"),
							"gbk")));
				} catch (UnsupportedEncodingException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}
			rs.close();
			st.close();

			this.con.close();

		} catch (ClassNotFoundException e) {

			// TODO Auto-generated catch block

			e.printStackTrace();

		} catch (SQLException e) {

			// TODO Auto-generated catch block

			e.printStackTrace();

		}

	}

	public static void main(String[] args) {
		ConAccessUtil con = new ConAccessUtil();
		con.getConn();
	}
}