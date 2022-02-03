import { memo, VFC } from 'react';
import {Checkbox, FormControlLabel, makeStyles} from '@material-ui/core';
import { Task } from '../../types/task';

type Props = {
  task: Task;
  changeComplete: (task: Task) => Promise<void>;
};

export const TaskRow: VFC<Props> = memo(({ task, changeComplete }) => {
    const classes = useStyles();

    return (
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
  );
});

const useStyles = makeStyles({
    item: {
        color: 'gray',
        fontFamily: 'serif',
        margin: '0 auto',
        padding: '10px',
    },
});
