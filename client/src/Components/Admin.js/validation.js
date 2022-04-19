import * as Yup from "yup"
export const validationSchema = Yup.object().shape({
    destinationName:Yup.string().required("required"),  
    indroduction:Yup.string().required("required"),  
    timeForVisit:Yup.string().required("required"),  
    food:Yup.string().required("required"),  
    accommodation:Yup.string().required("required"),  
    transportation:Yup.string().required("required"),  
    safety:Yup.string().required("required"),  
    destinationImg:Yup.mixed()
    .required("required")
    .test("required", "upload the  image", (value) => {
      return value && value.length;
    }),
    place1:Yup.string().required("required"),
    place1img:Yup.mixed()
    .required("required")
    .test("required", "upload the  image", (value) => {
      return value && value.length;
    }),
    place2:Yup.string().required("required"),
    place2img:Yup.mixed()
    .required("required")
    .test("required", "upload the  image", (value) => {
      return value && value.length;
    }),
    place3:Yup.string().required("required"),
    place3img:Yup.mixed()
    .required("required")
    .test("required", "upload the  image", (value) => {
      return value && value.length;
    }),
})