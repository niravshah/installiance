
angular.module('cgNotify').run(['$templateCache', function($templateCache) {
    'use strict';

    $templateCache.put('angular-notify.html',
                       "<div class=\"cg-notify-message\" ng-class=\"[$classes, \n" +
                       "    $position === 'center' ? 'cg-notify-message-center' : '',\n" +
                       "    $position === 'left' ? 'cg-notify-message-left' : '',\n" +
                       "    $position === 'right' ? 'cg-notify-message-right' : '']\"\n" +
                       "    ng-style=\"{'margin-left': $centerMargin}\">\n" +
                       "\n" +
                       "    <div ng-show=\"!$messageTemplate\">\n" +
                       "        {[{$message}]}\n" +
                       "    </div>\n" +
                       "\n" +
                       "    <div ng-show=\"$messageTemplate\" class=\"cg-notify-message-template\">\n" +
                       "        \n" +
                       "    </div>\n" +
                       "\n" +
                       "    <button type=\"button\" class=\"cg-notify-close\" ng-click=\"$close()\">\n" +
                       "        <span aria-hidden=\"true\">&times;</span>\n" +
                       "        <span class=\"cg-notify-sr-only\">Close</span>\n" +
                       "    </button>\n" +
                       "\n" +
                       "</div>"
    );

}]);