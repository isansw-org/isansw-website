import pino from "pino";

export type StandardActionResponse = {
  success: boolean;
  message: string;
};

export const GenericUnexpectedErrorResponse: StandardActionResponse = {
  success: false,
  message: "Something went wrong...",
};

export function ErrorResponse(message: string): StandardActionResponse {
  return {
    success: false,
    message,
  };
}

export function SuccessResponse(message: string): StandardActionResponse {
  return {
    success: true,
    message,
  };
}

export function defaultErrorResponseHandler(params: {
  error: unknown;
  logger?: pino.Logger<never, boolean>;
}): StandardActionResponse {
  if (params.error instanceof Error) {
    if (params.logger) {
      params.logger.error(params.error.message);
    }

    return ErrorResponse(params.error.message);
  }

  return GenericUnexpectedErrorResponse;
}
