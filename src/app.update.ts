import { AppService } from './app.service';
import {
  Ctx,
  Hears,
  InjectBot,
  Message,
  On,
  Start,
  Update,
} from 'nestjs-telegraf';
import { Telegraf } from 'telegraf';
import { actionButtons } from './app.buttons';
import { Context } from './context.interface';
import { showList } from './app.utils';

@Update()
export class AppUpdate {
  constructor(
    @InjectBot() private readonly bot: Telegraf<Context>,
    private readonly appService: AppService,
  ) {}

  @Start()
  async startCommand(ctx: Context) {
    await ctx.reply('Hi! Friend👋');
    await ctx.reply('What do you want to do ?', actionButtons());
  }

  @Hears('📝 Create a task')
  async createTask(ctx: Context) {
    await ctx.reply('Enter name of a task: ');
  }

  @Hears('🗒️ Tasks List')
  async getaAll(ctx: Context) {
    const todos = await this.appService.getAll();
    await ctx.reply(showList(todos));
  }

  @Hears('✅ Complete a task')
  async completeTask(ctx: Context) {
    await ctx.reply('Write id of the task: ');
    ctx.session.type = 'done';
  }

  @Hears('✏️ Edit')
  async editTask(ctx: Context) {
    await ctx.deleteMessage();
    await ctx.replyWithHTML(
      'Write id of the task: \n\n' +
        'In the format - <i> 1 | New name of a task</i>',
    );
    ctx.session.type = 'edit';
  }

  @Hears('❌ Delete')
  async removeTask(ctx: Context) {
    await ctx.reply('Write id of the task: ');
    ctx.session.type = 'remove';
  }

  @On('text')
  async getMessage(@Message('text') message: string, @Ctx() ctx: Context) {
    if (!ctx.session.type) return;

    if (ctx.session.type === 'done') {
      const todos = await this.appService.completeTask(Number(message));

      if (!todos) {
        await ctx.deleteMessage();
        await ctx.reply('No task found by this id');
        return;
      }
      await ctx.reply(showList(todos));
    }

    if (ctx.session.type === 'edit') {
      const [taskId, taskName] = message.split(' | ');
      const todos = await this.appService.editTask(Number(taskId), taskName);

      if (!todos) {
        await ctx.reply('No task found by this id');

        return;
      }

      await ctx.reply(showList(todos));
    }

    if (ctx.session.type === 'remove') {
      const todos = await this.appService.deleteTask(Number(message));

      if (!todos) {
        await ctx.reply('No task found by this id');

        return;
      }

      await ctx.reply(showList(todos));
    }

    if (ctx.session.type === 'create') {
      const todos = await this.appService.createTask(message);

      await ctx.reply(showList(todos));
    }
  }
}
