import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const nextConfig = {
  webpack(config) {
    config.resolve.alias['@'] = path.join(__dirname, 'src');
    return config;
  },
};

export default nextConfig;