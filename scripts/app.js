'use strict';

var App = (function (global) {

    //global variables
    var doc = global.document,
        win = global.window,
        selectedCarousel = 0,
        carouselItems = [
            {
                'title': 'Consultations',
                'link': 'https://github.com/heardMan/fitStat',
                'linkTitle': 'link',
                'description': 'Not sure where to start or what you need?\n Feel free to reach out to schedule a consultation!'

            },
            {
                'title': 'Web Development',
                'link': 'https://github.com/heardMan/fitStat',
                'linkTitle': 'link',
                'description': 'Need a website?\n From self-managed to fully-managed I can help find and/or build the solution that is right for you and your business.'

            },
            {
                'title': 'Software Development',
                'link': 'https://github.com/heardMan/fitStat',
                'linkTitle': 'link',
                'description': 'Need an application?\n I specialize in develeoping and maintaining modern scalable web applications and would love to help get your next application up an running!'

            },
            {
                'title': 'Web Hosting Solutions',
                'link': 'https://github.com/heardMan/fitStat',
                'linkTitle': 'link',
                'description': 'Need help hosting your website?\n I am experienced and familiar in hosting a variety of websites and would love to help find the best fitting solution.'

            },
            {
                'title': 'Data Analytics',
                'link': 'https://github.com/heardMan/fitStat',
                'linkTitle': 'link',
                'description': 'Got Business Data that you need help organizing?\n Business Analytics is what sparked my interest in software development! I enjoy helping business owners find new and exciting opportunities within their own business data.'

            }
        ],
        projects = [
            {
                'name': 'Restaurant Reviews',
                'github': 'https://github.com/heardMan/restaurantReviews',
                'demo': 'https://heardman.github.io/restaurantReviews/',
                'description': 'A map-based restaurant search application. The application is fully responsive and follows offline first principles.'
            },
            {
                'name': 'Dodge \'em',
                'github': 'https://github.com/heardMan/udacity-arcade-game',
                'demo': 'https://heardman.github.io/udacity-arcade-game/',
                'description': 'This is a mobile friendly game that can be played with either the onscreen directional pad or a keyboard directional pad. The game is very simailar to frogger.'
            },
            {
                'name': 'Concentrate',
                'github': 'https://github.com/heardMan/concentrate-js',
                'demo': 'https://heardman.github.io/concentrate-js/',
                'description': 'This is a card matching game. Click on a card to reveal its icon. Match all the card pairs to win the game. For a more detailed explanation of the rules please visit the technical documentaion by clicking the link below.'
            },
            {
                'name': 'Trivia Game',
                'github': 'https://github.com/heardMan/TriviaGame',
                'demo': 'https://heardman.github.io/TriviaGame/',
                'description': 'This is a multiple choice quiz application that tests a user\'s knowledge of javascript array methods. See how many answers you can get correct!'
            },
            {
                'name': 'fitStat',
                'github': 'https://github.com/heardMan/fitStat',
                'demo': 'https://fierce-gorge-82374.herokuapp.com/',
                'description': 'A Python Application that can be used to track workouts. In order to use this application; please reference the technical documentation.'
            },
            {
                'name': 'fitTrack',
                'github': 'https://github.com/heardMan/fitTrack',
                'demo': 'https://powerful-reef-18264.herokuapp.com/',
                'description': 'A React Application designed as a user interface for the fitStat application. Please contact the adminstrator of this application for user log-in credentials.'
            },
            {
                'name': 'News Mango',
                'github': 'https://github.com/heardMan/newsMango',
                'demo': 'https://still-basin-55016.herokuapp.com/',
                'description': 'This is a free news story aggregation site that is mostly focused on financial and science related news stories.'
            },
            {
                'name': 'gifTastic',
                'github': 'https://github.com/heardMan/gifTastic',
                'demo': 'https://heardman.github.io/gifTastic/',
                'description': 'This application allows users to search the giphy api and save their favorite gifs! Unfortunately, this application does not use sessions or accounts so make sure to copy your favorite gifs before leaving the page!'
            },
            {
                'name': 'Perfect Match',
                'github': 'https://github.com/heardMan/friendFinder',
                'demo': 'https://secure-anchorage-83716.herokuapp.com/',
                'description': 'This application is a sample survey that matches users based on a proprietary formula that is ultimately based on the user\'s to the survey\'s question. '
            },

            // {
            //     'name': 'Feed Reader',
            //     'github': 'https://github.com/heardMan/udacity-feedReader',
            //     'demo': 'https://heardman.github.io/udacity-feedReader/',
            //     'description': ''
            // },

            // {
            //     'name': 'tap water search',
            //     'github': 'https://github.com/CFMark/scrap',
            //     'demo': 'https://nameless-wildwood-58120.herokuapp.com/',
            //     'description': ''
            // },
            // {
            //     'name': 'bookSearch',
            //     'github': 'https://github.com/heardMan/bookSearch',
            //     'demo': '',
            //     'description': ''
            // },
            {
                'name': 'Clicky Game',
                'github': 'https://github.com/heardMan/clickyGame',
                'demo': 'https://heardman.github.io/clickyGame/',
                'description': 'This is a memory based card game in which the you attempt to click only unique cards. For a more detailed explanation of the rules please visit the technical documentaion by clicking the link below.'
            },

            {
                'name': 'Who\'s that Pokemon',
                'github': 'https://github.com/heardMan/Word_Guess_Game',
                'demo': 'https://heardman.github.io/Word_Guess_Game/',
                'description': 'In this game the user is presented with a silhoutte of a pokemon and they have a certain number of attempts to guess what pokemon it is letter by letter. This game requires a desktop keyboard to play. For a more detailed explanation of the rules please visit the technical documentaion by clicking the link below.'
            },

            // {
            //     'name': 'Sway',
            //     'github': 'https://github.com/heardMan/beer2',
            //     'demo': 'https://secure-anchorage-83716.herokuapp.com/',
            //     'description': 'This application allows users to create an account and discover who there Congressional Representatives are in both the House and the Senate.'
            // },
            // {
            //     'name': 'Eat da Burger',
            //     'github': 'https://github.com/heardMan/Burger',
            //     'demo': 'https://pacific-wave-57601.herokuapp.com/',
            //     'description': ''
            // },

            {
                'name': 'Fast Chat',
                'github': 'https://github.com/heardMan/firebaseApp',
                'demo': 'https://heardman.github.io/firebaseApp/',
                'description': 'This is a person to person chat application. Create an account and start messaging with other users.'
            },



        ]

    // init function
    // controls setting up the application
    function init() {
        //console.log('starting application');
        render();
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

    function gallery() {
        console.log('rendering gallery');
        var galleryElem = doc.getElementById('gallery');
        if (galleryElem) {
            for (var i = 0; i < projects.length; i++) {
                var currentProj = projects[i];
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

    function carousel() {
        console.log('rendering carousel');
        var carouselElem = doc.getElementsByClassName('carousel-content')[0];
        if (carouselElem) {
            for (var i = 0; i < carouselItems.length; i++) {
                var contentCard = doc.createElement('DIV');
                contentCard.setAttribute('key', i);
                if (i === selectedCarousel) {
                    contentCard.setAttribute('class', 'carousel-item card selected');
                } else {
                    contentCard.setAttribute('class', 'carousel-item card');
                }
                var title = doc.createElement('H3');
                title.textContent = carouselItems[i].title;
                var description = doc.createElement('P');
                description.textContent = carouselItems[i].description;

                contentCard.appendChild(title);
                contentCard.appendChild(description);
                carouselElem.appendChild(contentCard);
            }
        }


    }

    function sendMessage(message) {
        
        // Example POST method implementation:
        async function postData(url = '', data = {}) {
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

    



    // render function
    // controls visual rendering of application
    function render() {

        if (win.location.pathname === '/') {
            carousel();
        } else if (win.location.pathname === '/portfolio') {
            gallery();
        }
    }


    // main function
    // controls application behavior
    function main() {


        init();

        // add menu toggle function
        doc.addEventListener('click', function (e) {


            if (e.target.classList.contains('toggle')) {
                toggleMenu();
            }

            else if (e.target.classList.contains('right-btn')) {

                var carouselContent = doc.getElementsByClassName('carousel-content')[0].children;
                carouselContent[selectedCarousel].classList.remove('selected');

                if (selectedCarousel < carouselItems.length - 1) {
                    selectedCarousel++;
                } else {
                    selectedCarousel = 0;
                }
                //console.log(selectedCarousel)


                carouselContent[selectedCarousel].classList.add('selected');

            } else if (e.target.classList.contains('left-btn')) {

                var carouselContent = doc.getElementsByClassName('carousel-content')[0].children;
                carouselContent[selectedCarousel].classList.remove('selected');
                if (0 < selectedCarousel) {
                    selectedCarousel--;
                } else {
                    selectedCarousel = carouselItems.length - 1;
                }
                //console.log(selectedCarousel);
                carouselContent[selectedCarousel].classList.add('selected');

            } else if (e.target.id === 'sendMessage') {

                var name = document.getElementById('name');
                var email = document.getElementById('email');
                var message = document.getElementById('message');

                var message = {
                    'name': name.value,
                    'email': email.value,
                    'message': message.value
                }
                
                if(message.name.length > 0 &&
                    message.email.length > 6 &&
                    message.message.length > 0 &&
                    message.message.length < 250){
                    sendMessage(message);
                }

                if(message.name.length <= 0){
                    name.classList.add("red-outline");
                    var nameWarning = doc.createElement('DIV');
                    nameWarning.classList.add('warning');
                    nameWarning.textContent = 'Please enter your name'
                    name.parentElement.appendChild(nameWarning);
                }

                if(message.email.length < 6){
                    email.classList.add("red-outline");
                    var emailWarning = doc.createElement('DIV');
                    emailWarning.classList.add('warning');
                    emailWarning.textContent = 'Please enter your email'
                    email.parentElement.appendChild(emailWarning);
                }

                if(message.message.length <= 0){
                    message.classList.add("red-outline");
                    var messageWarning1 = doc.createElement('DIV');
                    messageWarning1.classList.add('warning');
                    messageWarning1.textContent = 'Please type a short message'
                    message.parentElement.appendChild(messageWarning1);
                }

                if(message.message.length > 250){
                    message.classList.add("red-outline");
                    var messageWarning1 = doc.createElement('DIV');
                    messageWarning1.classList.add('warning');
                    messageWarning1.textContent = 'Please type a short message'
                    message.parentElement.appendChild(messageWarning1);
                }
                
                

                
            }

        });


    }

    
    main();

    

})(this);