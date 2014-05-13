# EmailGuide [ ![Codeship Status for Pentiado/email-guide](https://www.codeship.io/projects/2a8b9360-ba90-0131-330f-0aa8124e7323/status?branch=master)](https://www.codeship.io/projects/20908) [![Coverage Status](https://coveralls.io/repos/Pentiado/email-guide/badge.png?branch=master)](https://coveralls.io/r/Pentiado/email-guide?branch=master)

> The Ultimate Guide for developing your emails. Pass your message to EmailGuide and it will parse it with Campaign Monitor's [Guide to CSS support in email](http://www.campaignmonitor.com/css/) and return similar table but in JSON. Do you want visual tool? Check out my [CatchMe](https://github.com/Pentiado/catch-me) app.

## Usage

Install `email-guide`:
```
npm install email-guide --save
```

Require it and pass your email through
```
var emailGuide = require('email-guide');
var email = '<html><head></head><body><h1 style="color: red">My email</h1></body></html>'
emailGuide(email, function (err, result) {
});

```

## Testing

Running `npm test` will run the unit tests with mocha.

## Todo

- LazyJS -> There is a lot of iterating over objects and arrays, lazy evaluation might bring great performance impact.
- guide.xlsx -> Campaign monitor provide xlsx, extended version of guide. At the beginning of this project I was using but later I discovered some issues with parsing it, more email clients than are visible, not equal number of columns. Parsing by rows doesn't work. Right now there is just simple crawler that collects data from web page, but soon I will take different approach to getting info from xlsx.

## Credits
* [campaignmonitor](campaignmonitor.com) because they created awesome css guide to emails

## Author

Copyright 2014, Paweł Wszoła