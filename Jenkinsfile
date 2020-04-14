pipeline{
    environment{
        scannerHome = tool 'sonarqube-scanner1'
    }
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
        stage('SonarQube analysis'){
            when{ branch 'master' }
            steps{
                sh "${scannerHome}/bin/sonar-scanner \
  -Dsonar.projectKey=concordia-campus-guide \
  -Dsonar.sources=. \
  -Dsonar.host.url=http://server1.walterfleury.com:9000 \
  -Dsonar.login=c859d8ab5d7163018fa519564638f03f7028d848"
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
