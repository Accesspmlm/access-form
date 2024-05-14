import React, { ReactNode } from "react";
import { Flex } from "..";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Flex h="100vh" w="100vw" direction="column">
      <Flex h="calc(100vh - 80px)">
        <Flex h="100%" pd="20px">
          {children}
        </Flex>
      </Flex>
    </Flex>
  );
};
export default Layout;
