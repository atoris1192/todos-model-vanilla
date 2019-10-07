import { EventEmitter } from '../EventEmitter';

const sample = [
  { id: 100, title: "Item100", completed: false },
  { id: 101, title: "Item101", completed: true },
  { id: 102, title: "Item102", completed: false },
]

export class TodoListModel extends EventEmitter {
  private items: any;
  constructor(items = sample) {
    super()
    this.items = items;
  }
  getTotalCounter() {
    return this.items.length;
  }
  getTodoItems() {
    return this.items;
  }
  //Change の lisner関数の登録
  // onChange(() => { ... })
  onChange(listener) {
    this.addEventListener("change", listener);
  }

  emitChange() {
    this.emit("change");
  }

  addTodo(todoItem) {
    this.items.push(todoItem);
    // this.emit("change");
    this.emitChange();
  }
  updateTodo({id, completed}) {
    const todoItem = this.items.find( todo => todo.id === id);
    if (!todoItem) return;

    todoItem.completed = completed;
    this.emitChange();
  }
  deleteTodo({ id }) {
    this.items = this.items.filter( todo => {
      return todo.id !== id;
    })
    this.emitChange();
  }
}