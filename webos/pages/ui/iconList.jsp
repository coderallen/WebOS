<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<c:set var="ctx" value="${pageContext.request.contextPath}"/>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html> 
	<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<script type="text/javascript" src="${ctx }/ui/js/jquery-1.7.2.min.js"></script>
	<script type="text/javascript">
		function changeIcon(icon, id) {
			$.ajax({
				  type: 'GET',
				  url: '/ui/Deskelement!changeIcon.do?math=' + Math.random(),
				  data: { appId : id, changeIcon : icon },
				  dataType : 'text',
				  success: function(msg) {
					  // 转换为json对象
					  var data = eval("(" + msg + ")"); 
					  if(data.message == "success") {
						  // 即时刷新
						  window.parent.myLib.desktop.deskIcon.refresh(window.parent.getTabNum());
					  } else {
						  alert("操作出现错误,请重试.");
					  }
				  }
			});
		}
	</script>
	<style type="text/css">
		.navbox{width:100%;}
		.navbox ul,.navbox ul li p{padding:0px;margin:0px;list-style:none;line-height:30px;}
		.navbox ul li{float:left;width:86px;height:88px;padding:10px;text-align:center;}
		.navbox ul li a{display:block;width:86px;height:85px;padding-top:8px;font-size:12px;color:#000; text-decoration:none;}
		.navbox ul li a:hover{background:url(images/icon_over.png) no-repeat center center;}
		.navbox ul li img{border:none;padding-top: 10px;}
	</style>
	</head>
	
	
	<body style="background-color: white;">
	<div class="navbox">
  	<ul>
		<c:forEach items="${icons }" var="icon">
			<li>
	      		<a href="#" onclick="changeIcon('${icon }', '${appId }')">
	          		<p class="navImg"><img src="${ctx }/ui/icon/${icon }" width="45" height="45" /></p>
	      		</a>
	    	</li>
		</c:forEach>
	</ul>
  </div>
	</body>
</html>