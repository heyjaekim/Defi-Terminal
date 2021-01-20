# Defi-PoolHopper
 
## 설치 방법 및 환경 설정
    - Branch Address: https://gitlab.com/heyjaekim/defi-poolhopper.git
    - Please do "git clone https://gitlab.com/heyjaekim/defi-poolhopper.git"
    - Branch Name: Jaeweon
        - Please do "git checkout Jaeweon"

### `yarn install` 입력하여 `node_modles`를 설치.
1. yarn 설치가 안되있는 경우 https://classic.yarnpkg.com/en/docs/install#windows-stable 참조.
### `yarn start`
2. compile 에러가 나는 경우 `yarn upgrade`를 통해서 package dependencies들의 업그레이드 필요.
    - 2.1 이후에도 에러가 발생할 시 package.json에 나와있는 dependencies들의 버전에 맞게 재 설치 필요. (ex: yarn add package-name@1.2.3)

### `git pull` 이후 `Module not found` 에러나는 경우
- `yarn install` 그리고 `yarn upgrade`를 입력하고 re-run and compile.

## 주요 패키지 리스트
### `yarn add web3` 또는 `npm install web3`
- 스마트 컨트랙트 연결 시 요구되는 패키지.
### `yarn add bignumber.js`
- web3 ether 처럼 큰 수 핸드링을 통한 Ethereum 또는 Gas Cost 계산에 필요.
### `yarn add tabletop`
- interaction with Google sheet

## AWS CLI 환경설정 
https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2-windows.html
### CLI 환경 설정
    aws configure --profile=poolhopper-admin
    AWS Access Key ID [None]: AKIAZMEATULGUC3CZPUA
    AWS Secret Access Key [None]: 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
    Default region name [None]: ap-northeast-2
    Default output format [None]: json

## Google sheet (Top Pool Data) 주소 및 어카운트 정보
    https://spreadsheets.google.com/feeds/list/1NmoQ1x7SvX0wxlhmuXsvdu_cWGpROnTBzqus46v4Oog/od6/public/basic?alt=json

    Account info: defi.poolhopper@gmail.com
    Account pwd: Jointherepublic!

## 프로젝트 파일 구조

### 변경 사항
- 기존에 있던 Defipage.js 를 App.js로 모두 옮겨 두었습니다.
- App.js를 보시면 testTokendData 안에 사용자들이 Staking 할때마다 배열 형태의 오브젝트가 추가되도록 할 예정입니다.
    - testTokenData 안에 현재 넣어둔 States들은 현재 최소 필요하다고 생각되는 상태들을 넣어두었습니다. 필요시 업데이트 하시면 됩니다.
- 웹사이트 우측 상단 Navbar에 보여지는 페이지 이외의 모든 컴포넌트들은 Components 폴더 안으로 옮겨 두었습니다.
