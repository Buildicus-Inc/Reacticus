"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var TransactionMixin = {
  //CONSIDER: transact(promise) implies freezing the state updates and rolling back on promise failure
  blockRender: function blockRender(promise) {
    /* block the component from rendering updates until the promise is complete */
    this.setState({ inTransaction: true });
    return promise.then((function (result) {
      if (this.isMounted()) {
        this.setState({ inTransaction: false });
        this.forceUpdate();
      }
      return result;
    }).bind(this))["catch"]((function (error) {
      if (this.isMounted()) {
        this.setState({ inTransaction: false });
      }
    }).bind(this));
  },
  shouldComponentUpdate: function shouldComponentUpdate(nextProps, nextState, nextContext) {
    return !nextState.inTransaction;
  }
};
exports.TransactionMixin = TransactionMixin;