# Chatty API

Welcome to Chatty API challenge.

Yawoen company has hired you to implement an API. 

This API will be used to control users exchanging messages between each other.

## Rules

 * Every new user must receive 10 credits to send messages.
 * Every message successfully sent must charge 1 credit from sender's budget.
 * A user is not allowed to send message if she run out of budget.

## API Specification

Chatty API comes with an [OpenAPI 3](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.1.md) specification. 
You should implement the API following this specification closely.

Publish HTML version ([docker](https://www.docker.com/community-edition) required):

```console
$ make publish-documentation
```

Then navigate to [http://localhost:7070](http://localhost:7070)

## Important notes
 
 * More than one instance of the application will serve HTTP requests at the same time.
 * Make sure other programmers can easily run the application locally.
 * Yawoen doesn't care about the language, the database and other tools that you might choose 
however make sure your decisions take notice of the market. 
For example, Brainfuck might not be a good decision.

## Deliverable

A git repo hosted wherever you like.
Make sure Yawoen folks will have access to the source code.
If you prefer, just compress this directory and send it back to us.

**Have fun!**
