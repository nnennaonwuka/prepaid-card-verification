pipeline {
    agent any

    stages {
        stage('Deploying in Dev Environment: develop') {
            when { 
                branch 'develop' 
            }
            steps {
                echo 'Deploying the application to develop...'
                sshPublisher(publishers: [sshPublisherDesc(
                    configName: 'prepaid-card-verification',
                    transfers: [sshTransfer(
                        cleanRemote: false,
                        excludes: '',
                        execCommand: ''' 
                        GITUSER=$(cat gituser.txt)
                        GITPASSWD=$(cat gittoken.txt)
                        USERPASSWD=$(cat password.txt)
                        cd /var/www/html/prepaid-card-verification-portal
                        # Ensure the directory is safe for git operations
                        echo $USERPASSWD | sudo -S git config --global --add safe.directory /var/www/html/prepaid-card-verification-portal
                        pwd
                        hostname
                        sudo git pull https://$GITUSER:$GITPASSWD@github.com/BabbanGonaDev/prepaid-card-verification-portal.git develop
                        # Uncomment the following line if you want to restart the Docker containers
                        # sudo docker-compose restart
                        ''',
                        execTimeout: 3000000,
                        flatten: false,
                        makeEmptyDirs: false,
                        noDefaultExcludes: false,
                        patternSeparator: '[, ]+',
                        remoteDirectory: '.',
                        remoteDirectorySDF: false,
                        removePrefix: '',
                        sourceFiles: '*.tar.gz'
                    )],
                    usePromotionTimestamp: false,
                    useWorkspaceInPromotion: false,
                    verbose: true
                )])
            }
        }
        stage('Deploying in Prod Environment: production') {
            when { 
                branch 'production' 
            }
            steps {
                echo 'Deploying the application to production...'
                sshPublisher(publishers: [sshPublisherDesc(
                    configName: 'prepaid-card-verification',
                    transfers: [sshTransfer(
                        cleanRemote: false,
                        excludes: '',
                        execCommand: ''' 
                        GITUSER=$(cat gituser.txt)
                        GITPASSWD=$(cat gittoken.txt)
                        USERPASSWD=$(cat password.txt)
                        cd /var/www/html/prod/prepaid-card-verification-portal
                        echo $USERPASSWD | sudo -S git config --global --add safe.directory /var/www/html/prod/prepaid-card-verification-portal
                        git branch
                        pwd
                        hostname
                        echo $USERPASSWD | sudo -S git pull https://$GITUSER:$GITPASSWD@github.com/BabbanGonaDev/prepaid-card-verification-portal.git production
                        # echo $USERPASSWD | sudo docker compose restart
                        ''',
                        execTimeout: 3000000,
                        flatten: false,
                        makeEmptyDirs: false,
                        noDefaultExcludes: false,
                        patternSeparator: '[, ]+',
                        remoteDirectory: '.',
                        remoteDirectorySDF: false,
                        removePrefix: '',
                        sourceFiles: '*.tar.gz'
                    )],
                    usePromotionTimestamp: false,
                    useWorkspaceInPromotion: false,
                    verbose: true
                )])
            }
        }
    }
}