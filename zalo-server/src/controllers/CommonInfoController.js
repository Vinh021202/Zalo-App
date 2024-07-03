const WebInfo = require('../models/WebInfo');

// /common
class CommonInfoController {
    async getWebInfo(req, res, next) {
        try {
            const webInfo = await WebInfo.find();
            res.json(webInfo);
        } catch (err) {
            next(err);
        }
    }

    // [GET] /google-captcha
    async getGoogleCaptcha(req, res, next) {
        res.json({
            ENABLE_GOOGLE_CAPTCHA: new Boolean(
                process.env.ENABLE_GOOGLE_CAPTCHA
            ),
            KEY_GOOGLE_CAPTCHA: process.env.KEY_GOOGLE_CAPTCHA,
        });
    }
}

module.exports = new CommonInfoController();
