import { element, render } from './view/html-util';
import { EventEmitter } from './EventEmitter';
import { TodoItemModel } from './model/TodoItemModel'
import { TodoListModel } from './model/TodoListModel';

const sample = {
  id : 0,
  title: "task 0",
  completed: false,
}

export class App {
  private todoListModel: any;
  constructor() {
    this.todoListModel = new TodoListModel() // instance 
  }
  mount() {
    const formElement = document.querySelector('#js-form');
    const inputElement: any = document.querySelector('#js-form-input');
    const containerElement = document.querySelector('#js-todo-list');
    const todoItemCountElement = document.querySelector('#js-todo-count');

    this.todoListModel.addEventListener("change", () => {
    // this.todoListModel.onChange(() => {
      const todoListElement = element`<ul />`;
      const todoItems = this.todoListModel.getTodoItems();
      todoItems.forEach( item => {
        const todoItemElement = item.completed
            ? element`<li><input type="checkbox" checked class="checkbox" /><del> ${ item.title }</del><button class="delete">x</button></li>`
            : element`<li><input type="checkbox" class="checkbox" /> ${ item.title }<button class="delete">x</button></li>`

        const inputCheckboxElement = todoItemElement.querySelector('.checkbox');
        inputCheckboxElement.addEventListener('change', () => {
          this.todoListModel.updateTodo({
            id: item.id,
            completed: !item.completed, 
          })
        })
        const deleteButtonElement = todoItemElement.querySelector('.delete');
        deleteButtonElement.addEventListener('click', () => {
          this.todoListModel.deleteTodo({
            id: item.id,
          })
        })

        todoListElement.appendChild(todoItemElement);
      })
      render(todoListElement, containerElement);

      todoItemCountElement.textContent = `TodoItems: ${this.todoListModel.getTotalCounter()}`
    })

    function sample(todoListModel) {
      todoListModel.addTodo(new TodoItemModel({
        title: "task0",
        completed: false,
      }));
    }
    sample(this.todoListModel)


    formElement.addEventListener('submit', event => {
      event.preventDefault();

      this.todoListModel.addTodo(new TodoItemModel({
        title: inputElement.value,
        completed: false,
      }));
      inputElement.value = '';
    })
  }
}