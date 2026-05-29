let login=document.querySelector(".login")
let Register=document.querySelector(".Register")
let img=document.querySelector(".img")
function split1(){
  login.style.opacity="0" 
  login.style.zIndex="1"
  Register.style.zIndex="6"
  Register.style.opacity="1"
}
function split2(){
  login.style.opacity="1" 
  login.style.zIndex="6"
  Register.style.zIndex="1"
  Register.style.opacity="0"
}
