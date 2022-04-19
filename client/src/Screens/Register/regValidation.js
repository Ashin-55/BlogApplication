import * as Yup from "yup";

const INTIAL_FORM_STATE = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  state: "",
  password: "",
  indroduction: "",
};
const FORM_VALIDATION = Yup.object().shape({
  firstName: Yup.string().required("required field"),
  lastName: Yup.string().required("Required"),
  email: Yup.string().email("invalid email").required("Required"),
  phone: Yup.number()
    .integer()
    .typeError("Please enter a valid phone number")
    .required("Required"),
  address: Yup.string().required("Fiil the address"),
  city: Yup.string().required("Enter cityname"),
  state: Yup.string().required("Enter State Name"),
  indroduction: Yup.string().required("Required"),
  password: Yup.string()
    .min(5, "Your password must be longer than 5 characters.")
    .max(10, "Your password must be less than than 10 characters.")
    .required("Please enter password "),
});
const FORM_VALIDATION_EDIT = Yup.object().shape({
  firstName: Yup.string().required("required field"),
  lastName: Yup.string().required("Required"),
  email: Yup.string().email("invalid email").required("Required"),
  phone: Yup.number()
    .integer()
    .typeError("Please enter a valid phone number")
    .required("Required"),
  address: Yup.string().required("Fiil the address"),
  city: Yup.string().required("Enter cityname"),
  state: Yup.string().required("Enter State Name"),
  indroduction: Yup.string().required("Required"),

});


export{FORM_VALIDATION,INTIAL_FORM_STATE,FORM_VALIDATION_EDIT}