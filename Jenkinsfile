pipeline {
    agent any

    environment{
        DOCKERHUB_CREDENTIALS=credentials('dockerhub')
    }

    stages {
        stage('Build') {
            steps {
                sh 'docker build -t node-image .'
                echo 'Building..'
            }
        }
        stage('Deploy') {
            steps {
                sh 'docker run -v $(pwd):/app -v /app/node_modules -d -p 4000:4000 --name node-app node-image'
                echo 'Deploying....'
            }
        }
    }
}