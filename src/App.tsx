import { Container, IconButton, Snackbar } from '@mui/material';
import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';

import './App.css';
import BasicTabs from './components/BasicTabs';
import NewPhone from './components/NewPhone';
import PhoneList from './components/PhoneList';
import { PhoneI } from './interfaces';

function App() {
  const [open, setOpen] = React.useState<string | boolean | null>(false);
  const handleClose = () => setOpen(false);

  const [phones, setPhones] = useState<PhoneI[]>([
    { number: '012334342', name: 'John', id: new Date().valueOf() + 1 },
    { number: '012334342', name: 'John', id: new Date().valueOf() + 2 },
    { number: '012334342', name: 'John', id: new Date().valueOf() + 3 },
    { number: '012334342', name: 'John', id: new Date().valueOf() + 4 },
  ]);

  const [selectedPhone, setSelectedPhone] = useState<PhoneI | null>(null);

  const addPhone = (params: PhoneI) => {
    setPhones((prev) => [...prev, { ...params, id: new Date().valueOf() }]);
    setOpen(`${params.name} Successfully added`);
  };

  const editPhone = (params: PhoneI) => {
    setPhones((prev) => {
      return prev.map((p) => {
        if (p.id === selectedPhone?.id) {
          return { ...params, id: selectedPhone?.id };
        }
        return p;
      });
    });
    setSelectedPhone(null);
    setOpen(`${params.name} Successfully editted`);
  };

  const removePhoneAtIndex: (index: number) => void = (index) => {
    setPhones((prev) => prev.filter((_, i) => i !== index));
    setOpen(`${phones[index].name} Successfully removed`);
  };

  const editPhoneAtIndex: (index: number) => void = (index) => {
    setSelectedPhone(phones[index]);
  };

  return (
    <div className="App">
      <header className="App-header">
        <BrowserRouter>
          <BasicTabs
            phones={phones}
            addPhone={addPhone}
            setSelectedPhone={setSelectedPhone}
            selectedPhone={selectedPhone}
          />
          <Container
            sx={{
              padding: '1rem',
            }}
          >
            <Routes>
              <Route
                path="/"
                element={
                  <PhoneList
                    phones={phones}
                    removePhoneAtIndex={removePhoneAtIndex}
                    editPhoneAtIndex={editPhoneAtIndex}
                  />
                }
              />
              <Route
                path="/add"
                element={<NewPhone setOpen={setOpen} addPhone={addPhone} />}
              />
              <Route
                path="/edit"
                element={
                  <NewPhone
                    setOpen={setOpen}
                    selectedPhone={selectedPhone}
                    editPhone={editPhone}
                  />
                }
              />
            </Routes>
            <Snackbar
              open={!!open}
              autoHideDuration={6000}
              onClose={handleClose}
              message={open}
              action={
                <React.Fragment>
                  <IconButton
                    size="small"
                    aria-label="close"
                    color="inherit"
                    onClick={handleClose}
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </React.Fragment>
              }
            />
          </Container>
        </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
