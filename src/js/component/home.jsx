import React, {useState} from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
	const [todo, setTodo] = useState([]);
	const [inputValue, setInputValue] = useState('');
	const [hidden, setHidden] = useState(true);

	let length = todo.length;

	function aviso (numTareas) {
		if (numTareas===0){
			return "No hay tareas, añadir tareas"
		}else{
			return "Añadir nueva tarea"
		}

	}
	
	const InputChange = (event) => {
		setInputValue(event.target.value);
	  };
	
	  const enterKeyDown = (event) => {
		if (event.key === 'Enter' && inputValue) {
		  setTodo([...todo, inputValue]);
		  setInputValue('');
		}
	  };

	return (
		<div className="text-center container mt-5" >
			<h1>TO DO LIST</h1>
		< ul className= "list-group">
		
		<input className="list-group-item list-group-item-light"
        type="text"
        value={inputValue}
        onChange={InputChange}
        onKeyDown={enterKeyDown}
        placeholder={aviso(length)}
      />
	  {todo.map((todos, index) => (<li className="list-group-item text-start ps-4" key={index} onMouseEnter={() => setHidden(false)}
      onMouseLeave={() => setHidden(true)} >{todos}{hidden ? null : <button type="button" className="btn-close float-end " aria-label="Close"></button>}
		</li>
        ))}
		<li className="list-group-item list-group-item-light">
		<span className="float-start">{length} items left</span>
		</li>
			
      </ul>
		</div>
	);

};

export default Home;
