let form = document.querySelector('#form');
let username = document.querySelector('#name');
let email = document.querySelector('#email');
let password = document.querySelector('#password');
let button = document.querySelector('#button');
let clearButton = document.querySelector('.clear-button')
let userContainer = document.querySelector(".container");

clearButton.addEventListener('click', ()=>{
    localStorage.clear()
    users.length > 0 ? location.reload() : alert("Storage is empty")
    
})


const users = JSON.parse(localStorage.getItem("users")) || [];
// localStorage.clear()

const addUser = (username, email, password) => { 
    users.push({
        username,
        email,
        password,
    });

    localStorage.setItem("users", JSON.stringify(users));

    return {username, email, password};
};
const createUserElement = ({username, email, password}) =>{
    const userDiv = document.createElement('div');
    const userName = document.createElement('h3');
    const userEmail = document.createElement('p');
    const userPassword = document.createElement('p');

    userName.innerText = "Username: " + username;
    userEmail.innerText = "User Email: " + email;
    userPassword.innerText = "User Password: " + password;

    userDiv.append(userName, userEmail, userPassword);
    userContainer.appendChild(userDiv);

    userContainer.style.display = users.length === 0 ? "none" : "flex"
}

users.forEach(createUserElement);

userContainer.style.display = users.length === 0 ? "none" : "flex"
clearButton.style.display = users.length === 0 ? "none" : "block"

form.addEventListener("submit", () =>{
    if(!username.value || !password.value || !email.value){
        alert("Please fill out all fields!")
        return false
    }


    const newUser = addUser(
        username.value,
        email.value,
        password.value,
    );
    
    createUserElement(newUser)
    
})
