import './styles/style.scss';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.js'

import { User } from './user.model';
import { UserService } from './user.service';
import { AccountService } from './account.service';
import { Account } from './account.model';
import { TransactionService } from './transaction.service';

console.log("-index.ts-")
// Services 
const userService = new UserService();
const accountService = new AccountService();
const transactionService = new TransactionService();

// Session User(s)
let currentUser = new User();
let candidateUser = new User();

// Transfer Candidates
let fromAccount = new Account();
let toAccount = new Account();
let amount: number;


// Alert(s)
const alertPlaceholder = document.getElementById('liveAlertPlaceholder');

// Navigation Bar and Link Elements
const navElement = document.getElementById('nav-head');
const linkAccount = document.getElementById('link-account');
const linkTransfer = document.getElementById('link-transfer');

// Login Form Elements
const loginForm = document.getElementById('login-form');
const usernameField = document.getElementById('input-username');
const passwordField = document.getElementById('input-password');
const inputSubmit = document.getElementById('input-submit');

// Account Overview Elements
const accountViewSection = document.getElementById('account-view-section');
const accountView = document.getElementById('account-view');

// Transfer Form Elements
const toAccountTransferListEle = document.getElementById('to-account-dropdown-list')
const fromAccountTransferListEle = document.getElementById('from-account-dropdown-list');
const transferForm = document.getElementById('transfer-form');
const amountInput = document.getElementById('input-amount');
const transferButton = document.getElementById('button-transfer');

// Helpful function(s)
function eleHasClass(element: HTMLElement, classToTest: string) {
    var pattern = new RegExp("(^| )" + classToTest + "( |$)");
    return pattern.test(element.className) ? true : false;
}

function alert(message: string, type: string) {
    const wrapper = document.createElement('div')
    wrapper.innerHTML = '<div class="alert alert-' + type + ' alert-dismissible" role="alert">' + message + '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>'
    alertPlaceholder.innerHTML = "";
    alertPlaceholder.append(wrapper);
}


// Navigation Event Listers
linkAccount.addEventListener('click', e => {
    e.preventDefault();
    // transform is visible
    if (!eleHasClass(transferForm, 'invisible')) {
        // Updating Nav-bar
        linkTransfer.classList.remove('active');
        linkAccount.classList.add('active');
        // Updating Page
        transferForm.classList.add('invisible');
        accountViewSection.classList.remove('invisible');
        renderAccounts();
        alertPlaceholder.innerHTML = "";
    } else {
        renderAccounts();
        alertPlaceholder.innerHTML = "";
    }
})

linkTransfer.addEventListener('click', e => {
    e.preventDefault();
    // accountViewSection is visible
    if (!eleHasClass(accountViewSection, 'invisible')) {
        // Updating Nav-bar
        linkAccount.classList.remove('active');
        linkTransfer.classList.add('active');
        // Updating Page
        transferForm.classList.remove('invisible');
        accountViewSection.classList.add('invisible');
        renderTransferAccounts();
        alertPlaceholder.innerHTML = "";
    } else {
        renderTransferAccounts();
        alertPlaceholder.innerHTML = "";
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
        alertPlaceholder.innerHTML = "";
    } else {
        alert('Incorrect username or password','danger');
    }
})

function morphLoginSuccess() {
    navElement.classList.remove('invisible');
    loginForm.classList.add('invisible');
    // This should be accountList
    accountViewSection.classList.remove('invisible')
    //transferForm.classList.remove('invisible');
}

// Transfer Form Events
fromAccountTransferListEle.addEventListener('click', e => {
    e.stopPropagation();
    const dataset = (<HTMLElement>e.target).dataset;

    //console.log(Number.parseInt(dataset['id']));
    fromAccount.id = Number.parseInt(dataset['id']);
});

toAccountTransferListEle.addEventListener('click', e => {
    e.stopPropagation();
    const dataset = (<HTMLElement>e.target).dataset;

    //console.log(Number.parseInt(dataset['id']));
    toAccount.id = Number.parseInt(dataset['id']);
})

transferButton.addEventListener('click', e => {
    e.preventDefault();
    // Need to type cast event? to HTMLInputElement
    const inputValue = (<HTMLInputElement>amountInput).value;
    amount = Number.parseInt(inputValue);
    
    if (fromAccount.id === toAccount.id) {
        alert('Transfer Account end-points can not be the same.', 'danger')
    } else if (inputValue === '' ||  amount <= 0) {
        alert('Transfer amount field is empty or can not be less than or equal zero', 'danger')
    } else {
        alert('Successful Transfer. Balances are updated.', 'success');
        // console.log(JSON.stringify({
        //     fromAccountId: fromAccount.id,
        //     toAccountId: toAccount.id,
        //     amount: amount
        //     }));
        transactionService.pushTransfer(fromAccount,toAccount,amount);
    }
})
/*
var alertPlaceholder = document.getElementById('liveAlertPlaceholder')
var alertTrigger = document.getElementById('liveAlertBtn')
 
 
 
if (alertTrigger) {
  alertTrigger.addEventListener('click', function () {
    alert('Nice, you triggered this alert message!', 'success')
  })
*/
// Renders + Service Calls
async function renderTransferAccounts() {
    const accountList = await accountService.fetchAccount(currentUser);
    console.log('render transfer accounts')
    console.log(accountList)
    const accountListElements = accountList.map((account: Account) => {
        // made all 3 elements have data-id so that they can all be clicked
        return `
        <li data-id='${account.id}' class='dropdown-item d-flex p-2 justify-content-lg-between button'>
            <div data-id='${account.id}' class='d-md-flex p-2 justify-content-lg-start bd-highlight'>${account.accountType} (${account.id})</div>
            <div data-id='${account.id}' class='d-md-flex p-2 justify-content-lg-end bd-highlight'>$${account.balance}</div>
        </li>
        `

    })
    toAccountTransferListEle.innerHTML = accountListElements.join("");
    fromAccountTransferListEle.innerHTML = accountListElements.join("");
}
async function renderAccounts() {
    const accountList = await accountService.fetchAccount(currentUser);
    console.log('render accounts')
    console.log(accountList)
    const accountListElements = accountList.map((account: Account) => {
        return `
            <div id="account-card" class="card w-100" >
                <div id="account-view-header" class="card-header">
                    <div class="card-title d-md-inline-flex">
                        <div class='d-md-flex flex-fill p-2 justify-content-lg-start bd-highlight'>${account.accountType}</div>
                        <div class='d--md-flex flex-fill p-2 justify-content-lg-end bd-highlight'>(${account.id})</div>
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

