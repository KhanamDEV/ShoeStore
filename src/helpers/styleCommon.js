import {StyleSheet} from 'react-native';

const CommonStyle = StyleSheet.create({
  input: {
    borderColor: '#CCCCCC',
    borderWidth: 2,
    borderRadius: 8,
    paddingLeft: 15,
    marginTop: 10,
  },
  button: {
    backgroundColor: '#42B0FF',
    padding: 15,
    alignItems: 'center',
    marginTop: 20,
    borderRadius: 15,
  },
  textButton: {
    color: 'white',
  },
  title: {
    fontWeight: 'bold',
  },
  viewInput: {
    marginTop: 20,
  },
  validMessage: {
    fontSize: 12,
    color: 'red',
    marginTop: 5,
  },
  textCenter: {
    textAlign: 'center',
  },
});

export default CommonStyle;
