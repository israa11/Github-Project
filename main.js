
const APIURL = "https://api.github.com/users/";

const cardUser = document.querySelector(".cardUser")
const formL = document.querySelector("form")
const inputSearch = document.querySelector(".search")
const cardRepos = document.querySelector(".cardRepos")
const groupRepos = document.querySelector(".groupRepos")
const closebtn = document.querySelector(".btn-close")

getUserInfo("israa11")


async function getUserInfo(User)  {

await fetch(APIURL + User)
.then(response =>  response.json())
.then(reposData =>{
 // console.log(reposData)
  showUserInfo(reposData)
  getAllRepos(User)
  
})
.catch(error => {

  console.error("Error when calling data", error);
});


}



function showUserInfo(data){
cardUser.innerHTML = `<div class="card bg-primary-subtle  text-start p-5 " style="max-width: 700px;">
  <div class="row g-0">
    <div class="col-md-4 ">
     <img src="${data.avatar_url }" class="img-fluid rounded-circle  border border-5 " alt=""> 
    </div>
    <div class="col-md-8 ps-3">
      <div class="card-body ">
        <h5 class="card-title pb-3 fw-bold">${data.name}</h5>
        <p class="card-text pb-3">${data.bio}</p>
        <ul class=" d-flex flex-nowrap  ps-0 " style="list-style: none;">
          <li class="pe-3"><span>${data.followers} </span>  Followers</li>
          <li class="pe-3"><span>${data.following} </span>  Following</li>
          <li class="pe-3"><span>${data.public_repos} </span>  Repos</li>
        </ul>
        <a href="#" class="Allrepos mt-3 btn btn-primary ${data.public_repos >= 1 ? "visible" : "invisible" }">Show All Repos</a>
      </div>
    </div>
  </div>
</div>`


}


async function getAllRepos(User){

const btnRepos = document.querySelector(".Allrepos")

const repos = await fetch(APIURL + User + "/repos");
const reposData = await repos.json()




btnRepos.addEventListener("click", ()=>{

showAllrepos(reposData)

})

}

function showAllrepos(reposData){
cardRepos.classList.remove("invisible");
groupRepos.innerHTML = ""
reposData.forEach(repo=>{
  const a = document.createElement("a");
  a.classList = "btn btn-primary btn-sm"
  a.href = repo.html_url;
  a.target = "_blank";
  a.innerText = repo.name;
  
groupRepos.appendChild(a)
})


  
}

closebtn.addEventListener("click", ()=>{
  cardRepos.classList.add("invisible");
})

formL.addEventListener("submit", (e)=>{
 e.preventDefault()
if(inputSearch.value){
  
  getUserInfo(inputSearch.value)
  inputSearch.value = ""
}
})