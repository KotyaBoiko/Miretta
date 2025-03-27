import capsImg from "@/assets/img/Collections/caps.jpg";
import hoodiesImg from "@/assets/img/Collections/hoodies.jpg";
import pantsImg from "@/assets/img/Collections/pants.jpg";
import pantsAdditionalImg from "@/assets/img/Collections/pants_additional.jpg";
import shirtImg from "@/assets/img/Collections/shirts&tops.jpg";
import shirtAdditionalImg from "@/assets/img/Collections/shirts&tops_additional.jpg";
import { COMMON_ROUTES_NAMES } from "@/router/common/commonRoutesNames";
import { TCollection } from "../type";

export const collections: TCollection[] = [
  {
    title: "SHIRTS, T-SHIRTS & POLO SHIRTS",
    description:
      "Discover a wide variety of T-shirts and shirts, combining comfort with modern design. From casual wear to statement pieces, find your perfect match in our versatile collection.",
    mainImg: shirtImg,
    additionalImg: shirtAdditionalImg,
    variant: "left",
    link: COMMON_ROUTES_NAMES.Category + `/${'tops'}`,
  },
  {
    title: "PANTS",
    description:
      "Browse our range of pants, designed for every occasion. Whether you're dressing up or keeping it casual, our collection ensures style and functionality.",
    mainImg: pantsImg,
    additionalImg: pantsAdditionalImg,
    variant: "right",
    link: COMMON_ROUTES_NAMES.Category + `/${'bottoms'}`,
  },
  {
    title: "HOODIES, SWEATSHIRTS & SWEATERS",
    description:
      "Stay warm and stylish with our hoodies and outerwear. Perfect for layering, our selection offers both comfort and contemporary aesthetics for any season.",
    mainImg: hoodiesImg,
    variant: "left",
    link: COMMON_ROUTES_NAMES.Category + `/${'sweaters'}`,
  },
  {
    title: "CAPS",
    description:
      "Explore our collection of stylish caps that add the perfect finishing touch to any outfit. Designed for comfort and fashion, our range includes classic and modern styles.",
    mainImg: capsImg,
    variant: "center",
    link: COMMON_ROUTES_NAMES.Category + `/${'caps'}`,
  },
];