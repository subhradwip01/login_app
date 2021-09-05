let name = document.getElementById("name");
let email = document.getElementById("email");
let password = document.getElementById("password");
let cpassword = document.getElementById("cpassword");

document.getElementById("form").addEventListener("submit",function (e) {
  document.getElementById("error-msg").innerHTML = "";
  e.preventDefault();
  if(validator()){
    signup();
    return;
  }
 
})

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    document.getElementById("error-msg").innerHTML="";
    console.log("success");
    
    
  }
});

function validator() {
  document.getElementById("sbtn").innerHTML =
    '<i class="fa-config fas fa-spinner fa-spin"></i>';

  let uname = name.value.trim();
  let uemail = email.value.trim();
  let upassword = password.value.trim();
  let ucpassword = cpassword.value.trim();
  let namecheck=false;
  let emailcheck=false;
  let pcheck=false;
  let cpcheck=false;
  //  name checker
   if(uname==""){
     showError(name,"Name Cannonot Be Blank");
   }else if(/[^a-zA-Z0-9\-\s/]/.test(uname)){
       showError(name,"Name dose not contains special charecter")
   }else if(uname.length<3){
     showError(name, "Name dose not less than 3");
   }else{
     showSuccess(name,"Name Accpeted")
     namecheck=true;
   }

  //  email checker
   if (uemail == "") {
     showError(email, "Email Cannonot Be Blank");
   } else if (!isValidEmail(uemail)) {
     showError(email,"Provide a valide email")
   }else{
     showSuccess(email, "Name Accpeted");
     emailcheck=true;
   }
   
  //  password validation
   if (upassword == "") {
     showError(password, "Password Cannonot Be Blank");
   } else if (upassword.length < 6) {
     showError(password, "Password Cannot be less than 6");
   } else if (upassword == uname) {
     showError(password, "You cannot use your name as password");
   } else if (upassword.toLowerCase() == "password") {
     showError(password, "You cannot use '" + upassword + "' as password");
   } else {
     showSuccess(password, "Name Accpeted");
     pcheck = true;
   }

  //  confirm password checker
  if(ucpassword==""){
    showError(cpassword, "Provide a password");
  }else if (ucpassword != upassword) {
     showError(cpassword, "Password is not matching");
   } else {
     showSuccess(cpassword, "Name Accpeted");
     cpcheck = true;
   }

    if(namecheck==true&&emailcheck==true&&pcheck==true&&cpcheck==true){
      return true;
    }
    return false;

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


// Showing Error message
function showError(id,message) {
  document.getElementById("sbtn").innerHTML =
    '<button type="submit" class="btn" id="login-btn">Log In</button>';
  var div="#"+id.getAttribute("id")+"-info";
  document.querySelector(div + " .checker").style.visibility = "hidden";
  document.querySelector(div+" small").style.visibility="visible";
  document.querySelector(div+" small").innerHTML="Error! "+message;
  document.querySelector(div+" .wrong").style.visibility="visible";
  document.querySelector(div+" .wrong").style.color="red";
  

  id.classList.add("error");

}

function showSuccess(id,message){
  var div = "#" + id.getAttribute("id") + "-info";
  document.querySelector(div + " small").style.visibility = "hidden";
  document.querySelector(div + " .wrong").style.visibility = "hidden";
  document.querySelector(div + " .checker").style.visibility = "visible";
  document.querySelector(div + " .checker").style.color = "green";
  if(id.classList.contains("error")){
    id.classList.remove("error");
  }
  id.classList.add("success");
}

function signup() {
    const name=document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        firebase
          .database()
          .ref()
          .child("users/" + userCredential.user.uid)
          .set(
            {
              username: name,
              email: email,
            },
            (error) => {
              if (error) {
                console.log(error.message);
              } else {
                location.replace("welcome.html");
              }
            }
          );
        })
        .catch((error) => {
        document.getElementById("sbtn").innerHTML =
          '<button type="submit" class="btn" id="login-btn">Log In</button>';
        if (
          error.message ==
          "The email address is already in use by another account."
        ) {
          showError(document.getElementById("email"), "Provide Another Email");
        }

        document.getElementById("error-msg").innerHTML = error.message;
      });
        return;
  
}