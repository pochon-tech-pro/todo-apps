import { memo, ReactNode, VFC } from 'react';
import styled from 'styled-components';

type Props = {
  children: ReactNode;
  disabled?: boolean;
  handler: () => void;
};

export const AddButton: VFC<Props> = memo(({ children, disabled, handler }) => {
  return (
    <SButton onClick={handler} disabled={disabled}>
      {children}
    </SButton>
  );
});

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
