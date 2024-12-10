const _ = require('lodash');
const users = require('../models/usersQueries.js');
const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.JWT_SECRET

async function login(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send("Missing required fields: email or password.");
    }

    try {
        const user = await users.findByEmail(email);
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).send("Invalid email or password.");
        }
        const token = jwt.sign(
            { id: user.user_id, email: user.email },
            SECRET_KEY,
            { expiresIn: '1h' }
        );
        res.json({ token });
    } catch (err) {
        console.error("Error during login:", err);
        res.status(500).send("Error logging in.");
    }
}

function createUser(req, data) {
    const protocol = req.protocol,
        host = req.get('host'),
        id = data.user_id;

    return {
        user_id: id,
        name: data.name,
        email: data.email,
        created_at: data.created_at,
        updated_at: data.updated_at,
        url: `${protocol}://${host}/${id}`,
    };
}

async function getAllUsers(req, res) {
    const allEntries = await users.all();
    return res.send(allEntries);
}

async function getUser(req, res) {
    const user = await users.get(req.params.id);
    return res.send(user);
}

async function postUser(req, res) {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).send("Missing required fields: name, email, or password.");
    }

    try {
        const created = await users.create({ name, email, password });
        return res.send(createUser(req, created));
    } catch (err) {
        console.error("Error creating user:", err);
        res.status(500).send("Error creating user.");
    }
}

async function patchUser(req, res) {
    const updatedFields = req.body;

    if (!updatedFields.name && !updatedFields.email && !updatedFields.password) {
        return res.status(400).send("At least one field (name, email, password) must be provided for update.");
    }

    try {
        const patched = await users.update(req.params.id, updatedFields);
        return res.send(createUser(req, patched));
    } catch (err) {
        console.error("Error updating user:", err);
        res.status(500).send("Error updating user.");
    }
}

async function deleteAllUsers(req, res) {
    const deletedUsers = await users.clear();
    return res.send(deletedUsers.map(_.curry(createUser)(req)));
}

async function deleteUser(req, res) {
    const deleted = await users.delete(req.params.id);
    return res.send(createUser(req, deleted));
}

function addErrorReporting(func, message) {
    return async function (req, res) {
        try {
            return await func(req, res);
        } catch (err) {
            console.log(`${message} caused by: ${err}`);
            res.status(500).send(`Oops! ${message}.`);
        }
    };
}

const toExport = {
    getAllUsers: { method: getAllUsers, errorMessage: "Could not fetch all users" },
    getUser: { method: getUser, errorMessage: "Could not fetch user" },
    postUser: { method: postUser, errorMessage: "Could not post user" },
    patchUser: { method: patchUser, errorMessage: "Could not patch user" },
    deleteAllUsers: { method: deleteAllUsers, errorMessage: "Could not delete all users" },
    deleteUser: { method: deleteUser, errorMessage: "Could not delete user" }
}

for (let route in toExport) {
    toExport[route] = addErrorReporting(toExport[route].method, toExport[route].errorMessage);
}

module.exports = toExport;