import winston from "winston";
import config from "./config.js";

// export const logger = winston.createLogger({
//   level: "http",
//   transports: [
//     new winston.transports.Console({
//       level: "http",
//       format: winston.format.combine(
//         winston.format.colorize(),
//         winston.format.simple()
//       ),
//     }),
//     new winston.transports.File({
//         filename: "./errors.log",
//         level: "error",
//         format: winston.format.combine(
//             winston.format.timestamp(),
//             winston.format.prettyPrint(),
//         )
//     })
//   ],
// });

const customLevel = {
  levels: {
    fatal: 0,
    error: 1,
    warning: 2,
    info: 3,
    http: 4,
    debug: 5,
  },
  colors: {
    fatal: "red",
    error: "yellow",
    warning: "green",
    info: "blue",
    http: "magenta",
    debug: "gray",
  },
};

// export const logger = winston.createLogger({
//   levels: customLevel.levels,
//   transports: [
//     new winston.transports.Console({
//       level: "http",
//       format: winston.format.combine(
//         winston.format.colorize({ colors: customLevel.colors }),
//         winston.format.simple()
//       ),
//     }),
//     new winston.transports.File({
//         filename: "./errors.log",
//         level: "http",
//         format: winston.format.combine(
//             winston.format.timestamp(),
//             winston.format.prettyPrint(),
//         )
//     })
//   ],

// });

export let logger;

if (config.environment === "development") {
  logger = winston.createLogger({
    levels: customLevel.levels,
    transports: [
      new winston.transports.Console({
        level: "debug",
        format: winston.format.combine(
          winston.format.colorize({ colors: customLevel.colors }),
          winston.format.simple()
        ),
      }),
    ],
  });
} else {
  logger = winston.createLogger({
    levels: customLevel.levels,
    transports: [
      new winston.transports.File({
        filename: "./errors.log",
        level: "info",
        format: winston.format.combine(
          winston.format.timestamp(),
          winston.format.prettyPrint()
        ),
      }),
    ],
  });
}
