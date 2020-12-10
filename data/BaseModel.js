var mysql = require('mysql');

class BaseModel{


	constructor(){

		this.db = mysql.createConnection({
				  host     : 'localhost',
				  user     : 'root',
				  password : '',
				  database : 'template',
				});

		this.table = null
	}



	insert(obj,table=this.table){

		let keys = Object.keys(obj);

		let values = Object.values(obj);

		keys = keys.join(",")
		values = values.join("','")

		let hraman = `INSERT into ${table} (${keys}) values ('${values}')`

		return new Promise((resolve,reject) => {
			this.db.query(hraman,function(err,data){
				if(err){
					reject(err);
				}
				resolve(data)
			})
		})
	}



	findAll(table=this.table){

		let hraman = "SELECT * from " + table;

		return new Promise((resolve,reject) => {
			this.db.query(hraman,function(err,data){
				if(err){
					reject(err);
				}
				resolve(data)
			})
		})

	}



	find(obj,table=this.table){
		
		let hraman = `SELECT * from ${table} where `;

		for(let key in obj){
		  hraman+= key + "='"+obj[key] + "' and ";
		}
		hraman = hraman.substring(0, hraman.length-5);


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
	
	update(obj,id,table=this.table){

		let hraman = `update ${table} set `;

		for(let key in obj){
		  hraman+= key + "='"+obj[key] + "', ";
		}

		hraman = hraman.substring(0,hraman.length-2);
		hraman+=` where id =${id}`;

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
}


module.exports = BaseModel;