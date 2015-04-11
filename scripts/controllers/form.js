'use strict';

/*
This is a generic form controller. It handles forms without special handling.
 */
angular.module('lightApp').controller('formCtrl', ['$scope', '$routeParams', '$http', '$location', 'toaster', 'modelDataService', function($scope, $routeParams, $http, $location, toaster, modelDataService) {
    console.log('now we are in formCtrl');
    var getFormPost = {
        category : 'form',
        name : 'getForm',
        readOnly: true,
        data : {
            formId : $routeParams.formId,
            parentId: $routeParams.parentId
        }
    };

    console.log("getFormPost.data", getFormPost.data);

 $scope.tagFunction = function(content){
    var item = {
      value: content,
      label: content,
      description : '',
      group: ''
    }
    return item;
  };
    $scope.schema = {
    type: 'object',
    title: 'Select',
    properties: {

      descriptions: {
        title: 'Multi Select with descriptions and without Search on the description field.',
        type: 'array',
        format: 'uiselect',
        description: 'Multi single items arre allowed',
        minItems: 1,
        maxItems: 4,
        items: [
          { value: 'label1', label: 'label1', description: 'a long description to provide context that is not useful for search'},
          { value: 'label2', label: 'label2', description: 'a different long description to provide context that is not useful for search'},
          { value: 'label3', label: 'label3', description: 'a further long description to provide context that is not useful for search'},
          { value: 'label4', label: 'label4', description: 'another long description to provide context that is not useful for search'},
          { value: 'label5', label: 'label5', description: 'yet another long description to provide context that is not useful for search'}
        ]
      },
      descriptions_search: {
        title: 'Multi Select with search on descriptions',
        type: 'array',
        format: 'uiselect',
        description: 'Multi single items arre allowed, search on description',
        minItems: 1,
        items: [
          { group:'North America', value: 'us', label: 'Canada', description: ''},
          { group:'North America', value: 'cn', label: 'USA' , description: 'US, USA, United States of America'},
          { group:'Europe', value: 'gb', label: 'UK' , description: 'United Kingdom, Great Britain, GB'},
          { group:'Europe', value: 'nl', label: 'Holland' , description: 'Netherlands, NL, Nederland, Pays-Bas'}
        ]
      },
      tagging: {
        title: 'Tagging',
        type: 'array',
        format: 'uiselect',
        description: 'Hit enter or comma to create a new iootem in the dropdown',
        minItems: 1,
        maxItems: 2,
        items: [
          { value: 'one', label: 'label1'},
          { value: 'two', label: 'label2'},
          { value: 'three', label: 'label3'},
          { value: 'four', label: 'label4'},
          { value: 'five', label: 'label5'}
        ]
      },
      grouping: {
        title: 'Multi Select with grouping',
        type: 'array',
        format: 'uiselect',
        description: 'Can be empty',
        minItems: 0,
        items: [
          { group:'North America', value: 'us', label: 'Canada'},
          { group:'North America', value: 'cn', label: 'USA' },
          { group:'Europe', value: 'gb', label: 'UK' },
          { group:'Europe', value: 'nl', label: 'Holland'}
        ]
      },
      grouping_and_tagging: {
        title: 'Grouping with Tagging',
        type: 'array',
        format: 'uiselect',
        description: 'Hit enter or comma to create a new item in the dropdown',
        minItems: 1,
        maxItems: 2,
        items: [
          { group:'North America', value: 'us', label: 'Canada'},
          { group:'North America', value: 'cn', label: 'USA' },
          { group:'Europe', value: 'gb', label: 'UK' },
          { group:'Europe', value: 'nl', label: 'Holland'}
        ]
      },
      single_grouping_and_tagging: {
        title: 'Single Select with Grouping with Tagging',
        type: 'string',
        format: 'uiselect',
        description: 'Hit enter or comma to create a new item in the dropdown',
        minItems: 1,
        maxItems: 2,
        items: [
          { group:'North America', value: 'us', label: 'Canada'},
          { group:'North America', value: 'cn', label: 'USA' },
          { group:'Europe', value: 'gb', label: 'UK' },
          { group:'Europe', value: 'nl', label: 'Holland'}
        ]
      },
      single_tagging: {
        title: 'Tagging',
        type: 'string',
        format: 'uiselect',
        description: 'Hit enter or comma to create a new iootem in the dropdown',
        minItems: 1,
        maxItems: 2,
        items: [
          { value: 'one', label: 'label1'},
          { value: 'two', label: 'label2'},
          { value: 'three', label: 'label3'},
          { value: 'four', label: 'label4'},
          { value: 'five', label: 'label5'}
        ]
      },
    },
  };

  $scope.form =   [   'descriptions',
     {
       key: 'descriptions_search',
       options:{
          searchDescriptions : true
       }
     },
     {
       key: 'tagging',
       options: {
          tagging: $scope.tagFunction ,
          taggingLabel: '(adding new)',
          taggingTokens: 'ENTER|,'
       }
     },
     {
       key: 'grouping',
       options: {
          groupBy : 'group'
       }
     },
      {
       key: 'grouping_and_tagging',
       options: {
        groupBy : 'group',
          tagging: $scope.tagFunction ,
          taggingLabel: '(adding new)',
          taggingTokens: 'ENTER|,'
       }
     }
  ];

  $scope.action = [];

    $http.post('http://www.networknt.com/api/rs', getFormPost)
        .success(function(result, status, headers, config) {
            //$scope.schema = result.schema;
            //console.log('schema = ', $scope.schema);
            //$scope.form = result.form;
            // console.log('form = ', $scope.form);
            // $scope.action = result.action;
            console.log('action = ', $scope.action);
            $scope.schemaJson = JSON.stringify($scope.schema, undefined, 2);
            $scope.formJson = JSON.stringify($scope.form, undefined, 2);
            $scope.modelData = result.model || modelDataService.getModelData() || {};
            modelDataService.setModelData(null); // reset the modelDataService variable.
            $scope.decorator = 'bootstrap-decorator';
        }).error(function(data, status, headers, config) {
            toaster.pop('error', status, data, 5000);
        }
    );

    $scope.setButtonIndex = function(index) {
        $scope.buttonIndex = index;
    }

    $scope.submitForm = function(form, model) {
        // First we broadcast an event so all fields validate themselves
        $scope.$broadcast('schemaFormValidate');
        // Then we check if the form is valid
        if (form.$valid) {
            $scope.action[$scope.buttonIndex].data = $scope.modelData;
            $scope.action[$scope.buttonIndex].data.parentId = $routeParams.parentId;
            $http.post('http://www.networknt.com/api/rs', $scope.action[$scope.buttonIndex])
                .success(function (data, status, headers, config) {
                    if(angular.isDefined($scope.action[$scope.buttonIndex].success)) {
                        if(angular.isDefined($routeParams.parentId)) {
                            modelDataService.setModelData($routeParams.parentId);
                        }
                        $location.path($scope.action[$scope.buttonIndex].success);
                    }
                    toaster.pop('success', status, data);
                    //console.log(headers);
                    //console.log(config);
                })
                .error(function (data, status, headers, config) {
                    if(angular.isDefined($scope.action[$scope.buttonIndex].error)) {
                        $location.path($scope.action[$scope.buttonIndex].error);
                    }
                    toaster.pop('error', status, data, 5000);
                    //console.log(headers);
                    //console.log(config);
                });
        }
    };

}]);
