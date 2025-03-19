pipeline {
    agent any

    environment {
        DOCKERHUB_USER = "neerajchauhan1558@gmail.com"
        DOCKERHUB_PASS = credentials('higherLogic0907@#') // Add this in Jenkins Credentials
        IMAGE_NAME_FE = "ecommerce-microservices/fe-service"
        IMAGE_NAME_BE = "ecommerce-microservices/be-service"
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/nick0995/ecommerce-microservices.git'
            }
        }

        stage('Build FE & BE Images') {
            steps {
                script {
                    sh "docker build -t $IMAGE_NAME_FE:latest ./frontend"
                    sh "docker build -t $IMAGE_NAME_BE:latest ./backend"
                }
            }
        }

        stage('Push Images') {
            steps {
                script {
                    sh "echo $DOCKERHUB_PASS | docker login -u $DOCKERHUB_USER --password-stdin"
                    sh "docker push $IMAGE_NAME_FE:latest"
                    sh "docker push $IMAGE_NAME_BE:latest"
                }
            }
        }

        stage('Deploy using Docker Compose') {
            steps {
                sh "docker-compose down"
                sh "docker-compose up -d"
            }
        }
    }
}
