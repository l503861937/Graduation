package com.lxd.Graduation.Interceptor;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.Map;
import net.sf.json.JSONObject;

public class LoginInterceptor implements HandlerInterceptor {

    @Override
    public void afterCompletion(HttpServletRequest arg0, HttpServletResponse arg1, Object arg2, Exception arg3)
            throws Exception {
        // TODO Auto-generated method stub

    }

    @Override
    public void postHandle(HttpServletRequest arg0, HttpServletResponse arg1, Object arg2, ModelAndView arg3)
            throws Exception {
        // TODO Auto-generated method stub

    }

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object arg2) throws Exception {
        // TODO Auto-generated method stub
        //System.out.println("进入拦截器，url = " + url);
        Object user = request.getSession().getAttribute("listUser");
        if(user == null){
            //表示未登录或者登录状态失效
            if("XMLHttpRequest".equals(request.getHeader("X-Requested-With"))){
                //ajax请求
                Map<String, String> ret = new HashMap<String, String>();
                ret.put("intType", "error");
                ret.put("intMsg", "登录状态已失效，请重新去登录!");
                response.getWriter().write(JSONObject.fromObject(ret).toString());

                System.out.println("11111");
                return false;
            }
            System.out.println("22222222");
            String url = request.getRequestURI();
            System.out.println(url);
            response.sendRedirect( "http://localhost:8080/Graduation/test/login");
            return false;
        }
        return true;
    }

}
