//声明desktop空间,封装相关操作

var tabNum = 1;
var selectIcon;
var clickIcon;

var lr_id;
var lr_title;
var lr_url;
var lr_hover;
var delayTime;
var program_item_hover;
var swipe = true;
var padscroll = null;
var max_win_num = 0;

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


myLib.NS("desktop");
myLib.desktop={
	//修改背景
	changeWallpapers:function(img, tabNum){
		$("body").css("background-image", "url('ui/wallpapers/" + img + ".jpg')");
		
		// ajax存储用户设置信息
		var userinfoId = $('#userinfo_id').attr('value');
		$.ajax({
			  type: 'GET',
			  url: 'Index!wallpaperAjax.do',
			  data: { userinfoId: userinfoId, img: img, tabNum: tabNum },
			  dataType : 'text',
			  success: function(msg) {
				  // 转换为json对象
				  var data = eval("(" + msg + ")"); 
				  if(data.message == "success") {
				  } else {
					  alert("操作出现错误,请重试.");
				  }
			  }
		});
	},
	//修改主题颜色
	changeTheme:function(theme){
		$("#theme_style").attr("href","/ui/css/" + theme + ".css");
		
		// ajax存储用户设置信息
		var userinfoId = $('#userinfo_id').attr('value');
		$.ajax({
			  type: 'GET',
			  url: 'Index!themeAjax.do',
			  data: { userinfoId: userinfoId, theme: theme },
			  dataType : 'text',
			  success: function(msg) {
				  // 转换为json对象
				  var data = eval("(" + msg + ")"); 
				  if(data.message == "success") {
				  } else {
					  alert("操作出现错误,请重试.");
				  }
			  }
		});
	},
	winWH:function(){
		$('body').data('winWh',{'w':$(window).width(),'h':$(window).height()});
 	},
	desktopPanel:function(){
		$('body').data('panel',{
					   'taskBar':{
						   '_this':$('#taskBar'),
						   'task_lb':$('#task_lb')
					   },
					   'lrBar':{
						   '_this':$('#lr_bar'),	   
						   'default_app':$('#default_app'),
					       'start_block':$('#start_block'),
					       'start_btn':$('#start_btn'),
						   'start_item':$('#start_item'),
						   'default_tools':$('#default_tools')
						},				
						'deskIcon':{
							'_this':[$('#deskIcon_1'),$('#deskIcon_2'),$('#deskIcon_3'),$('#deskIcon_4'),$('#deskIcon_5')],
							'icon':$("#deskIcon_" + tabNum).children()
						},
						'clock':$('#clock_div')
						,'school':$('#schoolInfo')
			}
		);
	},
	getMydata:function(){
		return $('body').data();
	},
	mouseXY:function(){
		
		var mouseXY=[];
		$(document).bind('mousemove',function(e){ 
			mouseXY[0]=e.pageX;
			mouseXY[1]=e.pageY;
           });
		return mouseXY;
		},	
	contextMenu:function(jqElem,data,menuName,textLimit){
		  var _this=this
		      ,mXY=_this.mouseXY();
          jqElem.smartMenu(data,{
            name: menuName,
			textLimit:textLimit,
			afterShow:function(){
				var menu=$("#smartMenu_"+menuName);
				var myData=myLib.desktop.getMydata(),
		            wh=myData.winWh;// 获取当前document宽高
 				var menuXY=menu.offset(),menuH=menu.height(),menuW=menu.width();
				if(menuXY.top>wh['h']-menuH){
					menu.css('top',mXY[1]-menuH-2);
					}
				if(menuXY.left>wh['w']-menuW){
					menu.css('left',mXY[0]-menuW-2);
					}	
				}
          });
          
          // 绑定点击事件
		  $(document.body).click(function(event) {
			event.preventDefault();
			$.smartMenu.hide();
			if(document.activeElement.id != "pageletSearchInput"){
				$("#searchDiv").hide();
				$("#pagelet_search_suggest").hide();
			}
			
			
			$("#qk_div").remove();//隐藏快捷预览
			$.smartMenu.hide();//隐藏右键菜单
			myLib.desktop.startMenu.hide();//隐藏开始菜单
			
		  });
		  
		 document.getElementById("desktop").onclick = function(event) {
			 if(event != null) {
				 event.preventDefault();
			 }
				$.smartMenu.hide();
				if(document.activeElement.id != "pageletSearchInput"){
					$("#searchDiv").hide();
					$("#pagelet_search_suggest").hide();
				}
				
				
				$("#qk_div").remove();
				myLib.desktop.startMenu.hide();//隐藏开始菜单
		  };
		  
	},	
	switchZindex:function(obj){
		var myData=myLib.desktop.getMydata();
		var $topWin=myData.topWin;
		var curWinZindex=obj.css("z-index");
		var maxZ=myData.maxZindex;
		if($topWin == undefined){
			obj.css("z-index",100);
			return;
		}
		
		if(!$topWin.is(obj)){
			obj.css("z-index",100);
			if($topWin.css("z-index") >= 100){
				$topWin.css("z-index",99);
			}
		}
		
//		alert(obj.css("z-index") + " - " + $topWin.css("z-index"));
		
	},
	init:function(){
		
//						iframSrc : "ui/Deskelement!applicationList.do?searchApplication=''&math=" + Math.random(),
		 // 初始化桌面右键菜单
		 var edskMenu = [ [ {
				text : "添加应用",
				func : function() {
					myLib.desktop.win.newWin({
						WindowTitle : '添加应用',
						iframSrc : "ui/Application!myApplicationList.do",
						WindowsId : 'AppcationWin',
						WindowAnimation : 'appEaseInBack',
						WindowWidth : 858,
						WindowHeight : 600,
						WindowResizable	: false
					});
				}
			},{
				text : "新建文件夹",
				func : function() {
					$("#dialog-form").dialog({
						height: 130,
						width: 300,
						modal: true,
						resizable : false,
						buttons: {
							"确认": function() {
								var foldername = $("#folder_name").attr("value");
								if (foldername == "" || foldername == null) {
									$("#create_folder_message").empty();
									$("#create_folder_message").append("<strong style=\"color: red;\">名称必填</strong>");
									return false;
								} else if (foldername.length >= 20){
									$("#create_folder_message").empty();
									$("#create_folder_message").append("<strong style=\"color: red;font-size:12px;\">不能多于20位</strong>");
									return false;
								} else {
								    $.ajax({
		                    			  type: 'POST',
		                    			  url: 'ui/Deskelement!createFolder.do?math=' + Math.random(),
		                    			  data: { folderName : foldername, locationPage : tabNum },
		                    			  dataType : 'text',
		                    			  success: function(msg) {
		                    				  // 转换为json对象
		                    				  var data = eval("(" + msg + ")"); 
		                    				  if(data.message == "success") {
		                    					  $("#dialog-form").dialog("close");
		                    					  $("#folder_name").attr('value', '');
		                    					  myLib.desktop.deskIcon.refresh(tabNum);
		                    					  
		                    					  $("#create_folder_message").empty();
		                    				  } else {
		                    					  alert("操作出现错误,请重试.");
		                    				  }
		                    			  }
		                    		 });
								}
							}
							,"取消": function() {
								$("#folder_name").attr('value', '');
								$("#create_folder_message").empty();
								$("#dialog-form").dialog("close");
							}
						}
					});
				}
			} ], [ {
				text : "显示桌面",
				func : function() {
					$("div[id^=myWin_]").each(function() {
						myLib.desktop.win.minimize($(this));
					});
				}
			} , {
				text : "刷新",
				func : function() {
					window.location.reload();
				}
			}, {
				text : "主题设置",
				func : function() {
					$("#theme_btn").click();
				}
			} ], [ {
				text : "退出系统",
				func : function() {
					$("#logout-dialog-form").dialog({
							height: 130,
							width: 300,
							modal: true,
							resizable : false,
							buttons: {
								"确认": function() {
									$("#logout-dialog-form").dialog("close");
									// 退出系统
									window.location = "${ctx}/j_spring_security_logout";
								},
								"取消" : function() {
									$("#logout-dialog-form").dialog("close");
								}
							}
					});
				}
			} ] ];
		 myLib.desktop.contextMenu($(document.body),edskMenu,"body",10);
	}
};
	
