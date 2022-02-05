import { memo, VFC } from 'react';
import {Checkbox, TableCell, TableRow} from '@material-ui/core';
import { Task } from '../../types/task';
import styled from "styled-components";
import {formatDateStringYMD} from "../../utils";

type Props = {
  task: Task;
  changeComplete: (task: Task) => Promise<void>;
  deleteTask: (task: Task) => Promise<void>;
};

export const TaskRow: VFC<Props> = memo(
  ({ task, changeComplete, deleteTask }) => {
    return (
      <TableRow>
          <TableCell>
              {task.title}
          </TableCell>
          <TableCell>
              {formatDateStringYMD(task.createdAt)}
          </TableCell>
          <TableCell>
              <Checkbox checked={task.complete} onChange={() => changeComplete(task)} />
          </TableCell>
          <TableCell>
              <SButton2 onClick={() => deleteTask(task)}>削除</SButton2>
          </TableCell>
      </TableRow>
    );
  }
);

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
