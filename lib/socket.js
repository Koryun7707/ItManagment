class Socket{
	constructor(s){
		this.io =require("socket.io")(s);
		this.io.on("connection",(socket)=>{
			Socket.socket = socket;
			socket.on("sendMessage",(r)=>{
				this.sendMessage(r);
			})
			socket.on("chatStart",(r)=>{
				this.chatStart(r);
			})

		})
	}
	sendMessage(data){
		var model = require("../data/UserModel");
		model.insert({user1_id:data.user1_id,user2_id:data.user2_id,text:data.text,status:0},"messages").then(function(){
			
		})
	}
	chatStart(r){
		var model = require("../data/UserModel");
		model.findMessage(r).then(function(data){
			Socket.socket.emit("chatShow",{data:data})
		})
		.catch(function(err){
			console.log(err)
		})
	}
}
module.exports = Socket;