import { memo, ReactNode, VFC } from 'react';
import {
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';

type Props = {
  children: ReactNode;
};

const useStyles = makeStyles({
  headCell: {
    color: 'aliceblue',
    fontFamily: 'serif',
    fontSize: 'large',
  },
});

export const TaskTable: VFC<Props> = memo(({ children }) => {
  const classes = useStyles();

  return (
    <TableContainer>
      <Table>
        <TableHead style={{ backgroundColor: 'gray', color: 'aliceblue' }}>
          <TableRow>
            <TableCell className={classes.headCell}>内容</TableCell>
            <TableCell className={classes.headCell}>作成日時</TableCell>
            <TableCell className={classes.headCell}>未/済</TableCell>
            <TableCell className={classes.headCell}>削除</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{children}</TableBody>
      </Table>
    </TableContainer>
  );
});
