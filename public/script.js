const textInput = document.getElementById('textInput');
const chat = document.getElementById('chat');

let context = {};

const templateChatMessage = (message, from) => `
  <div class="from-${from}">
    <div class="message-inner">
      <p>${message}</p>
    </div>
  </div>
  `;
 
  const templateChatList = (list, from) => `
  <div class="from-${from}">
    <div class="message-inner">
      <ul>${list}</ul>
    </div>
  </div>
  `;
 
// Crate a Element and append to chat
const InsertTemplateInTheChat = (template) => {
  const div = document.createElement('div');
  div.innerHTML = template;

  chat.appendChild(div);
};



// Calling server and get the watson output
const getWatsonMessageAndInsertTemplate = async (text = '') => {
  const uri = 'http://localhost:3000/conversation/';

  const response = await (await fetch(uri, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      text,
      context,
    }),
  })).json();

  context = response.result;
  console.log(context);
 
  let template = templateChatMessage(context.output.generic[0].text, 'watson');

  InsertTemplateInTheChat(template);
  
  if(context.output.generic[1].options){
    let gen  = context.output.generic[1].options;
    console.log('opciones');
    console.log(context.output.generic[1].options);
    console.log(context.output.generic[1].options.length);
    let list = ``;
    for (let i = 0; i < context.output.generic[1].options.length; i++) {
      list +=   `<li>${context.output.generic[1].options[i].label}</li>`;
      
    }
     templateList = templateChatList(list,'watson'); 
     InsertTemplateInTheChat(templateList);
    } 
};

textInput.addEventListener('keydown', (event) => {
  if (event.keyCode === 13 && textInput.value) {
    // Send the user message
    getWatsonMessageAndInsertTemplate(textInput.value);

    const template = templateChatMessage(textInput.value, 'user');
    InsertTemplateInTheChat(template);

    // Clear input box for further messages
    textInput.value = '';
  }
});


getWatsonMessageAndInsertTemplate();