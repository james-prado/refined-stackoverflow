const path = require("path")

const webpack = require("webpack")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const CopyWebpackPlugin = require("copy-webpack-plugin")

module.exports = (env, argv) => {
	const isProduction = argv.mode === "production"
	return {
		stats: isProduction ? "standard" : "minimal",
		entry: {
			content: [
				path.join(__dirname, "src/content/content.ts"),
				path.join(__dirname, "src/content/content.css"),
			],
			popup: [
				path.join(__dirname, "src/popup/popup.ts"),
				path.join(__dirname, "src/popup/popup.css"),
			],
		},
		output: {
			path: path.join(__dirname, "dist"),
			publicPath: "",
		},
		performance: {
			hints: isProduction ? "error" : false,
		},
		devtool: isProduction ? undefined : "eval-cheap-source-map",
		optimization: {
			splitChunks: {
				chunks: "all",
			},
			emitOnErrors: true,
		},
		plugins: [
			new webpack.ProgressPlugin(),
			new MiniCssExtractPlugin(),
			new HtmlWebpackPlugin({
				template: "src/popup/popup.html",
				filename: "popup.html",
				chunks: ["popup"],
			}),
			new CopyWebpackPlugin({
				patterns: [{ from: "static" }],
			}),
		],
		module: {
			rules: [
				{
					test: /\.ts?$/,
					loader: "ts-loader",
				},
				{ test: /\.css$/, use: [MiniCssExtractPlugin.loader, "css-loader"] },
				{
					test: /\.html?$/,
					loader: "html-loader",
				},
			],
		},
	}
}
