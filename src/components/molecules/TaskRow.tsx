import { memo, VFC } from 'react';
import { Checkbox, FormControlLabel, makeStyles } from '@material-ui/core';
import { Task } from '../../types/task';
import styled from "styled-components";

type Props = {
  task: Task;
  changeComplete: (task: Task) => Promise<void>;
  deleteTask: (task: Task) => Promise<void>;
};

export const TaskRow: VFC<Props> = memo(
  ({ task, changeComplete, deleteTask }) => {
    const classes = useStyles();

    return (
      <>
        <FormControlLabel
          className={classes.item}
          value={task.title}
          control={
            <Checkbox
              checked={task.complete}
              onChange={() => changeComplete(task)}
            />
          }
          label={task.title}
        />
        <SButton2 onClick={() => deleteTask(task)}>削除</SButton2>
      </>
    );
  }
);

const useStyles = makeStyles({
  item: {
    color: 'gray',
    fontFamily: 'serif',
    margin: '0 auto',
    padding: '10px',
  },
});

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
