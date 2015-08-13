module.exports = (function() {
    let WorkerThread = require('./worker-thread.es6');
    let Request = require('./request.es6');
    let FunctionUtil = require('./function-util.es6');

    class Channel {
        constructor(size) {
            this.requestQueue = [];
            this.workerQueue = [];

            // create worker threads
            for (let i = 0; i < size; i = (i + 1) | 0) {
                this.workerQueue.push(WorkerThread.build(this));
            }
        }

        _putRequest(request) {
            if (this.workerQueue.length > 0) {
                let workerThread = this.workerQueue.shift();
                workerThread.execute(request);
            } else {
                this.requestQueue.push(request);
            }
        }

        takeRequest(workerThread) {
            if (this.requestQueue.length > 0) {
                let request = this.requestQueue.shift();
                workerThread.execute(request);
            } else {
                this.workerQueue.push(workerThread);
            }
        }

        _createArgumentInjectionString(argName, arg) {
            const typeTable = {
                string: () => {
                    return `var ${argName}=\'${arg}\';`;
                },
                object: () => {
                    let jsonString = JSON.stringify(arg);
                    return `var ${argName}=${jsonString};`;
                },
                other: () => {
                    return `var ${argName}=${arg};`;
                }
            };
            return (typeTable[typeof arg] || typeTable.other)();
        }

        execute() {
            if (arguments.length === 0 || typeof arguments[arguments.length - 1] !== 'function') {
                throw {
                    name: 'run "execute" error',
                    message: 'last argument is not "function"'
                };
            }
            let fn = arguments[arguments.length - 1];
            let fnString = FunctionUtil.toString(fn);
            if (arguments.length >= 2) {
                // inject arguments into worker
                var args = Array.prototype.slice.call(arguments);
                args.pop();

                let fnArgNames = FunctionUtil.getArgumentNames(fn);
                for (let i = 0; i < args.length && i < fnArgNames.length; i = (i + 1) | 0) {
                    fnString = this._createArgumentInjectionString(fnArgNames[i], args[i]) + fnString;
                }
            }
            let request = Request.build(fnString);
            this._putRequest(request);
            return request.promise;
        }
    }
    return Channel;
})();
