// Causes all the code in this section to run when the site is loaded 
window.onload = function () { 
    
    /* 'this' gets the "theme" from local storage, if it is dark, then sets the site theme to dark 
    and
    later on the theme is put into local storage under toggleTheme */
    if (this.localStorage.getItem("theme") == "dark") {
        document.getElementById("theme-toggler").checked = true;
        setThemeDark();
    } 

    let navButton = document.getElementById("navbar-toggler");
    navButton.addEventListener("click", toggleNav); 
    
    // Allowing the navButton to toggle the navigation when clicked
    navbar = document.getElementById("navbar");

    // If the mouse leaves navbar then, navigation is collapsed
    navbar.addEventListener("mouseleave", collapseNav);
    
    /* Toggling navigation, when the navbar is clicked. 
    It animates using css the height of the collapsable from 0 to the required height */
    function toggleNav() { 
        let navText = document.getElementById("navbarItems");
        let navButton = document.getElementById("navbar-toggler");
        if (navText.style.maxHeight){

            //  collapse is called from outside this function
            collapseNav(); 
        } else {

            // Getting the height of collapse
            navText.style.maxHeight = navText.scrollHeight + "px"; 

            // Setting the navButton to active and then animate css to an X
            navButton.classList.add("active"); 
        }
    }

    // Toggling theme switch in the navbar
    let themeSwitch = document.getElementById("theme-toggler");
    themeSwitch.addEventListener("click", toggleTheme); 

    function toggleTheme() {

        // Getting the css variables section
        let root = document.documentElement; 

        // Getting "dark" and "light" icons next to the switch
        let moon = document.getElementById("moon"); 
        let sun = document.getElementById("sun"); 

        // If the theme switch is checked, then set theme to dark
        if(themeSwitch.checked == true) { 

            // Setting  dark theme by seperating it from toggle theme so it can be called on load if "dark" is in local storage
            setThemeDark(); 

            // if it is unchecked, set theme to light which is a default theme
        } else if (themeSwitch.checked == false) { 

            // Setting all variables  individually to their default values
            root.style.setProperty("--fullBackground", "#ffffff");
            root.style.setProperty("--backingOne", "#c5cae9");
            root.style.setProperty("--backingTwo", "#303f9f");
            root.style.setProperty("--textOne", "#ffffff");
            root.style.setProperty("--textTwo", "#212121"); 

            // Setting the background image of the landing section to something light 
            document.getElementById("homeContainer").style.backgroundImage = "url(https://source.unsplash.com/2100x900/?motherboard,light)"; 
            
            // Turning on the "light" icon
            sun.style.opacity = "1"; 
           
            // Switching off the "dark" icon
            moon.style.opacity = "0"; 

            // Once the animation for the "light" icon is finished, turn it off again
            window.setTimeout(function() {sun.style.opacity = "0"}, 800); 

            // Putting theme to light in the local storage, so the page loads it in same order next time, using the first if statement
            localStorage.setItem("theme", "light"); 
        }
    }

    function setThemeDark() {
        let root = document.documentElement;
        let moon = document.getElementById("moon");
        let sun = document.getElementById("sun"); 

        // The background is same as used in the body and it is set to dark
        root.style.setProperty("--fullBackground", "#212121"); 
        root.style.setProperty("--backingOne", "#303f9f");

        // BackingOne properties are default and are given to backingTwo and vice versa and same occurs with text values
        root.style.setProperty("--backingTwo", "#c5cae9"); 
        root.style.setProperty("--textOne", "#212121");
        root.style.setProperty("--textTwo", "#ffffff");

        // The landing image is set to  dark and it is taken from following url
        document.getElementById("homeContainer").style.backgroundImage = "url(https://source.unsplash.com/2100x900/?motherboard,black)";
        moon.style.opacity = "1";
        sun.style.opacity = "0";
        window.setTimeout(function() {moon.style.opacity = "0"}, 800);

        /* Putting theme to dark into the local storage, so the page loads this way next time,
         using the first if statement */
        localStorage.setItem("theme", "dark"); 
    }


    // Adding scrollTop to the "back to top" button,  this scrolls to the top of the document
    document.getElementById("top-button").addEventListener("click", function scrollTop() {document.documentElement.scrollTop = 0;}); 

    // Running the scrollhighlight function, to highlight the section scrolled to, also running build galler function 
    // Also running fill gallery section, all these would fill the portoflio gallery with images loaded on html
    this.scrollHighlight();
    this.buildGallery();
    this.fillGallery();
}

/* When the window is resized, if the sections have moved, highlight the approriate one else,
 rebuild gallery with different size and outomes */
window.onresize = function () {
    this.scrollHighlight(); 
    this.buildGallery(); 
    this.fillGallery();
}

