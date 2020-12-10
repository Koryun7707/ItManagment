var passwordHash = require('password-hash');

class Admin{
	chat(req,res){
		var model = require("../data/UserModel");
		model.find({id:req.body.userId},"users").then(function(data){
			res.send({data:data[0]})
		})
		.catch(function(err){
			console.log(err)
		})
	}
	deleteProject(req,res){
		// console.log(req.query.projId);
		var model = require("../data/UserModel");
		model.deleteUser(req.body.projId,"projects").then(function(data){
			res.send("ok")
		})
		.catch(function(err){
			console.log(err)
		})
	}

	deleteProjUser(req,res){
		var model = require("../data/AdminModel");
		
		model.deleteUserFromProject({projId:req.body.projId,userId:req.body.userId}).then(function(data){
			res.send({});
		})
	}
	updateProj(req,res){
			var obj = {
			name : req.body.name,
			price:req.body.price,
			knowledge:req.body.knowledge,
			description:req.body.description,
			type:req.body.type,
			deadLine:req.body.deadLine,
		}
		var model =require("../data/AdminModel");
		model.update(obj, req.body.id,"projects").then(function(data){
			var people  = req.body.people;
			if(people){

				for(let i=0;i<people.length;i++){

					model.projectMiddle({user_id:people[i],proj_id:req.body.id}).then(function(data){
						if(i==people.length-1){
							res.redirect("projects")
						}
					})
				}
			}
			else{
				res.redirect("projects")
			}
			
		})
		.catch(function(err){
			console.log(err)
		})
	}
	projectPage(req,res){
		var projId = req.query.projId;
		
		var model = require("../data/AdminModel.js")
		model.findAll("users").then(function(data){
			var  allPeople = data;
		
		
			 model.find({id : projId},"projects").then(function(data){
				
					model.findProjUsers(data[0].id).then(function(d){
						data[0].projUsers = d;
						for(let i=0;i<allPeople.length;i++){
							for(let j=0;j<data[0].projUsers.length;j++){
								if(allPeople[i].id == data[0].projUsers[j].id){
									allPeople[i].id =false;
								}
							}
						}
						res.render("projectPage",{admin:req.session.admin,data:data[0],allPeople:allPeople})
					})
					.catch(function(err){
						console.log(err)
					})

			})
			 console.log("-______________________-")
			 console.log(allPeople)
		})
		 
		
		
	}
	searchDown(req,res){
		var model = require("../data/UserModel");
		model.findAll("users").then(function(data){
			console.log(data)
			res.send({all:data})
		})
	}
	search(req,res){
		var model =require("../data/AdminModel");
		model.searchPeople(req.body.searchTxt).then(function(data){
			
			res.send({search:data});
		})
	}
	addSingleNewProject(req,res){

		// console.log(req.body.people)
		let newProj = {
			name:req.body.name,
			price:req.body.price,
			knowledge:req.body.knowledge,
			description:req.body.description,
			type:req.body.type,
			deadLine:req.body.deadLine,
			
		}
		
		var model = require("../data/AdminModel.js")
			model.creatProject(newProj).then(function(data){
			var proj_id = data.insertId;
			var user_id = req.body.people;
			for(let i=0;i<user_id.length;i++){

				model.projectMiddle({user_id:user_id[i],proj_id:proj_id}).then(function(data){
					let notif = {
						user1_id:req.session.admin.id,
						user2_id:user_id[i],
						text:`${req.session.admin.name} ${req.session.admin.surname} -Ը Ձեզ կցել է ${req.body.name} պրոեկտը:`,
						proj_id:proj_id,
						status:0,
						}
						model.insert(notif,"notif").then(function(data){
							console.log(data)
						})
						.catch(function(err){
							console.log(err)
						})
					if(i==user_id.length-1){
						res.redirect("projects")	
					}
				})
				.catch(function(err){
					console.log(err)
				})
			}
			
		})
		.catch(function(err){
			console.log(err)
		})
		res.redirect("allUsers");
	}
	addNewProject(req,res){
		var module = require("../data/UserModel.js");
		module.findAll("users").then(function(data){
			console.log(data)
		res.render("addNewProject",{admin:req.session.admin,data:data})
			
		})
	}
	projects(req,res){
		var model = require("../data/AdminModel.js");

		model.findAll("projects").then(function(data){
			
			for(let i=0; i<data.length; i++){
				model.findProjUsers(data[i].id).then(function(d){
					data[i].projUsers = d

					if(i==data.length-1){
						console.log(data)
						res.render("projects",{admin:req.session.admin,data:data})
					}
				})
				.catch(function(err){
					console.log(err)
				})
			}
			// res.render("projects",{admin:req.session.admin,data:data});

		})
		
	}
	addProject(req,res){
		res.render("addProject", {admin:req.session.admin, userId: req.query.userId,err:req.session.err,req:req})
	}
	creatSingleProject(req,res){
	
		let newProj = {
			name:req.body.name,
			price:req.body.price,
			knowledge:req.body.knowledge,
			description:req.body.description,
			type:req.body.type,
			deadLine:req.body.deadLine
		}

		var model = require("../data/AdminModel");
		
		model.creatProject(newProj).then(function(data){
			var proj_id = data.insertId;
			var user_id = req.body.userId;
			model.projectMiddle({user_id:user_id,proj_id:proj_id}).then(function(data){
				let notif = {
					user1_id:req.session.admin.id,
					user2_id:req.body.userId,
					text:`${req.session.admin.name} ${req.session.admin.surname} -Ը Ձեզ կցել է ${req.body.name} պրոեկտը:`,
					proj_id:proj_id,
					status:0,
				}
				model.insert(notif,"notif").then(function(data){
					console.log(data)
				})
				.catch(function(err){
					console.log(err)
				})
				res.redirect("allUsers")
			})
			.catch(function(err){
				console.log(err)
			})
			
		})
		.catch(function(err){
			console.log(err)
		})

		
	}
		userPage(req,res){
			
			var model =require("../data/UserModel");
			model.find({id:req.query.userId}).then(function(data){
			//console.log(data)
			res.render("userPage",{admin:req.session.admin, data:data[0]})
			})
			.catch(function(err){
				console.log(err);
			})
		}
	updateUser(req,res){
		var obj = {
			name : req.body.name,
			surname:req.body.surname,
			age:req.body.age,
			phone:req.body.phone,
			level:req.body.level
		}
		var model =require("../data/UserModel");
		model.update(obj, req.body.id).then(function(data){
			res.redirect("allUsers")
		})
		.catch(function(err){
			console.log(err)
		})
	}
	editUser(req,res){
		
		// userId = req.query.userId;
		var model =require("../data/UserModel");
		model.find({id:req.query.userId}).then(function(data){
			//console.log(data)
			res.render("editUser",{admin:req.session.admin, data:data[0]})
		})
		.catch(function(err){
			console.log(err);
		})

		
	}
	home(req,res){
		res.render("home")
	}
	deleteUser(req,res){
		var model =require("../data/UserModel");
		model.deleteUser(req.body.userId).then(function(data){
			res.send({});
		})
	}

