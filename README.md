# MyBookList API

The back-end for a full-stack social media web application that uses the Google Books API and allows users to search for books and add them to their list and users can also share their list with others.

**Link to project:** https://mybooklist.vzmars.com

**Front-End:** https://github.com/vzMars/mybooklist

![alt text](https://i.imgur.com/bxRXgX2.png)
![alt text](https://i.imgur.com/JCjjs0B.png)

## How It's Made:

**Tech used:** JavaScript, Node.js, Express, MongoDB, Passport

The back-end for this application was made using Node.js and Express. This application was organized using the MVC (Model-View-Controller) design pattern. MongoDB is used as the database which stores all the users and their books. The User model contains the email, username, and password and has helper methods for signing up and comparing passwords. Passport is used for authentication and passwords are hashed using bcrypt and user sessions are stored in MongoDB. The Book model contains the book id, title, authors, cover, the user who added the book to their list, and the status. The Google Books API is used when the client is searching for a book and when the client wants to see the details of that book. The back-end also prevents users from adding/updating/deleting books that don't belong to them by using the user that is found in req.user.

## Optimizations:

I would like to add an error handler middleware to the back-end of this application because right now every error-related response that is sent over to the client is just a generic 400 Bad Request response. I would like to use an error handler middleware that can handle errors that have different responses. For example, if a user was trying to sign up with a username or email that has already been taken it would make sense to respond with a 409 Conflict response, or if a user is trying to log in and they have inputted an incorrect username or password the back-end should respond with a 401 Unauthorized response. I would also like to try converting this application from using JavaScript to TypeScript. I would like to try using JWTs for authentication instead of using sessions since I've never tried that form of authentication before.

## Lessons Learned:

With this application, I have learned how to separate my front-end and back-end and deploy both of them on different subdomains of the same domain for example:

- `Front-End`: mybooklist.example.com
- `Back-End`: api.example.com.

Before deploying to different subdomains I was having issues with the API not working properly on IOS/Safari even though it worked on Chrome and Firefox. For example, when a user would log in the cookie that was sent by the back-end would not be set on the front-end and when the client refreshes the application the user would log off even though they were currently logged in. Both the front-end and back-end are deployed on render.com.

## More Projects:

Take a look at these other projects that I have in my portfolio:

**Employee CRM API:** https://github.com/vzMars/employee-crm-api

**GameBlog API:** https://github.com/vzMars/gameblog-api

**MangaNotifications:** https://github.com/vzMars/manga-notifications
