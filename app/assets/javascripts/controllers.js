

angular.module('tutorial.controllers', [])

.controller('ImageController',
		function($scope) {
			// Initialize data fields
			$scope.serverTime = "Nothing Here Yet";
			
			// Metrics
			$scope.fileCount = 0;
			$scope.imageBytes = 0;
			$scope.storageBytes = 0;
			$scope.ratio = 0;
			
			// Form Data
			$scope.encrypted = true;
			$scope.compressed = true;
			$scope.zipExpand = false;
			
			// Image Gallery - Dummy thumbnail images for now 
			$scope.images = [];
			$scope.images.push();
			$scope.images.push({ src : '/assets/images/thumb1.png', alt : 'Thunmb1', desc :'Thumbnail 1'});
			$scope.images.push({ src : '/assets/images/thumb1.png', alt : 'Thunmb1', desc :'Thumbnail 1'});
			$scope.images.push({ src : '/assets/images/thumb1.png', alt : 'Thunmb1', desc :'Thumbnail 1'});
			$scope.images.push({ src : '/assets/images/thumb1.png', alt : 'Thunmb1', desc :'Thumbnail 1'});
			$scope.images.push({ src : '/assets/images/thumb1.png', alt : 'Thunmb1', desc :'Thumbnail 1'});
			$scope.images.push({ src : '/assets/images/thumb1.png', alt : 'Thunmb1', desc :'Thumbnail 1'});
			$scope.images.push({ src : '/assets/images/thumb1.png', alt : 'Thunmb1', desc :'Thumbnail 1'});
			$scope.images.push({ src : '/assets/images/thumb1.png', alt : 'Thunmb1', desc :'Thumbnail 1'});
			

			$scope.handleServerEvent = function(e) {
				$scope.$apply(function() {
					var raw = JSON.parse(e.data);
					var target = raw.target;
					var data = raw.data;
					// console.log("Received data for " + target);
					if (target == "image") {
						var img = { src : '/images/thumb/' + data.id, alt : data.tooltip, desc : data.description }
						console.log("thumb - " + img.src);
						$scope.images.unshift(img);
					} else if (target == "serverTime") {
						$scope.serverTime = data;
					} else if (target == "statistics") {
						$scope.data.shift();
						$scope.data.shift();
						$scope.data.shift();
						$scope.data.shift();
						$scope.data.push(data.GET);
						$scope.data.push(data.PUT);
						$scope.data.push(data.POST);
						$scope.data.push(data.DELETE);
						redrawMethods($scope.data);

						// browser data
						$scope.safari = data.Safari;
						$scope.chrome = data.Chrome;
						$scope.firefox = data.Firefox;
						$scope.ie = data.IE;
						$scope.http = data.HttpClient;
						$scope.highBrand = determineHighBrand($scope);

						// device data
						$scope.desktop = data.Desktop;
						$scope.tablet = data.Tablet;
						$scope.phone = data.Phone;
						$scope.tv = data.TV;
						$scope.highDevice = determineHighDevice($scope);

						// response time
						$scope.requests = data.requests;
						$scope.responseTime = data.totalResponseTime / data.requests;
					}
				});
			};

			$scope.startSocket = function(uuid) {
				$scope.stopSocket();
				$scope.images = [];
				var url = "/sse/" + uuid 
				console.log(url);
				$scope.socket = new EventSource(url);
				$scope.socket.addEventListener("message", $scope.handleServerEvent, false);
			};

			$scope.stopSocket = function() {
				if (typeof $scope.socket != 'undefined') {
					$scope.socket.close();
				}
			};
		}
)
/*
This directive allows us to pass a function in on an enter key to do what we want.
 */
.directive('ngEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.ngEnter);
                });
 
                event.preventDefault();
            }
        });
    };
})
;

//