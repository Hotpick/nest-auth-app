import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { CreateReportDto, ReportDto } from "./dtos/report.dto";
import { ReportService } from "./report.service";
import { AuthGuard } from "../guards/auth.guard";
import { User } from "../user/user.entity";
import { CurrentUser } from "../user/decorators/current-user.decorator";
import { Serialize } from "../interceptors/serialize.interceptors";

@Controller("report")
export class ReportController {
  constructor(private reportService: ReportService) {}

  @Post()
  @UseGuards(AuthGuard)
  @Serialize(ReportDto)
  CreateReport(@Body() body: CreateReportDto, @CurrentUser() user: User) {
    return this.reportService.create(body, user);
  }
}
