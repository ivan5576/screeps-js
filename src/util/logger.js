const LoggerLevel = {
  error: 0x01,
  warn: 0x02,
  info: 0x03,
  debug: 0x04,
};

const DEFAULT_LOGGER_LEVEL = LoggerLevel.debug;

const LOGGER_COLORS = {
  [LoggerLevel.debug]: "#3498DB",
  [LoggerLevel.info]: "#7F8C8D",
  [LoggerLevel.warn]: "#FFC300",
  [LoggerLevel.error]: "#FF5733",
};

const HIGHLIGHT_COLOR = "#542F33";

const createLogger = (loggerContext, loggerLevel = DEFAULT_LOGGER_LEVEL) => {
  const filterSettings = {
    phrases: [],
  };

  const log = (level, ...messages) => {
    if (level <= loggerLevel) {
      if (filterSettings.phrases.length) {
        const message = messages.join(" ");

        if (!filterSettings.phrases.some((phrase) => message.includes(phrase))) {
          return;
        }
      }

      let args = [
        loggerContext ? `<span style='font-size:10px; color:#999;'>[${loggerContext}]</span>` : undefined,
        ...messages.map((message) => {
          return `<span style='color:${LOGGER_COLORS[level]};'>${typeof message === "object" ? JSON.stringify(message, null, 3) : message
            }</span>`;
        }),
      ].filter(Boolean);

      if (filterSettings.phrases.length) {
        args = args.map((arg) => {
          if (typeof arg === "string") {
            return arg.replace(
              new RegExp(`(${filterSettings.phrases.join("|")})`, "g"),
              `<span style='background-color:${HIGHLIGHT_COLOR};'>$1</span>`
            );
          }

          return arg;
        });
      }

      if (args.length) console.log(...args);
    }
  };

  const filter = (...args) => {
    if (args.length === 0) {
      filterSettings.phrases = [];
    } else if (args.length === 1 && typeof args[0] === "string") {
      filterSettings.phrases = [args[0]];
    } else if (Array.isArray(args[0])) {
      filterSettings.phrases = args;
    } else {
      const { phrases } = args[0];

      if (phrases) {
        filterSettings.phrases = phrases;
      }
    }
  };

  return {
    filter,
    log,
    debug: log.bind(undefined, LoggerLevel.debug),
    info: log.bind(undefined, LoggerLevel.info),
    warn: log.bind(undefined, LoggerLevel.warn),
    error: log.bind(undefined, LoggerLevel.error),
  };
};

export const logger = createLogger();

// Usage example:
// logger.log(LoggerLevel.debug, "Debug message");
// logger.info("Informational message");
// logger.warn("Warning message");
// logger.error("Error message");
