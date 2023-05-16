#!/bin/sh

DIR="/etc/localstack/init/ready.d"

if [ ! -f .initialized ]; then
    echo "Initializing container"

    pwd
    ls $DIR

    echo "Creating 'next-auth' table"
    awslocal cloudformation create-stack \
        --stack-name test \
        --template-body file://$DIR/next-auth.yaml 
    touch .initialized
fi

exec "$@"



# export  AWS_DEFAULT_REGION=eu-north-1
# export AWS_ACCESS_KEY_ID=local-access-key
# export AWS_SECRET_ACCESS_KEY=local-secret-key

# HOSTNAME="dynamo"
# PORT="8000"
# TABLE_NAME="Users"
# TABLE_EXISTS=$(aws dynamodb describe-table --table-name ${TABLE_NAME} --endpoint-url http://${HOSTNAME}:${PORT} 2>&1)

# if [[ ${TABLE_EXISTS} == *"Cannot do operations on a non-existent table"* ]]
# then
#     aws cloudformation create-stack \
#         --stack-name test \
#         --template-body file:///db/next-auth.yaml \
#         --endpoint-url http://${HOSTNAME}:${PORT} \
#         --debug

#     # aws dynamodb create-table \
#     #     --cli-input-json file:///db/users.json \
#     #     --endpoint-url http://${HOSTNAME}:${PORT} \
#     #     &&
#     #     echo "'Users' table created successfully"

#     # aws dynamodb update-time-to-live \
#     #     --table-name $TABLE_NAME \
#     #     --time-to-live-specification 'Enabled=true, AttributeName=expires' \
#     #     && echo "Set TTL"
# else
#     echo "Table already exists"
# fi
