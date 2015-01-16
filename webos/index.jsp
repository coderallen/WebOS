<%@ page language="java" pageEncoding="UTF-8"%>

<%@ page import="org.springframework.web.context.support.WebApplicationContextUtils"%>
<%@ page import="org.springframework.context.ApplicationContext"%>
<%@ page import="org.springframework.security.core.context.SecurityContextHolder"%>
<%@ page import="org.springframework.security.core.userdetails.User"%>
<%@ page import="org.apache.struts2.ServletActionContext" %>
<%@ page import="com.opendata.common.util.SysParameterUtil"%>
<%@ page import="java.util.*" %>

<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>

<c:set var="ctx" value="${pageContext.request.contextPath}"/>

<%
	ServletActionContext sf;
	ApplicationContext ac = WebApplicationContextUtils.getWebApplicationContext(this.getServletContext());
	Map<String,String> paras = ((SysParameterUtil)ac.getBean("sysParameterUtil")).getParas();
%>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd"> 
<!--<!DOCTYPE html PUBLIC "-//WAPFORUM//DTD XHTML Mobile 1.0//EN" "http://www.wapforum.org/DTD/xhtml-mobile10.dtd">-->
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta http-equiv="x-ua-compatible" content="ie=8"> 

<meta name="viewport" content="minimum-scale=1.0, maximum-scale=1.0, initial-scale=1.0, width=device-width, user-scalable=no">

<title>紫光优易数字校园</title>
<c:if test="${ui_user.themeColor == null}">
	<link rel="stylesheet" id="theme_style" href="${ctx }/ui/css/gray.css"/>
</c:if>
<c:if test="${ui_user.themeColor != null}">
	<link rel="stylesheet" id="theme_style" href="${ctx }/ui/css/${ui_user.themeColor}.css"/>
</c:if>

<link rel="stylesheet" href="${ctx }/ui/js/themes/base/jquery.ui.all.css" />
<link rel="stylesheet" href="${ctx }/ui/css/tools.css" />
<link rel="stylesheet" href="${ctx }/ui/js/jquery-smartMenu/css/smartMenu.css" />
<link rel="stylesheet" href="${ctx}/ui/css/application.css"/>

<script type="text/javascript" src="${ctx }/ui/js/jquery-1.7.2.min.js"></script>
<script type="text/javascript" src="${ctx }/ui/js/jquery-ui.min.js"></script>
<script type="text/javascript" src="${ctx }/ui/js/touch/jquery.jswipe.js"></script>
<script type="text/javascript" src="${ctx }/ui/js/jquery.winResize.js"></script>
<script type="text/javascript" src="${ctx }/ui/js/external/jquery.mousewheel.js"></script>

<script type="text/javascript" src="${ctx }/ui/js/external/PCScroll.js"></script><!-- PC模拟滚动条 -->
<script type="text/javascript" src="${ctx }/ui/js/external/PADScroll.js"></script><!-- PAD模拟滚动条 -->

<script type="text/javascript" src="${ctx }/ui/js/jquery-smartMenu/js/jquery-smartMenu.js"></script>
<script type="text/javascript" src="${ctx }/ui/js/touch/jquery.ui.touch-punch.min.js"></script>

<script type="text/javascript" src="${ctx }/ui/js/base.js"></script>
<script type="text/javascript" src="${ctx }/ui/js/index.js"></script>
<script type="text/javascript" src="${ctx }/ui/js/movediv.js"></script>
<script type="text/javascript">
	//添加至收藏夹
	function addFavorite(){
		if (document.all){  
			window.external.addFavorite('<%="http://" + request.getLocalAddr() + ":" + request.getLocalPort() + "/"%>${ctx}', '数字化校园平台');
		}else if(window.sidebar){  
			window.sidebar.addPanel('数字化校园平台', '<%="http://" + request.getLocalAddr() + ":" + request.getLocalPort() + "/"%>${ctx}', "");
		}else{  
			alert('您的浏览器不支持该功能\n您可以尝试通过快捷键Ctrl + D 加入到收藏夹.');
		}  
	}
