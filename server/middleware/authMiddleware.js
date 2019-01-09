function usersOnly(req, res, next) {
    if (!req.session.user) {
        res.status(401).send('Please login');
        return;
    }

    next();
}

function adminsOnly(req, res, next) {
    if (!req.session.user.isAdmin) {
        res.status(403).send("You're not an admin");
        return;
    }

    next();
}

module.exports = {
    usersOnly,
    adminsOnly
}