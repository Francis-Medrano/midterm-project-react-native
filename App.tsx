import { StatusBar } from 'expo-status-bar';
import AppNavigation from './src/navigation/AppNavigation';
import { SavedJobsProvider } from './src/shared/context/SavedJobsContext';
import { ThemeProvider } from './src/shared/context/ThemeContext';

export default function App() {
  return (
    <ThemeProvider>
      <SavedJobsProvider>
        <AppNavigation />
        <StatusBar style="auto" />
      </SavedJobsProvider>
    </ThemeProvider>
  );
}
