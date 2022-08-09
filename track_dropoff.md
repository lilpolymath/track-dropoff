# Prompt

Create a basic server written in node.js (or in python) that can host a basic react frontend which gathers all clientside information that can be used to track the user even if he doesn't sign up. Both Question 1 and Question 2 are required in order to make it to the next round

## Question 1

You direct people to visit your website. It is a web app and it has a button that prompts the user to pay for the product.

However, roughly a third of the users who go to the site forget to purchase and close the browser tab for some reason.

Create a webpage that can be hosted statically that satisfies the following requirements

- Track's the client IP address
- Track whether the client allowed cookies or not
- Track the language of the client
- Determine whether the visitor is on a desktop device or a mobile device
- Determine the name of the browser used by the client
- Determine the dimensions of the browser (e.g. `1792x1120 pixels`)

## Question 2

- Use the following to [library](https://github.com/ericvicenti/ssh-keygen) to generate a unique keypair
- Upon unique web visit, the server stores this information and logs it to a file associating the data to the public key generated
- When you open the webpage both on your mobile device and on your desktop device, the server counts both instances as the same user

## Deliverable

Submit both deliverables

1. A screen recording using Zoom (or similar tool) that shows you demonstrating your deliverables for Question 1 and Question 2
2. Deliverable submitted in the form of a link to a repository that satisfies the requirements for each question
