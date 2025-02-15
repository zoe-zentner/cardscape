import axios from 'axios';

const BASE_URL = 'https://cardscape.uk:2033/'; // Replace localhost with your actual local IP

export const getProducts = async (token: string) => {
  try {
    // console.log(`Making API call to: ${BASE_URL}/products?token=${token}`); // Log URL for verification
    const response = await axios.get(`${BASE_URL}/products`, {
      params: { token }, // Pass token as a query parameter
    });
    // console.log('Server response in getProducts:', response.data); // Log the server response
    return response.data; // Return the data from the server
  } catch (error) {
    console.error('Error in getProducts:', error); // Log error if the API call fails
    throw error; // Rethrow the error for handling in the calling component
  }
};

export const getCategories = async (token: string) => {
  try {
    // console.log(`Making API call to: ${BASE_URL}/categories?token=${token}`); // Log URL for verification
    const response = await axios.get(`${BASE_URL}/categories`, {
      params: { token }, // Pass token as a query parameter
    });
    // console.log('Server response in getCategories:', response.data); // Log the server response
    return response.data; // Return the data from the server
  } catch (error) {
    console.error('Error in getCategories:', error); // Log error if the API call fails
    throw error; // Rethrow the error for handling in the calling component
  }
};

export const getUser = async (token: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/user`, {
      params: { token }, // Pass token as a query parameter
    });
    return response.data; // Return the data from the server
  } catch (error) {
    console.error('Error in authenticate:', error); // Log error if the API call fails
    throw error; // Rethrow the error for handling in the calling component
  }
};