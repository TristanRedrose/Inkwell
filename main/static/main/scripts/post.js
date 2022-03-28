document.addEventListener('DOMContentLoaded', function() {

    // Clear error from comment bar when user starts to enter input
    const FormBar = document.querySelector('#comment');
    FormBar.onkeypress = function(e) {
        if (FormBar.value != "" && e.keyCode != 32) {
            e.target.style.border = "1px #D3D3D3 solid"
            e.target.setAttribute('placeholder', 'Comment');  
        }
    }
})

// Insert csrf token and get request
function getRequest(path) {
    const csrf_token = document.querySelector('[name=csrfmiddlewaretoken]').value
    const request = new Request(
        path,
        {headers: {"X-CSRFToken": csrf_token}}
    )

    return request
}

function create_comment() {

    // Insert csrf and get request
    request = getRequest('/comment');
    
    // Make comment
    fetch(request, {
        method: 'POST',
        body: JSON.stringify({
            comment: document.querySelector('#comment').value,
            post: document.querySelector('#comment-post-id').value
        })
    })
    .then(response => response.json())
    .then(result => {
        
        // Print result
        console.log(result);

        // If comment is empty, signal error to the user
        if (result.error === 'Comment cannot be empty.') {
            
            const FormBar = document.querySelector('#comment');
            FormBar.style.border = "1px red solid";
            FormBar.setAttribute('placeholder', 'Comment cannot be empty');
            FormBar.value = "";
        }
        
        // If no errors submit comment and reload page
        if (result.message === 'Comment submitted.') {
            
            location.reload();
        }
    })
}

function showDelete_modal(comment_id) {

    fetch(`/comments/find/${comment_id}`)
    .then(response => response.json())
    .then(text => {
        
        const CommentText = text

        const Modal = document.querySelector('#modal');
        const ModalBox = document.querySelector('#modal-box');
        const Container = ModalBox.querySelector("#modal-middle");
        
        // Remove any previous added elements
        while (Container.firstChild) {
        Container.removeChild(Container.firstChild)
        }

        // Create container div and add content
        const ContentDiv = document.createElement('div');
        ContentDiv.setAttribute('id', 'modal-content-div');

        ContentDiv.innerHTML = `
        <h3 id="modal-box-title">Really delete comment?</h3>
        <div id="modal-comment-box">
            <p class="comment-text-2">${ CommentText }</p>
        </div>
        <div class="comment-confirm-div">
            <div class="comment-delete-button">  
                <p class="comment-text" onclick="delete_comment(${comment_id})">Delete</p>
            </div>
            <div class="comment-delete-button modal" onclick="clear_modal()">  
                <p class="comment-text">Return</p>
            </div>
        </div>
        `;

        //Append content to container
        Container.appendChild(ContentDiv);

        // Show modal and add remove modal function
        Modal.style.display = 'block';
        ModalBox.style.display = 'block';
        Modal.addEventListener('click', clear_modal);
    }) 
}

function clear_modal() {

    // Hide modal if clicked outside of prompt
    const Modal = document.querySelector('#modal')
    const ModalBox = document.querySelector('#modal-box');
        if (Modal.style.display == 'block' ) {
            Modal.style.display = 'none';
            ModalBox.style.display = 'none';
        }
}

function delete_comment(comment_id) {

    fetch(`/comments/delete/${comment_id}`)
    .then(response => response.json())
    .then(result => {
        // Print result
        console.log(result);

        // Reload if successfull
        if (result.message === 'Comment removed.') {
            
            location.reload();
        }
    })   
}

function showEdit_modal(comment_id) {

    fetch(`/comments/find/${comment_id}`)
    .then(response => response.json())
    .then(text => {
        // Print text
        const CommentText = text

        const Modal = document.querySelector('#modal');
        const ModalBox = document.querySelector('#modal-box');
        const Container = ModalBox.querySelector("#modal-middle");
        
        // Remove any previous added elements
        while (Container.firstChild) {
        Container.removeChild(Container.firstChild)
        }

        // Create container div and add content
        const ContentDiv = document.createElement('div');
        ContentDiv.setAttribute('id', 'modal-content-div');

        ContentDiv.innerHTML = `
        <h3 id="modal-box-title">Edit comment:</h3>
        <form id="comment-edit-form" onsubmit="event.preventDefault(); edit_comment(${ comment_id })">
            <div>
                <textarea class="comment-input-area" type="text" id="comment-edit-text" maxlength="600" name="comment-edit">${ CommentText }</textarea>
            </div>
        </form>
        <ul id="error-message">
            <li>Comment cannot be empty</li>
        </ul>
        <div class="comment-confirm-div">
            <input form="comment-edit-form" type="submit" class="comment-edit-button" id="modal-edit-button" value="Save">
            <div class="comment-edit-button modal" onclick="clear_modal()">  
                <p class="comment-text">Return</p>
            </div>
        </div>
        `;

        //Append content to container
        Container.appendChild(ContentDiv);

        // Show modal and add remove modal function
        Modal.style.display = 'block';
        ModalBox.style.display = 'block';
        Modal.addEventListener('click', clear_modal);
    }) 
}

function edit_comment(comment_id) {
    
    // Insert csrf and get request
    request = getRequest(`/comments/edit/${ comment_id }`)

    // Make comment
    fetch( request, {
        method: 'POST',
        body: JSON.stringify({
            comment: document.querySelector('#comment-edit-text').value,
        })
    })
    .then(response => response.json())
    .then(result => {
        // Print result
        console.log(result);

        // Signal error if it occurs
        if (result.error === 'Comment cannot be empty.') {
            
            const TextArea = document.querySelector('#comment-edit-text');
            const ErrorMessage = document.querySelector('#error-message');

            // Clear textarea in case it contained only whitespace
            TextArea.value= "";

            // Signal error to the user
            TextArea.className = ("comment-input-area-error");
            ErrorMessage.className = ("error-message");

            // Reset eror when the user starts to enter input
            if (TextArea.className == "comment-input-area-error") {
                TextArea.onkeypress = function(e) {
                    if (TextArea.innerHTML != "" && e.keyCode != 32) {
                        e.target.className = ("comment-input-area");
                        ErrorMessage.className = (""); 
                    }
                }
            }
        }
        
        // If no errors occur, edit comment and reload page
        if (result.message === 'Comment edited.') {
            
            location.reload();
        }
    })
}

