export default function useTags() {

    const setType = (value: string) => {
        const status = value ? value.toLowerCase() : "";

        const warning = [
            "pending",
            "paused",
            "incomplete",
            "unpaid",
            "edited",
            "unapproved",
            "changed",
            "cooked",
            "plated",
            "sealed",
            "sleeved",
            "in progress",
            "dispatched",
            "packed",
            "not assigned",
            "en route",
            "cleaner assigned",
            "cleaner en route",
            "cleaner arrived",
            "sp assigned",
            "arrived",
            "rider sent to pick up",
            "picked up",
            "received and confirmed",
            "sent to sp",
            "ready for pickup",
            "ready for dispatch",
            "downsell",
            "late renewal",
            "ongoing",
            "being-considered",
            "pending use",
        ];

        const success = [
            "active",
            "completed",
            "complete",
            "paid",
            "successful",
            "confirmed",
            "approved",
            "unchanged",
            "subscriber",
            "delivered",
            "cleaning done",
            "en-route",
            "assigned",
            "arrived at",
            "checked",
            "sent",
            "received",
            "started",
            "resurrection",
            "resolved",
            "renewed",
            "current",
            "published",
            "implemented",
            "live",
            "food"
        ];
        const danger = [
            "cancelled",
            "inactive",
            "failed",
            "churned",
            "unassigned",
            "problem",
            "unresolved",
            "did not renew",
            "blocked",
            "high",
            "not-all-delivered",
            "deleted",
        ];
        const info = [
            "prospect",
            "yet to renew",
            "draft",
            "not started",
            "normal",
            "already-exists",
            "used",
        ];
        const cross_sale = ["cross-sell"];
        const upsell = ["upsell"];

        if (danger.includes(status)) {
            return "danger";
        } else if (info.includes(status)) {
            return "info";
        } else if (success.includes(status)) {
            return "success";
        } else if (warning.includes(status)) {
            return "warning";
        } else if (cross_sale.includes(status)) {
            return "cross-info";
        } else if (upsell.includes(status)) {
            return "up-info";
        } else {
            return "info";
        }
    }

    return { setType }
}