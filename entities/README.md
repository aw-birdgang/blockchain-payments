
#
````

aws codeartifact create-domain --domain my-domain
aws codeartifact create-repository --domain my-domain --repository my-repo

````


# 인증 토큰 생성:
````
export CODEARTIFACT_AUTH_TOKEN=`aws codeartifact get-authorization-token --domain my-domain --query authorizationToken --output text`

````


# ~/.npmrc 파일에 인증 정보 추가:
````
aws codeartifact login --tool npm --domain my-domain --repository my-repo --region your-region

````



# 패키지 빌드 & 배포:
````
# Build the package
npm run build

# Publish the package to CodeArtifact
npm publish --registry https://my-domain-123456789012.d.codeartifact.region.amazonaws.com/npm/my-repo/

````




# AWS CLI를 통해 CodeArtifact에 인증:
````
aws codeartifact login --tool npm --repository your-repo --domain your-domain --domain-owner 123456789012
 
````



# AWS CLI를 사용하여 인증 토큰 생성 및 설정:
````
aws codeartifact get-authorization-token --domain my-domain --domain-owner 123456789012 --query authorizationToken --output text

````


# npm 레지스트리에 로그인:
````
npm set //your-domain-123456789012.d.codeartifact.ap-northeast-1.amazonaws.com/npm/your-repo/:_authToken=

````

