import React from 'react';
import AuthCheck from 'src/common/ui/layouts/AuthCheck';
import LeftMenu from 'src/common/ui/layouts/LeftMenu';

const AdminPanel = (): JSX.Element => {
  return (
    <AuthCheck>
      <>
        <LeftMenu />
      </>
    </AuthCheck>
  );
};

export default AdminPanel;
