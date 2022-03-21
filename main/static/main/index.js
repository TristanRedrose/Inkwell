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
            FormBar.style.border = "1px solid red";
            FormBar.setAttribute('placeholder', 'Comment cannot be empty')  
        }
        
        // Clear previous post list if it exists, and re-list posts
        if (result.message === 'Comment submitted.') {
            
            location.reload();
        }
    })
}