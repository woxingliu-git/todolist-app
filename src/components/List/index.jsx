import Item from '../Item'

export const List = (props) => {

  return (
    <ul className="list-main">
      {
        Array.isArray(props.todoList) && props.todoList.length > 0 ? (
        props.todoList.map( todo =>{
          return (
            <Item 
              key={todo.id} 
              todo={todo}
              changeTodoCkeckBox={props.changeTodoCkeckBox}
              editTodo={props.editTodo}
              deleteTodo={props.deleteTodo}
            />
          )
        })
      ) : (
        <p>暂无数据</p>
      )
    
    }
    </ul>
  )
}

export default List;