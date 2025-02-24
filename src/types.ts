declare global {
  interface Window {
    Intercom: any;
  }
}

export type HTMLInputTypeAttribute =
  | "number"
  | "search"
  | "button"
  | "time"
  | "image"
  | "text"
  | "tel"
  | "checkbox"
  | "color"
  | "date"
  | "datetime-local"
  | "email"
  | "file"
  | "hidden"
  | "month"
  | "password"
  | "radio"
  | "range";

export interface TabItem {
  label: string;
  key: string;
}

export interface OptionItem {
  id: number;
  value: string;
}

export interface LoginForm {
  email: string;
  password: string;
}

export interface SignUpForm {
  name: string;
  location: { country: string; state: string; address: string };
  availableBooks: number;
  email: string;
  password: string;
  role: string;
}

export interface User {
  first_name: any;
  last_name: any;
  email: string;
  username: string;
  company_id: any;
  company_role: any;
  google_id: any;
  is_company_admin: any;
  onboarded_to_eden_business: boolean;
  phone_number: any;
}

export interface CompanyInfoInterface {
  address: any;
  company_size: any;
  country: {
    code: string;
    created_at: any;
    id: number;
    name: string;
    phonecode: string;
    updated_at: any;
  };
  country_id: number;
  created_at: string;
  id: number;
  location_area: any;
  location_area_id: any;
  name: string;
  state: any;
  state_id: number;
  updated_at: string;
}
export interface SubscriptionServiceOption {
  name?: string;
  thumbnail?: string;
  banner?: string;
  description?: string;
}

export enum ServiceOptions {
  FOOD = "Food",
  LAUNDRY = "Laundry",
  CLEANING = "Cleaning",
  BEAUTY = "Beauty",
}

export enum FoodServiceTypeOptions {
  STANDARD = "standard",
  LITE = "lite",
}

export enum LaundryServiceTypeOptions {
  WASH_AND_FOLD = "wash-and-fold",
  WASH_AND_IRON = "wash-and-iron",
}

export enum CleaningServiceTypeOptions {
  STANDARD = "light-cleaning",
  DEEP_CLEANING = "deep-cleaning",
  POST_CONSTRUCTION = "post-construction-cleaning",
}

export enum BeautyServiceTypeOptions {
  STANDARD = "standard",
  PREMIUM = "premium",
}

export enum HouseTypeOptions {
  FLAT = "flat",
  DUPLEX = "duplex",
}

export enum RoomTypeOptions {
  BEDROOMS = "bedrooms",
  LIVING_ROOMS = "living-rooms-dining-areas",
  BATHROOMS = "bathrooms",
  KITCHEN = "kitchen",
  STUDY = "study",
  BALCONY = "balcony",
}

// export interface FoodServiceConfigurationSummary {
// 	serviceType: string;
// 	serviceDays: string[];
// 	quantity: number;
// 	frequency: string;
// }

export interface ServiceConfigurationSummary {
  service: string;
  serviceType: string;
  serviceDays: string[];
  quantity: number;
  frequency: string;
}
export interface SubscriptionSummary {
  plan: any;
  name: string;
  start_date: string;
  employees: string[];
}
export interface LaundryServiceConfigurationSummary {
  serviceType: string;
  serviceDays: string[];
  quantity: number;
  frequency: string;
}

export interface ServiceDaysInterface {
  monday: "Mon";
  tuesday: "Tue";
  wednesday: "Wed";
  thursday: "Thu";
  friday: "Fri";
  saturday: "Sat";
}

export interface SubscriptionItem {
  id: number;
  name: string;
  status: string;
  services: string[];
  nextBillingAmount: string;
  nextBillingDate: string;
  employees: any[];
  plan: any;
}

export interface Employee {
  title?: string;
  author?: string;
  subject?: string;
  gradeLevel?: string;
  school?: { _id: string; name: string };
  donatedBy?: { _id: string; name: string };
  isbn?: string;
  description?: string;
  status?: string;
}

export interface FilterParam {
  clear?: boolean;
  status: boolean;
  params: any;
  paramsLabel: any;
}

export interface EmployeeInformation extends Employee {
  birthday: string;
  deleted_at?: string | null;
  updated_at: string;
  customer_status: string;
  joined: string;
  country?: string;
  address?: string;
  avatar?: string;
  signup_meta?: any;
}

export interface FeedbackRecord {
  id: number;
  orderId: number;
  service: string;
  type: string;
  date: string;
}
