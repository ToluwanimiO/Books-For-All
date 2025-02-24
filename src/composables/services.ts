import { useServiceStore } from "@/store/services";
import { storeToRefs } from "pinia";
import useSorting from "./sorting";
import useSupport from "./support";

export default function useServices() {
    const serviceStore = useServiceStore();
    const { formatToTitleCase, unformatSlug, formatText } = useSupport();
    const { parseData } = useSorting()
    const { serviceDays } = storeToRefs(serviceStore);

    const sortedDaysOfWeek = (days: any[]) => {
        const daysOfWeek = Object.keys(serviceDays.value);
        return days.sort((a, b) => {
            return daysOfWeek.indexOf(a) < daysOfWeek.indexOf(b) ? -1 : 1;
        });
    }

    const enabledServices = () => {
        return ["beauty", "cleaning", "laundry", "meal"];
    }

    const setServiceType = (serviceType: string) => {
        let service = serviceType.toLowerCase();
        if (service) {
            if (service.includes("meal") || service.includes("food")) {
                service = "meal";
            } else if (service.includes("beauty")) {
                service = "beauty";
            } else if (service.includes("cleaning")) {
                service = "cleaning";
            } else if (service.includes("laundry")) {
                service = "laundry";
            } else {
                return service;
            }
        } else {
            service = "info";
        }
        return service;
    }

    const setServiceStyle = (serviceType: string) => {
        const service = serviceType.toLowerCase();

        switch (service) {
            case "beauty":
                return `
              background: var(--eden-pink-nonary);
              border-color: var(--eden-pink-quaternary);`;
            case "cleaning":
                return `
              background: var(--eden-orange-nonary);
              border-color: var(--eden-orange-quaternary)`;
            case "laundry":
                return `
              background: var(--eden-purple-nonary);
              border-color: var(--eden-purple-quaternary)`;
            case "dailymeals":
                return `
              background: var(--eden-green-nonary);
              border-color: var(--eden-green-quaternary)`;
            case "meal":
                return `
              background: var(--eden-green-nonary);
              border-color: var(--eden-green-quaternary)`;
            default:
                return `
              border-color: var(--eden-grey-septenary);;
              background: transparent;`;
        }
    }

    const formatServiceActivity = (activity: string) => {
        if (!activity) {
            return "Not Started";
        }
        return formatToTitleCase(
            activity.toLowerCase().replaceAll("_", " ")
        );
    }

    const formatServiceUnit = (service: string, quantity: number, showQuantity: boolean) => {
        const services = {
            beauty: quantity > 1 ? "services" : "service",
            carebox: quantity > 1 ? "boxes" : "box",
            cleaning: quantity > 1 ? "rooms" : "room",
            laundry: quantity > 1 ? "bags" : "bag",
            meal: quantity > 1 ? "meals" : "meal",
            order: quantity > 1 ? "orders" : "order",
        };
        const unit = (services as any)[service];
        return showQuantity ? `${quantity} ${unit}` : unit;
    }

    const frequencyLabel = (frequency: string) => {
        switch (frequency) {
            case "daily":
                return "Daily";
            case "weekly":
                return "Weekly";
            case "weekly-twodays":
                return "Twice a week";
            case "weekly-threedays":
                return "Thrice a week";
            case "weekly-fourdays":
                return "Four times a week";
            case "weekly-fivedays":
                return "Five times a week";
            case "weekly-sixdays":
                return "Six times a week";
            case "weekly-sevendays":
                return "Everyday";
            case "bi-weekly":
                return "Every Two Weeks";
            case "monthly":
                return "Monthly";
            case "quarterly":
                return "Quarterly";
            case "yearly":
                return "Yearly";
            case "one-off":
                return "One-off";
            default:
                return "";
        }
    }

    const serviceDayPrefix = () => {
        return {
            1: "",
            2: "-twodays",
            3: "-threedays",
            4: "-fourdays",
            5: "-fivedays",
            6: "-sixdays",
        };
    }

    const formatServiceType = ({ item, service, frequency }:
        { item: string; service: string; frequency: string; }) => {
        if (service === "meal") {
            return frequency === "daily" ? "DailyMeals" : "Weekly Meals";
        }
        return item ? unformatSlug(item) : "";
    }

    const formatServiceDay = (serviceDay: string) => {
        const days = serviceDay.toString();
        return formatToTitleCase(days.split(",").join(", "));
    }

    const formatMealServiceDays = (days: any) => {
        const parsed = parseData(days);
        delete parsed.same_number_per_delivery;
        const text = Object.keys(parsed).map((day) => {
            return `${formatText(day.slice(0, 3))} (${parsed[day]})`;
        });
        return formatToTitleCase(text.join(", "));
    }

    const formatItemAreas = (itemAreas: any) => {
        let areas = Object.keys(itemAreas).map((area) => {
            const areaText = formatToTitleCase(area).replace(
                "Rooms",
                "Rooms /"
            );
            const areaCount = itemAreas[area];
            return `${areaText} (${areaCount})`;
        });
        return areas.toString();
    }

    const timesPerCycle = (frequency: string, service_day: any[] | string) => {
        const frequencies: any = {
            "one-off": 1,
            daily: {
                "monday-friday": 20,
                "monday-saturday": 24,
            },
            weekly: 4,
            "weekly-twodays": 8,
            "weekly-threedays": 12,
            "weekly-fourdays": 16,
            "weekly-fivedays": 20,
            "weekly-sixdays": 24,
            "weekly-sevendays": 28,
            "bi-weekly": 2,
            monthly: 1,
        };

        return frequency === "daily"
            ? frequencies.daily[service_day[0]]
            : frequencies[frequency];
    }

    return {
        sortedDaysOfWeek,
        enabledServices,
        setServiceType,
        setServiceStyle,
        formatServiceActivity,
        formatServiceUnit,
        frequencyLabel,
        serviceDayPrefix,
        formatServiceType,
        formatServiceDay,
        formatMealServiceDays,
        formatItemAreas,
        timesPerCycle,
    }
}
