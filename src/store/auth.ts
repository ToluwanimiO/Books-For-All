import { acceptHMRUpdate, defineStore } from "pinia";
import type { User, LoginForm, SignUpForm } from "@/types";
import { login, register } from "@/requests/auth";
import { getCompanyInfo } from "@/requests/onboarding";
import { CompanyInfoInterface } from "@/types";

export const useAuthStore = defineStore({
  id: "auth",
  state: () => {
    return {
      user: {} as User,
      token: null as string | null,
      companyInfo: {} as CompanyInfoInterface,
    };
  },
  getters: {
    authProfile(state) {
      if (state.user.email) {
        return state.user;
      }
      const storage = localStorage.getItem("books-for-all-user") as string;
      if (storage) {
        return JSON.parse(storage);
      } else {
        return {
          name: "",
          location: {
            country: "",
            state: "",
            address: "",
          },
          libraryLimit: "",
          email: "",
          password: "",
          role: "",
        };
      }
    },
    companyProfile(state) {
      return {
        address: "123 Tech Lane",
        company_size: "51-200",
        country: {
          code: "US",
          created_at: "2023-01-01T00:00:00Z",
          id: 1,
          name: "United States",
          phonecode: "+1",
          updated_at: "2023-12-31T00:00:00Z",
        },
        country_id: 1,
        created_at: "2024-01-01T12:00:00Z",
        id: 101,
        location_area: null,
        location_area_id: null,
        name: "Tech Innovators Inc.",
        state: "California",
        state_id: 5,
        updated_at: "2025-01-01T12:00:00Z",
      };

      if (Object.keys(state.companyInfo).length) {
        return state.companyInfo;
      }
      const storage = localStorage.getItem(
        "books-for-all-company-profile"
      ) as string;
      if (storage) {
        return JSON.parse(storage);
      } else {
        return {} as CompanyInfoInterface;
      }
    },
    onboarding(state) {
      return;
      if (Object.keys(state.user).length) {
        return !state.user.onboarded_to_eden_business;
      }
      const storage = localStorage.getItem("books-for-all-user") as string;
      console.log(storage);
      if (storage) {
        console.log(JSON.parse(storage));
        return !JSON.parse(storage).onboarded_to_eden_business;
      } else {
        console.log("nahh");
        return true;
      }
    },
  },
  actions: {
    login(payload: LoginForm) {
      console.log("hi");
      return new Promise((resolve, reject) => {
        login(payload)
          .then((response: any) => {
            console.log(response);

            if (response.status) {
              const data = response.data;
              const token = data.token;
              const user = data.user;
              // window.axios.defaults.headers.common.Authorization = `Bearer ${token}`;
              localStorage.setItem(
                "books-for-all-token",
                JSON.stringify(token)
              );
              localStorage.setItem("books-for-all-user", JSON.stringify(user));
              this.user = user;
              this.token = token;
            }
            resolve(response);
          })
          .catch((error: any) => {
            reject(error);
          });
      });
    },
    register(payload: SignUpForm) {
      console.log("hi");
      return new Promise((resolve, reject) => {
        register(payload)
          .then((response: any) => {
            console.log(response);
            if (response.status) {
              const data = response.data.user;
              const token = response.data.token;
              // axios.defaults.headers.common.Authorization = `Bearer ${token}`;
              localStorage.setItem(
                "books-for-all-token",
                JSON.stringify(token)
              );
              localStorage.setItem("books-for-all-user", JSON.stringify(data));
              localStorage.setItem("books-for-all-user-role", data.role);
            }
            resolve(response);
          })
          .catch((error: any) => {
            reject(error);
          });
      });
    },
    getCompanyInfo(id: any) {
      return new Promise((resolve, reject) => {
        getCompanyInfo(id)
          .then((response: any) => {
            console.log(response);
            if (response.data.status) {
              // const data = response.data.data;
              // const token = data.token.access_token;
              // const user = data.user;
              // // window.axios.defaults.headers.common.Authorization = `Bearer ${token}`;
              // localStorage.setItem("eden-business-token", JSON.stringify(token));
              // localStorage.setItem("eden-business-user", JSON.stringify(user));
              // this.user = user
              // this.token = token
              localStorage.setItem(
                "books-for-all-company-profile",
                JSON.stringify(response.data.data)
              );
              this.companyInfo = response.data.data;
            }
            resolve(response);
          })
          .catch((error: any) => {
            reject(error);
          });
      });
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot));
}
