var express = require('express');
var router = express.Router();
const axios = require('axios');

const token = 'o7T9m9-09Cz4OUK2J10IB_zC6yJBeuXaS6LWJGTuWgY';
const URL = 'https://api.producthunt.com/v1/';
let headers = {
    Authorization: 'Bearer ' + token,
};

/* Get all posts */
router.get('/posts', async function (req, res, next) {
    await axios.get(URL + 'posts', {headers: headers}).then((data) => {
        res.send(data.data.posts);
    }).catch(error => res.send(error));
});

/* Get post by day */
router.get('/posts_day', async function (req, res, next) {
        let day = req.query.day;
        console.log(day);

        await axios.get(URL + 'posts?day=' + day, {headers: headers}).then((data) => {
            res.send(data.data.posts);
        }).catch(error => res.send(error));
    }
);

module.exports = router;
