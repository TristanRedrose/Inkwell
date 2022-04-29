function category_filter(set,category) {

    const activeButton = document.querySelectorAll('.category-button.active');
    activeButton.forEach(button => {
        button.className = "category-button";
    })
    const button = document.getElementById(`${category}`);
    button.className = "category-button active";

    const button2 = document.getElementById(`${category}-mobile`);
    button2.className = "category-button active";

    // Create container for filtered objects, hide base django pagination
    const container = document.querySelector('.post-div');
    container.innerHTML="";
    
    let baseCheck = document.querySelector('.pagination') !== null;
    if (baseCheck === true) {
        const basePagination = document.querySelector('.pagination');
        basePagination.className = "pagination active";
    }

    // Get filtered objects
    fetch(`/api/filter/${set}/${category}`)
    .then(response => response.json())
    .then(objects => {

        // Log posts or blogs
        console.log(objects);

        // Get all objects and see how many pages are needed to show them all
        const objectset = objects
        let maxPages = Math.ceil(objects.length / 12)
        console.log(maxPages)

        if (maxPages == 0) {
            const mainDiv = document.createElement('div');
            mainDiv.setAttribute('class', 'ctg-wrapper active');
            mainDiv.setAttribute('id', 'select-ctg')

            mainDiv.innerHTML=`
            <h3>No results found</h3>
            <img id="ad-img1" src="/static/main/images/undraw_not_found_-60-pq.svg" alt="not found">
            `;
            container.append(mainDiv);
        }

        // Create a box for each object and fill it with the objects content
        objectset.forEach(object => {

            const mainDiv = document.createElement('div');
            mainDiv.setAttribute('class', 'ctg-wrapper active');
            mainDiv.setAttribute('id', 'select-ctg')

            // Set default no image picture if user left image blank
            if (object.image === "" || object.image === null) {
                object.image = "/static/main/images/no-image.jpg";
            } 

            if (set === "posts") {
                mainDiv.innerHTML =`
                <div class="blog-box">
                    <div id="post-box-image">
                        <img id="post-img" src=${object.image} alt="post-img">
                        <div class="info-wrapper">
                            <div class="blog-info-2">
                                <div class="blog-info-box">
                                    <img id="info-img1" src="/static/main/images/user.png" alt="ad-img1">
                                    <p id="blog-time"><span>${object.author}</span></p>
                                </div>
                                <div class="blog-info-box">
                                    <img id="info-img1" src="/static/main/images/Calendar.png" alt="ad-img1">
                                    <p id="blog-time">${object.created}</p>
                                </div>
                            </div>
                            <div class="blog-info-3" style="background-color:${object.color}">
                                <img id="info-img1" src="/static/main/images/categories.png" alt="ad-img1">
                                <p id="blog-time">${object.category}</p>
                            </div>
                        </div>
                    </div>
                    <div id="post-box-content">
                        <div class="blog-box-title-div">
                            <h3 id="box-title-text">${object.title}</h3>
                        </div>
                        <div class="blog-box-desc-div">
                            <p id="box-body-text">${object.body}</p>
                        </div>
                    </div>
                    <div class="blog-box-bottom">
                        <a class="nav-link" href="/view/${object.blog}/${object.title}">
                            <div id="post-box-button">
                                <p>Read more</p>
                            </div>
                        </a>
                    </div>
                </div>
                `;

                container.append(mainDiv);
            }

            else if (set === "blogs") {
                mainDiv.innerHTML =`
                <div class="blog-box">
                    <div id="post-box-image">
                        <img id="post-img" src=${object.image} alt="post-img">
                        <div class="info-wrapper">
                            <div class="blog-info-2">
                                <div class="blog-info-box">
                                    <img id="info-img1" src="/static/main/images/user.png" alt="ad-img1">
                                    <p id="blog-time"><span>${object.author}</span></p>
                                </div>
                                <div class="blog-info-box">
                                    <img id="info-img1" src="/static/main/images/Calendar.png" alt="ad-img1">
                                    <p id="blog-time">${object.created}</p>
                                </div>
                            </div>
                            <div class="blog-info-3" style="background-color:${object.color}">
                                <img id="info-img1" src="/static/main/images/categories.png" alt="ad-img1">
                                <p id="blog-time">${object.category}</p>
                            </div>
                        </div>
                    </div>
                    <div id="post-box-content">
                        <div class="blog-box-title-div">
                            <h3 id="box-title-text">${object.name}</h3>
                        </div>
                        <div class="blog-box-desc-div">
                            <p id="box-body-text">${object.description}</p>
                        </div>
                    </div>
                    <div class="blog-box-bottom">
                        <a class="nav-link" href="/blogs/${object.name}">
                            <div id="post-box-button">
                                <p>Visit blog</p>
                            </div>
                        </a>
                    </div>
                </div>
                `;
                container.append(mainDiv);
            }

            else {
                mainDiv.innerHTML =`
                <div class="blog-box">
                    <div id="post-box-image">
                        <img id="post-img" src=${object.image} alt="post-img">
                        <div class="info-wrapper">
                            <div class="blog-info-2">
                                <div class="blog-info-box">
                                    <img id="info-img1" src="/static/main/images/Calendar.png" alt="ad-img1">
                                    <p id="blog-time">${object.created}</p>
                                </div>
                            </div>
                            <div class="blog-info-3" style="background-color:${object.color}">
                                <img id="info-img1" src="/static/main/images/categories.png" alt="ad-img1">
                                <p id="blog-time">${object.category}</p>
                            </div>
                        </div>
                    </div>
                    <div id="post-box-content">
                        <div class="blog-box-title-div">
                            <h3 id="box-title-text">${object.title}</h3>
                        </div>
                        <div class="blog-box-desc-div">
                            <p id="box-body-text">${object.body}</p>
                        </div>
                    </div>
                    <div class="blog-box-bottom">
                        <a class="nav-link" href="/view/${object.blog}/${object.title}">
                            <div id="post-box-button">
                                <p>Read more</p>
                            </div>
                        </a>
                    </div>
                </div>
                `;

                container.append(mainDiv);
            }
        });

        // Clear leftover pagination if any remain
        let check = document.querySelector('.category-page') !== null
        if (check === true) {
            document.querySelector('.category-page').remove();
        }

        // Paginate results
        paginate_results(0, maxPages);
    })
}

