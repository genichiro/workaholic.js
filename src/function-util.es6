module.exports = (function() {
    let createObjectURL = window.createObjectURL || window.createObjectURL;
    if (!createObjectURL) {
        let URL = window.URL || window.webkitURL;
        if (URL) {
            createObjectURL = URL.createObjectURL;
        } else {
            throw new Error({
                name: 'create Blob error',
                message: 'Blob creation implementation was not found'
            });
        }
    }
    let BlobBuilder = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder || window.MSBlobBuilder;

    class FunctionUtil {
        static toString(fn) {
            return /^function\s*\w*\s*\([\w\s,]*\)\s*{([\w\W]*?)}$/.exec(fn.toString())[1];
        }

        static toBlob(fn) {
            let str = FunctionUtil.toString(fn);
            if (typeof window.Blob === 'function') {
                return createObjectURL(new window.Blob([str], {type: 'text/javascript'}));
            } else if (typeof BlobBuilder === 'function') {
                let blobBuilder = new BlobBuilder();
                blobBuilder.append(str);
                return createObjectURL(blobBuilder.getBlob());
            }
            return 'data:text/javascript;charset=utf-8,' + encodeURI(str);
        }

        static getArgumentNames(fn) {
            var source = fn.toString().replace(/\/\/.*$|\/\*[\s\S]*?\*\/|\s/gm, ''); // strip comments
            var names = source.match(/\((.*?)\)/)[1].split(',');
            return (names.length === 1 && names[0] === '') ? [] : names;
        }
    }
    return FunctionUtil;
})();
