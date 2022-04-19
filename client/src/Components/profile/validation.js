import * as Yup from "yup";


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
});


export{FORM_VALIDATION}