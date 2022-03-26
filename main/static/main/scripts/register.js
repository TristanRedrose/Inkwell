// Insert csrf token and get request
function getRequest(path) {
    const csrf_token = document.querySelector('[name=csrfmiddlewaretoken]').value
    const request = new Request(
        path,
        {headers: {"X-CSRFToken": csrf_token}}
    )

    return request
}

function register_user() {

    request = getRequest('register_user')

    fetch(request, {
        method: 'POST',
        body: JSON.stringify ({
            username: document.querySelector('#username').value,
            password: document.querySelector('#password').value,
            confirm: document.querySelector('#confirm').value
        })
    })
    .then(response => response.json())
    .then(result => {
        console.log(result)

        if (result.error === "Username already taken.") {
            showClear_error(result.error, "#username-error", "#username")
        }

        else if (result.error === "Username cannot be empty.") {
            showClear_error("Please enter username", "#username-error", "#username")
        }

        else if (result.error === "Password cannot be empty.") {
            showClear_error("Please enter password", "#password-error", "#password")
        }

        else if (result.error === "Passwords must match.") {
            showClear_error(result.error, "#no-match-error", "passwords")
        }

        else if (result.message === "User succesfully registered.") {
            location.replace('posts')
        }
    })
}

function showClear_error(message, container, input_bar) {

    const ErrorMessage = document.querySelector(`${container}`);
    const InputButton = document.querySelector('.login-button');

    if (input_bar != "passwords") {
        const InputBar = document.querySelector(`${input_bar}`);

        ErrorMessage.innerText = `${message}`;
        ErrorMessage.className = "error-text-active";
        InputBar.style.border = "1px red solid";

        // Clear error when user starts to type
        InputBar.onkeypress = function(e) {
            if (e.keyCode != 32) {
                ErrorMessage.innerText = "";
                ErrorMessage.className = "error-text";
                InputBar.style.border = "1px #D3D3D3 solid";
            }
        }
    }

    else {
        const PasswordBar = document.querySelector('#password');
        const ConfirmBar = document.querySelector('#confirm');

        ErrorMessage.innerText = `${message}`;
        ErrorMessage.className = "error-text-active";

        PasswordBar.style.border = "1px red solid";
        PasswordBar.onkeypress = function(e) {
            if (e.keyCode != 32) {
                ErrorMessage.innerText = "";
                ErrorMessage.className = "error-text";
                PasswordBar.style.border = "1px #D3D3D3 solid";
                ConfirmBar.style.border = "1px #D3D3D3 solid";
            }
        }

        ConfirmBar.style.border = "1px red solid";
        ConfirmBar.onkeypress = function(e) {
            if (e.keyCode != 32) {
                ErrorMessage.innerText = "";
                ErrorMessage.className = "error-text";
                ConfirmBar.style.border = "1px #D3D3D3 solid";
                PasswordBar.style.border = "1px #D3D3D3 solid";
            }
        }
    }

    // Reset erors when user resubmits form
    const ErrorBars = document.querySelectorAll('.login-form');
    InputButton.onclick = function(e) {
        ErrorBars.forEach((Bar) => {
            Bar.style.border = "1px #D3D3D3 solid"
        }) 
        ErrorMessage.className = "error-text";
    }
}
