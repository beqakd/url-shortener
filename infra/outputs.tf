output "ecr_repository_url" {
  value = aws_ecr_repository.url-shortener-ecr.repository_url
  description = "ECR repo URL for docker push"
}