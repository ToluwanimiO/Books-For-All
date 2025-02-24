import {
    ServiceDaysInterface,
    ServiceOptions,
    HouseTypeOptions,
    RoomTypeOptions, FoodServiceTypeOptions,
    CleaningServiceTypeOptions, LaundryServiceTypeOptions,
    BeautyServiceTypeOptions,
    SubscriptionServiceOption,
    TabItem
} from "@/types";

import { acceptHMRUpdate, defineStore } from "pinia";


export const useServiceStore = defineStore({
    id: 'services',
    state: (): {
        serviceOptions: SubscriptionServiceOption[];
        serviceDays: ServiceDaysInterface;
        foodServiceTypes: TabItem[];
        beautyServiceTypes: TabItem[];
        laundryServiceTypes: TabItem[];
        cleaningServiceTypes: TabItem[];
        roomTypes: TabItem[];
        roomPrices: TabItem[];
        frequencyTypes: string[];
        houseTypes: string[];
    } => {
        return {
            frequencyTypes: [
                'weekly', 'bi-weekly', 'monthly'
            ],
            serviceDays: {
                monday: "Mon",
                tuesday: "Tue",
                wednesday: "Wed",
                thursday: "Thu",
                friday: "Fri",
                saturday: "Sat",
            },
            houseTypes: [
                HouseTypeOptions.FLAT,
                HouseTypeOptions.DUPLEX
            ],
            roomPrices:[
                
            ],
            roomTypes: [
                {
                    key: RoomTypeOptions.BEDROOMS,
                    label: 'Bedrooms'
                },
                {
                    key: RoomTypeOptions.LIVING_ROOMS,
                    label: 'Living Rooms/Dining Areas'
                },
                {
                    key: RoomTypeOptions.BATHROOMS,
                    label: 'Bathrooms'
                },
                {
                    key: RoomTypeOptions.KITCHEN,
                    label: 'Kitchen'
                },
                {
                    key: RoomTypeOptions.STUDY,
                    label: 'Study'
                },
                {
                    key: RoomTypeOptions.BALCONY,
                    label: 'Balcony'
                }
            ],
            foodServiceTypes: [
                {
                    key: FoodServiceTypeOptions.LITE,
                    label: 'Lite Plan',
                },
                {
                    key: FoodServiceTypeOptions.STANDARD,
                    label: 'Standard Plan',
                }
            ],
            beautyServiceTypes: [
                {
                    key: BeautyServiceTypeOptions.STANDARD,
                    label: 'Standard Beauty',
                },
                {
                    key: BeautyServiceTypeOptions.PREMIUM,
                    label: 'Premium Beauty',
                },
            ],
            cleaningServiceTypes: [
                {
                    key: CleaningServiceTypeOptions.STANDARD,
                    label: 'Standard Cleaning',
                },
                {
                    key: CleaningServiceTypeOptions.DEEP_CLEANING,
                    label: 'Deep Cleaning',
                },
                {
                    key: CleaningServiceTypeOptions.POST_CONSTRUCTION,
                    label: 'Post-Construction',
                },
            ],
            laundryServiceTypes: [
                {
                    key: LaundryServiceTypeOptions.WASH_AND_FOLD,
                    label: 'Wash and Fold',
                },
                {
                    key: LaundryServiceTypeOptions.WASH_AND_IRON,
                    label: 'Wash and Iron',
                },
            ],
            serviceOptions: [
                {
                    name: ServiceOptions.FOOD,
                    banner:
                        "https://res.cloudinary.com/eden-life-inc/image/upload/v1668608089/eden-for-business/food-service_v441qo.png",
                    thumbnail: "https://crm.edenlife.ng/img/meal.03c0d45a.png",
                    description:
                        "You get chef cooked meals delivered on schedule, and never worry about market runs or meal prep.",
                },
                {
                    name: ServiceOptions.LAUNDRY,
                    banner:
                        "https://res.cloudinary.com/eden-life-inc/image/upload/v1668608092/eden-for-business/laundry-service_pgvur4.png",
                    thumbnail:
                        "data:image/png;base64,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",
                    description:
                        "We pick up dirty clothes, clean with care, and deliver them in 48 hours or less.",
                },
                {
                    name: ServiceOptions.CLEANING,
                    banner:
                        "https://res.cloudinary.com/eden-life-inc/image/upload/v1668608096/eden-for-business/cleaning-service_k3y30z.png",
                    thumbnail:
                        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAviSURBVHgBzVgJbBzVGf7eHDvrtddeH1lfu3ES2znBxFgQCCExSlAIQaGih1ra0kpACqIgKlQBLVWpVKhKW5BKKWrVqlVRCoKqpahI4ShFNDIlJYSc5ICEgLEd2/Gu9965Xv/3ZmZt09gEQqWO9PRm5r157/u//3wD/J9fbK7Bgc9evTF3aqRLBWdlB0ynm0IZKJR5edvw4La/DQ8Xgrm9vb3zFEW51zTNFZqm3b179+5X8Slc2lyDBcW9R9GcNQ7nYApQtDksxjFYNDGWL5ZoymNdXV3GvNbm24q5/Hdb7HJdT42BZzKFHT095z6h66G7d+3a9R7+VwBtuIrrunAJoO1wmASwZLkoWBaKLq8Rc+rr6+6cGBv/wRWREG5uq0dIZeit1pUfDaWvLTvO+TRlGc7iUuYazHCXFRwHWdtrKdNGqmwjb1uwVNT0XdB3f3Zy8jvfrDNwG4FTaDUXHD1hHQ8l6xFX3e7ly5c+3NPTE8cnvNS5Bq9a3Hm9mUsnywIggZskcBNlCx+Ewkg1Nfa7mcl197XEtNUNtSi5HDu4g9dyGbQoKho1DeujVcqRgnnhoGnd1J5oNxSm7MzlchY+xjUngyVio0QMpgVz1MZKJlKWgz2MoaGQ0385fx6W1FQhRQIM1IZhLE/imtu/Cu1z6zFE34cVhu8Rs1uiRjSfL3x/XkPdJnzMa04GNy7pvCGTnkgI5k4VbYzoIezVDKxkNu5LNiNCbj3IXRxsi6GhK4nLv3gVEiu60LKoHaHONhzaexR1JNh5VSG0aQoGsqUr462tkdpo9I1UKlXG2QJc071o6+jJ0fYRi+NwTQzHbBufD6vY2tIIRiweoq8H5zdg/opurPvMRlTVx+CQM7nUIrEoms5dhH1HTyCSzqMjpKPX0EOvZvJreSh0Y1syOXJyZGQPzgZg34KF3xgaGW0bUkMYK5dxZ101NsTI3sir91apyC6Mo2f1+bhkcz/CNdVkLxzkxNJZFFJvuCaM+b2L8dbYBJz3x9BMdnkJefv+XDEyWiq1xufFnzx16pT5iQEum99x/SHTSbjE3A+b6tEVCSNLKt0frwZf2IyLLl+Dpat6CZZCzDnEnE29C4dsUoQnekXxU0ViWQdGdQXjh04gRnNXk8rHLDvxnuNc155sGyUt7ZsNw6yZpO/CvluLhdJPFxWLoW83NaCKbChFzLzbEUO0oxXrrupH84IEOGcE0AXdgLtBT416eU8CcQHeLOPY7kPY97vtaC85Mra+kCviyUIJ4arIKwf377+ctjXPiEFKWxdn8/kH17tOwy2N9VJtJ3SGkaVxNC9ZiMuu3oC65rhky3UdYsyVzRXsOR/qCbMjgTLUNdahafkCvHnoOCLZEjpDGuZTinojX2xram4eGB8ff2dOBimgJrSQdn9uMvPl63Rd2RCtpvjm4ljMgL24Fd09S7Bq/cXQq8I+O9xnDx9iTTRIlqaexQuaS1mokErjpT9sR2TPcVDmxASZxKP5EtKa9nx1VdWdb9L1XwATiURVU1PTu3Y2E/9WJIJOI0R5l+FYohbagjhWXrQSS/rOgUKGTmvOAAMBDt4zfHAeeEyBE5cAKGYSIDuXx87tAxh79jWQjmDR2G/zBRxTNYcsaeORI0f+PkPFmUzGbo8YhbtqoptbCMSkKAqWUKzrbEf/FZeia+VSaBT3yDlJ5Vz2CgkgelFIiHsmnz2ZhReLW/EUvGNiIr1h5OYKhZ32ziR4Sz0O730bMcJ+rqoK59r34pEjd0tJ8CEb7AtHDizQtS1D5VLz5MoONC9biHWbLkVjokXGNttxfXvjXrxzuW+H1AuvdbkkibvemLj3Gpd26E5/L1gmwPXNjTDnxfDc8wNoIa2FQ/qPt64d2/nUQQ/gjGpG1Hd6xN2g5XDR1ktX/2LV2hXJcHV1IMwM1U2p0r+fPs4FT4FNeu8Uees9V+ySGOOkrfj8RHbIsR74dyp14JHh0aexV85iHHOEmdTRFw7orLxcLsb82RIqmwE46F0fzIyLTxfMdybfVgWDQiviu+GR9FDf5hsTPqAZq8xWD7JwJMwZqU+Yj1BrYOyssi+TLHnLCbXboAKVbE8hYUQN6co5Qt3SULniM81kL0zDojFd16EZuuTVF51NB3lagE/97I4XUhOZ5TUG1fm00Ks7duL994ZlthCOYFOvqRr1tnwOkZps1UD/ZRejgXLw/jf34cDh43BEhiHgKo07cq5CrDlSiCjl9Np4En29SzE5mWv70pb+7Y8/8/IVvkorajotwPr6aG04HGJ6iJiguCXS1ZF/DEAjPdsunxJTMsrR3L0QSmsSpZIlwYjBo3onoquuqajWlU7iymyjUt0YP/p7HD8xhN7zFkPVNaYyFg0M4yNVzGkBh+o+k1vgli03qQmpyG28BcZ5/VDJuAVzQtXaPx9HeHCAAjrNNy06FtgSDFM0hKqj4L5Xy5Aujg9kdyq3JUl0wIJJ69umYFnlp8NyWoAy1ukaNSZDgUhTopTXqyKojsYqYkovpfrQW5lim6ZKmxKb2yRgmQ5X0hHEsHQILySppHzp2aRqneKh+E4yfcYACaLMo7BIxbaUXuRUSgDEkFMJFWIzyMrFKwosmmsRi949VeR5sxJ2OPc8VvQac6WLCaFty/YqodPyNxvAoKgjR2BB4KWFC0IdZGeSDWFPhDps2h6DIouQ6gXzgnGHVF4UYF3MSH9SMMYlODqjyG+YqkDT1DMHKFVIG7h+hSLAESaUTMqhpDaZex0vezA7yCDeXNu2JRDLEnMtPwj6a/oMhhQ/fzOPefEdn4XC0wK06FgpilAorjTIIBA37nwSbP9znvcyL4Up2TG4TVVB0pUeLzaVRSuxy/jMjcWjonhAVZorGBRbCcbPHKBp7qIVRBaJBEWnAKilBinFDMrQIuOV66U4tyEp1S5CiKwPqb+g2UJE2eWx7Ede5rOokUrLlklAvWigcMUkYfedMcBNN//kpvG3N61xHGuF48c9W5LpseFFUT6Vg+GnAWn44hcJQzF1EvnxIVkkKFILnlBeYmGkJRvR+ka5mBExhv7415dvPmOAPgomyyTFAyN/f/iqVeCp/Pz+btSoaRx8h1gSTiMOTWTsPSuXI9mRJHsM1Fbhr7K8GIvQGccwdBnWZrtmBUiGqwpHETlT2I3tZw1BkXBwYdRmfhTicGu7BnRhk77BR+g0F44Y06qemRWQd+vn6ukF7UcBfHjHlraCqSyzU8WDNGIoNkMgnljDCaoTv57bOZBCjry1a0lUThCxTVWlGFKNFVCYCjOBHYpwHaC1ean29l+v/nnHosYqjWmP37r+Ly8FmCq/Ph587sq7shN4P3fKfPHEYGYwnU0nRQAVTVYfrmeHQW+7XslUrSnwC37pIJYo5+kbi5oIObKf1rxx13u2vVYwyw3ZQvnWiZR1Q6bovHjvs1deOwPgHb/qb8oU3HuLRVOxii4yEyWFpKS8TwFU9Up3wZ4AZVKzyGMtcf5xuQQriKBkT2GDQZNNkb0qWzAGuZZ8Fveip2fhQJJtOok4FDZzaZONncg9+vUH1nZXVKxoyg0TJ4tGhH4+plN55CZLMi7JoCtqQqEGWduJhBF4o6c2IaEI4sw3Bce1fduadnDyyhnPPHx1B9WQNB2SspCl/z96FrmJMsqOVWtoxtdo+j0S4DuHUzGT/lxFag0U6PiXmyx7MY4884OTGXCjBt2rLpQH8OCq2BRtFKPzbnWsjnK3F/CYMmX0zPdgrgLBwc8Lorzi0yIfv713jMJODcwcFb50Xo7F+YEKg66l/rmQs28cHyo0lMslyo2U1gjwYLqEf+0+Lu0m0r5gWgnPg6grNxG/A8wyxxsHB1FH/2/q6sIyMAZO4lOHqaMCr8ATw2XK7+/uSaFlIYGL0G+7QusrTz+2+4kKwKcfen3nBVe3rSyW+Vdy6bzByDcyk4VzXnv92BfcaRtwTN+kwmWFLZIJ21/e8/rm9ee8FRx3CAwLPhWG7fLghOMd+sVwmYpCNWQM54sFHmZqrqRMPBYsPGuIHBvbEf3NI39qHJ4onL5QQ9FHNfPtqbyb3rZtWwaf0vUfx7Vm0ud2AsgAAAAASUVORK5CYII=",
                    description:
                        "You get more rest time, and leave the scrubbing to professional cleaners you can trust.",
                },
                {
                    name: ServiceOptions.BEAUTY,
                    banner:
                        "https://res.cloudinary.com/eden-life-inc/image/upload/v1668608101/eden-for-business/beauty-service_ht1adv.png",
                    thumbnail:
                        "https://res.cloudinary.com/eden-life-inc/image/upload/v1667898562/email-template/eden-beauty-service_h0fdwp.png",
                    description: "Get spa quality treatments at your fingertips.",
                },
            ]
        };
    },

});

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useServiceStore, import.meta.hot));
}