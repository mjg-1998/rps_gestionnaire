const express = require('express');
const router = express.Router();

/*
router.use('/character', require('./modules/character/characterRoutes'));
router.use('/empire', require('./modules/empire/empireRoutes'));
router.use('/groups', require('./modules/group/groupRoutes'));
*/


router.route('/')
    .get(function (req, res) {
            res.send('Page d\'accueil de gestionnaire de RPS');
        }
    )
    .post(function (req, res) {
        res.send('Accueil EN POST');
    });


module.exports = router;