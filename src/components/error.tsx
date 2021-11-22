import React, { FC } from 'react';
import { Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { red } from '@mui/material/colors';

const useStyles = makeStyles({
    error: {
        color: red[500],
        fontSize: '0.9rem',
        transform: 'translateY(-1rem)',
    },
});

interface Props {
    message: string;
}

const Error: FC<Props> = ({ message }): JSX.Element => {
    const classes = useStyles();
    return <Typography className={classes.error}>{message}</Typography>;
};

export default Error;
