import Link from "next/link";
import React, { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="layout">
      <header>
        <Link href="/">
          <h1>
            <span>Just Add</span>
            <span>Readventures</span>
          </h1>
          <h2>no boredom can destroy!</h2>
        </Link>
      </header>

      <div className="page-content">{children}</div>

      <footer>
        <p>Copyright 2023 Just Add Readventures :)</p>
      </footer>
    </div>
  );
};
export default Layout;
