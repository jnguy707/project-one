import './styles/style.scss';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.js'

import { User } from './user.model';
import { UserService } from './user.service';
import { AccountService } from './account.service';
import { Account } from './account.model';

console.log("-index.ts-")

const userService = new UserService();
const accountService = new AccountService();
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
const linkAccount = document.getElementById('link-account');
const linkTransfer = document.getElementById('link-transfer');

// Login Functionality
const loginForm = document.getElementById('login-form');
const usernameField = document.getElementById('input-username');
const passwordField = document.getElementById('input-password');
const inputSubmit = document.getElementById('input-submit');

// Account View
const accountViewSection = document.getElementById('account-view-section');
const accountView = document.getElementById('account-view');

// Transfer Form
const accountTransferListEle = document.getElementById('account-dropdown-list')
const transferForm = document.getElementById('transfer-form');
// Navigation Event Listers
linkAccount.addEventListener('click', e => {
    e.preventDefault();
    // transform is visible
    if(!eleHasClass(transferForm,'invisible')){
        transferForm.classList.add('invisible');
        accountViewSection.classList.remove('invisible');
    } else {
        renderAccounts();
    }
})
linkTransfer.addEventListener('click', e =>{
    e.preventDefault();
    // accountViewSection is visible
    if(!eleHasClass(accountViewSection,'invisible')){
        transferForm.classList.remove('invisible');
        accountViewSection.classList.add('invisible');
        renderTransferAccounts();

    } else {
        renderTransferAccounts();
    }
})
// Login Event Sequence
inputSubmit.addEventListener('click', async e => {
    e.preventDefault();
    candidateUser.username = (<HTMLInputElement>usernameField).value;
    candidateUser.password = (<HTMLInputElement>passwordField).value;
    let userPromise = await getUser(candidateUser);
    currentUser = userService.user;
    // HERE: hide login menu and show nav menu and accounts
    if (currentUser.password == candidateUser.password) {
        morphLoginSuccess();
        renderAccounts();
    }
})
// Add eventListeners for nav buttons and prevent default so that page does not refresh
// Add eventListeners for transferForm: presenting accounts details (account <TYPE> (<account_id>  <Balance>)) and the submission
// Make account-view html and load with data
// As of now, back-end returns all transactions in JSON for GET request of Accounts of a given user
// Not sure why as @JSONIgnore is ignored by jackson
function morphLoginSuccess() {
    navElement.classList.remove('invisible');
    loginForm.classList.add('invisible');
    // This should be accountList
    accountViewSection.classList.remove('invisible')
    //transferForm.classList.remove('invisible');
}

function eleHasClass(element: HTMLElement, classToTest : string) {
    var pattern = new RegExp("(^| )" + classToTest + "( |$)");
    return pattern.test(element.className) ? true : false;
};

async function renderTransferAccounts() {
    const accountList = await accountService.fetchAccount(currentUser);
    console.log('render transfer accounts')
    console.log(accountList)
    const accountListElements = accountList.map((account: Account) => {
        return `
        <li class='dropdown-item d-flex p-2 justify-content-lg-between'>
            <div class='d-md-flex p-2 justify-content-lg-start bd-highlight'>${account.accountType} (${account.id})</div>
            <div class='d-md-flex p-2 justify-content-lg-end bd-highlight'>$${account.balance}</div>
        </li>
        `
    })
    accountTransferListEle.innerHTML = accountListElements.join("");
}
async function renderAccounts() {
    const accountList = await accountService.fetchAccount(currentUser);
    console.log('render accounts')
    console.log(accountList)
    const accountListElements = accountList.map((account: Account) => {
        return `
            <div class="card" style="width: 30rem;">
                <div id="account-view-header" class="card-header">
                    <div class="card-title d-inline-flex">
                        <div class='d-flex p-2 justify-content-lg-start bd-highlight'>${account.accountType}</div>
                        <div class='d-flex p-2 justify-content-lg-end bd-highlight'>(${account.id})</div>
                    </div>
                </div>
                <div class="card-body">
                    <div id="account-view-body" class="card-body">
                        <p class="fw-bold">Balance</p>
                        <p class="fw-light">$${account.balance}</p>
                        </div>
                    </div>
            </div>
        `
    });
    accountView.innerHTML = accountListElements.join("");
}

async function getUser(userCandidate: User) {
    return userService.loginUser(userCandidate);
}
