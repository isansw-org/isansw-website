export type StandardActionResponse = {
  success: boolean;
  message: string;
};

export const GenericUnexpectedErrorResponse: StandardActionResponse = {
  success: false,
  message: "Something went wrong...",
};

export function defaultErrorResponseHandler(
  error: unknown
): StandardActionResponse {
  if (error instanceof Error) {
    return {
      success: false,
      message: error.message,
    };
  }

  return GenericUnexpectedErrorResponse;
}

export function SuccessResponse(message: string): StandardActionResponse {
  return {
    success: true,
    message,
  };
}
