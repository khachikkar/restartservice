import {TELNUM} from "../constants/constants";
export const handleClick = () => {
    window.location.href = `tel:${TELNUM.num}`;
};