import { useEffect, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';

export function useWaterReminder() {
  const { userData } = useAuth();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Clear existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    const intervalMinutes = userData?.waterReminderInterval;

    if (intervalMinutes && intervalMinutes > 0) {
      // Check notification permission
      if ('Notification' in window && Notification.permission === 'granted') {
        const ms = intervalMinutes * 60 * 1000;
        intervalRef.current = setInterval(() => {
          new Notification('Hora de beber água! 💧', {
            body: 'Mantenha-se hidratado. Beba um copo de água agora!',
            icon: '/favicon.ico' // Assuming there's a favicon, or it will just use default
          });
        }, ms);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [userData?.waterReminderInterval]);
}
