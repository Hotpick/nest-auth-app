import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Report } from "./report.entity";
import { Repository } from "typeorm";
import { ReportDto } from "./dtos/report.dto";

@Injectable()
export class ReportService {
  constructor(@InjectRepository(Report) private repo: Repository<Report>) {}

  create(data: ReportDto) {
    const report = this.repo.create(data);

    return this.repo.save(report);
  }
}
