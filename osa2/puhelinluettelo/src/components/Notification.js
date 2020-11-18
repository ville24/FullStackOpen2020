const Notification = ({ message }) => {
  const notificationStyle = {
    color: 'green',
    fontSize: 20,
    padding: 5,
    marginBottom: 10,
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: 'green',
    borderRadius: 5,
    backgroundColor: 'lightGray'
  }

if (message === null) {
    return null
  }

  return (
    <div style={notificationStyle}>
      {message}
    </div>
  )
}


export default Notification