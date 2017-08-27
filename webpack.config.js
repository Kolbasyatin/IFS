var Encore = require("@symfony/webpack-encore"),
    webpack = require("webpack");

Encore
    .setOutputPath('web/build/')
    .setPublicPath('/build')
    .cleanupOutputBeforeBuild()
    // read main.js     -> output as web/build/app.js
    .addEntry('app', './assets/js/Application/index.ts')

    .enableTypeScriptLoader(function (typeScriptConfigOptions) {
        typeScriptConfigOptions.transpileOnly = true;
        typeScriptConfigOptions.configFileName = '/assets/js/Application/tsconfig.json';
    })
    .addPlugin(
        new webpack.ContextReplacementPlugin(
            /node_modules\/moment\/locale/, /ru|en-gb/
        )
    )

    // read global.scss -> output as web/build/global.css
    /*.addStyleEntry('global', './assets/css/global.scss')*/

    // enable features!
    // .enableSassLoader()
    .autoProvidejQuery()
    // .autoProvideVariables({
    //     "window.jQuery": "jquery"
    //     /*"jQuery.tagsinput": "bootstrap-tagsinput"*/
    // })
    // .enableReactPreset()
    .enableSourceMaps(!Encore.isProduction())
    .enableVersioning()
;

module.exports = Encore.getWebpackConfig();

