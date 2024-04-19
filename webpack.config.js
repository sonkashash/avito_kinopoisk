const path = require("path");
const webpack = require('webpack');

module.exports = {
    mode: "development", // или "production"
    entry: "./app/main.js", // входная точка - исходный файл
    output:{
        path: path.resolve(__dirname, "./public"),     // путь к каталогу выходных файлов - папка public
        publicPath: "/public/",
        filename: "bundle.js"       // название создаваемого файла
    },
    devServer: {
       
         historyApiFallback: true,
        static: {
            directory: path.join(__dirname, "/"),
        },
        port: 7070,
        open: true,
        client: {
            reconnect: false,
          },
        // hot: true,
        // liveReload: true,
        // webSocketServer: false,
    },
    module:{
        rules:[   //загрузчик для jsx
            {
                test: /\.jsx?$/, // определяем тип файлов
                exclude: /(node_modules)/,  // исключаем из обработки папку node_modules
                loader: "babel-loader",   // определяем загрузчик
                options:{
                    presets:[ "@babel/preset-react"]    // используемые плагины
                }
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.TOKEN': JSON.stringify(process.env.TOKEN),
        }),
    ],
};