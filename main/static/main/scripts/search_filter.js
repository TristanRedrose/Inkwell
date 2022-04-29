document.addEventListener('DOMContentLoaded', function() {
    search_filter("all");
})

function search_filter(category) {

    const activeButton = document.querySelectorAll('.category-button.active');
    activeButton.forEach(button => {
        button.className = "category-button";
    })
    const button = document.getElementById(`${category}`);
    button.className = "category-button active";

    const button2 = document.getElementById(`${category}-mobile`);
    button2.className = "category-button active";

    const results = document.querySelectorAll('.wrapper');

    if (document.querySelector('.category-page')) {
        document.querySelector('.category-page').remove();
    }

    if (category === "all") {
        results.forEach(result => {  
            result.className = "wrapper";
            result.setAttribute('id', 'select-ctg')
        })
    }
    else {
        results.forEach(result => {
            if (result.querySelector('.blog-category').innerText == category ) {
                result.className = "wrapper";
                result.setAttribute('id', 'select-ctg')
            }

            else if (result.querySelector('.blog-category').innerText != category) {
                result.className = "wrapper hidden";
                result.removeAttribute('id')
            }
        })

        if (document.querySelector('.ctg-wrapper.active')) {
            document.querySelector('.ctg-wrapper.active').remove();
        }
    }

    const filteredResults = document.querySelectorAll('#select-ctg')
    let maxPages = Math.ceil(filteredResults.length / 12)
    console.log(maxPages)

    if (maxPages == 0) {
        
        if (document.querySelector('.ctg-wrapper.active')) {
            document.querySelector('.ctg-wrapper.active').remove();
        }

        const container = document.querySelector('.post-search-div')
        const mainDiv = document.createElement('div');
        mainDiv.setAttribute('class', 'ctg-wrapper active');

        mainDiv.innerHTML=`
        <h3>No results found</h3>
        <img id="ad-img1" src="/static/main/images/undraw_not_found_-60-pq.svg" alt="not found">
        `;
        container.append(mainDiv);
    }

    paginate_results(0, maxPages)
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
            box.className = "wrapper hidden";
        }
        else if (box.className == "wrapper hidden") {
            box.className = "wrapper";
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
