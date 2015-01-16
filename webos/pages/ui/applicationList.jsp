<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>

<c:set var="ctx" value="${pageContext.request.contextPath}"/>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<style type="text/css">
html,body{height:100%;}
body{margin:0;padding:0;font-size:12px;font-family:"宋体"; background:url(${ctx}/ui/images/applist/leftbg.jpg) repeat-y left;}

ul,li,form,input{margin:0;padding:0;}
a{text-decoration:none;}
img{border:none;display:block;}
.clear_both{clear:both;font-size:0;overflow:hidden;height:0;}

.box{margin:0 auto;height:100%;width:100%;}
.side{width:96px;float:left;}
.anniu{width:96px;height:36px;line-height:36px;}
.anniu_bj{background:url(${ctx}/ui/images/applist/lefover.jpg) no-repeat left center;}
.anniu a{color:#555555;text-indent:1.6em;display:block;width:96px;height:36px;background:url(${ctx}/ui/images/applist/lefico.gif) no-repeat 10px 15px;}
.anniu_bj a,.anniu a:hover{color:#742300;background:url(${ctx}/ui/images/applist/lefico.gif) no-repeat 10px -20px;}
.anniu a:hover{font-weight:bold;}

.right{overflow:hidden; background:url(${ctx}/ui/images/applist/rigbg.jpg) repeat-x top;}
.sousuokk{float:right;}
.sousuo{height:60px;padding-right:15px;}
.all{float:left;line-height:48px;text-align:right;padding-right:10px;}
.all span{color:#ff0000;}
.sou{float:left;padding-top:8px;}
.sou input.kuang{color:#8a8a8a;border:0px solid #FFF;background:url(${ctx}/ui/images/applist/searchbg.gif) no-repeat;width:206px;height:30px;line-height:30px;padding-left:6px;font-size:14px;}
.sou input.search{border:0px solid #FFF;background:url(${ctx}/ui/images/applist/searchbut.gif) no-repeat;width:30px;height:30px; cursor:pointer;}

.sou ul{list-style:none;padding-left:12px;width:200px;height:30px;background:url(${ctx}/ui/images/applist/tabbg.gif) no-repeat right top;}
.sou ul li{display:block;width:100px;float:left;height:30px;line-height:30px;text-align:center;background:url(${ctx}/ui/images/applist/tabbg.gif) no-repeat left bottom; cursor:pointer;color:#999999;}
.sou ul li.on{background-position:right bottom;color:#000;}

.neirong{padding:0 15px;}
.con{min-height:78px;_height:78px;width:auto; background:url(${ctx}/ui/images/applist/xux.jpg) repeat-x bottom;padding-bottom:2px;}
.tu{float:left;padding:16px;width:45px;}
.zi{float:left;padding:15px 0;line-height:24px;color:#969696;}
.zi a{color:#969696;}
.title a{color:#333;font-weight:bold;}
.induction{word-break:break-all;word-warp:warp;}
.good{float:right;padding:15px 0;line-height:24px;width:150px;}
.good a{color:#969696;}
.star{height:24px;vertical-align:middle;}
.tianjia {float:right;width:80px;padding-top:28px;}

.page{height:40px;line-height:40px;text-align:center;clear:both;}
.page a{margin:0 6px;color:#969696;}
.page a.blue{color:#4e68b6;}

/*二级应用展示*/
.subCon{margin:0px 15px 15px; background:#f8f8f8;clear:both;border:1px solid #e9e9e9;padding:10px;}
.subConjt{position:absolute;width:30px;height:7px; background:url(${ctx}/ui/images/applist/jt.gif) no-repeat 20px 0px;margin-top:-6px;}
.con22{min-height:78px;_height:78px;border-bottom:1px solid #eeeeee;}
	</style>
	 
<script type="text/javascript" src="${ctx }/ui/js/jquery-1.7.2.min.js"></script>
<script type="text/javascript">
	function changeType(key) {
		if(key == 'all') {
			//key = null; //ie这个笨蛋，不识别
			key = '';
		}
		$("#applicationType").attr('value', key);

		// 点左侧应用分类时，消除搜索内容
		$("#searchApplicationText").attr('value', '搜索应用');

		// 提交
		$("#changeTypeForm").submit();
	}
</script>
	
</head>

<body style="background-color: white;">

	<!-- 应用类型切换 -->
	<form method="post" id="changeTypeForm" action="${ctx }/ui/Deskelement!applicationList.do">
		<input type="hidden" name="applicationType" id="applicationType" value="${applicationType }"/>
		<input type="hidden" name="currentPage" id="currentPage"/>

	<div class="box">
	  <!-- 左侧 -->
      <div class="side">
      
      	<c:choose>
      			<c:when test="${applicationType == null || applicationType eq '' }">
				<div class="anniu anniu_bj">
				</c:when>
				<c:otherwise>
				<div class="anniu">
				</c:otherwise>
      		</c:choose><span></span><a href="javascript:void(0);" onclick="changeType('all');">全部应用</a>
      	  </div>
      <%-- 
      	  <c:choose>
      	  	<c:when test="${applicationType eq 'install' }">
      	  		<div class="anniu anniu_bj">
      	  	</c:when>
      	  	<c:otherwise>
      	  		<div class="anniu">
      	  	</c:otherwise>
      	  </c:choose><span></span><a href="javascript:void(0);" onclick="changeType('install');">已安装应用</a>
      	  </div>
      	  
      	  <c:choose>
      	  	<c:when test="${applicationType eq 'uninstall' }">
      	  		<div class="anniu anniu_bj">
      	  	</c:when>
      	  	<c:otherwise>
      	  		<div class="anniu">
      	  	</c:otherwise>
      	  </c:choose><span></span><a href="javascript:void(0);" onclick="changeType('uninstall');">未安装应用</a>
      	  </div>
      --%>
      		
      		<c:forEach items="${applicationTypes }" var="atype">
	      		<c:choose>
	      			<c:when test="${applicationType eq atype.key }">
					<div class="anniu anniu_bj">
					</c:when>
					<c:otherwise>
					<div class="anniu">
					</c:otherwise>
	      		</c:choose>
	      		<span></span><a href="javascript:void(0);" onclick="changeType('${atype.key }')">${atype.value }</a>
	      		</div>
	        </c:forEach>
	        
			<!-- <div class="anniu anniu_bj"> -->
			<div class="anniu">
      		<span></span><a href="javascript:void(0);" onclick="alert('打开应用中心...');"> 应用中心</a>
      	    </div>
      </div>
      
      <!-- 右侧 -->
      <div class="right">

            <div class="sousuo">
              <div class="sousuokk" style="">
                  <div class="all">共有<span> ${totalApplications } </span>个应用</div>
                  <div class="sou"><input type="text" name="searchApplication" value="搜索应用" class="kuang" id="searchApplicationText" /></div>
                  <div class="sou"><input type="submit" value="" class="search" id="searchApplicationButton" /></div>
                  <!--  
                  <a href="javascript:void(0);" onclick="changeType('all');">全部应用</a>
                  <a href="javascript:void(0);" onclick="changeType('install');">已安装应用</a>
                  <a href="javascript:void(0);" onclick="changeType('uninstall');">未安装应用</a>
                  -->
                  <div class="sou"> 
                    <ul>
                      <c:choose>
                      	<c:when test="${applicationType == 'install' }">
                      		<%-- 
                      		<li class="on"><a href="javascript:void(0);" onclick="changeType('install');">已安装应用</a></li>
                      		--%>
                      		<li class="on" onclick="changeType('install');">已安装应用</li>
                      	</c:when>
                      	<c:otherwise>
                      		<%-- 
                      		<li><a href="javascript:void(0);" onclick="changeType('install');">已安装应用</a></li>
                      		--%>
                      		<li onclick="changeType('install');">已安装应用</li>
                      	</c:otherwise>
                      </c:choose>
                      <c:choose>
                      	<c:when test="${applicationType == 'uninstall' }">
                      		<%-- 
                      		<li class="on"><a href="javascript:void(0);" onclick="changeType('uninstall');">未安装应用</a></li>
                      		--%>
                      		<li class="on" onclick="changeType('uninstall');">未安装应用</li>
                      	</c:when>
                      	<c:otherwise>
                      		<%-- 
                      		<li><a href="javascript:void(0);" onclick="changeType('uninstall');">未安装应用</a></li>
                      		--%>
                      		<li onclick="changeType('uninstall');">未安装应用</li>
                      	</c:otherwise>
                      </c:choose>
                    </ul>
                  </div>
              </div>
              <div class="clear_both"></div>
            </div>
            <!-- 内容开始 -->
            <div class="neirong">
            	<c:forEach items="${applicationList }" var="application">
	            	  <div class="con" id="${application.id }">
	                        <div class="tu"><a href="#"><img src="${ctx }/${application.bigIcon }" width="45" height="45" /></a></div>
	                        <div class="zi">
	                              <div class="title"><a href="javascript:void(0);" class="mingzi">${application.name }</a></div>
	                              <div class="induction"><a href="javascript:void(0);" title="${application.description }">
	                              <c:choose>
									<c:when test="${fn:length(application.description) >= 25 }">
										${fn:substring(application.description, 0, 25) }...
			  						</c:when>
									<c:otherwise>
										${application.description }
			  						</c:otherwise>
								  </c:choose>
	                             </a></div>
	                        </div>
	                        <div class="tianjia">
	                        	<c:choose>
									<c:when test="${fn:contains(installedApplication, application.id)}">
										<a href='javascript:void(0);' class='uninstallClass' id="${application.id}" t="applicationT">
										<img src="/ui/images/applist/close.png" width="55" height="22" />
										</a>
										<a href="javascript:void(0);" class="addBtnClass" id="${application.id}">
										<img src="/ui/images/applist/add.png" width="55" height="22" style="display: none;" />
										</a>
			  						</c:when>
									<c:otherwise>
										<a href='javascript:void(0);' class='uninstallClass' id="${application.id}" t="applicationT">
										<img src="/ui/images/applist/close.png" width="55" height="22" style="display: none;" />
										</a>
										<a href="javascript:void(0);" class="addBtnClass" id="${application.id}">
										<img src="/ui/images/applist/add.png" width="55" height="22" />
										</a>
			  						</c:otherwise>
								</c:choose>
	                        </div>
		                   <!-- 二级展示 -->
		                   <div class="subCon" style="display: none;" id="subCon_${application.id }"></div>
		                   <!-- 二级展示 -->
	                  </div>
            	  </c:forEach>
            	
            	  <!-- 分页 -->
                  <div class="page">
                  	<a href="javascript:void(0);" id="firtPage" value="1">首页</a>
                  	<a href="javascript:void(0);" <c:if test="${currentPage - 1 > 0 }">id='prePage'</c:if> value="${currentPage - 1 }">上一页</a>
                  	<a href="javascript:void(0);" <c:if test="${currentPage + 1 <= totalPage }">id='nextPage'</c:if> value="${currentPage + 1 }">下一页</a>
                  	<a href="javascript:void(0);" id="endPage" value="${totalPage }">末页</a>
                  </div>
            </div>
            <!-- 内容结束 -->
      </div>
      <div class="clear_both"></div>
</div>
	</form>
</body>

<script type="text/javascript">
	
	// 加载功能入口
	function loadPermissionDiv(id) {
		// 点击应用行信息，ajax处理功能入口
		$.ajax({
			  type: 'GET',
			  url: '/ui/Deskelement!loadPermission.do?math=' + Math.random(),
			  data: { applicationId : id },
			  success: function(msg) {
				  var data = eval("(" + msg + ")"); 
				  if(data.message == "success") {
					  //组装数据
					  $("#subCon_" + id).append(data.html);
					  // 注册功能入口
					  imgPerClick();
					    //TODO 绑定标题的点击事件
						//$("#subCon_" + id).find("div[class='title']").click(function(event) {
						$("#subCon_" + id).find("div[class='con22']").click(function(event) {
							// 禁止事件冒泡
							event.stopPropagation();
							
							var title = $(this).children("div[class='zi']").find('a').html();
							var url = $(this).attr('url');
							var wid = "win_" + title;
							window.parent.myLib.desktop.win.newWin({
								WindowTitle : title,
								iframSrc : url,
								WindowsId : wid,
								WindowAnimation : 'easeInBack',
								WindowWidth : 760
							});
						});
				  } else {
					  alert("操作出现错误,请重试.");
				  }
			  }
		});
	}
	
	// 一级展示
	function level1Div() {
		$("div[class='con']").click(function() {
			var thisId = $(this).attr('id');
			var status = $("#subCon_" + thisId).css("display");
			// 先隐藏所有的二级展示
			$("div[class='subCon']").each(function() {
				$(this).css("display", "none");
			});
			// 操作二级展示
			if (status == 'none') {
				$("#subCon_" + thisId).empty();
				$("#subCon_" + thisId).css("display", "block");
				$("#subCon_" + thisId).css("z-index", 999);
				// 加载功能入口
				loadPermissionDiv(thisId);
			} else {
				$("#subCon_" + thisId).empty();
				$("#subCon_" + thisId).css("display", "none");
			}
		});
	}
	
	// 应用安装卸载
	function imgClickEvent() {
		
		$("a[class='addBtnClass']").click(function(event) {
			
			// 禁止事件冒泡
			event.stopPropagation();
			
			var applicationId = $(this).attr('id');
			var tabNum = window.parent.getTabNum();
			var aObj = $(this);
			
			// 当前按钮置换
			//$(this).css('display', 'none');
			if(aObj.parent().find('img')[1] != null) {
				$(aObj.parent().find('img')[1]).css('display', 'none');
			}
			
			$.ajax({
				  type: 'GET',
				  url: '/ui/Deskelement!installApplication.do?math=' + Math.random(),
				  data: { applicationId : applicationId, locationPage : tabNum },
				  success: function(msg) {
					  var data = eval("(" + msg + ")"); 
					  if(data.message == "success") {
						  
						  if(aObj.parent().find('img')[0] != null) {
								$(aObj.parent().find('img')[0]).css('display', 'block');			
						  }
						  
						  // 如果展开了功能入口，功能入口置换
						  var status = $("#subCon_" + applicationId).css("display");
						  if (status == 'block') {
							  //console.log($("#subCon_" + applicationId).find("div[class='tianjia']").find("img[c='xiezai']"));
							  //console.log($("#subCon_" + applicationId).find("div[class='tianjia']").find("img[c='tianjia']"));
							  $("#subCon_" + applicationId).find("div[class='tianjia']").find("img[c='xiezai']").css('display', 'block');
							  $("#subCon_" + applicationId).find("div[class='tianjia']").find("img[c='tianjia']").css('display', 'none');
						  }
						  // 刷新页签
						  window.parent.myLib.desktop.deskIcon.refresh(tabNum);
						  // 刷新bar
						  window.parent.myLib.desktop.lrBar.refresh();
					  } else {
						  alert("操作出现错误,请重试.");
					  }
				  }
			});
		});
		$("a[class='uninstallClass']").click(function(event) {
			
			// 禁止事件冒泡
			event.stopPropagation();
			
			var applicationId = $(this).attr('id');
			var t = $(this).attr('t');
			var tabNum = window.parent.getTabNum();
			var aObj = $(this);
			
			// 当前按钮置换
			//$(this).css('display', 'none');
			if(aObj.parent().find('img')[0] != null) {
				$(aObj.parent().find('img')[0]).css('display', 'none');
			}
			
			$.ajax({
				  type: 'GET',
				  url: '/ui/Deskelement!uninstall.do?math=' + Math.random(),
				  data: { applicationId : applicationId, applicationType : t },
				  success: function(msg) {
					  var data = eval("(" + msg + ")"); 
					  if(data.message == "success") {
						  
						  if(aObj.parent().find('img')[1] != null) {
								$(aObj.parent().find('img')[1]).css('display', 'block');
						  }
						  
						  // 如果展开了功能入口，功能入口置换
						  var status = $("#subCon_" + applicationId).css("display");
						  if (status == 'block') {
							  //console.log($("#subCon_" + applicationId).find("div[class='tianjia']").find("img[c='xiezai']"));
							  //console.log($("#subCon_" + applicationId).find("div[class='tianjia']").find("img[c='tianjia']"));
							  $("#subCon_" + applicationId).find("div[class='tianjia']").find("img[c='xiezai']").css('display', 'none');
							  $("#subCon_" + applicationId).find("div[class='tianjia']").find("img[c='tianjia']").css('display', 'block');
						  }
						  // 刷新页签
						  window.parent.myLib.desktop.deskIcon.refresh(tabNum);
						// 刷新bar
						  window.parent.myLib.desktop.lrBar.refresh();
					  } else {
						  alert("操作出现错误,请重试.");
					  }
				  }
			});
		});
	}
	
	// 功能入口安装卸载
	function imgPerClick() {
		$("a[class='addBtnClassPermission']").click(function(event) {
			// 禁止事件冒泡
			event.stopPropagation();
			var permissionId = $(this).attr('id');
			var tabNum = window.parent.getTabNum();
			var aObj = $(this);
			
			// 替换图标
			if(aObj.parent().find('img')[1] != null) {
				$(aObj.parent().find('img')[1]).css('display', 'none');
			}
			
			$.ajax({
				  type: 'GET',
				  url: '/ui/Deskelement!installPermission.do?math=' + Math.random(),
				  data: { applicationId : permissionId, locationPage : tabNum },
				  success: function(msg) {
					  var data = eval("(" + msg + ")"); 
					  if(data.message == "success") {
						  
						  if(aObj.parent().find('img')[0] != null) {
								$(aObj.parent().find('img')[0]).css('display', 'block');
							}
						  
						  // 刷新页签
						  window.parent.myLib.desktop.deskIcon.refresh(tabNum);
					  } else {
						  alert("操作出现错误,请重试.");
					  }
				  }
			});
		});
		
		$("a[class='uninstallPerClass']").click(function(event) {
			// 禁止事件冒泡
			event.stopPropagation();
			var applicationId = $(this).attr('id');
			var t = $(this).attr('t');
			var tabNum = window.parent.getTabNum();
			var aObj = $(this);
			
			// 替换图标
			if(aObj.parent().find('img')[0] != null) {
				$(aObj.parent().find('img')[0]).css('display', 'none');
			}
			
			$.ajax({
				  type: 'GET',
				  url: '/ui/Deskelement!uninstall.do?math=' + Math.random(),
				  data: { applicationId : applicationId, applicationType : t },
				  success: function(msg) {
					  var data = eval("(" + msg + ")");
					  if(data.message == "success") {
						  if(aObj.parent().find('img')[1] != null) {
								$(aObj.parent().find('img')[1]).css('display', 'block');
							}
						  // 刷新页签
						  window.parent.myLib.desktop.deskIcon.refresh(tabNum);
					  } else {
						  alert("操作出现错误,请重试.");
					  }
				  }
			});
		});
	}
	
	//当页面加载完毕执行
	$(function(){
		// div click
		level1Div();
		// img click
		imgClickEvent();
		
		// 分页
      	// 首页
      	$("#firtPage").click(function() {
      		$("#currentPage").attr('value', $(this).attr('value'));
      		$("#changeTypeForm").submit();
      	});
      	// 上一页
      	$("#prePage").click(function() {
      		$("#currentPage").attr('value', $(this).attr('value'));
      		$("#changeTypeForm").submit();
      	});
      	// 下一页
      	$("#nextPage").click(function() {
      		$("#currentPage").attr('value', $(this).attr('value'));
      		$("#changeTypeForm").submit();
      	});
      	// 尾页
      	$("#endPage").click(function() {
      		$("#currentPage").attr('value', $(this).attr('value'));
      		$("#changeTypeForm").submit();
      	});
      	
      	// 搜索应用
        $("#searchApplicationText").focus(function(event) {
        	event.stopPropagation(); // 阻止冒泡
        	$(this).attr('value', "");
        });
        
        var searchValue = '${searchApplication }';
        if(searchValue != null && searchValue != '') {
        	 $("#searchApplicationText").attr('value', searchValue);
        }
        
        // 绑定搜索点击事件
        $("#searchApplicationButton").click(function(event) {
        	event.stopPropagation(); // 阻止冒泡
        	$("#changeTypeForm").submit();
        });
	});
</script>

</html>