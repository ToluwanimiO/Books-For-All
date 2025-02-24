import useSupport from "./support";

export default function useStrings() {
    const { formatName, formatText } = useSupport();

    const stringTrim = (text: string) => {
        if (!text) {
            return "";
        }
        return text.trimStart().trimEnd().toLowerCase();
    }

    const formatQueryText = (text: string) => {
        if (!text) {
            return "";
        }
        return text
            .trimStart()
            .trimEnd()
            .replace(/[^a-zA-Z0-9 ]/g, "")
            .toLowerCase();
    }

    const formatQueryHighlight = (type: string, text: string, query: string) => {
        if (query === "") {
            return type === "name" ? formatName(text) : text;
        }

        let lText = text.toLowerCase();
        let lQuery = formatQueryText(query);

        let startsWith = lText.startsWith(lQuery);
        let substring = lText.includes(lQuery);

        if (startsWith) {
            return lText.replace(
                lQuery,
                '<span class="highlighted">' + formatText(lQuery) + "</span>"
            );
        } else if (substring) {
            return text.replace(
                lQuery,
                '<span class="highlighted">' + lQuery + "</span>"
            );
        } else {
            return text;
        }
    }

    const formatFullName = ({ firstname, lastname }: { firstname: string; lastname: string; }) => {
        if (!firstname) {
            return "";
        }
        return formatText(firstname) + " " + formatText(lastname);
    }

    const formatDeletedEmail = (email: string) => {
        if (!email) {
            return "";
        }
        if (email.includes('deleted_account')) {
            let emailIndex = email.indexOf("_", "deleted_account_".length);
            let newEmail = email.slice(emailIndex + 1);
            return newEmail;
        }
        return email
    }

    const formatArrayToString = ({ data, property, separator = ", " }: any) => {
        if (!data.length) {
            return "-";
        }
        return data.reduce((acc: any, item: any, index: number) => {
            return (
                acc +
                (property ? item[property] : item) +
                (index + 1 === data.length ? "" : separator)
            );
        }, "");
    }

    return {
        stringTrim,
        formatQueryText,
        formatQueryHighlight,
        formatFullName,
        formatDeletedEmail,
        formatArrayToString
    }

}