	adminPage(req,res){
		if(req.session.admin){
		res.render('adminPage',{admin:req.session.admin})
			
		}
		else{
			req.session.err = "Duq chuneq hasaneliutyun es ejin"
			res.redirect('login')
		}
	}
	addNewUser(req,res){
		if(req.session.admin){
			res.render('addNewUser',{nkar:0,admin:req.session.admin,err: req.session.err, req:req})
		}
		else{
			req.session.err = "Duq chuneq hasaneliutyun es ejin"
			res.redirect('login')
		}
	}
	printAllUsers(req,res){
		var model = require("../data/UserModel");
		model.findAll().then(function(data){
			if(req.session.admin){

					res.render("allUsers", {admin: req.session.admin, data:data})
			}
			else{
				req.session.err = "Duq chuneq hasaneliutyun es ejin"
				res.redirect('login')
			}
		})
	}
	ByNewUser(req,res){
		
			var model = require("../data/UserModel")
	
		//validacia

		for(var item in req.body){
			if(req.body[item].length == 0){
				req.session.user=req.body
				req.session.err = `Values is absent`
				res.render("addNewUser",{user:req.session.user, err: req.session.err, req:req})
			}
		}
		if(!req.session.err){
			//username
			var name = req.body.name

			model.find(req.body).then((data)=>{
				console.log("mta")
				console.log(data)
				if(data.length!=0){
					req.session.err = "Username is repeated, Change IT"
				}
			})

			//age
			var age = req.body.age
			if(isNaN(Number(age))){
				req.session.err = "Age isn't number"
				res.redirect("addNewUser")
			}



			if(name.length<4){
				req.session.err = "Username is short"
			} else if(isNaN(name[0])== false){
				req.session.err = "Username does not comply with the rules"
			}
			name = name.replace(/[a-z]/ig,"")
			name = name.split("")
			
			if(name.length!=0){
				req.session.err = "Username does not comply with the rules"
			}

			//password

			var password = req.body.password
			console.log(password)
			if(password.length<4){
				req.session.err = "Password is short"
			}
			password = password.replace(/[0-9]|[a-z]/ig,"")
			if(password.length!=0){
				req.session.err = "Password does not comply with the rules"
			}


		}

			var img = req.files.uploadImg;
			var imgName;
			if(img){
			 imgName = Date.now() + img.name;
				img.mv("./public/images/userImages/"+imgName,function(err){
					console.log(err);
				})
			}
			else {
				imgName = "default.jpg"
			}
			let newUser = {

			name: req.body.name,
			surname: req.body.surname,
			age: req.body.age,
			 phone:req.body.phone,
			level:req.body.level,
			login:req.body.email,
			admin: 0,
			password:passwordHash.generate(req.body.password),
			imgsrc:imgName,


		}
		
		console.log(newUser)
		if(req.session.err){
			res.redirect("addNewUser")
		}else{
			model.insert(newUser).then(function(data){
				res.redirect("allUsers")
			})
		}
	}


	
}

module.exports = Admin;