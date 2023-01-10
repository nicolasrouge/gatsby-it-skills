export const stringToNumber = (str: string): number => {
    // Use the replace method to remove the £ and , characters from the string
    const strippedStr = str.replace('£', '').replace(',', '');
  
    // Use the parseInt function to convert the string to a number
    return parseInt(strippedStr, 10);
  };