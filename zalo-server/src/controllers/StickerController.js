const stickerService = require('../services/StickerService');

class StickerController {
    async getAll(req, res, next) {
        try {
            const stickers = await stickerService.getAll();
            res.json(stickers);
        } catch (err) {
            next(err);
        }
    }
}

module.exports = new StickerController();