// 窗口相关操作
myLib.NS("desktop.win");
myLib.desktop.win={
	winHtml:function(title,url,id){
		if(title=='应用中心' || title == '添加应用'){
			// 默认参数配置
			return '<div class="window" id="' + id + '"><div class="win_title appcolse" style="background:none;"><span>' +
		    '<a class="winClose" href="#"><img src="/ui/css/images/close1.png" style="width:22px;height:17px;" name="Image5" width="22" height="17" border="0" id="Image5" /></a>' +
		    '<a class="winMinimize" href="#"><img src="/ui/css/images/minimize1.png" style="width:24px;height:17px;" name="Image7" width="24" height="17" border="0" id="Image7" /></a></span>' +
		    '</div>' + '<iframe allowtransparency="true" style="background-color:transparent;" frameborder="0" name="myFrame_' + id + '" id="myFrame_' + id + '"  class="winframe" scrolling="auto" width="100%" height="100%" src="' + url + '"></iframe>' + 
		    '</div>';
		} else {
			return "<div class='windows corner rgba' id="
			+id
			+"><div class='win_title'><b>"
			+title
			+"</b><span class='win_btnblock'><a href='#' class='winMinimize' title='最小化'></a><a href='#' class='winMaximize' title='最大化'></a><a href='#' class='winHyimize' title='还原'></a><a href='#' class='winClose' title='关闭'></a></span></div><iframe frameborder='0' name='myFrame_"
			+id
			+"' id='myFrame_"
			+id
			+"' class='winframe' scrolling='auto' width='100%' height='100%' src='"
			+url
			+"'></iframe></div>";
		}
	},
	 //添加遮障层，修复iframe 鼠标经过事件bug
	iframFix:function(obj){
		obj.each(function(){
		var o=$(this);
		if(o.find('.zzDiv').size()<=0){
//			o.append($("<div class='zzDiv' style='width:100%;height:"+(o.innerHeight()-26)+"px;position:absolute;z-index:900;left:0;top:26px;'></div>"));
		}
		});
		},	
	//获取当前窗口最大的z-index值
	maxWinZindex:function($win){
		   return Math.max.apply(null, $.map($win, function (e, n) {
           if ($(e).css('position') == 'absolute')
            return parseInt($(e).css('z-index')) || 1;
              }));
			},
	findTopWin:function($win,maxZ){
		var topWin;
		$win.each(function(index){
 						   if($(this).css("z-index")==maxZ){
							   topWin=$(this);
							   return false;
							   } 
 						   });
		return topWin;  
		},		
	//关闭窗口
	closeWin:function(obj){
		if(!browser.versions.ios && !browser.versions.android){//PC		
			max_win_num --;
			myLib.desktop.lrBar.closeau(obj);
		}
		
		var _this=this,$win=$('div.windows').not(":hidden"),maxZ,topWin;
 		myLib.desktop.taskBar.delWinTab(obj);
		obj.hide('slow',function(){
			$(this).remove();
		});
		// 当关闭窗口后寻找最大z-index的窗口并使其出入选择状态
		if($win.size()>1){
		maxZ=_this.maxWinZindex($win.not(obj));
		topWin=_this.findTopWin($win,maxZ);
		_this.switchZindex(topWin);
		}
		},
	//最小化窗口
	minimize:function(obj){
		if(!browser.versions.ios && !browser.versions.android){//PC		
			max_win_num --;
			myLib.desktop.lrBar.closeau(obj);
		}
		
		var _this=this,$win=$('div.windows').not(":hidden"),maxZ,topWin,objTab;
		obj.hide();
		// 最小化窗口后，寻找最大z-index窗口至顶
		if($win.size()>1){
		maxZ=_this.maxWinZindex($win.not(obj));
		topWin=_this.findTopWin($win,maxZ);
		_this.switchZindex(topWin);
		}else{
			objTab=myLib.desktop.taskBar.findWinTab(obj);
			objTab.removeClass('selectTab').addClass('defaultTab');
			}
		},	
	//最大化窗口函数
	maximizeWin:function(obj){
		var myData=myLib.desktop.getMydata(),wh=myData.winWh;// 获取当前document宽高
		obj
		.css({'width':wh['w'],'height':wh['h']-35,'left': 0,'top':0})
		.draggable( "disable" )
		.resizable( "disable" )
		.fadeTo("fast",1)
		.find(".winframe")
		.css({'width':wh['w']-6,'height':wh['h']-64});
		if(!browser.versions.ios && !browser.versions.android){//PC		
			max_win_num ++;
			myLib.desktop.lrBar.openau(obj);
		}
		},
	//还原窗口函数
	hyimizeWin:function(obj){
		if(!browser.versions.ios && !browser.versions.android){
			max_win_num --;
		}
		myLib.desktop.lrBar.closeau(obj);
		var myData=obj.data(),
		    winLocation=myData.winLocation;// 获取窗口最大化前的位置大小
			
		obj.css({'width':winLocation['w'],'height':winLocation['h'],'left':winLocation['left'],'top':winLocation['top']})
		.draggable( "enable" )
		.resizable( "enable" ) 
		.find(".winframe")
		.css({'width':winLocation['w']-6,'height':winLocation['h']-29});
		},	
	//交换窗口z-index值
	switchZindex:function(obj){
		var myData=myLib.desktop.getMydata()
		    ,$topWin=myData.topWin
			,$topWinTab=myData.topWinTab
		    ,curWinZindex=obj.css("z-index")
			,maxZ=myData.maxZindex
			,objTab=myLib.desktop.taskBar.findWinTab(obj);
			
		if(!$topWin.is(obj)){
			obj.css("z-index",maxZ);
			if(objTab != null) {
				objTab.removeClass('defaultTab').addClass('selectTab');
			}
			
			$topWin.css("z-index",curWinZindex);
			$topWinTab.removeClass('selectTab').addClass('defaultTab');
			this.iframFix($topWin);
			// 更新最顶层窗口对象
			$('body').data("topWin",obj).data("topWinTab",objTab);
		}
	},
	//新建窗口实例
    newWin:function(options){
    	$.smartMenu.hide();
		var _this=this;
		
		var myData=myLib.desktop.getMydata(),
		    wh=myData.winWh,// 获取当前document宽高
			$windows=$("div.windows"),
			curwinNum=myLib._is(myData.winNum,"Number")?myData.winNum:0;// 判断当前已有多少窗口
			_this.iframFix($windows);
		// 默认参数配置
        var defaults = {
            WindowTitle:          null,
			WindowsId:            null,
            WindowPositionTop:    'center',                          /*
																		 * Posible
																		 * are
																		 * pixels
																		 * or
																		 * 'center'
																	 */
            WindowPositionLeft:   'center',                          /*
																		 * Posible
																		 * are
																		 * pixels
																		 * or
																		 * 'center'
																	  */
            WindowWidth:          Math.round(wh['w']*0.85),           /*
																		 * Only
																		 * pixels
																		 */
            WindowHeight:         Math.round(wh['h']*0.8),           /*
																		 * Only
																		 * pixels
																		 */
            WindowMinWidth:       250,                               /*
																		 * Only
																		 * pixels
																		 */
            WindowMinHeight:      250,                               /*
																		 * Only
																		 * pixels
																		 */
		    iframSrc:             null,                              /* 框架的src路径 */ 
            WindowResizable:      true,                              /*
																		 * true,
																		 * false
																		 */
            WindowMaximize:       true,                              /*
																		 * true,
																		 * false
																		 */
            WindowMinimize:       true,                              /*
																		 * true,
																		 * false
																		 */
            WindowClosable:       true,                              /*
																		 * true,
																		 * false
																		 */
            WindowDraggable:      true,                              /*
																		 * true,
																		 * false
																		 */
            WindowStatus:         'regular',                         /*
																		 * 'regular',
																		 * 'maximized',
																		 * 'minimized'
																	 */
            WindowAnimationSpeed: 500,
            WindowAnimation:      'none'
        };
		  
		var options = $.extend(defaults, options);
		// 判断窗口位置，否则使用默认值
		var wLeft=myLib._is(options['WindowPositionLeft'],"Number")?options['WindowPositionLeft']:(wh['w']-options['WindowWidth'])/2;
		var wTop=myLib._is(options['WindowPositionTop'],"Number")?options['WindowPositionTop']:(wh['h']-options['WindowHeight'])/2;
		
		// 给窗口赋予新的z-index值
		var zindex=curwinNum+100;
		var id="myWin_"+options['WindowsId'];// 根据传来的id将作为新窗口id
 		$('body').data("winNum",curwinNum+1);// 更新窗口数量
 		
// 判断如果此id的窗口存在，则不创建窗口
if($("#"+id).size()<=0){
			// 在任务栏里添加tab
			myLib.desktop.taskBar.addWinTab(options['WindowTitle'],options['WindowsId']);
		// 初始化新窗口并显示
		$("body").append($(_this.winHtml(options['WindowTitle'],options['iframSrc'],id)));
		
		var $newWin=$("#"+id),
			$icon=$("#"+options['WindowsId']),
			$iconOffset=$icon.offset(),
			$fram=$newWin.children(".winframe"),
			winMaximize_btn=$newWin.find('a.winMaximize'),// 最大化按钮
			winMinimize_btn=$newWin.find('a.winMinimize'),// 最小化按钮
			winClose_btn=$newWin.find('a.winClose'),// 关闭按钮
		    appWinMinimize_btn=$newWin.find('a.appMinimize'),// 应用中心最小化按钮
		    appWinClose_btn=$newWin.find('a.appClose'),// 应用中心关闭按钮
		    winHyimize_btn=$newWin.find('a.winHyimize');// 还原按钮
		 
		winHyimize_btn.hide();
		if(!options['WindowMaximize']) winMaximize_btn.hide();
		if(!options['WindowMinimize']) winMinimize_btn.hide();
		if(!options['WindowClosable']) winClose_btn.hide();
		   
		// 存储窗口最大的z-index值,及最顶层窗口对象
		$('body').data({"maxZindex":zindex,"topWin":$newWin});
		
		// 判断窗口是否启用动画效果
		if(options.WindowAnimation=='none'){
			 $newWin
			 .css({"width":options['WindowWidth'],"height":options['WindowHeight'],"left":wLeft,"top":wTop,"z-index":zindex})
			 //.addClass("loading")
			 .show();
		} else {
	 		if($iconOffset == null){
	 			$iconOffset = new Object();
	 			$iconOffset.top = 0;
	 			$iconOffset.left = 0;
	 		}
		 $newWin
		 .css({"left":$iconOffset.left,"top":$iconOffset.top,"z-index":zindex})
//		 .addClass("loading")
		 .show()
		 .animate({
            width: options['WindowWidth'], 
            height:options['WindowHeight'],
            top: wTop, 
            left: wLeft}, 500);
		}
        $newWin.data('winLocation',{
			  'w':options['WindowWidth'],
			  'h':options['WindowHeight'],
			  'left':wLeft,
			  'top':wTop
		})
		.find(".winframe").css({"width":options['WindowWidth']-6,"height":options['WindowHeight']-29});
		
        if(!browser.versions.ios && !browser.versions.android){
        	$("#lr_bar").css("z-index",zindex + 1);//始终让侧边栏保持最前
            $("#start_item").css("z-index",zindex + 1);//一级
            $("#program_item").css("z-index",zindex + 1);//二级
            $("#program_app_item").css("z-index",zindex + 1);//三级
        }
        
		// 等待iframe加载完毕
		// .load(function(){
					   
 		// 调用窗口拖动,参数可拖动的范围上下左右，窗口id和，浏览器可视窗口大小
		if(options['WindowDraggable']){
		   _this.drag([0,0,wh['w']-options['WindowWidth']-10,wh['h']-options['WindowHeight']-35],id,wh);
		}
		
		// 调用窗口resize,传递最大最小宽度和高度，新窗口对象id，浏览器可视窗口大小
		if(options['WindowResizable']){
		   _this.resize(options['WindowMinWidth'],options['WindowMinHeight'],wh['w']-wLeft,wh['h']-wTop-35,id,wh);
		}
		// 当改变浏览器窗口大小时，更新其拖动和拖曳区域大小
		$(window).wresize(function(){
			_this.upWinDrag_block($newWin);
			_this.upWinResize_block($newWin);
		});
		   
		$newWin.find(".winframe").load(function(){
		   $newWin.find(".winframe").contents().find("body").click(function(event){
			   //自动隐藏功能开启
			   if(lr_hover){
				   $("#lr_bar").css("left","-62px");
			   }
			   myLib.desktop.startMenu.hide();
			   $("#qk_div").remove();
	        });
	   })
		
	   // 如果有多个窗口，当单击某个窗口，则使此窗口显示到最上面
	   if(curwinNum){
			var $allwin=$("div.windows");
			$allwin.bind({
				 "mousedown":function(event){
					 // 隐藏显示的菜单
					 $.smartMenu.hide();
		             _this.switchZindex($(this));
				 },
				 "mouseup":function(){
					 // 隐藏显示的菜单
					 $.smartMenu.hide();
					 $(this).find('.zzDiv').remove();
				 }		
			});
		}
			
		// 窗口最大化，最小化，及关闭
		winClose_btn.click(function(event){
			 event.stopPropagation();
			 _this.closeWin($(this).parent().parent().parent());
		});
		// 窗口最大化，最小化，及关闭  应用中心
		appWinClose_btn.click(function(event){
			 event.stopPropagation();
			 _this.closeWin($(this).parent().parent().parent().parent());
		});
		// 最大化
		winMaximize_btn.click(function(event){
			 event.stopPropagation();			   
			 if(options['WindowStatus']=="regular"){								 
			 _this.maximizeWin($(this).parent().parent().parent());
			 $(this).hide();
			 winHyimize_btn.show();
			 options['WindowStatus']="maximized";
			 }
 		});
		// 还原窗口
		winHyimize_btn.click(function(event){
			 event.stopPropagation();				  
			 if(options['WindowStatus']=="maximized"){								 
			 _this.hyimizeWin($(this).parent().parent().parent());
			 $(this).hide();
			 winMaximize_btn.show();
			 options['WindowStatus']="regular";
			 }
		});
		// 最小化窗口
		winMinimize_btn.click(function(){
			_this.minimize($(this).parent().parent().parent());		   
		});
		// 最小化窗口
		appWinMinimize_btn.click(function(){
			_this.minimize($(this).parent().parent().parent().parent());		   
		});
} else {// 如果已存在此窗口，判断是否隐藏
     var wins=$("#"+id),objTab = myLib.desktop.taskBar.findWinTab(wins);
	 if(wins.is(":hidden")){
		  wins.show();
		  objTab.removeClass('defaultTab').addClass('selectTab');// 当只有一个窗口时
	      myLib.desktop.win.switchZindex(wins);
	 }
}
	},
	//打开一个新窗口
	openWin:function(wid,title,url){
		if(url == "folder"){
			url = "ui/Deskelement!openFolder.do?appId=" + wid;
		} 
		
		myLib.desktop.win.newWin({
			 WindowTitle:title,
			 iframSrc:url,
			 WindowsId:wid,
			 WindowAnimation:'easeInBack'
		});
	},
	upWinResize_block:function(win){
		// 更新窗口可改变大小范围,wh为浏览器窗口大小
        var offset=win.offset();
	    win.resizable( "option" ,{'maxWidth':$(window).width()-offset.left-10,'maxHeight':$(window).height()-offset.top-35});
	},
	upWinDrag_block:function(win){
		   var h=win.innerHeight(),w=win.innerWidth();
			// 更新窗口可拖动区域大小
		    win.draggable( "option", "containment", [10,10,$(window).width()-w-10,$(window).height()-h-35] );
		},	
	drag:function(arr,win_id,wh){
		$("div.win_title").css("cursor","move");
		var _this=this;
		$("#"+win_id).draggable({ 
	    handle: "#"+win_id+' .win_title',
	    iframeFix:false,
	    containment:arr,
		delay: 50 ,
		distance: 30
		})
		.bind("dragstart",function(event,ui){
 			_this.iframFix($(this));
 			if($("div.win_title").children("b").text() == "设置主题"){
 				$("div").children("iframe").css("display","none");
 				$("div.win_title").children("b").text("设置主题 - 当前内容被隐藏,松开鼠标后显示.");
 			}
		})
		.bind( "dragstop", function(event, ui) {
			if($("div.win_title").children("b").text() == "设置主题 - 当前内容被隐藏,松开鼠标后显示."){
 				$("div").children("iframe").css("display","block");
 				$("div.win_title").children("b").text("设置主题");
 			}
			var obj_this=$(this);	
			var offset=obj_this.offset();
			// 计算可拖曳范围
			_this.upWinResize_block(obj_this);
		    obj_this.data('winLocation',{
				'w':obj_this.width(),
				'h':obj_this.height(),
				'left':offset.left,
				'top':offset.top
			})
			.find('.zzDiv').remove();
         }); 
		
		   
		},
	resize:function(minW,minH,maxW,maxH,win_id,wh){
		
		var _this=this;
		$("#"+win_id)
		.resizable({
		minHeight:minH,
		minWidth:minW,
		containment:'document',
		maxWidth:maxW,
		maxHeight:maxH
		})
		.css("position","absolute")
		.bind( "resize", function(event, ui) {
			var h=$(this).innerHeight(),w=$(this).innerWidth(); 	
 			 _this.iframFix($(this));
			 
			// 拖曳改变窗口大小，更新iframe宽度和高度，并显示iframe
			$(this).children(".winframe").css({"width":w-6,"height":h-29});
				
        })
	   .bind( "resizestop", function(event, ui) {					 
			var obj_this=$(this);
			var offset=obj_this.offset();
			var h=obj_this.innerHeight(),w=obj_this.innerWidth();
			
			// 更新窗口可拖动区域大小
			_this.upWinDrag_block(obj_this);
			
		    obj_this
			// 更新窗口存储的位置属性
			.data('winLocation',{
			'w':w,
			'h':h,
			'left':offset.left,
			'top':offset.top
			})
			 // 删除遮障iframe的层
			.find(".zzDiv").remove();
       });
		}
};

	
//侧边工具栏
myLib.NS("desktop.lrBar");
myLib.desktop.lrBar={
	//初始化
	init:function(){
		if(!browser.versions.ios && !browser.versions.android){//PC		
			$("#lr_bar").hover(function(event){
				if($("#lr_bar").css("left") == "-62px" && lr_hover){
					var lr_hover_interval = setInterval(function(){
						if($("#lr_bar").css("left") != "0px"){
							$("#lr_bar").css("left",(parseInt($("#lr_bar").css("left"))+2) + "px");
						}else{
							clearInterval(lr_hover_interval);
						}
						
					},1);
				}
			},function(event){
				if($("#lr_bar").css("left") == "0px" && lr_hover && $("#start_item").css("display") == "none" && $("#qk_div").length == 0){
					if($("#program_app_item").css("display") == "none" && $("#divScrollBar").length == 0){
						$("#lr_bar").css("left","-62px");
					}
				}
			})
		}
		
		// 读取元素对象数据
		var myData=myLib.desktop.getMydata();
	    var $default_tools=myData.panel.lrBar['default_tools']
		    ,$def_tools_Btn=$default_tools.find('span')
			,$start_btn=myData.panel.lrBar['start_btn']
			,$start_item=myData.panel.lrBar['start_item']
			,$default_app=myData.panel.lrBar['default_app']
			,$lrBar=myData.panel.lrBar['_this']
			,wh=myData.winWh;
			
		// 初始化侧栏位置
		var tops=Math.floor((wh['h']-$lrBar.height())/2)-50;
		$lrBar.css({'top':tops});
		// 如果窗口大小改变，则更新侧边栏位置
		$(window).wresize(function(){
			var tops=Math.floor(($(window).height()-$lrBar.height())/2)-50;					  
			$lrBar.css({'top':tops});
		});
		
		// 默认应用程序区
		$default_app
		.droppable({
			greedy: false,
			drop : function(event, ui) {// 监听移动到导航栏的图标
				swipe = false;
				event.stopPropagation(); // 禁止冒泡
				if($default_app.children().length >= 6){
					return false;
				}

				if(ui.draggable.attr('id') != null) {
					$.ajax({
						  type: 'GET',
						  url: 'ui/Deskelement!moveToNavigation.do?math=' + Math.random(),
						  data: { appId : ui.draggable.attr('id') },
						  dataType : 'text',
						  success: function(msg) {
							  // 转换为json对象
							  var data = eval("(" + msg + ")"); 
							  if(data.message == "success") {
								  // 刷新导航栏
								  myLib.desktop.lrBar.refresh();
								  // 刷新页签
								  myLib.desktop.deskIcon.refresh(tabNum);
							  } else {
								  alert("操作出现错误,请重试.");
							  }
						  }
					});
				}
			}
		})
		.find('li')
		.draggable({
			zIndex: 1,
			start : function() {
				$("#qk_div").remove();
			},
			drag : function() {
				$("#qk_div").remove();
			}
		}) // 这个方法写在要拖动的图标li上
		.droppable({
			greedy: true, 
			drop : function(event, ui) {
				event.stopPropagation(); // 禁止冒泡
				var thisIcon = event.target.id;
				if(thisIcon != null) {
					// 侧边栏上的图标交换
					if(ui.draggable.parent().attr("id") == "default_app") {
						$.ajax({
							  type: 'GET',
							  url: 'ui/Deskelement!swapIconNavigation.do?math=' + Math.random(),
							  data: { curDragIcon : ui.draggable.attr('id'), thisIcon : event.target.id },
							  dataType : 'text',
							  success: function(msg) {
								  // 转换为json对象
								  var data = eval("(" + msg + ")"); 
								  if(data.message == "success") {
									  // 刷新侧边导航栏
									  myLib.desktop.lrBar.refresh();
								  } else {
									  alert("操作出现错误,请重试.");
								  }
							  }
						});
					} else { // 桌面图标和侧边栏上的图标交换
						$.ajax({
							  type: 'GET',
							  url: 'ui/Deskelement!swapNavigationIconAction2.do?math=' + Math.random(),
							  data: { curDragIcon : ui.draggable.attr('id'), thisIcon : event.target.id },
							  dataType : 'text',
							  success: function(msg) {
								  // 转换为json对象
								  var data = eval("(" + msg + ")"); 
								  if(data.message == "success") {
									  // 刷新导航栏
									  myLib.desktop.lrBar.refresh();
									  // 刷新页签
									  myLib.desktop.deskIcon.refresh(tabNum);
								  } else {
									  alert("操作出现错误,请重试.");
								  }
							  }
						});
					}
				}
			}
		})
		.click(function(event) {
			
			event.stopPropagation(); // 禁止冒泡
			clickIcon = this.id;
			
			lr_id = $(this).attr('id');
			lr_title = $(this).children("img").attr('title');
			lr_url = $(this).children("input")[0].value;
			
			myLib.desktop.startMenu.hide();
			// 如果是文件夹则浮动显示一个div
			if($(this).children("input")[0].value == "folder"){
				$("#qk_div").remove();
				
				var dock = $("#dock_hidden").attr('value');
				
				var leftOFS = $(this).offset().left + 100;
				var topOFS = $(this).offset().top - 20;
				
				if(dock == "right"){
					dock = "_Right";
					leftOFS = $(this).offset().left - 380;
				}else{
					dock = "";
				}
				
				
				
				var html = "<div class='dialogue' id='qk_div' style='left:" + leftOFS + "px;top:" + topOFS + "px;position: absolute;z-index:99;'>" +
							"<div class='dialogueNavbox" + dock + "'>" +
							"<div class='dialogueNavOpen'><a id='qk_div_openbtn' style='color:#FFF;text-decoration:none;' href='#'>打开</a></div>" +
							"<div class='dialogueNavList'>" +
							"<ul id='qk_div_ul'></ul>" +
							"<div class='clear'></div>" +
							"</div>" +
						    "</div>" +
							"<div class='dialogueBot" + dock + "'></div>" +
						    "</div>";
				$(document.body).append(html);
				
				$.ajax({
			  		type: 'POST',
			  		async:false,
			  		url: 'ui/Deskelement!openFolder.do?flagType=ajax&math=' + Math.random(),
			  		data: { appId : $(this).attr('id') },
			  		dataType : 'text',
			  		success: function(msg) {
			  			
				  		var html = "";
				  		if(eval(msg) == null || eval(msg) == '') {
				  			$("#qk_div_ul").append("<font color='white'>没有数据..</font>");
				  		}
				  		// 组拼数据
				  		$.each(eval(msg), function(i,item){
				  			var sortName = item.name;
				  			if(item.name.length >= 4){
				  				sortName = item.name.substring(0,4);
				  			}
				  				
				  			html = html + "<li>";
				  			html = html + "<a id='" + item.id + "' class='qk_div_icon' title='" + item.name + "' href='#'>";
				  			html = html + "<input type='hidden' name='app_href' value='" + item.href + "'/>";
				  			html = html + "<p><img src='" + item.backgroudPic + "' width='45' height='45' /></p>";
				  			html = html + "<p>" + sortName + "</p>";
				  			html = html + "</a>";
				  			html = html + "</li>";
						});
				  		// 显示数据
				  		$("#qk_div_ul").append(html);
				  				
		  				if($("#qk_div").css("height") != undefined){
		  					var myData=myLib.desktop.getMydata();
			  				var div_height = parseInt($("#qk_div").css("height").replace("px", ""));
			  				var div_top = parseInt($("#qk_div").css("top").replace("px", ""));
			  				if((div_height + div_top) > myData.winWh['h']){//DIV显示部分超出了document的高度
			  					$("#qk_div .dialogueNavList").css("max-height",(myData.winWh['h'] - div_top - 60) + "px");
			  				}
			  				
			  				//接下来
			  				$("#qk_div").css("z-index","10000");
		  				}
				  				
		  				$(".qk_div_icon").click(function(){
		  					$("#qk_div").remove();
		  					var title = $(this).attr('title');
		  					var wid=this.id;
		  					var url=$(this).children("input")[0].value;
		  					
		  					myLib.desktop.win.newWin({
		  						 WindowTitle:title,
		  						 iframSrc:url,
		  						 WindowsId:wid,
		  						 WindowAnimation:'easeInBack'
		  					});
		  				});
				  				
		  				$("#qk_div_openbtn").click(function(){
		  					
		  					var wid = lr_id;
		  					var title = lr_title;
		  					var url = lr_url;
//		  					console.log(wid + "-" + title + "-" + url);
		  					if(url == "folder"){
		  						$("#qk_div").remove();
		  						url = "ui/Deskelement!openFolder.do?appId=" + wid;
		  					} 
		  					myLib.desktop.win.newWin({
		  						 WindowTitle:title,
		  						 iframSrc:url,
		  						 WindowsId:wid,
		  						 WindowAnimation:'easeInBack'
		  					});
		  				});
			  	      }
		  		 });
				} else {
					// 单击打开，如果不是文件夹
					var title = $(this).find('img').attr('title'),wid=$(this).attr('id');
					var url = $(this).children("input")[0].value;
					
					myLib.desktop.win.newWin({
						 WindowTitle:title,
						 iframSrc:url,
						 WindowsId:wid,
						 WindowAnimation:'easeInBack'
					});	
				}
		})
		.end()
		.sortable({
			revert: true
		});
		
		
		// 这两个区域增加一个图标拖拽事件
		$("#default_tools").droppable({
			greedy: false,
			drop : function(event, ui) {
				event.stopPropagation(); // 禁止冒泡
				if($default_app.children().length >= 6){
					// 刷新导航栏
					myLib.desktop.lrBar.refresh();
					return false;
				}
				$.ajax({
					  type: 'GET',
					  url: 'ui/Deskelement!moveToNavigation.do?math=' + Math.random(),
					  data: { appId : ui.draggable.attr('id') },
					  dataType : 'text',
					  success: function(msg) {
						  // 转换为json对象
						  var data = eval("(" + msg + ")"); 
						  if(data.message == "success") {
							  // 刷新导航栏
							  myLib.desktop.lrBar.refresh();
							  // 刷新页签
							  myLib.desktop.deskIcon.refresh(tabNum);
						  } else {
							  alert("操作出现错误,请重试.");
						  }
					  }
				});
			}
		});
		//start_block
		$("#start_block").droppable({
			greedy: false,
			drop : function(event, ui) {
				event.stopPropagation(); // 禁止冒泡
				if($default_app.children().length >= 6){
					// 刷新导航栏
					myLib.desktop.lrBar.refresh();
					return false;
				}
				$.ajax({
					  type: 'GET',
					  url: 'ui/Deskelement!moveToNavigation.do?math=' + Math.random(),
					  data: { appId : ui.draggable.attr('id') },
					  dataType : 'text',
					  success: function(msg) {
						  // 转换为json对象
						  var data = eval("(" + msg + ")"); 
						  if(data.message == "success") {
							  // 刷新导航栏
							  myLib.desktop.lrBar.refresh();
							  // 刷新页签
							  myLib.desktop.deskIcon.refresh(tabNum);
						  } else {
							  alert("操作出现错误,请重试.");
						  }
					  }
				});
			}
		});
		
		// 开始按钮、菜单交互效果
		$start_btn.click(function(event){
			event.preventDefault();
			event.stopPropagation();
			if($start_item.is(":hidden")){
				//昨天做的 开始菜单顶层
//				myLib.desktop.switchZindex($start_item);
				
				var dock = $("#dock_hidden").attr('value');
				if(dock == "left"){
					$start_item.css("left","75px");
				}else{
					$start_item.css("left","-190px");
				}
				
				
				
				if(browser.versions.ios || browser.versions.ios){//当是移动端访问时隐藏全部功能菜单
            $("#all_program").hide();
        }
				
				$start_item.show();
			}else{
				$start_item.hide();
			}
		});
		
		
		$("body").click(function(event){
			 event.preventDefault();  
			 $start_item.hide();
		});
		
		
		$("#showZm_btn").click(function(event){
			event.stopPropagation(); // 禁止冒泡
			myLib.desktop.win.newWin({
				WindowTitle : '添加应用',
				iframSrc : "ui/Deskelement!applicationList.do?searchApplication=''&math=" + Math.random(),
				WindowsId : 'addAppWin',
				WindowAnimation : 'easeInBack',
				WindowWidth : 780
				
			});
		});
		
		$("#yyzx_btn").click(function(event){
			event.stopPropagation(); // 禁止冒泡
			myLib.desktop.win.newWin({
				WindowTitle : '应用中心',
				iframSrc : "ui/Application!myApplicationList.do",
				WindowsId : 'AppcationWin',
				WindowAnimation : 'appEaseInBack',
				WindowWidth : 858,
				WindowHeight : 600,
				WindowResizable	: false		
				
			});
		});

		// 小工具
		$("#tools_btn").click(function(event){
			event.stopPropagation(); // 禁止冒泡
			var title = "小工具管理";
			var url = "Index!toolList.do";
			var wid = "win_tools";
			
			myLib.desktop.win.newWin({
				WindowTitle : title,
				iframSrc : url,
				WindowsId : wid,
				WindowAnimation : 'easeInBack',
				WindowWidth : 747
			});
		});

		$("#shizhong_btn").click(function(event){
			event.stopPropagation(); // 禁止冒泡
			if(browser.versions.ios){
				alert("抱歉,暂时不支持IOS设备的时钟组件.");
				return;
			}
			// 先判断选择的工具是否已经安装	
			var divid = "Clock_div";
			var id = $("#" + divid).attr('toolid');
			var tabNum = getTabNum();
			$.ajax({
				  type: 'GET',
				  url: 'Index!choiceTool.do?math=' + Math.random(),
				  data: { locationPage:tabNum, toolId:id},
				  dataType : 'text',
				  success: function(msg) {
					  // 转换为json对象
					  var data = eval("(" + msg + ")"); 
					  if(data.message == "success") {
						// 如果没有安装则安装
						// 显示
						$("#" + divid).css("display", 'block');
						//加载工具内容
						myLib.desktop.navTab.ajaxToolsPosition(tabNum);
					  } else {
						  //提示存在
					  }
				  }
			});
		});
		// 设置主题
		$("#theme_btn").click(function(event) {
			event.stopPropagation(); // 禁止冒泡
			var title = "设置主题";
			var url = "Index!theme.do";
			var wid = "win_theme";
			
			myLib.desktop.win.newWin({
				WindowTitle : title,
				iframSrc : url,
				WindowsId : wid,
				WindowAnimation : 'easeInBack',
				WindowWidth : 824,
				WindowHeight : 	570
			});
		});
		
		// 设置侧边栏位置
		var dock = $("#dock_hidden").attr('value');
		if(dock == "" || dock == null) {
			dock = "left";
		} 
		if (dock == 'left') {
			$("#lr_bar").removeClass("lr_bar_right");
			$("#lr_bar").addClass("lr_bar");
			$("[id*=deskIcon_]").css("margin-left","75px");
		}
		if (dock == 'right') {
			$("#lr_bar").removeClass("lr_bar");
			$("#lr_bar").addClass("lr_bar_right");
			$("[id*=deskIcon_]").css("margin-left","0px");
		}
		
		var lrMenu = [[{
				text : "向左停靠",
				func : function() {
					myLib.desktop.startMenu.hide();
					$("#lr_bar").removeClass("lr_bar_right");
					$("#lr_bar").addClass("lr_bar");
					$("[id*=deskIcon_]").css("margin-left","75px");
					// ajax保存用户设置
					$.ajax({
						  type: 'GET',
						  url: 'Index!dockConfig.do?math=' + Math.random(),
						  data: { dock : 'left' },
						  dataType : 'text',
						  success: function(msg) {
							  $("#dock_hidden").attr('value','left');
						  }
					});
				}
			},{
				text : "向右停靠",
				func : function() {
					myLib.desktop.startMenu.hide();
					$("#lr_bar").removeClass("lr_bar");
					$("#lr_bar").addClass("lr_bar_right");
					$("[id*=deskIcon_]").css("margin-left","0px");
					// ajax保存用户设置
					$.ajax({
						  type: 'GET',
						  url: 'Index!dockConfig.do?math=' + Math.random(),
						  data: { dock : 'right' },
						  dataType : 'text',
						  success: function(msg) {
							  $("#dock_hidden").attr('value','right');
						  }
					});
				}
		}]];
		 
//		myLib.desktop.contextMenu($("#lr_bar"),lrMenu,"lrMenu",10);
	},
	//刷新
	refresh:function(){
		$.ajax({
			  type: 'GET',
			  url: 'ui/Deskelement!refreshNavigation.do?math=' + Math.random(),
			  data: {  },
			  dataType : 'text',
			  success: function(msg) {
				  // 转换为json对象
				  var data = eval("(" + msg + ")"); 
				  if(data.message == "success") {
					  $("#default_app").empty();
					  $("#default_app").append(data.html);
					  
					  myLib.desktop.lrBar.init();
					  
					//重新注册开始菜单
						$("#start_btn").click(function(event){
							event.preventDefault();
							event.stopPropagation();
							if($("#start_item").is(":hidden")){
								$("#start_item").show();
							}else{
								$("#start_item").hide();
							}
						});
					  
				  } else {
					  alert("操作出现错误,请重试.");
				  }
			  }
		});
	},
	
	openau:function(obj){//启动侧边栏自动隐藏功能
		$("#lr_bar").css("left","-62px");//启动左侧工具栏自动隐藏的功能
		if(!browser.versions.ios && !browser.versions.android){//PC	
			$("#lr_bar").css("z-index",obj.css("z-index") + 1);
		}
		lr_hover = true;
	},
	closeau:function(obj){//关闭侧边栏自动隐藏功能
		if(max_win_num < 1){//只有最大化的窗口不存在的时候才固定左侧工具栏
			var wh=myLib.desktop.getMydata().winWh;// 获取当前document宽高
			//从最大化直接最小化
			if(obj.css("width") == wh['w']+"px" && obj.css("height") == (wh['h'] - 35)+"px"){
					lr_hover = false;
					$("#lr_bar").css("left","0px");//关闭左侧工具栏自动隐藏的功能
			}
		}
	}
};
/*----------------------------------------------------------------------------------	
//声明任务栏空间，任务栏相关js操作
----------------------------------------------------------------------------------*/
myLib.NS("desktop.taskBar");
myLib.desktop.taskBar={
	timer:function(obj){
		 var curDaytime=new Date().toLocaleString().split(" ");
		 obj.innerHTML=curDaytime[1];
		 obj.title=curDaytime[0];
		 setInterval(function(){obj.innerHTML=new Date().toLocaleString().split(" ")[1];},1000);
		},
	upTaskWidth:function(){
		var myData=myLib.desktop.getMydata(),$task_bar=myData.panel.taskBar['_this'];
		var maxHdTabNum=Math.floor($(window).width()/100);
		    // 计算任务栏宽度
		    $task_bar.width(maxHdTabNum*100);	
			// 存储活动任务栏tab默认组数
			$('body').data("maxHdTabNum",maxHdTabNum-2);
		},	
	init:function(){
		// 读取元素对象数据
		var myData=myLib.desktop.getMydata();
 		var $task_lb=myData.panel.taskBar['task_lb']
		    ,$task_bar=myData.panel.taskBar['_this']
			,wh=myData.winWh;
 
		 var _this=this;
		 _this.upTaskWidth();
		 // 当改变浏览器窗口大小时，重新计算任务栏宽度
		 $(window).wresize(
			 function(){
				_this.upTaskWidth();   
		 });
		 
		 $("#a_show_desktop").click(function(){
			 $("div[id^=myWin_]").each(function() {
					myLib.desktop.win.minimize($(this));
			});
		 });
 	},
	contextMenu:function(tab,id){
		var _this=this;
		 // 初始化任务栏Tab右键菜单
		 var data=[
					[{
					text:"最大化",
					func:function(){
 						$("#myWin_"+tab.data('win')).find('a.winMaximize').trigger('click');
						}
					  },{
					text:"最小化",
					func:function(){
						myLib.desktop.win.minimize($("#myWin_"+tab.data('win')));
						}
						  }]
					,[{
					  text:"关闭",
					  func:function(){
						  $("#smartMenu_taskTab_menu"+id).remove();
 						  myLib.desktop.win.closeWin($("#myWin_"+tab.data('win')));
						  } 
					  }]
					];
		 myLib.desktop.contextMenu(tab,data,"taskTab_menu"+id,10);
		},
	addWinTab:function(text,id){
		var myData=myLib.desktop.getMydata();
 		var $task_lb=myData.panel.taskBar['task_lb'],$task_bar=myData.panel.taskBar['_this'],tid="myWinTab_"+id,allTab=$task_lb.find('a'),curTabNum=allTab.size(),docHtml="<a href='#' id='"+tid+"'>"+text+"</a>";
			// 添加新的tab
		    $task_lb.append($(docHtml));
			var $newTab=$("#"+tid);
			// 右键菜单
			this.contextMenu($newTab,id);
			$task_lb.find('a.selectTab').removeClass('selectTab').addClass('defaultTab');
			 
			$newTab.data('win',id).addClass('selectTab').click(function(){
					var win=$("#myWin_"+$(this).data('win'));	
					
					if(win.is(":hidden")){
						win.show();
 						$(this).removeClass('defaultTab').addClass('selectTab');// 当只有一个窗口时
						myLib.desktop.win.switchZindex(win);
  						}else{
							if($(this).hasClass('selectTab')){
							myLib.desktop.win.minimize(win);
  							}else{
								myLib.desktop.win.switchZindex(win);
								} 
						}
 			});
			
			$('body').data("topWinTab",$newTab);
			
			// 当任务栏活动窗口数超出时
			if(curTabNum>myData.maxHdTabNum-1){
				var leftBtn=$('#leftBtn'),rightBtn=$('#rightBtn'),bH;
				
                leftBtn.show().find("a").click(function(){
			        var pos=$task_lb.position();
					if(pos.top<0){
						$task_lb.animate({"top":pos.top+40}, 50);
					}
				});
				
				rightBtn.show().find("a").click(function(){
					var pos=$task_lb.position(),h=$task_lb.height(),row=h/40;
					if(pos.top>(row-1)*(-40)){
						$task_lb.animate({"top": pos.top-40}, 50);   
					}
				});
				
				$task_lb.parent().css("margin","0 100");
			}
	 
		},
	delWinTab:function(wObj){
		var myData=myLib.desktop.getMydata(),$task_lb=myData.panel.taskBar['task_lb'],$task_bar=myData.panel.taskBar['_this'],leftBtn=$('#leftBtn'),rightBtn=$('#rightBtn'),pos=$task_lb.position();
		this.findWinTab(wObj).remove();
		
		var newH=$task_lb.height();
		if(Math.abs(pos.top)==newH){
			leftBtn.find('a').trigger("click");
		}
		if(newH==40){
			leftBtn.hide();
			rightBtn.hide();
			$task_lb.parent().css("margin",0);
		}	
	},
	findWinTab:function(wObj){
		var myData=myLib.desktop.getMydata(),$task_lb=myData.panel.taskBar['task_lb'],objTab;
		    $task_lb.find('a').each(function(index){
				var id="#myWin_"+$(this).data("win");		 
				if($(id).is(wObj)){
					objTab=$(this);
				}		 
 			});
		    return objTab;
		}	
};
	
