import ServerAPI from './src/classes/servers/ServerAPI';
import Cron from './src/classes/crons/Cron';

ServerAPI().start();

// SCRIPTS
const cron = Cron();
cron.closeCourseTokensAccess().start();