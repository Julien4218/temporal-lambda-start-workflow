# temporal-lambda-start-workflow

This is a nodejs aws/lambda that can be used to start a temporal workflow.

## build

```bash
rm *.zip
zip -r start-workflow.zip .
```

Then upload to Lambda and set the Handler to `index.handler`

## testing

use a lambda event with the following schema

```json
{
    "workflow" :{
        "name": "MyWorkflowDefinition",
        "queue": "MyTaskQueueName",
        "input": {
            "field1": "value1"
        }
    }
}
```