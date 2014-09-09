/**
 Copyright 2014 Red Hat, Inc.

 This software is licensed to you under the GNU General Public
 License as published by the Free Software Foundation; either version
 2 of the License (GPLv2) or (at your option) any later version.
 There is NO WARRANTY for this software, express or implied,
 including the implied warranties of MERCHANTABILITY,
 NON-INFRINGEMENT, or FITNESS FOR A PARTICULAR PURPOSE. You should
 have received a copy of GPLv2 along with this software; if not, see
 http://www.gnu.org/licenses/old-licenses/gpl-2.0.txt.
 **/

BASTION_MODULES.push('Organizations.organizations');

/**
 * @ngdoc module
 * @name  Organizations.organizations
 *
 * @description
 *   Module for organizations
 */
angular.module('Organizations.organizations', [
    'ngResource',
    'alchemy',
    'alch-templates',
    'ui.router',
    'Bastion.widgets'
]);

/**
 * @ngdoc object
 * @name Organizations.organizations.config
 *
 * @requires $stateProvider
 *
 * @description
 *   Used for organizations level configuration such as setting up the ui state machine.
 */
angular.module('Organizations.organizations').config(['$stateProvider', function ($stateProvider) {
    $stateProvider.state('organizations', {
        abstract: true,
        controller: 'OrganizationsController',
        templateUrl: 'organizations/views/organizations.html'
    });

    $stateProvider.state('organizations.index', {
        url: '/organizations',
        permission: 'view_organizations',
        views: {
            'table': {
                templateUrl: 'organizations/views/organizations-table-full.html'
            }
        }
    })
    .state('organizations.new', {
        url: '/organizations/new',
        permission: 'view_organizations',
        collapsed: true,
        views: {
            'table': {
                templateUrl: 'organizations/views/organizations-table-collapsed.html'
            },
            'action-panel': {
                controller: 'NewOrganizationController',
                templateUrl: 'organizations/new/views/organization-new.html'
            }
        }
    });

    $stateProvider.state('organizations.details', {
        abstract: true,
        url: '/organizations/:organizationId',
        permission: 'view_organizations',
        collapsed: true,
        views: {
            'table': {
                templateUrl: 'organizations/views/organizations-table-collapsed.html'
            },
            'action-panel': {
                controller: 'OrganizationDetailsController',
                templateUrl: 'organizations/details/views/organization-details.html'
            }
        }
    })
    .state('organizations.details.info', {
        url: '/info',
        permission: 'view_organizations',
        collapsed: true,
        templateUrl: 'organizations/details/views/organization-info.html'
    })
    .state('organizations.details.permissions.new', {
        url: '/new',
        permission: 'view_organizations',
        collapsed: true,
        views: {
            'table': {
                templateUrl: 'organizations/views/organizations-table-collapsed.html'
            },
            'action-panel': {
                controller: 'NewOrganizationPermissionController',
                templateUrl: 'organizations/new/views/organization-permission-new.html'
            }
        }
    });

    $stateProvider.state('organizations.details.users', {
        abstract: true,
        collapsed: true,
        templateUrl: 'organizations/details/views/organization-users.html'
    })
    .state('organizations.details.users.list', {
        url: '/users',
        permission: 'view_organizations',
        collapsed: true,
        controller: 'OrganizationUsersController',
        templateUrl: 'organizations/details/views/organization-users-table.html'
    })
    .state('organizations.details.users.add', {
        url: '/users/add',
        permission: 'view_organizations',
        collapsed: true,
        controller: 'OrganizationAddUsersController',
        templateUrl: 'organizations/details/views/organization-users-table.html'
    });

    $stateProvider.state('organizations.details.templates', {
        abstract: true,
        collapsed: true,
        templateUrl: 'organizations/details/views/organization-templates.html'
    })
    .state('organizations.details.templates.list', {
        url: '/templates',
        permission: 'view_organizations',
        collapsed: true,
        controller: 'OrganizationTemplatesController',
        templateUrl: 'organizations/details/views/organization-templates-table.html'
    })
    .state('organizations.details.templates.add', {
        url: '/templates/add',
        permission: 'view_organizations',
        collapsed: true,
        controller: 'OrganizationAddTemplatesController',
        templateUrl: 'organizations/details/views/organization-templates-table.html'
    });

    $stateProvider.state("organizations.bulk-actions", {
        abstract: true,
        collapsed: true,
        views: {
            'table': {
                templateUrl: 'organizations/views/organizations-table-collapsed.html'
            },
            'action-panel': {
                controller: 'OrganizationsBulkActionController',
                templateUrl: 'organizations/bulk/views/bulk-actions.html'
            }
        }
    })
    .state('organizations.bulk-actions.packages', {
        url: '/organizations/bulk-actions/apply',
        permission: 'view_organizations',
        collapsed: true,
        controller: 'OrganizationsBulkActionApplyController',
        templateUrl: 'organizations/bulk/views/bulk-actions-apply.html'
    })
}]);
