
export default function useSorting() {
    const sortWeekDays = (days: string[], format = "short") => {
        const formats: any = {
            short: ["mon", "tue", "wed", "thu", "fri", "sat", "sun"],
            long: [
                "monday",
                "tuesday",
                "wednesday",
                "thursday",
                "friday",
                "saturday",
                "sunday",
            ],
        };

        return days
            .map((day) => day.toLowerCase())
            .sort((a, b) =>
                formats[format].indexOf(a) < formats[format].indexOf(b) ? -1 : 1
            );
    }

    const sumArray = (data: any[], property: string) => {
        return data.reduce((total: number, el) => {
            return total + el[property];
        }, 0);
    }

    const sortArray = ({ data, property, direction = "asc" }:
        { data: any[], property?: string; direction?: string; }) => {
        if (!data.length) {
            return [];
        }
        let sorted = [];
        if (property && typeof data[0][property] === "string") {
            sorted = data.sort((a, b) =>
                a[property].toLowerCase() < b[property].toLowerCase() ? -1 : 1
            );
        } else if (property) {
            sorted = data.sort((a, b) => (a[property] < b[property] ? -1 : 1));
        } else {
            sorted = data.sort((a, b) => (a < b ? -1 : 1));
        }
        return direction === "asc" ? sorted : sorted.reverse();
    }

    const sortObject = (data: any) => {
        return Object.keys(data)
            .sort()
            .reduce(
                (acc, key) => ({
                    ...acc,
                    [key]: data[key],
                }),
                {}
            );
    }

    const sortUniqueObject = (data: any[], property: string) => {
        return data.reduce((item, o) => {
            if (!item.some((obj: any) => obj[property] === o[property])) {
                item.push(o);
            }
            return item;
        }, []);
    }
    const sortArrayIntoObject = (array: any[], key: string) => {
        const object = {};
        return array.reduce((obj, item) => {
            return {
                ...obj,
                [item[key]]: item,
            };
        }, object);
    }

    const sortObjectAsParams = (object: any) => {
        let params = "";
        let paramsKeys = Object.keys(object);

        console.log(paramsKeys, 'key')

        paramsKeys.forEach((property) => {
            if (Array.isArray(object[property])) {
                object[property].forEach((value: any) => {
                    params = `${params}&filter[${property}][]=${value}`;
                });
            } else {
                params = `${params}&filter[${property}]=${object[property]}`;
            }
        });
        params = params.replace("&", "");
        return params;
    }

    const paginate = (data: any[], size: number) => {
        let pages = Math.ceil(data.length / size);
        let paginated: any = {};

        for (let i = 1; i <= pages; i++) {
            const end = i * size;
            const start = end - size;
            paginated[i] = {
                from: start + 1,
                data: data.slice(start, end),
            };
            paginated[i].to = paginated[i].from + (paginated[i].data.length - 1);
        }

        return paginated;
    }

    const parseData = (data: any) => {
        return JSON.parse(JSON.stringify(data));
    }

    return {
        parseData,
        sortWeekDays,
        sumArray,
        sortArray,
        sortObject,
        sortUniqueObject,
        sortArrayIntoObject,
        sortObjectAsParams,
        paginate
    }
}