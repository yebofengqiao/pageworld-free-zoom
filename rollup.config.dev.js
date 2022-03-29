import baseCfg from './rollup.config.base';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';

export default {
    ...baseCfg,
    plugins: [
        serve({
            contentBase: '',
            port: 8020,
        }),
        livereload('src')
    ]
}