// When the window is scrolled, highlight the section scrolled to
window.onscroll = function () {
    this.scrollHighlight(); 
}

/* This function  code has been taken from  
https://gomakethings.com/how-to-test-if-an-element-is-in-the-viewport-with-vanilla-javascript/ */
function scrollHighlight() {
    let isInViewport = function (element) {
        let bounding = element.getBoundingClientRect();

        /* The if section fills most of the viewport like 120px from the top and 80 from the bottom then return true 
       else the section is entirely within the viewport */
        if(bounding.height >= (window.innerHeight - 200)){
            return (bounding.top <= 120 && bounding.left >= 0 && bounding.bottom >= (window.innerHeight - 80) && bounding.right <= (window.innerWidth));
            
        } else {
            return (bounding.top >= 0 && bounding.left >= 0 && bounding.bottom <= (window.innerHeight) && bounding.right <= (window.innerWidth));
            
        }
    }; 

    // All the 'let' refers to navigation buttons in the navbar
    let homeLink = document.getElementById("homeLink"); 
    let portfolioLink = document.getElementById("portfolioLink");
    let cvLink = document.getElementById("cvLink");
    let contactLink = document.getElementById("contactLink");

    // If the home section is being viewed, set the home link to 100% opacity and all others to 60%
    if (isInViewport(document.getElementById("home"))) { 
        homeLink.style.opacity = "1";                   
        homeLink.style.transform = "scale(1.2)";

        // Once home section is optimised, set the portfolio section to 150ms as collapse portfolio function
        portfolioLink.style.opacity = "0.6";
        portfolioLink.style.transform = "scale(1)";
        cvLink.style.opacity = "0.6";
        cvLink.style.transform = "scale(1)";
        contactLink.style.opacity = "0.6";
        contactLink.style.transform = "scale(1)";
        window.setTimeout(function() {collapsePortfolio()},150);
    } else if (isInViewport(document.getElementById("portfolio"))) {
        homeLink.style.opacity = "0.6";
        homeLink.style.transform = "scale(1)";
        portfolioLink.style.opacity = "1";
        portfolioLink.style.transform = "scale(1.2)";
        cvLink.style.opacity = "0.6";
        cvLink.style.transform = "scale(1)";

        // Contact section is linked with portfolio so no need to refer seperately
        // Linking the style of cv and contact 
        contactLink.style.opacity = "0.6"; 
        contactLink.style.transform = "scale(1)";
    }  else if (isInViewport(document.getElementById("cv"))) {
        homeLink.style.opacity = "0.6";
        homeLink.style.transform = "scale(1)";
        portfolioLink.style.opacity = "0.6";
        portfolioLink.style.transform = "scale(1)";
        cvLink.style.opacity = "1";
        cvLink.style.transform = "scale(1.2)";
        contactLink.style.opacity = "0.6";
        contactLink.style.transform = "scale(1)";
        window.setTimeout(function() {collapsePortfolio()},150);
    } else if (isInViewport(document.getElementById("contact"))) {
        homeLink.style.opacity = "0.6";
        homeLink.style.transform = "scale(1)";
        portfolioLink.style.opacity = "0.6";
        portfolioLink.style.transform = "scale(1)";
        cvLink.style.opacity = "0.6";
        cvLink.style.transform = "scale(1)";
        contactLink.style.opacity = "1";
        contactLink.style.transform = "scale(1.2)";
        window.setTimeout(function() {collapsePortfolio()},150);
    }
}

/* Collapse nav function is active when  the user clicks on hamburger at the cross on top of the website (X), or
 if they click a navigation button, or if their mouse leaves the navigation bar */
function collapseNav() { 
    let navText = document.getElementById("navbarItems");
    let navButton = document.getElementById("navbar-toggler");

    // Setting navbar height to 0, so it animates to nothing
    if(window.innerWidth < 992) {
        navText.style.maxHeight = null; 
    }

    // Setting the navbar toggle button to a hamburger, not X
    navButton.classList.remove("active"); 
}

/* Home scroll function calls collapseNav, to close it, and then scrolls the user to the top of the specified section, 
and 80px down the viewport to avoid it behind navbar */
function homeScroll() {
    let scrollTo = document.getElementById("home");
    collapseNav();
    let scrollCoords = scrollTo.getBoundingClientRect().top + window.pageYOffset - 80;
    window.scrollTo({top: scrollCoords});
}

function portfolioScroll() {
    let scrollTo = document.getElementById("portfolio");
    collapseNav();
    let scrollCoords = scrollTo.getBoundingClientRect().top + window.pageYOffset - 80;
    window.scrollTo({top: scrollCoords});
}

