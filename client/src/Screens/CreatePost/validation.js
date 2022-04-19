import * as Yup from "yup";
export const validationSchema = Yup.object().shape({
  mainTitle: Yup.string().required(" required"),
  subTitle: Yup.string().required(" required"),
  indroduction: Yup.string().required(" required"),
  place: Yup.string().required(" required"),
  date: Yup.string().required(" required"),
  postContent: Yup.string().required("required"),
  img1: Yup.mixed()
    .required("required")
    .test("required", "upload the main image", (value) => {
      return value && value.length;
    }),
  img2: Yup.mixed()
    .required("required")
    .test("required", "upload the main image", (value) => {
      return value && value.length;
    }),
  img3: Yup.mixed()
    .required("required")
    .test("required", "upload the main image", (value) => {
      return value && value.length;
    }),
  img4: Yup.mixed()
    .required("required")
    .test("required", "upload the main image", (value) => {
      return value && value.length;
    }),
  img5: Yup.mixed()
    .required("required")
    .test("required", "upload the main image", (value) => {
      return value && value.length;
    }),
});
