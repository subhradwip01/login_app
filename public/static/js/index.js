document.getElementById("form").addEventListener("submit",function (e) {
 
  e.preventDefault();
 
})


firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    location.replace("welcome.html");
  }
});

function login() {
  document.getElementById("error-msg").innerHTML = "";
  document.getElementById("lbtn").innerHTML ='<i class="fa-config fas fa-spinner fa-spin"></i>';
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  if(email==""||password==""){
    document.getElementById("lbtn").innerHTML =
      '<button type="submit" class="btn" id="login-btn">Log In</button>';
      document.getElementById("error-msg").innerHTML = "All fields need to provide"
      return;
  }
  
  if(!isValidEmail(email)){
    document.getElementById("lbtn").innerHTML = 
      '<button type="submit" class="btn" id="login-btn">Log In</button>'
    ;
    document.getElementById("error-msg").innerHTML =
      "Provide a Valid Email Id";
    return;
  }
  

  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .catch((error) => {
      document.getElementById("lbtn").innerHTML =
        '<button type="submit" class="btn" id="login-btn">Log In</button>';
      document.getElementById("error-msg").innerHTML = error.message;
    });
    return;
}

 // email address validtion
  function isValidEmail(uemail) {
    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if(uemail.match(validRegex)){
      return true
    }
    else{
      return false;
    }
  }