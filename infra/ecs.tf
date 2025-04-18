resource "aws_ecs_cluster" "url-shortener-cluster" {
  name = "${var.project_name}-${local.stage}-ecs-cluster"
}

resource "aws_ecs_cluster_capacity_providers" "fargate-provider" {
  cluster_name = aws_ecs_cluster.url-shortener-cluster.name

  capacity_providers = ["FARGATE"]
}

// Iam role for ECS task execution
resource "aws_iam_role" "url_shortener_task_execution_role" {
  name = "ecs-url-shortener-task-execution-role-${local.stage}"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Principal = {
          Service = "ecs-tasks.amazonaws.com"
        }
        Effect = "Allow"
        Sid    = ""
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "ecs_execution_policy" {
  role       = aws_iam_role.url_shortener_task_execution_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
}

// # ECS Task Role - This role is used by the ECS task when app is running
resource "aws_iam_role" "ecs_url_shortener_task_role" {
  name = "ecs-url-shortener-task-role-${local.stage}"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Principal = {
          Service = "ecs-tasks.amazonaws.com"
        }
        Effect = "Allow"
        Sid    = ""
      }
    ]
  })
}

resource "aws_iam_policy" "ecs_url_shortener_task_policy" {
  name        = "ecs-url-shortener-task-policy-${local.stage}"
  description = "Policy for ECS task role to access all resources"
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect   = "Allow"
        Action   = "*"
        Resource = "*"
      }
    ]
  })
}
resource "aws_iam_role_policy_attachment" "ecs_task_role_policy_attachment" {
  role       = aws_iam_role.ecs_url_shortener_task_role.name
  policy_arn = aws_iam_policy.ecs_url_shortener_task_policy.arn
}

// ecs service
resource "aws_ecs_task_definition" "app" {
  family                   = "${var.project_name}-${local.stage}-task"
  requires_compatibilities = ["FARGATE"]
  network_mode             = "awsvpc"
  cpu                      = "256"
  memory                   = "512"
  execution_role_arn       = aws_iam_role.url_shortener_task_execution_role.arn
  task_role_arn            = aws_iam_role.ecs_url_shortener_task_role.arn

  container_definitions = jsonencode([
    {
      name      = "url-shortener",
      image     = "901536124823.dkr.ecr.eu-central-1.amazonaws.com/serverless-defiland-rose-nft-develop:latest",
      essential = true,
      portMappings = [
        {
          containerPort = 3000,
          hostPort      = 3000,
          protocol      = "tcp"
        }
      ],
      logConfiguration = {
        logDriver = "awslogs",
        options = {
          awslogs-group         = "/ecs/${var.project_name}-${local.stage}",
          awslogs-region        = var.aws_region,
          awslogs-stream-prefix = "ecs"
        }
      }
    }
  ])
}
