import { element } from './view/html-util';
import { EventEmitter } from './EventEmitter'

const sample = [
  { id: 100, title: "title1", completed: false},
  { id: 101, title: "title2", completed: true},
  { id: 102, title: "title3", completed: false},
]
let id = 0;

class TodoItemModel {
  private id: number;
  private title: string;
  private completed: boolean;

  constructor({ title, completed }) {
    this.id = id +=1;
    this.title = title;
    this.completed = completed
  }
}
class TodoListModel extends EventEmitter {
  private items: any;
  constructor(items = []) {
    super();
    this.items = items;
  }
  getTodoItems() {
    return this.items;
  }
  setTodoItems(items) {
    this.items = items
  }
  getTotalCount() {
    return this.items.length;
  }
  addTodo(item){
    this.items.push(item);
    console.log(this.items);
  }
}

export class App {
  private todoListModel: any;
  constructor() {
    this.todoListModel = new TodoListModel()
  }
  main() {
    const todoList = document.querySelector('#js-todo-list');
    const todoCount = document.querySelector('#js-todo-count');
    const jsForm = document.querySelector('#js-form');
    const jsFormInput: any = document.querySelector('#js-form-input');


    this.todoListModel.addEventListener('update', () => {
      this.todoListModel.setTodoItems(sample)
      const items = this.todoListModel.getTodoItems();
      const totalCount = this.todoListModel.getTotalCount();
      const ul = document.createElement('ul');

      items.forEach( item => {
        const listElement = element`<li>${ item.title }</li>`
        ul.appendChild(listElement)
      });
      todoList.textContent = '';
      todoList.appendChild(ul);
      todoCount.textContent = `Todo Count: ${ this.todoListModel.getTotalCount() }`
    })
    this.todoListModel.emit('update');


    jsForm.addEventListener('submit', (event) => {
      event.preventDefault();
      console.log("submit....");

      this.todoListModel.addTodo( new TodoItemModel({
        title: jsFormInput.value,
        completed: false,
      }))      
      this.todoListModel.emit('update')
    })

    

  }
}