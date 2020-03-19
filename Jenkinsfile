pipeline{
    agent any
    stages{
        stage('Build'){
            steps{
                sh 'npm install'
            }
        }
        stage('Test'){
            steps{
                sh 'npm test'
            }
        }
        stage('Deploy'){
            when{ branch 'master' }
            steps{
                sh 'bash /home/walter/deploy-command'
            }
        }
    }
}
