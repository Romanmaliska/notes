export const fetchData = async (input: RequestInfo, init?: RequestInit) => {
  const response = await fetch(input, init);

  if (response.ok) return response;

  const errorBody = await response.json();
  const errorMessage = errorBody.error;
  throw Error(errorMessage);
};
