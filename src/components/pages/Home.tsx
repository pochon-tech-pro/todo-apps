import { ChangeEvent, MouseEvent, useState, VFC } from 'react';

type Task = { id: string; title: string };

const dummy: Task[] = [
  { id: 'AAAA', title: 'Task1' },
  { id: 'BBBB', title: 'Task2' },
  { id: 'CCCC', title: 'Task3' },
];

export const Home: VFC = () => {
  const [tasks, setTasks] = useState<Task[]>(dummy);
  const [input, setInput] = useState('');

  const addTask = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setTasks([...tasks, {
      id: Math.random().toString(32).substring(2),
      title: input,
    }]);
  };

  return (
    <>
      <h1>Home</h1>
      <form>
        <input
          value={input}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            setInput(event.target.value)
          }
        />
        <button onClick={addTask}>タスク追加</button>
      </form>
      {tasks.map((item) => {
        return <div key={item.id}> {item.title}</div>;
      })}
    </>
  );
};