function cvScroll() {
    let scrollTo = document.getElementById("cv");
    collapseNav();
    let scrollCoords = scrollTo.getBoundingClientRect().top + window.pageYOffset - 80;
    window.scrollTo({top: scrollCoords});
}

function contactScroll() {
    let scrollTo = document.getElementById("contact");
    collapseNav();
    let scrollCoords = scrollTo.getBoundingClientRect().top + window.pageYOffset - 80;
    window.scrollTo({top: scrollCoords});
}

// Let image is an array of objects to fill the portfolio, each one of them refers to an image and its information

let image = [ 
    {
        src: "images/myself.JPG",
        title: "Web Project",
        desc: "This is a web development project describing all the skills i have learned so far, and also describing me.",
        date: "July 2020",
        link: "https://github.com/rootvi97/Assignment-2"
    },
    {
        src: "images/QuoteGen.PNG",
        title: "Quote Generator",
        desc: "This quote generator has a selection of random quotes with image background. You can also tweet these quotes through the site.",
        date: "March 2020",
        link: "https://github.com/rootvi97/Quote-Generator"
    },
    {
        src: "images/ToDoList.PNG",
        title: "To Do List",
        desc: "This to do list allows to list items and cross it off, the items persist even when the tab is closed.",
        date: "March 2020",
        link: "https://github.com/rootvi97/Todo-List"
    },
    {
        src: "images/WeatherApp.PNG",
        title: "Weather App",
        desc: "This weather app shows the temperature and weather in the users current location.",
        date: "April 2020",
        link: "https://github.com/rootvi97/Weather-icon"
    },
    {
        src: "images/JavaProject.PNG",
        title: "Java Project",
        desc: "This app involves up to 4 babies playing a game like football. It is entirely worked out from scratch, including the GUI, using the Java language.",
        date: "May 2020",
        link: ""
    },
]; 

// Image count function is used to find the number of image onjects in image arrays
imgCount = () => {
    return image.length;
} 

// The function below is used to find the number of images which is fit on single row of the gallery
maxImgPLine = () => { 
    let size = window.innerWidth;

    // Setting the viewport width to less than 600px, and placinng only one image per row
    /* Math.round function tells the width percentage of the viewport and it is divided by 100px, 
   to calculate the number of 100 px needed in the images to fit in 80% width */
    if(size < 600){
        return 1;     
    }else {
        let num = Math.round((size * 0.8) / 180); 

        // If the number of px is less than one then, fix only one image in a row else, fix maximum of 8 images in  a row
        if (num < 1) {
            return 1; 
        }else{
            if(num < 8){
                return num;
            }else{
                return 8;
            }
        }
    }
}

// The function below is used to find out how many images should be put on a line
imgPerLine = () => { 
    if (maxImgPLine() === 1){
        return 1; 
    }else {
        let value;
        let max = Math.floor(maxImgPLine());

        // Cancelling the interference of iterator z with other for loops
        // For loop takes maximum of 1/3 part of maximum line size
        for (z = 0; z < Math.round(imgCount() / 3); z++) { 

            // If the loop takes off 1 image from maximum per iteration until the total number of images is evenly divisible by the number found
            if((imgCount() % (max - z)) === 0){
                value = (max - z);
            } 
        }

        // If no image is identified then, it will use the maximum size of the line
        if(!value){
            value = max;
        } 

        // If maximum size of line is used then, take half of the line else return to down
        if(value > max / 2) {
            value = max / 2;
        }
        return Math.floor(value); 
    }
}

// Below function describes the total number of images that can be stored in a line
lineTotal = () => {
    return Math.ceil(imgCount() / imgPerLine());
} 

// Build gallery function places images lines in the gallery 
function buildGallery() { 
    let current;
    let next;
    let gallery = document.getElementById("gallery");

    // emptying the galllery
    gallery.innerHTML = ""; 

    /* For every line required, add the HTML to the gallery this means,
    total number of line starts at 1 and i started counting from 0 so, i need one less than the line total
    Fetching the gallery */
    for(i = 0; i <= (lineTotal() - 1); i++){
        current = gallery.innerHTML; 

        // Adding this html to the end of it and the gallery with old items ir replaced by new one
        // The div class is creating serveral rows in grid which has several rows of images with description box and text
        // The description text box in div class uses i as identifier
        next = current + "<div class =\"row\" id=\"grid-" + i + "\"></div><div class = \"descBox\"><div class=\"descText\" id=\"descBox-" + i + "\"></div>"; 
        gallery.innerHTML = next; 
    } 
}

