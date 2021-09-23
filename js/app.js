/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
*/

/**
 * Define Global Variables
 *
*/
let navList = document.getElementById('navbar__list');
let docFrag= document.createDocumentFragment();
let sectionX=document.querySelectorAll('section')

/**
 * End Global Variables
 * Start Helper Functions
 *
*/
//this function creates li and a items for the nav
function listSectionCeator(){
    //this loops through all <section> tags
    for (let i = 1; i <= sectionX.length; i++){
        //and for every <section> it creates a <li> and <a>
        let liItem= document.createElement('li');
        let aTag= document.createElement('a');
        // aTag.href='#section'+ i
        //aTag.href='javascript:void(0);';
        aTag.textContent=`Section ${i}`
        aTag.classList.add('menu__link')
        aTag.id=`sec${i}`
        //this inserts every <a> inside <li>
        liItem.append(aTag);
        //and adds every <li> to a document fragment
        docFrag.append(liItem);
    }

}
function scrollAutomated(event) {
        for(let i=1;i<= sectionX.length;i++){
            //this looks for every list item with that id + the variable for lists
            if (event.target.id==='sec'+i) {
                //this function scrolls to relative section
                scrollTo({
                    //i-1 because loop starts at 1 and the first index in sectionX is 0
                    top: sectionX[i-1].offsetTop,
                    left: 0,
                    behavior: "smooth"
                })
            }
        }
}
// this function checks where is each <section> located and based on it assigns the active class
function AssignActiveHelper() {
    let aElement= document.querySelectorAll('a');
    for (let i=0;i<sectionX.length;i++){
        //this line is just to to make the <section> leave the viewport before it ends
        let QuarterSectionHeight=sectionX[i].offsetHeight*0.25;
        // here we check the location of the current window inside the page
        // and if it's within the range of a <section> it adds the active class to it
            if ((window.pageYOffset >= sectionX[i].offsetTop-100)&&
                //here we check if the window is within the current section's height - the quarter of it's size
                (window.pageYOffset<(sectionX[i].offsetTop-QuarterSectionHeight)+sectionX[i].offsetHeight)){
                sectionX[i].classList.add('your-active-class')
                //and since we're already checking the position of the viewport we might as well add it
                //to the corresponding navigation bar link
                //the i+1 here is also because the aElement index starts with 0 so to make it match
                // we just add 1 to the loop
                aElement[i+1].classList.add('Active')
            }else {
                //otherwise it removes the active class from the section and the navigation bar link
                sectionX[i].classList.remove('your-active-class')
                aElement[i+1].classList.remove('Active')
            }
    }
}
// this one here makes the navigation bar responsive
function dropdownMenu() {
    //we add a class to the <ul>
    navList.classList.add('navbar__class');
    //check if it has it or not, based on the outcome we either assign another class to make it responsive
    if (navList.className==='navbar__class'){
        navList.classList.add('responsive')
    }else{
        navList.classList.remove('responsive')
    }
}
//this one just adds another item to the navigation bar
function responsiveNavBuilder(){
    let responsiveLiItem=document.createElement('li')
    let responsiveAItem=document.createElement('a')
    responsiveAItem.classList.add('dropdown','menu__link');
    responsiveAItem.innerHTML='&#9776;'
    responsiveLiItem.append(responsiveAItem)
    responsiveAItem.addEventListener('click',dropdownMenu)
    //here we add that item to a document fragment to make it a bit easier on performance
    docFrag.append(responsiveLiItem)
}
/**
 * End Helper Functions
 * Begin Main Functions
 *
*/
//here we initiate the navigation bar item function
function createListItem() {
    listSectionCeator()
    //and add the document fragment to the <ul>
    navList.append(docFrag);

}
//here we initiate the function that locates the current window
function navScroll() {
    // here we add an event listener to the <ul> when the mouse is over it it fires
    navList.addEventListener('mouseover',function (event) {
        //here we add another event listener to the individual <li>
        //i'm not sure if that's a good practice or not to be honest,
        // it's just the solution that i found to solve that problem
        event.target.addEventListener('click',scrollAutomated )
    })

}

//here we initiate the current active section function
function assignActive() {
    window.addEventListener('scroll',AssignActiveHelper)
}
//this one here adds a button at the bottom of the page that scrolls back up to the very top
function ScrollTopButton() {
    let toTopBtn= document.createElement('button');
    toTopBtn.classList.add('toTop');
    toTopBtn.innerHTML='&#8593;'
    toTopBtn.onclick=function () {
        scrollTo({
            x:0,
            top:0,
            behavior: 'smooth'
        })
    }
    //here we check if the current window is scrolled down or not,
    // based on the outcome we either add the button if we're scrolled, or hide it when we're at the top
    window.addEventListener('scroll',function () {
                if (window.pageYOffset<=50){
                    toTopBtn.style.display='none'
                }else{
                    toTopBtn.style.display='block'
                }
    })
    document.body.append(toTopBtn)
}
//here we initiate the responsive navigation bar function
function responsiveNav() {
    responsiveNavBuilder()
    //here we add the document fragment to the <ul> as well
    navList.append(docFrag)
}
responsiveNav()
createListItem();

assignActive()


navScroll()

/**
 * End Main Functions
 * Begin Events
 *
*/



ScrollTopButton()

