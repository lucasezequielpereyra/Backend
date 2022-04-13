import { Router } from 'express';
const router = Router();

router.get('/', (req, res) => {
  res.send(
    `SO: ${process.platform} \n NODE: ${process.version} \n RESERVED MEMORY: ${
      process.memoryUsage().rss
    } \n EXECUTION PATH${process.execPath} \n PID: ${
      process.pid
    } \n PROJECT DIRECTORY: ${process.cwd()} \n ENTRY ARGUMENTS: ${
      process.argv
    }`,
  );
});

export default router;
