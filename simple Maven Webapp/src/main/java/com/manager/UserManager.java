package com.manager;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import base.manager.BaseManager;

import com.dao.UserDao;
import com.pojo.User;



@Service
public class UserManager extends BaseManager<User> {

	@Resource
	private UserDao userDao;

	@Override
	public UserDao getBaseDao() {
		return userDao;
	}

	public User findUser(User user) {
		String hql = " from User u where u.loginName=? and u.loginPwd = ?";
		return (User) userDao.findUniqueValue(hql, user.getLoginName(), user.getLongPwd());
	}
	
	public String toTableString(List<User> userList) {
		StringBuffer buffer = new StringBuffer();
		buffer.append("<table><tbody>");
		for (int i = 0; i < userList.size(); i++) {
			buffer.append("<tr>");
			buffer.append("<td>" + (i + 1) + "</td>");
			buffer.append("<td>" + userList.get(i).getNum() + "</td>");
			buffer.append("<td>" + userList.get(i).getName() + "</td>");
			buffer.append("<td>" + userList.get(i).getLoginName() + "</td>");
			buffer.append("<td><a href='javascript:void(0);' id='resetPwd_" + userList.get(i).getId() + "'>" + "重置密码" + "</a>&nbsp;&nbsp;");
			if (userList.get(i).getName().equals("admin")) {

			} else {
				buffer.append("<a href='javascript:void(0);' id='delUser_" + userList.get(i).getId() + "'>" + "删除" + "</a>");
			}
			buffer.append("</td>");
			buffer.append("</tr>");
		}
		buffer.append("</tbody></table>");
		return buffer.toString();
	}

	public List<User> findAllOrderByDepartment() {
		String hql = "from User u where u.userState != -1 and u.name != 'admin' order by u.departmentId asc";
		return this.getBaseDao().find(hql);
	}

	/**
	 * 查询所有的用户，用户状态不为-1
	 * 
	 * @return
	 */
	public List<User> findAllNormal() {
		String hql = " from User u where u.userState != -1 and u.name != 'admin' order by u.departmentId";
		List<User> list = this.getBaseDao().find(hql);
		return list;
	}

	/**
	 * 查询所有的用户，并且用户所携带的完成任务的数量，绩效分数
	 * 
	 * @return
	 */
	public List<User> findAllUserTasks() {
		List<User> userList = this.findAllNormal();
		return userList;
	}
	/**
	 * 根据用户的用户名与密码判断用户是否存在，如果存在返回用户，如果不存在返回null
	 * @param user
	 * @return
	 */
	public User login(User user) {
		String hql = " from User u where u.loginName=? and u.longPwd = ?";
		return (User) userDao.findUniqueValue(hql, user.getLoginName(), user.getLongPwd());
	}

}
