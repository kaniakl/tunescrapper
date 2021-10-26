import { EnumEnvironment } from '@/model/enum/EnumEnvironment';

export const ProdConfig = {
    api: {
        backendApi: 'http://localhost:6789',
    },

    environment: EnumEnvironment.PRODUCTION,
};
