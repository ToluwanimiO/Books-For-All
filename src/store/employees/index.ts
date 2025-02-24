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
                title: "Introduction to Physics",
                author: "Isaac Newton",
                subject: "Physics",
                gradeLevel: "Senior Secondary 1",
                school: { _id: "1", name: "Bright Future Academy" },
                status: "available",
                donatedBy: { _id: "101", name: "John Doe" },
                isbn: "978-3-16-148410-0",
                description: "A beginner-friendly guide to classical physics concepts.",
              },
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