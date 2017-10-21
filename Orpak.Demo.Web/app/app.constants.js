var constants = [];

var serviceBase = 'http://orpakdemo-api.azurewebsites.net/api/';


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