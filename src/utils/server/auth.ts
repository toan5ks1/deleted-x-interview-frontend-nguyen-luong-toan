import { auth } from '@clerk/nextjs/server';

import { enableClerk } from '@/const/auth';

export const getUserAuth = async () => {
  if (enableClerk) {
    const clerkAuth = auth();

    const userId = clerkAuth.userId;
    return { clerkAuth: auth, userId };
  }

  throw new Error('Auth method is not enabled');
};
