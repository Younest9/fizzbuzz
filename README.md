# Fizzbuzz

This repository contains automated end-to-end tests for the "FizzBuzz" web application. The tests are designed to verify the correct behavior of the application when different numbers are submitted through the input field. The tests cover scenarios such as Fizz, Buzz, FizzBuzz, and ordinary numbers, along with handling empty input.

## Table of Contents
- [Introduction](#introduction)
- [Setup](#setup)
- [Running the tests](#running-the-tests)
- [Continuous Integration](#continuous-integration)
- [Documentation](#documentation)
- [Bonus Features](#bonus-features)


## Introduction

The FizzBuzz web application is a simple web application that takes a number as input and returns a string based on the following rules:

- If the number is divisible by 3, return "Fizz"
- If the number is divisible by 5, return "Buzz"
- If the number is divisible by 3 and 5, return "FizzBuzz"
- Otherwise, return the number

The application is written in HTML and JavaScript.

## Setup

To run the tests locally, you will need to install the following:

- [Git](https://git-scm.com/downloads)
- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Running the tests

Clone the repository and navigate to the root directory of the repository. 
```bash
git clone https://github.com/younest9/fizzbuzz
```

To run the tests, run the following command from the root directory of the repository:

```bash
docker-compose up -d --build -V
```

This will build 2 Docker containers: one for the application and one for the tests. The tests will run automatically and the results will be displayed as screenshots in the `test/screenshots` directory. The screenshots will be named according to the value of the input field. For example, if the input field contains the value `3`, the screenshot will be named `3.png`.

It will create a network called `test` and attach the containers to it. 
It will also create a bind mount volume in the test directory of the repository. It will be used to store the test results and screenshots.

To view the screenshots, open the `test/screenshots` directory and double-click on the screenshot you want to view. The screenshot will open in your default image viewer.

To view the test results, open the `test/documentation.md` file. This file contains a detailed description of the tests, along with screenshots of the application's behavior for each test.

To stop the containers, run the following command from the root directory of the repository:

```bash
docker-compose down
```

## Continuous Integration



## Documentation

The tests are written using simple JavaScript.

For detailed documentation on the tests, see the [documentation.md](./test/documentation.md) file generated after running the tests.

## Bonus Features

The following bonus features were implemented:


## References

- [Playwright Docker Alpine](https://github.com/fivemru/playwright-docker-alpine)
- [Dockerize](https://github.com/jwilder/dockerize)