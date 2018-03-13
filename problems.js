var model = {
    type: "",
    title: "",
    status: 0,
    detail: "",
    details: [],
    instance: ""
}

class Problems {
    invalidUsername(res) {
        var problem = model;

        problem.type = "POST";
        problem.title = "Invalid Username";
        problem.status = 400;
        problem.detail = "The user object is bad formatted, missing attributes or has invalid values.";
        problem.instance = '/users/create';

        res.status(problem.status).json(problem);
    }

    duplicatedUsername(res)  {
        var problem = model;

        problem.type = "POST";
        problem.title = "Duplicated Username";
        problem.status = 409;
        problem.detail = "The username is already taken by another user.";
        problem.instance = '/users/create';

        res.status(problem.status).json(problem);
    }

    userNotFound(res, instance) {
        var problem = model;

        problem.type = "GET";
        problem.title = "User Not Found";
        problem.status = 404;
        problem.detail = "The user was not found.";
        problem.instance = instance;

        res.status(problem.status).json(problem);
    }

    invalidData(res) {
        var problem = model;

        problem.type = "POST";
        problem.title = "Invalid data provided";
        problem.status = 400;
        problem.detail = "The request is missing required attributes or the values are invalid";
        problem.instance = '/messages/send';

        res.status(problem.status).json(problem);
    }

    maxBody(res) {
        var problem = model;

        problem.type = "POST";
        problem.title = "Max length exceeds";
        problem.status = 400;
        problem.detail = "The body exceeds max length";
        problem.instance = '/messages/send';

        res.status(problem.status).json(problem);
    }

    recipientSender(res, type, instance) {
        var problem = model;

        problem.type = type;
        problem.title = "Recipient or Sender not found.";
        problem.status = 404;
        problem.detail = "The recipient or sender was not found.";
        problem.instance = instance;

        res.status(problem.status).json(problem);
    }

    messageNotFound(res) {
        var problem = model;

        problem.type = "GET";
        problem.title = "Message not found.";
        problem.status = 404;
        problem.detail = "The message was not found.";
        problem.instance = '/message/:{id}';

        res.status(problem.status).json(problem);
    }
}

module.exports = new Problems;