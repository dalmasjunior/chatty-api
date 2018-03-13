const fs = require('../../repository/fs_repo');
const db = fs.firestore();

const user = require('../users/users-service');

const tools = require('../../tools');
const problems = require('../../problems');

class Messages {
    send(req, res) {
        var message = req.body;
        this.validate(message, res, (validated) => {
            if(validated) {
                user.reduceBudget(message.from);
                message.sentAt = new Date().toISOString();
                db.collection('messages').add(message).then(sent => {
                    message.id = sent.id;
                    res.status(201).json(message);
                });
            } else {
                problems.invalidData(res);
            }
        });
    }

    getMessagesTo(req, res) {
        if(tools.validateNotEmptyNotString(req.params.to)) {
            this.validateReceiver(req.params.to, (receiver) => {
                if(receiver) {
                    db.collection('messages').where('to', '==', req.params.to).get().then(messages => {
                        var arrMessages = [];
                        console.log("##########  " +messages.docs.length);
                        for(var i = 0; i < messages.docs.length; i++) {
                            var message = messages.docs[i].data();
                            message.id = messages.docs[i].id;
                            arrMessages.push(message);
                        }
                        res.status(200).json(arrMessages);
                    });
                } else {
                    problems.recipientSender(res, 'GET', '/messages/:{to}');
                }
            })
        } else {
            problems.invalidData(res);
        }   
    }

    getMessageById(req, res) {
        db.collection('messages').doc(req.params.id).get().then(message => {
            var result = message.data();
            result.id = message.id;
            if(result.id) {
                res.status(200).json(result);
            } else {
                problems.messageNotFound(res);
            }
        });
    }

    validate(params, res, cb) {
        if (tools.validateNotEmptyNotString(params.from) && tools.validateNotEmptyNotString(params.to) && tools.validateNotEmptyNotString(params.body)) {
            if (params.body.length < 280) {
                this.validateReceiver(params.to, (receiver) => {
                    if(receiver) {
                        user.findById(params.from, (sender) => {
                            if(sender.id) {
                                cb(sender.budget > 0);
                            } else {
                                problems.recipientSender(res, 'POST', '/messages');        
                            }
                        })
                    } else {
                        problems.recipientSender(res, 'POST', '/messages');
                    }
                });
            } else {
                problems.maxBody(res);
            }            
        } else {
            problems.invalidData(res);
        }
    }

    validateReceiver(to, cb){
        user.findById(to, (receiver) => {
            cb(receiver.id);
        });
    }
}

module.exports = new Messages;