import { FormControl, TextField } from '@material-ui/core';
import { ChangeEvent, useState, VFC } from 'react';
import { AddButton } from '../atoms/AddButton';

type Props = {
  addTask: (title: string) => Promise<void>;
};

export const TaskRegisterForm: VFC<Props> = ({ addTask }) => {
  const [input, setInput] = useState('');

  const registerTask = async () => {
    await addTask(input);
    setInput('');
  };

  return (
    <div>
      <FormControl>
        <TextField
          value={input}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            setInput(event.target.value)
          }
        />
      </FormControl>
      <AddButton handler={registerTask} disabled={input === ''}>
        タスク追加
      </AddButton>
    </div>
  );
};
