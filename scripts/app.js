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
                'description': 'Not sure where to start or what you need? Feel free to reach out to schedule a consultation!'

            },
            {
                'title': 'Web Development',
                'link': 'https://github.com/heardMan/fitStat',
                'linkTitle': 'link',
                'description': 'Need a website? From self-managed to fully-managed I can help find and/or build the solution that is right for you and your business.'

            },
            {
                'title': 'Software Develpoment',
                'link': 'https://github.com/heardMan/fitStat',
                'linkTitle': 'link',
                'description': 'Need an application? I specialize in develeoping and maintaing modern scalable web applications and would love to help get your next application up an running!'

            },
            {
                'title': 'Web Hosting Solutions',
                'link': 'https://github.com/heardMan/fitStat',
                'linkTitle': 'link',
                'description': 'Need help hosting your website? I am experienced and familiar in hosting a variety of websites and would love to help find best fitting solution.'

            },
            {
                'title': 'Data Analytics',
                'link': 'https://github.com/heardMan/fitStat',
                'linkTitle': 'link',
                'description': 'Got Business Data that you need help organizing? Business Analytics is what sparked my interest in software development! I enjoy helping business owners find new and exciting opportunities within their own business data.'

            }
        ],
        projects = [
            {
                'name': 'fitStat',
                'github': 'https://github.com/heardMan/fitStat',
                'demo': 'https://fierce-gorge-82374.herokuapp.com/',
                'description': 'A Python Application that can be used to track workouts. In order to use this application please reference the technical documentation'
            },
            {
                'name': 'fitTrack',
                'github': 'https://github.com/heardMan/fitTrack',
                'demo': 'https://powerful-reef-18264.herokuapp.com/',
                'description': ''
            },
            {
                'name': 'Restaurant Reviews',
                'github': 'https://github.com/heardMan/restaurantReviews',
                'demo': 'https://heardman.github.io/restaurantReviews/',
                'description': ''
            },
            {
                'name': 'Dodge \'em',
                'github': 'https://github.com/heardMan/udacity-arcade-game',
                'demo': 'https://heardman.github.io/udacity-arcade-game/',
                'description': ''
            },
            {
                'name': 'Feed Reader',
                'github': 'https://github.com/heardMan/udacity-feedReader',
                'demo': 'https://heardman.github.io/udacity-feedReader/',
                'description': ''
            },
            {
                'name': 'Concentrate',
                'github': 'https://github.com/heardMan/concentrate-js',
                'demo': 'https://heardman.github.io/concentrate-js/',
                'description': ''
            },
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
                'name': 'clicky game',
                'github': 'https://github.com/heardMan/clickyGame',
                'demo': 'https://heardman.github.io/clickyGame/',
                'description': ''
            },
            {
                'name': 'news mango',
                'github': 'https://github.com/heardMan/newsMango',
                'demo': 'https://still-basin-55016.herokuapp.com/',
                'description': ''
            },
            {
                'name': 'whos that pokemon',
                'github': 'https://github.com/heardMan/Word_Guess_Game',
                'demo': 'https://heardman.github.io/Word_Guess_Game/',
                'description': ''
            },
            {
                'name': 'gifTastic',
                'github': 'https://github.com/heardMan/gifTastic',
                'demo': 'https://heardman.github.io/gifTastic/',
                'description': ''
            },
            {
                'name': 'Perfect Match',
                'github': 'https://github.com/heardMan/friendFinder',
                'demo': 'https://secure-anchorage-83716.herokuapp.com/',
                'description': ''
            },
            {
                'name': 'Sway',
                'github': 'https://github.com/heardMan/beer2',
                'demo': 'https://secure-anchorage-83716.herokuapp.com/',
                'description': ''
            },
            {
                'name': 'Eat da Burger',
                'github': 'https://github.com/heardMan/Burger',
                'demo': 'https://pacific-wave-57601.herokuapp.com/',
                'description': ''
            },
            {
                'name': 'Trivia game',
                'github': 'https://github.com/heardMan/TriviaGame',
                'demo': 'https://heardman.github.io/TriviaGame/',
                'description': ''
            },
            {
                'name': 'Fast Chat',
                'github': 'https://github.com/heardMan/firebaseApp',
                'demo': 'https://heardman.github.io/firebaseApp/',
                'description': ''
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


                projectCard.append(title)
                projectCard.append(githubLink)
                projectCard.append(demoLink)
                projectCard.append(description)

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

                if ( selectedCarousel < carouselItems.length-1) {
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
                    selectedCarousel = carouselItems.length-1;
                }
                //console.log(selectedCarousel);
                carouselContent[selectedCarousel].classList.add('selected');

            }

        });


    }

    // call the main function and run the application
    main();

})(this);