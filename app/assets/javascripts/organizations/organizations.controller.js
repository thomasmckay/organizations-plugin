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
 * @name  Organizations.organizations.controller:OrganizationsController
 *
 * @requires $scope
 * @requires $location
 * @requires Nutupane
 * @requires Organization
 * @requires CurrentOrganization
 *
 * @description
 *   Provides the functionality specific to Organizations for use with the Nutupane UI pattern.
 *   Defines the columns to display and the transform function for how to generate each row
 *   within the table.
 */
angular.module('Organizations.organizations').controller('OrganizationsController',
    ['$scope', '$location', 'Nutupane', 'Organization', 'CurrentOrganization',
    function ($scope, $location, Nutupane, Organization, CurrentOrganization) {

        var watch, params = {
            'search':           $location.search().search || "",
            'sort_by':          'name',
            'sort_order':       'ASC',
            'paged':            true
        };

        var nutupane = new Nutupane(Organization, params);
        $scope.organizationTable = nutupane.table;
        $scope.organizationTable.refresh = nutupane.refresh;
        $scope.removeRow = nutupane.removeRow;

        $scope.organizationTable.closeItem = function () {
            $scope.transitionTo('organizations.index');
        };

        $scope.table = $scope.organizationTable;

        $scope.hasResource = function (name, organization) {
            return _.findWhere(organization.permissions, {resource_type: name}) !== undefined ? 'X' : '';
        };
    }]
);
