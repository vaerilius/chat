const modifyUserInput = data => {
  console.log(data)

  const user = {
    name: data.name.toLowerCase().trim(),
    email: data.email.toLowerCase().trim()
  }

  return user
}

export default modifyUserInput
