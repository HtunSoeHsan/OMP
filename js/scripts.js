/*!
* Start Bootstrap - Agency v7.0.11 (https://startbootstrap.com/theme/agency)
* Copyright 2013-2022 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-agency/blob/master/LICENSE)
*/
//
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {
    // if(sessionStorage.getItem("user")){
    //     // document.getElementById("profile").innerHTML
    // }
    console.log(JSON.parse(sessionStorage.getItem("user")))
    const user = JSON.parse(sessionStorage.getItem("user")) || "null"
    console.log("user name", user.name)
    // document.getElementById("profile").parentElement.TEXT_NODE ="htun";
{/* <ul class="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"><i class="fas fa-user fa-fw"></i></a>
                    <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                        <li><a class="dropdown-item" href="#!">Settings</a></li>
                        <li><a class="dropdown-item" href="#!">Activity Log</a></li>
                        <li><hr class="dropdown-divider" /></li>
                        <li><a class="dropdown-item" href="#!">Logout</a></li>
                    </ul>
                </li>
            </ul> */}

            // var profileContainer = document.getElementById("profile-container");
            // var profile_main_li = document.createElement("li");
            // var profile_a = document.createElement("a");
            // var profile_ul = document.createElement("ul");
            // var profile_li1 = document.createElement("li");
            // var profile_li2 = document.createElement("li");
            // var profile_li3 = document.createElement("li");

            // profile_li1.classList.add("dropdown-item","herf="",)


// user profile
    if(user!="null"){
       
        document.getElementById("profile_name").innerHTML = user.name;
        document.getElementById("login").style.display = "none";
        document.getElementById("profile_container").style.display = "block";
    }
    else{
        document.getElementById("login").style.display = "block";
        document.getElementById("profile_container").style.display = "none";
        
        }

//  user logout
function logout(){
    sessionStorage.removeItem("user");
 }
document.getElementById("logout").addEventListener("click",logout())
 
 
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