//桌面图标
myLib.NS("desktop.deskIcon");
myLib.desktop.deskIcon={ 
	//桌面图标排列
	arrangeIcons:function(){
		 var myData=myLib.desktop.getMydata(),winWh=myData.winWh,$deskIconBlock=myData.panel.deskIcon['_this'][tabNum - 1],$icon=$("#deskIcon_" + tabNum).children();
			
		 // 设置桌面图标容器元素区域大小-75,'margin-left':'75px'
		 if($("#lr_bar").css("right") != "0px"){
			 $deskIconBlock.css({"width":(winWh['w'] - 75)+"px","height":(winWh['h']-75)+"px","margin-top":"50px", 'margin-left':'75px'});
		 }else{
			 $deskIconBlock.css({"width":(winWh['w'] - 75)+"px","height":(winWh['h']-75)+"px","margin-top":"50px"});
		 }
		 
		 // 对图标定位
		 var iconNum=$icon.size();
		 
		 // 存储当前总共有多少桌面图标
		 $('body').data('deskIconNum',iconNum);
		 var gH=110;// 一个图标总高度，包括上下margin
		 var gW=110;// 图标总宽度,包括左右margin
		 var rows=Math.floor((winWh['h']-75)/gH);
		 var cols=Math.ceil(iconNum/rows);
		 var curcol=0,currow=0;
		 $icon.css({
				   "position":"absolute",
				   "margin":0,
				   "left":function(index,value){
				       var v=curcol*gW+30;
			           if((index+1)%rows==0){
					       curcol=curcol+1;
			           }
					   return v;	 
 					},
					"top":function(index,value){
						var v=(index-rows*currow)*gH+20;
						if((index+1)%rows==0){
							 currow=currow+1;
						}
					    return v;
					}});
 		return $icon;
	},
	//移动图标
	moveIcon:function(curDragIcon, thisIcon, curUrl, thisUrl) {
		// 判断目标是否为文件夹，如果是文件夹则不交换位置，而是移入文件夹
		if(thisUrl != null && curUrl != null && thisUrl == 'folder' && curUrl != 'folder') {
			$("#movetofolder-dialog-form").dialog({
				height: 130,
				width: 300,
				modal: true,
				resizable : false,
				buttons: {
					"确认": function() {
						$.ajax({
							  type: 'GET',
							  url: 'ui/Deskelement!moveFolder.do?math=' + Math.random(),
							  data: { curDragIcon : curDragIcon, thisIcon : thisIcon },
							  dataType : 'text',
							  success: function(msg) {
								  // 转换为json对象
								  var data = eval("(" + msg + ")"); 
								  if(data.message == "success") {
									  myLib.desktop.deskIcon.refresh(tabNum);
									  // 如果文件夹的窗口是打开的则需要刷新
									  var iframeFolder = document.getElementById('myFrame_myWin_' + thisIcon);
									  if(iframeFolder != null) {
										  iframeFolder.src = iframeFolder.src; 
									  }
								  } else {
									  alert("操作出现错误,请重试.");
								  }
							  }
						});
						
						$("#movetofolder-dialog-form").dialog("close");
						// refresh for ipad
						myLib.desktop.deskIcon.refresh(getTabNum());
					},
					"取消" : function() {
						var url = 'ui/Deskelement!moveIcon.do?math=' + Math.random();
						$.ajax({
							  type: 'GET',
							  url: url,
							  data: { curDragIcon: curDragIcon, thisIcon: thisIcon },
							  success: function(msg) {
								  if(msg != "success"){
									  alert("操作出现错误,请重试.");
								  }
							  }
						});
						
						$("#movetofolder-dialog-form").dialog("close");
						// refresh for ipad
						myLib.desktop.deskIcon.refresh(getTabNum());
					}
				}
			});
			
		} else {
			var url = 'ui/Deskelement!moveIcon.do?math=' + Math.random();
			$.ajax({
				  type: 'GET',
				  url: url,
				  data: { curDragIcon: curDragIcon, thisIcon: thisIcon },
				  success: function(msg) {
					  if(msg != "success"){
						  alert("操作出现错误,请重试.");
					  }
				  }
			});
		}	 	
	},
	//初始化
	init:function(){
		 // 将当前窗口宽度和高度数据存储在body元素上
		 myLib.desktop.winWH();
		 var _this=this;// 调用父级对象
		 var $icon=_this.arrangeIcons(tabNum);
		 // 如果窗口大小改变，则重新排列图标
		 $(window).wresize(function(){
			myLib.desktop.winWH();// 更新窗口大小数据
			_this.arrangeIcons();
		 });
		 $icon.click(function(event){
			 clickIcon = this.id;
			// 如果是文件夹则浮动显示一个div
			 myLib.desktop.startMenu.hide();
			if($(this).children("input")[0].value == "folder"){
				$("#qk_div").remove();
				event.stopPropagation(); // 禁止冒泡
				
				var leftOFS = $(this).offset().left + 100;
				var topOFS = $(this).offset().top - 20;
				
				var html = "<div class='dialogue' id='qk_div' style='left:" + leftOFS + "px;top:" + topOFS + "px;position: absolute;z-index:99;'>" +
								"<div class='dialogueNavbox'>" +
									"<div class='dialogueNavOpen'><a id='qk_div_openbtn' style='color:#FFF;text-decoration:none;' href='#'>打开</a></div>" +
									"<div class='dialogueNavList'>" +
										"<ul id='qk_div_ul'></ul>" +
										"<div class='clear'></div>" +
									"</div>" +
								"</div>" +
								"<div class='dialogueBot'></div>" +
							"</div>";
				$(document.body).append(html);
				
				$.ajax({
		  			  type: 'POST',
		  			  url: 'ui/Deskelement!openFolder.do?flagType=ajax&math=' + Math.random(),
		  			  data: { appId : $(this).attr('id') },
		  			  dataType : 'text',
		  			  success: function(msg) {
		  				
		  				var html = "";
		  				if(eval(msg) == null || eval(msg) == '') {
		  					$("#qk_div_ul").append("<font color='white'>没有数据..</font>");
		  				}
		  				// 组拼数据
		  				$.each(eval(msg), function(i,item){
		  					var sortName = item.name;
		  					if(item.name.length >= 4){
		  						sortName = item.name.substring(0,4);
		  					}
		  					
		  					html = html + "<li>";
		  					html = html + "<a id='" + item.id + "' class='qk_div_icon' title='" + item.name + "' href='#'>";
		  					html = html + "<input type='hidden' name='app_href' value='" + item.href + "'/>";
		  					html = html + "<p><img src='" + item.backgroudPic + "' width='45' height='45' /></p>";
		  					html = html + "<p>" + sortName + "</p>";
		  					html = html + "</a>";
		  					html = html + "</li>";
				 		});
		  				// 显示数据
		  				$("#qk_div_ul").append(html);
		  				
		  				if($("#qk_div").css("height") != undefined){
		  					var myData=myLib.desktop.getMydata();
			  				var div_height = parseInt($("#qk_div").css("height").replace("px", ""));
			  				var div_top = parseInt($("#qk_div").css("top").replace("px", ""));
			  				if((div_height + div_top) > myData.winWh['h']){//DIV显示部分超出了document的高度
			  					$("#qk_div .dialogueNavList").css("max-height",(myData.winWh['h'] - div_top - 60) + "px");
			  				}
		  				}
		  				
		  				
		  				$(".qk_div_icon").click(function(){
		  					$("#qk_div").remove();
		  					var title = $(this).attr('title');
		  					var wid=this.id;
		  					var url=$(this).children("input")[0].value;
							if(title=='应用中心'){
		  						myLib.desktop.win.newWin({
		  						 WindowTitle:title,
		  						 WindowWidth : 800,
		  						 WindowHeight:450,
		  						 iframSrc:url,
		  						 WindowsId:wid,
		  						 WindowAnimation:'easeInBack'
		  						});
		  					}else{
		  					
		  					myLib.desktop.win.newWin({
		  						 WindowTitle:title,
		  						 iframSrc:url,
		  						 WindowsId:wid,
		  						 WindowAnimation:'easeInBack'
		  						 });
							}
		  					
		  				});
		  				
		  				$("#qk_div_openbtn").click(function(){
		  					$("#" + clickIcon).dblclick();
		  				});
		  			  }
	  		 	});
			} else {
			    if(browser.versions.ios || browser.versions.android) { // 移动设备单击打开功能
			    	var title = $(this).attr('title');
				 	var wid=this.id;
					var url=$(this).children("input")[0].value;
					
					if(url == "folder"){
						$("#qk_div").remove();
						url = "ui/Deskelement!openFolder.do?appId=" + wid;
					} 
					
					myLib.desktop.win.newWin({
						 WindowTitle:title,
						 iframSrc:url,
						 WindowsId:wid,
						 WindowAnimation:'easeInBack'
					});
			    }
			}
		 })
		 // 双击图标打开窗口
		 .dblclick(function(){
				var title = $(this).attr('title');
			 	var wid=this.id;
				var url=$(this).children("input")[0].value;
				
				if(url == "folder"){
					$("#qk_div").remove();
					url = "ui/Deskelement!openFolder.do?appId=" + wid;
				} 
				
				myLib.desktop.win.newWin({
					 WindowTitle:title,
					 iframSrc:url,
					 WindowsId:wid,
					 WindowAnimation:'easeInBack'
				});
		 })
		 .draggable({
				revert: true, //设置对象被拖动释放后时候回到原始位置 
				helper: "clone",
				opacity: 1.0,
				start: function(event, ui) {
					var offset=$(this).offset();
					$('body').data("curDragIcon", $(this));
				}
		 })
		 .droppable({
			 greedy: true, 
                drop: function(event, ui) {
                	swipe = false;
                	event.stopPropagation(); // 禁止冒泡
                	if(ui.draggable != null && ui.draggable.find("input")[1] != null) {// 交换位置和属性
                		$.ajax({
	          				  type: 'GET',
	          				  url: 'ui/Deskelement!swapNavigationIconAction.do?math=' + Math.random(),
	          				  data: { curDragIcon: ui.draggable.find("input")[1].value, thisIcon : $(this).attr("id") },
	          				  dataType : 'text',
	          				  success: function(msg) {
	          					  // 转换为json对象
	          					  var data = eval("(" + msg + ")"); 
	          					  if(data.message == "success") {
	          						  ui.draggable.remove();// 删除被拖的图标
	          						  myLib.desktop.deskIcon.refresh(tabNum);// 刷新页签
	          						  myLib.desktop.lrBar.refresh();// 刷新侧边导航栏
	          					  } else {
	          						  alert("操作出现错误,请重试.");
	          					  }
	          				  }
	          			});
                	} else {
                		var curDragIcon=$('body').data("curDragIcon");
    					if(curDragIcon == null || curDragIcon == undefined){
    						return false;
    					}
    					var curUrl = curDragIcon.children("input")[0].value;
    					var thisUrl = $(this).children("input")[0].value;
    					
    					// 执行ajax操作,记录调换的顺序
    					myLib.desktop.deskIcon.moveIcon(curDragIcon.attr("id"), $(this).attr("id"), curUrl, thisUrl);
    					
    				    if(browser.versions.ios || browser.versions.android) { // 如果是移动设备
    				    	myLib.desktop.deskIcon.refresh(getTabNum());// 刷新当前页
    				    } else {
    				    	//交换图标后的样式和特效设置 
        					curDragIcon.insertAfter($(this));
        					var l=$(this).css('left'),t=$(this).css('top');
        					$(this).css({'left':curDragIcon.css('left'),'top':curDragIcon.css('top')});
        					curDragIcon.css({'left':l,'top':t});
    				    }
                	}
				}
         });
		 
		 // 初始化图标菜单
		 var iconMenu = [
		                      [{
		                          text: "打开应用",
		                          func: function() {
		                        	  $("#" + $(this).attr('id')).dblclick();
		                          }
		                      }],[{
		                          text: "移动应用到",
		                          data: [[{
		                              text: "桌面一",
		                              func: function() {
		                            	  myLib.desktop.navTab.movePage($(this).attr('id'), 1);
		                              }
		                          }, {
		                        	  text: "桌面二",
		                              func: function() {
		                            	  myLib.desktop.navTab.movePage($(this).attr('id'), 2);
		                              }
		                          }, {
		                        	  text: "桌面三",
		                              func: function() {
		                            	  myLib.desktop.navTab.movePage($(this).attr('id'), 3);
		                              }
		                          }, {
		                        	  text: "桌面四",
		                              func: function() {
		                            	  myLib.desktop.navTab.movePage($(this).attr('id'), 4);
		                              }
		                          }, {
		                        	  text: "桌面五",
		                              func: function() {
		                            	  myLib.desktop.navTab.movePage($(this).attr('id'), 5);
		                              }
		                          }]]
		                      }, {
		                    	  text : '重命名',
		                    	  func : function() {
		                    	  	$("#dialog-form").attr('title', '重命名'); 
		                    	  	// 回显
		                    	    $("#folder_name").attr("value", $(this).attr('title'));
		                    	    var folderId = $(this).attr('id');
		                    	    
									$("#dialog-form").dialog({
										height: 130,
										width: 300,
										modal: true,
										resizable : false,
										buttons: {
											"确认": function() {
												var foldername = $("#folder_name").attr("value");
												
												if (foldername == "" || foldername == null) {
													$("#create_folder_message").empty();
													$("#create_folder_message").append("<strong style=\"color: red;\">名称必填</strong>");
													return false;
												} else if (foldername.length >= 20){
													$("#create_folder_message").empty();
													$("#create_folder_message").append("<strong style=\"color: red;font-size:12px;\">不能多于20位</strong>");
													return false;
												} else {
												    $.ajax({
						                    			  type: 'POST',
						                    			  url: 'ui/Deskelement!createFolder.do?math=' + Math.random(),
						                    			  data: { folderId : folderId, folderName : foldername, locationPage : tabNum },
						                    			  dataType : 'text',
						                    			  success: function(msg) {
						                    				  // 转换为json对象
						                    				  var data = eval("(" + msg + ")"); 
						                    				  if(data.message == "success") {
						                    					  $("#dialog-form").dialog("close");
						                    					  $("#folder_name").attr('value', '');
						                    					  myLib.desktop.deskIcon.refresh(tabNum);
						                    				  } else {
						                    					  alert("操作出现错误,请重试.");
						                    				  }
						                    			  }
						                    		 });
												}
											}
											,"取消": function() {
												$("#dialog-form").dialog("close");
											}
										}
									});
		                    	  }
		                      }, {
		                    	  text : '替换图标',
		                    	  func : function() {
		                    		  var title = "图标";
		              			 	  var wid = $(this).attr('id');
		              				  var url = 'ui/Deskelement!iconList.do?appId=' + wid + '&math=' + Math.random();
		              				
		              				  myLib.desktop.win.newWin({
		              					 WindowTitle:title,
		              					 iframSrc:url,
		              					 WindowsId:wid,
		              					 WindowAnimation:'easeInBack',
		              					WindowWidth : 675
		              				  });
		                    	  }
		                      }, {
		                          text: "删除应用/文件夹",
		                          func: function() {
		                        	  var selectIconId = $(this).attr('id');
		                        	  // 提示是否确认执行删除操作
		                        	  $("#message-dialog-form").dialog({
			          						height: 130,
			          						width: 300,
			          						modal: true,
			          						buttons: {
			          							"确认": function() {
			          								$.ajax({
				  		                    			  type: 'GET',
				  		                    			  url: 'ui/Deskelement!delDeskelement.do?math=' + Math.random(),
				  		                    			  data : { appId : selectIconId },
				  		                    			  dataType : 'text',
				  		                    			  success: function(msg) {
				  		                    				  // 转换为json对象
				  		                    				  var data = eval("(" + msg + ")"); 
				  		                    				  if(data.message == "success") {
				  		                    					  $("#message-dialog-form").dialog("close");
				  		                    					  myLib.desktop.deskIcon.refresh(tabNum);
				  		                    				  } else {
				  		                    					  alert("操作出现错误,请重试.");
				  		                    				  }
				  		                    			  }
				  		                    		});
			          							},
			          							"取消": function() {
			          								$("#message-dialog-form").dialog("close");
			          							}
			          						}
			          					});
		                          }
		                      }]
		 ];
		 myLib.desktop.contextMenu($(".desktop_icon"),iconMenu,"iconMenu",10);
		 
	}, 
	//刷新指定虚拟桌面
	refresh:function(tabNum){
			$.ajax({
				  type: 'GET',
				  url: 'ui/Deskelement!loadIconByLP.do?math=' + Math.random(),
				  data: { locationPage: tabNum },
				  dataType : 'text',
				  success: function(msg) {
					  // 转换为json对象
					  var data = eval("(" + msg + ")"); 
					  if(data.message == "success") {
						  // 先清空
						  $("#deskIcon_" + tabNum).empty();
						  // 在附加
						  $("#deskIcon_" + tabNum).append(data.html);
						  
						  $("#deskIcon_" + tabNum).css("display","block");
						  $("#tab_" + tabNum).addClass("over");

						  myLib.desktop.deskIcon.init();
					  } else {
						  alert("操作出现错误,请重试.");
					  }
				  }
			});
		}
};

