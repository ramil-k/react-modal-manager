const resolve = require("rollup-plugin-node-resolve");
const babel = require("rollup-plugin-babel");
const commonjs = require("rollup-plugin-commonjs");
const { terser } = require("rollup-plugin-terser");
const pkg = require("./package.json");

const isProduction = process.env.NODE_ENV === "production";

module.exports = {
    input: "src/index.js",
    output: {
        file: pkg.main,
        format: "umd",
        name: pkg.name
    },
    plugins: [
        resolve({
            // pass custom options to the resolve plugin
            customResolveOptions: {
                moduleDirectory: "node_modules"
            }
        }),
        babel({
            exclude: "node_modules/**" // only transpile our source code
        }),
        commonjs({
            include: "node_modules/**",
            namedExports: {}
        }),
        // production plugins
        ...(isProduction ? [terser()] : [])
    ],
    external: [
        ...Object.keys(pkg.dependencies || {}),
        ...Object.keys(pkg.peerDependencies || {})
    ]
};
