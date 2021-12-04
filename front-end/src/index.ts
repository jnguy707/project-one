import './styles/style.scss';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.js'

import { User } from './user.model'
import { UserService } from './user.service'
console.log("-index.ts-")

const userService = new UserService();
// query for that id
// for id

// Session User
let currentUser = new User();
// Setting up candidate User
let candidateUser = new User();

// candidateUser.username = 'Test1@mail.com';
// candidateUser.password = 'test1';
// // console.log(JSON.stringify(candidateUser));
// currentUser = getUser(candidateUser);
// // console.log("outside");
// // console.log(currentUser);


// Navigation Bar and other elements
const navElement = document.getElementById('nav-head');
const transferForm = document.getElementById('transfer-form')
// Login Functionality
const loginForm = document.getElementById('login-form');
const usernameField = document.getElementById('input-username');
const passwordField = document.getElementById('input-password');
const inputSubmit = document.getElementById('input-submit');

// Login Event
inputSubmit.addEventListener('click', async e => {
    candidateUser.username = (<HTMLInputElement>usernameField).value;
    candidateUser.password = (<HTMLInputElement>passwordField).value;
    let user = await getUser(candidateUser);
    currentUser = userService.user;
    // HERE: hide login menu and show nav menu and accounts
    if(currentUser.password == candidateUser.password){
        navElement.classList.remove('invisible');
        loginForm.classList.add('invisible');
        transferForm.classList.remove('invisible');
    }
})


async function getUser(userCandidate: User) {
    return userService.loginUser(userCandidate);
}
