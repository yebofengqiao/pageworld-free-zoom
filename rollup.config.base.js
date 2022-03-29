import typescript from "@rollup/plugin-typescript";
import pkg from "./package.json";
import json from "rollup-plugin-json";
import resolve from "rollup-plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
// import eslint from "@rollup/plugin-eslint";
import { babel } from "@rollup/plugin-babel";
import * as path from 'path';

const formatName = 'pageworld-freezoom';
export default {
    input: './src/index.ts',
    output: [
        {
            file: pkg.main,
            format: 'cjs',
        },
        {
            file: pkg.module,
            format: 'esm',
        },
        {
            file: pkg.browser,
            format: 'umd',
            name: formatName,
        }
    ],
    plugins: [
        json(),
        commonjs({
            include: /node_modules/,
        }),
        resolve({
            preferBuiltins: true,
            jsnext: true,
            main: true,
            browser: true,
        }),
        typescript(),
        // eslint(),
        babel({
            exclude: 'node_modules/** ',
            babelHelpers: 'true',
        }),
    ]
}
