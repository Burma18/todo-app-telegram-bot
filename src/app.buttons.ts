import { Markup } from 'telegraf';

export function actionButtons() {
  return Markup.keyboard(
    [
      Markup.button.callback('📝 Create a task', 'create'),
      Markup.button.callback('🗒️ Tasks List', 'list'),
      Markup.button.callback('✅ Complete a task', 'done'),
      Markup.button.callback('✏️ Edit', 'edit'),
      Markup.button.callback('❌ Delete', 'delete'),
    ],
    {
      columns: 2,
    },
  );
}
