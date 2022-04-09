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

    request = getRequest('api/create_blog');

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

        if (result.error === 'Blog name already exists.') {
            const errorText = document.createElement('p');
            errorText.className = "error-text-active";
            errorText.innerText= "Blog name taken.";

            const container = document.querySelector('#create-blog-div');
            container.insertBefore(errorText, container.firstChild)

            const NameBar = document.querySelector('#blog-name');
            NameBar.className = "blog-form-input active";

            NameBar.onkeypress = function(e) {
                if (e.keyCode != 32) {
                    NameBar.setAttribute('placeholder', 'Blog name');
                    NameBar.className = "blog-form-input";
                    errorText.remove();
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