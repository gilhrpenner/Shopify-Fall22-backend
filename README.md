# Shopify - Fall 2022 Backend Challenge

Welcome to my submission for the fall 2022 backend challenge! 👋

You can view the demo app on [Replit](https://replit.com/@gilhrpenner/Shopify-Fall22-backend)\
Check the API documentation [here](https://github.com/gilhrpenner/Shopify-F22-backend/wiki/API-Documentation) or [here](https://shopify-f22-backend.gilhrpenner.repl.co/docs/) to use swagger-ui for testing 🙌

- [Shopify - Fall 2022 Backend Challenge](#shopify---fall-2022-backend-challenge)
- [System requirements](#system-requirements)
- [Description](#description)
  * [But how does it work?](#but-how-does-it-work-)
  * [Architecture and design decisions](#architecture-and-design-decisions)
- [Getting started](#getting-started)
- [Tests](#tests)
- [Areas for future improvement & development](#areas-for-future-improvement---development)

# System requirements
- [Nodejs](https://nodejs.org/en/) >= 16 installed,
- [Yarn](https://yarnpkg.com/), but you can also use `npm`.

# Replit
- The testing sometimes may timeout because replit is super slow but everything should run properly on
- This application was designed with Node >=18 in mind but Replit can only install up to Node 16
# Description
A detailed description of the challenge can be viewed [here](https://docs.google.com/document/d/1PoxpoaJymXmFB3iCMhGL6js-ibht7GO_DkCF2elCySU/edit).

TL;DR: Build an inventory tracking web application for a logistics company where you can `create`, `edit` and `delete` products and you can also `assign` those products to different warehouses/locations that you can also `create`, `update` and `delete` them.

## But how does it work?
Basically, you can create warehouses and assign products to their location.
For instance, you can create a warehouse called "My warehouse" and in this warehouse you can set a maximum num of aisles and bins per aisles, just like any other store, such as IKEA.

After you create a warehouse you can add products, those products won't be assigned to any warehouse when you first add them, but then you can assign a product to a specific warehouse, aisle and bin.

For this app we won't be tracking bins usage, but this feature could be very neat to pinpoint an exact product location.

## Architecture and design decisions
Although I still have a lot to learn, I try to keep my code **clean**, meaning that I avoid using comments as I aim to make the code self-describing so that others and even myself can understand and most importantly, maintain it.

I also try to follow all the **SOLID** principles as this is the only way to a scalable and resilient application.

Based on that, I have the following structure:\
Controllers, Services, Repositories and Entities are all separated into different files, this way it would be fairly simple to change frameworks or providers.

For instance, this project current uses in-memory data "persistence", if we were to change this all we had to do is create a new repository that extends to an interface and implement the functionality. We can even have the in-memory and something like Prisma and just use `Dependency Inversion Principle` and interchangeably switch repositories without having to worry about the rest of the codebase.

Same goes for the `http` module, we could easily swap it to GraphQL in a heartbeat.

# Getting started
First things first, make sure you have nodejs >= 16 installed.

```bash
# Clone the app
git clone https://github.com/gilhrpenner/Shopify-F22-backend.git

# Enter the folder
cd Shopify-F22-backend

# Install all dependencies
yarn install

# Run the application in dev mode
yarn dev
```

Here are the other commands you may use
```bash
yarn replit # Install, build and start in production mode on replit
yarn start # Run the application in production mode
yarn build # Transpile TypeScript to JavaScript
yarn dev # Used for development, uses tsnd to watch for code changes and reload the app
yarn lin # Check for linting issues
yarn lint-fix # Fix linting issues
yarn test # Run unit tests and integration test for code confidence and resilience
```

# Tests
This project has 19 test suites and 66 tests between unit and integration testing.
To put it in a very simple way, tests should the foundation of any project and having it all green checks gives a serotonin boost! 🤤

# Areas for future improvement & development
There are a lot of things that could be improved, such as persisting data with a database instead of just persisting it in memory. But I think, overall, this code has little tech debt being the vast majority of them relying on dependencies but it is an inevitable evil.

For features, I think it would be pretty cool to finish implementing the aisles and bins feature, currently we can assign several products to the same aisle/bin while in real life we would probably want each bin to have only on product. This would allow us to have a map of the warehouses.

A batch system where a user can create many products and assign them to locations in one go would also be very helpful.