function paginate_results(page, maxPages) {

    // Select all filtered objects
    const Boxes = document.querySelectorAll('#select-ctg');
    
    // See what page the user is currently on and how many pages exists(when page is 0, user should see 1)
    const currentPage = page + 1;
    const previousPage = page - 1;
    const lastPage = maxPages - 1;

    // Select which objects should show up on the current page 
    var objectend = ((page + 1) * 11 + page);
    var objectstart = (page * 11) + page;

    // Hide objects that fall outside permited variables, show objects within
    var i = 0;
    Boxes.forEach(box => {
        if (i < objectstart || i > objectend ) {
            box.className = "ctg-wrapper";
        }
        else if (box.className == "ctg-wrapper") {
            box.className = "ctg-wrapper active";
        }
        i = i + 1;
    })

    // Set pagination links, show only if multiple pages exist
    if (maxPages > 1) {
        const container = document.querySelector('.main-body');

        // Remove previous paginators if any remain
        let check = document.querySelector('.category-page') !== null
        if (check === true) {
            document.querySelector('.category-page').remove();
        }

        // Create pagination elements
        const pagination = document.createElement('div');
        pagination.setAttribute('class', 'category-page');

        const stepLink = document.createElement('span');
        stepLink.setAttribute('class', 'step-links')

        // Fill stepLink element depending on the existence of previous or next pages
        let previous = "";

        if (currentPage != 1) {
            previous=`
            <a class='current-link' onclick="event.preventDefault(), paginate_results(0, ${maxPages})">&laquo; first</a>
            <a class='current-link' onclick="event.preventDefault(), paginate_results(${previousPage}, ${maxPages})">previous</a>
            `;
        }

        let next = "";

        if (currentPage != maxPages) {
            next =`
            <a class='current-link' onclick="event.preventDefault(), paginate_results(${currentPage}, ${maxPages})">next</a>
            <a class='current-link' onclick="event.preventDefault(), paginate_results(${lastPage}, ${maxPages})">last &raquo;</a>
            `;
        }

        stepLink.innerHTML=`
        ${previous}
        <span class="current">
            Page ${currentPage} of ${maxPages}.
        </span>
        ${next}
        `

        // Append stepLink to pagination div
        pagination.append(stepLink);

        // Append pagination to body
        container.append(pagination);
    }

    window.scrollTo(0,0);
}