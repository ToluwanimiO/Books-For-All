import dayjs from 'dayjs';
import en from "dayjs/locale/en";
import relativeTime from 'dayjs/plugin/relativeTime'
import weekday from 'dayjs/plugin/weekday'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import customParseFormat from 'dayjs/plugin/customParseFormat'

/**
 * Define Start of the week as [Monday]
 */

dayjs.locale({
    ...en,
});

/**
 * Define Plugins and Extend
 */
dayjs.extend(relativeTime)
dayjs.extend(weekday);
dayjs.extend(advancedFormat);
dayjs.extend(customParseFormat);

/**
 * Setting defaults for Method names with 'format' is compulsory.
 * Setting defaults for Method names with 'get' is optional, and when
 * If {date} is not specified, dayjs(date) becomes dayjs(undefined),
 * which defaults to current date.
 */
export default function useDate() {
    const formatDate = (date: string | dayjs.Dayjs, format?: string): string => {
        if (!date) {
            return "-";
        }
        switch (format) {
            case "d-m-y":
                return dayjs(date).format("DD-MM-YYYY");
            case "y-m-d":
                return dayjs(date).format("YYYY-MM-DD");
            case "do m, y":
                return dayjs(date).format("DD MMM, YYYY");
            case "m do, y":
                return dayjs(date).format("MMM DD, YYYY");
            case "dd, mm do y":
                return dayjs(date).format("ddd, MMM DD, YYYY");
            case "ddd do, m, y":
                return dayjs(date).format("ddd DD, MMM, YYYY");
            case "dddd do, m, y":
                return dayjs(date).format("ddd DD, MMM, YYYY");
            case "dddd ddd, m, y":
                return dayjs(date).format("dddd DD, MMM, YYYY");
            case "do m":
                return dayjs(date).format("DD MMM");
            case "m do":
                return dayjs(date).format("MMMM DD");
            case "dd, m":
                return dayjs(date).format("ddd, MMMM DD");
            case "m y":
                return dayjs(date).format("MMM YYYY");
            case "object":
                return `${dayjs(date)}`;
            default:
                return dayjs(date).format("DD MMM, YYYY");
        }
    }

    const formatTime = (time: string, format: string) => {
        if (!time) {
            return "-";
        }

        if (time === "now") {
            return dayjs().format(format === "24h" ? "HH:mm" : "hh:mm A");
        }

        switch (format) {
            case "hour":
                return dayjs(time).format("H");
            case "12h":
                return dayjs(time).format("hh:mm A");
            case "24h":
                return dayjs(time).format("HH:mm");
            default:
                return dayjs(time, "hh:mm").format("hh:mm A");
        }
    }

    const formatDateAndTime = (date: string, format: string) => {
        if (!date) {
            return "-";
        }
        return formatDate(date, format) + " " + formatTime(date, "12h");
    }

    const formatTimeFromNow = (date: string, suffix = true) => {
        return dayjs(date).fromNow(!suffix);
    }

    const formatPeriodDate = (period: string, format: string) => {
        switch (period) {
            case "last90":
                return getPastDate({
                    date: dayjs(),
                    unit: "day",
                    num: 90,
                    format,
                });
            case "last60":
                return getPastDate({
                    date: dayjs(),
                    unit: "day",
                    num: 60,
                    format,
                });
            case "last30":
                return getPastDate({
                    date: dayjs(),
                    unit: "day",
                    num: 30,
                    format,
                });
            case "lastmonth": {
                const lastmonth = getPastDate({
                    date: dayjs(),
                    unit: "month",
                    num: 1,
                    format: "object",
                });
                return {
                    start: formatDate(`${dayjs(lastmonth).startOf("month")}`, format),
                    end: formatDate(`${dayjs(lastmonth).endOf("month")}`, format),
                };
            }
            case "lastweek": {
                const lastweek = getPastDate({
                    date: dayjs(),
                    unit: "week",
                    num: 1,
                    format: "object",
                });
                return {
                    start: formatDate(`${dayjs(lastweek).startOf("week")}`, format),
                    end: formatDate(`${dayjs(lastweek).endOf("week")}`, format),
                };
            }
            case "last7":
                return {
                    start: getPastDate({
                        date: dayjs(),
                        unit: "day",
                        num: 7,
                        format,
                    }),
                    end: formatDate(dayjs(), format)
                };
                case "alltime":
                    return ""
            case "yesterday":
                return getPastDate({
                    date: dayjs(),
                    unit: "day",
                    num: 1,
                    format,
                });
            case "today":
                return formatDate(dayjs(), format);
            case "tomorrow":
                return getFutureDate({
                    date: dayjs(),
                    unit: "day",
                    num: 1,
                    format,
                });
            case "nexttwodays":
                return getFutureDate({
                    date: dayjs(),
                    unit: "day",
                    num: 2,
                    format,
                });
            case "thisweek":
                return {
                    start: formatDate(dayjs().startOf("week"), format),
                    end: formatDate(dayjs().endOf("week"), format),
                };
            case "nextweek": {
                const nextweek = getFutureDate({
                    date: dayjs(),
                    unit: "week",
                    num: 1,
                    format: "object",
                });
                return {
                    start: formatDate(dayjs(nextweek).startOf("week"), format),
                    end: formatDate(dayjs(nextweek).endOf("week"), format),
                };
            }
            case "thismonth": {
                return {
                    start: formatDate(dayjs().startOf("month"), format),
                    end: formatDate(dayjs().endOf("month"), format),
                };
            }
            default:
                return formatDate(dayjs());
        }
    }

    const formatStartAndEndDate = ({ period, from, to }: { period: string; from?: string; to?: string; }) => {
        let start_date, end_date;
        if (period !== "custom") {
            const date: any = formatPeriodDate(period, "y-m-d");
            start_date = date.start ? date.start : date;
            end_date = date.end ? date.end : date;
        } else {
            start_date = from;
            end_date = to;
        }
        return {
            start_date,
            end_date,
        };
    }

    const formatDefaultServiceStartDate = () => {
        const nexttwodays = formatPeriodDate("nexttwodays", "y-m-d");
        const nextthreedays = getFutureDate({
            date: nexttwodays as string,
            unit: "day",
            num: 1,
            format: "y-m-d",
        });

        return getWeekday(nexttwodays as string).toLowerCase() === "sunday"
            ? [nextthreedays]
            : [nexttwodays];
    }

    const formatSubscriptionDate = (start: string, end: string) => {
        const s = formatDate(start, "do m");
        const e = formatDate(end, "do m");

        const sYear = getYear(start);
        const eYear = getYear(end);

        return {
            start: `${s} ${sYear !== eYear ? sYear : ""}`,
            end: `${e} ${sYear === eYear ? sYear : eYear}`,
        };
    }

    const getPastDate = ({ date, unit, num, format }: { date: string | dayjs.Dayjs; unit: string; num: number; format: string }) => {
        return formatDate(
            dayjs(date ?? undefined).subtract(num, unit as dayjs.ManipulateType),
            format
        );
    }

    const getFutureDate = ({ date = undefined, unit, num, format }: { date?: string | dayjs.Dayjs; unit: dayjs.ManipulateType; num: number; format: string }) => {
        return formatDate(`${dayjs(date).add(num, unit)}`, format);
    }

    const getDate = (date: string, format: string) => {
        return formatDate(date ?? dayjs(), format);
    }

    const getDateDifference = ({ fDate, sDate, unit }: { fDate: string; sDate: string; unit?: dayjs.QUnitType }) => {
        return dayjs(fDate).diff(sDate, unit ? unit : ('day' as dayjs.QUnitType));
    }

    const getWeekdayIndex = (date?: string) => {
        return dayjs(date).weekday();
    }

    const getWeekday = (date?: string) => {
        return dayjs(date).format("dddd");
    }

    const getMonthIndex = (date: string) => {
        return dayjs(date ?? undefined).month();
    }

    const getMonth = (date: string, format: string) => {
        return dayjs(date ?? undefined).format(format ? format : "MMMMM");
    }


    const getYear = (date: string) => {
        return dayjs(date ?? undefined).year();
    }

    return {
        formatDate,
        formatTime,
        formatDateAndTime,
        formatPeriodDate,
        formatTimeFromNow,
        formatStartAndEndDate,
        formatDefaultServiceStartDate,
        formatSubscriptionDate,
        getPastDate,
        getFutureDate,
        getDate,
        getDateDifference,
        getWeekdayIndex,
        getWeekday,
        getMonthIndex,
        getMonth,
        getYear
    }

};
