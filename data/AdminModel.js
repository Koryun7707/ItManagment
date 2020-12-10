BaseModel = require("./BaseModel.js")


class AdminModel extends BaseModel{


	constructor(){

		super();
		this.table = "users";
	}
	
	deleteUserFromProject(obj){
		var proj_id = obj.projId;
		var user_id = obj.userId;

		var order = `delete from user_proj where user_id = ${user_id} and proj_id = ${proj_id}`;
		return new Promise((resolve,reject) => {
			this.db.query(order,function(err,data){
				if(err){
					reject(err);
				}
				resolve(data)
			})
		})
	}
	searchPeople(txt){
		if(txt==""){
			txt = " "
		}
		var order = `select * from users where surname  like '${txt}%' or name like '${txt}%'`;
		return new Promise((resolve,reject) => {
			this.db.query(order,function(err,data){
				if(err){
					reject(err);
				}
				resolve(data)
			})
		})
	}
	creatProject(obj){
			let keys = Object.keys(obj);

		let values = Object.values(obj);

		keys = keys.join(",")
		values = values.join("','")

		let hraman = `INSERT into projects (${keys}) values ('${values}')`

		return new Promise((resolve,reject) => {
			this.db.query(hraman,function(err,data){
				if(err){
					reject(err);
				}
				resolve(data)
			})
		})
	}
	
	projectMiddle(obj){


		let keys = Object.keys(obj);

		let values = Object.values(obj);

		keys = keys.join(",")
		values = values.join("','")

		let hraman = `INSERT into user_proj  (${keys}) values ('${values}')`

		return new Promise((resolve,reject) => {
			this.db.query(hraman,function(err,data){
				if(err){
					reject(err);
				}
				resolve(data)
			})
		})
	

	}


	findProjUsers(projid){

		let order = `SELECT name, surname, id,imgsrc, level from users where id in (Select user_id from user_proj where proj_id = ${projid})`

		return new Promise((resolve,reject) => {
			this.db.query(order,function(err,data){
				if(err){
					reject(err);
				}
				resolve(data)
			})
		})
	}
	
	
	
	
	

}



module.exports = new AdminModel();
