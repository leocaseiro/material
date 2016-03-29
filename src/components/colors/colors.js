/**
 * @ngdoc module
 * @name material.components.colors
 *
 * @description
 * Colors directive
 */
angular.module('material.components.colors', [
    'material.core'
  ])
  .directive('mdColors', mdColorsDirective);

/**
 * @ngdoc directive
 * @name mdColors
 * @module material.components.colors
 *
 * @restrict A
 *
 * @description
 * `mdColors` directive will apply the requested color from the palette as inline style on its element,
 * The format will be similar to our color defining in the scss files:
 * ## ‘[?theme]-[palette]-[?hue]-[?opacity]’
 * - [theme]    - default value is the default theme
 * - [palette]	- can be either palette name or primary/accent/warn/background
 * - [hue]		  - default is 500
 * - [opacity]	- default is 1
 * - ? 		      - optional
 *
 * @usage
 * <hljs lang="html">
 *   <div md-colors="{background: 'myTheme-accent-900-0.43'}">
 *     <div md-colors="{color: 'red-A100', border-color: 'primary-600'}">
 *       <span>Color demo</span>
 *     </div>
 *   </div>
 * </hljs>
 *
 */

function mdColorsDirective($mdColorPalette, $mdTheming) {
  return {
    restrict: 'A',
    link: function (scope, elem, attrs) {
      scope.$watch(attrs.mdColors, function (val) {
        Object.keys(val).forEach(function (key) {
          var split = val[key].split('-');

          var theme = 'default';

          // Checking if the first section is actually a theme
          if ($mdTheming.THEMES[split[0]]) {
            theme = split.splice(0, 1);
          }

          var palette = split[0];

          // If the next section is one of the palettes we assume it's a two word palette
          if (Object.keys($mdColorPalette).indexOf(split[1]) !== -1) {
            palette += '-' + split.splice(1, 1);
          }
          else {
            // Two word palette can be also written in camelCase, forming camelCase to dash-case
            palette = palette.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
          }

          // If the palette is not in the palette list it's one of primary/accent/warn/background
          if (Object.keys($mdColorPalette).indexOf(palette) === -1) {
            var scheme = $mdTheming.THEMES[theme].colors[palette];

            if (!scheme) {
              return console.error('mdColors: couldn\'t find \'' + palette + '\' in the palettes.');
            }

            palette = scheme.name;
          }

          var hue = split[1] || 500;
          var opacity = split[2] || 1;

          var color = $mdColorPalette[palette][hue].value;

          elem.css(key, 'rgba(' + color[0] + ', ' + color[1] + ', ' + color[2] + ', ' + opacity + ')');
        });
      })
    }
  }
}
