const path = require("path");
const combineLoaders = require("webpack-combine-loaders");
const WebpackBuildNotifierPlugin = require("webpack-build-notifier");

module.exports = {
  plugins: [
    new WebpackBuildNotifierPlugin({
      title: "Happy Hooks Build",
      warningSound: true,
      failureSound: true
    })
  ],
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env", "@babel/preset-react"],
              plugins: [
                [
                  "import",
                  {
                    libraryName: "antd",
                    libraryDirectory: "es",
                    style: true
                  }
                ]
              ]
            }
          },
          { loader: "source-map-loader" }
        ]
      },
      {
        test: /\.css$/,
        use: [{ loader: "style-loader" }, { loader: "css-loader" }]
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader"
          },
          {
            loader: "less-loader",
            options: {
              //modifyVars: antdTheme,    // 如果要自定义主题样式
              javascriptEnabled: true
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          { loader: "style-loader" },
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              modules: true
            }
          },
          { loader: "sass-loader" }
        ]
      }
    ]
  }
};
