document.addEventListener('DOMContentLoaded', function() {

    // Clear eror when user starts to enter input
    const FormBar = document.querySelector('#comment')
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
