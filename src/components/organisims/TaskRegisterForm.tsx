import { FormControl, TextField } from '@material-ui/core';
import { ChangeEvent, useState, VFC } from 'react';
import styled from 'styled-components';

type Props = {
  addTask: (title: string) => Promise<void>;
};

export const TaskRegisterForm: VFC<Props> = ({ addTask }) => {
  const [input, setInput] = useState('');

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
      <SButton
        onClick={async () => {
          await addTask(input);
          setInput('');
        }}
        disabled={input === ''}
      >
        タスク追加
      </SButton>
    </div>
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
