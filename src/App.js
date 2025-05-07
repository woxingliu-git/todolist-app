import { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header'
import List from './components/List'

//假数据
// const todos = [
//    		{id:'001',name:'TODO1',done:true},
//    		{id:'002',name:'TODO2',done:true},
//    		{id:'003',name:'TODO3',done:false},
//    		{id:'004',name:'TODO4',done:false}
//    	]

// localStorage.setItem('todoList', JSON.stringify(todos));

  // 获取本地存储的Todo信息
  const getTodoListInfoFromLocalStorage = () => {
    const todoListStr = localStorage.getItem('todoList');
    if (todoListStr) {
        try {
            return JSON.parse(todoListStr);
        } catch (error) {
            alert("读取信息出错");
        }
    }
    return null;
  };

export const TodoListApp = () => {
  const [todoList, setTodoList] = useState([]); 
  const [todoObj, setTodoObj] = useState({});

  //当页面初期化时，加载一次localStorage中的值
    useEffect(() => {
      const initData = () => {
        setTodoList(getTodoListInfoFromLocalStorage());
        console.log('数据获取完成');
      }
      initData();
  }, []);

  //追加方法
  const addTodo = (todoObj) => {
    const safeTodoList = Array.isArray(todoList) ? todoList : []
    //将新的对象，添加到原有的todoList中去
    const newTodos = [todoObj, ...safeTodoList]

    //更新state的状态
    setTodoList(newTodos)
    //再追加进存储对象中
    localStorage.setItem('todoList', JSON.stringify(newTodos));
  }

  //改变checkBox状态
  const changeTodoCkeckBox = (id, done) => {
    //改变指定id的todo对象的done状态
    //匹配处理数据
    const newTodos = todoList.map((todoObj) => {
      if (todoObj.id === id) {
        console.log('id...', id, 'done...', done);
          return {...todoObj,done: !done}
        }
        else {
          return todoObj
        }
      })
    //更新状态
    setTodoList(newTodos)
    //再追加进存储对象中
    localStorage.setItem('todoList', JSON.stringify(newTodos));
    }

  //编辑方法
  const editTodo = (id) => {
    //找到需要编辑的数据，将该条数据返回给Header
    const editTodoObj = todoList.find((todoObj)=>{
      if (todoObj.id === id) {
        return todoObj
      }    
    })

    setTodoObj(editTodoObj)
  }

  // 编辑执行方法
  const updateTodo = (updatedTodo) => {
    const newTodos = todoList.map(todoObj => 
      todoObj.id === updatedTodo.id ? updatedTodo : todoObj
    )
    //更新状态
    setTodoList(newTodos)
    setTodoObj(null);
    //再追加进存储对象中
    localStorage.setItem('todoList', JSON.stringify(newTodos));
  };

  //删除方法
  const deleteTodo = (id) => {
    //删除指定id的todo对象
    const newTodos = todoList.filter((todoObj)=> {
       return todoObj.id !== id
     })
    //更新状态
    setTodoList(newTodos)
    //再追加进存储对象中
    localStorage.setItem('todoList', JSON.stringify(newTodos));
   }

   //当点击“All”按钮时将所有值显示
   const clickAll = () => {
    //重新获取全部的值并渲染页面
    setTodoList(getTodoListInfoFromLocalStorage());
   }

  //当点击“Active”按钮时将所有值显示
  const clickActive = () => {
    const newTodos = getTodoListInfoFromLocalStorage().filter((todoObj)=> {
      return todoObj.done === false
    })
   //更新状态
   setTodoList(newTodos)
  }

  //当点击“Complete”按钮时将所有值显示
  const clickComplete = () => {
    const newTodos = getTodoListInfoFromLocalStorage().filter((todoObj)=> {
      return todoObj.done === true
    })
    //更新状态
    setTodoList(newTodos)
  }

  return (
    <div className="container">
      <div className="container-border">
      <Header
        addTodo={addTodo}
        todoObj={todoObj}
        updateTodo={updateTodo}
        clickAll={clickAll}
        clickActive={clickActive}
        clickComplete={clickComplete}
      />

      <List 
        todoList={todoList}
        changeTodoCkeckBox={changeTodoCkeckBox}
        editTodo={editTodo}
        deleteTodo={deleteTodo}
      />
      </div>
    </div>
  )
  
}

export default TodoListApp;

