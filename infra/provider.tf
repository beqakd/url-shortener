provider "aws" {
  region  = var.aws_region
  profile = "urlshortener-dev"
}

terraform {
  required_version = ">= 1.3.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }

  backend "s3" {
    bucket  = "personal-terraform-state-35"
    key     = "url-shortener/terraform.tfstate"
    region  = "eu-central-1"
    profile = "urlshortener-dev"
  }
}
