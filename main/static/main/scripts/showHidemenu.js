document.addEventListener('DOMContentLoaded', function() {


    const menuIcon = document.querySelector('.menu-icon');
    if (menuIcon) {
    const menu = document.querySelector('.menu');
    
        menuIcon.addEventListener('click', function() {

            if (menu.className === "menu") {
                menu.className = "menu active";
            }

            else {
                menu.className = "menu";
            }
        })

        window.addEventListener("resize", function() {
            
            if (window.matchMedia("(min-width: 600.10px)").matches && menu.className === "menu active") {
                menu.className = "menu";
            }
        })
    }
})

function showHide_categories() {
    
    const create = document.querySelector('.create-selector');
    const buttonsDiv = document.querySelector('.buttons-div');

    if (buttonsDiv.className === "buttons-div active") {
        buttonsDiv.className = "buttons-div";
        create.className = "create-selector";
    }

    const search = document.querySelector('.search-selector');
    const searchDiv = document.querySelector('.search-div');

    if (searchDiv.className === "search-div active") {
        searchDiv.className = "search-div";
        search.className = "search-selector";
    }

    const select = document.querySelector('.category-selector');
    const categoryBox = document.querySelector('.category-select');

    if (categoryBox.className === "category-select active") {
        categoryBox.className = "category-select";
        select.className = "category-selector";
    }

    else {
        categoryBox.className = "category-select active";
        select.className = "category-selector active";
    }

    rotate_arrow(select)
}

function showHide_create() {

    const select = document.querySelector('.category-selector');
    const categoryBox = document.querySelector('.category-select');

    if (categoryBox.className === "category-select active") {
        categoryBox.className = "category-select";
        select.className = "category-selector";
    }

    const search = document.querySelector('.search-selector');
    const searchDiv = document.querySelector('.search-div');

    if (searchDiv.className === "search-div active") {
        searchDiv.className = "search-div";
        search.className = "search-selector";
    }

    const create = document.querySelector('.create-selector');
    const buttonsDiv = document.querySelector('.buttons-div');

    if (buttonsDiv.className === "buttons-div active") {
        buttonsDiv.className = "buttons-div";
        create.className = "create-selector";
    }

    else {
        buttonsDiv.className = "buttons-div active";
        create.className = "create-selector active";
    }

    rotate_arrow(create)
}

function showHide_search() {

    const select = document.querySelector('.category-selector');
    const categoryBox = document.querySelector('.category-select');

    if (categoryBox.className === "category-select active") {
        categoryBox.className = "category-select";
        select.className = "category-selector";
    }

    const create = document.querySelector('.create-selector');
    const buttonsDiv = document.querySelector('.buttons-div');

    if (buttonsDiv.className === "buttons-div active") {
        buttonsDiv.className = "buttons-div";
        create.className = "create-selector";
    }

    const search = document.querySelector('.search-selector');
    const searchDiv = document.querySelector('.search-div');

    if (searchDiv.className === "search-div active") {
        searchDiv.className = "search-div";
        search.className = "search-selector"
    }

    else {
        searchDiv.className = "search-div active";
        search.className = "search-selector active";
    }

    rotate_arrow(search)
}

function rotate_arrow(element) {
    
    const mainArrow = element.querySelector('.rotate-span')
    const arrows = document.querySelectorAll('.rotate-span')
    arrows.forEach(arrow => {

        if (arrow != mainArrow) {
            if (arrow.className === "rotate-span active") {
            arrow.className = "rotate-span";
            }
        }
    })

    if (mainArrow.className === "rotate-span active") {
        mainArrow.className = "rotate-span";
    }

    else {
        mainArrow.className = "rotate-span active";
    }
    
}