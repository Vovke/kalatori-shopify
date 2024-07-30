import dotenv from 'dotenv';

dotenv.config();

interface Config {
  kalatoriHost: string;
  kalatoriPort: number;
}

const config: Config = {
  kalatoriHost: process.env.KALATORI_HOST || '',
  kalatoriPort: Number(process.env.KALATORI_PORT) || 3000,
};

export default config;
