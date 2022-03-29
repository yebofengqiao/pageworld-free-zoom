import { terser } from 'rollup-plugin-terser';
import filesize from 'rollup-plugin-filesize';

import baseCfg from './rollup.config.base';

export default {
    ...baseCfg,
    plugins: [
        ...baseCfg.plugins,
        terser(),
        filesize(),
    ]
}
