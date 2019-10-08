import { element, render } from './view/html-util';
// import { EventEmitter } from './EventEmitter';
import { TodoItemModel } from './model/TodoItemModel'
import { TodoListModel } from './model/TodoListModel';
import { TodoItemView } from './view/TodoItemView';
import { TodoListView } from './view/TodolistView';

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
    const btn = document.querySelector('#btn');

    btn.addEventListener('click', () => {
      console.log("btn click");
      
      const todos = JSON.parse(localStorage.getItem('todos')) || []
      this.todoListModel.setTodoItems(todos)
      this.todoListModel.emitChange()
    })

    this.todoListModel.addEventListener("change", () => {
      const todoItems = this.todoListModel.getTodoItems();
      const todoListView = new TodoListView();
      const todoListElement = todoListView.createElement(todoItems, {
        onUpdateTodo: ({ id, completed }) => {
          this.todoListModel.updateTodo({ id, completed });
        },
        onDeleteTodo: ({ id }) => {
          this.todoListModel.deleteTodo({ id })
        }
      })

      render(todoListElement, containerElement);

      todoItemCountElement.textContent = `TodoItems: ${this.todoListModel.getTotalCounter()}`
    })


    formElement.addEventListener('submit', event => {
      event.preventDefault();

      this.todoListModel.addTodo(new TodoItemModel({
        title: inputElement.value,
        completed: false,
      }));
      inputElement.value = '';
    })


    this.todoListModel.emitChange() // initial
  

    window.addEventListener('unload', () => {
      console.log("UNLOAD");
      
      localStorage.setItem("todos", JSON.stringify(this.todoListModel.getTodoItems()))
    })
  }
}