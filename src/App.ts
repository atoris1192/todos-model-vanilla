import { element, render } from './view/html-util';
import { EventEmitter } from './EventEmitter';
import { TodoItemModel } from './model/TodoItemModel'
import { TodoListModel } from './model/TodoListModel';


export class App {
  constructor() {
    console.log("App initialized");
  }
  mount() {
    const formElement = document.querySelector('#js-form');
    const inputElement: any = document.querySelector('#js-form-input');
    const containerElement = document.querySelector('#js-todo-list');
    const todoItemCountElement = document.querySelector('#js-todo-count');
    let todoItemCount = 0;

    formElement.addEventListener('submit', event => {
      event.preventDefault();
      // console.log(`Input: ${ inputElement.value }`);
      const todoItemElment = element`<li>${ inputElement.value }</li>`
      containerElement.appendChild(todoItemElment);

      todoItemCount +=1;
      todoItemCountElement.textContent = `TodoItem 数: ${ todoItemCount }`

    })
  }
  elementSample() {
    // htmlString -> htmlElement
    const newElement = element`<ul>
      <li> --- elementSample --- </li>
    </ul>`;
    document.body.appendChild(newElement);
    // render(newElement, document.body);  // 一旦全要素削除が設定されている
  }
  eventEmitterSample() {
    const event = new EventEmitter();
    // 同じtypeでfunction は複数登録されている

    event.addEventListener('test-1', () => console.log("-- 1 --"))
    event.addEventListener('test-event', () => console.log("One"))
    event.addEventListener('test-event', () => console.log("Two"))

    // emitter のところで実行される
    event.emit('test-event');
    event.emit('test-1')
  }
  todoItemModelSample() {
    const item1 = new TodoItemModel({
      title: "Item 1",
      completed: false,
    })
    const item2 = new TodoItemModel({
      title: "item 2",
      completed: true,
    })
    console.log(item1.id !== item2.id);
    console.log(item1, item2);
    
  }
  todoListModelSample() {
    const todoListModel = new TodoListModel();
    console.log(todoListModel.getTotalCounter());


    todoListModel.onChange(() => {
      console.log("changeListenerが呼び出されました1");
    })
    todoListModel.addEventListener('change', () => {
      console.log("ChangeListenerが呼び出されました2");
    })

    // addTodoには、emitter が入っている
    todoListModel.addTodo( new TodoItemModel({
      title: "new item1",
      completed: false,
    }))
    console.log(todoListModel.getTotalCounter());
    
  }
}