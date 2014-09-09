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
 * @name  Organizations.organizations.controller:OrganizationTemplatesController
 *
 * @requires $scope
 * @requires $q
 * @requires $location
 * @requires gettext
 * @requires Organization
 * @requires Template
 * @requires Nutupane
 *
 * @description
 *   Provides the functionality for the list templates details action pane.
 */
angular.module('Organizations.organizations').controller('OrganizationTemplatesController',
    ['$scope', '$q', '$location', 'gettext', 'Organization', 'Template', 'Nutupane',
    function ($scope, $q, $location, gettext, Organization, Template, Nutupane) {
        var templatesPane, params;

        $scope.successMessages = [];
        $scope.errorMessages = [];

        params = {
            'search':      $location.search().search || "",
            'sort_by':     'name',
            'sort_order':  'ASC',
            'paged':       true
        };

        templatesPane = new Nutupane(Template, params);
        $scope.templatesTable = templatesPane.table;
        templatesPane.searchTransform = function () {
            return "organization_id = " + $scope.$stateParams.organizationId;
        };

        $scope.removeTemplates = function () {
            var data,
                success,
                error,
                deferred = $q.defer(),
                templates = _.pluck($scope.organization.templates, 'id'),
                templatesToRemove = _.pluck($scope.templatesTable.getSelected(), 'id');

            data = {
                organization: {
                    "template_ids": _.difference(templates, templatesToRemove)
                }
            };

            success = function (data) {
                $scope.successMessages = [gettext('Removed %x template s from organization "%y".')
                    .replace('%x', $scope.templatesTable.numSelected).replace('%y', $scope.organization.name)];
                $scope.templatesTable.working = false;
                $scope.templatesTable.selectAll(false);
                templatesPane.refresh();
                $scope.organization.$get();
                deferred.resolve(data);
            };

            error = function (error) {
                deferred.reject(error.data.errors);
                $scope.errorMessages = error.data.errors;
                $scope.templatesTable.working = false;
            };

            $scope.templatesTable.working = true;
            Organization.saveTemplates({id: $scope.organization.id}, data, success, error);
            return deferred.promise;
        };
    }]
);
