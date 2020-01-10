const express = require('express');
const router = express.Router();

router.get('/dashboard', (req, res) => {
    if (req.session.loggedIn != true) res.redirect('/login')
    else

        res.render('dashboard.hbs', {
            title: 'Dashboard',
            dashboardStatus: 'active'
        })
})

module.exports = router;