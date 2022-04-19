export const getSender = (loggedUser, users) => {
  console.log(users[0]);
  // console.log(users[1],'hlw2')
  return users[0]._id === loggedUser._id
    ? users[0].firstName
    : users[0].firstName;
};

export const isSameSender = (messages, m, i, userId) => {

  return (
    i < messages.length - 1 &&
    (messages[i + 1].sender !== m.sender ||
      messages[i + 1].sender === undefined) &&
    messages[i].sender !== userId
  );
};
export const isSameSenderAuthor = (messages, m, i, userId) => {

  return (
    i < messages.length - 1 &&
    (messages[i + 1].sender2._id !== m.sender2._id ||
      messages[i + 1].sender2._id === undefined) &&
    messages[i].sender._id !== userId
  );
};

export const isLastMessage = (messages, i, userId) => {
  return (
    i === messages.length - 1 &&
    messages[messages.length - 1].sender !== userId &&
    messages[messages.length - 1].sender
  );
};

export const isSameSenderMargin = (messages, m, i, userId) => {
  if (
    i < messages.length - 1 &&
    messages[i + 1].sender === m.sender &&
    messages[i].sender !== userId
  )
    return 33;
  else if (
    (i < messages.length - 1 &&
      messages[i + 1].sender !== m.sender &&
      messages[i].sender !== userId) ||
    (i === messages.length - 1 && messages[i].sender !== userId)
  )
    return 0;
  else return "auto";
};

export const isSameUser = (messages, m, i) => {
  return i > 0 && messages[i - 1].sender === m.sender;
};
