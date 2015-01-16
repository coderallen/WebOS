<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<c:set var="ctx" value="${pageContext.request.contextPath}"/>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html> 
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<script type="text/javascript" src="${ctx }/ui/js/jquery-1.7.2.min.js"></script>
<style type="text/css">
<!--
body{margin:0px; background:#FFF;}
.tablekk{font-size:12px;color:#555555;}
.tablekk td{background:#f5f5f5; text-indent:0.5em;line-height:30px;}
.tablekk td.formTitle{font-weight:bold;width:76px;background:#e5e5e5;}
.tablekk td input{font-size:12px;border:1px solid #cccccc;-moz-border-radius:3px;-webkit-border-radius:3px;border-radius:3px;position:relative;}
.inptex_edit{width:90%;height:1.6em;}
.tablekk td input.editPassbut1,.tablekk td input.editPassbut2{padding:3px 12px;color:#000; cursor:pointer;background:#bde6f6;border-width:1px;border-style:solid;border-color:#95cce5 #4597c6 #4597c6 #95cce5;}
.tablekk td input.editPassbut2{background:#dedede;border-width:1px;border-style:solid;border-color:#cfcfcf #8a8a8a #8a8a8a #cfcfcf;}
-->
</style>
<script>
	function frmSubmit(){
		if($("#oldPassword").attr("value") == ""){
			alert("原密码不能为空.");
			return false;
		}
		
		if($("#newPassword").attr("value") == ""){
			alert("新密码不能为空.");
			return false;
		}
		
		if($("#rePassword").attr("value") == ""){
			alert("新密码不能为空.");
			return false;
		}
		
		if($("#newPassword").attr("value") != $("#rePassword").attr("value")){
			alert("两次密码输入不一致.");
			return false;
		}
		
		$("#modifyPassWordForm").submit();
	}
</script>
</head>
<body>
<form id="modifyPassWordForm" name="modifyPassWordForm" method="post" action="${ctx}/main/PtPortal/updatePassword.do">
<table width="100%" border="0" cellspacing="2" cellpadding="2" class="tablekk">
  <tr>
    <td class="formTitle">登陆名</td>
    <td>${Login_Info.loginName}</td>
    <td class="formTitle">用户名</td>
    <td>${Login_Info.userName}</td>
  </tr>
  <tr>
    <td class="formTitle">所属部门</td>
    <td colspan="3">
    <c:choose>
		<c:when test="${fn:length(Login_Info.deptNames) >= 25 }">
			<span title="${Login_Info.deptNames }">${fn:substring(Login_Info.deptNames, 0, 25) }...</span>
		</c:when>
		<c:otherwise>
			${Login_Info.deptNames }
		</c:otherwise>
	  </c:choose>
    &nbsp;</td>
  </tr>
  <tr>
    <td class="formTitle">原密码</td>
    <td colspan="3"><input type="password" name="oldPassword" id="oldPassword" class="inptex_edit" /></td>
  </tr>
  <tr>
    <td class="formTitle">新密码</td>
    <td colspan="3"><input type="password" name="newPassword" id="newPassword" class="inptex_edit" /></td>
  </tr>
  <tr>
    <td class="formTitle">确认密码</td>
    <td colspan="3"><input type="password" name="rePassword" id="rePassword" class="inptex_edit" /></td>
  </tr>
  <tr>
    <td colspan="4" align="center">
    	<input type="button" onclick="frmSubmit()" name="button" id="button" value="提 交" class="editPassbut1" /> 
    	<!--  
    	<input type="reset" name="button2" id="button2" value="取 消" class="editPassbut2" />
    	-->
    </td>
  </tr>
</table>
</form>
<c:if test="${pwerror == 'olderror'}">
	<script type="text/javascript">
		alert("旧密码输入错误");
	</script>
</c:if>
<c:if test="${pwerror == 'none'}">
	<script type="text/javascript">
		alert("密码修改成功");
	</script>
</c:if>
</body>
</html>