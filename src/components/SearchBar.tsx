import React, { useState, useCallback } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Text } from 'react-native';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  placeholder = 'Search products...',
}) => {
  const [query, setQuery] = useState('');

  const handleChangeText = useCallback(
    (text: string) => {
      setQuery(text);
      onSearch(text);
    },
    [onSearch]
  );

  const handleClear = () => {
    setQuery('');
    onSearch('');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#999"
        value={query}
        onChangeText={handleChangeText}
        clearButtonMode="never"
      />
      {query ? (
        <TouchableOpacity onPress={handleClear} style={styles.clearButton}>
          <Text style={styles.clearButtonText}>✕</Text>
        </TouchableOpacity>
      ) : (
        <Text style={styles.searchIcon}>🔍</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginHorizontal: 16,
    marginVertical: 12,
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 14,
    color: '#1A1A1A',
  },
  searchIcon: {
    fontSize: 16,
    marginLeft: 8,
  },
  clearButton: {
    padding: 4,
    marginLeft: 8,
  },
  clearButtonText: {
    fontSize: 18,
    color: '#999',
  },
});
