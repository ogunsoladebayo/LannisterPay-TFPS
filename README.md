# lannisterpay-tfps

## Table of Contents

-   [About](#about)
-   [Getting Started](#getting_started)
-   [Usage](#usage)

## About <a name = "about"></a>

A NGN (Nigerian Naira) fee processing service for a fictional Payment Processor (LannisterPay)

## Getting Started <a name = "getting_started"></a>

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Please be sure to have the following installed on your local machine before proceeding.

-   [Node.js](https://nodejs.org/en/)
-   [Nodemon](https://nodemon.io/)
-   [MongoDB](https://www.mongodb.com/)

    Rename the file <code>.env.sample</code> in root directory to <code>.env</code> in the same directory and setup
    all required environment variables in the <code>.env</code> file

### Installing

    Install the dependencies by running command <code>npm install</code>  in the root directory of the project.

Run on development mode with <code>npm run dev</code> in the root directory of the project

or...

Run on production mode with <code>npm run prod</code> in the root directory of the project

End with an example of getting some data out of the system or using it for a little demo.

## Usage <a name = "usage"></a>

Available endpoints are /fees and /compute-transaction-fee
