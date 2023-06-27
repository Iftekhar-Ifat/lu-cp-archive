import { ratingColors } from '../colors';

const getRatingColor = number => {
    if (number >= 2900) {
        return ratingColors.red;
    } else if (number >= 2600) {
        return ratingColors.red;
    } else if (number >= 2400) {
        return ratingColors.red;
    } else if (number >= 2300) {
        return ratingColors.orange;
    } else if (number >= 2200) {
        return ratingColors.orange;
    } else if (number >= 1900) {
        return ratingColors.violet;
    } else if (number >= 1600) {
        return ratingColors.blue;
    } else if (number >= 1400) {
        return ratingColors.cyan;
    } else if (number >= 1200) {
        return ratingColors.green;
    } else {
        return ratingColors.gray;
    }
};

export { getRatingColor };
