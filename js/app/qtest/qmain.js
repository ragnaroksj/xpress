// Config for requireJs
require.config({

  /*The number of seconds to wait before giving up on loading a script. Setting it to 0 disables the timeout.*/
  waitSeconds : 0,
 
  baseUrl : '/wp-content/themes/xpress/js/app',
  paths : {
      'qunit' : 'lib/qunit',
      'jquery' : 'lib/jquery-1.11.0.min'
  },

  shim : {
    qunit : {
      exports : "QUnit",
      init : function(){
        QUnit.config.autoload = false;
        QUnit.config.autostart = false;
      }
    }
  }

});

require([
  "jquery",
  /*test files*/
  "qtest/extdTest",
  "qunit"
], function($,extdTest) {
  
  extdTest.run();
  
  QUnit.load();
  QUnit.start();
});