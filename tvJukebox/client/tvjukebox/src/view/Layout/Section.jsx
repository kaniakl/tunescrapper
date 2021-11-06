import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

export const Section = styled(Box, {
    shouldForwardProp: (prop) => prop !== 'multiplyHorizontal' && prop !== 'multiplyVertical',
})(({ multiplyHorizontal, multiplyVertical, theme }) => ({
    paddingTop: theme.spacing((multiplyVertical ?? 1)*12),
    paddingLeft: theme.spacing((multiplyHorizontal ?? 1)*7),
    paddingRight: theme.spacing((multiplyHorizontal ?? 1)*7),
}));
