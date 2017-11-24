package base.action;

import java.io.IOException;
import java.util.Map;


//import javax.security.auth.message.callback.PrivateKeyCallback.Request;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import net.sf.json.JSONArray;

import org.apache.struts2.ServletActionContext;
import org.apache.struts2.StrutsStatics;
import org.apache.struts2.interceptor.RequestAware;

import com.opensymphony.xwork2.ActionContext;
import com.opensymphony.xwork2.ActionSupport;

@SuppressWarnings("serial")
public class BaseAction extends ActionSupport implements RequestAware {

	public static final int EACH_OF_PAGE_SIZE = 10;

	public HttpServletRequest getRequest() {
		ActionContext ac = ActionContext.getContext();
		HttpServletRequest request = (HttpServletRequest) ac.get(StrutsStatics.HTTP_REQUEST);
		
		return request;
	}

	public HttpServletResponse getResponse() {
		ActionContext ac = ActionContext.getContext();
		HttpServletResponse response = (HttpServletResponse) ac.get(StrutsStatics.HTTP_RESPONSE);
		// response.setContentType("text/text");
		response.setCharacterEncoding("UTF-8");
		return response;
	}

	public Map<String, Object> getSession() {
		
		ActionContext ac = ActionContext.getContext();
		Map<String, Object> session = ac.getSession();
		return session;
	}

	public void writeResponseStrTextHtml(String responseStr) {
		try {
			getResponse().setContentType("text/html;charset=utf-8");
			getResponse().getWriter().write(responseStr);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	public void writeResponseJSON(String jsonString) {

		try {
			getResponse().setContentType("application/json;charset=utf-8");
			getResponse().getWriter().append(jsonString);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	public void writeResponseJSON(JSONArray jsonArray){
		writeResponseJSON(jsonArray.toString());
	}

	
	@Override
	public void setRequest(Map<String, Object> arg0) {
		// TODO Auto-generated method stub
		
	}

}
