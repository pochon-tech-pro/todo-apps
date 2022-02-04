import { ReactNode, VFC } from 'react';
import styled from 'styled-components';

type Props = {
  children: ReactNode;
  title: string;
};

export const Layout: VFC<Props> = ({ children, title }) => {
  return (
    <SRoot>
      <SHeader>Home</SHeader>
      <h1>{title}</h1>
      <main>{children}</main>
      <SFooter>&copy; 2022 pochon</SFooter>
    </SRoot>
  );
};

const SRoot = styled.div`
  text-align: center;
  color: gray;
  font-family: serif;
`;

const SHeader = styled.header`
  background-color: gray;
  color: #fff;
  text-align: center;
  padding: 8px 0;
`;

const SFooter = styled.footer`
  background-color: gray;
  text-align: center;
  color: #fff;
  padding: 8px 0; // Footer幅
  position: fixed; // 常に画面の下にしたい
  bottom: 0; // 常に画面の下にしたい
  width: 100%; // 幅が消えたので100%にする
`;
