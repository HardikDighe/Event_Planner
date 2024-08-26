import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
  },
  inputContainer: {
    marginVertical: 10,
    position: "relative",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  inputError: {
    borderColor: "#f00",
  },
  floatingLabel: {
    position: "absolute",
    left: 10,
    top: -10,
    backgroundColor: "#fff",
    paddingHorizontal: 5,
    fontSize: 12,
    color: "black",
  },
  ticketsContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E8EAF6",
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  ticketsLabel: {
    flex: 1,
    fontSize: 16,
  },
  ticketsInput: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    paddingLeft: 8,
    borderRadius: 5,
    backgroundColor: "#fff",
    flex: 0.5,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  checkboxLabel: {
    marginLeft: 8,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#051650",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginVertical: 10,
    alignSelf: "center",
    width: "40%",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  errorText: {
    color: "#f00",
    fontSize: 12,
    marginTop: 5,
  },
});

export default styles;
