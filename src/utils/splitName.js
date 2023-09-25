function splitName(fullName) {
  if (fullName !== undefined && fullName !== null && fullName !== "") {
    let name = fullName.split("-")[0];
    let lastName = fullName.split("-")[1];

    return { name, lastName };
  } else {
    return { name: "", lastName: "" };
  }
}

export { splitName };
