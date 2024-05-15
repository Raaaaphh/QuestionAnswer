import { Module } from '@nestjs/common';
import { AuthModule } from './class/auth/auth.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppService } from './app.service';
import { User } from './class/users/user.model';
import { UsersModule } from './class/users/users.module';
import { QuestionsModule } from './class/questions/questions.module';
import { AnswersModule } from './class/answers/answers.module';
import { FavoritesModule } from './class/favorites/favorites.module';
import { Question } from './class/questions/question.model';
import { Answer } from './class/answers/answer.model';
import { Favorite } from './class/favorites/favorite.model';
import { QuestiontagsModule } from './class/questiontags/questiontags.module';
import { InvitationsModule } from './class/invitations/invitations.module';
import { TagsModule } from './class/tags/tags.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { Tag } from './class/tags/tag.model';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: '.env',
  }),
    AuthModule,
  SequelizeModule.forRootAsync({
    imports: [ConfigModule],
    useFactory: (configService: ConfigService) => ({
      dialect: 'mysql',
      host: configService.get('DB_HOST'),
      port: +configService.get('DB_PORT'),
      username: configService.get('DB_USER'),
      password: configService.get('DB_PASSWORD'),
      database: configService.get('DB_NAME'),
      models: [User, Question, Answer, Favorite, Tag],
      //autoLoadModels: true,
      //synchronize: true,
    }),
    inject: [ConfigService],
  }),
    UsersModule,
    QuestionsModule,
    AnswersModule,
    FavoritesModule,
    QuestiontagsModule,
    InvitationsModule,
    TagsModule,
    // MailerModule.forRoot({
    //   transport: {
    //     host: 'smtp.gmail.com',
    //     auth: {
    //       user: 'corsica0107@gmail.com',
    //       pass: 'raphael11022004',
    //     },
    //   },
    // }),
  ],
  providers: [AppService],
})
export class AppModule { }
