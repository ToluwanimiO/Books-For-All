import { pricing, setEnv } from "@edenlife/eden-pricing-module";
import { useAuthStore } from "@/store/auth";
import { storeToRefs } from "pinia";
import {computed} from "vue";

/**
 * Localization
 */
// const COUNTRY = localStorage.getItem("eden-crm-location");
const COUNTRY = "NG";

/**
 * Use our pricing module to get services pricing
 */
export default function usePricing() {
  // const store = useAuthStore();
  const authStore = useAuthStore();
  const { companyProfile } = storeToRefs(authStore);
console.log(companyProfile.value)
if (!(Object.keys(companyProfile.value).length)) {
  authStore.getCompanyInfo(authStore.authProfile.company_id)
}
  const pricingFunction = (services: any) => {
    if (!(Object.keys(companyProfile.value).length)) {
      authStore.getCompanyInfo(authStore.authProfile.company_id)
    }
    
    console.log(companyProfile.value)
    const location = computed(() => companyProfile.value.country.code);
  
    console.log(location.value)
    
    console.log(services)
    return pricing({ location: location.value?location.value:'NG', config: services });
  };
  const setEnvironment = ()=>{
    /**
     * Set environment
     */
    setEnv(import.meta.env.MODE === "production" ? "production" : "staging");
 
  }
  return{
      pricingFunction,
      setEnvironment
  }
};
