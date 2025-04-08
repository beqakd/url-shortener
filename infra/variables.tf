variable "aws_region" {
  type    = string
  default = "eu-central-1"
}

variable "project_name" {
  type    = string
  default = "url-shortener"
}

# variable "db_password" {
#   type      = string
#   sensitive = true
# }
locals {
  stage = terraform.workspace
}

data "aws_availability_zones" "available" {}