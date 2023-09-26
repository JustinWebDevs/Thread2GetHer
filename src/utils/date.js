function getDate(timeStamp) {
  const currentDate = new Date(timeStamp);
  return (
    currentDate.toLocaleDateString() + "\n" + currentDate.toLocaleTimeString()
  );
}

export { getDate };
