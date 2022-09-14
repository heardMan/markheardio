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
                    "description": "A better date selection experience from the ground up-- custom input and date logic.",
                    "preview": "react-date-selector.gif"
                },
                {
                    "title": "Restaurant Reviews",
                    "github": "https://github.com/heardMan/restaurantReviews",
                    "demo": "https://heardman.github.io/restaurantReviews/",
                    "description": "A map-based restaurant search application. The application is fully responsive and follows offline first principles.",
                    "preview": "restaurant-reviews.gif"
                },
                {
                    "title": "Dodge 'em",
                    "github": "https://github.com/heardMan/udacity-arcade-game",
                    "demo": "https://heardman.github.io/udacity-arcade-game/",
                    "description": "A mobile friendly game that can be played with either the onscreen direction pad or a keyboard direction pad. The game is very a frogger clone.",
                    "preview": "dodge-em.gif"
                },
                {
                    "title": "Concentrate",
                    "github": "https://github.com/heardMan/concentrate-js",
                    "demo": "https://heardman.github.io/concentrate-js/",
                    "description": "A card matching game. Click on a card to reveal its icon. Match all the card pairs to win the game. ",
                    "preview": "concentrate.gif"
                },
                {
                    "title": "Trivia Game",
                    "github": "https://github.com/heardMan/TriviaGame",
                    "demo": "https://heardman.github.io/TriviaGame/",
                    "description": "This is a multiple choice quiz application that tests a user's knowledge of javascript array methods. See how many answers you can get correct!",
                    "preview": "trivia-game.gif"
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
        var slideIndicatorContainer = doc.getElementById('slide-indicator-container')


        console.log(slideIndicatorContainer)



        if (carouselElem) {

            var isDragging = false;
            var startPos = 0;
            var currentTranslate = 0;
            var prevTranslate = 0;
            var animationID = 0;
            var currentSlideIndex = 0;

            //create a starter array

            function animation() {
                setContentCardPosition();

                if (isDragging) {
                    requestAnimationFrame(animation)
                }
            }

            function getPositionX(event) {
                if (event.type.includes('mouse')) {
                    return event.pageX;
                } else {
                    return event.touches[0].clientX;
                }
            }

            function setPositionByIndex() {
                if (currentSlideIndex < 0) {
                    currentSlideIndex = 4
                }
                if (currentSlideIndex > 4) {
                    currentSlideIndex = 0
                }
                currentTranslate = currentSlideIndex * -window.innerWidth
                prevTranslate = currentTranslate
                setContentCardPosition()
            }

            function setContentCardPosition() {
                carouselElem.style.transform = 'translateX(' + currentTranslate + 'px)';
            }



            function touchStart(idx) {
                return function (event) {
                    console.log(event.target)
                    startPos = getPositionX(event)
                    console.log(startPos);
                    currentSlideIndex = idx;
                    isDragging = true;
                    animationID = requestAnimationFrame(animation)
                }
            }

            function touchEnd() {
                isDragging = false;
                cancelAnimationFrame(animationID)
                var movedBy = currentTranslate - prevTranslate;

                if (movedBy < -100 && currentSlideIndex < data.length - 1) {
                    var slideIndicators = doc.getElementsByClassName('slide-indicator')
                    slideIndicators[currentSlideIndex].classList.remove('slide-indicator-selected')
                    slideIndicators[currentSlideIndex + 1].classList.add('slide-indicator-selected')
                    currentSlideIndex += 1;
                }

                if (movedBy > 100 && currentSlideIndex > 0) {
                    var slideIndicators = doc.getElementsByClassName('slide-indicator')
                    slideIndicators[currentSlideIndex].classList.remove('slide-indicator-selected')
                    slideIndicators[currentSlideIndex - 1].classList.add('slide-indicator-selected')
                    currentSlideIndex -= 1;
                }
                setPositionByIndex()
            }

            function touchMove(event) {
                if (isDragging) {
                    console.log('move')
                    var currentPos = getPositionX(event);
                    currentTranslate = prevTranslate + currentPos - startPos
                }

            }

            function createCard(index, title, description, gitHub, demo, preview) {

                var slideIndicator = doc.createElement('DIV');
                slideIndicator.classList.add('slide-indicator');

                if (index === 0) {
                    slideIndicator.classList.add('slide-indicator-selected');
                }

                slideIndicatorContainer.appendChild(slideIndicator);

                //empty content card
                var contentCard = doc.createElement('DIV');
                contentCard.classList.add('carousel-item');

                var previewImg = doc.createElement('PICTURE');
                previewImg.classList.add('project-preview');

                var stillImg = doc.createElement('IMG');
                var movingImg = doc.createElement('SOURCE');

                stillImg.src = './assets/' + preview.split('.')[0] + '-still.' + preview.split('.')[1];
                movingImg.srcset = './assets/' + preview;
                movingImg.media = '(min-width:850px)';
                previewImg.append(movingImg)
                previewImg.append(stillImg)

                //container element
                var contentContainer = doc.createElement('DIV');
                contentContainer.classList.add('carousel-item-content');

                var carouselCard = doc.createElement('DIV');
                carouselCard.classList.add('carousel-card');

                var innerCarouselCard = doc.createElement('DIV');
                innerCarouselCard.classList.add('inner-carousel-card');

                //title element
                var frontElemContainer = doc.createElement('DIV');
                frontElemContainer.classList.add('carousel-card-front');

                var titleElem = doc.createElement('H3');
                titleElem.textContent = title;
                frontElemContainer.append(titleElem);

                //back of carousel card
                var backElemContainer = doc.createElement('DIV');
                backElemContainer.classList.add('carousel-card-back');

                var descriptionElem = doc.createElement('P');
                descriptionElem.textContent = description;
                backElemContainer.append(descriptionElem);


                //link Container element
                var frontLinkContainer = doc.createElement('DIV');
                frontLinkContainer.classList.add('carousel-item-links');

                //more info link element
                var moreInfoLinkElem = doc.createElement('A');
                //moreInfoLinkElem.href = gitHub;
                moreInfoLinkElem.textContent = "Info";
                moreInfoLinkElem.onclick = function (e) {
                    e.preventDefault();
                    //frontElemContainer.classList.toggle('flip-front');
                    //backElemContainer.classList.toggle('flip-back');
                    innerCarouselCard.classList.toggle('flip-front');

                }

                //demo link element
                var demoLinkElem = doc.createElement('A');
                demoLinkElem.href = demo;
                demoLinkElem.textContent = "Demo";


                //link Container element
                var backLinkContainer = doc.createElement('DIV');
                backLinkContainer.classList.add('carousel-item-links');

                var backLinkElem = doc.createElement('A');
                backLinkElem.textContent = "Back";
                backLinkElem.href = "#"
                backLinkElem.onclick = function (e) {
                    e.preventDefault();
                    //frontElemContainer.classList.toggle('flip-front');
                    //backElemContainer.classList.toggle('flip-back');
                    innerCarouselCard.classList.toggle('flip-front');

                }

                //demo link element
                var docsLinkElem = doc.createElement('A');
                docsLinkElem.href = demo;
                docsLinkElem.textContent = "Docs";


                //add elements to content card
                contentContainer.appendChild(previewImg);

                innerCarouselCard.appendChild(frontElemContainer);
                innerCarouselCard.appendChild(backElemContainer);

                contentContainer.appendChild(innerCarouselCard);
                frontLinkContainer.appendChild(moreInfoLinkElem);
                frontLinkContainer.appendChild(demoLinkElem);
                frontElemContainer.appendChild(frontLinkContainer);

                backLinkContainer.appendChild(backLinkElem);
                backLinkContainer.appendChild(docsLinkElem);

                backElemContainer.appendChild(backLinkContainer)




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

                var index = i;
                var title = data[i].title;
                var description = data[i].description;
                var gitHub = data[i].github;
                var demo = data[i].demo;
                var preview = data[i].preview

                createCard(index, title, description, gitHub, demo, preview);

            }

            // create a click listener
            var rightBtn = doc.getElementById('right-btn');
            var leftBtn = doc.getElementById('left-btn');

            rightBtn.addEventListener('click', function (e) {

                var slideIndicators = doc.getElementsByClassName('slide-indicator')

                if (currentSlideIndex === slideIndicators.length - 1) {
                    slideIndicators[slideIndicators.length - 1].classList.remove('slide-indicator-selected')
                    slideIndicators[0].classList.add('slide-indicator-selected')

                } else {
                    slideIndicators[currentSlideIndex].classList.remove('slide-indicator-selected')
                    slideIndicators[currentSlideIndex + 1].classList.add('slide-indicator-selected')
                }


                currentSlideIndex += 1;
                setPositionByIndex()

            });

            leftBtn.addEventListener('click', function (e) {

                var slideIndicators = doc.getElementsByClassName('slide-indicator')

                if (currentSlideIndex === 0) {
                    slideIndicators[0].classList.remove('slide-indicator-selected')
                    slideIndicators[slideIndicators.length - 1].classList.add('slide-indicator-selected')

                } else {
                    slideIndicators[currentSlideIndex].classList.remove('slide-indicator-selected')
                    slideIndicators[currentSlideIndex - 1].classList.add('slide-indicator-selected')
                }



                currentSlideIndex -= 1;
                setPositionByIndex()

            });

            function stepSlides() {
                var slideIndicators = doc.getElementsByClassName('slide-indicator')


                if (currentSlideIndex === slideIndicators.length - 1) {
                    slideIndicators[slideIndicators.length - 1].classList.remove('slide-indicator-selected')
                    slideIndicators[0].classList.add('slide-indicator-selected')
                    currentSlideIndex = 0
                    setPositionByIndex()

                } else {
                    slideIndicators[currentSlideIndex].classList.remove('slide-indicator-selected')
                    slideIndicators[currentSlideIndex + 1].classList.add('slide-indicator-selected')
                    currentSlideIndex += 1;
                    setPositionByIndex()
                }

            }

            //setInterval(stepSlides, 15 * 1000)





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
            //console.log(e);
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
            //console.log(e);
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
            //console.log(e);
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

    function visitorStatsController() {
        var hasVisited = window.localStorage.getItem('hasVisited');

        var visitCount = window.localStorage.getItem('visitCount');

        if (hasVisited === null) {
            window.localStorage.setItem('hasVisited', 'true')
            window.localStorage.setItem('visitCount', 1)
        }

        if (hasVisited === 'true') {
            var newCount = Number(visitCount) + 1
            if (newCount === NaN) {
                newCount = 1
            }
            window.localStorage.setItem('visitCount', newCount)
        }

    }

    function welcomeAnimation() {
        var header = doc.getElementsByClassName('header')[0];
        var intro = doc.getElementsByClassName('intro')[0];
        var textLogo = doc.getElementsByClassName('textlogo')[0];
        var fab = doc.getElementsByClassName('fab')[0];
        var introText1 = doc.getElementsByClassName('intro-text-1')[0];
        var introText2 = doc.getElementsByClassName('intro-text-2')[0];
        var introText3 = doc.getElementsByClassName('intro-text-3')[0];
        var introText4 = doc.getElementsByClassName('intro-text-4')[0];

        header.classList.add('welcome-header');
        intro.classList.add('welcome-intro');
        textLogo.classList.add('textlogo-welcome');
        fab.classList.add('welcome-fab');
        introText1.classList.add('intro-text-1-welcome');
        introText2.classList.add('intro-text-2-welcome');
        introText3.classList.add('intro-text-3-welcome');
        introText4.classList.add('intro-text-4-welcome');

    }

    function welcomeAnimationController() {

        var visitCount = Number(window.localStorage.getItem('visitCount'));

        if (visitCount === NaN) {
            visitCount = 1;
        }

        if (visitCount === 1) {
            welcomeAnimation();
        }

        if (visitCount % 10 === 0) {
            welcomeAnimation();
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

            //Y Bound is about equal to window height and approaches zero
            //as the element reaches the top of the screen
            //start value- window.innerHeight
            //terminal value- -element.clientHeight total magnitude: element.clientHeight + window.innerHeight
            var boundingRect = element.getBoundingClientRect();


            var animationHeightIncrementer = (window.innerHeight - boundingRect.y);

            //tracks Y-axis movement trough the window
            //start value: 0 - when object enters view 
            //terminal value: 100 - when object exits view
            var animationWindowPercentage = 1 - (boundingRect.y + element.clientHeight) / (window.innerHeight + element.clientHeight);

            var animationID = 0;

            // console.log('BOUNDING RECT Y: ' + boundingRect.y);
            // console.log('INNER WINDOW HEIGHT: ' + window.innerHeight);
            // console.log('PAGE Y OFFSET: ' + window.pageYOffset);
            // console.log('CLIENT HEIGHT: ' + element.clientHeight);
            // console.log('ANIMATE WINDOW PERCENT: ' + animationWindowPercentage);

            //all movement must proportional
            //convert upward scroll in to horizontal movement using the translateX function
            //this app has a header that limits the animation windows - upper bound of 92 pixels
            //translateX should start at -99 (hard limit) and progress to 0 (hard limit) Total 99 units

            // function step(timestamp){
            //     translateYtoX(-99+((animationWindowPercentage*100)*2.2))
            //     window.requestAnimationFrame(step)
            // }
            //window.requestAnimationFrame(step)

            function translateYtoX(yPosition) {

                if (yPosition < -99) {
                    element.style.transform = 'skewX(-3deg) translateX(-99%)';
                }

                if (yPosition > -99) {
                    element.style.transform = 'skewX(-3deg) translateX(' + (yPosition) + '%)';
                }

                if (yPosition > 0) {
                    element.style.transform = 'skewX(-3deg) translateX(0%)';
                }

            }

            translateYtoX(-99 + ((animationWindowPercentage * 100) * 2.2))

        }

        var observer = new IntersectionObserver((entries) => {
            //console.log(entries)
            var startHeight = entries[0].rootBounds
            if (entries[0].intersectionRatio > 0) {
                window.addEventListener('scroll', handleScroll, true)
                window.addEventListener('touchmove', handleScroll, true)
            }
            else {
                window.removeEventListener('scroll', handleScroll, true)
                window.removeEventListener('touchmove', handleScroll, true)
            }
        });

        return observer.observe(element)
    }


    function webSolutionsAnimation() {

        var element = document.querySelector('.internet');
        //console.log(`SCREEN HEIGHT: ${window.innerHeight}`)
        //console.log(`ELEMENT HEIGHT: ${element.clientHeight}`)

        function handleScroll2(e) {
            //when the observer starts the element is at the bottom of the screen 
            //or about the distance of the inner window height
            //indicates current pixel height into the intersection rectangle being observed

            //Y Bound is about equal to window height and approaches zero
            //as the element reaches the top of the screen
            //start value- window.innerHeight
            //terminal value- -element.clientHeight total magnitude: element.clientHeight + window.innerHeight
            var boundingRect = element.getBoundingClientRect();


            var animationHeightIncrementer = (window.innerHeight - boundingRect.y);

            //tracks Y-axis movement trough the window
            //start value: 0 - when object enters view 
            //terminal value: 100 - when object exits view
            var animationWindowPercentage = 1 - (boundingRect.y + element.clientHeight) / (window.innerHeight + element.clientHeight);

            var animationID = 0;

            // console.log('BOUNDING RECT Y: ' + boundingRect.y);
            // console.log('INNER WINDOW HEIGHT: ' + window.innerHeight);
            // console.log('PAGE Y OFFSET: ' + window.pageYOffset);
            // console.log('CLIENT HEIGHT: ' + element.clientHeight);
            // console.log('ANIMATE WINDOW PERCENT: ' + animationWindowPercentage);

            //all movement must proportional
            //convert upward scroll in to horizontal movement using the translateX function
            //this app has a header that limits the animation windows - upper bound of 92 pixels
            //translateX should start at 99 (hard limit) and progress to 0 (hard limit) Total 99 units

            // function step(timestamp){
            //     translateYtoX(-99+((animationWindowPercentage*100)*2.2))
            //     window.requestAnimationFrame(step)
            // }
            //window.requestAnimationFrame(step)

            function translateYtoX(yPosition) {

                if (yPosition > 97) {
                    element.style.transform = 'skewX(3deg) translateX(97%)';
                }

                if (yPosition < 99) {
                    element.style.transform = 'skewX(3deg) translateX(' + (yPosition) + '%)';
                }

                if (yPosition < 8) {
                    element.style.transform = 'skewX(3deg) translateX(8%)';
                }

            }

            translateYtoX(99 - ((animationWindowPercentage * 100) * 2.2))

        }

        var observer = new IntersectionObserver((entries) => {
            //console.log(entries)
            var startHeight = entries[0].rootBounds
            if (entries[0].intersectionRatio > 0) {
                window.addEventListener('scroll', handleScroll2, true)
                window.addEventListener('touchmove', handleScroll2, true)
            }
            else {
                window.removeEventListener('scroll', handleScroll2, true)
                window.removeEventListener('touchmove', handleScroll2, true)
            }
        });

        return observer.observe(element)
    }


    function dataAnalyticsAnimation() {

        var element = document.querySelector('.analytics');
        //console.log(`SCREEN HEIGHT: ${window.innerHeight}`)
        //console.log(`ELEMENT HEIGHT: ${element.clientHeight}`)

        function handleScroll3(e) {
            //when the observer starts the element is at the bottom of the screen 
            //or about the distance of the inner window height
            //indicates current pixel height into the intersection rectangle being observed

            //Y Bound is about equal to window height and approaches zero
            //as the element reaches the top of the screen
            //start value- window.innerHeight
            //terminal value- -element.clientHeight total magnitude: element.clientHeight + window.innerHeight
            var boundingRect = element.getBoundingClientRect();


            var animationHeightIncrementer = (window.innerHeight - boundingRect.y);

            //tracks Y-axis movement trough the window
            //start value: 0 - when object enters view 
            //terminal value: 100 - when object exits view
            var animationWindowPercentage = 1 - (boundingRect.y + element.clientHeight) / (window.innerHeight + element.clientHeight);

            var animationID = 0;

            console.log('BOUNDING RECT Y: ' + boundingRect.y);
            console.log('INNER WINDOW HEIGHT: ' + window.innerHeight);
            console.log('PAGE Y OFFSET: ' + window.pageYOffset);
            console.log('CLIENT HEIGHT: ' + element.clientHeight);
            console.log('ANIMATE WINDOW PERCENT: ' + animationWindowPercentage);

            //all movement must proportional
            //convert upward scroll in to horizontal movement using the translateX function
            //this app has a header that limits the animation windows - upper bound of 92 pixels
            //translateX should start at -99 (hard limit) and progress to 0 (hard limit) Total 99 units

            // function step(timestamp){
            //     translateYtoX(-99+((animationWindowPercentage*100)*2.2))
            //     window.requestAnimationFrame(step)
            // }
            //window.requestAnimationFrame(step)

            function translateYtoX(yPosition) {

                if (yPosition < -99) {
                    element.style.transform = 'skewX(-3deg) translateX(-99%)';
                }

                if (yPosition > -99) {
                    element.style.transform = 'skewX(-3deg) translateX(' + (yPosition) + '%)';
                }

                if (yPosition > 0) {
                    element.style.transform = 'skewX(-3deg) translateX(0%)';
                }

            }

            translateYtoX(-99 + ((animationWindowPercentage * 100) * 2.2))

        }

        var observer = new IntersectionObserver((entries) => {
            //console.log(entries)
            var startHeight = entries[0].rootBounds
            if (entries[0].intersectionRatio > 0) {
                window.addEventListener('scroll', handleScroll3, true)
                window.addEventListener('touchmove', handleScroll3, true)
            }
            else {
                window.removeEventListener('scroll', handleScroll3, true)
                window.removeEventListener('touchmove', handleScroll3, true)
            }
        });

        return observer.observe(element)
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

    }

    function aboutIntro() {
        var text1 = document.querySelector('.anim-1');
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
    }

    function aboutPersonal() {
        var element = document.querySelector('.anim-2');
    }

    function aboutProfessional() {
        var element = document.querySelector('.anim-3');
    }

    function aboutContact() {
        var element = document.querySelector('.anim-4');
    }

    //function() 

    // render function
    // controls visual rendering of application
    function renderPageContent() {

        console.log('Window Pathname: ' + win.location.pathname);

        visitorStatsController();

        if (win.location.pathname === '/') {
            welcomeAnimationController()
            consultationsAnimation();
            webSolutionsAnimation();
            dataAnalyticsAnimation();
            carousel();

        } else if (win.location.pathname === '/Users/markheard/Desktop/markheardio/index.html') {
            welcomeAnimationController()
            consultationsAnimation();
            webSolutionsAnimation();
            dataAnalyticsAnimation();
            carousel();

        } else if (win.location.pathname === '/portfolio') {
            gallery();
        } else if (win.location.pathname === '/contact') {
            validateContactForm();

        } else if(win.location.pathname === '/Users/markheard/Desktop/markheardio/contact.html') {
            validateContactForm();

        } else if (win.location.pathname === '/Users/markheard/Desktop/markheardio/about.html') {
            //aboutScroll();
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