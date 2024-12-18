import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { ReportDto } from "./dtos/report.dto";
import { ReportService } from "./report.service";
import { AuthGuard } from "../guards/auth.guard";

@Controller("report")
export class ReportController {
  constructor(private reportService: ReportService) {}

  @Post()
  @UseGuards(AuthGuard)
  CreateReport(@Body() body: ReportDto) {
    this.reportService.create(body);
  }
}
