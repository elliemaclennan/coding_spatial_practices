/*
    Instructions:
    
    We're going to practice DOM manipulation for collections of elements.
    In the first example, we only grabbed elements that had IDs. This allowed us to work with individual elements.

    However, in this example we're going to select groups of elements and see how to work with them.

    * Look at collections.html and examine the HTML.
    * Also open collections.js in VS Code. We're going to write our JavaScript here.
    * Open collections.html in Chrome.
*/



/*
    Part 1 -- Use .querySelectorAll to retrieve all of the <li> elements.
    Set .style.borderBottom on each of them.
*/
const list = document.querySelectorAll(".datatype, .loop, .function");

for(let i = 0; i < list.length; i = i + 1) {
    list[i].style.borderBottom="thin solid red";
}


/*
    Part 1I -- Use .querySelectorAll to retrieve all of the elements with the class of datatype.
    Turn all of them red.
    * Hint: you'll need to use the .style.color property and loop over each element.
*/



/*
    Part 1II -- Use .querySelectorAll to retrieve all of the elements with a class of function.
    Use a loop to change color of each one to blue.
*/
