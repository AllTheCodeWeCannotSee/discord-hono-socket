import path from 'path';
import { defineConfig } from 'vitest/config';


import dotenv from 'dotenv';

dotenv.config({ path: path.resolve(__dirname, '.env.test') });

export default defineConfig({
    test: {
        environment: 'node',
        globals: true,
        alias: {
            '@': path.resolve(__dirname, './'),  // 配置路径别名
        }
    },
});
