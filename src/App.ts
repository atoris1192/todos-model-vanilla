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
  constructor() {
  }
  main() {
    const todoList = document.querySelector('#js-todo-list');
    const todoCount = document.querySelector('#js-todo-count');

    const todoListModel = new TodoListModel()
    todoListModel.setTodoItems(sample)
    const items = todoListModel.getTodoItems();
    const totalCount = todoListModel.getTotalCount();

    items.forEach( item => {
      const listElement = element`<li>${ item.title }</li>`
      todoList.appendChild(listElement)

    });

    
    todoCount.textContent = `Todo Count: ${ totalCount }`

  }
}