const { resolve } = require("path");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
    entry: "./src/main/ts/main.ts",
    output: {
        filename: "main.js",
        path: resolve(__dirname, "src/main/resources/static"),
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: "ts-loader",
            },
        ],
    },
    resolve: {
        extensions: [".ts"],
    },
    optimization: {
        minimizer: [new TerserPlugin()],
    },
};
