import { EventEmitter } from '../EventEmitter';

export class TodoListModel extends EventEmitter {
  private items: {
    id: number,
    title: string,
    completd: boolean,
  }[]
  constructor(items = []) {
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
}