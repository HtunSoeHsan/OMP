
window.addEventListener('DOMContentLoaded', event => {
    // if(sessionStorage.getItem("user")){
    //     // document.getElementById("profile").innerHTML
    // }
    console.log(JSON.parse(localStorage.getItem("userobj")));
    const user = JSON.parse(localStorage.getItem("userobj"));
    const shop = JSON.parse(localStorage.getItem("shopadmin"));
    const shopadminId = localStorage.getItem("shopadminId");

// user profile
 if(user && shop || shopadminId){
    document.getElementById("login").classList.add("hide-me");
    document.getElementById("admin").classList.remove("hide-me")
    document.getElementById("profile_container").classList.remove("hide-me");
    document.getElementById("beshop").classList.add("hide-me");
    }
    else if(user){
        document.getElementById("login").classList.add("hide-me")
        document.getElementById("profile_container").classList.remove("hide-me")
        }
        
        
//  user logout

document.getElementById("logout").addEventListener("click",logout)

    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }

    };

    // Shrink the navbar 
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            offset: 74,
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

});

var  logout = ()=>{
    localStorage.clear();
 }