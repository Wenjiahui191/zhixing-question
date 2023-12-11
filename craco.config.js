/* eslint-disable no-undef */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path")
module.exports = {
    webpack: {
        configure: (webpackConfig) => {
            if (webpackConfig.mode === 'production') {
                if (webpackConfig.optimization == null) {
                    webpackConfig.optimization = {}
                }
                webpackConfig.optimization.splitChunks = {
                    chunks: 'all',
                    cacheGroups: {
                        antd: {
                            name: 'antd-chunk',
                            test: /antd/,
                            priority: 100
                        },
                        reactDom: {
                            name: 'reactDom-chunk',
                            test: /react-dom/,
                            priority: 99
                        },
                        vendors: {
                            name: 'vendors-chunks',
                            test: /node_modules/,
                            priority: 98
                        }
                    }
                }
            }
            return webpackConfig
        },
        alias: {
            // 约定：使用 @ 表示 src 文件所在路径
            "@": path.resolve(__dirname, "src"),
            // 约定：使用 @ 表示 src/components 文件所在路径
            "@comp": path.resolve(__dirname, "src", "components"),
            "@router": path.resolve(__dirname, "src", "router"),
            "@services": path.resolve(__dirname, "src", "services"),
            "@hooks": path.resolve(__dirname, "src", "hooks"),
        },
    },
    devServer: {
        port: 8000,
        proxy: {
            '/api': 'http://localhost:3004'
        }
    },
}
