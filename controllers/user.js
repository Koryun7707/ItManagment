var passwordHash = require('password-hash');


class User{
	reyting(req,res){
		var model = require("../data/UserModel");
		var text = `Ձեր ռեյտինգը = ${req.body.val}`
		model.update({reyting:req.body.val},req.body.id,"users").then(function(data){
			model.insert({user1_id:1,user2_id:req.body.id,text:text,status:0},"notif").then(function(d){
				res.send({});
		})
			.catch(function(err){
				console.log(err)
			})
			
		})
	}
	statusMessage(req,res){
		var model = require("../data/UserModel");
		model.updateMessage(req.body.user1_id,req.body.user2_id).then(function(data){
			res.send({})
		})
		.catch(function(err){
			console.log(err)
		})
	}
	notifAdmin(req,res){
		var model = require("../data/UserModel");
		var text = `${req.body.name} ավարտել Է պրոեկտը`
		model.insert({user1_id:req.body.myId,user2_id:1,text:text,status:0},"notif").then(function(){
			res.send({});
		})
		.catch(function(err){
			console.log(err)
		})
	}
	message(req,res){
		var model = require("../data/UserModel");
		if(req.session.user){

			model.findMyMessage(req.session.user.id).then(function(data){
				

				res.send(data)
			})
			.catch(function(err){
				console.log(err)
			})
		}

		else if(req.session.admin){
			model.findMyMessage(req.session.admin.id).then(function(data){
				

				res.send(data)
			})
			.catch(function(err){
				console.log(err)
			})
		}
	}


	messagePeople(req,res){
		var model = require("../data/UserModel");
		console.log("fvxc"+req.body.message)
		model.find({id:req.body.message},"users").then(function(data){
			//console.log(data)
			res.send(data[0])
		})
		.catch(function(err){
			console.log(err)
		})
	}
	signup(req,res){
		res.render("signup");
	}
	allUsersUser(req,res){
		var model = require("../data/UserModel");
		model.findAll().then(function(data){
			if(req.session.user){

					res.render("allUsersUser", {user: req.session.user, data:data})
			}
			else{
				req.session.err = "Duq chuneq hasaneliutyun es ejin"
				res.redirect('login')
			}
		})
	}
	notifStatus(req,res){
		var model = require("../data/UserModel");
		model.update({status:1},req.body.notifId,"notif").then(function(data){
			res.send({});
		})
		.catch(function(err){
			console.log(err)
		})
	}
	notif(req,res){
		var model = require("../data/UserModel");
		if(req.session.user){
			
			model.findMyNotif(req.session.user.id).then(function(data){
				res.send(data)
			})
			.catch(function(err){
				console.log(err)
			})
		}
		else if(req.session.admin){
			model.findMyNotif(req.session.admin.id).then(function(data){
				res.send(data)
			})
			.catch(function(err){
				console.log(err)
			})
		}
			
	}
	myProjects(req,res){
		var module = require("../data/AdminModel");
		var arr =  []
	
	module.find({user_id:req.query.userId},"user_proj").then(function(data){

		


			for(let i=0;i<data.length;i++){

				module.find({id:data[i].proj_id},"projects").then(function(d){
									arr.push(d[0])



					if(i == data.length-1){
						res.render("myProjects",{user:req.session.user,proj:arr})

					}
				})
				}
				if(data.length == 0){

					res.render("myProjects",{user:req.session.user,proj:arr})
				}
			
	})
	.catch(function(err){
		console.log(err)
	})
		}
	userHome(req,res){
		if(req.session.user){
		res.render("userHome", {user:req.session.user})
			
		}
		else{
			req.session.err = "Duq chuneq hasaneliutyun es ejin"
			res.redirect('login')
		}
	}

	
}

module.exports = User;