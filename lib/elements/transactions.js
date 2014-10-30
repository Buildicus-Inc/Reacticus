export var TransactionMixin = {
  //CONSIDER: transact(promise) implies freezing the state updates and rolling back on promise failure
  blockRender: function(promise) {
    /* block the component from rendering updates until the promise is complete */
    this.setState({inTransaction: true});
    return promise.then(function(result) {
      if (this.isMounted()) {
        this.setState({inTransaction: false});
        this.forceUpdate();
      }
      return result;
    }.bind(this)).catch(function(error) {
      if (this.isMounted()) {
        this.setState({inTransaction: false});
      }
    }.bind(this));
  },
  shouldComponentUpdate: function(nextProps, nextState, nextContext) {
    return !nextState.inTransaction;
  }
};
