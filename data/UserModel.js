BaseModel = require("./BaseModel.js")


class UserModel extends BaseModel{


	constructor(){

		super();
		this.table = "users";
	}
	updateMessage(user1_id,user2_id){
		var hraman = `update messages set status = 1 where user1_id =${user1_id} and user2_id = ${user2_id}  ` 
		

		// this.db.query(hraman,function(err,data){
		// 	if(err){
		// 		return err;
		// 	}
		// 	console.log(data)
		// })
		return new Promise((resolve,reject) => {
			this.db.query(hraman,function(err,data){
				if(err){
					reject(err);
				}
				resolve(data)
			})
		})
	}	
	deleteUser(id,table=this.table){
		var order = `delete from ${table} where id = ${id}`;
		return new Promise((resolve,reject) => {
			this.db.query(order,function(err,data){
				if(err){
					reject(err);
				}
				resolve(data)
			})
		})
	}

	printUser(id){
		return find({id:id});
	}

	findMyMessage(id){
		var order = `select *, count(id) from messages where  user2_id = ${id} and status =0 GROUP BY user1_id`;
		return new Promise((resolve,reject) => {
			this.db.query(order,function(err,data){
				if(err){
					reject(err);
				}
				resolve(data)
			})
		})

	}
	findMyNotif(id){
		var order = `select * from notif where user2_id = ${id} and status = 0 `;
		return new Promise((resolve,reject) => {
			this.db.query(order,function(err,data){
				if(err){
					reject(err);
				}
				resolve(data)
			})
		})
	}
	findMessage(r){

		var order = `select * from messages where (user1_id = ${r.user1_id} and user2_id =${r.user2_id})
		or (user2_id =${r.user1_id} and user1_id = ${r.user2_id})`
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



module.exports = new UserModel();