import { AppError } from "../../../errors/AppErros";
import { type IAdminsRepository } from "../../../repositories/IAdminsRepository";
import { type IClientsRepository } from "../../../repositories/IClientsRepository";
import { verifyToken } from "../../../utils/verifyToken";

interface IResponseClient {
    id: string;
    name: string;
    data_nasc: Date;
    iat: number;
    exp: number;
}

interface IResponseAdmin {
    id: string;
    name: string;
    email: string;
    password: string;
    iat: number;
    exp: number;
}

class VerifyTokenUseCase {
    constructor(
        private readonly adminRepository?: IAdminsRepository,
        private readonly clientsRepository?: IClientsRepository,
    ) {}

    async verifyTokenAdmin(token: string): Promise<void> {
        if (this.adminRepository) {
            try {
                const result = verifyToken(token) as IResponseAdmin;

                const { id } = result;

                const admin = await this.adminRepository.findByID(id);

                if (!admin) throw new AppError("Token invalid");

                return;
            } catch (err) {
                throw new AppError("Token invalid");
            }
        }

        throw new AppError("Repository is required");
    }

    async verifyTokenClient(token: string): Promise<void> {
        if (this.clientsRepository) {
            try {
                const result = verifyToken(token) as IResponseClient;

                const { id } = result;

                const client = await this.clientsRepository.findByID(id);

                if (!client) throw new AppError("Token invalid");

                return;
            } catch (error) {
                throw new AppError("Token invalid ");
            }
        }

        throw new AppError("Repository is required");
    }
}

export { VerifyTokenUseCase };
