angular.module('app', ['cfp.hotkeys', 'ngAnimate'])
    .controller('MainController', function ($scope, hotkeys) {
        // fonctions
        $scope.active = 0;
        $scope.previous = function () {
            if ($scope.active != 0) $scope.active -= 1;
        }
        $scope.next = function () {
            if ($scope.active + 1 < $scope.forests.length) $scope.active += 1;
        }
        $scope.setActive = function (i) {
            $scope.active = i;
        }
        $scope.forests = [{
                'rank': 1,
                'name': '!-!_about[0].titre_!-!',
                'desc': '!-!_about[0].paragraphe_1_!-!',
                'location': '!-!_about[0].paragraphe_2_!-!',
                'img': 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/130891/sagano.jpg'
            },
            {
                'rank': 2,
                'name': '!-!_about[1].titre_!-!',
                'desc': '!-!_about[1].paragraphe_1_!-!',
                'location': '!-!_about[1].paragraphe_2_!-!',
                'img': 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/130891/sequoia.jpg'
            }
        ];
        // fleche directionnelle
        hotkeys.add({
            combo: 'right',
            description: 'Next slide',
            callback: function () {
                $scope.next();
            }
        });
        hotkeys.add({
            combo: 'left',
            description: 'Previous slide',
            callback: function () {
                $scope.previous();
            }
        });
    });