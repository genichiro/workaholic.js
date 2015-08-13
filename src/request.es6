module.exports = (function() {
    const PromiseState = {
        PENDING: 'pending',
        RESOLVED: 'state'
    };

    class RequestPromise {
        constructor() {
            this.state = PromiseState.PENDING;
        }

        resolve(result) {
            this.result = result;
            this.state = PromiseState.RESOLVED;

            if (this.deferred) {
                this.done(this.deferred);
                this.deferred = null;
            }
        }

        done(onResolved) {
            if (this.state === PromiseState.PENDING) {
                this.deferred = onResolved;
                return;
            }
            onResolved(this.result);
        }

        static build() {
            return new RequestPromise();
        }
    }

    class Request {
        constructor(functionString) {
            this.functionString = functionString;
            this.promise = RequestPromise.build();
        }

        static build(fnString) {
            return new Request(fnString);
        }
    }
    return Request;
})();
