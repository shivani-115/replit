import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectsService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.project.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  create(data: CreateProjectDto) {
    return this.prisma.project.create({ data });
  }

  async update(id: string, data: UpdateProjectDto) {
    const existing = await this.prisma.project.findUnique({ where: { id } });
    if (!existing) {
      throw new NotFoundException(`Project ${id} not found`);
    }
    return this.prisma.project.update({ where: { id }, data });
  }


  async remove(id: string) {
    const existing = await this.prisma.project.findUnique({ where: { id } });
    if (!existing) {
      throw new NotFoundException(`Project ${id} not found`);
    }
    return this.prisma.project.delete({ where: { id } });
  }
}
