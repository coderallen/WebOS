<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<c:set var="ctx" value="${pageContext.request.contextPath}"/>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html> 
<head>
<link rel="stylesheet" href="${ctx }/ui/js/themes/base/jquery.ui.all.css" />
<script type="text/javascript" src="${ctx }/ui/js/jquery-1.7.2.min.js"></script>
<script type="text/javascript" src="${ctx }/ui/js/jquery-ui.min.js"></script>

<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<script>
    $(function() {
        $("#tabs").tabs();
    });
</script>
<style type="text/css">
.themeSetting_area {
	overflow-x: hidden;
	overflow-y:hidden;
}

a.themeSetting_settingButton {
	display: inline;
	float: left;
	margin: 5px 10px 0;
	width: 160px;
	height: 140px;
	cursor: pointer;
	-khtml-border-radius: 5px;
	-webkit-border-radius: 5px;
	border-radius: 5px;
}

:LINK, :VISITED {
	text-decoration: none;
}
a {
	font: 12px/1.5 tahoma, helvetica, clean, sans-serif;
	color: #45649E;
}

.themeSetting_settingButton_icon {
	border-radius: 5px 5px 5px 5px;
	height: 110px;
	margin: 5px auto;
	width: 150px;	
}

.themeSetting_settingButton_icon img{
	height: 110px;
	width: 150px;	
	border-radius: 5px 5px 5px 5px;
	border: none;
}

.themeSetting_settingButton_text {
	margin: 5px 0 0 0;
	text-align: center;
}

a.themeSetting_settingButton:hover {
	background: none repeat scroll 0 0 #CBEfff;
}

.color_theme{padding-top: 15px;}
.color_a{
	padding: 0px 15px;
}

</style>


</head>
<body style="background-color: white;">
	<div id="tabs" align="center" style="width:98%;height: 100%;">
		<ul>
	        <li><a href="#tabs-1">壁纸</a></li>
	        <li><a href="#tabs-2">色调</a></li>
    	</ul>
    	<div id="tabs-1" class="themeSetting_area" style="display: block;height: 100%">
		<c:forEach items="${result }" var="str">
			<a class="themeSetting_settingButton" href="###" id="${str}">
				<div class="themeSetting_settingButton_icon" title="${str}">
					<img alt="" src="${ctx}/ui/wallpapers/${str}.jpg">
				</div> 
				<div class="themeSetting_settingButton_text">
					<c:choose>
						<c:when test="${str == 'Default'}">默认</c:when>
						<c:when test="${str == 'Cheng_Zhang'}">成长</c:when>
						<c:when test="${str == 'Da_Hai'}">大海</c:when>
						<c:when test="${str == 'Feng_Jing'}">风景</c:when>
						<c:when test="${str == 'Hua_Duo'}">花朵</c:when>
						<c:when test="${str == 'Hu_Die'}">蝴蝶</c:when>
						<c:when test="${str == 'Jing_Ling'}">精灵</c:when>
						<c:when test="${str == 'Lv_Ye'}">绿叶</c:when>
						<c:when test="${str == 'Sen_Lin'}">森林</c:when>
						<c:when test="${str == 'Shu_Zhuo'}">书桌</c:when>
						<c:when test="${str == 'Xiang_Ri_Kui'}">向日葵</c:when>
						<c:when test="${str == 'Guang_Mu'}">光幕</c:when>
						<c:otherwise>${str}</c:otherwise>
					</c:choose>
				</div>
			</a>
		</c:forEach>
	</div>
	<div id="tabs-2" class="color_theme" align="center" style="height: 100%">
		<a id="blue" class="color_a" href="#" title="蓝色">
		    <img border="0" src="${ctx}/ui/images/blue.jpg" width="60" height="57" />
		</a>
		<a id="yellow" class="color_a" href="#" title="黄色">
			<img border="0" src="${ctx}/ui/images/yellow.jpg" width="60" height="57" />
		</a>
		<a id="red" class="color_a" href="#" title="红色">
			<img border="0" src="${ctx}/ui/images/red.jpg" width="60" height="57" />
		</a>
		<a id="green" class="color_a" href="#" title="绿色">
			<img border="0" src="${ctx}/ui/images/green.jpg" width="60" height="57" />
		</a>
		<a id="gray" class="color_a" href="#" title="灰色">
			<img border="0" src="${ctx}/ui/images/gray.jpg" width="60" height="57" />
		</a>
	</div>
	</div>
	

	<script type="text/javascript">
		$(function(){
			  // 绑定图片的点击事件
			  $("a[class='themeSetting_settingButton']").click(function() {
				  // 当前页签
				  var currentTabNumber = window.parent.getTabNum();
			      window.parent.myLib.desktop.changeWallpapers($(this).attr("id"), currentTabNumber);
			  });
			  
			  // 绑定图片的点击事件
			  $("a[class='color_a']").click(function() {
				if($(this).attr("id") != "null" && $(this).attr("id") != undefined){
					window.parent.myLib.desktop.changeTheme($(this).attr("id"));
				}
			  });
		});
	</script>
</body>
</html>