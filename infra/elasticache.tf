# Security group for Redis — allow ECS only
resource "aws_security_group" "redis_sg" {
  name        = "${var.project_name}-${local.stage}-redis-sg"
  description = "Allow ECS tasks to access Redis"
  vpc_id      = aws_vpc.main.id

  ingress {
    from_port       = 6379
    to_port         = 6379
    protocol        = "tcp"
    security_groups = [aws_security_group.ecs_sg.id]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "redis-sg"
  }
}

# Subnet group for Redis (use private subnets)
resource "aws_elasticache_subnet_group" "redis" {
  name       = "${var.project_name}-${local.stage}-redis-subnet-group"
  subnet_ids = aws_subnet.private[*].id

  tags = {
    Name = "redis-subnet-group"
  }
}

# Redis Cluster (Single node for dev)
resource "aws_elasticache_cluster" "redis" {
  cluster_id           = "${var.project_name}-${local.stage}-redis"
  engine               = "redis"
  node_type            = "cache.t3.micro"
  num_cache_nodes      = 1
  parameter_group_name = "default.redis7"
  port                 = 6379
  subnet_group_name    = aws_elasticache_subnet_group.redis.name
  security_group_ids   = [aws_security_group.redis_sg.id]
  engine_version       = "7.0"
  apply_immediately    = true

  tags = {
    Name = "redis"
  }
}
