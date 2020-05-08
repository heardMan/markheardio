'use strict';

var App = (function (global) {

    //global variables
    var doc = global.document,
        win = global.window,
        selectedCarousel = 0,
        carousel = function () {
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    // Typical action to be performed when the document is ready:
                    // document.getElementById("demo").innerHTML = xhttp.responseText;
                    var data = JSON.parse(xhttp.responseText);
                    return carouselInit(doc, data.carouselItems);
                }
            };
            xhttp.open("GET", './data/carouselItems.json', true);
            xhttp.send();
        },
        gallery = function () {
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    // Typical action to be performed when the document is ready:
                    // document.getElementById("demo").innerHTML = xhttp.responseText;
                    var data = JSON.parse(xhttp.responseText);
                    return galleryInit(doc, data.carouselItems);
                }
            };
            xhttp.open("GET", './data/carouselItems.json', true);
            xhttp.send();
        }

    // init function
    // controls setting up the application
    function init() {
        console.log('starting application');
        renderPageContent();
        
    }

    function menuIcon() {
        var icon = doc.createElement("IMG");
        icon.setAttribute('src', './assets/menu-24px-light.svg');
        icon.setAttribute('alt', 'close menu icon');
        icon.classList.add('toggle');
        return icon
    }

    function closeIcon() {
        var icon = doc.createElement("IMG");
        icon.setAttribute('src', './assets/close-24px-light.svg');
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

    function galleryInit(doc, data) {
        console.log('rendering gallery');
        console.log(data);
        var galleryElem = doc.getElementById('gallery');
        if (galleryElem) {
            for (var i = 0; i < data.length; i++) {
                var currentProj = data[i];
                var projectCard = doc.createElement('DIV');
                projectCard.setAttribute('class', 'project card');
                var title = doc.createElement('DIV');
                var titleText = doc.createElement('H3');
                titleText.textContent = currentProj.name
                title.append(titleText);
                var githubLink = doc.createElement('A');
                githubLink.textContent = 'Technical Documentation';
                githubLink.setAttribute('href', currentProj.github);
                var demoLink = doc.createElement('A');
                demoLink.textContent = 'Live Demo'
                demoLink.setAttribute('href', currentProj.demo)
                var description = doc.createElement('P');
                description.textContent = currentProj.description;

                projectCard.append(title);
                projectCard.append(description);
                projectCard.append(githubLink)
                projectCard.append(doc.createElement('HR'));
                projectCard.append(demoLink)


                galleryElem.append(projectCard);

            }
        }

    }

    function carouselInit(doc,data) {
        console.log('rendering carousel');
        console.log(data);
        
        var carouselElem = doc.getElementsByClassName('carousel-content')[0];

        if (carouselElem) {
            for (var i = 0; i < data.length; i++) {
                var contentCard = doc.createElement('DIV');
                contentCard.setAttribute('key', i);
                if (i === selectedCarousel) {
                    contentCard.setAttribute('class', 'carousel-item card selected');
                } else {
                    contentCard.setAttribute('class', 'carousel-item card');
                }
                var title = doc.createElement('H3');
                title.textContent = data[i].title;
                var description = doc.createElement('P');
                description.textContent = data[i].description;

                contentCard.appendChild(title);
                contentCard.appendChild(description);
                carouselElem.appendChild(contentCard);
            }

                    // create a click listener 
        doc.addEventListener('click', function (e) {

            if (e.target.classList.contains('right-btn')) {

                var carouselContent = doc.getElementsByClassName('carousel-content')[0].children;
                carouselContent[selectedCarousel].classList.remove('selected');

                if (selectedCarousel < data.length - 1) {
                    selectedCarousel++;
                } else {
                    selectedCarousel = 0;
                }

                


                carouselContent[selectedCarousel].classList.add('selected');
            }

            if (e.target.classList.contains('left-btn')) {

                var carouselContent = doc.getElementsByClassName('carousel-content')[0].children;
                carouselContent[selectedCarousel].classList.remove('selected');
                if (0 < selectedCarousel) {
                    selectedCarousel--;
                } else {
                    selectedCarousel = data.length - 1;
                }
               
                carouselContent[selectedCarousel].classList.add('selected');
            }

        });
        }


    }

    function sendMessage(message) {

        // Example POST method implementation:
        async function postData(url, data) {
            // Default options are marked with *
            const response = await fetch(url, {
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                mode: 'cors', // no-cors, *cors, same-origin
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'same-origin', // include, *same-origin, omit
                headers: {
                    'Content-Type': 'application/json'
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                redirect: 'follow', // manual, *follow, error
                referrerPolicy: 'no-referrer', // no-referrer, *client
                body: JSON.stringify(data) // body data type must match "Content-Type" header
            });
            return await response.json(); // parses JSON response into native JavaScript objects
        }

        postData('https://markheardio-contct-form-servce.herokuapp.com/', message)
            .then((data) => {
                console.log(data); // JSON data parsed by `response.json()` call
            });

    }




    function validateContactForm() {
        var name = document.getElementById('name');
        var email = document.getElementById('email');
        var message = document.getElementById('message');

        function nameChange(e) {
            console.log(e);

            if (name.value.length < 2) {
                name.classList.remove("green-outline");
                name.classList.add("red-outline");
                if (!doc.getElementById('nameWarning')) {
                    var nameWarning = doc.createElement('DIV');
                    nameWarning.setAttribute('id', 'nameWarning');
                    nameWarning.classList.add('warning');
                    nameWarning.textContent = 'Please type your name'
                    name.parentElement.appendChild(nameWarning);
                }
            }

            if (name.value.length >= 2) {
                name.classList.remove("red-outline");
                name.classList.add("green-outline");

                if (doc.getElementById('nameWarning')) {
                    doc.getElementById('nameWarning').remove();
                }
            }

        }
        name.onselect = nameChange;
        name.oninput = nameChange;
        name.onchange = nameChange;

        function blurNameInput(e) {
            console.log(e);
            if (name.value.length === 0) {
                name.classList.remove("red-outline");
                name.classList.remove("green-outline");

                if (doc.getElementById('nameWarning')) {
                    doc.getElementById('nameWarning').remove();
                }
            }
        }

        name.onblur = blurNameInput;


        function emailChange(e) {
            if (email.value.length < 6) {
                email.classList.remove("green-outline");
                email.classList.add("red-outline");

                if (!doc.getElementById('emailWarning')) {
                    var emailWarning = doc.createElement('DIV');
                    emailWarning.setAttribute('id', 'emailWarning');
                    emailWarning.classList.add('warning');
                    emailWarning.textContent = 'Please type your email'
                    email.parentElement.appendChild(emailWarning);
                }
            }

            if (email.value.length >= 6) {
                email.classList.remove("red-outline");
                email.classList.add("green-outline");

                if (doc.getElementById('emailWarning')) {
                    doc.getElementById('emailWarning').remove();
                }
            }

        }

        email.onselect = emailChange;
        email.oninput = emailChange;
        email.onchange = emailChange;

        function blurEmailInput(e) {
            console.log(e);
            if (email.value.length === 0) {
                email.classList.remove("red-outline");
                email.classList.remove("green-outline");

                if (doc.getElementById('emailWarning')) {
                    doc.getElementById('emailWarning').remove();
                }
            }
        }

        email.onblur = blurEmailInput;

        function messageChange(e) {
            if (message.value.length < 2) {
                message.classList.remove("green-outline");
                message.classList.add("red-outline");
                if (!doc.getElementById('messageWarning')) {
                    var messageWarning1 = doc.createElement('DIV');
                    messageWarning1.setAttribute('id', 'messageWarning');
                    messageWarning1.classList.add('warning');
                    messageWarning1.textContent = 'Please type a short message'
                    message.parentElement.appendChild(messageWarning1);
                }
            }

            if (message.value.length > 250) {
                message.classList.remove("green-outline");
                message.classList.add("red-outline");
                if (!doc.getElementById('messageWarning')) {
                    var messageWarning2 = doc.createElement('DIV');
                    messageWarning2.setAttribute('id', 'messageWarning');
                    messageWarning2.classList.add('warning');
                    messageWarning2.textContent = 'Please type a short message'
                    message.parentElement.appendChild(messageWarning2);
                }
            }

            if (message.value.length >= 2 && message.value.length <= 250) {
                message.classList.remove("red-outline");
                message.classList.add("green-outline");

                if (doc.getElementById('messageWarning')) {
                    doc.getElementById('messageWarning').remove();
                }
            }
        }

        message.onselect = messageChange;
        message.oninput = messageChange;
        message.onchange = messageChange;

        function blurMessageInput(e) {
            console.log(e);
            if (message.value.length === 0) {
                message.classList.remove("red-outline");
                message.classList.remove("green-outline");

                if (doc.getElementById('messageWarning')) {
                    doc.getElementById('messageWarning').remove();
                }
            }
        }

        message.onblur = blurMessageInput;

    }


    function resetContactFormStyling() {

        var name = document.getElementById('name');
        var email = document.getElementById('email');
        var message = document.getElementById('message');

        name.classList.remove("red-outline");
        email.classList.remove("red-outline");
        message.classList.remove("red-outline");

        name.classList.remove("green-outline");
        email.classList.remove("green-outline");
        message.classList.remove("green-outline");

        if (nameWarning) {
            nameWarning.remove()
        }

        if (emailWarning) {
            emailWarning.remove()
        }

        if (messageWarning1) {
            messageWarning1.remove()
        }

        if (messageWarning2) {
            messageWarning2.remove()
        }

    }





    // render function
    // controls visual rendering of application
    function renderPageContent() {

        console.log(win.location.pathname);
        if (win.location.pathname === '/' ||
            win.location.pathname === '/Users/mark/Desktop/markheardio/index.html') {
                // car2();

            carousel();

        } else if (win.location.pathname === '/portfolio') {
            gallery();
        } else if (win.location.pathname === '/contact') {
            validateContactForm();

        }

    }


    // main function
    // controls application behavior
    function main() {


        init();



        // create a click listener 
        doc.addEventListener('click', function (e) {


            if (e.target.classList.contains('toggle')) {
                toggleMenu();
                console.log('click');
            }

            // if (e.target.classList.contains('right-btn')) {

            //     var carouselContent = doc.getElementsByClassName('carousel-content')[0].children;
            //     carouselContent[selectedCarousel].classList.remove('selected');

            //     if (selectedCarousel < carouselItems.length - 1) {
            //         selectedCarousel++;
            //     } else {
            //         selectedCarousel = 0;
            //     }

            //     //console.log(selectedCarousel)


            //     carouselContent[selectedCarousel].classList.add('selected');
            // }

            // if (e.target.classList.contains('left-btn')) {

            //     var carouselContent = doc.getElementsByClassName('carousel-content')[0].children;
            //     carouselContent[selectedCarousel].classList.remove('selected');
            //     if (0 < selectedCarousel) {
            //         selectedCarousel--;
            //     } else {
            //         selectedCarousel = carouselItems.length - 1;
            //     }
            //     //console.log(selectedCarousel);
            //     carouselContent[selectedCarousel].classList.add('selected');
            // }

            if (e.target.id === 'sendMessage') {

                console.log('sending message');

            }

        });


    }


    main();



})(this);