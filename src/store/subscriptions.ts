import {
    SubscriptionItem
} from "@/types";

import { acceptHMRUpdate, defineStore } from "pinia";

export const useSubscriptionsStore = defineStore({
    id: 'subscriptions',
    state: (): {
        subscriptions: SubscriptionItem[],
        new_plan:any
    } => ({
        subscriptions: [
            {
                id: 1,
                name: 'C-suite',
                status: 'active',
                services: ['food', 'cleaning', 'laundry'],
                nextBillingAmount: '₦500,000',
                nextBillingDate: 'Nov 2, 2022',
                employees:[],
	            plan:[]
            },
            {
                id: 2,
                name: 'Mid-level',
                status: 'active',
                services: ['food', 'cleaning'],
                nextBillingAmount: '₦500,000',
                nextBillingDate: 'Nov 2, 2022',
                employees:[],
	            plan:[]
            },
            {
                id: 3,
                name: 'Low-level',
                status: 'active',
                services: ['food'],
                nextBillingAmount: '₦500,000',
                nextBillingDate: 'Nov 2, 2022',
                employees:[],
	            plan:[]
            }
        ],
        new_plan:[]
    }),
    persist: true,
});

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useSubscriptionsStore, import.meta.hot));
}