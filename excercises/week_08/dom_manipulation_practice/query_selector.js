
// Get the element with an ID of 'first' using querySelector
const first = document.querySelector('#first');
console.log(first)
// Get the elements with a class of 'second' with querySelector
const second = document.querySelector('.second')
console.log(second)
// Try the above prompt with querySelectorAll. What's the difference between what these two methods return?
const seconds = document.querySelectorAll('.second')
console.log(seconds)
// Get the span element using querySelector
const span = document.querySelector('span')
console.log(span)
// Get multiple span elements using querySelectorAll
const spans = document.querySelectorAll('span')
console.log(spans)
// Select only "a" tags *directly inside* of a div (no grandchildren).
const anchor = document.querySelector('div a')
console.log(anchor)
// Select all elements that contain a "data-target" attribute
const dataTarget = document.querySelectorAll('[data-target]');
console.log(dataTarget)
// Select all elements where the data-target attribute equals "#false"
const dataTargetFalse = document.querySelector('[data-target="#false"]');
console.log(dataTargetFalse)