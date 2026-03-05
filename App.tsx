import { StatusBar } from 'expo-status-bar';
import HomeScreen from './src/screens/HomeScreen';
import { SavedJobsProvider } from './src/shared/context/SavedJobsContext';
import { ThemeProvider } from './src/shared/context/ThemeContext';

export default function App() {
  return (
    <ThemeProvider>
      <SavedJobsProvider>
        <HomeScreen />
        <StatusBar style="auto" />
      </SavedJobsProvider>
    </ThemeProvider>
  );
}
