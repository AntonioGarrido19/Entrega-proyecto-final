const socketClient = io();

//chat form
const nameh3 = document.getElementById("name");
const chatForm = document.getElementById("chat_form");
const inputMessage = document.getElementById("message");
const divChat = document.getElementById("chat");

let user;

//CHAT
Swal.fire({
  title: "BIENVENIDO",
  text: "Ingresa tu nombre",
  input: "text",
  inputValidator: (value) => {
    if (!value) {
      return "Necesitas ingresar tu nombre";
    }
  },
}).then((name) => {
  user = name.value;
  nameh3.innerText = `Hola ${user}`;
});

socketClient.on("messages", (messages) => {
  //console.log(products);
  const allMessages = messages
    .map((objMessages) => {
      return `
      <p>
      ${objMessages.user}: 
      ${objMessages.message}
      </p>`;
    })
    .join(" ");
 divChat.innerHTML = allMessages;
});


chatForm.onsubmit = (e) => {
  e.preventDefault();
  const messageInfo = {
    user: user,
    message: inputMessage.value,
  };
  console.log("New Message Object:", messageInfo);
  socketClient.emit("newMessage", messageInfo);
};

socketClient.on("new", (messageInfo) => {
  const chat = `
    <p>
    ${messageInfo.user}: 
    ${messageInfo.message}
    </p>`;
  divChat.innerHTML += chat;
});


