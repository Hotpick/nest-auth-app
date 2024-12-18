import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Report } from "./report.entity";
import { Repository } from "typeorm";
import { CreateReportDto } from "./dtos/report.dto";
import { User } from "../user/user.entity";

@Injectable()
export class ReportService {
  constructor(@InjectRepository(Report) private repo: Repository<Report>) {}

  create(data: CreateReportDto, user: User) {
    const report = this.repo.create(data);
    report.user = user;

    return this.repo.save(report);
  }
}
