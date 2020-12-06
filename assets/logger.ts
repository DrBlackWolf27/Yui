import {
  Logger
} from 'https://deno.land/x/log/mod.ts'
export const logger = await Logger.getInstance() //creation en submodule

export class log {
  debug(data: string) {
    logger.debug(data)
  }
  info(data: string) {
    logger.info(data)
  }
  warning(data: string) {
    logger.warning(data)
  }
  error(data: string) {
    logger.error(data)
  }
  critical(data: string) {
    logger.critical(data)
  }
}