// The fill gallery function fills each line with number of images 
function fillGallery() { 
    let current;
    let num = 0;

    // The for loop uses iterator i-- for total line-1 as i started coutning  from 0 not 1
    // Each line of images is filled in the grid 
    for(i = 0; i <= (lineTotal() - 1); i++){ 
        let grid = document.getElementById("grid-" + i); 

        // Getting contents of the lineto be  added in html and put both items back in
        // This creates buttons for images, clicks for descriptions from images as arrays of the objects
        // Every image is responsible for title section due to hover due to use of boostraap
        for(j = 0; j <= (imgPerLine() - 1); j++){
            current = grid.innerHTML; 
            grid.innerHTML = current + "<div class=\"col\"><button id=\"img" + (num) + "\" onclick=\"addDescription(" + num + ", " + i + ")\"><img src=\"" + image[num].src + "\"  class=\"img-fluid\" alt=\"Responsive image\"><div class=\"middle\">" + image[num].title + "</div></button><div class=\"triangle-up\" id=\"tri" + num + "\"></div></div>";
            num++;
        }
    }
}

// Opening description box and adding requried portfolio items as description
function addDescription(num, line) {

    // Fetching the required box, based on images in gallery line 
    let box = document.getElementById("descBox-" + line); 
    let newContent = "";

    // If the images have links, include it in the contents of the description box
    // Else refer the image in object object array and attributes such as .desc or .title
    if(image[num].link) { 
        newContent = "<h2>" + image[num].title + "</h2><p>" + image[num].desc + "</p><p>" + image[num].date + "</p><div class=\"icon\"><a href=\"" + image[num].link + "\"><i class=\"fab fa-github\" aria-hidden=\"true\"></i></a></div>";
    } else { 
        newContent = "<h2>" + image[num].title + "</h2><p>" + image[num].desc + "</p><p>" + image[num].date + "</p>";
    }

    // There are 3 possibilities for how the content should be entered in the gallery
    // If the current box is closed then, fill in the inner boxes with required contents 
    if(!box.style.maxHeight) {
        box.innerHTML = newContent; 

        // For every line close description box
        for(i = 0; i <= (lineTotal() - 1); i++){ 
            document.getElementById("descBox-" + i).style.maxHeight = null;
        }

        // Hiding all pointers, that point to other images
        for(i = 0; i <= (imgCount() - 1); i++){
            document.getElementById("tri" + i).style.opacity = "0";
        } 

        // Showing the pointer corresponding to image clicked
        document.getElementById("tri" + num).style.opacity = "1";

        // Showing the description box under the image clicked
        //if the clicked box was open and already had the content in it
        box.style.maxHeight = box.scrollHeight + "px";
    } else if (box.style.maxHeight === box.scrollHeight + "px" && box.innerHTML === newContent) { 
        box.style.maxHeight = null;// Close the box
        for(i = 0; i <= (imgCount() - 1); i++){ //hide all pointers again
            document.getElementById("tri" + i).style.opacity = "0";
        }

        // Otherwise (the box is open but has the wrong content)
    } else { 
        box.style.maxHeight = null; //close the box
        for(i = 0; i <= (imgCount() - 1); i++){//hide all image pointers
            document.getElementById("tri" + i).style.opacity = "0";
        }
        // The window is waiting for the box to close, put in the new content, then open the box and show the corresponding pointer
        window.setTimeout(function() {box.innerHTML = newContent; box.style.maxHeight = box.scrollHeight + "px"; document.getElementById("tri" + num).style.opacity = "1";}, 260);
    }
}

// Collapse portfolio function is used to close all boxes in the portfolio and scrolling the portfolio away
// To do so, close every line of coressponding portfolio away and for each image hid its pointer
function collapsePortfolio() { 
    for(i = 0; i <= (lineTotal() - 1); i++){ 
        document.getElementById("descBox-" + i).style.maxHeight = null;
    }
    for(i = 0; i <= (imgCount() - 1); i++){ 
        document.getElementById("tri" + i).style.opacity = "0";
    }
}

// Copy text function puts my email on the clipboard to copy if clicked by the user and tip text gets successful if written
// This function is taken from https://developer.mozilla.org/en-US/docs/Web/API/Clipboard/writeText
function copyText() { 
    navigator.clipboard.writeText("pandyarootvi@gmail.com").then(function() {
        let tip = document.getElementById("tiptext");
        let tipbox = document.getElementById("tip")
        tipbox.style.transform = "scale(1.1) translateX(.4rem)";
        tip.innerHTML = "Copied!"
        window.setTimeout(function() {tipbox.style.transform = "scale(1) translateX(0)"}, 800);

        document.getElementById("mail").addEventListener("mouseleave", function() {window.setTimeout(function() {tip.innerHTML = "Copy E-mail"}, 200)});

      }, function() {
        
        // Alert occurs when the written information is failed and message is displayed as cannot copy
        alert("Sorry, cannot copy.");
      });
} 
