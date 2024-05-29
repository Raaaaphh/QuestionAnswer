import { Dependencies, Injectable } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';

@Dependencies(Sequelize)
@Injectable()
export class AppService {
    constructor(private sequelize: Sequelize) {
    }
}
