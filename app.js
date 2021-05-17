// Elementleri Secme
const githubFormm = document.getElementById("github-form");
const nameInput = document.getElementById("githubname");
const clearLastUsers = document.getElementById("clear-last-users");
const lastUsers = document.getElementById("last-users");
const github = new Github();
const ui = new UI();


eventListeners();

function eventListeners(){
    githubFormm.addEventListener("submit", getData);
    clearLastUsers.addEventListener("click", clearAllSearched);
    document.addEventListener("DOMContentLoaded", getAllSearched);

}

function getData(e){

    let username = nameInput.value.trim();

    if(username === ""){
        alert("Lutfen gecerli bir kullanici adi giriniz");
        
    }
    else{

        github.getGithubData(username)
        .then(response => {
            if(response.user.message === "Not Found"){
                // Hata mesaji
                //console.log("hata");
                ui.showError("Kullanici bulunamadi");
            }
            else {

                ui.addSearchedUserToUI(username);
                Storage.addSearchedUserToStorage(username);
                ui.showUserInfo(response.user);
                ui.showRepoInfo(response.repo);
            }

        }).catch(err => ui.showError(err));
    }


    ui.clearInput(); // inputumuzu temizliyoruz
    e.preventDefault();
}

function clearAllSearched(){
    // Tum Alanlari Temizleme

    if(confirm("Emin misiniz ?")){
        //Silme
        Storage.clearAllSearchedUsersFromStorage(); // Storagedan temizleme
        ui.clearAllSearchedFromUI();

    }

}

function getAllSearched(){
    // Aramalari Storagedan Al ve Ui ya ekle

    let users = Storage.getSearchedUsersFromStorage();

    let result = "";
    users.forEach(user => {
        //<li class="list-group-item">asdaskdjkasjkşdjşasjd</li>
        result += `<li class="list-group-item">${user}</li>
        `;
    });

    lastUsers.innerHTML = result;
}
