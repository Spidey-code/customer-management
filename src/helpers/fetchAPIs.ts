import { BadRequestError } from "./ApiError";

export const addressFetch = (async (pincode: number) => {
    const response = await (await fetch(`https://api.postalpincode.in/pincode/${pincode}`));
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    const data = await response.json();
    const postOfficeArr = data[0].PostOffice;
    console.log(postOfficeArr);
    if(!postOfficeArr) throw new BadRequestError('Not valid pincode')
      console.log(postOfficeArr);
    return postOfficeArr[postOfficeArr.length-1];
})