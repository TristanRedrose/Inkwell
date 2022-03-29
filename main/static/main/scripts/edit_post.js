// Insert csrf token and get request
function getRequest(path) {
    const csrf_token = document.querySelector('[name=csrfmiddlewaretoken]').value
    const request = new Request(
        path,
        {headers: {"X-CSRFToken": csrf_token}}
    )

    return request
}

function edit_post(blog_name, post_id) {
    
    request = getRequest(`/api/edit_post/${post_id}`)

    fetch(request, {
        method: 'POST',
        body: JSON.stringify ({
            title: document.querySelector('#title').value,
            body: document.querySelector('#body').value,
            category: document.querySelector('#category').value,
            image: document.querySelector('#image').value
        })
    })
    .then(response => response.json())
    .then(result => {
        console.log(result)

        if (result.error === "Post title cannot be empty.") {
            showClear_error('#title-error', result.error, '#title');
        }

        if (result.error === "You already have a post with this title.") {
            showClear_error('#title-error', result.error, '#title');
        }

        if (result.error === "Post body cannot be empty.") {
            showClear_error('#body-error', result.error, '#body');
        }

        if (result.message === 'Post edited.') {
            const postName = document.querySelector('#title').value
            location.replace(`/view/${blog_name}/${postName}`)
        }
    })
}

function showClear_error(container,message,input_bar) {

    const ErrorMessage = document.querySelector(`${container}`);
    ErrorMessage.innerText = `${message}`;
    const ErrorBar = document.querySelector(`${input_bar}`);
    const InputButton = document.querySelector(".post-button")

    ErrorMessage.className = "error-text active";

    if (input_bar === '#title') {
        ErrorBar.className = "post-input active";

        ErrorBar.onkeypress = function(e) {
            if (e.keyCode !=32) {
                ErrorBar.className = "post-input";
                ErrorMessage.innerText = "";
                ErrorMessage.className = "error-text";
            }
        }
    }

    else {
        ErrorBar.className = "post-input-area active";

        ErrorBar.onkeypress = function(e) {
            if (e.keyCode !=32) {
                ErrorBar.className = "post-input-area";
                ErrorMessage.innerText = "";
                ErrorMessage.className = "error-text";
            }
        }
    }
}