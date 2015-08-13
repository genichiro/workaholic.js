module.exports = (function() {
    class FunctionUtil {
        static toString(fn) {
            return /^function\s*\w*\s*\([\w\s,]*\)\s*{([\w\W]*?)}$/.exec(fn.toString())[1];
        }

        static toBlob(fn) {
            let str = FunctionUtil.toString(fn);
            return URL.createObjectURL(new Blob([str], {type: 'text/javascript'}));
        }

        static getArgumentNames(fn) {
            var source = fn.toString().replace(/\/\/.*$|\/\*[\s\S]*?\*\/|\s/gm, ''); // strip comments
            var names = source.match(/\((.*?)\)/)[1].split(',');
            return (names.length === 1 && names[0] === '') ? [] : names;
        }
    }
    return FunctionUtil;
})();
