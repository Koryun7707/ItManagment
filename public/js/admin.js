$(document).on("click","#closeChat",function(){
	$("#chat").remove();
})

$(document).on("click",".sms",function(){
	var userId = $(this).parents("tr").attr("userId");
	var myId = $(this).attr('myId');
	var elm = $(this);
		$("#chat").remove();
		$.ajax({
			url:"/statusMessage",
			type:"post",
			data:{user1_id:userId,user2_id:myId},
			success:function(r){
				console.log(r)
			}
		})
	$("#chat").remove();


$('body').append(`<div myId="${$(this).attr("myId")}" userId="${userId}" id='chat'></div>`)
var div =$("<div class='chat'> <textarea id='message' rows='1' cols='5' ></textarea><button id='closeChat'>X</button><button id='chatButton'>Send</button></div>");
$.ajax({
		url:"/chat",
		type:"post",
		data:{userId:userId},
		success:function(r){
			$("#chat").append(`<div class='imgOl'> <img class="searchImg" src ='./images/userImages/${r.data.imgsrc}'> <ol class="searchP">${r.data.name} ${r.data.surname}</ol><br></div>`)
			$("#chat").append(div);
			$("#chat").append($("<div class='msg'></div>"));

			$("body").append(`<script src ="js/chat.js"></script>`)

		}
	})

})

$(document).on("click","#deleteProject",function(){
	var projId = $("#proyectiId").attr("value");
	$.ajax({
		url:"/deleteProject",
		type:"post",
		data:{projId:projId},
		success:function(r){
			location.href="/projects"
		}
	})
})

/*$(document).on("blur","#notifButton",function(){

	$("#notifDiv").empty();
})*/
$(document).on("click",".deleteBtn",function(){
	var userId = $(this).parents("tr").attr("userId")
	var elm = $(this);
	$.ajax({
		url:"/deleteUser",
		type:"post",
		data:{userId:userId},
		success:function(r){
			elm.parents("tr").remove();
		}
	})
})
$(document).on("click",".deleteProjUser",function(){
	 var userId = $(this).attr("userId");
	 var projId = $(this).attr("projId");
	 var elm = $(this);
	 $.ajax ({
	 	url:"/deleteProjUser",
	 	type:"post",
	 	data:{
	 		userId:userId,
	 		projId:projId
	 	},
	 	success:function(r){
	 		elm.parents(".userDeleteDiv").remove();
	 	}
	 }) 
})

function mouseDown() {
	if($("#search").val()==""){
	    $.ajax({
	    	url:"/searchDown",
	    	type:"post",
	    	data:null,
	    	success:function(r){
	    		$("#searchPeople").remove();
	    		var people = r.all;
	    		people.length= 7;
	    		var div = $("<div id='searchPeople'>")
					$("#searchDiv").append(div)
		              	people.forEach(function(item){
		              		$("#searchPeople").append(`<div myid='${item.id}' class='imgOl'> <img class="searchImg" src ='./images/userImages/${item.imgsrc}'> <ol class="searchP">${item.name} ${item.surname}</ol><br></div>`)
		                })
	    	}
	    })
	}
}
$(document).on("click",'.imgOl',function(){
	var x = $(this).attr("myId");
	if(x){
		location.href = `/userPage?userId=${x}`;
		
	}
})
$('html').on("click",function(e){
	
	if(!$(e.target).is('#searchDiv') && !$(e.target).is("#searchPeople")){
	
		$("#searchPeople").remove();
	}
})
/*$(document).on("blur","#search",function(){
	$("#searchPeople").remove();
})*/
$(document).on("input","#search",function(){
	var searchTxt = $(this).val();
	
	$.ajax({
		url:"/search",
		type:"post",
		data:{searchTxt:searchTxt},
		success:function(r){

			var people = r.search;
			console.log(people)
			
				$("#searchPeople").remove();
				if(people.length !=0){
				var div = $("<div id='searchPeople'>")
				$("#searchDiv").append(div)
	              	people.forEach(function(item){
	              		$("#searchPeople").append(`<div class='imgOl'> <img class="searchImg" src ='./images/userImages/${item.imgsrc}'> <ol class="searchP">${item.name} ${item.surname}</ol><br></div>`)
	                })
				
			}
			
		
		}
	})
})
$(document).on("click",".allProjects tr",function(){
	var x = $(this).attr("projId");
	if(x){
		location.href = `/projectPage?projId=${x}`;
	}
})

pressed = false;

$(document).on("mousedown", "#chat", () =>{
	pressed = true;
})
$(document).on("mouseup", "#chat", () =>{
	pressed = false;
})
$(document).on("mousemove", "#chat", (e) =>{
	if(pressed){
		$("#chat").css({
			left: e.clientX - 115 + "px",
			top: e.clientY - 175 + "px",
		})
	}
})
$(document).on("mouseleave", "#chat", () =>{
	pressed = false;
})

