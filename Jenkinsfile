pipeline {
    agent any
    environment {
        DOCKER_IMAGE = "ecommerce-app"
        AWS_REGION = "us-east-1"
    }
    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/your-repo/ecommerce-microservices.git'
            }
        }
        stage('Build Docker Images') {
            steps {
                sh 'docker-compose build'
            }
        }
        stage('Push to Docker Hub') {
            steps {
                withDockerRegistry([credentialsId: 'dockerhub-cred', url: '']) {
                    sh 'docker-compose push'
                }
            }
        }
        stage('Deploy on Server') {
            steps {
                sshagent(['server-key']) {
                    sh 'ssh user@your-server "docker-compose pull && docker-compose up -d"'
                }
            }
        }
    }
}