myLib.NS("desktop.navTab");
myLib.desktop.navTab={
	//初始化
	init:function(){
			$("#tab_1").click(function(event){
				// 加载背景图片
				myLib.desktop.navTab.loadWallPaper(1);
				myLib.desktop.navTab.ajaxLoadDeskiconList(1);
				myLib.desktop.navTab.ajaxLoadTools(1);
				myLib.desktop.navTab.ajaxToolsPosition(1);
			});
			
			$("#tab_2").click(function(){
				// 加载背景图片
				myLib.desktop.navTab.loadWallPaper(2);
				myLib.desktop.navTab.ajaxLoadDeskiconList(2);
				myLib.desktop.navTab.ajaxLoadTools(2);
				myLib.desktop.navTab.ajaxToolsPosition(2);
			});
			
			$("#tab_3").click(function(){
				// 加载背景图片
				myLib.desktop.navTab.loadWallPaper(3);
				myLib.desktop.navTab.ajaxLoadDeskiconList(3);
				myLib.desktop.navTab.ajaxLoadTools(3);
				myLib.desktop.navTab.ajaxToolsPosition(3);
			});
			
			$("#tab_4").click(function(){
				// 加载背景图片
				myLib.desktop.navTab.loadWallPaper(4);
				myLib.desktop.navTab.ajaxLoadDeskiconList(4);
				myLib.desktop.navTab.ajaxLoadTools(4);
				myLib.desktop.navTab.ajaxToolsPosition(4);
			});
			
			$("#tab_5").click(function(){
				// 加载背景图片
				myLib.desktop.navTab.loadWallPaper(5);
				myLib.desktop.navTab.ajaxLoadDeskiconList(5);
				myLib.desktop.navTab.ajaxLoadTools(5);
				myLib.desktop.navTab.ajaxToolsPosition(5);
			});
			
			// 进入全局视图
			$("#globalView").click(function() {
				document.getElementById("desktop").style.display = "none";
				document.getElementById("appManagerPanel").style.display = "block";
				$.ajax({
					  type: 'GET',
					  url: 'ui/Deskelement!globalView.do?math=' + Math.random(),
					  dataType : 'text',
					  success: function(msg) {
						  // 转换为json对象
						  var data = eval("(" + msg + ")"); 
						  if(data.message == "success") {
							  
							  $("#app_container_horizontal").empty();
							  $("#app_container_horizontal").append(data.html);
							  
							  // 重新绑定一次点击事件
							  // 给全局视图里的图标绑定单击事件
								$("div[class='appButton amg_folder_appbutton']").each(function() {
									$(this).click(function() {
										
										var title = $(this).attr('title');
										var url = $(this).children("input")[0].value;
										var wid = $(this).find("input")[1].value;
										
										if(url == "folder"){
											url = "ui/Deskelement!openFolder.do?appId=" + wid;
										}
										
										myLib.desktop.win.newWin({
											WindowTitle : title,
											iframSrc : url,
											WindowsId : wid,
											WindowAnimation : 'easeInBack'
										});
										
										// 调用退出全局视图方法
										$("#aMg_close_Id").click();
										
										/*
										 * var wid =
										 * $(this).find("input")[1].value; var
										 * title = $(this).attr('title'); var
										 * url = $(this).find("input")[0].value;
										 * myLib.desktop.win.newWin({
										 * WindowTitle : title, iframSrc : url,
										 * WindowsId : wid, WindowAnimation :
										 * 'easeInBack' }); // 调用退出全局视图方法
										 * $("#aMg_close_Id").click();
										 */
									});
								});
						  } else {
							  alert("操作出现错误,请重试.");
						  }
					  }
				});
				
			});
			// 退出全局视图
			$("#aMg_close_Id").click(function() {
				document.getElementById("desktop").style.display = "block";
				document.getElementById("appManagerPanel").style.display = "none";
			});
			
			// 给全局视图里的图标绑定单击事件
			$("div[class='appButton amg_folder_appbutton']").each(function() {
				$(this).click(function() {
// var wid = $(this).attr('id');
					var wid = $(this).find("input")[1].value;
					var title = $(this).attr('title');
					var url = $(this).find("input")[0].value;
					myLib.desktop.win.newWin({
						WindowTitle : title,
						iframSrc : url,
						WindowsId : wid,
						WindowAnimation : 'easeInBack'
					});
					
					// 调用退出全局视图方法
					$("#aMg_close_Id").click();
				});
			});
			
			// 初始化全局视图
			$("#default_app_horizontal").find("img").dblclick(function () {
				var title = $(this).attr('title');
				var wid = $(this).parent().attr('id');
				var url = $(this).parent().children("input")[0].value;
				myLib.desktop.win.newWin({
					WindowTitle : title,
					iframSrc : url,
					WindowsId : wid,
					WindowAnimation : 'easeInBack'
				});
				
				// 调用退出全局视图方法
				$("#aMg_close_Id").click();
			});
			
			// 显示搜索框
			$("#navSearch").click(function(event) {
				event.stopPropagation(); // 阻止冒泡
				var d = $("#searchDiv").css("display");
				if(d == 'none') {
					$("#searchDiv").css("display", 'block');
					$("#pageletSearchInput").attr('value', '搜索应用...');
				} else {
					$("#searchDiv").css("display", 'none');
				}
			});
			
			// 搜索框的鼠标事件
			$("#pageletSearchInput").focus(function(event) {
				event.stopPropagation(); // 阻止冒泡
				$("#pageletSearchInput").attr('value', '');
			});
			
			// 搜索框的键盘事件
			$("#pageletSearchInput").keyup(function() {
				$.ajax({
		  			  type: 'POST',
		  			  url: 'ui/Deskelement!searchApplication.do?math=' + Math.random(),
		  			  data: { applicationName : $("#pageletSearchInput").attr('value') },
		  			  dataType : 'text',
		  			  success: function(msg) {
		  				var html = "";
		  				if(eval(msg) == null || eval(msg) == '') {
		  					// 清空
		  					$("#sb_resultBox").empty();
		  					return false;
		  				}
		  				$.each(eval(msg), function(i,item){
		  					
		  					var tmpName = item.name;
		  					if(item.href != null && item.href == 'folder') {
		  						tmpName = item.name + "  [文件夹]";
		  					}
		  					
							html = html + "<li class=\"sb_resultList\"><a href=\"javascript:void(0);\" onclick=\"myLib.desktop.win.openWin('" + item.id + "','" + item.name + "','" + item.href + "');\" title=\"" + item.name + "\"><div class=\"listInner\">" + tmpName + "</div></a></li>" ;
				 		});
		  				$("#sb_resultBox").empty();
	  					$("#sb_resultBox").append(html);
	  					$("#pagelet_search_suggest").css("display", "block");
		  			  }
	  		 	});
			});
			
	},
	//加载桌面图标列表
	ajaxLoadDeskiconList : function(locationPage) {
		if(tabNum == locationPage){
			return false;
		}
		
		$.ajax({
			  type: 'GET',
			  url: 'ui/Deskelement!loadIconByLP.do?math=' + Math.random(),
			  data: { locationPage: locationPage },
			  dataType : 'text',
			  success: function(msg) {
				  // 转换为json对象
				  var data = eval("(" + msg + ")"); 
				  if(data.message == "success") {
					  // 先清空
					  $("#deskIcon_" + locationPage).empty();
					  // 在附加
					  $("#deskIcon_" + locationPage).append(data.html);
					  
					  
					  $("#deskIcon_" + locationPage).css("display","block");
					  
					  
					  $("#deskIcon_" + tabNum).css("display","none");
					  $("#tab_" + locationPage).addClass("over");
					  $("#tab_" + tabNum).removeClass("over");
  
					  tabNum = locationPage;
					  myLib.desktop.deskIcon.init();
				  } else {
					  alert("操作出现错误,请重试.");
				  }
			  }
		});
	},
	//加载桌面页签内的工具
	ajaxLoadTools : function(locationPage) {
		$.ajax({
			  type: 'GET',
			  url: 'Index!ajaxLoadTools.do?math=' + Math.random(),
			  data: { locationPage: locationPage },
			  dataType : 'text',
			  success: function(msg) {
				  // 转换为json对象
				  var data = eval("(" + msg + ")"); 
				  if(data.message == "success") {
					  // 工具集合全部隐藏
					  if(data.allToolsCode != '') {
						  var codes = data.allToolsCode.split(",");
						  for(var i=0;i<codes.length;i++) {
							  var code = codes[i];
							  var divid = code + "_div";
							  $("#" + divid).css("display", 'none');
						  }
					  }
					  // 显示当前页签的工具
					  if(data.toolsLP != '') {
						  var codes = data.toolsLP.split(",");
						  for(var i=0;i<codes.length;i++) {
							  var code = codes[i];
							  var divid = code + "_div";
							  $("#" + divid).css("display", 'block');
						  }
					  }
				  } else {
					  alert("操作出现错误,请重试.");
				  }
			  }
		});
	},
	//加载桌面页签内的工具位置
	ajaxToolsPosition : function(locationPage) {
		$.ajax({
			  type: 'GET',
			  url: 'Index!ajaxToolsPosition.do?math=' + Math.random(),
			  data: { locationPage: locationPage },
			  dataType : 'text',
			  success: function(msg) {
				if(eval(msg) == null || eval(msg) == '') {
	  					return false;
	  			}
				
	  			$.each(eval(msg), function(i,item){
	  				var tmp = item.toolsCode + "_div";
	  				
	  				if(item.positionY == null || item.positionX == null || item.positionY == '0' || item.positionX == '0') {
	  					if(tmp == 'Clock_div') {
		  					$("#" + tmp).css("top", "7px");
			  				$("#" + tmp).css("right", "7px");
		  				}
	  					
		  				if(tmp == 'SchoolCale_div') {
		  					$("#" + tmp).css("top", "7px");
			  				$("#" + tmp).css("right", "160px");
		  				}
		  				
		  				if(tmp == 'ToDo_div') {
		  					$("#" + tmp).css("top", "160px");
			  				$("#" + tmp).css("right", "10px");
		  				}
		  				if(tmp == 'Notice_div') {
		  					$("#" + tmp).css("top", "160px");
			  				$("#" + tmp).css("right", "275px");
		  				}
		  				
		  				if(tmp == 'Curriculum_div') {
		  					$("#" + tmp).css("top", "367px");
			  				$("#" + tmp).css("right", "10px");
		  				}
		  				if(tmp == 'Schedule_div') {
		  					$("#" + tmp).css("top", "367px");
			  				$("#" + tmp).css("right", "275px");
		  				}
		  				
	  				} else {
	  					$("#" + tmp).css("top", item.positionY);
		  				$("#" + tmp).css("left", item.positionX);
	  				}
	  				
	  				// ajax加载工具内容
	  				if (tmp == 'Notice_div') { // 公告
	  					myLib.desktop.navTab.ajaxPortal("so/SoAnnouncecondition/jsonPortal.do?math='" + Math.random() + "'", tmp);
	  				}
	  				if (tmp == 'ToDo_div') { // 待办
	  					myLib.desktop.navTab.ajaxPortal("db/DbTask/jsonPortal.do?math='" + Math.random() + "'", tmp);
	  				}
	  				if (tmp == 'Curriculum_div') { // 课表
	  					myLib.desktop.navTab.ajaxPortal("cm/CmTeachercurriculum/jsonPortal.do?math='" + Math.random() + "'", tmp);
	  				}
	  				if (tmp == 'Schedule_div') { // 日程
	  					myLib.desktop.navTab.ajaxPortal("rc/RcSchedule/jsonPortal.do?math='" + Math.random() + "'", tmp);
	  				}
			 	});
			  }
		});
	},
	//加载工具内容
	ajaxPortal : function(url, divid) {
		$.ajax({
			  type: 'GET',
			  url: url,
			  dataType : 'text',
			  success: function(msg) {
				// 课程
				if(divid == 'Curriculum_div') {
					// 转换为json对象
					var data = eval("(" + msg + ")"); 
					$("#" + divid).children("div[class='drag_centent']").empty();
					if(data.html != "null"){
						$("#" + divid).children("div[class='drag_centent']").append(data.html);
					}else{
						$("#" + divid).children("div[class='drag_centent']").append("没有课表数据.");
					}
					
				} else {
					if(eval(msg) == null || eval(msg) == '') {
	  					return false;
		  			}
					// 公告
					if(divid == 'Notice_div') {
						var html = "<ul>";
						// 先清空数据
						$("#" + divid).children("div[class='drag_centent']").empty();
						// 再显示数据
						$.each(eval(msg), function(i,item){
							if(item != null) {
								var list = item.list;
								for(var i=0;i<list.length;i++) {
									var name = list[i].name;
									var tmp_name = name;
									if(name.length > 10) {
										tmp_name = name.substring(0,10) + "...";
									}
									html = html + "<li><span>" + list[i].date + "</span><a title='" + name + "' href=\"javascript:void(0);\" onclick=\"myLib.desktop.navTab.toolContent('" + list[i].url + "', 'Notice');\" ><img style=\"width: 8px;height: 8px;\" src=\"/ui/images/Drag_icon.gif\" border=\"0\" align=\"absmiddle\" /> " + tmp_name + "</a></li>";
								}
								if(list.length >= 5) {
									html = html + "<li><span><a href=\"javascript:void(0);\" onclick=\"myLib.desktop.navTab.toolContent('" + item.url + "', 'NoticeAll');\" >更多..</a></span><a href=\"#\">&nbsp;</a></li>";
								}
							}
						});
						html = html + "</ul>";
						$("#" + divid).children("div[class='drag_centent']").append(html);
					}
					// 待办
					if(divid == 'ToDo_div') {
						var html = "<ul>";
						// 先清空数据
						$("#" + divid).children("div[class='drag_centent']").empty();
						// 再显示数据
						$.each(eval(msg), function(i,item){
							if(item != null) {
								var ts = item.ts;
								var tmp_ts = ts.substring(0,10);
								
								var title = item.title;
								var tmp_title = title;
								if(title.length > 10) {
									tmp_title = title.substring(0,10) + "...";
								}
								
								html = html + "<li><span>[" + tmp_ts + "]</span><a title='" + title + "' href=\"javascript:void(0);\" onclick=\"myLib.desktop.navTab.toolContent('" + item.urladdress + "', 'ToDo');\"><img style=\"width: 8px;height: 8px;\" src=\"/ui/images/Drag_icon.gif\" border=\"0\" align=\"absmiddle\" /> " + tmp_title + "</a></li>";
								
								if(i >= 5) {
									html = html + "<li><span><a href=\"javascript:void(0);\" onclick=\"myLib.desktop.navTab.toolContent('db/DbTask/list.do', 'ToDo');\">更多..</a></span><a href=\"#\">&nbsp;</a></li>";
								}
							}
						});
						html = html + "</ul>";
						$("#" + divid).children("div[class='drag_centent']").append(html);
					}
					// 日程
					if(divid == 'Schedule_div') {
						var html = "<ul>";
						// 先清空数据
						$("#" + divid).children("div[class='drag_centent']").empty();
						// 再显示数据
						$.each(eval(msg), function(i,item){
							if(item != null) {
								var starttime = item.starttime;
								var tmp = "";
								if(starttime != null) {
									tmp = starttime.substring(0,10);
								}
								var title = item.title;
								var tmpTitle = title;
								
								if(title.length > 10) {
									tmpTitle = title.substring(0,10) + "...";
								}
								
								html = html + "<li><span>[" + tmp + "]</span><a title='" + title + "' href=\"javascript:void(0);\" onclick=\"myLib.desktop.navTab.toolContent('rc/RcSchedule/list.do', 'Schedule');\"><img style=\"width: 8px;height: 8px;\" src=\"/ui/images/Drag_icon.gif\" border=\"0\" align=\"absmiddle\" /> " + tmpTitle + "</a></li>";
								if(i >= 5) {
									html = html + "<li><span><a href=\"javascript:void(0);\" onclick=\"myLib.desktop.navTab.toolContent('rc/RcSchedule/list.do', 'Schedule');\">更多..</a></span><a href=\"#\">&nbsp;</a></li>";
								}
							}
						});
						
						html = html + "</ul>";
						$("#" + divid).children("div[class='drag_centent']").append(html);
					}
				} 
			  }
		});
	},
	//桌面工具内容展示
	toolContent:function(url, type) {
		if(type == 'Notice') {
			var title = '校内公告';
		 	var wid = 'Notice_';
			myLib.desktop.win.newWin({
				 WindowTitle:title,
				 WindowsId:wid,
				 iframSrc:url,
				 WindowAnimation:'easeInBack',
				 WindowWidth:650,
				 WindowHeight:475
			});
		}
		
		if(type == 'NoticeAll') {
			var title = '校内公告';
		 	var wid = 'NoticeAll_';
			myLib.desktop.win.newWin({
				 WindowTitle:title,
				 WindowsId:wid,
				 iframSrc:url,
				 WindowAnimation:'easeInBack',
				 WindowWidth:650
			});
		}
		
		if(type == 'ToDo') {
			var title = '待办事项';
			var wid = 'ToDo_';
			myLib.desktop.win.newWin({
				 WindowTitle:title,
				 WindowsId:wid,
				 iframSrc:url,
				 WindowAnimation:'easeInBack'
			});
		}
		if(type == 'Schedule') {
			var title = '日程';
			var wid = 'Schedule_';
			myLib.desktop.win.newWin({
				 WindowTitle:title,
				 WindowsId:wid,
				 iframSrc:url,
				 WindowAnimation:'easeInBack'
			});
		}
	},
	//关闭桌面工具
	removeTools : function(toolcode, toolid) {
		var tmp = toolcode + "_div";

		// 后台删除当前工具记录
		$.ajax({
			  type: 'GET',
			  url: 'Index!removeTools.do?math=' + Math.random(),
			  data: { locationPage: tabNum, toolId:toolid },
			  dataType : 'text',
			  success: function(msg) {
				  // 转换为json对象
				  var data = eval("(" + msg + ")"); 
				  if(data.message == "success") {
					  // 桌面隐藏当前工具
					  $("#" + tmp).css("display", "none");
				  } else {
					  alert("操作出现错误,请重试.");
				  }
			  }
		});
	},
	//移动图标到某一叶签
	movePage:function (appId, locationPage) {
			var url = 'ui/Deskelement!movePage.do';
			$.ajax({
				  type: 'GET',
				  url: url,
				  data: { appId: appId, locationPage: locationPage },
				  dataType : 'text',
				  success: function(msg) {
					  // 转换为json对象
					  var data = eval("(" + msg + ")"); 
					  if(data.message == "success") {
						  // 删除移动的图标
						  var html = $('#' + data.appId).html();
						  $("#" + data.appId).remove();
						  $("#deskIcon_" + data.locationPage).append("<li class='desktop_icon' id='" + data.appId + "'>" + html + "</li>");
						  
						  // 刷新页签
						  myLib.desktop.deskIcon.init(data.lp);
					  } else {
						  alert("操作出现错误,请重试.");
					  }
				  }
			});
	},

	//加载背景图片
	loadWallPaper : function(tabNum) {
//		var userinfoId = $('#userinfo_id').attr('value');
		$.ajax({
			  type: 'GET',
			  url: 'Index!loadWallPaper.do?v=' + new Date(),
//			  data: { userinfoId: userinfoId, tabNum: tabNum },
			  data: { tabNum: tabNum },
			  dataType : 'text',
			  success: function(msg) {
				  // 转换为json对象
				  var data = eval("(" + msg + ")"); 
				  if(data.message == "success") {
					  $("body").css("background-image", "url('ui/wallpapers/" + data.wallPaper + "')");
				  } else {
					  alert("操作出现错误,请重试.");
				  }
			  }
		});
	}

};

