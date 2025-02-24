import { ref } from "vue";

const CLOUDINARY = "https://res.cloudinary.com/eden-life-inc/image/upload";
const IMAGE = `${CLOUDINARY}/w_500,f_jpg,q_auto/v1610021885/lighthouse/mealImages/NO_IMAGE_zweij9.png`;

export default function useImage() {

  const getImage = (path: string) => {
    const image = ref<string>();

    if (path?.indexOf("http") < 0) {
      image.value = new URL("/img/" + path, import.meta.url).href;
    }

    return image.value;
  }

  const getCountryFlag = (path: string) => {
    if (!path) {
      return "";
    }
    return getImage('flags/' + path);
  }

  /**
 * Get and set image representation for a service;
 * @param service
 * @returns {*|string}
 */
  const getServiceImage = (service: string) => {
    return service ? getImage(`services/${service}.png`) : IMAGE;
  }

  return { getImage, getCountryFlag, getServiceImage };
}
