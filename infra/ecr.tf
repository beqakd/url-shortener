resource "aws_ecr_repository" "url-shortener-ecr" {
  name = "${var.project_name}-${local.stage}-ecr"

  image_scanning_configuration {
    scan_on_push = true
  }

  encryption_configuration {
    encryption_type = "KMS"
  }
}
