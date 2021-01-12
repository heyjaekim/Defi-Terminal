# Defi-PoolHopper

## 설치 환경
### `yarn install`
- yarn 설치가 안되있는 경우 https://classic.yarnpkg.com/en/docs/install#windows-stable 참조.
### `yarn start`
- 에러가 나는경우 react-router-dom 과 reactstrap을 yarn add로 설치 필요.
### `npm install web3`
- 스마트 컨트랙트 연동시 설치 필요
### `yarn add bignumber.js`
- web3 ether 처럼 큰 수 핸드링


## 프로젝트 파일 구조

### 변경 사항
- 기존에 있던 Defipage.js 를 App.js로 모두 옮겨 두었습니다.
- App.js를 보시면 testTokendData 안에 사용자들이 Staking 할때마다 배열 형태의 오브젝트가 추가되도록 할 예정입니다.
    - testTokenData 안에 현재 넣어둔 States들은 현재 최소 필요하다고 생각되는 상태들을 넣어두었습니다. 필요시 업데이트 하시면 됩니다.
- 웹사이트 우측 상단 Navbar에 보여지는 페이지 이외의 모든 컴포넌트들은 Components 폴더 안으로 옮겨 두었습니다.