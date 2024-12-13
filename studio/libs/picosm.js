var __typeError = (msg) => {
  throw TypeError(msg);
};
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);

// ../../picosm/src/makeObservable.js
function instrumentAction(target, methodName) {
  const prototype = Object.getPrototypeOf(target).prototype;
  const descriptor = Object.getOwnPropertyDescriptor(prototype, methodName);
  if (descriptor && typeof descriptor.value === "function") {
    const originalMethod = descriptor.value;
    if (originalMethod.constructor.name === "AsyncFunction") {
      descriptor.value = async function(...args) {
        const response = await originalMethod.call(this, ...args);
        this.__resetComputedProperties();
        this.__notifyObservers();
        return response;
      };
    } else {
      descriptor.value = function(...args) {
        const response = originalMethod.call(this, ...args);
        this.__resetComputedProperties();
        this.__notifyObservers();
        return response;
      };
    }
    Object.defineProperty(prototype, methodName, descriptor);
  }
}
function instrumentComputed(target, getterName) {
  const prototype = Object.getPrototypeOf(target).prototype;
  const descriptor = Object.getOwnPropertyDescriptor(prototype, getterName);
  if (descriptor && typeof descriptor.get === "function") {
    const originalGetter = descriptor.get;
    descriptor.get = function() {
      if (!this.__computedProperties) {
        Object.defineProperties(
          this,
          {
            __computedProperties: { value: /* @__PURE__ */ new Map() }
          },
          {
            __computedProperties: { enumerable: false, writable: false }
          }
        );
      }
      if (this.__computedProperties.has(getterName)) {
        return this.__computedProperties.get(getterName);
      }
      const cachedValue = originalGetter.call(this);
      this.__computedProperties.set(getterName, cachedValue);
      return cachedValue;
    };
    Object.defineProperty(prototype, getterName, descriptor);
  }
}
function makeObservable(constructor2, actions = [], computeds = []) {
  class SuperClass extends constructor2 {
    __notifyObservers() {
      this.__observers?.forEach((listener) => {
        listener();
      });
    }
    __resetComputedProperties() {
      this.__computedProperties?.clear();
    }
    __observe(callback) {
      if (!this.__observers) {
        Object.defineProperties(
          this,
          {
            __observers: { value: /* @__PURE__ */ new Set() }
          },
          {
            __observers: { enumerable: false, writable: false }
          }
        );
      }
      this.__observers.add(callback);
      return () => {
        this.__observers.delete(callback);
      };
    }
    __subscribe(onMessageCallback) {
      if (!this.__subscribers) {
        Object.defineProperties(
          this,
          {
            __subscribers: { value: /* @__PURE__ */ new Set() }
          },
          {
            __subscribers: { enumerable: false, writable: false }
          }
        );
      }
      this.__subscribers.add(onMessageCallback);
      return () => {
        this.__subscribers.delete(onMessageCallback);
      };
    }
  }
  actions.forEach((methodName) => {
    instrumentAction(SuperClass, methodName);
  });
  computeds.forEach((propertyName) => {
    instrumentComputed(SuperClass, propertyName);
  });
  return SuperClass;
}
function observeSlow(target, callback, timeout) {
  let timer;
  const listener = () => {
    clearTimeout(timer);
    timer = setTimeout(callback, timeout);
  };
  return target.__observe(listener);
}
function observe(target, callback, timeout) {
  if (timeout) {
    return observeSlow(target, callback, timeout);
  } else {
    return target.__observe(callback);
  }
}
function subscribe(target, onMessageCallback) {
  return target.__subscribe(onMessageCallback);
}
function notify(target, message) {
  if (!target.__subscribers) return;
  target.__subscribers?.forEach((listener) => {
    listener(message);
  });
}

// ../../picosm/src/reaction.js
function reaction(target, callback, execute, timeout) {
  let lastProps = [];
  return observe(
    target,
    async () => {
      const props = callback(target);
      if (lastProps === props) return;
      let shouldExecute = false;
      for (let i = 0; i < props.length; i++) {
        if (lastProps[i] !== props[i]) {
          shouldExecute = true;
          break;
        }
      }
      if (shouldExecute) {
        lastProps = props;
        execute(...props);
      }
    },
    timeout
  );
}

// ../../picosm/src/track.js
function track(target, source) {
  const disposer = source.__observe?.(() => {
    target.__resetComputedProperties();
    target.__notifyObservers();
  });
  target.__resetComputedProperties();
  target.__notifyObservers();
  return disposer;
}

// ../../picosm/src/LitObserver.js
function litObserver(constructor, properties) {
  var _observables, _disposers;
  class LitObserver extends constructor {
    constructor(...args) {
      super(...args);
      __privateAdd(this, _observables, /* @__PURE__ */ new Set());
      __privateAdd(this, _disposers, /* @__PURE__ */ new Set());
    }
    trackProperties() {
      properties.forEach((property) => {
        let observableProperty;
        let delay;
        if (Array.isArray(property)) {
          observableProperty = this[property[0]];
          delay = property[1];
        } else {
          observableProperty = this[property];
        }
        if (__privateGet(this, _observables).has(observableProperty)) {
          return;
        }
        if (!observableProperty) return;
        __privateGet(this, _observables).add(observableProperty);
        __privateGet(this, _disposers).add(
          observe(observableProperty, this.requestUpdate.bind(this), delay)
        );
      });
    }
    updated(changedProperties) {
      super.updated(changedProperties);
      this.trackProperties();
    }
    disconnectedCallback() {
      super.disconnectedCallback();
      __privateGet(this, _disposers).forEach((disposer) => {
        disposer();
      });
      __privateGet(this, _disposers).clear();
    }
  }
  _observables = new WeakMap();
  _disposers = new WeakMap();
  return eval(`(class ${constructor.name} extends LitObserver {})`);
}
export {
  litObserver,
  makeObservable,
  notify,
  observe,
  reaction,
  subscribe,
  track
};
//# sourceMappingURL=picosm.js.map
