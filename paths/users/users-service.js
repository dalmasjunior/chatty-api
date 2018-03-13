const fs = require('../../repository/fs_repo');
const db = fs.firestore();

const tools = require('../../tools');
const problems = require('../../problems');

class Users {
    create(req, res) {
        var newUser = req.body;
        if(this.validate(newUser)) {
            this.verifyDuplicated(newUser.username, (result) => {
                if (result) {
                    newUser.budget = 10;
                    newUser.createdAt = new Date().toISOString();
                    newUser.updatedAt = newUser.createdAt;
                    db.collection('users').add(newUser).then((user) => {
                        newUser.id = user.id;
                        res.status(201).json(newUser);
                    });
                } else {
                    problems.duplicatedUsername(res);
                }
            });
        } else {
            problems.invalidUsername(res);
        }        
    }

    find(req, res) {
        this.findById(req.params.id, (user) => {
            if(user.id) {
                res.status(200).json(user);
            } else {
                problems.userNotFound(res, '/users/:{id}');
            }
        });
    }

    findById(id, cb) {
        db.collection('users').doc(id).get().then((user) => {
            var result = {};
            if(user.exists) {
                result = user.data();
                result.id = user.id;
            }
            cb(result);
        });
    }

    reduceBudget(id) {
        this.findById(id, (user) => {
            db.collection('users').doc(id).update({
                budget:  user.budget - 1
            });
        }); 
    }

    validate(user) {
        var regex = /^[a-z][a-z_\.\-0-9]*/g;
        let m;
        m = regex.exec(user.username);
        if ((m !== null)){
            m.forEach((match, index) => {
                var newUser = `${match}`;
                 return newUser.length == user.username.length && tools.validateNotEmptyNotString(user.name) && tools.validateNotEmptyNotString(user.username);
            });
        }
    }

    verifyDuplicated(username, cb) {
        
        var usersRef = db.collection('users');
        usersRef.where('username', '==', username).get().then(value => {
            cb(value.docs.length < 1)
        });
    };
}

module.exports = new Users;