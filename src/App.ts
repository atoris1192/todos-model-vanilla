import { element } from './view/html-util';
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
class TodoListModel {
  private items: any;
  constructor(items = []) {
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
    const jsFormInput = document.querySelector('#js-form-input');

    this.todoListModel.setTodoItems(sample)
    const items = this.todoListModel.getTodoItems();
    const totalCount = this.todoListModel.getTotalCount();

    items.forEach( item => {
      const listElement = element`<li>${ item.title }</li>`
      todoList.appendChild(listElement)

    });

    jsForm.addEventListener('submit', (event) => {
      event.preventDefault();
      console.log("submit....");

      this.todoLihh
      

    })

    
    todoCount.textContent = `Todo Count: ${ totalCount }`

  }
}