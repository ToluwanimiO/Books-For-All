export default function usePermissions() {
    const roles = () => {
        return {
            admin: "Admin",
            gardener: "Gardener",
            growth: "Growth",
            kitchen: "Food Production",
            ofa: "OFA",
            operations: "Operations",
            steward: "Production Assistant",
            superadmin: "Super Admin",
        };
    }

    const allowAccessFor = (roles: string | string[], strict?: boolean) => {
        if (roles === "all") {
            return true;
        }
        const role = localStorage.getItem("books-for-all-user-role");
        return strict
            ? !!roles.includes(role as string)
            : !!roles.concat("superadmin").includes(role as string);
    }

    const allowAccessForFeature = (env = "staging", roles: string[]) => {
        const role = localStorage.getItem("books-for-all-user-role");
        return (
            import.meta.env.NODE_ENV === env &&
            !!roles.concat("superadmin").includes(role as string)
        );
    }

    const allowEventMarking = (period: string, roles: string[]) => {
        const role = localStorage.getItem("books-for-all-user-role");
        return (
            period === "today" &&
            !!roles.concat("superadmin", "admin", "operations").includes(role as string)
        );
    }

    return {
        roles,
        allowAccessFor,
        allowAccessForFeature,
        allowEventMarking,
    }
};
