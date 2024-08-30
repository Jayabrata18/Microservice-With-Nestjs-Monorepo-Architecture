import { createLogger, format, transports } from 'winston';
import util from 'util';
import {
  ConsoleTransportInstance,
  FileTransportInstance,
} from 'winston/lib/winston/transports';
import { EApplicationEnviorment } from '../constants/application';
import config from '../config/config';
import path from 'path';
import * as sourceMapSupport from 'source-map-support';
import { blue, red, yellow, green, magenta } from 'colorette';
import moment from 'moment-timezone';
// import 'winston-mongodb';
// import { MongoDBTransportInstance } from 'winston-mongodb';

sourceMapSupport.install();

const colorizelevel = (level: string) => {
  switch (level) {
    case 'INFO':
      return blue(level);
    case 'WARN':
      return yellow(level);
    case 'ERROR':
      return red(level);
    default:
      return level;
  }
};

const consoleLogFormat = format.printf((info) => {
  const { level, message, timestamp, meta = {} } = info;
  const customLevel = colorizelevel(level.toUpperCase());
  const customTimestamp = green(
    moment(timestamp).tz('Asia/Kolkata').format('DD-MM-YYYY HH:mm:ss'),
  );
  const customMessage = message;
  const customMeta = util.inspect(meta, {
    depth: null,
    colors: true,
    compact: true,
    showHidden: true,
  });
  const customlog = `${customLevel} [${customTimestamp}] ${customMessage}\n${magenta('META')}: ${customMeta}\n`;
  return customlog;
});
const consoleTransport = (): Array<ConsoleTransportInstance> => {
  if (config.ENV === EApplicationEnviorment.DEVELOPMENT) {
    return [
      new transports.Console({
        level: 'info',
        format: format.combine(format.timestamp(), consoleLogFormat),
        handleExceptions: true,
      }),
    ];
  }
  return [];
};
const FileLogFormat = format.printf((info) => {
  const { level, message, timestamp, meta = {} } = info;
  const logMeta: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(meta)) {
    if (value instanceof Error) {
      logMeta[key] = {
        name: value.name,
        message: value.message,
        stack: value.stack,
        trace: value.stack || '',
      };
    } else {
      logMeta[key] = value;
    }
  }
  const logData = {
    level: level.toUpperCase(),
    message,
    timestamp: timestamp.slice(0, 19).replace('T', ' '),
    meta: logMeta,
  };
  return JSON.stringify(logData, null, 4);
});

const FileTransport = (): Array<FileTransportInstance> => {
  return [
    new transports.File({
      filename: path.join(
        __dirname,
        '../',
        '../',
        '../',
        'logs',
        `${config.ENV}.log`,
      ),
      level: 'info',
      format: format.combine(format.timestamp(), FileLogFormat),
      handleExceptions: true,
    }),
  ];
};

// const MongodbTransport = (): Array<MongoDBTransportInstance> => {
//   return [
//     new transports.MongoDB({
//       level: 'info',
//       db: config.MONGODB_DATABASE_URL as string,
//       format: format.combine(format.timestamp(), FileLogFormat),
//       metaKey: 'meta',
//       expireAfterSeconds: 3600 * 24 * 30,
//       capped: true,
//       collection: 'application-logs',
//       options: {
//         useUnifiedTopology: true,
//         useNewUrlParser: true,
//         // useFindAndModify: false
//       },
//     }),
//   ];
// };
export default createLogger({
  defaultMeta: {
    meta: {
      application: 'nestjs Microservices',
      service: 'api',
    },
  },
  transports: [
    ...FileTransport(),
    // ...MongodbTransport(),
    ...consoleTransport(),
  ],
});
