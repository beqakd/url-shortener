


# Security group to allow ECS → RDS (Postgres: 5432)
resource "aws_security_group" "rds_sg" {
  name        = "${var.project_name}-${local.stage}-rds-sg"
  description = "Allow ECS tasks to access RDS"
  vpc_id      = aws_vpc.main.id

  ingress {
    from_port       = 5432
    to_port         = 5432
    protocol        = "tcp"
    security_groups = [aws_security_group.ecs_sg.id] # from alb.tf
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "rds-sg"
  }
}

# Subnet group for RDS (use private subnets)
resource "aws_db_subnet_group" "rds" {
  name       = "${var.project_name}-${local.stage}-rds-subnet-group"
  subnet_ids = aws_subnet.private[*].id

  tags = {
    Name = "rds-subnet-group"
  }
}

resource "random_password" "db_password" {
  length  = 16
  special = false
}

# RDS Instance
resource "aws_db_instance" "postgres" {
  identifier             = "${var.project_name}-${local.stage}-db"
  engine                 = "postgres"
  instance_class         = "db.t3.micro"
  allocated_storage      = 20
  db_name                = "urlshortener"
  username               = "postgres"
  password               = random_password.db_password.result
  db_subnet_group_name   = aws_db_subnet_group.rds.name
  vpc_security_group_ids = [aws_security_group.rds_sg.id]
  publicly_accessible    = false
  skip_final_snapshot    = true
  deletion_protection    = false

  tags = {
    Name = "url-shortener-db"
  }
}

# DB password stored securely
resource "aws_secretsmanager_secret" "db_password" {
  name = "${var.project_name}-${local.stage}-db-password"
}

resource "aws_secretsmanager_secret_version" "db_password_value" {
  secret_id     = aws_secretsmanager_secret.db_password.id
  secret_string = random_password.db_password.result
}