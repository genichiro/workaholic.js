(function(global) {
    let Channel = require('./channel.es6');

    class Workaholic {
        create(size) {
            return new Channel(size);
        }
    }

    // exports
    if ('process' in global) {
        module.exports = Workaholic;
    }
    global.Workaholic = new Workaholic();
})((this || 0).self || global);
