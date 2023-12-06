let form = document.getElementById("formForget");
form.addEventListener("submit", Submit);




 function Submit(event){
    event.preventDefault();
    const email = event.target.email.value;


    const obj = {

email,

}


 axios.post("http://localhost:3000/password/forgotpassword" ,obj)
.then(res =>{
if(res.status === 200){
        document.body.innerHTML += '<div style="color:red;">Mail Successfuly sent <div>'
    } else {
        throw new Error('Something went wrong!!!')
    }
}).catch(err => {
    document.body.innerHTML += `<div style="color:red;">${err} <div>`;
})



 }