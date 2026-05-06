import React, { useState } from 'react'

const Counter = () => {

  var [count, setCount] = useState(0)
  var [name, setName] = useState("Santhosh")
  var [valid, setValid] = useState(false)
  var [toggle, setToggle] = useState(false)

  return (
    <div>
      {/* {Number}  */}
      <div className='flex flex-col gap-5 justify-center items-center p-5'>
        <h1 className='font-bold text-2xl'>Counter</h1>
        <div>
          <p className='font-semibold text-xl'>{count}</p>
        </div>
        <div className='flex gap-5'>
          <button onClick={() => { setCount(count - 1) }} className='bg-red-500 px-5 py-2 rounded-lg text-white font-bold'>-</button>
          <button onClick={() => setCount(count + 1)} className='bg-green-500 px-5 py-2 rounded-lg text-white font-bold'>+</button>
        </div>
      </div>

      {/* {String}  */}
      <div className='p-5 flex flex-col items-center gap-5'>
        <h1 className='font-bold text-2xl'>{name}</h1>
        <div>
          <button onClick={() => {
            setName("Welcome Santhosh")
          }} className='bg-green-500 text-white text-xl px-5 py-2 rounded-lg'>Welcome</button>
        </div>
      </div>

      {/* {Bollen}  */}
      <div className='flex flex-col items-center gap-5 p-5'>
        <h1 className='font-bold text-2xl'>{valid?"True":"False"}</h1>
        <div>
          <button onClick={() => {
            setValid(!valid)
          }} className=' bg-green-500 text-white text-xl px-5 py-2 rounded-lg '>{valid ? "False" : "True" }</button>
        </div>
      </div>

      {/* {ON/OFF}  */}
      <div className='flex flex-col items-center gap-5 p-5'>
        <h1 className='font-bold text-2xl'> {toggle ? "Lighting": "Dark"} </h1>
        <div>
          <button onClick={() => {
            setToggle(!toggle)
          }} className={` ${toggle ? "bg-red-500" : "bg-green-500"} text-white text-xl px-5 py-2 rounded-lg `}>{toggle ? "OFF" : "ON"}</button>
        </div>
      </div>
    </div>
  )
}

export default Counter