import { StyleSheet } from 'react-native';

export const buttonStyles = StyleSheet.create({
  cardButtonContainer: {
    flexDirection: 'row',
    gap: 8,
    padding: 12,
    paddingTop: 8,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  cardApplyButton: {
    flex: 1,
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardSaveButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardButtonText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
  },
});
