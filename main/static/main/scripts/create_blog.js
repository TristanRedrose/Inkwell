// Insert csrf token and get request
function getRequest(path) {
    const csrf_token = document.querySelector('[name=csrfmiddlewaretoken]').value
    const request = new Request(
        path,
        {headers: {"X-CSRFToken": csrf_token}}
    )

    return request
}

function create_blog() {

    request = getRequest('create_blog');

    fetch(request, {
        method: 'POST',
        body: JSON.stringify ({
            name: document.querySelector('#blog-name').value,
            description: document.querySelector('#description').value,
            category: document.querySelector('#category').value,
            image: document.querySelector('#image').value
        })
    })
    .then(response => response.json())
    .then(result => {
        console.log(result)

        if (result.error === 'Blog name cannot be empty.') {
            const NameBar = document.querySelector('#blog-name');
            NameBar.setAttribute('placeholder', 'Blog name cannot be empty.');
            NameBar.className = "blog-form-input active";

            NameBar.onkeypress = function(e) {
                if (e.keyCode != 32) {
                    NameBar.setAttribute('placeholder', 'Blog name');
                    NameBar.className = "blog-form-input";
                }
            }
        }

        if (result.error === 'Blog description cannot be empty.') {
            const DescBar = document.querySelector('#description');
            DescBar.setAttribute('placeholder', 'Blog description cannot be empty.');
            DescBar.className = "blog-form-input active";

            DescBar.onkeypress = function(e) {
                if (e.keyCode != 32) {
                    DescBar.setAttribute('placeholder', 'Blog description');
                    DescBar.className = "blog-form-input";
                }
            }
        }

        if (result.message === 'Blog created.') {
            location.reload();
        }
    })
}

function showClear_error(message, container, input_bar) {

    const ErrorMessage = document.querySelector(`${container}`);
    const InputButton = document.querySelector('.blog-button');

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

    // Reset erors when user resubmits form
    const ErrorBars = document.querySelectorAll('.login-form');
    InputButton.onclick = function(e) {
        ErrorBars.forEach((Bar) => {
            Bar.style.border = "1px #D3D3D3 solid"
        }) 
        ErrorMessage.className = "error-text";
    }
}