import React from 'react';
import { Box, Typography } from '@mui/material';


interface FormWithBorderProps {
  children?: React.ReactNode;
  label?: string;
}

const Group: React.FC<FormWithBorderProps> = ({ children, label }) => {
  return (
    <Box
      border={1}
      borderColor="#ccc"
      borderRadius={8}
      padding={2}
      margin="16px 0"
      position="relative"
      width={{
        xs: '80%',
        sm: '60%',
        md: '60%',
      }}
      mx="auto"
    >
      {label && (
        <Typography
          variant="caption"
          sx={{
            position: 'absolute',
            top: '-10px',
            left: '10px',
            backgroundColor: 'white',
            padding: '0 4px',
          }}
        >
          {label}
        </Typography>
      )}
      {children}
    </Box>
  );
};

export default Group;