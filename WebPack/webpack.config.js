const path = require("path");
const webpack = require("webpack");

module.exports = {
  mode: "development", // 배포시에는 production
  devtool: "eval", // 배포시에는 hidden-source-map
  resolve: {
    extensions: [".jsx", ".js"],
  },

  entry: {
    app: "./client",
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: "babel-loader", // 최신 문법을 예전 문법으로 변경시켜준다
        options: {
          presets: [
            [
              "@babel/preset-env",
              {
                targets: {
                  // 한국에서 점유율 5퍼센트 이상인 브라우저, 최신 2개의 크롬 버전
                  browsers: ["> 5% in KR", "last 2 chrome versions"], // browserslist : 브라우저 리스트를 알려주는 사이트
                },
                debug: true,
              },
            ],
            "@babel/preset-react",
          ],
          plugins: [],
        },
      },
    ],
  },
  plugins: [new webpack.LoaderOptionsPlugin({ debug: true })], // 확장 프로그램 느낌
  output: {
    path: path.join(__dirname, "dist"),
    filename: "app.js",
  },
};