// 全局视图
myLib.NS("desktop.globalView");
myLib.desktop.globalView = {
	// 初始化
	init : function () {
		// 初始化全局视图页面
	}
};

//桌面小工具
myLib.NS("desktop.tools");
myLib.desktop.tools = {
	// 初始化
	init : function () {
		var toolsMenu = [[{
			text : "移动至桌面一",
			func : function() {
//				$(this).attr("toolid");
				if(tabNum == 1) {
					return false;
				}
				var tools = $(this);
				myLib.desktop.tools.move(tools, '1', '一');
			}
		},{
			text : "移动至桌面二",
			func : function() {
				if(tabNum == 2) {
					return false;
				}
//				$(this).hide();
				var tools = $(this);
				myLib.desktop.tools.move(tools, '2', '二');
			}
		},{
			text : "移动至桌面三",
			func : function() {
				if(tabNum == 3) {
					return false;
				}
				
				var tools = $(this);
				myLib.desktop.tools.move(tools, '3', '三');
			}
		},{
			text : "移动至桌面四",
			func : function() {
				if(tabNum == 4) {
					return false;
				}
				var tools = $(this);
				myLib.desktop.tools.move(tools, '4', '四');
			}
		},{
			text : "移动至桌面五",
			func : function() {
				if(tabNum == 5) {
					return false;
				}
				var tools = $(this);
				myLib.desktop.tools.move(tools, '5', '五');
			}
		} ]];
	 
	 myLib.desktop.contextMenu($(".drag_box"),toolsMenu,"toolsMenu",10);
	},

	move:function(obj, page, message) {
		$.ajax({
			  type: 'GET',
			  url: 'Index!toolsMove.do?math=' + Math.random(),
			  data: { locationPage:tabNum, toolId:obj.attr("toolid"), moveToPage : page},
			  dataType : 'text',
			  success: function(msg) {
				  var data = eval("(" + msg + ")"); 
				  if(data.message == "success") {
					  obj.hide();
				  } else {
					  alert("桌面" + message + "存在当前工具");
				  }
			  }
		});
	}
};

