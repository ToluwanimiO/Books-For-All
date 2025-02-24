import { FormItemRule } from "element-plus";
import { Arrayable } from "element-plus/es/utils";

export default function useValidation() {
  const validateEdenMail = (rule: any, value: any, callback: any) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value) {
      callback(new Error("This field is required"));
    } else if (emailRegex.test(value) === false) {
      callback(new Error("Email address is invalid"));
    } else if (value.indexOf("@edenlife.ng") === -1) {
      callback(new Error("Enter a valid Eden email"));
    } else {
      callback();
    }
  };

  const validatePhoneNumber = (rule: any, value: any, callback: any) => {
    if (!value) {
      callback(new Error("Phone number is required"));
    } else if (value.length < 10) {
      callback(new Error("Phone number can't be less than 11 digits."));
    } else {
      callback();
    }
  };

  const validateFigure = (rule: any, value: any, callback: any) => {
    if (!value) {
      callback(new Error("This field is required"));
    } else {
      callback();
    }
  };

  const validateMealName = (rule: any, value: any, callback: any) => {
    if (!value) {
      callback(new Error("This field is required"));
    } else if (value.includes(",")) {
      callback(new Error("Meal name cannot contain a comma ','"));
    } else if (value.includes("/")) {
      callback(new Error("Meal name cannot contain a slash '/'"));
    } else {
      callback();
    }
  };

  const validateName = (rule: any, value: any, callback: any) => {
    if (!value) {
      callback(new Error("This field is required"));
    } else if (value.toLowerCase().includes("undefined")) {
      callback(new Error("Name cannot include 'undefined'"));
    } else if (value.toLowerCase() === "const") {
      callback(new Error("Name cannot include 'const'"));
    } else if (value.toLowerCase().includes("null")) {
      callback(new Error("Name cannot include 'null'"));
    } else {
      callback();
    }
  };

  const validateField = (rule: any, value: any, callback: any) => {
    if (value === '') {
      callback(new Error('Field is required'));
    } else {
      callback();
    }
  };

  const validateEmail = (field?: string): Arrayable<FormItemRule> => {
    return [
      {
        required: true,
        message: `${field ? field : "This field"} is required`,
        trigger: ["change"],
      },
      {
        type: "email",
        message: "Email address is not valid",
        trigger: "blur",
      },
    ];
  }

  return {
    validateEdenMail,
    validatePhoneNumber,
    validateFigure,
    validateMealName,
    validateName,
    validateField,
    validateEmail
  }
}
