const express = require('express');
const bodyParser = require('body-parser');
const AssistantV2 = require('ibm-watson/assistant/v2');
const { IamAuthenticator } = require('ibm-watson/auth');
 
const app = express();

app.use(bodyParser.json());
app.use(express.static('./public'));

const port = 3000;

 
const assistant = new AssistantV2({
  version: '2019-02-28',
  authenticator: new IamAuthenticator({
    apikey: 'gLTW8RaYznOcg_RVorVp1-he8TJiWfnV2372X1TOSR0D',
  }),
  url: 'https://gateway.watsonplatform.net/assistant/api',
});


const service = new AssistantV2({
  version: '2019-02-28',
  authenticator: new IamAuthenticator({
    apikey: 'gLTW8RaYznOcg_RVorVp1-he8TJiWfnV2372X1TOSR0D',
  }),
  url: 'https://gateway.watsonplatform.net/assistant/api',
});



app.post('/conversation/', async (req, res) => {

  var session =  service.createSession({
    assistantId:"e41c876f-3e71-4c27-a58f-2744227d8d1f",
    });

  const { text, context = {} } = req.body;
 
    const sessionRes = await session;
  
  const params = {
    input: { text },
    workspace_id: "1e3f42ae-1c1a-4434-ad3a-f43d8b665e33",
    assistantId:"e41c876f-3e71-4c27-a58f-2744227d8d1f",
    sessionId: sessionRes.result.session_id,
    context,
  };

  console.log(params);

  assistant.message(params, (err, response) => {
    if (err) {
      console.error(err);
      res.status(500).json(err);
    } else {
      res.json(response);
    }
  });
});

app.listen(port, () => console.log(`Running on port ${port}`));