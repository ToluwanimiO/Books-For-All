import employees from "@/requests/employees";
import { acceptHMRUpdate, defineStore } from "pinia";
import { Employee } from "@/types";

export const useEmployeesStore = defineStore({
    id: 'employees',
    state: (): {
        employees: Employee[],
        addEmployeeData:any
    } => ({
        employees: [
            {
                id: 1,
                name: "Aderinsola Olufemi",
                email: "aderinsolaoluwa@gmail.com",
                status: "active",
                date_joined: "",
                phone_number: "",
                subscription: "C-suite",
                subscription_id: 0
            }
        ],
        addEmployeeData:{}
    }),
    actions: {
        async list() {
            await employees.list().then(({ data }) => {
                this.employees = (data?.data as any[])?.map(item => (item)) || [];
                console.log(data)
            });
        },
    },
    persist: true,
});

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useEmployeesStore, import.meta.hot));
}