export const handleApiError = (error: any) => {
  if (
    error.response &&
    error.response.data &&
    typeof error.response.data.detail === "string"
  ) {
    return error.response.data.detail;
  }

  if (error.response?.data?.title) {
    return error.response.data.title;
  }

  return "Đã xảy ra lỗi không xác định.";
};
