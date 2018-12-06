const express = require('express');
const router = express.Router();


router.use('/characters', require('./modules/character/characterRoutes'));
router.use('/rps', require('./modules/rp/rpRoutes'));




router.route('/')
    .get(function (req, res) {
            res.send('Page d\'accueil de gestionnaire de RPS');
        }
    )
    .post(function (req, res) {
        res.send('Accueil EN POST');
    });


module.exports = router;