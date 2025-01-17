# README: 영화 정보 웹사이트

---

## **프로젝트 개요**

이 프로젝트는 TMDB (The Movie Database) API를 활용하여 영화 정보를 제공하는 웹 애플리케이션입니다. 사용자는 영화 목록, 해당 영화 세부 정보를 쉽게 확인할 수 있으며, 검색 기능과 모달 팝업을 통해 인터랙티브한 사용자 경험을 제공합니다.

---

## **기능**

1. **메인 페이지**
    - TMDB API를 통해 인기 영화 데이터를 가져와 그리드 형태로 영화 정보를 표시.
    - 영화 포스터, 제목, 평점 등 기본 정보 제공.
2. **영화 검색**
    - 사용자가 검색창에 입력한 영화 제목을 키워드로 TMDB API에서 데이터를 필터링하여 결과를 표시.
3. **모달 팝업**
    - 사용자가 특정 영화를 클릭하면, 영화의 세부 정보를 보여주는 모달 창이 나타남.
    - 영화 장르, 개봉날짜, 줄거리 등 추가 정보 제공.
4. **인터랙티브 UI**
    - 영화 포스터에 마우스를 올리면 확대 효과 제공.
    - 검색 기능에서 실시간으로 결과 업데이트.

---

## **기술 스택**

- **Frontend**:
    - HTML5
    - CSS (Flexbox, Grid)
    - JavaScript (Vanilla JS)
- **API**:
    - [TMDB API](https://www.themoviedb.org/documentation/api)

---

## **설치 및 실행 방법**

### **1. 프로젝트 클론**

```bash
git clone https://github.com/your-repo-name/movie-website.git

```

### **(2. API 키 설정) 위 코드에는 저의 API 키가 설정되어있습니다.**

1. [TMDB API](https://www.themoviedb.org/documentation/api)에서 API 키를 발급받습니다.
2. `index.js` 파일에서 API 키를 추가합니다:
    
    ```jsx
    const API_KEY = 'YOUR_API_KEY';
    
    ```
    

### **3. 실행**

- 파일을 실행하려면:
    1. `index.html` 파일을 브라우저에서 열기.

---

## **구현된 주요 코드**

### **TMDB API로 인기 영화 가져오기**

```jsx
async function fetchMovies() {
  const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}`);
  const data = await response.json();
  renderMovies(data.results); // 영화 목록 렌더링
}

```

### **영화 검색 기능**

```jsx
searchBar.addEventListener('input', async (e) => {
  const keyword = e.target.value.trim().toLowerCase();
  const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${keyword}`);
  const data = await response.json();
  renderMovies(data.results); // 검색 결과 렌더링
});

```

### **모달 팝업 세부 정보 가져오기**

```jsx
async function fetchMovieDetailsData(movie_id) {
  const urlEn = `https://api.themoviedb.org/3/movie/${movie_id}?language=en-US`;
  try {
    const res = await fetch(urlEn, options);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("영화 상세 데이터를 가져오는 중 오류 발생:", error);
    return null;
  }
}
```

---

## **폴더 구조**

```
movie-website/
├── index.html        # 메인 HTML 파일 |
├── css               # css  모음 폴더
|   ├── style.css     # 전체 스타일 파일
├──js                 # 전체 js 모음 폴더
|   ├── index.js      # 주요 JavaScript 파일
├── assets            # 이미지 폴더
└── README.md         # 프로젝트 설명 파일

```

---

## **기능 개선 및 추가 예정**

1. **북마크 기능**: 
    - 관심 있는 영화들을 ‘북마크’ (혹은, ‘좋아요’) 할 수 있는 기능
    - 특정 버튼을 눌렀을 때, `localStorage` 에 관련 데이터를 저장
2. **추천 영화 기능**:
    - 사용자가 특정 영화를 클릭하면 비슷한 영화 추천 목록 표시.
3. **사용자 리뷰 기능**:
    - TMDB의 리뷰 데이터를 가져와 사용자 리뷰를 모달에 표시.
4. **다국어 지원**:
    - API 요청 시 언어 옵션을 추가하여 한국어 및 다른 언어로 영화 정보 제공.
5. **다크 모드**:
    - 사용자 환경에 맞춘 다크 모드/라이트 모드 추가.
6. **쓰로틀링/디바운싱을 적용한 검색**
    - 지정된 시간 간격마다 키워드 검색을 실행
    - 연속된 이벤트 발생이 멈춘 후 지정된 시간 동안 대기한 뒤에 한 번만 검색 실

---

## **크레딧**

- **TMDB API**: 이 프로젝트는 [TMDB API](https://www.themoviedb.org/documentation/api)를 사용하여 데이터를 제공합니다.
- **디자인 및 개발**: [https://github.com/Aeri0730](https://github.com/Aeri0730)

---

## **라이선스**

**MIT License** 

---
