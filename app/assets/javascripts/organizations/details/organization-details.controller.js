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
 * @name  Organizations.organizations.controller:OrganizationDetailsController
 *
 * @requires $scope
 * @requires $state
 * @requires $q
 * @requires translate
 * @requires Organization
 *
 * @description
 *   Provides the functionality for the organization details action pane.
 */
angular.module('Organizations.organizations').controller('OrganizationDetailsController',
    ['$scope', '$state', '$q', 'translate', 'Organization',
    function ($scope, $state, $q, translate, Organization) {

        $scope.successMessages = [];
        $scope.errorMessages = [];

        if ($scope.organization) {
            $scope.panel = {loading: false};
        } else {
            $scope.panel = {loading: true};
        }

        $scope.organization = Organization.get({id: $scope.$stateParams.organizationId}, function () {
            $scope.panel.loading = false;
        });

        $scope.save = function (organization) {
            var deferred = $q.defer();

            organization.$update(function (response) {
                deferred.resolve(response);
                $scope.successMessages.push(translate('Organization updated'));
                $scope.table.replaceRow(response);
            }, function (response) {
                deferred.reject(response);
                $scope.errorMessages.push(translate("An error occurred saving the Organization: ") + response.data.displayMessage);
            });
            return deferred.promise;
        };

        $scope.removeOrganization = function (organization) {
            var id = organization.id;

            organization.$delete(function () {
                $scope.removeRow(id);
                $scope.transitionTo('organizations.index');
            });
        };
    }]
);
