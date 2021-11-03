import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

export const Section = styled(Box)(({ theme }) => ({
    paddingTop: theme.spacing(12),
    paddingLeft: theme.spacing(7),
    paddingRight: theme.spacing(7),
}));
