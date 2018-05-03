const path = require('path');

const env = process.env.NODE_ENV || 'development';
console.log('Webpack building with ', process.env.NODE_ENV);
const webpack = require('webpack');

module.exports = {

    entry: {
        applySkins: path.join(__dirname,'src/applySkins.ts'),
        main: path.join(__dirname,'src/main.ts'),
    },

    output: {
        path: path.join(__dirname,'/dist'),
        filename: '[name].js',
        sourceMapFilename: '[name].js.map'
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js", ".json"]
    },

    plugins: [
        new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify(env) })
    ],

    module: {
        rules: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            { test: /\.tsx?$/, loader: "awesome-typescript-loader" },

            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },

            // All css files will go through the webpack css-loader
            { test: /\.css$/, use: [ 'style-loader', 'css-loader' ] }
        ]
    }

    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
};
