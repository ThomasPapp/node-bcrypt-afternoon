const bcrypt = require('bcryptjs');

async function register(req, res) {
    const { username, password, isAdmin } = req.body;
    const db = req.app.get('db');

    try {
        const result = await db.get_user([ username ]);
        if (result[0]) {
            res.status(409).json({ error: 'Username taken' });
            return;
        }
    } catch (e) {
        console.log('[get_user]:', e);
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    try {
        const result = await db.register_user([ isAdmin, username, hash ]);
        const user = result[0];
        req.session.user = {
            isAdmin: user.is_admin,
            username: user.username,
            id: user.id
        }
        res.status(201).json(req.session.user);
    } catch (e) {
        console.log('[register_user]:', e);
    }
}

async function login(req, res) {
    const { username, password } = req.body;
    const db = req.app.get('db');

    let user;
    try {
        const results = await db.get_user([ username ]);
        user = results[0];
    } catch(e) {
        console.log('[login]:', e);
    }

    // no user found with the given username
    if (!user) {
        res.status(401).json({ error: 'User not found. Please register as a new user before logging in' });
        return;
    }

    let isAuthenticated;
    try {
        isAuthenticated = await bcrypt.compare(password, user.hash);
    } catch (e) {
        console.log('[login-auth]:', e);
    }

    if (!isAuthenticated) {
        res.status(403).json({ error: 'Incorrect passowrd' });
        return;
    }

    req.session.user = {
        isAdmin: user.is_admin,
        username: user.username,
        id: user.id
    }

    res.status(200).json(req.session.user);
}

function logout(req, res) {
    req.session.destroy();
    res.sendStatus(200);
}

module.exports = {
    register,
    login,
    logout
}