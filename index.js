(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.ruin = factory());
}(this, (function () { 'use strict';

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var Ruin$1 = function () {
  function Ruin(el) {
    classCallCheck(this, Ruin);

    this.el = el;
    this.chars = '!<>-_\\/[]{}—=+*^?#________';
    this.update = this.update.bind(this);
  }

  createClass(Ruin, [{
    key: 'randomChar',
    value: function randomChar() {
      return this.chars[Math.floor(Math.random() * this.chars.length)];
    }
  }, {
    key: 'update',
    value: function update() {
      var output = '';
      var complete = 0;

      for (var i = 0, n = this.queue.length; i < n; i += 1) {
        var _queue$i = this.queue[i],
            from = _queue$i.from,
            to = _queue$i.to,
            start = _queue$i.start,
            end = _queue$i.end;
        var char = this.queue[i].char;

        if (this.frame >= end) {
          complete += 1;
          output += to;
        } else if (this.frame >= start) {
          if (!char || Math.random() < 0.28) {
            char = this.randomChar();
            this.queue[i].char = char;
          }
          output += '<span class="dud">' + char + '</span>';
        } else {
          output += from;
        }
      }

      this.el.innerHTML = output;
      if (complete === this.queue.length) {
        this.resolve();
      } else {
        this.frameRequest = window.requestAnimationFrame(this.update);
        this.frame += 1;
      }
    }
  }, {
    key: 'setText',
    value: function setText(newText) {
      var _this = this;

      var oldText = this.el.innerHTML;
      var length = Math.max(oldText.length, newText.length);
      var promise = new Promise(function (resolve) {
        _this.resolve = resolve;
      });

      this.queue = [];

      for (var i = 0; i < length; i += 1) {
        var from = oldText[i] || '';
        var to = newText[i] || '';
        var start = Math.floor(Math.random() * 40);
        var end = start + Math.floor(Math.random() * 40);
        this.queue.push({ from: from, to: to, start: start, end: end });
      }

      window.cancelAnimationFrame(this.frameRequest);
      this.frameRequest = 0;
      this.update();
      return promise;
    }
  }]);
  return Ruin;
}();

var phrases = ['Neo,', 'sooner or later', 'you\'re going to realize', 'just as I did', 'that there\'s a difference', 'between knowing the path', 'and walking the path'];

var el = document.querySelector('.text');
var fx = new Ruin$1(el);

var counter = 0;
var next = function next() {
  fx.setText(phrases[counter]).then(function () {
    setTimeout(next, 800);
  });
  counter = (counter + 1) % phrases.length;
};

next();

return Ruin$1;

})));
//# sourceMappingURL=index.js.map
