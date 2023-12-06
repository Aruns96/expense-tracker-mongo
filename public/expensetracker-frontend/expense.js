
let form = document.getElementById("form2");
form.addEventListener("submit", saveToLocal);

let download1 = document.getElementById("download");
download1.addEventListener("click", download);

const page = 1;
    const pagination = document.getElementById("pagination");
    let pagesize
    function pagelimit() {
        pagesize = document.getElementById("pagesize").value;
        if(localStorage.getItem("pagesize")){
            pagesize = localStorage.getItem("pagesize")
            document.getElementById("pagesize").value=pagesize
        }else{
        localStorage.setItem("pagesize", pagesize);
        } 
}
    pagelimit();
    document.getElementById("pagesize").addEventListener("change", () => {
  pagesize = document.getElementById("pagesize").value;
  localStorage.setItem("pagesize", pagesize);
  localStorage.getItem('pagesize')
  getExpense(page);
});


    function saveToLocal(event){
    event.preventDefault();
    const amount = event.target.amount.value;
    const descripiton= event.target.descripiton.value;
    const category = event.target.category.value;
   

   const obj = {
    amount,
    descripiton,
    category
   }
  
   const token = localStorage.getItem("token");
    axios.post("http://localhost:3000/expense/addExpense" ,obj,{headers:{"Authorization":token}})
    .then(res =>{
        console.log(res);
        showItems(res.data.newExpense)
        

    })
    .catch(e => {
        console.log(e)

        document.body.innerHTML=document.body.innerHTML + `<h3>${e}</h3>`
    })
    event.target.amount.value="";
    event.target.descripiton.value="";
    event.target.category.value="";


   }
  function showItems(expense){
    const parentNode = document.getElementById("listItems");
    const child = document.createElement("li");
    child.id = expense._id;
    child.innerText = expense.amount + "-" + expense.descripiton + "-" + expense.category;
    const del = document.createElement("button");
    del.innerText = "delete";
    del.onclick = ()=>deleteExpense(expense._id);

    child.appendChild(del);
    parentNode.appendChild(child);



  }
  function deleteExpense(id){
    const token = localStorage.getItem("token");
    axios.delete(`http://localhost:3000/expense/delete-expense/${id}`,{headers:{"Authorization":token}}).then(res=>{
        
        removeExpense(id);
     }).catch(e=>{console.log(e)
    showError(e)});
  }
function showError(error){
    document.body.innerHTML += `<div>${error}</div>`
}
  function removeExpense(id){
     const parentNode = document.getElementById("listItems");
     const nodeToDelete = document.getElementById(id);
     if(nodeToDelete){
         parentNode.removeChild(nodeToDelete);
     }
 
    }

    document.addEventListener("DOMContentLoaded",()=>{
        
        const token = localStorage.getItem("token");
        const decoded = parseJwt(token);
        console.log(decoded)
        if(decoded.ispremiumuser){
            premiumUser();
            showLeaderBoard();
        }
         axios.get(`http://localhost:3000/expense/get-expense?page=${page}&limit=${pagesize}`,{headers:{"Authorization":token}}).then(res =>{
            for(let i=0; i< res.data.allExpense.length ;i++){
             showItems(res.data.allExpense[i]);
            }
            showPagination(res.data.pageData)
         })
         .catch(e=>console.log(e))
     })
     function deleterow() {
        document.getElementById("listItems").innerHTML = "";
     }
     function showPagination({currentPage,hasNextPage,nextPage,hasPreviousPage,previousPage,lastPage}){
              pagination.innerHTML = '';
              if(hasPreviousPage){
                const btn2 = document.createElement("button");
                btn2.innerHTML = previousPage;
                btn2.addEventListener("click",()=>{
                    deleterow(),
                    getExpense(previousPage)
                    
                }
                )
                pagination.appendChild(btn2)
              }
              const btn1 = document.createElement("button");
                btn1.innerHTML = `<h3>${currentPage}</h3>`;
                btn1.addEventListener("click",()=>{
                    deleterow(),
                    getExpense(currentPage)
                })
                pagination.appendChild(btn1)
                if(hasNextPage){
                const btn3 = document.createElement("button");
                btn3.innerHTML = nextPage;
                btn3.addEventListener("click",()=>{
                    deleterow(),
                    getExpense(nextPage)
                   
                })
                pagination.appendChild(btn3)
              }
     }
     function getExpense(page){
        const token = localStorage.getItem("token");
        axios.get(`http://localhost:3000/expense/get-expense?page=${page}&limit=${pagesize}`,{headers:{"Authorization":token}}).then(res =>{
            for(let i=0; i< res.data.allExpense.length ;i++){
             showItems(res.data.allExpense[i]);
            }
            showPagination(res.data.pageData)
         })
         .catch(e=>console.log(e))
     }




    function premiumUser(){
        document.getElementById("btnrazrpy").style.visibility = "hidden";
        const p = document.getElementById("premiumUser");
        p.innerHTML = "you are now a premium user";
        document.getElementById("download").style.visibility = "visible";

    }
    function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}
     document.getElementById("btnrazrpy").onclick = async function(e){
        
        const token = localStorage.getItem("token");
        
         
        const response = await axios.get("http://localhost:3000/purchase/premium", {
    headers: { "Authorization": token },
  });
        
        console.log(response);
        var options = {
            "key":response.data.key_id,
            "order_id":response.data.order.id,
            "handler": async function(response){


              const res =   await axios.post(
        "http://localhost:3000/purchase/updatetransaction",
        {
          order_id: options.order_id,
          payment_id: response.razorpay_payment_id,
        },
        { headers: { "Authorization": token } }
      );

               

                alert("You are a premium user now");
                premiumUser();
                
                localStorage.setItem("token",res.data.token);
                showLeaderBoard();
            }

        };  
       
        const rzp1 = new Razorpay(options);
        rzp1.open();
        e.preventDefault();
        rzp1.on("payment.failed",function(response){
            console.log(response);
            alert("Something went wrong");
        })
       

     }

     function showLeaderBoard(){
        const input = document.createElement("input");
        input.type = "button";
        input.value = "show leaderboard";
        const div = document.getElementById("premiumUser");
         div.appendChild(input);
        input.onclick = async()=>{
            const token = localStorage.getItem("token");
            const userLeadBoardArray = await axios.get("http://localhost:3000/premium/showleaderboard", {
    headers: { "Authorization": token },
  });
  console.log(userLeadBoardArray)
      var leaderboardElement = document.getElementById("leaderboard");
      leaderboardElement.innerHTML += "<h1> Leader Board </h1>";

      userLeadBoardArray.data.forEach(userDetail => {
        
        leaderboardElement.innerHTML += `<li>Name:${userDetail.name}--Total Expense:${userDetail.totalexpense}</li>`
      });

        }

     }

     function download(){
        const token = localStorage.getItem("token");
    axios.get('http://localhost:3000/premium/download', {headers: { "Authorization": token }})
    .then((response) => {
        if(response.status === 200){
           
            var a = document.createElement("a");
            a.href = response.data.fileURL;
            a.download = 'myexpense.csv';
            a.click();
            //console.log(response.data.files)
            var pNode = document.getElementById("files");
            //pNode.innerHTML = ""
            response.data.files.forEach(file=>{
                pNode.innerHTML+=`<li>${file.filename}</li>`
            })
            


        } else {
            throw new Error(response.data.message)
        }

    })
    .catch((err) => {
        showError(err)
    });
}
