import * as yup from "yup";

export const addPlanSchema = yup
    .object({
        name: yup.string().required("Name is required"),
        description: yup.string().optional(),
        price: yup.number().required("Price is required"),
        duration: yup.number().required("Duration is required"),
        active: yup.boolean().required("Active is required"),
    });