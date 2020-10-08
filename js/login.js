const base_api = "https://floesia-api.herokuapp.com";

window.onload = () => {
    isAuthenticated();

    const loginBtn = document.querySelector("#loginBtn");
    loginBtn.addEventListener("click", () => {
        clearAlertBox();
        login();
    })
}

function isAuthenticated() {
    if (localStorage.getItem('tk') ) {
        location.href = "/";
    }
}

function login() {
    const credentials = getCredentials();
    fetch( `${base_api}/login`, genPostData(credentials) )
        .then( data => {
            if (data.status === 404) {
                redAlert('Incorrect email or password.')
            } else {
                data
                    .json()
                    .then(data => {
                        storeToken(data.token);
                        location.href = '/';
                    })
            }
         } )
        .catch((err) => {
            console.log(err);
            redAlert("Login failed.")
        })
}

function getCredentials() {
    const emailField = document.querySelector("#email");
    const passwordField = document.querySelector("#password");

    const credentials = {
        email: emailField.value,
        password: passwordField.value
    }
    return credentials;
}

function genHeaders() {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    return myHeaders;
}

function genPostData(credentials) {
    const postData = {
        method: 'POST',
        body: JSON.stringify(credentials, null, 2),
        headers: genHeaders(),
        mode: 'cors'
    }
    return postData;
}

function storeToken(token) {
    localStorage.setItem('tk', token);
}

function redAlert(message) {
    let alert = document.createElement('span');
    alert.className = "red-alert";
    alert.innerText = message;

    document.querySelector("#alert-box").appendChild(alert);
}

function clearAlertBox() {
    document.querySelector("#alert-box").innerHTML = '';
}