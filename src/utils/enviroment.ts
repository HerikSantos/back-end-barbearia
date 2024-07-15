import dotenv from "dotenv";
import path from "path";
import { string, z } from "zod";

dotenv.config({ path: path.resolve(__dirname, "..", "..", ".env.dev") });

const envSchema = z.object({
    DATABASE_USERNAME: string(),
    DATABASE_PASSWORD: string(),
    DATABASE: string(),
    DATABASE_HOST: string(),
    JWT_SECRET: string(),
    PORT: string(),
});

const env = envSchema.parse(process.env);

export { env };
