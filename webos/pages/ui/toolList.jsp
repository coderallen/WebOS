<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<c:set var="ctx" value="${pageContext.request.contextPath}"/>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html> 
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<script type="text/javascript" src="${ctx }/ui/js/jquery-1.7.2.min.js"></script>
	<script type="text/javascript">
	var browser={
		    versions:function(){
		           var u = navigator.userAgent, app = navigator.appVersion;
		           return {//移动终端浏览器版本信息
		                trident: u.indexOf('Trident') > -1, //IE内核
		                presto: u.indexOf('Presto') > -1, //opera内核
		                webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
		                gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
		                mobile: !!u.match(/AppleWebKit.*Mobile.*/)||!!u.match(/AppleWebKit/), //是否为移动终端
		                ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
		                android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
		                iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器
		                iPad: u.indexOf('iPad') > -1, //是否iPad
		                webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
		            };
		         }(),
		         language:(navigator.browserLanguage || navigator.language).toLowerCase()
		}
	
		function choiceTool(id, code) {
			
			// 先判断选择的工具是否已经安装	
			var divid = code + "_div";
			var tabNum =  window.parent.getTabNum();
			$.ajax({
				  type: 'GET',
				  url: 'Index!choiceTool.do?math=' + Math.random(),
				  data: { locationPage:tabNum, toolId:id},
				  dataType : 'text',
				  success: function(msg) {
					  // 转换为json对象
					  var data = eval("(" + msg + ")"); 
					  // 如果没有安装则安装
					  if(data.message == "success") {
						  
						  if(divid == "Clock_div" && browser.versions.ios){
							  alert("抱歉,暂时不支持IOS设备的时钟组件.");
							  return;
						  }
						// 显示
						$("#" + divid, window.parent.document).css("display", 'block');

						// 设置位置

						//TODO 加载工具内容
						window.parent.myLib.desktop.navTab.ajaxToolsPosition(tabNum);
						
					  } else {
						// 存在
						
					  }
				  }
			});
		}
	</script>
	<style type="text/css">
		ul{margin:0px;padding:0px;list-style:none;}
		.icons05{width:100%;margin:0px;padding:15px 0px;list-style:none;}
		ul.icons05 li{width:20%;float:left;height:120px;margin-bottom:15px;}
		ul.icons05 li a{display:block;margin:0px auto;text-align:center;width:110px;padding-top:10px;height:110px;font-size:12px;color:#000;text-decoration:none;line-height:24px;}
		ul.icons05 li a:hover{background:url(/ui/images/80x80/icon_over.png) no-repeat center center;}
		ul.icons05 li img{border:none;}
	</style>
</head>

	<body style="background-color: white;">
		<ul class="icons05">
			<c:forEach items="${tools }" var="tool">
		  		<li><a href="javascript:void(0);" onclick="choiceTool('${tool.id}', '${tool.code }');"><img src="${ctx }/${tool.icon }" width="80" height="80" /><br />${tool.name }</a></li>
			</c:forEach>
		</ul>
	</body>
</html>