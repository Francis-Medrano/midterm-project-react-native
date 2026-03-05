import React from 'react';
import { View, TextInput, StyleSheet, Pressable } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { lightTheme, darkTheme } from '../../theme/colors';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  onClear?: () => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChangeText,
  placeholder = 'Search jobs...',
  onClear,
}) => {
  const { themeMode } = useTheme();
  const themeColors = themeMode === 'light' ? lightTheme : darkTheme;
  
  const handleClear = () => {
    onChangeText('');
    onClear?.();
  };

  return (
    <View style={[styles.container, { backgroundColor: themeColors.card }]}>
      <TextInput
        style={[styles.input, { color: themeColors.text }]}
        placeholder={placeholder}
        placeholderTextColor={themeColors.placeholder}
        value={value}
        onChangeText={onChangeText}
        clearButtonMode="never"
      />
      {value.length > 0 && (
        <Pressable onPress={handleClear} style={styles.clearButton}>
          <View style={styles.clearIcon}>
            <View style={[styles.line, { backgroundColor: themeColors.placeholder }]} />
            <View style={[styles.line, styles.lineRotated, { backgroundColor: themeColors.placeholder }]} />
          </View>
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    marginHorizontal: 16,
    marginTop: 12,
    marginBottom: 12,
    paddingHorizontal: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 14,
  },
  clearButton: {
    padding: 8,
  },
  clearIcon: {
    width: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  line: {
    position: 'absolute',
    width: 14,
    height: 2,
  },
  lineRotated: {
    transform: [{ rotate: '90deg' }],
  },
});