</script>
<script type="text/javascript">
function MM_swapImgRestore() { //v3.0
  var i,x,a=document.MM_sr; for(i=0;a&&i<a.length&&(x=a[i])&&x.oSrc;i++) x.src=x.oSrc;
}
function MM_preloadImages() { //v3.0
  var d=document; if(d.images){ if(!d.MM_p) d.MM_p=new Array();
    var i,j=d.MM_p.length,a=MM_preloadImages.arguments; for(i=0; i<a.length; i++)
    if (a[i].indexOf("#")!=0){ d.MM_p[j]=new Image; d.MM_p[j++].src=a[i];}}
}

function MM_findObj(n, d) { //v4.01
  var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
    d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
  if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
  for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);
  if(!x && d.getElementById) x=d.getElementById(n); return x;
}

function MM_swapImage() { //v3.0
  var i,j=0,x,a=MM_swapImage.arguments; document.MM_sr=new Array; for(i=0;i<(a.length-2);i+=3)
   if ((x=MM_findObj(a[i]))!=null){document.MM_sr[j++]=x; if(!x.oSrc) x.oSrc=x.src; x.src=a[i+2];}
}
</script>
<!-- PC滚动条 -->
<style type="text/css">
    .divScrollBar{z-index:9999;background-color:#ddd;position:absolute;border-radius: 5px;opacity:0.5; filter:Alpha(opacity=50);}
    .divScrollBar:hover{opacity:1; filter:Alpha(opacity=100);}
    .divScrollBar div{background-color:#70F77E; position:absolute; left:0px; top:0px;border-radius: 5px;}
</style>

</head>

<body style="background:url(${ctx }/ui/wallpapers/${ui_user.backgroundPicTabOne}) ">
	<input type="hidden" id="dock_hidden" value="${dock }"/>
<div id="desktop" style=";border: 0 solid red;color: #333333;cursor: default;height: 100%;overflow: hidden;width: 100%;position: absolute;">
	<div id="nav_tab" class="nav_tab">
	  <div class="nav_tab_left">
	    <ul>
	      <li id="tab_1" title="Ctrl + Alt + 1" class="over">1</li>
	      <li id="tab_2" title="Ctrl + Alt + 2">2</li>
	      <li id="tab_3" title="Ctrl + Alt + 3">3</li>
	      <li id="tab_4" title="Ctrl + Alt + 4">4</li>
	      <li id="tab_5" title="Ctrl + Alt + 5">5</li>
	    </ul>
	  </div>
	  <div class="nav_tab_right">
	  <a href="#" class="nav_tools" id="globalView"><img src="${ctx }/ui/images/zd.gif" width="1" height="1"></a>
	  <a href="javascript:void(0);" class="nav_sharch" id="navSearch"><img src="${ctx }/ui/images/zd.gif" width="1" height="1"></a>
	  </div>
	</div>
	<div class="searchBox" style="display: none; top: 45px;left:50%;position: absolute;margin-left: -82px; " id="searchDiv">
	    <input type="text" name="textfield" id="pageletSearchInput" class="searchText" value="搜索应用..." />
	    <!-- <input type="submit" name="button" id="button" value="提交" class="searchBnt" /> -->
	</div>
	<div class="searchPoint" style="display: none;top: 77px;left:50%;position: absolute;margin-left: -82px;" id="pagelet_search_suggest">
	  <ul class="pointList" id="sb_resultBox"></ul>
	</div>
	<c:forEach items="${tools }" var="tool">
	<!-- 时钟 -->
	<c:if test="${tool.code eq 'Clock' }">
	<c:choose>
		<c:when test="${fn:contains(firstUTSid, tool.id)}">
	<div id="Clock_div" toolid="${tool.id }" class="clock_css" style="display: block;">
		</c:when>
		<c:otherwise>
	<div id="Clock_div" toolid="${tool.id }" class="clock_css" style="display: none;">
		</c:otherwise>
	</c:choose>
		<div class="clock_cssClose"><a href="javascript:void(0);" onclick="myLib.desktop.navTab.removeTools('${tool.code}', '${tool.id}');" title="关闭"></a></div>
		<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,29,0" width="140" height="137"> 
			<param name="movie" value="${ctx }/ui/clock.swf"> 
			<param name="quality" value="high"> 
			<param name="wmode" value="transparent"> 
			<embed src="${ctx }/ui/clock.swf" width="140" height="137" quality="high" pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash" wmode="transparent"></embed> 
		</object>
	</div>
	</c:if>
	
	<!-- 校历 -->
	<c:if test="${tool.code eq 'SchoolCale' }">
	<c:choose>
		<c:when test="${fn:contains(firstUTSid, tool.id)}">
	<div class="school_info" id="SchoolCale_div" toolid="${tool.id }" style="display: block;">
		</c:when>
		<c:otherwise>
	<div class="school_info" id="SchoolCale_div" toolid="${tool.id }" style="display: none;">
		</c:otherwise>	
	</c:choose>	
  		<div class="tigboxClose"><a href="javascript:void(0);" onclick="myLib.desktop.navTab.removeTools('${tool.code}', '${tool.id}');" title="关闭"></a></div>
  		<div class="tigtext">
	  		<span class="tigschool"><strong>哈哈学校</strong></span><br />
	  		秋季学期 第<span class="tigtext2"><strong>5</strong></span>周<br />
	  		<%=paras.get("date")%>
  		</div>
	</div>
	</c:if>
	<!-- 待办任务 -->
	<c:if test="${tool.code eq 'ToDo' }">
		<c:choose>
		<c:when test="${fn:contains(firstUTSid, tool.id)}">
		<div class="drag_box" id="ToDo_div" toolid="${tool.id }" style="display: block;">
		</c:when>
		<c:otherwise>
		<div class="drag_box" id="ToDo_div" toolid="${tool.id }" style="display: none;">
		</c:otherwise>
		</c:choose>
		  <div class="drag_title">
		    <h2>待办事项</h2>
		    <a href="javascript:void(0);" onclick="myLib.desktop.navTab.removeTools('${tool.code}', '${tool.id}');" title="关闭"></a>
		  </div>
		  <div class="drag_centent"></div>
		  <div class="drag_bottom"></div>
		</div>
	</c:if>
	<c:if test="${tool.code eq 'Notice' }">
		<c:choose>
		<c:when test="${fn:contains(firstUTSid, tool.id)}">
		<div class="drag_box" id="Notice_div" toolid="${tool.id }" style="display: block;">
		</c:when>
		<c:otherwise>
		<div class="drag_box" id="Notice_div" toolid="${tool.id }" style="display: none;">
		</c:otherwise>
		</c:choose>
		  <div class="drag_title">
		    <h2>通知公告</h2>
		    <a href="javascript:void(0);" onclick="myLib.desktop.navTab.removeTools('${tool.code}', '${tool.id}');" title="关闭"></a>
		  </div>
		  <div class="drag_centent"></div>
		  <div class="drag_bottom"></div>
		</div>
	</c:if>
	<c:if test="${tool.code eq 'Curriculum' }">
	<c:choose>
		<c:when test="${fn:contains(firstUTSid, tool.id)}">
	<div class="drag_box" id="Curriculum_div" toolid="${tool.id }" style="display: block;">	
		</c:when>
		<c:otherwise>
	<div class="drag_box" id="Curriculum_div" toolid="${tool.id }" style="display: none;">	
		</c:otherwise>
	</c:choose>
		<div class="drag_title">
		    <h2>课程表</h2>
		    <a href="javascript:void(0);" onclick="myLib.desktop.navTab.removeTools('${tool.code}', '${tool.id}');" title="关闭"></a>
		</div>
		<div class="drag_centent"></div>
        <div class="drag_bottom"></div>  
	</div>
	</c:if>
	<c:if test="${tool.code eq 'Schedule' }">
		<c:choose>
		<c:when test="${fn:contains(firstUTSid, tool.id)}">
		<div class="drag_box" id="Schedule_div" toolid="${tool.id }" style="display: block;">
		</c:when>
		<c:otherwise>
		<div class="drag_box" id="Schedule_div" toolid="${tool.id }" style="display: none;">
		</c:otherwise>
		</c:choose>
		  <div class="drag_title">
		    <h2>日程</h2>
		    <a href="javascript:void(0);" onclick="myLib.desktop.navTab.removeTools('${tool.code}', '${tool.id}');" title="关闭"></a>
		  </div>
		  <div class="drag_centent"></div>
		  <div class="drag_bottom"></div>
		</div>
	</c:if>
	
	</c:forEach>

	<div id="icon_div" class="icon_div">
		<ul id="deskIcon_1" class="deskIcon" style="margin-top:50px; ">
			<c:forEach items="${deskicons }" var="deskicon">
				<c:if test="${deskicon.locationPage == 1 }">
					<li class="desktop_icon" id="${deskicon.id }" title="${deskicon.name }">
					  	<input type="hidden" name="app_href" value="${deskicon.href }"/>
					  	
					  	<c:choose>
							<c:when test="${deskicon.backgroudPic == null || deskicon.backgroudPic eq '' }">
	  							<span class="icon"><img src="${ctx }/ui/icon/default.png" /></span>
	  						</c:when>
							<c:otherwise>
								<span class="icon"><img src="${ctx }/${deskicon.backgroudPic}" /></span>
	  						</c:otherwise>
						</c:choose>
					  	
						<%-- <span class="icon"><img src="${ctx }/${deskicon.backgroudPic}" /></span> --%>
					    <div class="text">
					      <!-- 最大显示5个字符 -->
					      <c:choose>
							<c:when test="${fn:length(deskicon.name) >= 5 }">
								${fn:substring(deskicon.name, 0, 4) }
	  						</c:when>
							<c:otherwise>
								${deskicon.name }
	  						</c:otherwise>
						  </c:choose>
					      <div class="right_cron"></div>
					    </div>
				    </li>
				</c:if>
			</c:forEach>		  
		  
		</ul>
		
		<!-- 第二页 -->
		<ul id="deskIcon_2" class="deskIcon" style="margin-top:50px;display: none;"></ul>
		<ul id="deskIcon_3" class="deskIcon" style="margin-top:50px;display: none;"></ul>
		<ul id="deskIcon_4" class="deskIcon" style="margin-top:50px;display: none;"></ul>
		<ul id="deskIcon_5" class="deskIcon" style="margin-top:50px;display: none;"></ul>
	</div>
	
	<div id="taskBar" class="taskBar">
	  <div id="leftBtn" class="leftBtn"><a href="#" class="upBtn"></a></div>
	  <div id="rightBtn" class="rightBtn"><a href="#" class="downBtn"></a> </div>
	  <div id="task_lb_wrap" class="task_lb_wrap">
	    <div id="task_lb" class="task_lb">
	    	<a id="a_show_desktop" title="显示桌面" href="#" class="selectTab" style="width: 40px;height: 40px;"><img style="width:30px;height: 30px;padding-top: 5px;" src="${ctx }/ui/images/show_desk.png"/></a>
	    </div>
	  </div>
	</div>
	
	<!-- 左侧导航栏 -->
	<div id="lr_bar" class="lr_bar">
	  <ul id="default_app" class="default_app">
	  	<c:forEach items="${navigationIcons }" var="navigationIcon">
	  		<li id="${navigationIcon.id }">
	    	<input type="hidden" name="app_href" value="${navigationIcon.href }"/>
	    	<input type="hidden" name="app_id" value="${navigationIcon.id }"/>
	    	<img src="${ctx }/${navigationIcon.backgroudPic }" title="${navigationIcon.name }"/>
	    	</li>
	  	</c:forEach>
	  </ul>
	  <div id="default_tools" class="default_tools"> 
		  <span id="shizhong_btn" class="shizhong_btn" title="时钟"></span> 
		  <span id="yyzx_btn" class="apply_btn" title="应用中心"></span>
		  <span id="tools_btn" class="tools_btn" title="小工具管理"></span> 
		  <span id="theme_btn" class="theme_btn" title="主题"></span>
	  </div>
	  <div id="start_block" class="start_block">
	  	<a title="开始" id="start_btn" class="start_btn"></a>
	    <div id="start_item" class="start_item">
	    	<ul class="item admin">
		    	<li id="_userinfo"><span class="adminImg"></span> ${Login_Info.userName}</li>
		    	
			</ul>
			<ul class="item admin"><!-- 一级 -->
			<li id="all_program" name="allProgram"><img src="${ctx}/ui/icon/folder.png" style="width:24px;height:24px;vertical-align: middle;padding:0px 10px;"/>全部功能<b></b></li>
		        <c:forEach items="${commonfun }" var="program">
			      	<li id="${program.id}" url="${program.url}" name="${program.permissionname}" class="_program_app_p" style="text-align: "><img src="${program.icon}" style="width:24px;height:24px;vertical-align: middle;padding:0px 10px;"/>${program.permissionname }</li>
		      	</c:forEach>
			</ul>
	      <ul class="item">
	      
	        <li id="_favorite" onclick="addFavorite();"><span class="sitting_btn"></span>添加到收藏</li>
			 <!--<li id="_serverCenter"><span class="help_btn"></span>服务中心</li> -->
			 <li id="_version"><span class="about_btn"></span>版本信息</li>
	        <li id="_logout"><span class="logout_btn"></span>退出系统</li>
	      </ul>
	    </div>
	    <div id="program_item" class="start_item" style="height:492px;left:260px;overflow: hidden;"><!-- height:490px; -->
		      <ul class="item"><!-- 二级 -->
		      	<c:forEach items="${programs }" var="program">
			      	<li id="${program.id }" class="_program_app"><img src="${program.bigIcon}" style="width:24px;height:24px;vertical-align: middle;padding:0px 10px;"/>${program.name }<b></b></li>
		      	</c:forEach>
		      </ul>
	    </div> 
	  </div>
	</div>
</div>

<div id="appManagerPanel" class="appManagerPanel"  style="display: none;">
	<!-- 退出 -->
	<a id="aMg_close_Id" class="aMg_close" href="###"></a>
	<!-- 横向显示 -->
	<div class="aMg_dock_container" id="default_app_horizontal"></div>
	<!-- 中间的分割线 -->
	<div class="aMg_line_x"></div>
	<div class="aMg_folder_container" style="height: 590px; " id="app_container_horizontal"></div>
</div>



<div id="dialog-form" title="新建文件夹" style="display: none;padding-top: 10px;">
	<label for="name" style="float: left; font-size: 15px;">名称</label>&nbsp;
	<!--  
	<input type="text" name="folder_name" id="folder_name" class="text ui-widget-content ui-corner-all" style="width: 230px;"/>
	-->
	<input type="text" name="folder_name" id="folder_name" style="border: 1px solid #D4D0C8;width:150px;height: 20px;"/>
	<span id="create_folder_message"></span>
</div>
<div id="message-dialog-form" title="提示" style="display: none;padding-top: 10px;">
	确定执行删除操作吗？
</div>
<div id="version-dialog-form" title="版本信息" style="display: none;padding-top: 10px;">
	<p>
	名&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;称：紫光优易数字校园  V5.0<br/>
	版权所有：紫光软件系统有限公司
	</p>
</div>
<div id="logout-dialog-form" title="提示" style="display: none;padding-top: 10px;">
	确定退出系统吗？
</div>
<div id="movetofolder-dialog-form" title="提示" style="display: none;padding-top: 10px;">
	是否要移入文件夹？
</div>

<!-- // 消息提醒 -->
<div style="left:480px;bottom:20px;;position: absolute;width: 310px;height:40px; background-color: transparent;" id="pullmessage_div">
<iframe src="${ctx}/pullmessage.jsp" style="background-color: transparent;width: 310px;height:40px;" scrolling="no" frameborder="0" allowTransparency="true"></iframe>
</div>
<div id="program_app_item" class="start_item" style="left: 447px; display: none;"></div><!-- 三级 -->

</body>
</html>




