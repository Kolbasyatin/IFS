const Encore = require("@symfony/webpack-encore"),
    webpack = require("webpack");
let CopyWebpackPlugin = require('copy-webpack-plugin');

Encore
    .setOutputPath('web/build/')
    .setPublicPath('/build')
    .cleanupOutputBeforeBuild()
    // read main.js     -> output as web/build/app.js
    .addEntry('js/app', './assets/js/Application/index.ts')
    .addEntry('js/vendor', ["mustache", "jquery", "jquery-slider"])

    .enableTypeScriptLoader(function (typeScriptConfigOptions) {
        typeScriptConfigOptions.transpileOnly = true;
        typeScriptConfigOptions.configFileName = '/assets/js/Application/tsconfig.json';
    })
    .addPlugin(
        new webpack.ContextReplacementPlugin(
            /node_modules\/moment\/locale/, /ru|en-gb/
        )
    )
    // .addPlugin(new webpack.optimize.CommonsChunkPlugin(
    //     "js/vendor"
    // ))
    .addStyleEntry('css/app', './assets/css/style.less')
    .enableLessLoader()
    .autoProvidejQuery()
    .autoProvideVariables({
        "window.jQuery": "jquery",
        "$.jPlayer": "jplayer"
    })
    .enableSourceMaps(!Encore.isProduction())
    .addLoader({
        test: __dirname + "/web/bundles/goswebsocket/js/gos_web_socket_client.js",
        loader: "exports-loader?WS"
    })
    .enableVersioning();

let config = Encore.getWebpackConfig();

config.resolve.alias = {
    'jquery-slider': 'jquery-ui/ui/widgets/slider',
    'gos-ws': __dirname + '/web/bundles/goswebsocket/js/gos_web_socket_client.js'
};
config.plugins.unshift(
    new CopyWebpackPlugin([{
        from: __dirname + '/assets/images',
        to: __dirname+ '/web/assets'
    }])
);
module.exports = config;

