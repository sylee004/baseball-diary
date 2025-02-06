import { StyleSheet } from 'react-native'

export
const sheetStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContent: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  section: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold' ,
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  labelNormal: {
    width: 80,
    marginRight: 8,
  },
  labelBold: {
    fontWeight: 'bold',
    width: 80,
    marginRight: 8,
  },
  labelBoldTop: {
    fontWeight: 'bold',
    width: 80,
    marginRight: 8,
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    padding: 8,
    marginBottom: 8,
  },
  inputFull: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    padding: 8,
    marginBottom: 8,
    maxWidth: '100%',
  },
  inputOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  number: {
    width: '5%',
    marginRight: 5,
    marginBottom: 8,
    fontWeight: 'bold'
  },
  nameInput: {
   width: '30%',
    marginRight: 5,
  },
  positionInput: {
    width: '15%',
    marginRight: 5,
  },
  recordInput: {
    width: '65%',
  },
  multilineInput: {
    height: 80,
    textAlignVertical: 'top',
  },
  picker: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    padding: 4,
    marginBottom: 4,
    backgroundColor: '#fff',
  },
  scoreRow: {
    flexDirection: 'row',
  },
  scoreCell: {
    width: 50,
    textAlign: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 4,
  },
  scoreInput: {
    width: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    textAlign: 'center',
  },
  scoreResult: {
    width: 50,
    textAlign: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 4,
  },
  checkbox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    padding: 8,
    marginRight: 8,
  },
  checked: {
    backgroundColor: '#e0e0e0',
  },
});