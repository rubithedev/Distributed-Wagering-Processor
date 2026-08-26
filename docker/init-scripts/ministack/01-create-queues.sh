#!/bin/bash

set -e

# It does something like this:
#   - Creates DLQ.
#   - Creates main FIFO queue and sets the DLQ as it's DLQ.

DLQ_URL=$(aws sqs get-queue-url \
  --queue-name wager-transactions.dlq.fifo \
  --query 'QueueUrl' \
  --output text)

DLQ_ARN=$(aws sqs get-queue-attributes \
  --queue-url "$DLQ_URL" \
  --attribute-names QueueArn \
  --query 'Attributes.QueueArn' \
  --output text)

aws sqs set-queue-attributes \
  --queue-url "$(awslocal sqs get-queue-url \
    --queue-name wager-transactions.fifo \
    --query 'QueueUrl' \
    --output text)" \
  --attributes "{\"RedrivePolicy\":\"{\\\"deadLetterTargetArn\\\":\\\"$DLQ_ARN\\\",\\\"maxReceiveCount\\\":5}\"}"
