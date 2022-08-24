<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%
	String txt1 = request.getParameter("txt1");
	String pwd1 = request.getParameter("pwd1");
	String cb1 = request.getParameter("cb1");
	String rd1 = request.getParameter("rd1");
	String ta1 = request.getParameter("ta1");
	out.print(txt1);
	out.print("<br>");
	out.print(pwd1);
	out.print("<br>");
	out.print(cb1);
	out.print("<br>");
	out.print(rd1);
	out.print("<br>");
	out.print(ta1);
	out.print("<br>");
%>