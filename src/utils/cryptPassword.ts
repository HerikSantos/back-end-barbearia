import bcrypt from "bcryptjs";

async function cryptPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);

    const hashPassword = await bcrypt.hash(password, salt);

    return hashPassword;
}
export { cryptPassword };
