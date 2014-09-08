/**
 * Copyright 2013-2014 Red Hat, Inc.
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
 * @name  Organizations.organizations.controller:NewOrganizationController
 *
 * @requires $scope
 * @requires $q
 * @requires FormUtils
 * @requires Organization
 * @requires Organization
 * @requires CurrentOrganization
 * @requires ContentView
 *
 * @description
 *   Controls the creation of an empty Organization object for use by sub-controllers.
 */
angular.module('Organizations.organizations').controller('NewOrganizationController',
    ['$scope', '$q', 'FormUtils', 'Organization', 'Organization', 'CurrentOrganization', 'ContentView',
    function ($scope, $q, FormUtils, Organization, Organization, CurrentOrganization, ContentView) {

        $scope.organization = $scope.organization || new Organization();
        $scope.panel = {loading: false};
        $scope.organization = CurrentOrganization;

        $scope.$watch('organization.name', function () {
            if ($scope.organizationForm.name) {
                $scope.organizationForm.name.$setValidity('server', true);
            }
        });

        $scope.save = function (organization) {
            organization.$save(success, error);
        };

        function success(response) {
            $scope.table.addRow(response);
            $scope.transitionTo('organizations.details.info', {organizationId: $scope.organization.id});
        }

        function error(response) {
            $scope.working = false;
            angular.forEach(response.data.errors, function (errors, field) {
                $scope.organizationForm[field].$setValidity('server', false);
                $scope.organizationForm[field].$error.messages = errors;
            });
        }

    }]
);
