var Encore = require("@symfony/webpack-encore");

Encore
    .setOutputPath('web/build/')
    .setPublicPath('/build')
    // read main.js     -> output as web/build/app.js
    .addEntry('app', './assets/js/Application/index.ts')
    .enableTypeScriptLoader(function (typeScriptConfigOptions) {
        typeScriptConfigOptions.transpileOnly = true;
        typeScriptConfigOptions.configFileName = '/assets/js/Application/tsconfig.json';
    })
    // read global.scss -> output as web/build/global.css
    /*.addStyleEntry('global', './assets/css/global.scss')*/

    // enable features!
    // .enableSassLoader()
    // .autoProvidejQuery()
    // .enableReactPreset()
    .enableSourceMaps(!Encore.isProduction())
    .enableVersioning()
;

module.exports = Encore.getWebpackConfig();

