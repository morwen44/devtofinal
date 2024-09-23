

import * as Yup from "yup";

const passwordRules =
  /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{6,}$/;

export const signUpSchema = Yup.object().shape({
  profileImage: Yup.string().url(
    "Please enter a valid URL for the profile image."
  ),
  name: Yup.string().required("Please fill out this field."),
  username: Yup.string()
    .min(3, "Username must be at least 3 characters long.")
    .required("Please fill out this field."),
  email: Yup.string()
    .email("Please enter a valid email address.")
    .required("Please fill out this field."),
  password: Yup.string()
    .matches(
      passwordRules,
      "Password must contain at least 6 characters, one uppercase letter, one number, and one special character."
    )
    .required("Please fill out this field."),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords do not match.")
    .required("Please fill out this field."),
});

export const loginSchema = Yup.object().shape({
  email: Yup.string()
    .required("Email is required")
    .email("Invalid email format"),
  password: Yup.string()
    .matches(
      passwordRules,
      "Password must contain at least 6 characters, one uppercase letter, one number, and one special character."
    )
    .required("Password is required"),
});

export const postSchema = Yup.object().shape({
  image: Yup.string().url("Must be a valid URL").required("Cover image URL is required"),
  title: Yup.string().required("Post title is required").max(100, "Title must be at most 100 characters"),
  body: Yup.string().required("Post content is required").min(10, "Content must be at least 10 characters"),
});