//---- Registration Form Stuff ----
// getting Registration Form id
var registrationForm = document.getElementById('registrationForm');

//registration form onsubmit button function
registrationForm.onsubmit = function(event) {
  
  //getting form fields value
  var regName = document.getElementById('regName').value;
  var regEmail = document.getElementById('regEmail').value;
  var regPhone = document.getElementById('regPhone').value;
  var regPassword = document.getElementById('regPassword').value;
  var regConfirmPassword = document.getElementById('regConfirmPassword').value;
  //getting error labels id
  var regNameError =document.getElementById('regNameError');
  var regEmailError =document.getElementById('regEmailError');
  var regPhoneError =document.getElementById('regPhoneError');
  var regPasswordError =document.getElementById('regPasswordError');
  var regConfirmPasswordError =document.getElementById('regConfirmPasswordError');

  event.preventDefault();

  if(regName == ""){
    document.getElementById('regName').style.border = "1px solid #EB3E32";
    regNameError.style.display= 'block';
    document.getElementById('regName').focus();
    return false;
  }
  if(regEmail == ""){
    document.getElementById('regEmail').style.border = "1px solid #EB3E32";
    regEmailError.style.display= 'block';
    document.getElementById('regEmail').focus();
    return false;
  }
  if(regPhone == ""){
    document.getElementById('regPhone').style.border = "1px solid #EB3E32";
    regPhoneError.style.display= 'block';
    document.getElementById('regPhone').focus();
    return false;
  }
  if(regPassword == ""){
    document.getElementById('regPassword').style.border = "1px solid #EB3E32";
    regPasswordError.style.display = 'block';
    document.getElementById('regPassword').focus();
    // alert('nodsds');
    return false;
  }
  if(regConfirmPassword == ""){
    document.getElementById('regConfirmPassword').style.border = "1px solid #EB3E32";
    regConfirmPasswordError.style.display = 'block';
    document.getElementById('regConfirmPassword').focus();
    // alert('no');
    return false;
  } 
  if(regPassword !== regConfirmPassword){
    document.getElementById('regsamePassword').style.display = 'block';
    // alert(regPassword + 'diff pass' + regConfirmPassword);
  }
  else {
    var infoSignup ={
      regName : regName,
      regEmail : regEmail,
      regPhone : regPhone,
      regPassword : regPassword,
      regConfirmPassword : regConfirmPassword
    };
    
    var xhttpSignup = new XMLHttpRequest();
    xhttpSignup.open("POST" , "/signup/register" , true);
    xhttpSignup.onreadystatechange = function(){
      if(this.readyState == 4 && this.status == 200){
         //once you send request to the server, in response you'll get JSON object 
        //JSON object can contain error or message
        //only access the first array element (as there are no other)
        var response1 = JSON.parse(xhttpSignup.responseText);
        //if the json has error inside it
        if(typeof response1.error != "undefined"){
          //it will print the error
          document.getElementById("serverSideErrorSignup").innerHTML = response1.error[0];
        }
        else if(typeof response1.message != "undefined"){
          //if login has been successful
          //in response you'll receive json message array
          //only access the first array element (as there are no other)
          if(response1.message[0] === "success"){
            //it will open the base url on success
            window.location.href = "/";
          }
        }
      }
    };
    
    xhttpSignup.setRequestHeader("Content-type" , "application/json");
    xhttpSignup.send(JSON.stringify(infoSignup));
    //alert(regEmail)
    // registrationForm.reset();
    return true;
  }
  
}

//Resetting registration form fields
function nameFieldReset() {
  document.getElementById('regName').style.border = "1px solid #e5e5e5";
  regNameError.style.display= 'none';
}

function emailFieldReset() {
  document.getElementById('regEmail').style.border = "1px solid #e5e5e5";
  regEmailError.style.display= 'none';
}

function phoneFieldReset() {
  document.getElementById('regPhone').style.border = "1px solid #e5e5e5";
  regPhoneError.style.display= 'none';
}

function passwordFieldReset() {
  document.getElementById('regPassword').style.border = "1px solid #e5e5e5";
  regPasswordError.style.display= 'none';
  document.getElementById('regsamePassword').style.display = 'none';
}

function confirmPasswordFieldReset() {
  document.getElementById('regConfirmPassword').style.border = "1px solid #e5e5e5";
  regConfirmPasswordError.style.display= 'none';
  document.getElementById('regsamePassword').style.display = 'none';
}
//---- Registration Form Stuff end ----


//---- Login Form Stuff ----
// getting Login Form id
var loginForm = document.getElementById('loginForm');

//Login form onsubmit button function
loginForm.onsubmit = function(event) {
  
  //getting form fields value
  var loginEmail = document.getElementById('loginEmail').value;
  var loginPassword = document.getElementById('loginPassword').value;
  
  //getting error labels id
  var loginEmailError =document.getElementById('loginEmailError');
  var loginPasswordError =document.getElementById('loginPasswordError');

  event.preventDefault();

  if(loginEmail == ""){
    document.getElementById('loginEmail').style.border = "1px solid #EB3E32";
    loginEmailError.style.display= 'block';
    document.getElementById('loginEmail').focus();
    return false;
  }
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(!loginEmail.match(mailformat)){
    document.getElementById('loginEmail').style.border = "1px solid #EB3E32";
    document.getElementById('loginEmailFormatError').style.display='block';
    document.getElementById('loginEmail').focus();
    return false;
    }
  
  if(loginPassword == ""){
    document.getElementById('loginPassword').style.border = "1px solid #EB3E32";
    loginPasswordError.style.display = 'block';
    document.getElementById('loginPassword').focus();
    // alert('nodsds');
    return false;
  }
  else {
    var infoLogin ={
      loginEmail : loginEmail,
      loginPassword : loginPassword
    };
    
    var xhttpLogin = new XMLHttpRequest();
    xhttpLogin.open("POST" , "/login" , true);
    xhttpLogin.onreadystatechange = function(){
      if(this.readyState == 4 && this.status == 200){
        //once you send request to the server, in response you'll get JSON object 
        //JSON object can contain error or message
        //only access the first array element (as there are no other)
        var response = JSON.parse(xhttpLogin.responseText);
        //if the json has error inside it
        if(typeof response.error != "undefined"){
          //it will print the error
          document.getElementById("serverSideError").innerHTML = response.error[0];
        }
        else if(typeof response.message != "undefined"){
          //if login has been successful
          //in response you'll receive json message array
          //only access the first array element (as there are no other)
          if(response.message[0] === "success"){
            //it will open the base url on success
            window.location.href = "/";
          }
        }
      }
    };
    xhttpLogin.setRequestHeader("Content-type" , "application/json");
    xhttpLogin.send(JSON.stringify(infoLogin));
    

  // loginEmail.toLowerCase();
    // alert(loginEmail);
    // loginForm.reset();
    return true;
  }

}

//Resetting form fields
function loginEmailFieldReset() {
  document.getElementById('loginEmail').style.border = "1px solid #e5e5e5";
    document.getElementById('loginEmailFormatError').style.display='none';
    loginEmailError.style.display= 'none';
}

function loginPasswordFieldReset() {
  document.getElementById('loginPassword').style.border = "1px solid #e5e5e5";
  loginPasswordError.style.display= 'none';
}
