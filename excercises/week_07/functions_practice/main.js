/*
    Write a function for each of the following problems:

    [1] Console logs "hello"
    [2] Console logs "world"
    [3] Takes a parameter called "name" and console logs it
    [4] Takes a parameter called "name" and console logs "hello" + name
    [5] Takes a parameter called "number" and multiplies it by itself, then console logs the result
    [6] Take a number as a parameter and return itself squared
    [7] Have 3 optional parameters, all numbers. Add all the numbers together. If the function is called without passing any numbers in, simply return 10
*/

function sayHello(){
    console.log('Hello')
}
sayHello()

function callName(name, city, age){
    console.log("Hello my name is " + name + " and I am from " + city)
    console.log(`Hello, my name is ${name}, I am ${age} years old and I am from ${city}`)
}
callName("Kevin", "Los Angeles", 25)
callName("Celeste", "New York", 25)
