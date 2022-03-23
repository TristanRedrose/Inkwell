document.addEventListener('DOMContentLoaded', function() {

    // Clear eror when user starts to enter input
    const FormBar = document.querySelector('#comment');
    FormBar.onkeypress = function(e) {
        if (FormBar.value != "" && e.keyCode != 32) {
            e.target.style.border = "1px #D3D3D3 solid"
            e.target.setAttribute('placeholder', 'Comment');  
        }
    }
})

function make_comment() {
    
    // Make comment
    fetch('/comment', {
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

        // Clear previous post list if it exists, and re-list posts
        if (result.error === 'Comment cannot be empty.') {
            
            const FormBar = document.querySelector('#comment');
            FormBar.style.border = "1px red solid";
            FormBar.setAttribute('placeholder', 'Comment cannot be empty');
            FormBar.value = "";
        }
        
        // Clear previous post list if it exists, and re-list posts
        if (result.message === 'Comment submitted.') {
            
            location.reload();
        }
    })
}

function delete_modal(comment_id) {

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
        <h3 id="modal-box-title">Really delete comment?</h3>
        <div id="modal-comment-box">
            <p class="comment-text-2">${ CommentText }</p>
        </div>
        <div class="comment-confirm-div">
            <div class="comment-delete-button">  
                <p class="comment-text" onclick="delete_comment(${comment_id})">Delete</p>
            </div>
            <div class="comment-delete-button" onclick="clear_modal()">  
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

function edit_modal(comment_id) {

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
                <textarea class="comment-input-area" type="text" id="comment-edit-text" name="comment-edit">${ CommentText }</textarea>
            </div>
        </form>
        <div class="comment-confirm-div">
            <input form="comment-edit-form" type="submit" class="comment-edit-button" id="modal-edit-button" value="Edit">
            <div class="comment-edit-button" onclick="clear_modal()">  
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
    
    // Make comment
    fetch(`/comments/edit/${ comment_id }`, {
        method: 'POST',
        body: JSON.stringify({
            comment: document.querySelector('#comment-edit-text').value,
        })
    })
    .then(response => response.json())
    .then(result => {
        // Print result
        console.log(result);
        
        // Clear previous post list if it exists, and re-list posts
        if (result.message === 'Comment edited.') {
            
            location.reload();
        }
    })
}
