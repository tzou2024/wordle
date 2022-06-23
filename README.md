# Wordle
This is my version of wordle using html, css. and vanilla javascript! (With a few twists)

## Approach Taken
I started off making sure that my html was well organized so I could easily manipulate everything I would need in javascript. I then tackled the logic for a regular game of wordle, trying to keep everything defined with variables in order to incorperate different word lengths. I started with generating the boxes and keyboard, then filling in the boxes correctly, and checking/coloring last. I started off using 2 API's, one to generate the random word, and one to check any user inputs, but was having trouble with asynchronous cross-checking, so I instead found a [rapidAPI wordle creator database](https://rapidapi.com/wakey7dev-voGD0mGppH/api/wordle-creator-tools/) instead.

After that, I worked on adding features like lightning mode, a slider for variable word lengths, a stats tab, and info page, and a refresh method.

## Installation Instructions
Please use your own API key (make one at https://rapidapi.com/wakey7dev-voGD0mGppH/api/wordle-creator-tools/) so I don't have to pay for each guess/word generation!

## Unsolved Problems
I can't figure out how to hide my API key and have it successfully deploy. I can hide my config in my gitignore and it works fine when going live but then the variable is undefined on the deployed page.

