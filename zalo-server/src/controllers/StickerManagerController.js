const stickerService = require('../services/StickerService');

class StickerManagerController {
    // [POST]
    async createStickerGroup(req, res, next) {
        try {
            const stickerGroup = await stickerService.createStickerGroup(
                req.body
            );
            res.status(201).json(stickerGroup);
        } catch (err) {
            next(err);
        }
    }

    // [PATCH] /:id
    async updateStickerGroup(req, res, next) {
        const { id } = req.params;

        try {
            await stickerService.updateStickerGroup(id, req.body);
            res.json();
        } catch (err) {
            next(err);
        }
    }

    // [DELETE] /:id
    async deleteStickerGroup(req, res, next) {
        const { id } = req.params;

        try {
            await stickerService.deleteStickerGroup(id);
            res.status(204).json();
        } catch (err) {
            next(err);
        }
    }

    // [POST] /:id
    async addSticker(req, res, next) {
        const { file } = req;
        const { id } = req.params;

        try {
            const url = await stickerService.addSticker(id, file);
            res.status(201).json({ url });
        } catch (err) {
            next(err);
        }
    }

    //[DELETE] /:id/sticker?url=
    async deleteSticker(req, res, next) {
        const { id } = req.params;
        const { url = '' } = req.query;

        try {
            await stickerService.deleteSticker(id, url);
            res.status(204).json();
        } catch (err) {
            next(err);
        }
    }
}

module.exports = new StickerManagerController();
