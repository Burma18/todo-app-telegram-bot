export const showList = (todos) =>
  `Your list of tasks:\n\n ${todos
    .map((todo) => (todo.isCompleted ? '✅' : '⭕') + ' ' + todo.name + '\n\n')
    .join('')}`;
