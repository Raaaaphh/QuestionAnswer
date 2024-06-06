import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Flag } from './flag.model';
import { FlagsService } from './services/flags.service';
import { FlagsController } from './controllers/flags.controller';

@Module({
  imports: [SequelizeModule.forFeature([Flag])],
  controllers: [FlagsController],
  providers: [FlagsService],
  exports: [SequelizeModule],
})
export class FlagsModule { }
