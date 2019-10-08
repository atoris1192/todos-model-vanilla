import { element } from './html-util'

export class TodoItemView {
  createElement(todoItem, { onUpdateTodo, onDeleteTodo }) {
    const todoItemElement = todoItem.completed
      ? element`<li><input type="checkbox" checked class="checkbox" /><del> ${ todoItem.title }</del><button class="delete">x</button></li>`
      : element`<li><input type="checkbox" class="checkbox" /> ${ todoItem.title }<button class="delete">x</button></li>`

      const inputCheckboxElement = todoItemElement.querySelector('.checkbox');
      inputCheckboxElement.addEventListener('change', () => {
        onUpdateTodo({
          id: todoItem.id,
          completed: !todoItem.completed, 
        })
      })
      const deleteButtonElement = todoItemElement.querySelector('.delete');
      deleteButtonElement.addEventListener('click', () => {
        onDeleteTodo({
          id: todoItem.id,
        })
      })

      return todoItemElement;
  }
}