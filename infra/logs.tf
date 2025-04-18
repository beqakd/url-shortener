# logs.tf# Set up CloudWatch group and log stream and retain logs for 30 days
resource "aws_cloudwatch_log_group" "url_shortener_log_group" {
  name              = "/ecs/${local.stage}/url-shortener"
  retention_in_days = 30
  tags = {
    Name  = "url-shortener"
    Stage = "${local.stage}"
  }
}
