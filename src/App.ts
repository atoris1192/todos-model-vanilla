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
    this.todoListModel = new TodoListModel()
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
        const todoItemElement = element`<li>${ item.title }</li>`
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
      console.log("submit");
      

      this.todoListModel.addTodo(new TodoItemModel({
        title: inputElement.value,
        completed: false,
      }));
      inputElement.value = '';

    })
  }
  // elementSample() {
  //   // htmlString -> htmlElement
  //   const newElement = element`<ul>
  //     <li> --- elementSample --- </li>
  //   </ul>`;
  //   document.body.appendChild(newElement);
  //   // render(newElement, document.body);  // 一旦全要素削除が設定されている
  // }
  // eventEmitterSample() {
  //   const event = new EventEmitter();
  //   // 同じtypeでfunction は複数登録されている

  //   event.addEventListener('test-1', () => console.log("-- 1 --"))
  //   event.addEventListener('test-event', () => console.log("One"))
  //   event.addEventListener('test-event', () => console.log("Two"))

  //   // emitter のところで実行される
  //   event.emit('test-event');
  //   event.emit('test-1')
  // }
  // todoItemModelSample() {
  //   const item1 = new TodoItemModel({
  //     title: "Item 1",
  //     completed: false,
  //   })
  //   const item2 = new TodoItemModel({
  //     title: "item 2",
  //     completed: true,
  //   })
  //   console.log(item1.id !== item2.id);
  //   console.log(item1, item2);
    
  // }
  // todoListModelSample() {
  //   const todoListModel = new TodoListModel();
  //   console.log(todoListModel.getTotalCounter());


  //   todoListModel.onChange(() => {
  //     console.log("changeListenerが呼び出されました1");
  //   })
  //   todoListModel.addEventListener('change', () => {
  //     console.log("ChangeListenerが呼び出されました2");
  //   })

  //   // addTodoには、emitter が入っている
  //   todoListModel.addTodo( new TodoItemModel({
  //     title: "new item1",
  //     completed: false,
  //   }))
  //   console.log(todoListModel.getTotalCounter());
    
  // }
}