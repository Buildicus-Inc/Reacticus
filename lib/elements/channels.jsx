import _ from 'lodash';
var postal = require('postal');

var SubscriptionMixin = {
  /*
   * Tracks subscriptions and closes them on unmount
   */
  subscribe: function(channel, topic, f) {
    //opens a guarded subscription. Return false to stop getting messages.
    var sub;
    function callback(data, envelope) {
      try {
        if (f(data, envelope) === false) sub.unsubscribe();
      } catch (e) {
        console.log("Error in subscription handler", channel, topic, f, e)
        console.log(e.stack)
      }
    }
    if (_.isString(channel)) {
      sub = postal.subscribe({
        channel: channel,
        topic: topic,
        callback: callback
      });
    } else {
      sub = channel.subscribe(topic, callback);
    }
    this.registerSubscription(sub)
    return sub
  },
  registerSubscription: function(sub) {
    if (!this.subscriptions) this.subscriptions = [];
    this.subscriptions.push(sub)
  },
  endSubscriptions: function() {
    _.each(this.subscriptions, function(sub) {
      sub.unsubscribe()
    });
  },
  componentWillUnmount: function() {
    this.endSubscriptions();
  }
};


function ChannelStorage(channel, topic) {
  if (_.isString(channel)) {
    channel = postal.channel(channel);
  }

  var self = this;
  this.storage = {};

  this.getCollection = function() {
    return self.storage;
  };

  this.store = function(key, value) {
    self.getCollection()[key] = value;
    this.notify(key);
    self.notifyCollection();
  };

  this.del = function(key) {
    delete self.getCollection()[key];
    this.notify(key);
    self.notifyCollection();
  };

  this.notifyCollection = function() {
    channel.publish(topic+".collection", self.getCollection());
  };

  this.notify = function(key) {
    channel.publish(topic+".get."+key, self.getCollection()[key]);
  };

  channel.subscribe(topic+".set.#", function(data, envelope) {
    var property = envelope.topic.slice(_.size(topic)+5);
    self.store(property, data)
  });

  channel.subscribe(topic+".del.#", function(data, envelope) {
    var property = envelope.topic.slice(_.size(topic)+5);
    self.del(property)
  });
};

function ContextChannelStorage(channel, topic) {
  var self = this;
  ChannelStorage.bind(this)(channel, topic);
  this.contexts = {null: this.storage};

  this.context = function(contextId) {
    if (self.contexts[contextId] === undefined) {
      self.contexts[contextId] = {};
    }
    self.storage = self.contexts[contextId];
    self.notifyCollection();
    //TODO notify all gets
  };

  channel.subscribe(topic+".context.#", function(data, envelope) {
    var contextId = envelope.topic.slice(_.size(topic)+9);
    self.context(contextId)
  });
};
