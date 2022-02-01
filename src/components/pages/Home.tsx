import { ChangeEvent, MouseEvent, useState, VFC } from 'react';
import styled from 'styled-components';
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  makeStyles,
  TextField,
} from '@material-ui/core';

type Task = { id: string; title: string; complete: boolean };

const dummy: Task[] = [
  { id: 'AAAA', title: 'Task1', complete: false },
  { id: 'BBBB', title: 'Task2', complete: true },
  { id: 'CCCC', title: 'Task3', complete: false },
];

const useStyles = makeStyles({
  item: {
    color: 'gray',
    fontFamily: 'serif',
    margin: '0 auto',
    padding: '10px',
  },
});

export const Home: VFC = () => {
  const [tasks, setTasks] = useState<Task[]>(dummy);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>(dummy);
  const [isFiltered, setIsFiltered] = useState(false);
  const [input, setInput] = useState('');
  const classes = useStyles();

  const addTask = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const id = Math.random().toString(32).substring(2);
    setTasks([
      ...tasks,
      {
        id: id,
        title: input,
        complete: false,
      },
    ]);
  };

  const onlyUnCompleteTasks = () => {
    setIsFiltered(!isFiltered);
    setFilteredTasks(tasks.filter((item) => !item.complete));
  };

  return (
    <SRoot>
      <h1>タスク管理</h1>
      <div>
        <FormControl>
          <TextField
            value={input}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              setInput(event.target.value)
            }
          />
        </FormControl>
        <SButton onClick={addTask} disabled={input === ''}>
          タスク追加
        </SButton>
      </div>
      {isFiltered ? (
        <button
          style={{ margin: '10px' }}
          onClick={() => setIsFiltered(!isFiltered)}
        >
          完了も表示
        </button>
      ) : (
        <button style={{ margin: '10px' }} onClick={onlyUnCompleteTasks}>
          未完了のみ表示
        </button>
      )}

      <FormGroup>
        {isFiltered
          ? filteredTasks.map((item, idx) => {
              return (
                <FormControlLabel
                  className={classes.item}
                  value={item.title}
                  control={
                    <Checkbox
                      checked={item.complete}
                      onChange={() => {
                        setTasks(
                          tasks.map((task, curIdx) =>
                            curIdx === idx
                              ? {
                                  id: task.id,
                                  title: task.title,
                                  complete: !task.complete,
                                }
                              : task
                          )
                        );
                      }}
                    />
                  }
                  label={item.title}
                  key={idx}
                />
              );
            })
          : tasks.map((item, idx) => {
              return (
                <FormControlLabel
                  className={classes.item}
                  value={item.title}
                  control={
                    <Checkbox
                      checked={item.complete}
                      onChange={() => {
                        setTasks(
                          tasks.map((task, curIdx) =>
                            curIdx === idx
                              ? {
                                  id: task.id,
                                  title: task.title,
                                  complete: !task.complete,
                                }
                              : task
                          )
                        );
                      }}
                    />
                  }
                  label={item.title}
                  key={idx}
                />
              );
            })}
      </FormGroup>
    </SRoot>
  );
};

const SRoot = styled.div`
  text-align: center;
  color: gray;
  font-family: serif;
`;

const SButton = styled.button`
  background-color: brown;
  color: aliceblue;
  border: none; // 枠線なくす
  padding: 8px; // 中に余白をつける
  margin: 0 0 0 10px;
  border-radius: 8px; // 角を丸く
  cursor: pointer;
  font-weight: bolder;

  &:disabled {
    background-color: gray;
    color: aliceblue;
    cursor: default;
  }
`;
