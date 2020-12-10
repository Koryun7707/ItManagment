var passwordHash = require('password-hash');
class Main{



	home(req, res){
		res.render("home",{admin:req.session.admin})
	}


	login(req,res){
		res.render("login",{err: req.session.err,req:req});
	}
	
	logOut(req,res){

		
		req.session.destroy();
		res.redirect("login");
	}
	loginUser(req,res){
		console.log(req.body)
		var password = req.body.password;
		var model = require("../data/UserModel");

		model.find({login: req.body.login}).then(function(data){
			console.log(data)
			if(data.length == 0){
				req.session.err = "error is login ";
				res.redirect('login')
			}
			else if(passwordHash.verify(password,data[0].password)){

				if(data[0].admin == 1){
					req.session.admin = data[0];
					res.redirect('home')
				}
				else {
					req.session.user = data[0];
					res.redirect('userHome')
				}
			}
			else{
				req.session.err = "password is false";
				res.redirect('login')
			}

		})
		.catch(function(err){
			console.log(err)
		})
	}
	
}

module.exports = Main;