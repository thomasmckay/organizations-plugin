/**
 * Copyright 2014 Red Hat, Inc.
 *
 * This software is licensed to you under the GNU General Public
 * License as published by the Free Software Foundation; either version
 * 2 of the License (GPLv2) or (at your option) any later version.
 * There is NO WARRANTY for this software, express or implied,
 * including the implied warranties of MERCHANTABILITY,
 * NON-INFRINGEMENT, or FITNESS FOR A PARTICULAR PURPOSE. You should
 * have received a copy of GPLv2 along with this software; if not, see
 * http://www.gnu.org/licenses/old-licenses/gpl-2.0.txt.
 */

/**
 * @ngdoc object
 * @name  Organizations.organizations.controller:OrganizationDetailsInfoController
 *
 * @requires $scope
 * @requires $q
 * @requires gettext
 * @requires Organization
 *
 * @description
 *   Provides the functionality for the organization details action pane.
 */
angular.module('Organizations.organizations').controller('OrganizationDetailsInfoController',
    ['$scope', '$q', 'Organization',
    function ($scope, $q, Organization) {

        $scope.successMessages = [];
        $scope.errorMessages = [];

        $scope.panel = $scope.panel || {loading: false};

        $scope.organization = $scope.organization || Organization.get({id: $scope.$stateParams.organizationId}, function () {
            $scope.panel.loading = false;
        });

        $scope.clearServiceLevel = function () {
            $scope.organization['service_level'] = '';
            $scope.save($scope.organization);
        };

    }]
);
