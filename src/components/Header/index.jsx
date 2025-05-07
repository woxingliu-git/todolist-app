import { useState, useEffect } from 'react';
import {nanoid} from 'nanoid'
import { Button, Input } from 'antd';
import { PlusOutlined} from '@ant-design/icons'

export const Header = (props) => {
  const [inputValue, setInputValue] = useState('');

  // 监听父组件传递的编辑对象，同步到输入框
  useEffect(() => {
    if (props.todoObj) {
      // 回显编辑内容
      setInputValue(props.todoObj.name); 
    } else {
      setInputValue(''); // 清空输入（非编辑模式）
    }
  }, [props.todoObj]);

  //当按下“回车”键时的事件
  const handleEnter = (e) =>{
    //如果是空，那么什么都不做
    const value = e.target.value.trim();
    if (!value) return;

    //判断是更新还是首次追加
    if (props.todoObj && props.todoObj.id) {
      // 更新模式
      const updatedTodo = { 
        ...props.todoObj, 
        name: e.target.value 
      };
      props.updateTodo(updatedTodo);
    } else {
      // 添加模式
      const todoObj = { id: nanoid(), name: value, done: false };
      props.addTodo(todoObj);
    }
    setInputValue('')
  }

  //当点击“添加”按钮时的事件
  const handleClick = (inputValue) => {
    //如果是空，那么什么都不做
    const value = inputValue.trim();
    if (!value) return;

    if (props.todoObj && props.todoObj.id) {
      // 更新模式
      const updatedTodo = { 
        ...props.todoObj, 
        name: inputValue 
      };
      props.updateTodo(updatedTodo);
    } else {
      // 添加模式
      const todoObj = { id: nanoid(), name: value, done: false };
      props.addTodo(todoObj);
    }
    //清空输入内容
    setInputValue('')
  }

  //当点击“All”按钮时
  const handleAll = () => {
    props.clickAll()
  }

  //当点击“Active”按钮时
  const handleActive = () => {
    props.clickActive()
  }

  //当点击“Complete”按钮时
  const handleComplete = () => {
    props.clickComplete()
  }
  return (
    <div className="header">
      <div className="header-filter-button">
        <div className="button-style">
          <Button color="default" variant="link" onClick={()=>handleAll()}>
            All
          </Button>
        </div>
        
        <div className="button-style button-special-style">
          <Button color="default" variant="link" onClick={()=>handleActive()}>
            Active
          </Button>
        </div>
        <div className="button-style">
          <Button color="default" variant="link" onClick={()=>handleComplete()}>
            Complete
          </Button>
        </div>
      </div>
      <div className="enter-in">
        <div>
          <Input
            className="inputStyle"
            value={inputValue} 
            placeholder='请输入待办事项' 
            onChange={(e) => setInputValue(e.target.value)}
            onPressEnter={handleEnter}
          />
        </div>
        <div>
          <Button 
            type="primary" 
            icon={<PlusOutlined />}
            onClick={()=>handleClick(inputValue)}
            >
              添加
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Header
