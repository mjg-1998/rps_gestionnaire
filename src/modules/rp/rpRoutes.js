const express = require('express');
const router = express.Router();
const rMiddleware = require('./rpMiddleware');
router.param('rpId', rMiddleware.loadFromParameters);

router.route('/')
    .get(rMiddleware.displayAll)
    .post(rMiddleware.createARp);

router
    .get('/:rpId', rMiddleware.displayARp)
    .put('/:rpId', rMiddleware.modifyARp)
    .delete('/:rpId', rMiddleware.deleteARp);

module.exports = router;