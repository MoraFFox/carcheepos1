// Image assets - ensure paths are correct relative to this utils file
// or consider passing the full image objects/paths if they are dynamic
import audiImg from "../assets/audi.webp"; // Prioritize WebP
import bmwImg from "../assets/bmw.webp"; // Prioritize WebP
import fordImg from "../assets/ford.webp"; // Prioritize WebP
import mercedesImg from "../assets/mercedes.webp"; // Prioritize WebP
import teslaImg from "../assets/tesla.webp"; // Prioritize WebP
import chevroletImg from "../assets/chevrolet.webp";
import gmcImg from "../assets/gmc.webp";
import hyundaiImg from "../assets/hyundai.webp";
import isuzuImg from "../assets/isuzu.webp";
import kiaImg from "../assets/kia.webp";
import mitsubishiImg from "../assets/mitsubishi.webp";
import porscheImg from "../assets/porsche.webp";
import seatImg from "../assets/seat.webp";
import subaruImg from "../assets/subaru.webp";
import volkswagenImg from "../assets/Volkswagen.webp";
import cheryImg from "../assets/chery.webp"; // New brand
import jeepImg from "../assets/jeep.webp"; // New brand
import lexusImg from "../assets/lexus.webp"; // New brand
import nissanImg from "../assets/nissan.webp"; // New brand
import toyotaImg from "../assets/toyota.webp"; // New brand
import genericImg from "../assets/generic1.webp"; // Prioritize WebP

// Fallback pngs
import audipng from "../assets/audi.png";
import bmwpng from "../assets/bmw.png";
import fordpng from "../assets/ford.png";
import mercedespng from "../assets/mercedes.png";
import teslapng from "../assets/tesla.png";
import chevroletpng from "../assets/chevrolet.png";
import gmcpng from "../assets/gmc.png";
import hyundaipng from "../assets/hyundai.png";
import isuzupng from "../assets/isuzu.png";
import kiapng from "../assets/kia.png";
import mitsubishipng from "../assets/mitsubishi.png";
import porschepng from "../assets/porsche.png";
import seatpng from "../assets/seat.png";
import subarupng from "../assets/subaru.png";
import volkswagenpng from "../assets/Volkswagen.png";
import cherypng from "../assets/chery.png"; // New brand
import jeeppng from "../assets/jeep.png"; // New brand
import lexuspng from "../assets/lexus.png"; // New brand
import nissanpng from "../assets/nissan.png"; // New brand
import toyotapng from "../assets/toyota.png"; // New brand
import genericpng from "../assets/generic1.png";

export const getCarImage = (manufacturer) => {
  const supportsWebP = (() => {
    const elem = document.createElement("canvas");
    if (!!(elem.getContext && elem.getContext("2d"))) {
      return elem.toDataURL("image/webp").indexOf("data:image/webp") == 0;
    }
    return false;
  })();

  if (!manufacturer) return supportsWebP ? genericImg : genericpng;
  const lowerCaseManufacturer = String(manufacturer).toLowerCase();
  if (supportsWebP) {
    switch (lowerCaseManufacturer) {
      case "audi":
        return audiImg;
      case "bmw":
        return bmwImg;
      case "ford":
        return fordImg;
      case "mercedes-benz":
      case "mercedes":
        return mercedesImg;
      case "tesla":
        return teslaImg;
      case "chevrolet":
        return chevroletImg;
      case "gmc":
        return gmcImg;
      case "hyundai":
        return hyundaiImg;
      case "isuzu":
        return isuzuImg;
      case "kia":
        return kiaImg;
      case "mitsubishi":
        return mitsubishiImg;
      case "porsche":
        return porscheImg;
      case "seat":
        return seatImg;
      case "subaru":
        return subaruImg;
      case "volkswagen":
        return volkswagenImg;
      case "chery": // New brand
        return cheryImg;
      case "jeep": // New brand
        return jeepImg;
      case "lexus": // New brand
        return lexusImg;
      case "nissan": // New brand
        return nissanImg;
      case "toyota": // New brand
        return toyotaImg;
      default:
        return genericImg;
    }
  } else {
    switch (lowerCaseManufacturer) {
      case "audi":
        return audipng;
      case "bmw":
        return bmwpng;
      case "ford":
        return fordpng;
      case "mercedes-benz":
      case "mercedes":
        return mercedespng;
      case "tesla":
        return teslapng;
      case "chevrolet":
        return chevroletpng;
      case "gmc":
        return gmcpng;
      case "hyundai":
        return hyundaipng;
      case "isuzu":
        return isuzupng;
      case "kia":
        return kiapng;
      case "mitsubishi":
        return mitsubishipng;
      case "porsche":
        return porschepng;
      case "seat":
        return seatpng;
      case "subaru":
        return subarupng;
      case "volkswagen":
        return volkswagenpng;
      case "chery": // New brand
        return cherypng;
      case "jeep": // New brand
        return jeeppng;
      case "lexus": // New brand
        return lexuspng;
      case "nissan": // New brand
        return nissanpng;
      case "toyota": // New brand
        return toyotapng;
      default:
        return genericpng;
    }
  }
};
