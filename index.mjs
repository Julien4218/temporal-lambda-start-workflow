import { Connection, Client } from '@temporalio/client';
import { v4 as uuidv4 } from 'uuid';

async function run(jsonData) {
  console.log(`Starting run function with server port ${process.env.TEMPORAL_HOSTPORT}`)
    // Connect to the default Server location
    const connection = await Connection.connect({ 
      address: process.env.TEMPORAL_HOSTPORT,
    });
  
    const client = new Client({
      connection,
      // namespace: 'foo.bar', // connects to 'default' namespace if not specified
    });

    const workflowName = jsonData.workflow.name
    const workflowInput = jsonData.workflow.input

    const id = uuidv4()
    const workflowID = `${workflowName}-${id}`
    const queueName = `${workflowName}-Queue`

    const wfClient = client.workflow
    const handle = await wfClient.start(workflowName, {
      workflowId: workflowID,
      taskQueue: queueName,
      args: [workflowInput],
    });
    console.log(`Started workflow ${handle.workflowId}`);
  };

  export const handler = async (event, context) => {
    const jsonString = JSON.stringify(event)
    console.log("EVENT:" + jsonString);
    console.log("calling run now")
    await run(event)
    console.log("run completed, exiting")
    return context.logStreamName;
  }

  // handler(JSON.parse(process.argv[2]), '').catch((err) => {
  //   console.error(err);
  //   process.exit(1);
  // });
