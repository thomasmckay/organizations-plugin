/**
 * Copyright 2013 Red Hat, Inc.
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
 * @name  Organizations.organizations.controller:OrganizationUsersController
 *
 * @requires $scope
 * @requires $q
 * @requires $location
 * @requires gettext
 * @requires Organization
 * @requires User
 * @requires Nutupane
 *
 * @description
 *   Provides the functionality for the list users details action pane.
 */
angular.module('Organizations.organizations').controller('OrganizationUsersController',
    ['$scope', '$q', '$location', 'gettext', 'Organization', 'User', 'Nutupane',
    function ($scope, $q, $location, gettext, Organization, User, Nutupane) {
        var usersPane, params;

        $scope.successMessages = [];
        $scope.errorMessages = [];

        params = {
            'search':      $location.search().search || "",
            'sort_by':     'name',
            'sort_order':  'ASC',
            'paged':       true
        };

        usersPane = new Nutupane(User, params);
        $scope.usersTable = usersPane.table;
        usersPane.searchTransform = function () {
            return "organization_id = " + $scope.$stateParams.organizationId;
        };

        $scope.removeUsers = function () {
            var data,
                success,
                error,
                deferred = $q.defer(),
                users = _.pluck($scope.organization.users, 'id'),
                usersToRemove = _.pluck($scope.usersTable.getSelected(), 'id');

            data = {
                organization: {
                    "user_ids": _.difference(users, usersToRemove)
                }
            };

            success = function (data) {
                $scope.successMessages = [gettext('Removed %x user s from organization "%y".')
                    .replace('%x', $scope.usersTable.numSelected).replace('%y', $scope.organization.name)];
                $scope.usersTable.working = false;
                $scope.usersTable.selectAll(false);
                usersPane.refresh();
                $scope.organization.$get();
                deferred.resolve(data);
            };

            error = function (error) {
                deferred.reject(error.data.errors);
                $scope.errorMessages = error.data.errors;
                $scope.usersTable.working = false;
            };

            $scope.usersTable.working = true;
            Organization.saveUsers({id: $scope.organization.id}, data, success, error);
            return deferred.promise;
        };
    }]
);