// 开始菜单
myLib.NS("desktop.startMenu");
myLib.desktop.startMenu = {
	// 初始化
	init : function () {
		// 个人信息
		$("#_userinfo").click(function(event) {
			event.stopPropagation(); // 禁止冒泡
			  myLib.desktop.win.newWin({
				 WindowTitle:'个人信息',
				 iframSrc:'/ui/pages/ui/user_info.jsp',
				 WindowsId:'userinfo_win',
				 WindowAnimation:'easeInBack',
				 WindowWidth : 500,
				 WindowHeight : 248
			  });
			 
			  $("#start_item").hide();
			  $("#program_item").hide();
			  $("#program_app_item").hide();
			  
			  
		});
		
		// 服务中心
		$("#_serverCenter").click(function(event) {
			event.stopPropagation(); // 禁止冒泡
			window.open("http://www.baidu.com");
		});
		
		// 版本信息
		$("#_version").click(function(event) {
			event.stopPropagation(); // 禁止冒泡
			$("#version-dialog-form").dialog({
					height: 150,
					width: 300,
					modal: true,
					buttons: {
						"确认": function() {
							$("#version-dialog-form").dialog("close");
						}
					}
			});
		});
		
		// 退出系统
		$("#_logout").click(function(event) {
			event.stopPropagation(); // 禁止冒泡
			$("#logout-dialog-form").dialog({
				height: 130,
				width: 300,
				modal: true,
				resizable : false,
				buttons: {
					"确认": function() {
						$("#logout-dialog-form").dialog("close");
						// 退出系统
						window.location = "${ctx}/j_spring_security_logout";
					},
					"取消" : function() {
						$("#logout-dialog-form").dialog("close");
					}
				}
			});
		});
		
		// 全部功能
		$("#all_program").hover(function(event){
				
				var dock = $("#dock_hidden").attr('value');
				if(dock == "left"){
					$("#program_item").css("left","260px");
					$("#program_app_item").css("left","447px");
				}else{
					$("#program_item").css("left","-376px");
					$("#program_app_item").css("left","447px");
//					alert("全部功能菜单只有在左侧才能正常显示\n     请您切换工具栏至左侧再试.");
				}
				
				$("#program_item").css("display","block").fadeTo(1000, 1);
				if(!browser.versions.ios && !browser.versions.android){//PC
					jsScroll(document.getElementById('program_item'), 5, 'divScrollBar');
				}else{
					padscroll = new iScroll("program_item",{hScrollbar:false});
				}
				
				},function() {
					setTimeout(function() {
						if(!program_item_hover){
							$("#program_item").hide();
							$(".divScrollBar").remove();
							$("#program_app_item").hide();
							if(browser.versions.ios || browser.versions.android){
								padscroll.destroy();
							}
						}
					},300)
					
				}
		);
		
		$('._program_app').hover(function(event) {
          //event.stopPropagation(); // 禁止冒泡
          //event.preventDefault();
					var _self = $(this);
					delayTime = setTimeout(function() {
						var currResID = _self.attr('id');
						
						$.ajax({
							  type: 'POST',
							  url: 'Index!loadResource.do',
							  data: { resourcesId : _self.attr('id') },
							  dataType : 'text',
							  success: function(msg) {
								  
								  var data = eval("(" + msg + ")"); 
								  if(data.message == "success") {
									  $('#program_app_item').empty();
									  var result = data.html;
									  var count = result.substring(result.length - 1,result.length);
									  if(!browser.versions.ios && !browser.versions.android){//PC
										  if($('.divScrollBar').length != 0){
											  var absTop = getAbsoluteLocation(currResID).absoluteTop - 4;
											  var scrTop = document.getElementById('program_item').scrollBarIndex.offsetTop;
											  $('#program_app_item').css("top",absTop - scrTop);
											  $('#program_app_item').css("height",count * 36);
										  }else{
											  var absTop = getAbsoluteLocation(currResID).absoluteTop - 4;
											  $('#program_app_item').css("top",absTop);
											  $('#program_app_item').css("height",count * 36);
										  }
										  
									  }else{//Mobile
										  var absTop = getAbsoluteLocation(currResID).absoluteTop - 4;
										  $('#program_app_item').css("top",absTop + padscroll.getScrollTop());
										  $('#program_app_item').css("height",count * 36);
									  }
									  
									  $('#program_app_item').append(result.substring(0,result.length - 1));
									  $("#program_app_item").attr("display","block").fadeTo(1000, 1);
									  
									  // 绑定事件
									  $('._program_app_p').click(function(event) {
										  if($(this).attr('name') != "allProgram"){
											  myLib.desktop.win.newWin({
													 WindowTitle: $(this).attr('name'),
													 iframSrc: $(this).attr('url'),
													 WindowAnimation:'easeInBack',
												     WindowsId:$(this).attr('id')
												  });
											  
											  if(lr_hover){//自动隐藏功能开启
												  $("#lr_bar").css("left","-62px");
											  }
										  }
									  });
												  
								  } else {
									  alert("操作出现错误,请重试.");
								  }
							  }
						});
				   },300)
				},function() {
					clearTimeout(delayTime);
				});
		
		
		
		// 点击打开功能
		  $('._program_app_p').click(function(event) {
			  event.stopPropagation(); // 禁止冒泡
			  if($(this).attr("id") != "all_program"){
				  myLib.desktop.win.newWin({
					 WindowTitle: $(this).attr('name'),
					 iframSrc: $(this).attr('url'),
					 WindowAnimation:'easeInBack',
					 WindowsId:$(this).attr('id')
				  });
				  
					$("#qk_div").remove();
					$.smartMenu.hide();
					myLib.desktop.startMenu.hide();
					
					if(lr_hover){//自动隐藏功能开启
						  $("#lr_bar").css("left","-62px");
					 }
			  }
		  });
		  
		  $("#program_item").hover(function(){
			  program_item_hover = true;
		  },function() {
			  program_item_hover = false;
		  })
	},hide :function(){
		$("#start_item").hide();
		$("#program_item").hide();
		$("#program_app_item").hide();
		$(".divScrollBar").remove();
	}
};


