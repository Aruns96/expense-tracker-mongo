let form = document.getElementById("formLogin");
form.addEventListener("submit", saveToLocal);


 function saveToLocal(event){
    event.preventDefault();
   
    const email = event.target.email.value;
    const password = event.target.password.value;
   

   const obj = {
   
    email,
    password
   }
   
    
    axios.post("http://localhost:3000/user/login" ,obj)
    .then(res =>{
        console.log(res);
        alert(res.data.message);
        localStorage.setItem("token",res.data.token);
        window.location.href = "../expensetracker-frontend/expense.html";

    })
    .catch(e => {
        console.log(e)

        document.body.innerHTML=document.body.innerHTML + `<h3>${e}</h3>`
    })
    
    event.target.email.value="";
    event.target.password.value="";


   }
  const fgtbtn = document.getElementById("fgtbtn");
  fgtbtn.onclick = function (){
    window.location.href = "../expensetracker-frontend/forget.html";
  }
  
