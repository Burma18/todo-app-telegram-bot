import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TaskEntity } from './entities/task.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(TaskEntity)
    private readonly taskRepository: Repository<TaskEntity>,
  ) {}

  async getAll() {
    return this.taskRepository.find();
  }

  async getById(id: number) {
    return this.taskRepository.findOneBy({ id });
  }

  async completeTask(id: number) {
    const task = await this.taskRepository.findOneBy({ id });
    if (!task) return null;

    task.isCompleted = !task.isCompleted;

    await this.taskRepository.save(task);

    return this.getAll();
  }

  async editTask(id: number, name: string) {
    const task = await this.taskRepository.findOneBy({ id });
    if (!task) return null;

    task.name = name;

    await this.taskRepository.save(task);

    return this.getAll();
  }

  async deleteTask(id: number) {
    const task = await this.taskRepository.findOneBy({ id });
    if (!task) return null;

    task.isCompleted = !task.isCompleted;

    await this.taskRepository.delete(task);

    return this.getAll();
  }

  async createTask(name: string) {
    const task = await this.taskRepository.create({ name });

    await this.taskRepository.save(task);

    return this.getAll();
  }
}
