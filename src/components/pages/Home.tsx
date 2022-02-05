import { ChangeEvent, useEffect, useState, VFC } from 'react';
import styled from 'styled-components';
import { FormControl, TextField } from '@material-ui/core';
import { useMutation, useQuery } from '@apollo/client';
import {
  CREATE_TASK,
  DELETE_TASK,
  GET_TASKS,
  UPDATE_TASK_COMPLETE,
} from '../../queries/queries';
import {
  CreateTaskMutation,
  DeleteTaskMutation,
  GetTasksQuery,
  UpdateTaskCompleteMutation,
} from '../../types/generated/graphql';
import { TaskTable } from '../organisims/TaskTable';
import { Task } from '../../types/task';
import { TaskRow } from '../molecules/TaskRow';
import { Layout } from '../templates/Layout';

export const Home: VFC = () => {
  const { data, error } = useQuery<GetTasksQuery>(GET_TASKS, {
    fetchPolicy: 'cache-and-network',
  });

  const [tasks, setTasks] = useState<Task[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [isFiltered, setIsFiltered] = useState(false);
  const [input, setInput] = useState('');

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    if (data !== undefined) {
      const tasks: Task[] = data.tasks.map((item) => ({
        id: item.id,
        title: item.title,
        complete: item.complete,
        createdAt: item.created_at
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
    setLoading(true);
    await insert_tasks_one({
      variables: {
        title: input,
      },
    });
    setInput('');
    setLoading(false);
  };

  const [update_task_complete_by_pk] =
    useMutation<UpdateTaskCompleteMutation>(UPDATE_TASK_COMPLETE);
  const changeComplete = async (target: Task) => {
    setLoading(true);
    await update_task_complete_by_pk({
      variables: {
        id: target.id,
        complete: !target.complete,
      },
    });
    setLoading(false);
  };

  const [delete_tasks_by_pk] = useMutation<DeleteTaskMutation>(DELETE_TASK, {
    // @ts-ignore
    update(cache, { data: { delete_tasks_by_pk } }) {
      cache.modify({
        fields: {
          tasks(existingTasks, { readField }) {
            return existingTasks.filter(
              // @ts-ignore
              (task) => delete_tasks_by_pk.id !== readField('id', task)
            );
          },
        },
      });
    },
  });
  const deleteTask = async (target: Task) => {
    setLoading(true);
    await delete_tasks_by_pk({
      variables: {
        id: target.id,
      },
    });
    setLoading(false);
  };

  const onlyUnCompleteTasks = () => {
    setIsFiltered(!isFiltered);
    setFilteredTasks(tasks.filter((item) => !item.complete));
  };

  if (error) return <div>Error</div>;
  return (
    <Layout title={'タスク管理'}>
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

      <div style={loading ? { opacity: '0.3', pointerEvents: 'none' } : {}}>
        {isFiltered ? (
          <SButton2
            style={{
              margin: '10px',
              display: 'flex',
              justifyContent: 'flex-end',
            }}
            onClick={() => setIsFiltered(!isFiltered)}
          >
            完了も表示
          </SButton2>
        ) : (
          <SButton2
            style={{
              margin: '10px',
              display: 'flex',
              justifyContent: 'flex-end',
            }}
            onClick={onlyUnCompleteTasks}
          >
            未完了のみ表示
          </SButton2>
        )}
        <TaskTable>
          {isFiltered
            ? filteredTasks.map((item, idx) => {
                return (
                  <TaskRow
                    key={idx}
                    task={item}
                    changeComplete={changeComplete}
                    deleteTask={deleteTask}
                  />
                );
              })
            : tasks.map((item, idx) => {
                return (
                  <TaskRow
                    key={idx}
                    task={item}
                    changeComplete={changeComplete}
                    deleteTask={deleteTask}
                  />
                );
              })}
        </TaskTable>
      </div>
    </Layout>
  );
};

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