// 当页面加载完毕执行
$(function(){

	
	$("body").swipe({
		swipeLeft: function() {
			if(swipe){
				if(tabNum == 5){
	        		$("#tab_1").click();
	        	}else{
	        		$("#tab_" + (tabNum + 1) + "").click();
	        	}
			}else{
				swipe = true;
			}
        },
        swipeRight: function() {
        	if(swipe){
				if(tabNum == 1){
					$("#tab_5").click();
				}else{
					$("#tab_" + (tabNum - 1) + "").click();
				}
        	}else{
        		swipe = true;
        	}
        }
	});
	
   // 存储桌面布局元素的jquery对象
   myLib.desktop.desktopPanel();
   // 初始化桌面
   myLib.desktop.init();
   // 初始化任务栏
   myLib.desktop.taskBar.init();
   // 初始化桌面图标
   myLib.desktop.deskIcon.init();
   // 初始化侧边栏
   myLib.desktop.lrBar.init();
   // 初始化上方导航栏
   myLib.desktop.navTab.init();
   //初始化小工具
   myLib.desktop.tools.init();
   
   //设置某些元素文字不可选中
   $(".win_title").disableSelection();//窗口标题
   
   //开始菜单
   myLib.desktop.startMenu.init();
   
   // 初始化快捷键
   document.onkeydown = function(event){
	   if($.browser.msie){
		   window.event.ctrlKey && window.event.altKey && window.event.keyCode == 49 ? $("#tab_1").click() : null;
		   window.event.ctrlKey && window.event.altKey && window.event.keyCode == 50 ? $("#tab_2").click() : null;
		   window.event.ctrlKey && window.event.altKey && window.event.keyCode == 51 ? $("#tab_3").click() : null;
		   window.event.ctrlKey && window.event.altKey && window.event.keyCode == 52 ? $("#tab_4").click() : null;
		   window.event.ctrlKey && window.event.altKey && window.event.keyCode == 53 ? $("#tab_5").click() : null;
	   }else{
		   event.ctrlKey && event.altKey && event.keyCode == 49 ? $("#tab_1").click() : null;
		   event.ctrlKey && event.altKey && event.keyCode == 50 ? $("#tab_2").click() : null;
		   event.ctrlKey && event.altKey && event.keyCode == 51 ? $("#tab_3").click() : null;
		   event.ctrlKey && event.altKey && event.keyCode == 52 ? $("#tab_4").click() : null;
		   event.ctrlKey && event.altKey && event.keyCode == 53 ? $("#tab_5").click() : null;
	   }
   };
   
   // 替换5个页签页面的事件
   $("#desktop").droppable({
		drop : function(event, ui) {
			swipe = false;
			event.stopPropagation(); // 禁止冒泡
			// 这里要判断图标来源，如果是页签上的则不做操作
			if(ui.draggable.parent().attr("id") == "default_app"){
				// ajax存储
				$.ajax({
					  type: 'GET',
					  url: 'ui/Deskelement!navigationIconAction.do?math=' + Math.random(),
					  data: { locationPage: tabNum, appId : ui.draggable.find("input")[1].value },
					  dataType : 'text',
					  success: function(msg) {
						  // 转换为json对象
						  var data = eval("(" + msg + ")"); 
						  if(data.message == "success") {
							  // 刷新页签
							  myLib.desktop.deskIcon.refresh(data.locationPage);
							  ui.draggable.remove();
						  } else {
							  alert("操作出现错误,请重试.");
						  }
					  }
				});
			}
		}
	});
   
   // 初始化工具位置
   myLib.desktop.navTab.ajaxToolsPosition(1);
   
   // 初始化消息提醒的位置
   var winW = $(window).width();
   if(winW != null && winW != "") {
	   if(winW > 310) {
		   var tmpW = (winW - 310) / 2;
		   $("#pullmessage_div", window.parent.document).css("left", tmpW);
	   }
   }
   
   // 轮询操作
   setInterval(function(){
	   var displayValue = $("#Schedule_div").css('display');
	   if(displayValue == 'block') {
		   // 日程
		   myLib.desktop.navTab.ajaxPortal("rc/RcSchedule/jsonPortal.do?math='" + Math.random() + "'", "Schedule_div");
	   }
   }, 1000 * 60);
});

