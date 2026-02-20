import { StatusBar } from 'expo-status-bar';
import HomeScreen from './src/screens/HomeScreen';
import { SavedJobsProvider } from './src/shared/context/SavedJobsContext';

export default function App() {
  return (
    <SavedJobsProvider>
      <HomeScreen />
      <StatusBar style="auto" />
    </SavedJobsProvider>
  );
}
