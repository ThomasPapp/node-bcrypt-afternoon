async function dragonTreasure(req, res) {
    const db = req.app.get('db');

    try {
        const result = await db.get_dragon_treasure(1);
        res.status(200).json(result);
    } catch (e) {
        console.log('[dragon-treasure]:', e);
    }
}

async function getUserTreasure(req, res) {
    const db = req.app.get('db');

    try {
        const results = await db.get_user_treasure([req.session.user.id]);
        res.status(200).json(results);
    } catch (e) {
        console.log('[user-treasure]', e);
    }
}

async function adduserTreasure(req, res) {
    const { treasureURL } = req.body;
    const { id } = req.session.user;
    const db = req.app.get('db');

    try {
        const results = await db.add_user_treasure([treasureURL, id])
        res.status(200).json(results);
    } catch (e) {
        console.log('[add-user-treasure]:', e);
    }
}

async function getAllTreasure(req, res) {
    const db = req.app.get('db');

    try {
        const results = await db.get_all_treasure();
        res.status(200).json(results);
    } catch(e) {
        console.log('[get-treasure]:', e);
    }
}

module.exports = { 
    dragonTreasure,
    getUserTreasure,
    adduserTreasure,
    getAllTreasure
}