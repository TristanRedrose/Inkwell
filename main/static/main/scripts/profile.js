// Insert csrf token and get request
function getRequest(path) {
    const csrf_token = document.querySelector('[name=csrfmiddlewaretoken]').value
    const request = new Request(
        path,
        {headers: {"X-CSRFToken": csrf_token}}
    )

    return request
}

function clear_modal() {

    // Hide modal if clicked outside of prompt
    const Modal = document.querySelector('#modal')
    const ModalBox = document.querySelector('#profile-box');
        if (Modal.style.display == 'block' ) {
            Modal.style.display = 'none';
            ModalBox.style.display = 'none';
        }
}

function show_modal(username) {

    const Modal = document.querySelector('#modal');
    const ModalBox = document.querySelector('#profile-box');
    const Container = ModalBox.querySelector("#profile-middle");

    // Remove any previous added elements
    while (Container.firstChild) {
    Container.removeChild(Container.firstChild)
    }

    let image = document.querySelector('.profile-image').src;
    if (image === "/static/main/images/user.png") {
        image = "";
    }

    let text = document.querySelector('#biography-text').innerText;
    if (text === "No user biography.") {
        text = "";
    }

    // Create container div and add content
    const ContentDiv = document.createElement('div');
    ContentDiv.setAttribute('id', 'profile-content-div');

    ContentDiv.innerHTML = `
        <h3 id="profile-box-title">Edit profile</h3>
        <form id="comment-edit-form" onsubmit="event.preventDefault(); edit_profile('${username}')">
            <div>
                <label for="image">Picture:</label>
                <input class="profile-image-input" type="url" name="image" id="image" placeholder="Image-url" value="${image}">
            </div>
            <div>
                <div class="label-div">
                    <label for="biography">Biography:</label>
                </div>
                <ul class="bio-error">
                    <li>Biography cannot be empty.</li>
                </ul>
                <textarea class="profile-bio-input" type="text" id="biography" maxlength="1000" name="biography">${text}</textarea>
            </div>
        </form>
        <div class="profile-confirm-div">
            <div class="comment-confirm-div">
                <input form="comment-edit-form" type="submit" class="comment-edit-button" id="modal-edit-button" value="Save">
                <div class="comment-edit-button modal" onclick="clear_modal()">  
                    <p class="comment-text">Return</p>
                </div>
            </div>
        </div>
        `;

    //Append content to container
    Container.appendChild(ContentDiv);

    // Show modal and add remove modal function
    Modal.style.display = 'block';
    ModalBox.style.display = 'block';
    Modal.addEventListener('click', clear_modal);
}

function edit_profile(username) {

    request = getRequest(`/api/edit_profile/${username}`)

    // Create or edit profile
    fetch(request, {
        method: 'POST',
        body: JSON.stringify ({
            image: document.querySelector('#image').value,
            biography: document.querySelector('#biography').value
        })
    })
    .then(response => response.json()) 
    .then(result => {
        console.log(result)

        // Show error if submitting empty bio
        if (result.error === "Biography cannot be empty.") {

            const errorText = document.querySelector('.bio-error')
            errorText.className = "bio-error active"

            const ErrorBar = document.querySelector('.profile-bio-input')
            ErrorBar.className = "profile-bio-input active"

            ErrorBar.onkeypress = function(e) {
                if (e.keyCode !=32) {
                    ErrorBar.className = "profile-bio-input";
                    errorText.className = "bio-error";
                }
            }
        }

        // Save profile status and reload page
        if (result.message === 'Profile created.' || result.message === 'Profile edited.') {
            location.reload()
        }
    })  
}
