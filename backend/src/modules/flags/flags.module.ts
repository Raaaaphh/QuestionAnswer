import { Module } from '@nestjs/common';
import { ControllersController } from './controllers/controllers.controller';
import { ServicesService } from './services/services.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Flag } from './flag.model';

@Module({
  imports: [SequelizeModule.forFeature([Flag])],
  controllers: [ControllersController],
  providers: [ServicesService]
})
export class FlagsModule { }
