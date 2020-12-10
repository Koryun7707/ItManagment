var notits;
var message;
$(document).on("click","#reyting input",function(){
	var val = $(this).val();
	var id = $(this).parents("tr").attr("userId");
	$.ajax({
		url:"/reyting",
		type:"post",
		data:{val:val,id:id},
		success:function(r){
			console.log(r)
		}
},1000)
})
$(document).on("click",".deadButton",function(){
	var projId = $(this).attr("projId");
	var myId =$(this).attr("myId");
	// alert(myId)
	var userName = $(this).attr("userName");
	$.ajax({
		url:"/notifAdmin",
		type:"post",
		data:{projId:projId,myId:myId,name:userName},
		success:function(r){
			location.href=`/myProjects?userId = ${myId}`
		}
},1000)
	
})
var notifSt = setInterval(()=>{

	$.ajax({
		url:"/notif",
		type:"post",
		datatype:"json",
		success:function(r){
			notifs = r;
			$("#notifButton").html("Notification (" +r.length + ")")
		}
	})
},1000)
var messages = setInterval(()=>{
	$.ajax({
		url:"/message",
		type:"post",

		success:function(r){
			message = r;
			$("#messagesDiv").html("Messages("+r.length+")")
		}
	})
},1000)
var div =true;
$(document).on("click", "#messagesDiv", function(){
	if(div){

		$("#praw_1").append("<div class='bacvox'></div>")
		$(".bacvox").empty();
	
		
		message.forEach(function(item){

					console.log(item)
			$.ajax({
				url:"/messagePeople",
				type:"post",
				data:{message:item.user1_id},
				success:function(r){
					$(".bacvox").append(`<div class='namakner' myId='${item.user2_id}' userId='${item.user1_id}'><div class='imgMsg'><img src='images/userImages/${r.imgsrc}'</div><b>
						${r.name} ${r.surname} (${item["count(id)"]})</b> <br> ${item.text}</div>`)
				}
			})
		})
		
		div =false;
		
	}
	else {
		$(".bacvox").remove(".bacvox")
		div=true;	
	}

		})
$(document).on("click",".namakner",function(){

	var userId = $(this).attr('userId');
	var myId = $(this).attr('myId');
	var elm = $(this);
		$("#chat").remove();
		$.ajax({
			url:"/statusMessage",
			type:"post",
			data:{user1_id:userId,user2_id:myId},
			success:function(r){
				elm.remove();
					
			}
		})

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

$(document).on("click","#notifButton",function(){
	$("#notifDiv").empty();
	notifs.forEach(function(item){
		if(item.status!=1){

			$("#notifDiv").append(`<div notifId=${item.id} class = 'notifDiv'>${item.text}</div>`);
		}

	})
})
$(document).on("click",".notifDiv",function(){
	var elm = $(this);
	
	var notifId = $(this).attr("notifId");
	console.log(notifId)
	$.ajax({
		url:"/notifStatus",
		type:"post",
		data:{notifId:notifId},
		success:function(r){
			elm.css("background","none");


		}
	})

})
$(document).on("blur","#notifDiv",function(){
	$("#notifDiv").css("background","none");
	$("#notifDiv").empty();
})
