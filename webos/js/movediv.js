window.onload = function (){
	bindMoveDiv("Clock_div");
	bindMoveDiv("SchoolCale_div");
	
	bindMoveDiv("ToDo_div");
	bindMoveDiv("Notice_div");
	bindMoveDiv("Curriculum_div");
	bindMoveDiv("Schedule_div");
	
//	bindMoveDiv("nav_tab");
//	regisCloseBtn("clock_div");
//	regisCloseBtn("schoolInfo");
}

/**
 * 可以移动DIV
 */
function bindMoveDiv(divId) {
	if(divId == "Clock_div" && browser.versions.ios){//如果是IPAD浏览器遍不加载时钟控件
		return;
	}
	
	var oDiv = document.getElementById(divId);
	$(oDiv).draggable({
	     stop: function(event, ui) {
	    	 var tabNum = getTabNum();
				var toolId = $(oDiv).attr('toolid');
				$.ajax({
					  type: 'GET',
					  url: 'Index!toolPosition.do?math=' + Math.random(),
					  data: { locationPage: tabNum, toolId : toolId, positionX:oDiv.style.left, positionY:oDiv.style.top },
					  dataType : 'text',
					  success: function() {
					  }
				});
	     }
	});
}



function regisCloseBtn(divId){
	$("#" + divId).hover(
		function(){
			$("#" + divId + " div").addClass("tools_div_over");
		},
		function(){
			$("#" + divId + " div").removeClass("tools_div_over");
	})
}