import { ChangeEvent, MouseEvent, useState, VFC } from 'react';
import styled from 'styled-components';
import { FormControl, List, TextField } from '@material-ui/core';

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
    setTasks([
      ...tasks,
      {
        id: Math.random().toString(32).substring(2),
        title: input,
      },
    ]);
  };

  return (
    <SRoot>
      <h1>タスク管理</h1>
      <FormControl>
        <TextField
          value={input}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            setInput(event.target.value)
          }
        />
      </FormControl>
      <SButton onClick={addTask}>タスク追加</SButton>
      <List>
        {tasks.map((item) => {
          return <SItem key={item.id}> {item.title}</SItem>;
        })}
      </List>
    </SRoot>
  );
};

const SRoot = styled.div`
  text-align: center;
  color: gray;
  font-family: serif;
`;

const SButton = styled.button`
  background-color: gray;
  color: aliceblue;
  border: none; // 枠線なくす
  padding: 8px; // 中に余白をつける
  margin: 0 0 0 10px;
  border-radius: 8px; // 角を丸く
  &:hover {
    background-color: brown;
    color: aliceblue;
    font-weight: bolder;
    cursor: pointer;
  }
`;

const SItem = styled.div`
  text-align: center;
  color: black;
  margin: 10px;
  font-family: serif;
`;
