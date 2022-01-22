const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
// const WebpackObfuscator = require('webpack-obfuscator');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const miniCss = require('mini-css-extract-plugin');

const resolvePath = path => resolve(__dirname, path);

module.exports = (env, options) => {
    // const isProd = options.mode === 'production';
    return {
        entry: resolvePath('src/js/main.js'),
        output: {
            path: resolvePath('public'),
            filename: 'bundle.js',
        },
        resolve: {
            extensions: ['.js', '.json', '.svg', '.css'],
            modules: [resolvePath('src'), 'node_modules'],
        },
        devServer: {
            port: '8083',
            host: 'localhost',
            open: true,
            hot: true,
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    loader: 'babel-loader',
                    exclude: /node_modules/,
                },
                {
                    test:/\.(s*)css$/,
                    use: [
                        miniCss.loader,
                        'css-loader',
                        'sass-loader',
                    ]
                },
                {
                    test: /\.(woff|woff2|ttf|eot|otf)$/i,
                    type: 'asset/resource',
                    generator: {
                        filename: 'fonts/[hash][ext]',
                    },
                    exclude: /node_modules/,
                },
                {
                    test: /\.(png|svg|jpe?g|gif)$/i,
                    type: 'asset/resource',
                    generator: {
                        filename: 'images/[hash][ext]',
                    },
                    exclude: /node_modules/,
                },
                {
                    test: /\.html$/,
                    use: [
                        {
                            loader: 'html-loader'
                        }
                    ]
                }
            ],
        },
        plugins: [
            new CaseSensitivePathsPlugin(),
            new miniCss({
                filename: 'style.css',
            }),
            new CleanWebpackPlugin(),
            new HtmlWebpackPlugin({
                template: resolvePath('index.html'),
                filename: resolvePath('public/index.html'),
                inject: 'body',
            }),
            // isProd && new WebpackObfuscator({
            //     compact: true,
            //     controlFlowFlattening: true,
            //     controlFlowFlatteningThreshold: 0.75,
            //     deadCodeInjection: true,
            //     deadCodeInjectionThreshold: 0.4,
            //     debugProtection: false,
            //     debugProtectionInterval: false,
            //     disableConsoleOutput: true,
            //     identifierNamesGenerator: 'hexadecimal',
            //     log: false,
            //     numbersToExpressions: true,
            //     renameGlobals: false,
            //     selfDefending: true,
            //     simplify: true,
            //     splitStrings: true,
            //     splitStringsChunkLength: 10,
            //     stringArray: true,
            //     stringArrayEncoding: ['base64'],
            //     stringArrayIndexShift: true,
            //     stringArrayRotate: true,
            //     stringArrayShuffle: true,
            //     stringArrayWrappersCount: 2,
            //     stringArrayWrappersChainedCalls: true,
            //     stringArrayWrappersParametersMaxCount: 4,
            //     stringArrayWrappersType: 'function',
            //     stringArrayThreshold: 0.75,
            //     transformObjectKeys: true,
            //     unicodeEscapeSequence: false,
            // }),
        ].filter(plugin => plugin),
    };
};
