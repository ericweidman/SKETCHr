
var canvasApp ={
urls: {
  createUser: "/create-user"
}

};

addUser: function(userName){
  $.ajax({
    url: "/create-user",
    method: "POST",
    data: {user:userName},
    success: function(userName){
      console.log('user added!'+userName);
    },
    error: function(error){
      console.log("Add User", error);
    }
  });
}
// getUsernameFromDom: function getUsernameFromDom() {
//   var username = $('input[name="newName"]').val();
//
// },
$('#userForm').on('submit', function(event){
  event.preventDefault();
  var addName= "";
  addName = $('input[name="newName"],[password="newPassword"]').val();
  canvasApp.addUser(userName);
})
