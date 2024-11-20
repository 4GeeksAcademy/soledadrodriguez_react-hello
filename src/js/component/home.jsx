import React, { useEffect, useState } from "react";


const urlbase = "https://playground.4geeks.com/todo"


const Home = () => {
	const [toDo, setToDo] = useState([]);
	const [inputValue, setInputValue] = useState({
		"label": "",
		"is_done": false
	});
	const [hidden, setHidden] = useState(true);


	async function getAllTask() {
		try {
			const response = await fetch(`${urlbase}/users/soledadrodriguez`)
			let data = await response.json()
			if (response.ok) {

				setToDo(data.todos)
			} else {
				//create user
				createUser()
			}

		} catch (error) {
			console.log(error);

		}
	}

	async function createUser() {
		try {
			const response = await fetch(`${urlbase}/users/soledadrodriguez`, {
				method: "POST"
			})

			if (response.ok) {
				getAllTask()
			}

		} catch (error) {
			console.log(error)
		}
	}

	// function aviso(numTareas) {
	// 	if (numTareas === 0) {
	// 		return "No hay tareas, añadir tareas"
	// 	} else {
	// 		return "Añadir nueva tarea"
	// 	}

	// }

	const inputChange = (event) => {
		setInputValue({
			...inputValue,
			[event.target.name]: event.target.value
		});
	};

	const enterKeyDown = async (event) => {
		if (event.key === 'Enter' && inputValue && inputValue.label !== "") {
			try {
				let response = await fetch(`${urlbase}/todos/soledadrodriguez`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify(inputValue)
				})
				if (response.ok) {
					getAllTask()
					setInputValue({
						"label": "",
						"is_done": false
					})
				}
			} catch (error) {
				console.error(error);

			}

		}
	};
	const deleteTodo = async (index) => {
		try {
			let response = await fetch(`${urlbase}/todos/${index}`, {
				method: "DELETE",
			})
			if (response.ok) {
				getAllTask()
			}
		} catch (error) {
			console.log(error);

		}
	};

	const deleteUser = async () => {
		try {
			let response = await fetch(`${urlbase}/users/soledadrodriguez`, {
				method: "DELETE",
			})
			if (response.ok) {
				getAllTask()
			}
		} catch (error) {
			console.error(error);
		}
	};


	useEffect(() => { getAllTask() }, [])

	return (
		<div className="text-center container mt-5" >
			<h1>TO DO LIST</h1>
			< ul className="list-group">

				<input className="list-group-item list-group-item-light"
					type="text"
					value={inputValue.label}
					onChange={inputChange}
					name="label"
					onKeyDown={enterKeyDown}
					placeholder={"Ingrese una tarea"}
				/>
				{
					toDo.map((tasks) => (
						<li
							className="list-group-item text-start ps-4"
							key={tasks.id} >
							{tasks.label}
							< button type="button" className="btn-close float-end " aria-label="Close" onClick={() => deleteTodo(tasks.id)}></button>
						</li>
					))
				}
				<li className="list-group-item list-group-item-light">
					<span className="float-start">{toDo.length} items left</span>
					<button type="button" className="btn btn-warning float-end" onClick={() => deleteUser()}>Eliminar tareas</button>
				</li>

			</ul>
		</div >
	);

};

export default Home;
