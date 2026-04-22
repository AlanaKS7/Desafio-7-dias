import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { auth, db } from '../firebase';
import { onAuthStateChanged, User, signOut as firebaseSignOut } from 'firebase/auth';
import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';

interface UserData {
  uid: string;
  email: string;
  hasStarted: boolean;
  currentDay: number;
  completedDays: number[];
  waterHistory: Record<string, number>; // Legacy
  waterEntries?: { id: string; timestamp: number; date: string; time: string; glasses: number }[];
  notes: Record<number, string>;
  generalNotes: any[];
  exercises: Record<number, boolean>;
  remedies: Record<number, Record<string, boolean>>;
  measurements: any[];
  waterReminderInterval: number | null;
}

interface AuthContextType {
  user: User | null;
  userData: UserData | null;
  loading: boolean;
  signOut: () => Promise<void>;
  updateUserData: (data: Partial<UserData>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsubSnapshot: () => void;

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const userRef = doc(db, 'users', currentUser.uid);
        const docSnap = await getDoc(userRef);
        
        if (!docSnap.exists()) {
          const initialData: UserData = {
            uid: currentUser.uid,
            email: currentUser.email || '',
            hasStarted: false,
            currentDay: 1,
            completedDays: [],
            waterHistory: {},
            waterEntries: [],
            notes: {},
            generalNotes: [],
            exercises: {},
            remedies: {},
            measurements: [],
            waterReminderInterval: null
          };
          await setDoc(userRef, initialData);
          setUserData(initialData);
        } else {
          setUserData(docSnap.data() as UserData);
        }

        // Listen for changes
        unsubSnapshot = onSnapshot(userRef, (doc) => {
          if (doc.exists()) {
            setUserData(doc.data() as UserData);
          }
        });

        setLoading(false);
      } else {
        setUserData(null);
        setLoading(false);
        if (unsubSnapshot) unsubSnapshot();
      }
    });

    return () => {
      unsubscribe();
      if (unsubSnapshot) unsubSnapshot();
    };
  }, []);

  const signOut = async () => {
    await firebaseSignOut(auth);
  };

  const updateUserData = async (data: Partial<UserData>) => {
    if (!user) return;
    const userRef = doc(db, 'users', user.uid);
    await setDoc(userRef, data, { merge: true });
  };

  return (
    <AuthContext.Provider value={{ user, userData, loading, signOut, updateUserData }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
