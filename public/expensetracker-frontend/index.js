
let form = document.getElementById("formSign");
form.addEventListener("submit", saveToLocal);


 function saveToLocal(event){
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
   

   const obj = {
    name,
    email,
    password
   }
   
    
    axios.post("http://localhost:3000/user/sign-up" ,obj)
    .then(res =>{
        window.location.href = "../expensetracker-frontend/login.html";
        console.log(res);
        

    })
    .catch(e => {
        console.log(e)

        document.body.innerHTML=document.body.innerHTML + "<h3>Error</h3>"
    })
    event.target.name.value="";
    event.target.email.value="";
    event.target.password.value="";


   }
