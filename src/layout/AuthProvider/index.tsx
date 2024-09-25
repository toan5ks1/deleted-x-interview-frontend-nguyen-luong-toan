import { PropsWithChildren } from 'react';

// import { authEnv } from '@/config/auth';

// import Clerk from './Clerk';

const AuthProvider = ({ children }: PropsWithChildren) => {
  // if (authEnv.NEXT_PUBLIC_ENABLE_CLERK_AUTH) return <Clerk>{children}</Clerk>;

  return children;
};

export default AuthProvider;
