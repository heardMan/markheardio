'use strict';

var App = (function (global) {

    //global variables
    var doc = global.document,
        win = global.window,
        selectedCarousel = 0,
        carousel = function () {
            // var xhttp = new XMLHttpRequest();
            // xhttp.onreadystatechange = function () {
            //     if (this.readyState == 4 && this.status == 200) {
            //         // Typical action to be performed when the document is ready:
            //         // document.getElementById("demo").innerHTML = xhttp.responseText;
            //         var data = JSON.parse(xhttp.responseText);

            //         return carouselInit(doc, data.carouselItems);
            //     }
            // };
            // xhttp.open("GET", './data/carouselItems.json', true);
            // xhttp.send();

            var data = [
                {
                    "title": "React Date Selector",
                    "github": "https://github.com/heardMan/react-date-selector",
                    "demo": "https://heardman.github.io/react-date-selector/",
                    "description": "A better date selection experience from the ground up-- custom input and date logic."
                },
                {
                    "title": "Restaurant Reviews",
                    "github": "https://github.com/heardMan/restaurantReviews",
                    "demo": "https://heardman.github.io/restaurantReviews/",
                    "description": "A map-based restaurant search application. The application is fully responsive and follows offline first principles."
                },
                {
                    "title": "Dodge 'em",
                    "github": "https://github.com/heardMan/udacity-arcade-game",
                    "demo": "https://heardman.github.io/udacity-arcade-game/",
                    "description": "A mobile friendly game that can be played with either the onscreen direction pad or a keyboard direction pad. The game is very a frogger clone."
                },
                {
                    "title": "Concentrate",
                    "github": "https://github.com/heardMan/concentrate-js",
                    "demo": "https://heardman.github.io/concentrate-js/",
                    "description": "A card matching game. Click on a card to reveal its icon. Match all the card pairs to win the game. "
                },
                {
                    "title": "Trivia Game",
                    "github": "https://github.com/heardMan/TriviaGame",
                    "demo": "https://heardman.github.io/TriviaGame/",
                    "description": "This is a multiple choice quiz application that tests a user's knowledge of javascript array methods. See how many answers you can get correct!"
                }
            ]
            return carouselInit(doc, data);
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

    function carouselInit(doc, data) {
        console.log('rendering carousel');
        console.log(data);

        var carouselElem = doc.getElementsByClassName('carousel-content')[0];



        if (carouselElem) {

            var isDragging = false;
            var startPos = 0;
            var currentTranslate = 0;
            var prevTranslate = 0;
            var animationID = 0;
            var currentSlideIndex = 0;

            //create a starter array
            var inView = data.slice(0,3);
            console.log("In View:");
            console.log(inView);

            function animation(){
                setContentCardPosition();
                
                if(isDragging) {
                    requestAnimationFrame(animation)
                }
            }

            function getPositionX(event){
                if(event.type.includes('mouse')){
                    return event.pageX;
                } else {
                    return event.touches[0].clientX;
                }
                
            }

            function setPositionByIndex(){
                if(currentSlideIndex<0){
                    currentSlideIndex=4
                }
                if(currentSlideIndex>4){
                    currentSlideIndex=0
                }
                currentTranslate = currentSlideIndex * -window.innerWidth
                prevTranslate = currentTranslate
                setContentCardPosition()
            }

            function setContentCardPosition(){
                carouselElem.style.transform =  'translateX('+currentTranslate+'px)'; 
            }



            function touchStart(idx) {
                return function(event){
                    console.log(event.target)
                    startPos = getPositionX(event)
                    console.log(startPos);
                    currentSlideIndex=idx;
                    isDragging = true;
                    animationID = requestAnimationFrame(animation)
                }
            }

            function touchEnd() {
                isDragging = false;
                cancelAnimationFrame(animationID)
                var movedBy = currentTranslate - prevTranslate;

                if(movedBy < -100 && currentSlideIndex < data.length-1){
                    currentSlideIndex += 1;
                }

                if(movedBy > 100 && currentSlideIndex > 0){
                    currentSlideIndex -= 1;
                }
                setPositionByIndex()
            }

            function touchMove(event) {
                if(isDragging){
                    console.log('move')
                    var currentPos = getPositionX(event);
                    currentTranslate = prevTranslate + currentPos - startPos
                }
                
            }

            function createCard(index, title, description, gitHub, demo) {

                //empty content card
                var contentCard = doc.createElement('DIV');
                contentCard.classList.add('carousel-item');

                //container element
                var contentContainer = doc.createElement('DIV');
                contentContainer.classList.add('carousel-item-content');

                //title element
                var titleElem = doc.createElement('H3');
                titleElem.textContent = title;

                //description element
                var descriptionElem = doc.createElement('P');
                descriptionElem.textContent = description;

                //link Container element
                var linkContainer = doc.createElement('DIV');
                linkContainer.classList.add('carousel-item-links')

                //gitHub link element
                var gitHubLinkElem = doc.createElement('A');
                gitHubLinkElem.href = gitHub;
                gitHubLinkElem.textContent = "See Docs";

                //demo link element
                var demoLinkElem = doc.createElement('A');
                demoLinkElem.href = demo;
                demoLinkElem.textContent = "See Demo";

                //add elements to content card
                contentContainer.appendChild(titleElem);
                contentContainer.appendChild(descriptionElem);
                linkContainer.appendChild(gitHubLinkElem);
                linkContainer.appendChild(demoLinkElem);
                contentContainer.appendChild(linkContainer);
                contentCard.appendChild(contentContainer);

                contentCard.addEventListener('touchstart', touchStart(index));
                contentCard.addEventListener('touchend', touchEnd);
                contentCard.addEventListener('touchmove', touchMove);

                contentCard.addEventListener('mousedown', touchStart(index));
                contentCard.addEventListener('mouseup', touchEnd);
                contentCard.addEventListener('mouseleave', touchEnd);
                contentCard.addEventListener('mousemove', touchMove);

                //add card element to carousel element
                carouselElem.appendChild(contentCard);

                return contentCard;
            }

            //populate the carousel with the desired elements
            for (var i = 0; i < data.length; i++) {
                // console.log(inView[i])
                var index = i;
                var title = data[i].title;
                var description = data[i].description;
                var gitHub = data[i].gtiHub;
                var demo = data[i].demo;
                
                createCard(index, title, description, gitHub, demo);

            }
            
            // create a click listener
            var rightBtn = doc.getElementById('right-btn');
            var leftBtn = doc.getElementById('left-btn');

            rightBtn.addEventListener('click', function (e) {
                currentSlideIndex += 1;
                setPositionByIndex()
                //console.log(currentSlideIndex)

            });

            leftBtn.addEventListener('click', function (e) {
                currentSlideIndex -= 1;
                setPositionByIndex()
                //console.log(currentSlideIndex)

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


    function consultationsAnimation() {

        var element = document.querySelector('.consultations');
        //console.log(`SCREEN HEIGHT: ${window.innerHeight}`)
        //console.log(`ELEMENT HEIGHT: ${element.clientHeight}`)

        function handleScroll(e) {
            //when the observer starts the element is at the bottom of the screen 
            //or about the distance of the inner window height
            //indicates current pixel height into the intersection rectangle being observed
            var boundingRect = element.getBoundingClientRect();
            var animationHeightIncrementer = (window.innerHeight - boundingRect.y);
            var animationWindowPercentage = boundingRect.y / window.innerHeight;
            var elementOnScreenHeight = window.innerHeight - element.clientHeight
            var animationPercentage = (animationHeightIncrementer - element.clientHeight) / (elementOnScreenHeight);
            var lowerBound = 0.15;
            var upperBound = 0.75;
            var animationDistancePercentage = animationPercentage - lowerBound;
            var speedMultiplier = 180

            // console.log(`
            //     PAGE Y OFFSET: ${window.pageYOffset}
            //     CLIENT HEIGHT: ${element.clientHeight}
            //     INNER WINDOW HEIGHT: ${window.innerHeight}
            //     ANIMATE WINDOW PERCENT: ${animationWindowPercentage}
            //     ANIMATION HEIGHT INCREMENTOR: ${animationHeightIncrementer}
            //     ANIMATION PERCENTAGE: ${animationPercentage}
            //     A: ${85 - (animationDistancePercentage * speedMultiplier)}
            //     `);

            //if the object is completely on screen animate into and out of view
            if (animationHeightIncrementer >= element.clientHeight) {
                //console.log(`doing something`);
                //set an upper bound of -85vw
                if (animationPercentage < lowerBound) {
                    //console.log('LOWER BOUND')
                    element.style['margin-left'] = `-85`;
                }
                if (animationPercentage >= lowerBound && animationPercentage <= upperBound) {
                    //console.log('MIDDLE BOUND')
                    if ((animationDistancePercentage * speedMultiplier) <= 5) {
                        //console.log('UPPER BOUND')
                        element.style['margin-left'] = `-5vw`;
                    }
                    element.style['margin-left'] = `-${85 - (animationDistancePercentage * speedMultiplier)}vw`;
                }
                // if (animationPercentage > upperBound) {
                //     console.log('UPPER BOUND')
                //     element.style['margin-left'] = `-5vw`;
                // }
            } else if (animationHeightIncrementer < element.clientHeight) {
                //if the element is not completely on screen-- do nothing
                //console.log(`NOT doing anything`);
            }
        }

        var observer = new IntersectionObserver((entries) => {
            //console.log(entries)
            var startHeight = entries[0].rootBounds
            if (entries[0].intersectionRatio > 0) {
                //console.log('Hello');
                //console.log(`START POSITION: ${window.scrollY}`)
                window.addEventListener('scroll', handleScroll, true)
                window.addEventListener('touchmove', handleScroll, true)
            }
            else {
                window.removeEventListener('scroll', handleScroll, true)
                window.removeEventListener('touchmove', handleScroll, true)
                //console.log('Good Bye');
            }
        });

        return observer.observe(element)
    }

    function webSolutionsAnimation() {

        var element = document.querySelector('.internet');
        console.log(`SCREEN HEIGHT: ${window.innerHeight}`)
        console.log(`ELEMENT HEIGHT: ${element.clientHeight}`)

        function handleScroll(e) {
            //when the observer starts the element is at the bottom of the screen 
            //or about the distance of the inner window height
            //indicates current pixel height into the intersection rectangle being observed
            var boundingRect = element.getBoundingClientRect();
            var animationHeightIncrementer = (window.innerHeight - boundingRect.y);
            var animationWindowPercentage = boundingRect.y / window.innerHeight;
            var elementOnScreenHeight = window.innerHeight - element.clientHeight
            var animationPercentage = (animationHeightIncrementer - element.clientHeight) / (elementOnScreenHeight);
            var lowerBound = 0.00;
            var upperBound = 0.50;
            var animationDistancePercentage = animationPercentage - lowerBound;
            var speedMultiplier = 180

            // console.log(`
            //     PAGE Y OFFSET: ${window.pageYOffset}
            //     CLIENT HEIGHT: ${element.clientHeight}
            //     INNER WINDOW HEIGHT: ${window.innerHeight}
            //     ANIMATE WINDOW PERCENT: ${animationWindowPercentage}
            //     ANIMATION HEIGHT INCREMENTOR: ${animationHeightIncrementer}
            //     ANIMATION PERCENTAGE: ${animationPercentage}
            //     ANI: ${animationDistancePercentage}
            //     A: ${85 - (animationDistancePercentage * speedMultiplier)}
            //     `);

            //if the object is completely on screen animate into and out of view
            if (animationHeightIncrementer >= element.clientHeight) {
                //console.log(`doing something`);
                //set an upper bound of -85vw
                if (animationPercentage < lowerBound) {
                    //console.log('LOWER BOUND')
                    element.style['margin-left'] = `100vw`;
                }
                if (animationPercentage >= lowerBound && animationPercentage <= upperBound) {
                    //console.log('MIDDLE BOUND')
                    
                    // if ((upperBound) <= .55) {
                    //     console.log('UPPER BOUND')
                    //     element.style['margin-left'] = `15vw`;
                    // }

                    element.style['margin-left'] = `${100 - (animationDistancePercentage * speedMultiplier)}vw`;
                    
                }


                if (animationPercentage >= upperBound) {
                    //console.log('UPPER BOUND')
                    element.style['margin-left'] = `10vw`;
                }

            } else if (animationHeightIncrementer < element.clientHeight) {
                //if the element is not completely on screen-- do nothing
                //console.log(`NOT doing anything`);
            }
        }

        var observer = new IntersectionObserver((entries) => {
            //console.log(entries)
            var startHeight = entries[0].rootBounds
            if (entries[0].intersectionRatio > 0) {
                console.log('Hello');
                console.log(`START POSITION: ${window.scrollY}`)
                window.addEventListener('scroll', handleScroll, true)
                window.addEventListener('touchmove', handleScroll, true)
            }
            else {
                window.removeEventListener('scroll', handleScroll, true)
                window.removeEventListener('touchmove', handleScroll, true)
                //console.log('Good Bye');
            }
        });

        return observer.observe(element)
    }

    function dataAnalyticsAnimation() {

        var consultations = document.querySelector('.analytics');
        console.log(`SCREEN HEIGHT: ${window.innerHeight}`)
        console.log(`ELEMENT HEIGHT: ${consultations.clientHeight}`)

        function handleScroll(e) {
            //when the observer starts the element is at the bottom of the screen 
            //or about the distance of the inner window height
            //indicates current pixel height into the intersection rectangle being observed
            var boundingRect = consultations.getBoundingClientRect();
            var animationHeightIncrementer = (window.innerHeight - boundingRect.y);
            var animationWindowPercentage = boundingRect.y / window.innerHeight;
            var elementOnScreenHeight = window.innerHeight - consultations.clientHeight
            var animationPercentage = (animationHeightIncrementer - consultations.clientHeight) / (elementOnScreenHeight);
            var lowerBound = 0.15;
            var upperBound = 0.75;
            var animationDistancePercentage = animationPercentage - lowerBound;
            var speedMultiplier = 180

            console.log(`
                PAGE Y OFFSET: ${window.pageYOffset}
                CLIENT HEIGHT: ${consultations.clientHeight}
                INNER WINDOW HEIGHT: ${window.innerHeight}
                ANIMATE WINDOW PERCENT: ${animationWindowPercentage}
                ANIMATION HEIGHT INCREMENTOR: ${animationHeightIncrementer}
                ANIMATION PERCENTAGE: ${animationPercentage}
                ANI%: ${animationDistancePercentage}
                A: ${85 - (animationDistancePercentage * speedMultiplier)}
                `);

            //if the object is completely on screen animate into and out of view
            if (animationHeightIncrementer >= consultations.clientHeight) {
                console.log(`doing something`);
                //set an upper bound of -85vw
                if (animationPercentage < lowerBound) {
                    console.log('LOWER BOUND')
                    consultations.style['margin-left'] = `-85`;
                }
                if (animationPercentage >= lowerBound && animationPercentage <= upperBound) {
                    console.log('MIDDLE BOUND')
                    if ((animationDistancePercentage * speedMultiplier) <= 5) {
                        console.log('UPPER BOUND')
                        consultations.style['margin-left'] = `-5vw`;
                    }
                    consultations.style['margin-left'] = `-${85 - (animationDistancePercentage * speedMultiplier)}vw`;
                }
                // if (animationPercentage > upperBound) {
                //     console.log('UPPER BOUND')
                //     consultations.style['margin-left'] = `-5vw`;
                // }
            } else if (animationHeightIncrementer < consultations.clientHeight) {
                //if the element is not completely on screen-- do nothing
                console.log(`NOT doing anything`);
            }
        }

        var observer = new IntersectionObserver((entries) => {
            console.log(entries)
            var startHeight = entries[0].rootBounds
            if (entries[0].intersectionRatio > 0) {
                console.log('Hello');
                console.log(`START POSITION: ${window.scrollY}`)
                window.addEventListener('scroll', handleScroll, true)
            }
            else {
                window.removeEventListener('scroll', handleScroll, true)
                console.log('Good Bye');
            }
        });

        return observer.observe(consultations)
    }


    function aboutScroll() {

        var text1 = document.querySelector('.anim-1');
        var text2 = document.querySelector('.anim-2');
        var text3 = document.querySelector('.anim-3');
        var text4 = document.querySelector('.anim-4');
        //var text5 = document.querySelector('.anim-5');

        var observe = function (entries, animation) {

            var observer = new IntersectionObserver((entries) => {
                console.log(entries)
                if (entries[0].intersectionRatio > 0) {
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
            consultationsAnimation();
            webSolutionsAnimation();
            dataAnalyticsAnimation();
            carousel();

        } else if (win.location.pathname === '/Users/markheard/Desktop/markheardio/index.html') {
            consultationsAnimation();
            webSolutionsAnimation();
            dataAnalyticsAnimation();
            carousel();

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

            if (e.target.id === 'sendMessage') {

                console.log('sending message');

            }

        });


    }


    main();



})(this);