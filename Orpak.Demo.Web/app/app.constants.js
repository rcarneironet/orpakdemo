var constants = [];

var serviceBase = 'http://orpakdemo-api.azurewebsites.net/api/';
//var serviceBase = 'http://localhost:53549/api/';


constants.push({
    key: 'ngAuthSettings', value: {
        apiServiceBaseUri: serviceBase
    }
});

var configuration = {
    config: function (appModule) {
        constants.forEach(function (constant) {
            appModule.constant(constant.key, constant.value);
        });
    }
};
export default configuration;