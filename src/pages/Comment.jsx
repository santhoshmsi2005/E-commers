import { useState } from "react"
import React from "react"

const TodoReal = () => {

    const [input, setInput] = useState("")
    const [task, setTask] = useState([])

    const addTask = () => {
        if (input.trim() === "") return

        setTask(prev => [
            ...prev,
            { text: input, completed: false }
        ])

        setInput("")
    }

    const deleteAll = () => {
        setTask([])
    }

    const deleteOne = (index) => {
        setTask(prev => prev.filter((_, i) => i !== index))
    }

    const toggleComplete = (index) => {
        setTask(prev =>
            prev.map((item, i) =>
                i === index
                    ? { ...item, completed: !item.completed }
                    : item
            )
        )
    }

    return (
        <div className='flex flex-col gap-5 w-[50%] mx-auto h-screen justify-center'>
            <div className='flex flex-col gap-5 items-center shadow-lg rounded-lg px-4 py-5'>

                <h1 className='font-bold text-2xl'>Todo Real</h1>

                <div className='flex gap-2 items-center'>
                    <input
                        type="text"
                        value={input}
                        className='border rounded-lg pl-2 py-2'
                        onChange={(e) => setInput(e.target.value)}
                    />
                </div>

                <button onClick={addTask} className='bg-green-500 text-white px-5 py-2 rounded-lg'>
                    Add Task
                </button>

                <button onClick={deleteAll} className='bg-red-500 text-white px-5 py-2 rounded-lg'>
                    Delete All
                </button>

                <p>Total tasks: {task.length}</p>

                {task.length === 0 ? (
                    <p>No tasks available</p>
                ) : (
                    task.map((item, index) => (
                        <div key={index} className='flex justify-between w-full border p-3 rounded'>

                            <p
                                onClick={() => toggleComplete(index)}
                                className={item.completed ? "line-through cursor-pointer" : "cursor-pointer"}
                            >
                                {item.text}
                            </p>

                            <div className='flex gap-2'>
                                <button onClick={() => deleteOne(index)}>❌</button>
                                <button onClick={() => toggleComplete(index)}>👍</button>
                            </div>

                        </div>
                    ))
                )}

            </div>
        </div>
    )
}

export default TodoReal