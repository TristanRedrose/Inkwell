# Inkwell

## Distinctiveness and Complexity

Inkwell is a website that provides users with a fast and simple way to set up their personal blog. Upon registering, the user can select "My blog" in the navbar which will take the user to the blog creation page, or if the user already has a blog, he will be taken to his blog page. Upon creating their blog, the user now has acces to the "New post" button which will take the user to the create post page. New posts will inherit the category of their respective blogs as their default category, allthough the user can select a different category for each post.

A registered user can leave a comment under every post, has access to the edit/delete modal for his comments, and has access to the edit profile modal in his profile page. Unregistered users can view created blogs and posts but cannot leave comments. 

The project contains 6 models: User, Category, Blog, Posts, Comments, Profile.

Base page view uses django default paginator, while category filtering and search results use custom javascript pagination.

The site is responsive both on ultrawide monitors and mobile devices.

## What’s contained in each file

**main\models.py**

*User:*
Django default user model for storing basic user information.

*Category:*
Contains category names and their corresponding color.

*Blog:*
Contains fields for blog author, name, description, blog image, category and a timestamp for when the blog was created.

*Posts*
Contains fields for post author, "parent" blog, post category, title, body text, image and a timestamp for when the post was first created and when it was last edited.

*Comments:*
Contains fields for comment author, corresponding post, body text and a timestamp for when the comment was first created and when it was last edited.

*Profile:*
Contains fields for username, users blog, biography and profile image.

**main\templates\ **

"main\" contains HTML files for different page views while "main\components\" contains HTML files for page layouts and for elements which show up on multiple different pages such as the category bar or category selector on mobile views.

**main\static\ **

"main\style.css" contains all the css code for page styling while "main\images\" contains the base pictures and icons used by the site.

**main\static\main\scripts\ **

Contains all of the websites javascript files:

#### ***showHidemenu.js***

Adds an event listener to mobile-menu icon, opening the menu if the icon is clicked, and contains functions for opening category, create and search menus in mobile-view when their respective button is clicked. Automatically closes all menus if the screen width passes 600px.

#### ***sign_in.js, register.js***

Makes an asyncronous call to the **sign_in** or **register** API upon submitting the sign_in/register form and redirects user to the posts page if the user sucessfully signs in/registers, or displays an error message depending on what went wrong. Removes error message when user starts to re-type the offending field.

#### ***create_blog.js, edit_blog.js***

Makes an asyncronous call to the **create_blog** or **edit_blog** API upon submitting the create/edit form and reloads the my_blog page if no errors occur, or displays an error message depending on what went wrong. Removes error message when user starts to re-type the offending field.

#### ***create_post.js, edit_post.js***

Makes an asyncronous call to the **create_post** or **edit_post** API upon submitting the create/edit form and redirects the user the my_blog page if no errors occur, or displays an error message depending on what went wrong. Removes error message when user starts to re-type the offending field.

#### ***post.js***

Upon loading the post page, adds a function to the comment bar that clears errors when the user re-types input. The **create_comment** function makes an asyncronous call to the **comment** API upon submitting the comment form and reloads the post page if no errors occur, or displays an error message if submitting an empty form.

The **showDelete_modal** and **showEdit_modal** functions use the **get_comment** API to find the selected comment. They then clear the modal-container from any previous content and prefill it with the selected comment text and delete button or edit form respectively, and change the modal display to block.
The **clear_modal** function sets the modal display to none and activates when the user clicks outside of the modal box or clicks the return button.

The **delete_comment** function calls the **delete_comment** API to delete the selected comment and reloads the page if no errors occur, while the **edit_comment** function calls the **edit_comment** API, displays any error messages if they appear or reloads the page upon a sucesfull edit.

#### ***profile.js***

Contains a function that inserts a placeholder profile image if any erros occur while loading the image.

The **show_modal** function prefillls the modal-container with the comment-edit-form, which contains the previous user biography and profile image url if any were previously submitted, and sets the modal display to block.

The **edit_profile** function calls the **edit_profile** API upon submitting the form, displays error messages if any appear, and reloads the page on succesfull edit.

#### ***search_filter.js***

Hides search results which do not contain the chosen category and adds the "select-ctg" id to shown boxes. The **paginate_results** function uses the added id to show only 12 items per page. If the category is "all" shows and paginates all results.

#### ***category_filter.js***

The **category_filter** function clears base pagination and empties the post container to make room for filtering results. It then calls the **category_filter** API and fills the container with returned results. Finally, the **paginate results** function takes all the result boxes and shows a maximum of 12 per page.

## How to run

### Dependencies
[Python 3.9](https://www.python.org/downloads/release/python-390/),[Django](https://www.djangoproject.com/download/), [Pillow](https://pillow.readthedocs.io/en/stable/)




