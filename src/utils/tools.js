export async function requestHandler(request) {
  //no catching when request is get to trigger react query error
  try {
    const response = await request;
    return response.data;
  } catch (error) {
    if (error.config.method === "get") {
      //throw error;
    }

    if (error.response) {
      return error.response.data;
    }
    return { success: false };
  }
}

export function updateQueryData(oldData, newData, key) {
  try {
    if (!oldData?.success) return oldData;
    if (typeof newData === "function") {
      return {
        ...oldData,
        data: { ...oldData.data, [key]: newData(oldData.data[key]) },
      };
    }
    return { ...oldData, data: { ...oldData.data, [key]: newData } };
  } catch (err) {
    console.log(err);
    return oldData;
  }
}

export function getTimezone() {
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  return timezone;
}
