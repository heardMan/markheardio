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
        carousel2 = function () {
            var data2 = {
                "carouselItems": [
                    {
                    "title": "Consultations",
                    "link": "https://github.com/heardMan/fitStat",
                    "linkTitle": "link",
                    "description": "Not sure where to start or what you need?\n Feel free to reach out to schedule a consultation!"
                    },
                    {
                    "title": "Web Development",
                    "link": "https://github.com/heardMan/fitStat",
                    "linkTitle": "link",
                    "description": "Need a website?\n From self-managed to fully-managed I can help find and/or build the solution that is right for you and your business."
                    },
                    {
                    "title": "Software Development",
                    "link": "https: //github.com/heardMan/fitStat",
                    "linkTitle": "link",
                    "description": "Need an application?\n I specialize in develeoping and maintaining modern scalable web applications and would love to help get your next application up an running!"
                    },
                    {
                    "title": "Web Hosting Solutions",
                    "link": "https://github.com/heardMan/fitStat",
                    "linkTitle": "link",
                    "description": "Need help hosting your website?\n I am experienced and familiar in hosting a variety of websites and would love to help find the best fitting solution."
                    },
                    {
                    "title": "Data Analytics",
                    "link": "https://github.com/heardMan/fitStat",
                    "linkTitle": "link",
                    "description": "Got Business Data that you need help organizing?\n Business Analytics is what sparked my interest in software development! I enjoy helping business owners find new and exciting opportunities within their own business data."
                    }
                ]
            }

            return carouselInit(doc, data2.carouselItems);
            
        },
        gallery = function () {
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    // Typical action to be performed when the document is ready:
                    // document.getElementById("demo").innerHTML = xhttp.responseText;
                    var data = JSON.parse(xhttp.responseText);
                    console.log(data);
                    return galleryInit(doc, data.projects);
                }
            };
            xhttp.open("GET", './data/projects.json', true);
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
        // var menuItems = doc.getElementsByClassName('menu-item')
        // console.log(menuItems);
        // for(var i = 0; i < menuItems.length; i++){
        //     var menuItem = menuItems[i];
        //     if (menuItem.classList.contains('menuOpen') === false){
        //         menuItem.classList.add('menuOpen');
        //         doc.getElementsByClassName('fab')[0].innerHTML = '';
        //         doc.getElementsByClassName('fab')[0].appendChild(menuIcon())
        //     } else {
        //         menuItem.classList.remove('menuOpen');
        //         doc.getElementsByClassName('fab')[0].innerHTML = '';
        //         doc.getElementsByClassName('fab')[0].appendChild(closeIcon())
        //     }


        // }

        if (menu.classList.contains('menuOpen') === false) {

            menu.classList.add('menuOpen');
            doc.getElementsByClassName('fab')[0].innerHTML = '';
            doc.getElementsByClassName('fab')[0].appendChild(closeIcon())
        } else {

            menu.classList.remove('menuOpen');
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


    function welcomeScroll() {

        var consultations = document.querySelector('.consultations');
        //var text2 = document.querySelector('.anim-2');
        //var text3 = document.querySelector('.anim-3');
        //var text4 = document.querySelector('.anim-4');
        //var text5 = document.querySelector('.anim-5');

        var observe = function (entries,animation){

            var observer = new IntersectionObserver((entries)=>{
                console.log(entries)
                if(entries[0].intersectionRatio>0){
                    
                    entries[0].target.style.background = 'linear-gradient(270deg, rgba(4,79,103,1) 0%, rgba(0,0,0,0) 200%)';
                    entries[0].target.style['margin-left'] = '-95vw';

                    var val = 95
                    var moveIn = setInterval(function(){
                        val--;
                        entries[0].target.style['margin-left'] = `-${val}vw`;
                        
                        if ( val < 4 ) {
                            clearInterval(moveIn);
                        }

                    },10)

                    var value = 300
                    var fadeIn = setInterval(function(){

                        value--;
                        
                        if (value < 200) {
                            entries[0].target.style.background = `linear-gradient(270deg, rgba(4,79,103,1) 0%, rgba(0,0,0,0) ${value}%)`;
                        }
                        if (value < 11) {
                            clearInterval(fadeIn);
                        }

                    },10)
                        
                    
                    
                }
                else {
                    entries[0].target.style.animation = 'none';
                }
            });

            return observer.observe(entries)

        }
        //moveInFromLeft 1s linear 1

        observe(consultations, '');
        //observe(text2, 'fadeInFromRight 2s forwards ease-out');
        //observe(text3, 'fadeInFromLeft 2s forwards ease-out');
        //observe(text4, 'fadeInFromRight 2s forwards ease-out');
        //observe(text5, 'anim4 2s forwards ease-out');

    }


    function aboutScroll() {

        var text1 = document.querySelector('.anim-1');
        var text2 = document.querySelector('.anim-2');
        var text3 = document.querySelector('.anim-3');
        var text4 = document.querySelector('.anim-4');
        //var text5 = document.querySelector('.anim-5');

        var observe = function (entries,animation){

            var observer = new IntersectionObserver((entries)=>{
                console.log(entries)
                if(entries[0].intersectionRatio>0){
                    entries[0].target.style.animation = animation;
                }
                else {
                    entries[0].target.style.animation = 'none';
                }
            });

            return observer.observe(entries)

        }

        observe(text1, 'fadeInFromLeft 2s forwards ease-out');
        observe(text2, 'fadeInFromRight 2s forwards ease-out');
        observe(text3, 'fadeInFromLeft 2s forwards ease-out');
        observe(text4, 'fadeInFromRight 2s forwards ease-out');
        //observe(text5, 'anim4 2s forwards ease-out');

    }





    // render function
    // controls visual rendering of application
    function renderPageContent() {

        console.log(win.location.pathname);
        if (win.location.pathname === '/') {
            welcomeScroll();
                // car2();

            //carousel();

        } else if (win.location.pathname === '/Users/markheard/Desktop/markheardio/index.html') {
            welcomeScroll();
            //carousel2()

        } else if (win.location.pathname === '/portfolio') {
            gallery();
        } else if (win.location.pathname === '/contact') {
            validateContactForm();

        } else if (win.location.pathname === '/Users/markheard/Desktop/markheardio/about.html') {
            aboutScroll();
            console.log('working')

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