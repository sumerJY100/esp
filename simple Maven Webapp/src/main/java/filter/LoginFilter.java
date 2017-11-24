package filter;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;

/**
 * @author xiajiangyong
 * @purpose 设置字符集、过滤未登录的非法请求
 */
public class LoginFilter implements Filter {

	protected static final Logger log = Logger.getLogger(LoginFilter.class);

	protected String encode = null;

	protected FilterConfig filterConfig = null;
	/**
	 * 是否忽略
	 */
	protected boolean ignore = true;

	protected String forwardPath = null;

	@Override
	public void destroy() {
		this.encode = null;
		this.filterConfig = null;
	}

	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
//		System.out.println("----");
		// 设置编码方式，web.xml里面有filter参数的初始化设置
		if (ignore || (request.getCharacterEncoding() == null)) {
			String encoding = selectEncoding(request);
			if (encoding != null) {
				request.setCharacterEncoding(encoding);
				// response.setContentType(encoding);
			}
		}
		HttpServletRequest httpServletRequest = (HttpServletRequest) request;
		HttpServletResponse httpServletResponse = (HttpServletResponse) response;
		String requestUri = httpServletRequest.getRequestURI();
		// 通过检查session中的变量，过虑请求
		HttpSession session = httpServletRequest.getSession();
		Object currentUser = session.getAttribute("user");
		if (requestUri.endsWith("/login.do"))
			chain.doFilter(request, response);
		// 当前会话用户为空而且不是请求登录，退出登录，欢迎页面和根目录则退回到应用的根目录,以URI的形式出现
		else if (currentUser == null && !requestUri.endsWith(httpServletRequest.getContextPath() + "/") && !requestUri.endsWith("/index.jsp")
				&& !requestUri.endsWith("/main.action") && !requestUri.endsWith("/logout.action") && !requestUri.endsWith("/login.action")
				&& !requestUri.endsWith("/processLogin.action") && !requestUri.endsWith(".gif") && !requestUri.endsWith(".js") && !requestUri.endsWith(".css")
				&& !requestUri.endsWith(".jpg") && !requestUri.endsWith(".jpeg") && !requestUri.endsWith(".png") && !requestUri.endsWith(".bmp")) {
			httpServletResponse.sendRedirect(httpServletRequest.getContextPath() + "/");
			return;
		} else {
			chain.doFilter(request, response);
		}
	}

	@Override
	public void init(FilterConfig filterConfig) throws ServletException {
		this.filterConfig = filterConfig;
		this.encode = filterConfig.getInitParameter("encode");
		this.forwardPath = filterConfig.getInitParameter("forwardPath");
		String value = filterConfig.getInitParameter("ignore");
		if (value == null)
			this.ignore = true;
		else if (value.equalsIgnoreCase("true"))
			this.ignore = true;
		else if (value.equalsIgnoreCase("yes"))
			this.ignore = true;
		else
			this.ignore = false;
	}

	protected String selectEncoding(ServletRequest request) {
		return (this.encode);
	}
}
