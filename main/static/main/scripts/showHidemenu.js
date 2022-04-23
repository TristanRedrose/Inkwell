document.addEventListener('DOMContentLoaded', function() {

    const menuIcon = document.querySelector('.menu-icon');
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
})