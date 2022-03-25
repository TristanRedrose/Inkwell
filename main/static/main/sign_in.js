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
    request = getRequest('/sign_in_user');

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
            ErrorMessage = document.querySelector('.error-text');
            ErrorMessage.className = "error-text-active"
        }

        // Signal error to user if it occurs
        if (result.message === "User logged in.") {
            
            location.replace('posts')
        }
    })
}