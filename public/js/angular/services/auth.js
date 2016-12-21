app.service('AuthService', ['$http', '$window', 'jwtHelper',
                            function ($http, $window, jwtHelper) {

                                this.getToken = function () {
                                    return $window.localStorage['jwtToken'];
                                };

                                this.validToken = function () {
                                    var token = this.getToken();
                                    if (typeof token != 'undefined') {
                                        var date = jwtHelper.getTokenExpirationDate(token);
                                        if (typeof date != 'undefined' && date != null) {
                                            if (date.setHours(0, 0, 0, 0) < new Date().setHours(0,
                                                                                                0,
                                                                                                0,
                                                                                                0)) {
                                                return false;
                                            } else {
                                                return true;
                                            }
                                        } else {
                                            return false;
                                        }
                                    } else {
                                        return false;
                                    }
                                };

                            }
]);