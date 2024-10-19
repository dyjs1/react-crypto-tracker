# 10월 1일

1.1 ~ 3.2 typing the props

# 10월 6일

3.2~5.6 datatype

# 10월 9일

5.7~5.11

# 10월 10일

5.12~6.0

/\*\*

- Link로 to를 사용하여 path만 보내줄뿐만이 아니라, state도 보낼 수 있다.
- 이때, state는 객체로 보내줄 수 있다.
- link state의 예시 : <Link to={{ pathname: "/about", state: { from: "home" } }}>About</Link>
  \*/

# 설계

/ -> all coins
/:id -> /btc -> Coin detail

/btc/information

# 10월 9일

Nested Routes
네스티드 라우트는 하나의 라우트가 다른 라우트를 포함하는 구조

http://localhost:3000/btc-bitcoin/chart
http://localhost:3000/btc-bitcoin/price

react router 페이지에서 만들면 path를 가져야함
nested routes는 react-router-dom을 import하고 'Router'
<Route path={`/${coinId}/price`}>
이렇게 사용하면됨

그러나 v6버전에서는 약간 달라짐

1. 부모 element에서 선언하는 방법
   router.tsx에서 <Route path="/:coinId/\*" element={<Coin/>} />

Coin.tsx에서

<Routes>
<Route path="chart" element={<Chart />} />
<Route path="price" element={<Price />} />
</ Routes>

2.  Outlet 사용 - 자식 route를 부모 element의 내부가 아닌 route 내부에 작성
    router.tsx에서
    chart와 price 컴포넌트를 import하고

<Route path="/food" element={<Food / >} >
<Route path="pizza" element={<Pizza / >} / >
<Route path="cola" element={<Cola / >} / >
< /Route >

그리고 이 자식 Route들이 어디에 render 될지 부모의 element안에 Outlet을 이용해 표시
import { Outlet } from "react-router-dom";

function Food() {
return (

<div>
<h1 >Food</h1 >
<Outlet/> // 자식 엘리먼트를 넣고자 하는 곳에 위치
</div >
);
}

# react query

- aixos를 그냥 쓰는거랑 react query를 사용했을때의 차이
  react query는 캐시에 데이터를 저장하기 때문에 /btc-bitcoin 로 이동 후 뒤로가기 했을때 로딩이 되지 않는다
  코드가 더 깔끔함
  로딩, 성공, 에러 상태를 자동으로 관리하여 쉽게 조회 할 수 있는 훅을 제공

  const { isLoading: infoLoading, data: info } = useQuery<IInfoData>(
  ["info", coinId],
  () => getInfo(coinId),
  {
  refetchInterval: 500000, // 500초마다 새로고침 - 백그라운드에서 앱을 업데이트 가능함
  }
  );

# react-helmet 앱의 상단의 파일 이름 React-app을 원하는 이름으로 바꿔준다

페이지마다 bitcoin or etheream 이런식으로 바꿔줄 수 있음
상위 컴포넌트에
<Helmet>

<title>코인</title>
</Helmet>
하위 컴포넌트에
<Helmet>
<title>
{state?.name ? state.name : loading ? "Loading..." : infoData?.name}
</title>
</Helmet>

====

# state management

1. Recoil - React state management
   dark mode- > light mode를 하려면 thme provider를 index.tsx -> app 컴포넌트로 이동

2. isDark : App ->router->coin -> chart
   state를 쓰면 isdark 라는 state를 isDark -> App / isDark -> Chart

3. Recoil에서 selector는 파생된 상태(derived state)를 나타내는 데 사용
   상태 변환과 상태 결합, 비동기 쿼리, 성능 최적화 등에 사용된다

4. props를 안쓰고 recoil로 데이터를 수정하고 관리할 수 있는게 장점

5. 최근엔 잘안쓰는듯함

# React - hook - form

const {
register,
watch,
handleSubmit,
formState: { errors },
setError,
} = useForm<IForm>({
defaultValues: {
email: "@naver.com",
},
});

1. register - 입력 필드를 React Hook Form에 등록
2. handleSubmit - 폼 제출을 처리하는 핸들러로, 입력 값의 유효성을 검사한 후 지정된 콜백 함수를 실행
3. formState - 폼의 상태 정보를 포함하는 객체로, 주로 폼의 유효성 검사 결과와 에러 메시지 등을 제공
4. etError - 특정 필드에 대해 수동으로 오류를 설정할 때 사용. 예를 들어, 비즈니스 로직에 따라 특정 조건에서 에러를 발생

# Drag and Drop

onDragEnd이라는 훅을 이용해서 드래그의 시작과 끝을 알 수 있음
그리고 splice를 이용하여 배열을 정리한다

Dragabble은 드래그할때마다 엄청나게 많은 렌더링을 하기때문에 오류가 발생할 확률이 높아져서
렌더링을 컨트롤하는 코드가 필요함.. 특히 배포하거나 빠르게 드래그 앤 드롭을 할때 에러가 발생할 확률이 높아짐

## react memo - props가 바뀌지 않는다면 렌더링을 하지 않도록 함

-> 리액트의 최적화 tool
-> 그런데 기본적으로 렌더를 두번씩 하네... ;; 이건 내가 Droppable을 수정해서 써서 그런가
