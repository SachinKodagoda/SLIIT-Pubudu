import { auth, firestore, googleAuthProvider } from '@lib/firebase';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';

type TProps = {
  children: JSX.Element;
};

export type TBasicData = null | string;

export type TUser = {
  displayName: TBasicData;
  email: TBasicData;
  photoURL: TBasicData;
  type: TBasicData;
  uid: TBasicData;
};

const initialUserData = {
  displayName: null,
  email: null,
  photoURL: null,
  type: null,
  uid: null,
};

interface IContext {
  isLogged: boolean;
  loading: boolean;
  userData: TUser;
  signOut: () => void;
  signIn: () => void;
  adminRoute: () => void;
}

const initContext: IContext = {
  isLogged: false,
  loading: true,
  userData: initialUserData,
  signOut: () => null,
  signIn: () => null,
  adminRoute: () => null,
};

export const UserContext = React.createContext<IContext>(initContext);

export const UserContextProvider = ({ children }: TProps): React.ReactElement => {
  const [userData, setUserData] = useState(initContext.userData);
  const [loading, setLoading] = useState(initContext.loading);
  const [isLogged, setIsLogged] = useState(initContext.isLogged);
  const router = useRouter();

  const signInWithGoogle = async () => {
    await auth.signInWithPopup(googleAuthProvider);
  };

  const signOut = () => {
    auth.signOut();
    setIsLogged(false);
    router.push('/login');
  };

  const signIn = () => {
    setLoading(true);
    signInWithGoogle();
  };

  const adminRoute = useCallback(async () => {
    if (isLogged) {
      if (userData.type === 'admin') {
        router.push(
          {
            pathname: '/admin/[uid]/panel',
            query: {
              order: userData.uid,
            },
          },
          `/admin/${userData.uid}/panel`
        );
      } else if (userData.type === 'editor') {
        router.push('/editor');
      } else if (userData.type === 'artist') {
        router.push('/artist');
      } else {
        router.push('/');
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLogged, userData]);

  useEffect(() => {
    let referenceSubscription: () => void;
    const authStateSubscription = auth.onAuthStateChanged(user => {
      if (!user) {
        setLoading(false);
        return;
      }
      try {
        if (user) {
          const ref = firestore.collection('users').doc(user.uid);
          referenceSubscription = ref.onSnapshot(doc => {
            if (!doc) {
              setLoading(false);
              return;
            }
            setUserData({
              displayName: doc.data()?.userName || user.displayName,
              email: user.email,
              photoURL: doc.data()?.photoURL || user.photoURL,
              type: doc.data()?.type,
              uid: user.uid,
            });
            setIsLogged(true);
            setLoading(false);
          });
        } else {
          setUserData(initialUserData);
          setLoading(false);
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log('subscription_error: =-->', error);
        setLoading(false);
      }
    });
    // turn off realtime subscription
    return () => {
      if (referenceSubscription) {
        referenceSubscription();
      }
      if (authStateSubscription) {
        authStateSubscription();
      }
    };
  }, []);

  const contextValue = {
    loading,
    isLogged,
    userData,
    signOut,
    signIn,
    adminRoute,
  };
  return <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>;
};
