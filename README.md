### url: http://dizzy-crowd.surge.sh

### react-firebase-chatting
React와 Firebase를 사용하여 구현된 채팅 어플리케이션 입니다. Firebase의 실시간 DB는 데이터의 변화를 실시간으로 반영할 수 있는 기능을 제공합니다. 또한 NoSQL 형식이기 때문에 많은 양의 데이터를 쌓아야하는 채팅 어플리케이션에 적합 합니다. Frontend는 create-react-app을 사용하여 구현 하였습니다. 또한 전역 상태 관리를 위해서 redux를 사용하였습니다.

### 주요기능
- 인증(로그인, 회원가입, 로그아웃) 
- 채팅 방 생성
- 메세지 전송(텍스트, 이미지)
- 채팅 방에 유저 초대

### DB 구조
```

messages: [{
    roomId: [{ // 방 고유 id
        messgeId: [{ // 메세지 고유 id
            content: string,  // 메세지 내용 || image: string // 이미지 url
            timestamp: number,
            user: {
                avartar: string,  // 유저 프로필 이미지
                id: userId, // 유저 고유 id
                name: string // 유저 이름
            }
        }]
    }]
}],
rooms: [{
    roomId: [{
        id: roomId,
        name: string, // 방 이름
        users: [{
            avartar: string,
            id: userId,
            name: string
        }]
    }]
}],
users: [{
    userId: {
        avartar: string,
        email: string, // 유저 email
        id: userId,
        name: string,
        rooms: [{
            roomId: {
                id: roomId,
                name: string
            }
        }] 
    }
}]                  
```

### 실행 명령어
1. `git clone` 명령어를 입력하여 프로젝트를 다운로드 합니다.
2. `npm install` 명령어를 입력하여 패키지들을 설치 합니다.

* 새로운 프로젝트를 실행하려면 firebase 프로젝트를 생성하여 설정파일을 교체해 주어야 합니다.

- `npm run start`: webpack dev 서버를 사용하여 개발 서버를 실행합니다.
- `npm run build`: 프로젝트를 빌드 합니다.
- `npm run test`: 테스트를 실행합니다.

### 테스트
유닛 테스팅을 위해서 테스트 프레임워크인 [jest](https://jestjs.io/)와 테스팅 도구 [enzyme](https://github.com/airbnb/enzyme)를 사용하였습니다.

### 그외 사용된 library
- material UI: icon, tooltip, progressbar 컴포넌트를 사용하였습니다.
- ESlint: air-bnb
- react-modal: 모달 컴포넌트
- node-sass: sass 사용을 위한 library
- react-spinners: 로더

