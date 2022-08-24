<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%
String responseText = request.getParameter("responseText");
String strAr[] = responseText.split(",");

int engTotal = 0;
int mathTotal = 0;

for (int i = 0; i < strAr.length; i++) {
	if (i % 3 == 1)
		mathTotal += Integer.parseInt(strAr[i]); //1,4,7
	if (i % 3 == 2)
		engTotal += Integer.parseInt(strAr[i]); //2,5,8
}
out.print("[" + mathTotal + "," + engTotal + "]");
%>
