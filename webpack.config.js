const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ScriptExtPlugin = require('script-ext-html-webpack-plugin');
const {AngularCompilerPlugin} = require('@ngtools/webpack');

module.exports = function () {
   return {
       mode: 'development',
       entry: './src/main.ts',
       output: {
           path: __dirname + '/dist',
           filename: 'app.js'
       },
       module: {
            rules: [
                {
                    test: /\.ts$/,
                    loader: '@ngtools/webpack',
                }
            ]
        },
       resolve: {
           extensions: ['.ts', '.js']
       },
       plugins: [
           new CopyWebpackPlugin([
               { from: 'src/assets', to: 'assets'}
           ]), 
           new HtmlWebpackPlugin({
               template: __dirname + '/src/index.html',
               output: __dirname + '/dist',
               inject: 'head'
           }), 
           new ScriptExtPlugin({
               defaultAttribute: 'defer'
           }),
           new AngularCompilerPlugin({
               tsConfigPath: './tsconfig.json',
               entryModule: './src/app/app.module#AppModule',
               sourceMap: true
           })
       ]
   };
}