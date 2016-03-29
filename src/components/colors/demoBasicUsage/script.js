(function () {
  'use strict';
  angular
      .module('colorsDemo', ['ngMaterial', 'ngMessages'])
      .config(function ($mdThemingProvider) {
        $mdThemingProvider.theme('default')
            .primaryPalette('purple')
            .accentPalette('light-green');
        
        $mdThemingProvider.theme('myTheme')
            .primaryPalette('indigo')
            .accentPalette('pink');
      })
      .controller('BasicDemoCtrl', DemoCtrl);

  function DemoCtrl () {

  }
})();
