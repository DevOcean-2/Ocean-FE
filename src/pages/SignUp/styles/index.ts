import { StyleSheet, ScrollView } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    // flex: 1,
    backgroundColor: 'white',
  },
  wizardContainer: {
    paddingTop: 20,
    // paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
    elevation: 2,
  },
  scrollViewContent: {
    flexGrow: 1,
    // paddingHorizontal: 16,
    paddingBottom: 20,
  },
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
  renderStepContainer: {
    paddingHorizontal: 15,
    paddingVertical: 10,
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

  bannerContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 12,
    backgroundColor: '#D0D5DD33',
    paddingHorizontal: 12,
    gap: 15,
    paddingVertical: 20,
    marginBottom: 40,
  },

  bannerTitle: {
    fontWeight: '600',
    fontSize: 13,
    marginBottom: 5,
    color: '#04c755',
  },
  bannerSubTitle: {
    fontSize: 13,
    fontWeight: 400,
    color: '#101828',
  },
});
