import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";

export default function Home() {
  const [todoList, setTodoList] = useState([]);
  const [todoTitle, setTodoTitle] = useState("");
  const [count, setCount] = useState(0);


  useEffect(()=>{
    const todoList = localStorage.getItem("todoList");
    if(todoList){
      setTodoList(JSON.parse(todoList));
    }
  }, []);

  const addTodo = (todoTitle)=>{
    const newTodo = {
      id: count,
      title: todoTitle,
    };
    setCount(count+1);
    const newTodoList = [...todoList, newTodo];
    setTodoList(newTodoList);
    localStorage.setItem("todoList", JSON.stringify(newTodoList));
    setTodoTitle("");
  };

  const deleteTodo = (todoID)=>{
    const newTodoList = todoList.filter((todoItem)=>todoItem.id !== todoID);
    localStorage.setItem("todoList",JSON.stringify(newTodoList));
    setTodoList(newTodoList);
  };
  


  return (
    <div className={styles.container}>
      <Head>
        <title>ToDo_app</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className="text-7xl font-bold p-3">ToDo List</h1>
        <div className={styles.grid}>
          <input 
            className="py-2 px-4 shadow appearance-none border rounded text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={todoTitle}
            autoFocus={true}
            type="text"
            placeholder="Todo List"
            onChange={(event)=>{setTodoTitle(event.target.value)}}
          />
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={()=>{
              addTodo(todoTitle)
            }}
          >
          Add
          </button>
        </div>
        <table className="table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2">#</th>
                <th className="px-4 py-2">Title</th>
                <th className="px-4 py-2">Edit</th>
                <th className="px-4 py-2">Delete</th>
              </tr>
            </thead>
            <tbody>
              {todoList.map((todoItem, index)=>(
                <tr key={index}>
                  <td className="border px-4 py-2">{index}</td>
                  <td className="border px-4 py-2">{todoItem.title}</td>
                  <td className="border px-4 py-2">
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Edit
                    </button>
                  </td>
                  <td className="border px-4 py-2">
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                      onClick={()=>{
                        deleteTodo(todoItem.id);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
      </main>
      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}
