import { ConfigService } from '@nestjs/config';

class _envReader {
    constructor(private configService: ConfigService) {}

    get<T>(key: string): T {
        const ret = this.configService.get<T>(key);
        console.log('envReader.get(', key, '): ', ret);
        return ret;
    }
}

const envReader = new _envReader(new ConfigService());

Object.freeze(envReader);

export default envReader;