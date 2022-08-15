
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import styles from "../../styles/Home.module.css";
import Head from "next/head";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TodoDetail = ()=>{
    const router = useRouter();
    const query = router.query;
    const id = query.id;

    const [todoItemTitle, setTodoItemTitle] = useState("");
    const [editTarget,setEditTarget] = useState("");
    useEffect(()=>{
        if(router.isReady){
            const todoListStr = localStorage.getItem("todoList");
            if(todoListStr){
                const todoList = JSON.parse(todoListStr);
                const todoItem = todoList.find((todo)=> todo.id===id);
                setTodoItemTitle(todoItem.title);
                setEditTarget(todoItem.title);
            }
        }
    }, [query, router]);

    const editTodo = async(todoTitle)=>{
        const todoList = JSON.parse(localStorage.getItem("todoList"));
        const newTodoList = todoList.map((todoItem)=>{
            if(todoItem.id===id){
                todoItem.title = todoTitle;
            }
            return todoItem;
        });
        setTodoItemTitle(todoTitle);
        localStorage.setItem("todoList", JSON.stringify(newTodoList));
    }
    return (
        <div className={styles.container}>
            <Head>
                <title>ToDo_app</title>
                <meta name="description" content="Generated by create next app"/>
                <link />
            </Head>
            <main className={styles.main}>
                <div>
                    <h1>Edit ToDo</h1>
                    <p>target:{editTarget}</p>

                </div>
                <div className={styles.grid}>
                    <input 
                        className="py-2 px-4 shadow appearance-none border rounded text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        value={todoItemTitle}
                        autoFocus={true}
                        type="text"
                        placeholder=""
                        onChange={(event)=>{setTodoItemTitle(event.target.value)}}
                    />
                    <Link href="/">
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            onClick={()=>{
                                editTodo(todoItemTitle)
                            }}
                        >
                            Edit and Back Home
                        </button>
                    </Link>
                </div>
            </main>
        </div>
    );
}
export default TodoDetail;