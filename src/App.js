import './App.css';
import { useState } from 'react';
import { Button, TextField } from '@mui/material';

function App({ crmData, ZOHO }) {
  const [record, setRecord] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();

  const getRecord = async () => {
    setRecord(
      (
        await ZOHO.CRM.API.getRecord({
          Entity: crmData.Entity,
          RecordID: crmData.EntityId,
        })
      ).data[0]
    );
  };

  const updateRecord = async () => {
    const config = {
      Entity: crmData.Entity,
      APIData: {
        'id': crmData.EntityId,
        'First_Name': firstName,
        'Last_Name': lastName,
      },
      Trigger: ['workflow'],
    };
    if (window.confirm('Sei sicuro di voler modificare il record?')) {
      const response = await ZOHO.CRM.API.updateRecord(config);
      if (response.data[0].message === 'record updated') {
        alert('Record aggiornato correttamente');
      }
    }
  };

  const deleteRecord = async () => {
    if (window.confirm('Sei sicuro di voler cancellare il record?')) {
      await ZOHO.CRM.API.deleteRecord({
        Entity: crmData.Entity,
        RecordID: crmData.EntityId,
      });
      alert('Record cancellato');
    }
  };

  return (
    <div className="App">
      <p>
        <b>MODULO</b>: {crmData.Entity} - <b>ID</b>: {crmData.EntityId}
      </p>

      <TextField
        variant="outlined"
        label="Nome"
        type="text"
        sx={{ margin: '5px' }}
        onChange={(e) => {
          setFirstName(e.target.value);
        }}
      />

      <TextField
        variant="outlined"
        label="Cognome"
        type="text"
        sx={{ margin: '5px' }}
        onChange={(e) => {
          setLastName(e.target.value);
        }}
      />

      <div>
        <Button
          variant="contained"
          onClick={updateRecord}
          sx={{ margin: '5px' }}
        >
          Update Record
        </Button>
        <Button
          variant="contained"
          onClick={getRecord}
          color="secondary"
          sx={{ margin: '5px' }}
        >
          Get Record
        </Button>
        <Button
          variant="contained"
          onClick={deleteRecord}
          color="error"
          sx={{ margin: '5px' }}
        >
          Delete Record
        </Button>
      </div>

      {record ? (
        <div>
          <p>{JSON.stringify(record)}</p>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default App;
