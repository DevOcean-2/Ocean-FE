import { StyleSheet, ScrollView } from 'react-native';

export const styles = StyleSheet.create({
  itemContainer: {
    marginBottom: 40,
  },
  flexGroup: {
    display: 'flex',
    flexDirection: 'column',
  },
  stepContainer: {
    flex: 1,
    marginTop: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 600,
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },

  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  inputField: {
    marginBottom: 20,
  },

  button: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  selectedButton: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  buttonText: {
    fontSize: 16,
  },
  selectedButtonText: {
    color: 'white',
  },
});
