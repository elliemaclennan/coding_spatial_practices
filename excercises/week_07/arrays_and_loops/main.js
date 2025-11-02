/*
    We have an array of people's ages, saved in the variable ages. 
    Write a for-loop that will print each of the elements to the console.
    let ages = [29, 27, 24, 31, 23, 28, 26, 30, 25, 23]


    We have an array of names, saved in the variable names.
    Write a for-loop that will print each of the elements to the console.
    let names = ["Olivia", "Ethan", "Isabella", "Liam", "Sophia", "Noah", "Ava", "Mason"]
*/

let ages = [29, 27, 24, 31, 23, 28, 26, 30, 25, 23]

for(let i = 0; i < ages.length; i = i + 1){
    console.log(ages[i])
}

let names = ["Olivia", "Ethan", "Isabella", "Liam", "Sophia", "Noah", "Ava", "Mason"]

for(let i = 0; i < names.length; i = i + 1){
    console.log(names[i])
}

// declare function
function multiply(num1, num2){
    return num1 * num2
}
// call the function
console.log(multiply(5, 3), multiply(25, 33))
// console.log(multiply(25, 33))
// console.log(multiply(2, 3))