require.config({
    paths: {
        jquery: '../node_modules/jquery/dist/jquery'
    }
});

require(
    ['app'],

    function (app: any) {
        app.start();
    },

    function (err: any) {
        console.error('ERROR: ', err.requireType);
        console.error('MODULES: ', err.requireModules);
    }
);