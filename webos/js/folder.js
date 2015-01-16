var selectIcon = null;
//当页面加载完毕执行
$(function(){
		$(document.body).click(function(event) {
			event.preventDefault();
			$.smartMenu.hide();
		});
		
		var data=[
					[{
						text:"打开应用",
						func:function(){
							$("#" + selectIcon).click();
						}
					}]
					,
					[{
						text:"删除应用",
						func:function(){
							// 提示是否确认执行删除操作
                      	  $("#message-dialog-form").dialog({
	          						modal: true,
	          						buttons: {
	          							"确认": function() {
	          								$.ajax({
		  		                    			  type: 'GET',
		  		                    			  url: '/ui/Deskelement!delDeskelement.do?math=' + Math.random(),
		  		                    			  data: { appId: selectIcon },
		  		                    			  dataType : 'text',
		  		                    			  success: function(msg) {
		  		                    				  // 转换为json对象
		  		                    				  var data = eval("(" + msg + ")"); 
		  		                    				  if(data.message == "success") {
		  		                    					  $("#message-dialog-form").dialog("close");
		  		                    					  $("#" + selectIcon).parent().remove();
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
					},{
						text:"移出文件夹",
						func:function(){
							var tabNum = window.parent.getTabNum();
							$.ajax({
								  type: 'GET',
								  url: '/ui/Deskelement!moveOutFolder.do?math=' + Math.random(),
								  data: { appId: selectIcon, locationPage: tabNum },
								  dataType : 'text',
								  success: function(msg) {
									  // 转换为json对象
									  var data = eval("(" + msg + ")"); 
									  if(data.message == "success") {
										  // ajax刷新页签
										  window.parent.myLib.desktop.deskIcon.refresh(window.parent.getTabNum());
										  $("#" + selectIcon).parent().remove();
									  } else {
										  alert("操作出现错误,请重试.");
									  }
								  }
							});
						}
					}]
					];
		
		$("a").smartMenu(data);
		
		$("a").hover(function(){
			 selectIcon = $(this).attr("id");
		},function(){
			
		})
		
		$("a").click(function(){
			var title = $(this).attr('title');
			var wid=this.id;
			var url=$(this).children("input")[0].value;
			
			window.parent.myLib.desktop.win.newWin({
				 WindowTitle:title,
				 iframSrc:url,
				 WindowsId:wid,
				 WindowAnimation:'easeInBack'
			});
		})
		
	});

