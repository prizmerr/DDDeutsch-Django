const cookie_parser = require("cookie-parser");
const md5 = require("md5");
const express = require("express");
const app = express();
const User = require("../scripts/mongoose").User;
const tgErr = require("../scripts/telegraf").sendTgError;

app.use(cookie_parser());

exports.checkCookies = (req) => {
    if (typeof req.cookies !== "undefined") {
        if (typeof req.cookies[md5("key")] !== "undefined" &&
            typeof req.cookies[md5("id")] !== "undefined") {
            if (checkIfCookieTrue(req)) return true;
            else return false;
        } else {
            return false;
        }
    } else {
        return false;
    }
}

exports.deleteCookies = (res) => {
    res.clearCookie(md5("key"));
    res.clearCookie(md5("id"));
    res.clearCookie(md5("login"));
}


async function checkIfCookieTrue(req) {
    const key = req.cookies[md5("key")];
    const id = req.cookies[md5("id")];

    var cookieTrue = false;

    try {
        const user = await User.findOne({ "id": id })
        if (user !== null) {
            if (md5(user["password"]) === key) cookieTrue = true;
        }
    } catch (err) {
        console.log(err);
        tgErr("functions", "check if cookie true");
    }

    return cookieTrue;
}