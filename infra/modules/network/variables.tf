
locals {
  stage = terraform.workspace

  vpc_cidr_block = local.stage == "develop" ? "10.10.0.0/16" : (
    local.stage == "beta" ? "10.11.0.0/16" :
    tobool("Invalid workspace selected '${local.stage}'. Please use 'develop', or 'beta'")
  )

  az_count = 3
}

variable "project_name" {
  type    = string
  default = "url-shortener"
}

variable "aws_region" {
  type    = string
  default = "eu-central-1"
}

data "aws_availability_zones" "available" {}