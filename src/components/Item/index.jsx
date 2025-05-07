import { Button, Checkbox } from 'antd';
import { DeleteOutlined, EditOutlined} from '@ant-design/icons'

export const Item = (props) => {

  //当点击“已完成checkBox”时
  const handleChangeCheckBox = (id, done) => {
    props.changeTodoCkeckBox(id, done)
  }

  //当点击“编辑”时
  const handleEdit = (id, done) => {
    props.editTodo(id)
  }

  //当点击“删除”按钮时
  const handleDelete = (id) => {
    props.deleteTodo(id)
  }

  return (
    <div>
      <li className="liStyle">
        <div className="li-main">
          <div>{props.todo.name}</div>
          <div className="func-style"> 
            <Checkbox 
            checked={props.todo.done}
            onChange={()=>handleChangeCheckBox(props.todo.id, props.todo.done)}
            >
            </Checkbox>
            <Button 
              type="primary" 
              icon={<EditOutlined />}
              onClick={()=>handleEdit(props.todo.id)}
              >
              编辑
            </Button>
            <Button 
              type="primary" 
              variant="solid"
              color="danger"
              icon={<DeleteOutlined />}
              onClick={()=>handleDelete(props.todo.id)}
              >
              删除
            </Button>
          </div> 
        </div>
      </li>
    </div>
  )
}
export default Item