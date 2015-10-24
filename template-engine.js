const layout = require("./views/layout");

module.exports = function templateEngine (filePath, params, callback) {
    const render = require(filePath);
    const rendered = layout(render(params), params);
    return callback(null, rendered);
};
