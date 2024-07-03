const redisDb = require('../app/redis');
const lastViewService = require('../services/LastViewService');
const UserModel = require('../models/User');
const handleLeave = async (userId) => {
    try {
        const cachedUser = await UserModel.findById(userId);
        if (cachedUser) {
            cachedUser.isOnline = false;
            cachedUser.lastLogin = new Date();
            await cachedUser.save();
        }
    } catch (error) {
        console.error('Error handling leave:', error);
    }
};

const handleJoin = async (userId) => {
    try {
        const cachedUser = await UserModel.findById(userId);
        if (cachedUser) {
            cachedUser.isOnline = true;
            cachedUser.lastLogin = null;
            await cachedUser.save();
        }
    } catch (error) {
        console.error('Error handling join:', error);
    }
};

const getUserOnline = async (userId, cb) => {
    try {
        const cachedUser = await UserModel.findById(userId);
        if (cachedUser) {
            const { isOnline, lastLogin } = cachedUser;
            cb({ isOnline, lastLogin });
        }
    } catch (error) {
        console.error('Error getting user online:', error);
    }
};

const socket = (io) => {
    io.on('connect', (socket) => {
        socket.on('disconnect', () => {
            const userId = socket.userId;

            if (userId) handleLeave(socket.userId);
        });

        socket.on('join', (userId) => {
            socket.userId = userId;
            socket.join(userId);
            handleJoin(userId);
        });

        socket.on('join-conversations', (conversationIds) => {
            conversationIds.forEach((id) => socket.join(id));
        });

        socket.on('join-conversation', (conversationId) => {
            socket.join(conversationId);
        });

        socket.on('leave-conversation', (conversationId) => {
            socket.leave(conversationId);
        });

        socket.on('typing', (conversationId, me) => {
            socket.broadcast
                .to(conversationId)
                .emit('typing', conversationId, me);
        });

        socket.on('not-typing', (conversationId, me) => {
            socket.broadcast
                .to(conversationId)
                .emit('not-typing', conversationId, me);
        });

        socket.on('get-user-online', (userId, cb) => {
            getUserOnline(userId, cb);
        });

        // call video
        socket.on(
            'subscribe-call-video',
            ({ conversationId, newUserId, peerId }) => {
                console.log(
                    'subscribe-call-video: ',
                    conversationId,
                    newUserId,
                    peerId
                );

                socket.join(conversationId + 'call');
                socket.broadcast
                    .to(conversationId + 'call')
                    .emit('new-user-call', {
                        conversationId,
                        newUserId,
                        peerId,
                    });
            }
        );

        socket.on('conversation-last-view', (conversationId, channelId) => {
            const { userId } = socket;
            if (channelId) {
                lastViewService
                    .updateLastViewOfChannel(conversationId, channelId, userId)
                    .then(() => {
                        socket.to(conversationId + '').emit('user-last-view', {
                            conversationId,
                            channelId,
                            userId,
                            lastView: new Date(),
                        });
                    })
                    .catch((err) =>
                        console.log('Error socket conversation-last-view')
                    );
            } else {
                lastViewService
                    .updateLastViewOfConversation(conversationId, userId)
                    .then(() => {
                        socket.to(conversationId + '').emit('user-last-view', {
                            conversationId,
                            userId,
                            lastView: new Date(),
                        });
                    })
                    .catch((err) =>
                        console.log('Error socket conversation-last-view')
                    );
            }
        });
    });
};

module.exports = socket;
