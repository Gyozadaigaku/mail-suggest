(function(win) {
  
  "use strict";
  
  win.App = {};
  
})(this);

(function(win, doc, ns, $) {

  "use strict";

  function EmailInput(elm) {
    var that = this;

    _init();

    function _init() {
      that.input   = elm.querySelector(".input");
      that.suggest = elm.querySelector(".suggest");
      that.timer   = null;

      that._clearSaddest = that._clearSaddest.bind(that);
      that._handleKeyUp  = that._handleKeyUp.bind(that);
      
      that.input.addEventListener("focus", _handleFocus, false);
      that.input.addEventListener("blur", _handleBlur, false);
      that.suggest.addEventListener("click", _handleClick, false);
    }
    
    function _handleFocus() {
      that._handleFocus();
    }
    
    function _handleBlur() {
      that._handleBlur();
    }
    
    function _handleClick(evt) {
      that._handleClick(evt);
    }
  }

  EmailInput.CONST = {
    DOMAIN_OBJ : {
      g : ["gmail.com"],
      y : ["yahoo.co.jp"],
      h : ["hotmail.co.jp"],
      d : ["docomo.ne.jp"],
      e : ["ezweb.ne.jp"],
      s : ["softbank.ne.jp"]
    }
  };

  EmailInput.prototype._displaySaddest = _displaySaddest;
  EmailInput.prototype._clearSaddest   = _clearSaddest;
  EmailInput.prototype._handleFocus    = _handleFocus;
  EmailInput.prototype._handleBlur     = _handleBlur;
  EmailInput.prototype._handleKeyUp    = _handleKeyUp;
  EmailInput.prototype._handleClick    = _handleClick;
  EmailInput.prototype._checkDomain    = _checkDomain;

  function _displaySaddest(domain) {
    var that = this;

    that.suggest.setAttribute("data-domain", domain);
  }

  function _clearSaddest() {
    var that = this;

    that._displaySaddest("");
  }

  function _handleFocus() {
    var that = this;

    doc.addEventListener("keyup", that._handleKeyUp, false);
  }

  function _handleBlur() {
    var that = this;

    doc.removeEventListener("keyup", that._handleKeyUp, false);
    that.timer = setTimeout(that._clearSaddest, 200); // suggestをタップした際の対策
  }

  function _handleClick(evt) {
    var that = this,
        domain;

    if (!evt.target.classList.contains("btn")) {
      domain = that.suggest.getAttribute("data-domain");
      that.input.value = that.input.value.replace(/\@.*$/, "@" + domain);
    }

    that._clearSaddest();
  }

  function _handleKeyUp() {
    var that = this;

    that._checkDomain(that.input.value);
  }

  function _checkDomain(txt) {
    var that   = this,
        domain = "",
        regExp;
    
    $.each(EmailInput.CONST.DOMAIN_OBJ, function(key, val) {
      regExp = new RegExp("[a-zA-Z0-9]\@" + key);
      if (regExp.test(txt)) {
        domain = EmailInput.CONST.DOMAIN_OBJ[key][0];
      }
    });

    if (domain) {
      that._displaySaddest(domain);
    } else {
      that._clearSaddest();
    }
  }

  ns.EmailInput = EmailInput;

})(this, document, App, jQuery);

(function EmailInput(win, doc, ns) {
  
  "use strict";
  
  new ns.EmailInput(doc.querySelector(".input-box"));

})(this, document, App);