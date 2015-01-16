<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<c:set var="ctx" value="${pageContext.request.contextPath}"/>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html> 
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<link rel="stylesheet" href="${ctx }/ui/js/jquery-smartMenu/css/smartMenu.css" />
<link rel="stylesheet" href="${ctx }/ui/js/themes/base/jquery.ui.all.css" />
<script type="text/javascript" src="${ctx }/ui/js/jquery-1.7.2.min.js"></script>
<script type="text/javascript" src="${ctx }/ui/js/jquery-ui.min.js"></script>
<script type="text/javascript" src="${ctx }/ui/js/jquery-smartMenu/js/jquery-smartMenu-min.js"></script>
<script type="text/javascript" src="${ctx }/ui/js/folder.js"></script>
<style type="text/css">
		.navbox{width:100%;}
		.navbox ul,.navbox ul li p{padding:0px;margin:0px;list-style:none;line-height:17px;}
		.navbox ul li{float:left;width:86px;height:88px;padding:10px;text-align:center;}
		.navbox ul li a{display:block;width:76px;height:85px;padding:8px 5px 0px;font-size:12px;color:#000; text-decoration:none;overflow:hidden;}
		.navbox ul li a:hover,.navbox ul li a:visited{background:url(images/icon_over.png) no-repeat center center ;}
		.navbox ul li img{border:none;}
		
		.ui-dialog-title{
			font-size: 12px;
		}
		.ui-dialog-content{
			font-size: 12px;
		}
		
		.ui-dialog-buttonpane{
			font-size: 12px;
		}

		
	</style>
</head>
<body style="background-color: white;height: 95%;width: 98%;">
  <!-- 
  <table>
	  <c:forEach items="${deskelements}" var="deskelement">
	  <tr>
	  	<td>${deskelement.name }</td>
	  	<td><a class="moveFolder" href="javascript:void(0);" id="${deskelement.id }">移出文件夹</a></td>
	  </tr>
	  </c:forEach>
  </table>
   -->
  <div class="navbox">
  	<ul>
  		<c:forEach items="${deskelements}" var="deskelement">
	  		<li>
	      		<a id="${deskelement.id}" href="#" title="${deskelement.name}">
	      			<input id="${deskelement.id}" name="app_href" type="hidden" value="${deskelement.href}"/>
	          		<p class="navImg"><img src="/${deskelement.backgroudPic}" width="45" height="45" /></p>
	          		<p class="navText">
	          		<!-- 最大显示5个字符
					      <c:choose>
							<c:when test="${fn:length(deskelement.name) >= 6 }">
								${fn:substring(deskelement.name, 0, 6) }
	  						</c:when>
							<c:otherwise>
								${deskelement.name }
	  						</c:otherwise>
						  </c:choose> -->
						  ${deskelement.name }
	          		</p>
	      		</a>
	    	</li>
    	</c:forEach>
  	</ul>
  </div>
  
	<div id="message-dialog-form" title="提示" style="display: none;padding-top: 10px;">
		确定执行删除操作吗？
	</div>
</body>
</html>
