"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    category: "Testing",
    description: "Replies with pong",
    slash: "both",
    callback: function (_a) {
        var message = _a.message, interaction = _a.interaction;
        var reply = "Pong!";
        // message is provided for a legacy command
        if (message) {
            message.reply({
                content: reply,
            });
            return;
        }
        // interaction is provided for slash commands
        interaction.reply({
            content: reply,
        });
        // Alternatively we can just simply return our text
        // WOKCommands will handle the proper way to reply with it
        return reply;
    },
};
