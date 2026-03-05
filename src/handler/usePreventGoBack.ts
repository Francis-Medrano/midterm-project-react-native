import { useEffect } from 'react';
import { BackHandler } from 'react-native';

/**
 * Custom hook to prevent the Android back button from navigating back
 * Call this hook in any screen where you want to disable back navigation
 */
export const usePreventGoBack = (): void => {
  useEffect(() => {
    const backAction = () => {
      // Return true to prevent default back button behavior
      return true;
    };

    // Add listener for back button press
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    // Cleanup: Remove the listener when component unmounts
    return () => backHandler.remove();
  }, []);
};