//获取当前激活的虚拟桌面序号
function getTabNum() {
	return tabNum;
}

// 定时器
function refreshPortal(){
	// 判断是否显示、如果显示则即时刷新
	var noticeDiv = $("#Notice_div").css('display');
	var todoDiv = $("#ToDo_div").css('display');
	var scheduleDiv = $("#Schedule_div").css('display');
	if(noticeDiv == 'block') {
		myLib.desktop.navTab.ajaxPortal("so/SoAnnouncecondition/jsonPortal.do", "Notice_div");
	}
	if(todoDiv == 'block') {
		myLib.desktop.navTab.ajaxPortal("db/DbTask/jsonPortal.do", "ToDo_div");
	}
	if(scheduleDiv == 'block') {
		myLib.desktop.navTab.ajaxPortal("rc/RcSchedule/jsonPortal.do", "Schedule_div");
	}
}

//获取元素的绝对定位
function getAbsoluteLocation(currResID){
	
	var element = document.getElementById(currResID);
    
    var offsetTop = element.offsetTop; 
    
    var offsetLeft = element.offsetLeft; 
    var offsetWidth = element.offsetWidth; 
    var offsetHeight = element.offsetHeight; 
    while(element = element.offsetParent){ 
        offsetTop += element.offsetTop; 
        offsetLeft += element.offsetLeft; 
    } 
    
    return {absoluteTop: offsetTop, absoluteLeft: offsetLeft, offsetWidth: offsetWidth, offsetHeight: offsetHeight}; 
} 

