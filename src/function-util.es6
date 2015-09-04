module.exports = (function(global) {
    let Blob = require('blob');
    let createObjectURL = global.createObjectURL || global.createBlobURL;
    if (!createObjectURL) {
        let URL = global.URL || global.webkitURL;
        if (URL) {
            createObjectURL = URL.createObjectURL;
        } else {
            throw new Error({
                name: 'create Blob error',
                message: 'Blob creation implementation was not found'
            });
        }
    }

    class FunctionUtil {
        static toString(fn) {
            return /^function\s*\w*\s*\([\w\s,]*\)\s*{([\w\W]*?)}$/.exec(fn.toString())[1];
        }

        static toBlob(fn) {
            let str = FunctionUtil.toString(fn);
            return createObjectURL(new Blob([str], {type: 'text/javascript'}));
        }

        static getArgumentNames(fn) {
            var source = fn.toString().replace(/\/\/.*$|\/\*[\s\S]*?\*\/|\s/gm, ''); // strip comments
            var names = source.match(/\((.*?)\)/)[1].split(',');
            return (names.length === 1 && names[0] === '') ? [] : names;
        }
    }
    return FunctionUtil;
})((this || 0).self || global);
