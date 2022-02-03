import { memo, ReactNode, VFC } from 'react';
import { FormGroup } from '@material-ui/core';

type Props = {
  children: ReactNode;
};

export const TaskTable: VFC<Props> = memo(({ children }) => {
  return <FormGroup>{children}</FormGroup>;
});
