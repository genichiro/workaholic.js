module.exports = (function() {
    let FunctionUtil = require('./function-util.es6');

    const workerfunc = () => {
        /* eslint-disable */
        let finish = result => {
            self.postMessage(result);
        };
        /* eslint-disable */
        self.onmessage = e => {
            eval(e.data);
        };
    };
    const WORKER_BLOB = FunctionUtil.toBlob(workerfunc);

    class WorkerThread {
        constructor(channel) {
            this.channel = channel;
            this.worker = new Worker(WORKER_BLOB);
        }

        execute(request) {
            this.request = request;
            this.worker.postMessage(request.functionString);
            this.worker.onmessage = e => {
                if (!this.request) return;

                this.request.promise.resolve(e.data);
                this.request = null;
                this.channel.takeRequest(this);
            };
        }

        static build(channel) {
            return new WorkerThread(channel);
        }
    }
    return WorkerThread;
})();
