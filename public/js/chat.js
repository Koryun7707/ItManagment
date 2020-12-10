var socket = io()

var user2_id = $("#chat").attr("userId");
var user1_id = $("#chat").attr("myId");

setInterval(function(){

	socket.emit("chatStart",{user1_id:user1_id,user2_id:user2_id});
}, 500)


socket.on("chatShow",function(r){
	$(".msg").empty();

	r.data.forEach(function(item){
		if(item.user1_id==user1_id){
			$(".msg").append(`<div class='LRmsg'><div class='rightSms'>${item.text}</div></div><br>`)		
		}
		else{
			$(".msg").append(`<div class='LRmsg'><div class='leftSms'>${item.text}</div></div><br>`)
		}
	})
})

$(document).on("click","#chatButton",function(){
	var txt = $("#message").val();
	console.log(txt)
	$('.msg').animate({scrollTop: 4000}, 1)
	socket.emit("sendMessage",{text:txt,user1_id:user1_id,user2_id:user2_id})
	$("#message").val("");
	$('.msg').animate({scrollTop: 4000}, 1)
})