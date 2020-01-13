'use strict';

var App = (function (global) {

    //global variables
    var doc = global.document,
        win = global.window

    // init function
    // controls setting up the application
    function init() {
        console.log('starting application');
    }

    function menuIcon() {
        var icon = doc.createElement("IMG");
        icon.setAttribute('src', '/assets/menu-24px-light.svg');
        icon.classList.add('toggle');
        return icon
    }

    function closeIcon() {
        var icon = doc.createElement("IMG");
        icon.setAttribute('src', '/assets/close-24px-light.svg');
        icon.classList.add('toggle');
        return icon
    }

    function toggleMenu() {

        var menu = doc.getElementsByClassName('menu')[0];

        if (menu.classList.contains('open') === false) {

            menu.classList.add('open');
            doc.getElementsByClassName('fab')[0].innerHTML = '';
            doc.getElementsByClassName('fab')[0].appendChild(closeIcon())
        } else {

            menu.classList.remove('open');
            doc.getElementsByClassName('fab')[0].innerHTML = '';
            doc.getElementsByClassName('fab')[0].appendChild(menuIcon())
        }

    }

    // render function
    // controls visual rendering of application
    function render() {
        console.log('rendering application');
        

        
    }

    // main function
    // controls application behavior
    function main() {
        init();
        render();
        // add menu toggle function
        doc.addEventListener('click', function(e){
            console.log(e.target);
            if(e.target.classList.contains('toggle')){
            
                toggleMenu();
            }
        })
    }

    // call the main function and run the application
    main();

})(this);