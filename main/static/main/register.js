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
            showClear_error(result.error)
        }

        else if (result.error === "Passwords must match.") {
            showClear_error(result.error)
        }

        else if (result.message === "User succesfully registered.") {
            location.replace('posts')
        }
    })
}

function showClear_error(message) {

    const ErrorMessage = document.querySelector('.error-text');
    const InputBars = document.querySelectorAll('input');

    ErrorMessage.innerHTML = `<strong>${message}</strong>`;
    ErrorMessage.className = "error-text-active";

    // Clear error when user starts to type
    InputBars.forEach((Bar) => {
        Bar.onkeypress = function(e) {
            if (e.keyCode != 32) {
                ErrorMessage.innerHTML = "";
                ErrorMessage.className = "error-text";
            }
        }
    })
}
