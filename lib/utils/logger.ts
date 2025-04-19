import pino from "pino";
import pinoPretty from "pino-pretty";

export const logger = pino(
  { level: "debug" },
  pinoPretty({
    colorize: true, // ANSI colours
    levelFirst: true, // e.g. “INFO …”
    translateTime: "SYS:standard", // human timestamps
  })
);
