const form = document.querySelector('#form');
const username = document.querySelector('#name');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const button = document.querySelector('#button');
const messageBox = document.querySelector('.message')
const userContainer = document.querySelector(".container");
const removeButton = document.querySelector('.remove-button')

let oldUsers = JSON.parse(localStorage.getItem("users")) || []

let addUser = (username, email, password) =>{
    oldUsers.push({username, email, password} )
    localStorage.setItem("users", JSON.stringify(oldUsers))
    return {username, email}
}




function createUserElement({username, email}){
    let usernameRow = document.createElement('h3')
    let emailRow = document.createElement('p')
    let userDiv = document.createElement('div')

    usernameRow.innerText = `Username: ${username}`;
    emailRow.innerText = `Email: ${email}`

    userDiv.append(usernameRow, emailRow)
    userContainer.appendChild(userDiv)
}

oldUsers.forEach(createUserElement)

oldUsers.length === 0 ? userContainer.style.display = "none" : 'block'

oldUsers.length === 0 ? removeButton.style.display = "none" : removeButton.style.display = "block"

removeButton.addEventListener('click', ()=>{
    localStorage.clear()
    location.reload()
})

form.addEventListener('submit', (event)=>{
    if(!email.value, !username.value, !password.value){
        event.preventDefault()
        messageBox.innerText = "All fields are required!"
        return;
    }
    else{
        messageBox.innerText = "";
    }
    for(let oldUser of oldUsers){
        if(username.value === oldUser.username && email.value === oldUser.email){
            event.preventDefault()
            messageBox.innerText = "User already exists!"
            return
        }
        else{
            messageBox.innerText = "";
        }
    }
    const newUser = addUser(username.value,email.value, password.value)
   
    // let oldUsers = JSON.parse(localStorage.getItem("users")) || []
    // oldUsers.push(newUser)
   
    createUserElement(newUser)
    // location.reload()
    
})
