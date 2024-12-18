import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModule } from "./user/user.module";
import { User } from "./user/user.entity";
import { Report } from "./report/report.entity";
import { ReportModule } from "./report/report.module";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "sqlite",
      database: "db.sqlite",
      entities: [User, Report],
      synchronize: true,
    }),
    UserModule,
    ReportModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
