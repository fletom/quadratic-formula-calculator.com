S3_BUCKET_NAME='quadratic-formula-calculator.com'

cd src

aws s3 sync \
	./ s3://$S3_BUCKET_NAME \
	--acl 'public-read' \
	--delete
