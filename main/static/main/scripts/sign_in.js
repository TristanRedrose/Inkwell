// Insert csrf token and get request
function getRequest(path) {
    const csrf_token = document.querySelector('[name=csrfmiddlewaretoken]').value
    const request = new Request(
        path,
        {headers: {"X-CSRFToken": csrf_token}}
    )

    return request
}

function sign_in() {

    // Insert csrf and get request
    request = getRequest('/api/sign_in_user');

    // Sign in user
    fetch(request, {
        method: 'POST',
        body: JSON.stringify({
            username: document.querySelector('#username').value,
            password: document.querySelector('#password').value
        })
    })
    .then(response => response.json())
    .then(result => {
        console.log(result);

        // Signal error to user if it occurs
        if (result.error === "Invalid username or password.") {
            showHide_error('#invalid-combination', '.login-form')
        }

        else if (result.error === "Username cannot be empty") {
            showHide_error('#username-error', '#username')
        }

        else if (result.error === "Password cannot be empty") {
            showHide_error('#password-error', '#password')
        }

        // If no errors occur send user to posts
        else if (result.message === "User logged in.") {
            
            location.replace('posts')
        }
    })
}

function showHide_error(error_id, input_bar) {
    
    const ErrorMessage = document.querySelector(`${error_id}`);
    const InputButton = document.querySelector('.login-button');

    // Show error message
    ErrorMessage.className = "error-text-active";

    // Add red error border to both inputs in case of invalid combination
    if (input_bar === ".login-form") {
        const ErrorBars = document.querySelectorAll(`${input_bar}`)
        ErrorBars.forEach((Bar) => {
            Bar.style.border = "1px red solid"

            // Remove red border and eror message when user changes input 
            Bar.onkeypress = function(e) {
                if (e.keyCode != 32) {
                    ErrorBars.forEach((Bar) => {
                        Bar.style.border = "1px #D3D3D3 solid";
                    })
                    ErrorMessage.className = "error-text";
                }
            }
        })

        // Reset erors when user resubmits form
        InputButton.onclick = function(e) {
            ErrorBars.forEach((Bar) => {
                Bar.style.border = "1px #D3D3D3 solid"
            }) 
            ErrorMessage.className = "error-text";
        }
    }
    
    // Add red border for empty inputs
    else {
        const ErrorBar = document.querySelector(`${input_bar}`)
        ErrorBar.style.border = "1px red solid";

        ErrorBar.onkeypress = function(e) {
            if (e.keyCode != 32) {
                ErrorBar.style.border = "1px #D3D3D3 solid";
                ErrorMessage.className = "error-text";
            }
        }
    }  
}