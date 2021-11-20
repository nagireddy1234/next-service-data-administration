import * as yup from 'yup';
export const serviceDateCalculatorFormValidation = yup.object().shape({
    lastMilage: yup.number().required(),
    currentMilage: yup.number().required(),
});
