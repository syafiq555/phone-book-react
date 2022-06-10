import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { PhoneI } from '../interfaces';
import { ButtonGroup, Button } from '@mui/material';

import './PhoneList.css';
import { useNavigate } from 'react-router-dom';

interface PropsI {
  phones: PhoneI[];
  removePhoneAtIndex: (index: number) => void;
  editPhoneAtIndex: (index: number) => void;
}

const PhoneList: React.FC<PropsI> = ({
  phones,
  removePhoneAtIndex,
  editPhoneAtIndex,
}) => {
  const navigate = useNavigate();
  return (
    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
      {phones.map(({ name, number }, index) => {
        return (
          <React.Fragment key={index}>
            <ListItem sx={{ alignItems: 'center' }} alignItems="flex-start">
              <ListItemText
                primary={number}
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: 'inline' }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      {name}
                    </Typography>
                  </React.Fragment>
                }
              />
              <div className="d-flex align-items-center">
                <ButtonGroup disableElevation variant="contained">
                  <Button
                    onClick={() => {
                      editPhoneAtIndex(index);
                      navigate('edit');
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    color="error"
                    onClick={() => removePhoneAtIndex(index)}
                  >
                    Delete
                  </Button>
                </ButtonGroup>
              </div>
            </ListItem>
            <Divider variant="inset" component="li" />
          </React.Fragment>
        );
      })}
    </List>
  );
};

export default PhoneList;
