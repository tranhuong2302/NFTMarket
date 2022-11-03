import { Form, Formik } from "formik";
import * as Yup from "yup";
import FormikInput from "../../../components/Input";
import ImagePicker from "./ImagePicker";
import SubmitButton from "./SubmitButton";
import TextArea from "./TextArea";

export type CreationValues = {
  name: string;
  description: string;
  image?: File;
};

type CreationFormProps = {
  onSubmit: (values: CreationValues) => Promise<void>;
};

export const creationValidationSchema = Yup.object().shape({
  name: Yup.string().required("Must enter a name"),
  description: Yup.string().required("Must enter a description"),
  image: Yup.mixed().test("is_defined", "Must select an image", (value) =>
    Boolean(value)
  ),
});

const CreationForm = ({ onSubmit }: CreationFormProps) => {
  const initialValues: CreationValues = { name: "", description: "" };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={creationValidationSchema}
      validateOnBlur={false}
      validateOnChange={false}
      validateOnMount={false}
      onSubmit={onSubmit}
    >
      <Form className="flex" style={{ justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <ImagePicker name="image" className="mr-4" />
        <div className="flex h-96 flex-col space-y-1" style={{ width: "35rem" }}>
          <p className="text-lg">Name: </p>
          <FormikInput name="name" placeholder="name" />
          <p className="text-lg">Description: </p>
          <TextArea name="description" placeholder="description..." />
          <SubmitButton />
        </div>
      </Form>
    </Formik>
  );
};

export default CreationForm;
