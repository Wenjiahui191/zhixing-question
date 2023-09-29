const path = require("path")
module.exports = {
    devServer: {
        proxy: {
            '/api': 'http://localhost:3030'
        }
    },
    webpack: {
        // 配置别名
        alias: {
            // 约定：使用 @ 表示 src 文件所在路径
            "@": path.resolve(__dirname, "src"),
            // 约定：使用 @ 表示 src/components 文件所在路径
            "@comp": path.resolve(__dirname, "src", "components"),
            "@router": path.resolve(__dirname, "src", "router"),
            "@services": path.resolve(__dirname, "src", "services"),
            "@hooks": path.resolve(__dirname, "src", "hooks"),
        },
    }
}