import { ChangeEvent, useEffect, useState, VFC } from 'react';
import styled from 'styled-components';
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  makeStyles,
  TextField,
} from '@material-ui/core';
import { useMutation, useQuery } from '@apollo/client';
import { CREATE_TASK, GET_TASKS } from '../../queries/queries';
import {
  CreateTaskMutation,
  GetTasksQuery,
} from '../../types/generated/graphql'; // __typename から推測する

type Task = { id: string; title: string; complete: boolean };

const useStyles = makeStyles({
  item: {
    color: 'gray',
    fontFamily: 'serif',
    margin: '0 auto',
    padding: '10px',
  },
});

export const Home: VFC = () => {
  const { data, error } = useQuery<GetTasksQuery>(GET_TASKS, {
    fetchPolicy: 'cache-and-network',
  });
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [isFiltered, setIsFiltered] = useState(false);
  const [input, setInput] = useState('');
  const classes = useStyles();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    if (data !== undefined) {
      const tasks: Task[] = data.tasks.map((item) => ({
        id: item.id,
        title: item.title,
        complete: item.complete,
      }));
      setTasks(tasks);
      setFilteredTasks(tasks);
      setLoading(false);
    }
  }, [data]);

  const [insert_tasks_one] = useMutation<CreateTaskMutation>(CREATE_TASK, {
    // @ts-ignore
    update(cache, { data: { insert_tasks_one } }) {
      // TODO: Cache周りの整理
      const cacheId: string = cache.identify(insert_tasks_one) ?? '';
      cache.modify({
        fields: {
          tasks(existingTasks, { toReference }) {
            return [toReference(cacheId), ...existingTasks];
          },
        },
      });
    },
  });

  const addTask = async () => {
    await insert_tasks_one({
      variables: {
        title: input,
      },
    });
    setInput('');
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

      {loading ? (
        <div>is Loading ....</div>
      ) : (
        <>
          {isFiltered ? (
            <SButton2
              style={{ margin: '10px' }}
              onClick={() => setIsFiltered(!isFiltered)}
            >
              完了も表示
            </SButton2>
          ) : (
            <SButton2 style={{ margin: '10px' }} onClick={onlyUnCompleteTasks}>
              未完了のみ表示
            </SButton2>
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
        </>
      )}
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

const SButton2 = styled.button`
  background-color: gray;
  color: aliceblue;
  border: none; // 枠線なくす
  padding: 8px; // 中に余白をつける
  margin: 0 0 0 10px;
  border-radius: 8px; // 角を丸く
  cursor: pointer;
  font-weight: bolder;
`;
