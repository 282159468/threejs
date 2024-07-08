import { FC, memo } from 'react';
import { Outlet } from 'react-router';
export interface RootProps {}
const Root: FC<RootProps> = (props) => {
  return (
    <div>
        a
      <Outlet />b
    </div>
  );
};
export default memo(Root);
