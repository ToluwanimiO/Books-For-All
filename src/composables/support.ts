

import { useAuthStore } from "@/store/auth";
import { storeToRefs } from "pinia";
import {computed} from "vue";


export default function useSupport() {
	const authStore = useAuthStore();
  	const { companyProfile } = storeToRefs(authStore);

	const location = computed(() => companyProfile.value.country.code);

	// const LOCATION = localStorage.getItem("eden-crm-location");

	const formatPdfPrice = (value: string) => {
		const valueToInt = parseInt(value);
		return valueToInt ? `N${Number(valueToInt).toLocaleString()}.00` : "₦0";
	}

	const formatPrice = (value: string) => {
		const valueToInt = parseInt(value);
		const valuePrefix = location.value === "NG" ? "₦" : "KES";
		const valueToString = valueToInt
			? `${Number(valueToInt).toLocaleString()}.00`
			: "0";
		return `${valuePrefix}${valueToString}`;
	}

	const formatFigure = (value: string) => {
		const valueToInt = parseInt(value);
		return valueToInt >= 0 ? Number(valueToInt).toLocaleString() : "-";
	}

	const formatPercentage = (value: string) => {
		const valueToInt = parseInt(value);
		return valueToInt >= 0 ? `${Number(valueToInt)}%` : "-";
	}

	const formatName = (name: string) => {
		if (name) {
			const names = name.split(" ");
			let newName = [];
			for (let i = 0; i < names.length; i++) {
				newName.push(
					names[i].charAt(0).toUpperCase() + names[i].substr(1).toLowerCase()
				);
			}
			return newName.join(" ");
		}
		return "-";
	}

	const formatToTitleCase = (sentence: string) => {
		if (sentence) {
			const words = sentence.includes("-")
				? sentence.split("-")
				: sentence.split(" ");
			let newSentence = [];
			for (let i = 0; i < words.length; i++) {
				newSentence.push(
					words[i].charAt(0).toUpperCase() + words[i].substr(1).toLowerCase()
				);
			}
			return newSentence.join(" ");
		}
		return "-";
	}

	const formatText = (text: string) => {
		return text
			? text.trim().charAt(0).toUpperCase() +
			text.trim().substr(1).toLowerCase()
			: "-";
	}

	const formatArrayToText = (data: string[]) => {
		return data
			.map((item: string) => formatText(item))
			.toString()
			.split(",")
			.join(", ");
	}

	const formatPhoneNumber = (number: string) => {
		if (!number) {
			return "-";
		}
		if (number.includes('+234') || number.includes('+254')) {
			return number
		}
		let numberAsString = `${number}`;
		let code = location.value === "KE" ? "254" : "234";
		numberAsString =
			numberAsString.charAt(0) === "2"
				? numberAsString
				: `${code}${numberAsString}`;
		return location.value === "KE"
			? numberAsString.replace(/(\d{3})(\d{3})(\d{6})/, "+$1 $2 $3")
			: numberAsString.replace(
				/(\d{3})(\d{3})(\d{3})(\d{4})/,
				"+$1 $2 $3 $4"
			);
	}

	const formatCurrency = () => {
		return location.value === "NG" ? "₦" : "KES";
	}

	const formatDebitCard = (bin: string, last4: string) => {
		return `${bin.toString().substring(0, 4)} ${bin
			.toString()
			.substring(4, 7)}XX XXXX ${last4}`;
	}

	const formatPersona = (persona: string) => {
		const customerPersona = persona ? persona.toLowerCase() : null;
		switch (customerPersona) {
			case "regular":
				return "Regular";
			case "humaan":
				return "Eden Humaan";
			case "careclub":
				return "Care Club Member";
			default:
				return "-";
		}
	}

	const formatPaymentGateway = (gateway: string) => {
		switch (gateway) {
			case "paystack":
				return "Paystack";
			case "flutterwave":
				return "Flutterwave";
			case "direct_bank_transfer":
				return "Bank Transfer";
			default:
				return "-";
		}
	}

	const formatSlug = (text: string) => {
		if (text.toLowerCase().includes("standard")) {
			return "light-cleaning";
		}
		let slug = "";
		slug = text.toLowerCase();
		// Trim the last whitespace
		slug = slug.replace(/\s*$/g, "");
		// Change whitespace to "-"
		slug = slug.replace(/\s+/g, "-");
		// Change forward slash to "-"
		slug = slug.replace("/", "-");

		return slug;
	}

	const unformatSlug = (text: string) => {
		return formatToTitleCase(text);
	}

	const sortList = (data: any[], property: string, direction = "asc") => {
		let sortedData = property
			? data.sort((a, b) => (a[property] < b[property] ? -1 : 1))
			: data.sort((a, b) => (a < b ? -1 : 1));
		return direction === "asc" ? sortedData : sortedData.reverse();
	}

	return {
		formatText,
		formatPdfPrice,
		formatPrice,
		formatFigure,
		formatPercentage,
		formatName,
		formatToTitleCase,
		formatArrayToText,
		formatPhoneNumber,
		formatCurrency,
		formatDebitCard,
		formatPersona,
		formatPaymentGateway,
		formatSlug,
		unformatSlug,
		sortList
	}
}




