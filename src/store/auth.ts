import { acceptHMRUpdate, defineStore } from "pinia";

import type { User, AuthCredentials, SignUpForm } from "@/types";
import { registerUser, createProfileRequest, loginUser, logOutUser, getUserProfileRequest} from "@/requests/auth";
import { getCompanyInfo } from "@/requests/onboarding";
import { CompanyInfoInterface } from "@/types";

export const useAuthStore = defineStore("auth",{

  state: () => {
    return {
      // user: {} as User,
      authUser: null as any,
      profileUser: {} as any,
      companyInfo: {} as CompanyInfoInterface,
    };
  },
  getters: {
    authProfile(state) {
      console.log(state.profileUser);
      return state.profileUser;
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
      if (Object.keys(state.authUser).length) {
        return !state.authUser.onboarded_to_eden_business;
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
    isLoggedIn(state){
      console.log(state.authUser);
      return !!state.authUser;
    }
  },
  actions: {
    async login(payload: AuthCredentials) {
        const response =  await loginUser(payload)
        console.log(response);
        const data = response.user;
        this.authUser = data;
        const profile = await getUserProfileRequest(data.uid)
        console.log(profile);
        this.profileUser = profile
        return response
    },
    async register(payload: AuthCredentials) {
        const response =  await registerUser(payload)
        const data = response.user;
        this.authUser = data;
        return response
    },
    async createProfile(payload: any) {
      try{
        const response = await createProfileRequest(payload)
        this.profileUser = payload.data;
        return response
      }
      catch (error) {
        console.error("Error creating profile:", error);
        throw error;
      }
    },
    getCompanyInfo(id: any) {
      return new Promise((resolve, reject) => {
        getCompanyInfo(id)
          .then((response: any) => {
            console.log(response);
            if (response.data.status) {
              // const data = response.data.data;
              // const user = data.user;
              // localStorage.setItem("eden-business-user", JSON.stringify(user));
              // this.authUser = user
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
    setUser(firebaseUser: any){
      this.authUser = firebaseUser
      console.log(this.authUser);
    },
    clearUser(){
      this.authUser = null
    },
    async logOut(){
      await logOutUser()
      this.authUser = null
      this.profileUser = null;
      // localStorage.removeItem("books-for-all-user");
      // localStorage.removeItem("books-for-all-company-profile");
      // localStorage.removeItem("books-for-all-onboarding-position");
    }
  },
  persist: {
    key: "books-for-all-auth",
    storage: localStorage,
    pick: ["authUser","profileUser"],
  }
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot));
}
