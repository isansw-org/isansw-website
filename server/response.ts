import { error } from "console";
import pino from "pino";

export type StandardActionResponse = {
  success: boolean;
  message: string;
};

export const GenericUnexpectedErrorResponse: StandardActionResponse = {
  success: false,
  message: "Something went wrong...",
};

export function defaultErrorResponseHandler(params: {
  error: unknown;
  logger: pino.Logger<never, boolean>;
}): StandardActionResponse {
  if (params.error instanceof Error) {
    params.logger.error(params.error.message);

    return {
      success: false,
      message: params.error.message,
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
