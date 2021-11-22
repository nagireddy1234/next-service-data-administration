import { Button, Grid, TextField, TextFieldProps, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { Controller, useForm } from 'react-hook-form';
import { serviceDateCalculatorFormValidation } from '../../validation';
import Error from '../../components/error';
import dayjs from 'dayjs';
import { getVehicalDetails } from '../../api';
import ConfirmationModal from '../../components/confirmationModal';
import { getMailInfo } from '../../util/mailer';

const useStyles = makeStyles({
    input: {
        marginBottom: '1rem',
    },
    formWrapper: {
        maxWidth: '40rem',
    },
    modelWrapper: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        boxShadow: '0 0 10px 2px rgba(0,0,0,0.3)',
        padding: '2rem',
        borderRadius: '0.5rem',
        backgroundColor: 'white',
    },
});

const ServiceDataCalculation = () => {
    const classes = useStyles();
    const { register, errors, handleSubmit, control } = useForm({
        validationSchema: serviceDateCalculatorFormValidation,
    });
    const [lastDate, setLastDate] = useState(new Date());
    const [currentDate, setCurentDate] = useState(new Date());
    const [expectedDate, setExpectedDate] = useState('N/A');
    const [enableSendEmail, setEnableSendEmail] = useState(false);
    const [open, setOpen] = useState(false);
    const [email, setEmail] = useState('');
    const [vehicalDetail, setVehicalDetails] = useState({ make: '', model: '', modelYear: '' });

    const submit = async (data: any) => {
        const { lastMilage, currentMilage, vin } = data;
        if (vin) {
            const result = await getVehicalDetails(vin);
            if (result.data.Results.length) {
                const { Make, Model, ModelYear } = result.data.Results[0];
                setVehicalDetails({ make: Make, model: Model, modelYear: ModelYear });
            }
        }

        const EstimatedServiceOn = 15000;
        const milageDifference =  currentMilage - lastMilage;

        if (milageDifference >= EstimatedServiceOn) {
            setExpectedDate(dayjs().add(1, 'day').format('YYYY/MM/DD'));
        } else {
            const newDate = dayjs(currentDate);
            const oldDate = dayjs(lastDate);
            const daysDifference = newDate.diff(oldDate, 'days');
            const perDayMilage = milageDifference / daysDifference;
            const totalDaysNeeded = EstimatedServiceOn / perDayMilage;
            const newServiceDate = newDate.add(totalDaysNeeded, 'days').format('YYYY/MM/DD');
            const nextDaysDiff = dayjs(newServiceDate).diff(newDate, 'days');
            setExpectedDate(newServiceDate);
            const is30DaysOrMore = nextDaysDiff >= 30 ? true : false;
            setOpen(is30DaysOrMore);
        }
    };
    const handleYes = () => {
        setEnableSendEmail(true);
    };

    const handleSendEmail = async () => {
        (window as any).Email.send(getMailInfo(email, expectedDate)).then((message: any) => {
            alert(message);
            setOpen(false);
        });
    };

    return (
        <>
            <ConfirmationModal openOrNot={open} onClose={() => setOpen(false)}>
                {enableSendEmail ? (
                    <Box className={classes.modelWrapper}>
                        <TextField
                            label="Please enter email..."
                            fullWidth
                            variant="outlined"
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                            className={classes.input}
                        />
                        <Button type="submit" fullWidth variant="contained" onClick={handleSendEmail}>
                            Send Service notification
                        </Button>
                    </Box>
                ) : (
                    <Box className={classes.modelWrapper}>
                        <Typography variant="h5" textAlign="center" marginBottom="1rem">
                            Send Offer To Customer
                        </Typography>
                        <Grid container alignItems="center" justifyContent="space-between">
                            <Button variant="contained" onClick={handleYes}>
                                Yes
                            </Button>
                            <Button variant="contained" onClick={() => setOpen(false)}>
                                No
                            </Button>
                        </Grid>
                    </Box>
                )}
            </ConfirmationModal>
            <Grid container alignItems="center" justifyContent="center" marginTop="4rem" padding="1rem 1.5rem">
                <Box className={classes.formWrapper}>
                    <Typography variant="h4" textAlign="center" marginBottom="1rem">
                        Service Date Calculation
                    </Typography>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <form onSubmit={handleSubmit(submit)}>
                            <DesktopDatePicker
                                label="Last Date"
                                inputFormat="MM/dd/yyyy"
                                value={lastDate}
                                onChange={(date: any) => setLastDate(date)}
                                renderInput={(params) => (
                                    <TextField
                                        fullWidth
                                        ref={register}
                                        name="lastDate"
                                        className={classes.input}
                                        {...params}
                                    />
                                )}
                            />
                            <Controller
                                name="lastMilage"
                                control={control}
                                as={
                                    <TextField
                                        label="Last Milage"
                                        fullWidth
                                        variant="outlined"
                                        className={classes.input}
                                        ref={register}
                                    />
                                }
                            />
                            {errors?.lastMilage && <Error message={errors.lastMilage.message} />}

                            <DesktopDatePicker
                                label="Current Date"
                                inputFormat="MM/dd/yyyy"
                                value={currentDate}
                                onChange={(date: any) => setCurentDate(date)}
                                renderInput={(params: JSX.IntrinsicAttributes & TextFieldProps) => (
                                    <TextField
                                        fullWidth
                                        ref={register}
                                        name="currentDate"
                                        className={classes.input}
                                        {...params}
                                    />
                                )}
                            />

                            <Controller
                                name="currentMilage"
                                control={control}
                                as={
                                    <TextField
                                        label="Current Milage"
                                        fullWidth
                                        variant="outlined"
                                        className={classes.input}
                                        ref={register}
                                    />
                                }
                            />
                            {errors?.currentMilage && <Error message={errors.currentMilage.message} />}
                            <Controller
                                name="vin"
                                control={control}
                                as={
                                    <TextField
                                        label="Vehical Indentification Number"
                                        fullWidth
                                        variant="outlined"
                                        className={classes.input}
                                        ref={register}
                                    />
                                }
                            />
                            
                            <Button type="submit" fullWidth variant="contained">
                                Calculate
                            </Button>
                            {vehicalDetail.make && (
                                <Typography
                                    variant="h5"
                                    marginTop="1.5rem"
                                    textAlign="center"
                                    color="green"
                                    fontWeight={800}
                                >
                                    Your car is a {vehicalDetail.make} {vehicalDetail.model} with Model Year{' '}
                                    {vehicalDetail.modelYear}
                                </Typography>
                            )}
                        </form>

                        <Typography variant="h5" textAlign="center" marginTop="1.5rem">
                            Next Date Of Service
                        </Typography>
                        <Typography variant="h6" textAlign="center">
                            Expected Date: {expectedDate}
                        </Typography>
                    </LocalizationProvider>
                </Box>
            </Grid>
        </>
    );
};

export default ServiceDataCalculation;
