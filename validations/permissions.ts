import * as yup from 'yup';

export const addPermissionSchema = yup.object({
    name: yup
        .string()
        .required('Name is required')
        .min(3, 'Name must be at least 3 characters long'), // Add a minimum length check
    description: yup
        .string()
        .optional()
        .nullable() // Allow null or an empty string for the description
        .max(500, 'Description cannot be longer than 500 characters'), // Max length for description
    active: yup
        .boolean()
        .optional()
}).required();
