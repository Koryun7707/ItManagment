const routes = [
  
  {key: "/", controller: "main", method: "login", type: "GET"},
  {key: "/login", controller: "main", method: "login", type: "GET"},
  {key: "/signup", controller: "user", method: "signup", type: "GET"},
  {key: "/adminPage", controller: "admin", method: "adminPage", type: "GET"},
  {key: "/addNewUser",controller:"admin",   method:"addNewUser",    type:"GET"},
  {key: "/allUsers",controller:"admin",   method:"printAllUsers",    type:"GET"},
  {key: "/home",controller:"main",   method:"home",    type:"GET"},
  {key: "/editUser",controller:"admin",   method:"editUser",    type:"GET"},
  {key: "/logOut",controller:"main",   method:"logOut",    type:"GET"},
  {key: "/userPage",controller:"admin",   method:"userPage",    type:"GET"},
  {key: "/addProject",controller:"admin",   method:"addProject",    type:"GET"},
  {key: "/projects",controller:"admin",   method:"projects",    type:"GET"},
  {key: "/addNewProject",controller:"admin",   method:"addNewProject",    type:"GET"},
  {key: "/projectPage",controller:"admin",   method:"projectPage",    type:"GET"},
  {key: "/userHome",controller:"user",   method:"userHome",    type:"GET"},
  {key: "/myProjects",controller:"user",   method:"myProjects",    type:"GET"},
  {key: "/allUsersUser",controller:"user",   method:"allUsersUser",    type:"GET"},



  {key: "/addNewUser", controller: "user", method: "addNewUser", type: "POST"},
  {key: "/loginUser", controller: "main", method: "loginUser", type: "POST"},
  {key: "/ByNewUser", controller: "admin", method: "ByNewUser", type: "POST"},
  {key: "/deleteUser", controller: "admin", method: "deleteUser", type: "POST"},
  {key: "/updateUser", controller: "admin", method: "updateUser", type: "POST"},
  {key: "/creatSingleProject", controller: "admin", method: "creatSingleProject", type: "POST"},
  {key: "/addSingleNewProject", controller: "admin", method: "addSingleNewProject", type: "POST"},
  {key: "/search", controller: "admin", method: "search", type: "POST"},
  {key: "/searchDown", controller: "admin", method: "searchDown", type: "POST"},
  {key: "/updateProj", controller: "admin", method: "updateProj", type: "POST"},
  {key: "/deleteProjUser", controller: "admin", method: "deleteProjUser", type: "POST"},
  {key: "/notif", controller: "user", method: "notif", type: "POST"},
  {key: "/notifStatus", controller: "user", method: "notifStatus", type: "POST"},
  {key: "/deleteProject", controller: "admin", method: "deleteProject", type: "POST"},
  {key: "/chat", controller: "admin", method: "chat", type: "POST"},
  {key: "/message", controller: "user", method: "message", type: "POST"},
  {key: "/messagePeople", controller: "user", method: "messagePeople", type: "POST"},
 
  {key: "/statusMessage", controller: "user", method: "statusMessage", type: "POST"},
  {key: "/notifAdmin", controller: "user", method: "notifAdmin", type: "POST"},
  {key: "/reyting", controller: "user", method: "reyting", type: "POST"},


  

]


module.exports = routes;