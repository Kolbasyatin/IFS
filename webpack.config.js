const Encore = require("@symfony/webpack-encore"),
    webpack = require("webpack");
let CopyWebpackPlugin = require('copy-webpack-plugin');
let ImageminPlugin = require('imagemin-webpack-plugin').default;

Encore
    .setOutputPath('web/build/')
    .setPublicPath('/build')
    .cleanupOutputBeforeBuild()
    // read main.js     -> output as web/build/app.js
    .addEntry('js/app', './assets/js/IFSFront/index.ts')
    .addEntry('js/vendor', ["mustache", "jquery", "jquery-slider"])

    .enableTypeScriptLoader(function (typeScriptConfigOptions) {
        typeScriptConfigOptions.transpileOnly = true;
        typeScriptConfigOptions.configFileName = 'assets/js/IFSFront/tsconfig.json';
    })
    .addPlugin(
        new webpack.ContextReplacementPlugin(
            /node_modules\/moment\/locale/, /ru|en-gb/
        )
    )
    .addPlugin(
        new ImageminPlugin({
            disable: !Encore.isProduction,
            test: /\.(jpe?g|png|gif|svg)$/i,


        })
    )
    // .addPlugin(new webpack.optimize.CommonsChunkPlugin(
    //     "js/vendor"
    // ))
    .addStyleEntry('css/app', './assets/css/style.less')
    .enableLessLoader()
    .autoProvidejQuery()
    .autoProvideVariables({
        "window.jQuery": "jquery",
        "$.jPlayer": "jplayer",
        "Routing": "router"
    })
    .enableSourceMaps(!Encore.isProduction())
    .addLoader({
        test: /gos_web_socket_client.js$/,
        loader: "exports-loader?WS"
    })
    .addLoader({
        test: /jsrouting-bundle\/Resources\/public\/js\/router.js$/,
        loader: "exports-loader?router=window.Routing"
    })

    .enableVersioning();

let config = Encore.getWebpackConfig();

config.resolve.alias = {
    'jquery-slider': 'jquery-ui/ui/widgets/slider',
    'jquery-dialog': 'jquery-ui/ui/widgets/dialog',
    'jquery-tooltip': 'jquery-ui/ui/widgets/tooltip',
    'gos-ws': __dirname + '/vendor/gos/web-socket-bundle/Resources/public/js/gos_web_socket_client.js',
    'router': __dirname + '/assets/js/router.js'
};
config.plugins.unshift(
    new CopyWebpackPlugin([{
        from: __dirname + '/assets/images',
        to: __dirname+ '/web/assets'
    }])
);
module.exports = config;

