# D3ChartExamples

- [react-native-svg](https://github.com/software-mansion/react-native-svg) 와 [d3.js](https://d3js.org/) 조합으로 라인차트, 컬럼차트, 파이차트 기능 구현
- 구현한 코드를 가지고 [블로그](https://ricale.kr/blog/)에 구현 방법 정리

## 진행 계획 및 결과

| #   | 내용                                                     | 구현                | 블로그 정리     |
| --- | -------------------------------------------------------- | ------------------- | --------------- |
| 1   | 라인차트 기본 기능 구현                                  | [완료][c01issue]    | [완료][c01post] |
| 2   | 라인차트 옵션 기능 제공 (색상, 폰트, 포멧 등)            | [진행 중][c02issue] | -               |
| 3   | 라인차트 애니메이션 기능 제공 (초기화 시, 값 변경 시 등) | -                   | -               |
| 4   | 컬럼차트 구현 (상세 계획 미정)                           | -                   | -               |
| 5   | 파이차트 구현 (상세 계획 미정)                           | -                   | -               |
| 6   | 등등.....                                                | -                   | -               |

[c01issue]: https://github.com/ricale/D3ChartExamples/issues/3
[c02issue]: https://github.com/ricale/D3ChartExamples/issues/5
[c01post]: https://ricale.kr/blog/posts/230411-chart-in-react-native-with-d3-1/

## 프로젝트 실행 방법

### 안드로이드

```sh
git clone https://github.com/ricale/D3ChartExamples.git
cd ./D3ChartExamples
yarn
yarn android
```

### iOS

```sh
git clone https://github.com/ricale/D3ChartExamples.git
cd ./D3ChartExamples
yarn
cd ./ios && pod install && cd ../
yarn ios
```
