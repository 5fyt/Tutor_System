import { Body, Controller, Post, Get } from '@nestjs/common';
import { ApiOperation, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { PaginatedResponseDto } from 'src/common/class/res.class';

import {
  CreateScoreDto,
  UpdateScoreDto,
  PageSearchScoreDto,
  DeleteScoreDto,
} from './achievement.dto';

import { SysScoreService } from './achievement.service';
import SysAchievement from 'src/entities/achievement.entity';
import { AdminUser } from 'src/decorators/admin-user.decorator';
import { IAdminUser } from 'src/modules/admin.interface';
import { ScoreInfo } from './achievement.class';

@ApiTags('课程模块')
@Controller('score')
export class SysScoreController {
  constructor(private scoreService: SysScoreService) {}
  @Get('list')
  async getList(): Promise<ScoreInfo[]> {
    return this.scoreService.scoreList();
  }

  @ApiOperation({ summary: '分页查询课程信息' })
  @ApiOkResponse({ type: [SysAchievement] })
  @Post('search')
  async page(
    @Body() dto: PageSearchScoreDto,
  ): Promise<PaginatedResponseDto<SysAchievement>> {
    const [list, total] = await this.scoreService.page(dto);
    return {
      size: dto.limit,
      page: dto.page,
      total,
      list,
    };
  }

  @ApiOperation({ summary: '分页查询课程信息' })
  @ApiOkResponse({ type: [SysAchievement] })
  @Post('search-student-score')
  async pageStudent(
    @Body() dto: PageSearchScoreDto,
    @AdminUser() user: IAdminUser,
  ): Promise<PaginatedResponseDto<SysAchievement>> {
    const [list, total] = await this.scoreService.pageStudent(dto, user.uid);
    return {
      size: dto.limit,
      page: dto.page,
      total,
      list,
    };
  }
  @ApiOperation({ summary: '删除课程' })
  @Post('delete')
  async delete(@Body() dto: DeleteScoreDto): Promise<void> {
    await this.scoreService.delete(dto.scoreIds);
  }

  @ApiOperation({ summary: '新增课程' })
  @Post('add')
  async add(@Body() dto: CreateScoreDto): Promise<void> {
    await this.scoreService.add(dto);
  }

  @ApiOperation({ summary: '更新课程' })
  @Post('update')
  async update(@Body() dto: UpdateScoreDto): Promise<void> {
    await this.scoreService.update(dto);
  }
}
